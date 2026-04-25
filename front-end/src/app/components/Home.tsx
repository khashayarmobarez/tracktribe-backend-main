import { useState, useMemo } from 'react';
import { trails } from '../data/trails';
import { TrailCard } from './TrailCard';
import { MapPin, Filter, Download } from 'lucide-react';

interface HomeProps {
  onViewTrail: (trailId: number) => void;
}

export function Home({ onViewTrail }: HomeProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('همه');
  const [selectedActivity, setSelectedActivity] = useState<string>('همه');
  const [showOfflineModal, setShowOfflineModal] = useState(false);

  const regions = ['همه', ...Array.from(new Set(trails.map(t => t.region)))];
  const activities = ['همه', 'پیاده‌روی', 'کوهنوردی', 'دوچرخه‌سواری'];

  const filteredTrails = useMemo(() => {
    return trails.filter(trail => {
      const matchesRegion = selectedRegion === 'همه' || trail.region === selectedRegion;
      const matchesActivity = selectedActivity === 'همه' || trail.activityType === selectedActivity;
      return matchesRegion && matchesActivity;
    });
  }, [selectedRegion, selectedActivity]);

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20">
      <div className="text-white rounded-xl p-6 mb-6 shadow-lg" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }}>
        <h2 className="text-2xl mb-2">به Track Tribe خوش آمدید</h2>
        <p className="opacity-90">کشف مسیرهای طبیعت‌گردی ایران</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#2D4635]" />
          <h3 className="font-semibold">فیلترها</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">منطقه</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2D4635] focus:border-[#2D4635]"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">نوع فعالیت</label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2D4635] focus:border-[#2D4635]"
            >
              {activities.map(activity => (
                <option key={activity} value={activity}>{activity}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Download className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-900 mb-1">بسته آفلاین</h4>
          <p className="text-sm text-amber-800 mb-3">
            برای استفاده از مسیرها بدون اینترنت، بسته آفلاین منطقه مورد نظر را دانلود کنید.
          </p>
          <button
            onClick={() => setShowOfflineModal(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
          >
            مدیریت بسته‌های آفلاین
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          مسیرهای موجود ({filteredTrails.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrails.map(trail => (
          <TrailCard
            key={trail.id}
            trail={trail}
            onViewDetails={() => onViewTrail(trail.id)}
          />
        ))}
      </div>

      {filteredTrails.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>مسیری در این دسته‌بندی یافت نشد</p>
        </div>
      )}

      {showOfflineModal && (
        <OfflinePacksModal onClose={() => setShowOfflineModal(false)} />
      )}
    </div>
  );
}

function OfflinePacksModal({ onClose }: { onClose: () => void }) {
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  const regions = Array.from(new Set(trails.map(t => t.region)));

  const handleDownload = (region: string) => {
    setDownloadProgress(prev => ({ ...prev, [region]: 0 }));

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const current = prev[region] || 0;
        if (current >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [region]: current + 10 };
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">بسته‌های آفلاین</h3>

        <div className="space-y-3 mb-6">
          {regions.map(region => {
            const progress = downloadProgress[region];
            const isDownloading = progress !== undefined && progress < 100;
            const isDownloaded = progress === 100;

            return (
              <div key={region} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{region}</h4>
                    <p className="text-sm text-gray-600">حجم: ~45 مگابایت</p>
                  </div>
                  {!isDownloaded && !isDownloading && (
                    <button
                      onClick={() => handleDownload(region)}
                      className="bg-[#2D4635] text-white px-4 py-2 rounded-lg hover:bg-[#3D5A45] transition-colors text-sm"
                    >
                      دانلود
                    </button>
                  )}
                  {isDownloaded && (
                    <span className="text-[#2D4635] text-sm font-semibold">✓ دانلود شده</span>
                  )}
                </div>

                {isDownloading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#2D4635] h-2 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          بستن
        </button>
      </div>
    </div>
  );
}

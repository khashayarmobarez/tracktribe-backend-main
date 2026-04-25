import { useState } from 'react';
import { trails } from '../data/trails';
import { TrailCard } from './TrailCard';
import { Bookmark, Heart } from 'lucide-react';

interface SavedTrailsProps {
  onViewTrail: (trailId: number) => void;
}

export function SavedTrails({ onViewTrail }: SavedTrailsProps) {
  const [savedTrailIds] = useState<number[]>([1, 2]);

  const savedTrails = trails.filter(trail => savedTrailIds.includes(trail.id));

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20">
      <div className="text-white rounded-xl p-6 mb-6 shadow-lg" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }}>
        <h2 className="text-2xl mb-2 flex items-center gap-2">
          <Bookmark className="w-6 h-6" />
          مکان‌های ذخیره‌شده
        </h2>
        <p className="opacity-90">مسیرهای مورد علاقه شما</p>
      </div>

      {savedTrails.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            هنوز مسیری ذخیره نکرده‌اید
          </h3>
          <p className="text-gray-600">
            با کلیک بر روی آیکون قلب در صفحه جزئیات مسیر، می‌توانید آن را به لیست علاقه‌مندی‌های خود اضافه کنید.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="font-semibold text-lg">
              {savedTrails.length} مسیر ذخیره‌شده
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedTrails.map(trail => (
              <TrailCard
                key={trail.id}
                trail={trail}
                onViewDetails={() => onViewTrail(trail.id)}
              />
            ))}
          </div>
        </>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-blue-900 mb-2">نکته:</h4>
        <p className="text-sm text-blue-800">
          مسیرهای ذخیره‌شده در حافظه دستگاه شما نگهداری می‌شوند و حتی در صورت قطع اینترنت قابل دسترسی هستند.
        </p>
      </div>
    </div>
  );
}

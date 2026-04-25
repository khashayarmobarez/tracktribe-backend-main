import { useState, useEffect } from 'react';
import { Play, Pause, Square, TrendingUp, Clock, Mountain, Gauge, Download } from 'lucide-react';

export function Recording() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [elevation, setElevation] = useState(1850);
  const [recordedPath, setRecordedPath] = useState<{ lat: number; lng: number; time: number }[]>([]);

  useEffect(() => {
    if (!isRecording || isPaused) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setDistance(prev => prev + (Math.random() * 0.01 + 0.02));
      setSpeed(3.2 + Math.random() * 1.5);
      setElevation(prev => prev + (Math.random() * 2 - 1));

      setRecordedPath(prev => [
        ...prev,
        {
          lat: 35.8106 + Math.random() * 0.01,
          lng: 51.4425 + Math.random() * 0.01,
          time: Date.now()
        }
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    alert(`فعالیت شما ذخیره شد!\n\nمسافت: ${distance.toFixed(2)} کیلومتر\nزمان: ${formatTime(elapsedTime)}\nنقاط ثبت‌شده: ${recordedPath.length}`);
  };

  const handleDownloadGPX = () => {
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1">
  <trk>
    <name>فعالیت ${new Date().toLocaleDateString('fa-IR')}</name>
    <trkseg>
      ${recordedPath.map(point => `
      <trkpt lat="${point.lat}" lon="${point.lng}">
        <time>${new Date(point.time).toISOString()}</time>
      </trkpt>`).join('')}
    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-${Date.now()}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl pb-20">
      <div className="text-white rounded-xl p-6 mb-6 shadow-lg" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }}>
        <h2 className="text-2xl mb-2">ثبت فعالیت</h2>
        <p className="opacity-90">مسیر خود را ضبط و ذخیره کنید</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-[#2D4635] mb-2 font-mono">
            {formatTime(elapsedTime)}
          </div>
          <div className="text-gray-600">زمان سپری شده</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">مسافت طی‌شده</span>
            </div>
            <div className="text-2xl font-bold">{distance.toFixed(2)}</div>
            <div className="text-sm text-gray-600">کیلومتر</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Gauge className="w-5 h-5" />
              <span className="text-sm">سرعت متوسط</span>
            </div>
            <div className="text-2xl font-bold">{speed.toFixed(1)}</div>
            <div className="text-sm text-gray-600">کیلومتر بر ساعت</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Mountain className="w-5 h-5" />
              <span className="text-sm">ارتفاع فعلی</span>
            </div>
            <div className="text-2xl font-bold">{elevation.toFixed(0)}</div>
            <div className="text-sm text-gray-600">متر</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">نقاط ثبت‌شده</span>
            </div>
            <div className="text-2xl font-bold">{recordedPath.length}</div>
            <div className="text-sm text-gray-600">نقطه</div>
          </div>
        </div>

        <div className="space-y-3">
          {!isRecording ? (
            <button
              onClick={handleStart}
              className="w-full bg-[#2D4635] text-white py-4 rounded-lg hover:bg-[#3D5A45] transition-colors flex items-center justify-center gap-2 text-lg"
            >
              <Play className="w-6 h-6" />
              شروع ضبط
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className={`w-full py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg ${
                  isPaused
                    ? 'bg-[#2D4635] text-white hover:bg-[#3D5A45]'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                {isPaused ? (
                  <>
                    <Play className="w-6 h-6" />
                    ادامه
                  </>
                ) : (
                  <>
                    <Pause className="w-6 h-6" />
                    توقف موقت
                  </>
                )}
              </button>

              <button
                onClick={handleStop}
                className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <Square className="w-6 h-6" />
                پایان ضبط و ذخیره
              </button>
            </>
          )}
        </div>

        {isPaused && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center text-amber-800">
            ضبط موقتاً متوقف شده است
          </div>
        )}

        {isRecording && !isPaused && (
          <div className="mt-4 bg-[#E8F0EA] border border-[#A8C4B0] rounded-lg p-3 text-center text-[#1D3625] flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-[#2D4635] rounded-full animate-pulse" />
            در حال ضبط...
          </div>
        )}
      </div>

      {recordedPath.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-lg mb-4">گزینه‌های ذخیره‌سازی</h3>

          <div className="space-y-3">
            <button
              onClick={handleDownloadGPX}
              className="w-full border border-[#2D4635] text-[#2D4635] py-3 rounded-lg hover:bg-[#E8F0EA] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              دانلود فایل GPX
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">ذخیره آفلاین</h4>
              <p className="text-sm text-blue-800 mb-3">
                فعالیت شما به صورت خودکار در حافظه دستگاه ذخیره می‌شود و پس از اتصال به اینترنت، به سرور ارسال خواهد شد.
              </p>
              <div className="text-xs text-blue-700">
                حجم فعلی: {(recordedPath.length * 0.1).toFixed(2)} KB
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-amber-900 mb-2">نکته:</h4>
        <p className="text-sm text-amber-800">
          حتی در صورت قطع اینترنت، GPS دستگاه شما به ثبت مسیر ادامه می‌دهد. اطلاعات به صورت محلی ذخیره شده و بعداً همگام‌سازی می‌شوند.
        </p>
      </div>
    </div>
  );
}

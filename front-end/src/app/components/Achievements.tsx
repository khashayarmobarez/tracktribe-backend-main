import { Award, Lock } from 'lucide-react';

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
  date?: string;
}

export function Achievements() {
  const achievements: Achievement[] = [
    {
      id: 1,
      name: 'اولین قدم',
      description: 'اولین فعالیت خود را ثبت کنید',
      icon: '👣',
      unlocked: true,
      date: '1403/01/15'
    },
    {
      id: 2,
      name: 'کوهنورد حرفه‌ای',
      description: '100 کیلومتر مسیر طی کنید',
      icon: '🏔️',
      unlocked: true,
      progress: 100,
      target: 100,
      date: '1403/02/10'
    },
    {
      id: 3,
      name: 'فاتح قله‌ها',
      description: '10 قله را فتح کنید',
      icon: '⭐',
      unlocked: true,
      progress: 10,
      target: 10,
      date: '1403/02/20'
    },
    {
      id: 4,
      name: 'هفته فعال',
      description: '7 روز پیاپی فعالیت داشته باشید',
      icon: '🎯',
      unlocked: true,
      date: '1403/01/25'
    },
    {
      id: 5,
      name: 'رهبر گروه',
      description: '5 رویداد گروهی برگزار کنید',
      icon: '👥',
      unlocked: true,
      progress: 5,
      target: 5,
      date: '1403/02/15'
    },
    {
      id: 6,
      name: 'عکاس طبیعت',
      description: '50 عکس از مسیرها آپلود کنید',
      icon: '📷',
      unlocked: false,
      progress: 32,
      target: 50
    },
    {
      id: 7,
      name: 'ماراتن کوهستان',
      description: '250 کیلومتر مسیر طی کنید',
      icon: '🏃',
      unlocked: false,
      progress: 247,
      target: 250
    },
    {
      id: 8,
      name: 'نگهبان طبیعت',
      description: '10 گزارش مشکل مفید ثبت کنید',
      icon: '🌱',
      unlocked: false,
      progress: 7,
      target: 10
    },
    {
      id: 9,
      name: 'راهنمای کوهستان',
      description: '20 نظر مفید برای مسیرها بنویسید',
      icon: '📝',
      unlocked: false,
      progress: 15,
      target: 20
    },
    {
      id: 10,
      name: 'افسانه کوه',
      description: '500 کیلومتر مسیر طی کنید',
      icon: '🦅',
      unlocked: false,
      progress: 247,
      target: 500
    },
    {
      id: 11,
      name: 'پادشاه ارتفاع',
      description: '50000 متر ارتفاع کسب کنید',
      icon: '👑',
      unlocked: false,
      progress: 12450,
      target: 50000
    },
    {
      id: 12,
      name: 'اکسپلورر',
      description: 'مسیرهای 10 منطقه مختلف را امتحان کنید',
      icon: '🗺️',
      unlocked: false,
      progress: 4,
      target: 10
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  return (
    <div className="container mx-auto p-4 max-w-4xl pb-20">
      <div className="text-white rounded-xl p-6 mb-6 shadow-lg" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }}>
        <h2 className="text-2xl mb-2 flex items-center gap-2">
          <Award className="w-7 h-7" />
          دستاوردها
        </h2>
        <p className="opacity-90">مجموعه دستاوردهای شما در Track Tribe</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold" style={{ color: '#2D4635' }}>
              {unlockedCount} / {totalCount}
            </div>
            <div className="text-sm text-gray-600">دستاورد باز شده</div>
          </div>
          <div className="text-6xl">🏆</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%`, backgroundColor: '#2D4635' }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {progressPercentage.toFixed(0)}% تکمیل شده
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">دستاوردهای باز شده ({unlockedCount})</h3>
      </div>

      <div className="space-y-4 mb-6">
        {achievements.filter(a => a.unlocked).map(achievement => (
          <div key={achievement.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <Award className="w-6 h-6 shrink-0" style={{ color: '#2D4635' }} />
                  </div>

                  {achievement.progress && achievement.target && (
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.target) * 100}%`, backgroundColor: '#2D4635' }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {achievement.progress} / {achievement.target}
                      </div>
                    </div>
                  )}

                  {achievement.date && (
                    <div className="text-xs text-gray-500">
                      باز شده در: {achievement.date}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">دستاوردهای قفل شده ({totalCount - unlockedCount})</h3>
      </div>

      <div className="space-y-4">
        {achievements.filter(a => !a.unlocked).map(achievement => (
          <div key={achievement.id} className="bg-white rounded-xl shadow-lg overflow-hidden opacity-75">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-5xl grayscale opacity-50">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-lg text-gray-700">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <Lock className="w-6 h-6 text-gray-400 shrink-0" />
                  </div>

                  {achievement.progress && achievement.target && (
                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gray-400"
                          style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {achievement.progress} / {achievement.target}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl border-2" style={{ borderColor: '#2D4635', backgroundColor: '#F5F5F0' }}>
        <h4 className="font-semibold mb-2" style={{ color: '#2D4635' }}>نکته:</h4>
        <p className="text-sm text-gray-700">
          با ادامه فعالیت‌های خود و شرکت در رویدادها می‌توانید دستاوردهای بیشتری را باز کنید و به رتبه‌های بالاتر دست پیدا کنید.
        </p>
      </div>
    </div>
  );
}

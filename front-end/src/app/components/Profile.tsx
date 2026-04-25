import { useState } from 'react';
import { Camera, Award, TrendingUp, Clock, Mountain, Users, Calendar, Heart, Upload } from 'lucide-react';

export function Profile() {
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400'
  ]);

  const stats = {
    totalDistance: 247.5,
    totalTime: 156,
    totalElevation: 12450,
    activitiesCount: 42,
    achievementsCount: 18
  };

  const followedUsers = [
    { id: 1, name: 'علی محمدی', username: '@ali_m' },
    { id: 2, name: 'مریم احمدی', username: '@maryam_a' },
    { id: 3, name: 'رضا کریمی', username: '@reza_k' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'صعود گروهی به توچال', date: '1403/02/30', participants: 12 },
    { id: 2, title: 'پیاده‌روی دریاچه گهر', date: '1403/03/05', participants: 8 }
  ];

  const handlePhotoUpload = () => {
    alert('قابلیت آپلود عکس فعال می‌شود');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl pb-20">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="h-32" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }} />

        <div className="relative px-6 pb-6">
          <div className="flex items-end -mt-16 mb-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden" style={{ backgroundColor: '#2D4635' }}>
                <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                  ع.م
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2" style={{ borderColor: '#2D4635' }}>
                <Camera className="w-5 h-5" style={{ color: '#2D4635' }} />
              </button>
            </div>

            <div className="mr-4 mb-4">
              <h2 className="text-2xl font-bold">علی محمدی</h2>
              <p className="text-gray-600">@ali_mountain</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-4 border-t border-b border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#2D4635' }}>{stats.activitiesCount}</div>
              <div className="text-xs text-gray-600">فعالیت</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#2D4635' }}>{stats.totalDistance}</div>
              <div className="text-xs text-gray-600">کیلومتر</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#2D4635' }}>{stats.totalTime}</div>
              <div className="text-xs text-gray-600">ساعت</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#2D4635' }}>{stats.totalElevation}</div>
              <div className="text-xs text-gray-600">متر ارتفاع</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#2D4635' }}>{stats.achievementsCount}</div>
              <div className="text-xs text-gray-600">دستاورد</div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700">
              علاقه‌مند به کوهنوردی و طبیعت‌گردی 🏔️ | عضو باشگاه کوهنوردی البرز | فعال در مسیرهای البرز مرکزی
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Camera className="w-5 h-5" style={{ color: '#2D4635' }} />
            گالری تصاویر
          </h3>
          <button
            onClick={handlePhotoUpload}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#2D4635' }}
          >
            <Upload className="w-4 h-4" />
            آپلود
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <img src={photo} alt={`عکس ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <button
            onClick={handlePhotoUpload}
            className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#2D4635' }}
          >
            <Upload className="w-8 h-8 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
          <Award className="w-5 h-5" style={{ color: '#2D4635' }} />
          آخرین دستاوردها
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-lg p-4 text-center" style={{ borderColor: '#2D4635' }}>
            <div className="text-4xl mb-2">🏔️</div>
            <div className="font-semibold">کوهنورد حرفه‌ای</div>
            <div className="text-xs text-gray-600">100 کیلومتر</div>
          </div>
          <div className="border rounded-lg p-4 text-center" style={{ borderColor: '#2D4635' }}>
            <div className="text-4xl mb-2">⭐</div>
            <div className="font-semibold">فاتح قله‌ها</div>
            <div className="text-xs text-gray-600">10 قله</div>
          </div>
          <div className="border rounded-lg p-4 text-center" style={{ borderColor: '#2D4635' }}>
            <div className="text-4xl mb-2">🎯</div>
            <div className="font-semibold">هفته فعال</div>
            <div className="text-xs text-gray-600">7 روز پیاپی</div>
          </div>
          <div className="border rounded-lg p-4 text-center" style={{ borderColor: '#2D4635' }}>
            <div className="text-4xl mb-2">👥</div>
            <div className="font-semibold">رهبر گروه</div>
            <div className="text-xs text-gray-600">5 رویداد</div>
          </div>
        </div>

        <button
          onClick={() => {}}
          className="w-full mt-4 border text-center py-2 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ borderColor: '#2D4635', color: '#2D4635' }}
        >
          مشاهده همه دستاوردها
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" style={{ color: '#2D4635' }} />
            دنبال‌شوندگان ({followedUsers.length})
          </h3>

          <div className="space-y-3">
            {followedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#2D4635' }}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{user.name}</div>
                    <div className="text-xs text-gray-600">{user.username}</div>
                  </div>
                </div>
                <button className="text-xs px-3 py-1 border rounded-lg" style={{ borderColor: '#2D4635', color: '#2D4635' }}>
                  دنبال می‌کنم
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" style={{ color: '#2D4635' }} />
            رویدادهای آینده ({upcomingEvents.length})
          </h3>

          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-3" style={{ borderColor: '#2D4635' }}>
                <div className="font-semibold text-sm mb-1">{event.title}</div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{event.date}</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.participants} نفر
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">آمار کلی فعالیت‌ها</h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: '#2D4635' }} />
                <span className="text-sm">مسافت طی‌شده</span>
              </div>
              <span className="font-semibold">{stats.totalDistance} کیلومتر</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full" style={{ width: '75%', backgroundColor: '#2D4635' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4" style={{ color: '#2D4635' }} />
                <span className="text-sm">ارتفاع کسب شده</span>
              </div>
              <span className="font-semibold">{stats.totalElevation} متر</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full" style={{ width: '60%', backgroundColor: '#2D4635' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#2D4635' }} />
                <span className="text-sm">زمان فعالیت</span>
              </div>
              <span className="font-semibold">{stats.totalTime} ساعت</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full" style={{ width: '85%', backgroundColor: '#2D4635' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

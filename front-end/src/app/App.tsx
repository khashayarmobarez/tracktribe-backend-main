import { useState } from 'react';
import { Home } from './components/Home';
import { TrailDetail } from './components/TrailDetail';
import { Navigation } from './components/Navigation';
import { Recording } from './components/Recording';
import { Events } from './components/Events';
import { Search } from './components/Search';
import { SavedTrails } from './components/SavedTrails';
import { Profile } from './components/Profile';
import { Achievements } from './components/Achievements';
import { Settings } from './components/Settings';
import { Menu as MenuIcon, X, Home as HomeIcon, Search as SearchIcon, MapPin, Users, User } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTrailId, setSelectedTrailId] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleViewTrail = (trailId: number) => {
    setSelectedTrailId(trailId);
    setCurrentPage('detail');
  };

  const handleStartNavigation = (trailId: number) => {
    setSelectedTrailId(trailId);
    setCurrentPage('navigation');
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setShowMenu(false);
  };

  return (
    <div className="size-full flex flex-col" dir="rtl" style={{ backgroundColor: '#F5F5F0' }}>
      <header className="px-4 py-3 shadow-md flex items-center justify-between" style={{ backgroundColor: '#2D4635' }}>
        <h1 className="text-xl text-white font-bold">Track Tribe</h1>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {showMenu ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </header>

      {showMenu && (
        <div className="absolute top-14 left-0 right-0 bg-white shadow-lg z-50 border-b" dir="rtl">
          <div className="p-2">
            <button
              onClick={() => navigateTo('profile')}
              className="w-full text-right px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              پروفایل
            </button>
            <button
              onClick={() => navigateTo('saved')}
              className="w-full text-right px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              مسیرهای ذخیره‌شده
            </button>
            <button
              onClick={() => navigateTo('achievements')}
              className="w-full text-right px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              دستاوردها
            </button>
            <button
              onClick={() => navigateTo('settings')}
              className="w-full text-right px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              تنظیمات
            </button>
            <button
              onClick={() => alert('خروج از حساب کاربری')}
              className="w-full text-right px-4 py-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            >
              خروج
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-auto">
        {currentPage === 'home' && <Home onViewTrail={handleViewTrail} />}
        {currentPage === 'detail' && selectedTrailId !== null && (
          <TrailDetail trailId={selectedTrailId} onStartNavigation={handleStartNavigation} />
        )}
        {currentPage === 'navigation' && selectedTrailId !== null && (
          <Navigation trailId={selectedTrailId} />
        )}
        {currentPage === 'recording' && <Recording />}
        {currentPage === 'events' && <Events />}
        {currentPage === 'search' && <Search onViewTrail={handleViewTrail} />}
        {currentPage === 'saved' && <SavedTrails onViewTrail={handleViewTrail} />}
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'achievements' && <Achievements />}
        {currentPage === 'settings' && <Settings />}
      </main>

      <nav className="bg-white border-t shadow-lg fixed bottom-0 left-0 right-0 z-40" style={{ borderColor: '#2D4635' }}>
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'home' ? 'text-white' : 'text-gray-600'
            }`}
            style={currentPage === 'home' ? { backgroundColor: '#2D4635' } : {}}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs mt-1">خانه</span>
          </button>

          <button
            onClick={() => setCurrentPage('search')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'search' ? 'text-white' : 'text-gray-600'
            }`}
            style={currentPage === 'search' ? { backgroundColor: '#2D4635' } : {}}
          >
            <SearchIcon className="w-6 h-6" />
            <span className="text-xs mt-1">جستجو</span>
          </button>

          <button
            onClick={() => setCurrentPage('recording')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'recording' ? 'text-white' : 'text-gray-600'
            }`}
            style={currentPage === 'recording' ? { backgroundColor: '#2D4635' } : {}}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs mt-1">نقشه</span>
          </button>

          <button
            onClick={() => setCurrentPage('events')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'events' ? 'text-white' : 'text-gray-600'
            }`}
            style={currentPage === 'events' ? { backgroundColor: '#2D4635' } : {}}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">رویدادها</span>
          </button>

          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'profile' ? 'text-white' : 'text-gray-600'
            }`}
            style={currentPage === 'profile' ? { backgroundColor: '#2D4635' } : {}}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">پروفایل</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

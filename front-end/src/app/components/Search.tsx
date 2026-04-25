import { useState } from 'react';
import { trails } from '../data/trails';
import { TrailCard } from './TrailCard';
import { Search as SearchIcon, MapPin, Map, List, Locate } from 'lucide-react';

interface SearchProps {
  onViewTrail: (trailId: number) => void;
}

export function Search({ onViewTrail }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'name' | 'region' | 'activity' | 'nearby'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredTrails = trails.filter(trail => {
    const query = searchQuery.toLowerCase();

    if (searchType === 'nearby') {
      return true;
    }

    if (!query) return true;

    switch (searchType) {
      case 'name':
        return trail.name.toLowerCase().includes(query);
      case 'region':
        return trail.region.toLowerCase().includes(query);
      case 'activity':
        return trail.activityType.toLowerCase().includes(query);
      default:
        return (
          trail.name.toLowerCase().includes(query) ||
          trail.region.toLowerCase().includes(query) ||
          trail.activityType.toLowerCase().includes(query) ||
          trail.description.toLowerCase().includes(query)
        );
    }
  });

  return (
    <div className="size-full flex flex-col pb-16">
      <div className="container mx-auto p-4 max-w-6xl flex-1 overflow-auto">
        <div className="text-white rounded-xl p-6 mb-6 shadow-lg" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }}>
          <h2 className="text-2xl mb-2">جستجو</h2>
          <p className="opacity-90">مسیر مورد نظر خود را پیدا کنید</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مسیرها، مناطق، نوع فعالیت..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#2D4635' } as React.CSSProperties}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            <button
              onClick={() => setSearchType('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                searchType === 'all'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={searchType === 'all' ? { backgroundColor: '#2D4635' } : {}}
            >
              همه
            </button>
            <button
              onClick={() => setSearchType('name')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                searchType === 'name'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={searchType === 'name' ? { backgroundColor: '#2D4635' } : {}}
            >
              نام مسیر
            </button>
            <button
              onClick={() => setSearchType('region')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                searchType === 'region'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={searchType === 'region' ? { backgroundColor: '#2D4635' } : {}}
            >
              منطقه
            </button>
            <button
              onClick={() => setSearchType('activity')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                searchType === 'activity'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={searchType === 'activity' ? { backgroundColor: '#2D4635' } : {}}
            >
              نوع فعالیت
            </button>
            <button
              onClick={() => setSearchType('nearby')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 ${
                searchType === 'nearby'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={searchType === 'nearby' ? { backgroundColor: '#2D4635' } : {}}
            >
              <Locate className="w-4 h-4" />
              اطراف من
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={viewMode === 'list' ? { backgroundColor: '#2D4635' } : {}}
            >
              <List className="w-5 h-5" />
              لیست
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'map'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={viewMode === 'map' ? { backgroundColor: '#2D4635' } : {}}
            >
              <Map className="w-5 h-5" />
              نقشه
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                نتایج ({filteredTrails.length})
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
                <p>مسیری با این مشخصات یافت نشد</p>
                <p className="text-sm mt-2">لطفاً عبارت جستجو را تغییر دهید</p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 420px)' }}>
            <div className="relative w-full h-full">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                style={{ backgroundColor: '#E8F5E9' }}
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8E6C9" strokeWidth="1" />
                  </pattern>
                </defs>

                <rect width="800" height="600" fill="url(#grid)" />

                <g opacity="0.3">
                  <path d="M 100 200 Q 150 150 200 180 Q 250 210 300 190" fill="none" stroke="#2D4635" strokeWidth="2" />
                  <path d="M 400 300 Q 450 250 500 280 Q 550 310 600 290" fill="none" stroke="#2D4635" strokeWidth="2" />
                  <path d="M 200 400 Q 300 350 400 380" fill="none" stroke="#2D4635" strokeWidth="2" />
                </g>

                {filteredTrails.map((trail, index) => {
                  const x = 150 + (index % 4) * 150;
                  const y = 150 + Math.floor(index / 4) * 150;

                  return (
                    <g key={trail.id} onClick={() => onViewTrail(trail.id)} style={{ cursor: 'pointer' }}>
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill="#2D4635"
                        stroke="white"
                        strokeWidth="3"
                      />

                      <foreignObject x={x - 80} y={y + 15} width="160" height="100">
                        <div className="bg-white rounded-lg shadow-lg p-3 border-2" style={{ borderColor: '#2D4635' }}>
                          <div className="font-semibold text-sm mb-1">{trail.name}</div>
                          <div className="text-xs text-gray-600 mb-1">{trail.region}</div>
                          <div className="text-xs px-2 py-1 rounded inline-block" style={{ backgroundColor: '#F5F5F0', color: '#2D4635' }}>
                            {trail.length} کیلومتر
                          </div>
                        </div>
                      </foreignObject>

                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="none"
                        stroke="#2D4635"
                        strokeWidth="2"
                        opacity="0.3"
                      >
                        <animate
                          attributeName="r"
                          from="12"
                          to="20"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.3"
                          to="0"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  );
                })}

                <circle
                  cx="400"
                  cy="300"
                  r="10"
                  fill="#FF5722"
                  stroke="white"
                  strokeWidth="3"
                />
                <text x="400" y="330" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FF5722">
                  موقعیت شما
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

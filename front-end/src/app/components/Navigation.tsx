import { useState, useEffect } from 'react';
import { trails } from '../data/trails';
import { Compass, Navigation2, AlertTriangle, MapPin, TrendingUp } from 'lucide-react';

interface NavigationProps {
  trailId: number;
}

export function Navigation({ trailId }: NavigationProps) {
  const trail = trails.find(t => t.id === trailId);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [offRouteWarning, setOffRouteWarning] = useState(false);
  const [heading, setHeading] = useState(0);
  const [distanceToNext, setDistanceToNext] = useState(0);
  const [currentPOI, setCurrentPOI] = useState<string | null>(null);

  useEffect(() => {
    if (!isNavigating || !trail) return;

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentPosition(newPos);

          const nearestPoint = findNearestPoint(newPos, trail.route);
          const distance = calculateDistance(newPos, nearestPoint);

          if (distance > 20) {
            setOffRouteWarning(true);
          } else {
            setOffRouteWarning(false);
          }

          const nextPOI = findNextPOI(newPos, trail.pointsOfInterest);
          if (nextPOI) {
            setCurrentPOI(nextPOI.name);
            setDistanceToNext(calculateDistance(newPos, nextPOI));
          }
        },
        (error) => {
          console.error('GPS Error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      const simulatedPos = trail.route[0];
      setCurrentPosition(simulatedPos);
      const nextPOI = trail.pointsOfInterest[0];
      if (nextPOI) {
        setCurrentPOI(nextPOI.name);
        setDistanceToNext(0.5);
      }
    }
  }, [isNavigating, trail]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeading(prev => (prev + 5) % 360);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!trail) {
    return <div className="p-4">مسیر یافت نشد</div>;
  }

  const findNearestPoint = (pos: { lat: number; lng: number }, route: { lat: number; lng: number }[]) => {
    let nearest = route[0];
    let minDist = Infinity;

    route.forEach(point => {
      const dist = calculateDistance(pos, point);
      if (dist < minDist) {
        minDist = dist;
        nearest = point;
      }
    });

    return nearest;
  };

  const calculateDistance = (p1: { lat: number; lng: number }, p2: { lat: number; lng: number }) => {
    const R = 6371;
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLng = (p2.lng - p1.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
  };

  const findNextPOI = (pos: { lat: number; lng: number }, pois: { name: string; lat: number; lng: number }[]) => {
    return pois.reduce((nearest, poi) => {
      if (!nearest) return poi;
      const distToNearest = calculateDistance(pos, nearest);
      const distToPOI = calculateDistance(pos, poi);
      return distToPOI < distToNearest ? poi : nearest;
    }, pois[0]);
  };

  return (
    <div className="size-full flex flex-col">
      {offRouteWarning && (
        <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-3 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold">هشدار: شما از مسیر اصلی خارج شده‌اید!</span>
        </div>
      )}

      <div className="flex-1 relative bg-gray-100">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          style={{ transform: 'scaleX(-1)' }}
        >
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ecfdf5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d1fae5', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <rect width="400" height="400" fill="url(#mapGradient)" />

          <g opacity="0.3">
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 400}
                cy={Math.random() * 400}
                r={Math.random() * 30 + 10}
                fill="#10b981"
              />
            ))}
          </g>

          <polyline
            points={trail.route.map((p, i) => {
              const x = 50 + (i / trail.route.length) * 300;
              const y = 200 + Math.sin(i * 0.5) * 100;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {trail.pointsOfInterest.map((poi, i) => {
            const routeIndex = Math.floor((i / trail.pointsOfInterest.length) * trail.route.length);
            const x = 50 + (routeIndex / trail.route.length) * 300;
            const y = 200 + Math.sin(routeIndex * 0.5) * 100;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="#ef4444"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y - 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#1f2937"
                  fontWeight="bold"
                  style={{ transform: 'scaleX(-1)', transformOrigin: `${x}px ${y - 15}px` }}
                >
                  {poi.name}
                </text>
              </g>
            );
          })}

          <circle
            cx="200"
            cy="200"
            r="10"
            fill="#10b981"
            stroke="white"
            strokeWidth="3"
          >
            <animate
              attributeName="r"
              values="10;14;10"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <div className="absolute top-4 right-4 bg-white rounded-full p-4 shadow-lg">
          <div className="relative w-16 h-16">
            <Compass
              className="w-16 h-16 text-emerald-600"
              style={{ transform: `rotate(${heading}deg)`, transition: 'transform 0.3s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold">N</span>
            </div>
          </div>
        </div>

        {currentPOI && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{currentPOI}</span>
              <span>•</span>
              <span>{distanceToNext.toFixed(0)} متر</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 p-4 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600">طول مسیر</div>
            <div className="font-semibold text-lg">{trail.length} km</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">ارتفاع فعلی</div>
            <div className="font-semibold text-lg">{trail.route[0].elevation} m</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">فاصله باقی‌مانده</div>
            <div className="font-semibold text-lg">{(trail.length * 0.7).toFixed(1)} km</div>
          </div>
        </div>

        {!isNavigating ? (
          <button
            onClick={() => setIsNavigating(true)}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation2 className="w-5 h-5" />
            شروع مسیریابی
          </button>
        ) : (
          <button
            onClick={() => setIsNavigating(false)}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            توقف مسیریابی
          </button>
        )}

        {isNavigating && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>در مسیر صحیح قرار دارید. به مدت 600 متر در امتداد مسیر ادامه دهید.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

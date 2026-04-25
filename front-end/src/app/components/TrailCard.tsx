import { Trail } from '../data/trails';
import { Star, MapPin, Clock, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface TrailCardProps {
  trail: Trail;
  onViewDetails: () => void;
}

export function TrailCard({ trail, onViewDetails }: TrailCardProps) {
  const difficultyColors = {
    'آسان': 'bg-green-100 text-green-800',
    'متوسط': 'bg-yellow-100 text-yellow-800',
    'سخت': 'bg-red-100 text-red-800'
  };

  const statusColors = {
    'باز': 'text-green-600',
    'موقتاً بسته': 'text-red-600',
    'خطر فصلی': 'text-amber-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <ImageWithFallback
          src={trail.images[0]}
          alt={trail.name}
          className="w-full h-full object-cover"
        />
        {trail.verified && (
          <div className="absolute top-2 left-2 bg-[#2D4635] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            تأییدشده
          </div>
        )}
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[trail.difficulty]}`}>
          {trail.difficulty}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{trail.name}</h3>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{trail.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">({trail.reviewCount})</span>
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{trail.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>{trail.length} کیلومتر</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{trail.duration}</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 mb-4 text-sm font-semibold ${statusColors[trail.status]}`}>
          {trail.status === 'خطر فصلی' && <AlertTriangle className="w-4 h-4" />}
          <span>{trail.status}</span>
        </div>

        <button
          onClick={onViewDetails}
          className="w-full bg-[#2D4635] text-white py-2 rounded-lg hover:bg-[#3D5A45] transition-colors"
        >
          مشاهده جزئیات
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { trails, reviews as allReviews } from '../data/trails';
import {
  Star, MapPin, TrendingUp, Clock, Mountain, ChevronLeft,
  AlertTriangle, CheckCircle, Cloud, Wind, Droplets, Navigation2,
  Flag, MessageSquare, ThumbsUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from './ImageWithFallback';

interface TrailDetailProps {
  trailId: number;
  onStartNavigation: (trailId: number) => void;
}

export function TrailDetail({ trailId, onStartNavigation }: TrailDetailProps) {
  const trail = trails.find(t => t.id === trailId);
  const reviews = allReviews.filter(r => r.trailId === trailId);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  if (!trail) {
    return <div className="p-4">مسیر یافت نشد</div>;
  }

  const elevationData = trail.route.map((point, index) => ({
    distance: ((index / trail.route.length) * trail.length).toFixed(1),
    elevation: point.elevation
  }));

  const mockWeather = {
    temp: 18,
    condition: 'آفتابی',
    wind: 12,
    humidity: 45,
    precipitation: 10
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl pb-20">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="relative h-64 md:h-96">
          <ImageWithFallback
            src={trail.images[0]}
            alt={trail.name}
            className="w-full h-full object-cover"
          />
          {trail.verified && (
            <div className="absolute top-4 left-4 bg-[#2D4635] text-white px-3 py-2 rounded-full text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              تأییدشده
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{trail.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{trail.region}</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              trail.difficulty === 'آسان' ? 'bg-green-100 text-green-800' :
              trail.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {trail.difficulty}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg">{trail.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500">({trail.reviewCount} نظر)</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">طول مسیر</span>
              </div>
              <div className="font-semibold">{trail.length} کیلومتر</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">مدت زمان</span>
              </div>
              <div className="font-semibold">{trail.duration}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Mountain className="w-4 h-4" />
                <span className="text-sm">ارتفاع کسب شده</span>
              </div>
              <div className="font-semibold">{trail.elevationGain} متر</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Flag className="w-4 h-4" />
                <span className="text-sm">نوع فعالیت</span>
              </div>
              <div className="font-semibold text-sm">{trail.activityType}</div>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
            trail.status === 'باز' ? 'bg-green-50 border border-green-200' :
            trail.status === 'موقتاً بسته' ? 'bg-red-50 border border-red-200' :
            'bg-amber-50 border border-amber-200'
          }`}>
            {trail.status === 'خطر فصلی' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
            <div>
              <div className={`font-semibold ${
                trail.status === 'باز' ? 'text-green-800' :
                trail.status === 'موقتاً بسته' ? 'text-red-800' :
                'text-amber-800'
              }`}>
                وضعیت: {trail.status}
              </div>
              {trail.statusNote && (
                <p className="text-sm mt-1">{trail.statusNote}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => onStartNavigation(trailId)}
            className="w-full bg-[#2D4635] text-white py-3 rounded-lg hover:bg-[#3D5A45] transition-colors flex items-center justify-center gap-2 mb-4"
          >
            <Navigation2 className="w-5 h-5" />
            شروع مسیریابی
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="w-full border border-amber-600 text-amber-600 py-2 rounded-lg hover:bg-amber-50 transition-colors"
          >
            گزارش مشکل
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">آب و هوای مسیر</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">دما</div>
              <div className="font-semibold">{mockWeather.temp}°C</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="w-8 h-8 text-gray-500" />
            <div>
              <div className="text-sm text-gray-600">باد</div>
              <div className="font-semibold">{mockWeather.wind} km/h</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-sm text-gray-600">رطوبت</div>
              <div className="font-semibold">{mockWeather.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">بارش</div>
              <div className="font-semibold">{mockWeather.precipitation}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">پروفیل ارتفاعی</h2>
        <div className="h-64" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={elevationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="distance"
                label={{ value: 'فاصله (کیلومتر)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'ارتفاع (متر)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value: number) => [`${value} متر`, 'ارتفاع']}
                labelFormatter={(label) => `فاصله: ${label} کیلومتر`}
              />
              <Line
                type="monotone"
                dataKey="elevation"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <div className="text-sm text-gray-600">کمترین ارتفاع</div>
            <div className="font-semibold">{trail.minElevation} متر</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">بیشترین ارتفاع</div>
            <div className="font-semibold">{trail.maxElevation} متر</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">ارتفاع کسب شده</div>
            <div className="font-semibold">{trail.elevationGain} متر</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">درباره مسیر</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{trail.description}</p>

        <h3 className="font-semibold mb-2 text-red-600">نکات ایمنی:</h3>
        <ul className="space-y-2">
          {trail.safetyNotes.map((note, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">گالری تصاویر</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {trail.images.map((image, index) => (
            <ImageWithFallback
              key={index}
              src={image}
              alt={`${trail.name} - تصویر ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">نظرات کاربران</h2>
          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#2D4635] text-white px-4 py-2 rounded-lg hover:bg-[#3D5A45] transition-colors text-sm"
          >
            ثبت نظر
          </button>
        </div>

        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{review.author}</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`${review.id}-star-${i}`}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>
          ))}
        </div>
      </div>

      {showReportModal && (
        <ReportModal onClose={() => setShowReportModal(false)} />
      )}

      {showReviewModal && (
        <ReviewModal onClose={() => setShowReviewModal(false)} />
      )}
    </div>
  );
}

function ReportModal({ onClose }: { onClose: () => void }) {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    alert('گزارش شما ثبت شد و در اسرع وقت بررسی خواهد شد.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">گزارش مشکل</h3>

        <div className="mb-4">
          <label className="block text-sm mb-2">نوع مشکل</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">انتخاب کنید</option>
            <option value="closed">مسیر بسته است</option>
            <option value="wrong">اطلاعات مسیر اشتباه است</option>
            <option value="danger">خطر ریزش سنگ</option>
            <option value="other">سایر</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px]"
            placeholder="جزئیات مشکل را بنویسید..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#2D4635] text-white py-2 rounded-lg hover:bg-[#3D5A45] transition-colors"
          >
            ارسال گزارش
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    alert('نظر شما ثبت شد و پس از بررسی نمایش داده خواهد شد.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">ثبت نظر</h3>

        <div className="mb-4">
          <label className="block text-sm mb-2">امتیاز شما</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">نظر شما</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px]"
            placeholder="تجربه خود را با سایرین به اشتراک بگذارید..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#2D4635] text-white py-2 rounded-lg hover:bg-[#3D5A45] transition-colors"
          >
            ثبت نظر
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

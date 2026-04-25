import { useState } from 'react';
import { events } from '../data/trails';
import { Calendar, MapPin, Clock, Users, User, Plus, Bell } from 'lucide-react';

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userParticipation, setUserParticipation] = useState<Record<number, 'yes' | 'maybe' | null>>({});

  const handleParticipate = (eventId: number, status: 'yes' | 'maybe') => {
    setUserParticipation(prev => ({ ...prev, [eventId]: status }));
    alert(`شما در رویداد "${events.find(e => e.id === eventId)?.title}" ثبت‌نام شدید.`);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20">
      <div className="text-white rounded-xl p-6 mb-6 shadow-lg" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-2 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              رویدادهای گروهی
            </h2>
            <p className="opacity-90">به گروه‌های طبیعت‌گردی بپیوندید</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            style={{ color: '#2D4635' }}
          >
            <Plus className="w-5 h-5" />
            ایجاد رویداد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => {
          const participation = userParticipation[event.id];
          const spotsLeft = event.maxParticipants - event.participantCount;

          return (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-linear-to-l from-[#2D4635] to-[#3D5A45] text-white p-4">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <User className="w-4 h-4" />
                  <span>{event.organizer}</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4 text-[#2D4635]" />
                  <span className="text-sm">{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4 text-[#2D4635]" />
                  <span className="text-sm">{event.time}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-[#2D4635]" />
                  <span className="text-sm">{event.meetingPoint}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4 text-[#2D4635]" />
                  <span className="text-sm">
                    {event.participantCount} / {event.maxParticipants} نفر
                  </span>
                </div>

                <div className={`text-sm px-3 py-1 rounded-full inline-block ${
                  event.difficulty === 'آسان' ? 'bg-green-100 text-green-800' :
                  event.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  سطح: {event.difficulty}
                </div>

                <p className="text-sm text-gray-600 pt-2 border-t">
                  {event.description}
                </p>

                {spotsLeft <= 3 && spotsLeft > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-sm text-amber-800">
                    فقط {spotsLeft} جا باقی مانده!
                  </div>
                )}

                {participation ? (
                  <div className="bg-[#E8F0EA] border border-[#A8C4B0] rounded-lg p-3 text-center">
                    <div className="text-[#1D3625] font-semibold mb-2">
                      ✓ شما در این رویداد ثبت‌نام کرده‌اید
                    </div>
                    <div className="text-xs text-[#1D3625]">
                      یادآوری‌ها: 24 ساعت و 1 ساعت قبل از رویداد
                    </div>
                  </div>
                ) : spotsLeft > 0 ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleParticipate(event.id, 'yes')}
                      className="flex-1 bg-[#2D4635] text-white py-2 rounded-lg hover:bg-[#3D5A45] transition-colors text-sm"
                    >
                      می‌روم
                    </button>
                    <button
                      onClick={() => handleParticipate(event.id, 'maybe')}
                      className="flex-1 border border-[#2D4635] text-[#2D4635] py-2 rounded-lg hover:bg-[#E8F0EA] transition-colors text-sm"
                    >
                      شاید
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-600 py-2 rounded-lg text-center text-sm">
                    ظرفیت تکمیل شده
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">یادآوری‌های خودکار</h4>
            <p className="text-sm text-blue-800">
              برای رویدادهایی که در آن ثبت‌نام کرده‌اید، 24 ساعت و 1 ساعت قبل از شروع، یک یادآوری دریافت خواهید کرد.
            </p>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateEventModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

function CreateEventModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    meetingPoint: '',
    difficulty: 'متوسط',
    maxParticipants: 15,
    description: ''
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.time || !formData.meetingPoint) {
      alert('لطفاً تمام فیلدهای الزامی را پر کنید.');
      return;
    }

    alert('رویداد شما ایجاد شد و پس از بررسی نمایش داده خواهد شد.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full my-8" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">ایجاد رویداد جدید</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">عنوان رویداد *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="مثال: صعود گروهی به دماوند"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-2">تاریخ *</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="1403/03/15"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">ساعت *</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="08:00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">نقطه تجمع *</label>
            <input
              type="text"
              value={formData.meetingPoint}
              onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="مثال: پارکینگ شماره 1 دربند"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">سطح سختی</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="آسان">آسان</option>
              <option value="متوسط">متوسط</option>
              <option value="سخت">سخت</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">حداکثر تعداد شرکت‌کنندگان</label>
            <input
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="5"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">توضیحات</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
              placeholder="جزئیات رویداد را بنویسید..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#2D4635] text-white py-2 rounded-lg hover:bg-[#3D5A45] transition-colors"
          >
            ایجاد رویداد
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            انصراف
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 text-sm text-amber-800">
          <strong>توجه:</strong> فقط کاربران تأییدشده می‌توانند رویداد ایجاد کنند. رویداد شما پس از بررسی نمایش داده خواهد شد.
        </div>
      </div>
    </div>
  );
}

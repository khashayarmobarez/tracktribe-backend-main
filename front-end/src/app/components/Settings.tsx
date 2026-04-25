import { Bell, Lock, Globe, Moon, HelpCircle, Info } from 'lucide-react';

export function Settings() {
  return (
    <div className="container mx-auto p-4 max-w-2xl pb-20">
      <div className="text-white rounded-xl p-6 mb-6 shadow-lg" style={{ background: 'linear-gradient(to left, #2D4635, #3D5A45)' }}>
        <h2 className="text-2xl mb-2">تنظیمات</h2>
        <p className="opacity-90">مدیریت حساب کاربری و تنظیمات اپلیکیشن</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b" style={{ borderColor: '#2D4635', backgroundColor: '#F5F5F0' }}>
            <h3 className="font-bold">اعلان‌ها</h3>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: '#2D4635' }} />
                <div>
                  <div className="font-semibold">یادآوری رویدادها</div>
                  <div className="text-sm text-gray-600">دریافت یادآوری برای رویدادهای آینده</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D4635]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: '#2D4635' }} />
                <div>
                  <div className="font-semibold">دستاوردهای جدید</div>
                  <div className="text-sm text-gray-600">اعلان برای کسب دستاوردهای جدید</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D4635]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: '#2D4635' }} />
                <div>
                  <div className="font-semibold">فعالیت دوستان</div>
                  <div className="text-sm text-gray-600">اعلان فعالیت‌های کاربران دنبال‌شده</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D4635]"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b" style={{ borderColor: '#2D4635', backgroundColor: '#F5F5F0' }}>
            <h3 className="font-bold">حریم خصوصی</h3>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" style={{ color: '#2D4635' }} />
                <div>
                  <div className="font-semibold">پروفایل عمومی</div>
                  <div className="text-sm text-gray-600">سایرین می‌توانند پروفایل شما را ببینند</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D4635]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" style={{ color: '#2D4635' }} />
                <div>
                  <div className="font-semibold">نمایش فعالیت‌ها</div>
                  <div className="text-sm text-gray-600">نمایش فعالیت‌های شما برای سایرین</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D4635]"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b" style={{ borderColor: '#2D4635', backgroundColor: '#F5F5F0' }}>
            <h3 className="font-bold">نمایش</h3>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5" style={{ color: '#2D4635' }} />
                <div>
                  <div className="font-semibold">حالت شب</div>
                  <div className="text-sm text-gray-600">استفاده از تم تیره</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D4635]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" style={{ color: '#2D4635' }} />
                <div>
                  <div className="font-semibold">زبان</div>
                  <div className="text-sm text-gray-600">زبان نمایش اپلیکیشن</div>
                </div>
              </div>
              <select className="border rounded-lg px-3 py-2 text-sm" style={{ borderColor: '#2D4635' }}>
                <option>فارسی</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5" style={{ color: '#2D4635' }} />
              <span className="font-semibold">راهنما و پشتیبانی</span>
            </div>
            <span className="text-gray-400">←</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5" style={{ color: '#2D4635' }} />
              <span className="font-semibold">درباره Track Tribe</span>
            </div>
            <span className="text-gray-400">←</span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          نسخه 1.0.0
        </div>
      </div>
    </div>
  );
}

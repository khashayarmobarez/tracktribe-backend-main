export interface Trail {
  id: number;
  name: string;
  region: string;
  difficulty: 'آسان' | 'متوسط' | 'سخت';
  length: number;
  duration: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  status: 'باز' | 'موقتاً بسته' | 'خطر فصلی';
  statusNote?: string;
  activityType: 'پیاده‌روی' | 'کوهنوردی' | 'دوچرخه‌سواری';
  description: string;
  safetyNotes: string[];
  images: string[];
  elevationGain: number;
  maxElevation: number;
  minElevation: number;
  route: { lat: number; lng: number; elevation: number }[];
  pointsOfInterest: { name: string; lat: number; lng: number; type: string }[];
}

export interface Review {
  id: number;
  trailId: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  meetingPoint: string;
  trailId: number;
  difficulty: string;
  organizer: string;
  participantCount: number;
  maxParticipants: number;
  description: string;
}

export const trails: Trail[] = [
  {
    id: 1,
    name: 'مسیر دربند - قله توچال',
    region: 'تهران',
    difficulty: 'سخت',
    length: 12.5,
    duration: '6-8 ساعت',
    rating: 4.7,
    reviewCount: 342,
    verified: true,
    status: 'باز',
    activityType: 'کوهنوردی',
    description: 'یکی از محبوب‌ترین مسیرهای کوهنوردی تهران با چشم‌انداز فوق‌العاده به شهر و کوه‌های البرز',
    safetyNotes: [
      'در زمستان احتمال یخبندان و برف سنگین',
      'حتماً تجهیزات کافی همراه داشته باشید',
      'در روزهای مه‌آلود از حرکت خودداری کنید'
    ],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'
    ],
    elevationGain: 1800,
    maxElevation: 3964,
    minElevation: 2100,
    route: [
      { lat: 35.8106, lng: 51.4425, elevation: 2100 },
      { lat: 35.8156, lng: 51.4475, elevation: 2300 },
      { lat: 35.8206, lng: 51.4525, elevation: 2600 },
      { lat: 35.8256, lng: 51.4575, elevation: 2900 },
      { lat: 35.8306, lng: 51.4625, elevation: 3200 },
      { lat: 35.8356, lng: 51.4675, elevation: 3500 },
      { lat: 35.8406, lng: 51.4725, elevation: 3800 },
      { lat: 35.8456, lng: 51.4775, elevation: 3964 }
    ],
    pointsOfInterest: [
      { name: 'چشمه دربند', lat: 35.8126, lng: 51.4445, type: 'water' },
      { name: 'پناهگاه شماره 1', lat: 35.8256, lng: 51.4575, type: 'shelter' },
      { name: 'قله توچال', lat: 35.8456, lng: 51.4775, type: 'peak' }
    ]
  },
  {
    id: 2,
    name: 'دریاچه گهر - دورهمی',
    region: 'لرستان',
    difficulty: 'متوسط',
    length: 8.3,
    duration: '4-5 ساعت',
    rating: 4.9,
    reviewCount: 218,
    verified: true,
    status: 'باز',
    activityType: 'پیاده‌روی',
    description: 'مسیر زیبا و دلنشین در اطراف دریاچه گهر با طبیعت بکر و هوای خنک کوهستانی',
    safetyNotes: [
      'در بهار و تابستان مناسب است',
      'ضدآفتاب و کلاه همراه داشته باشید',
      'به حیوانات وحشی محلی احترام بگذارید'
    ],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800'
    ],
    elevationGain: 450,
    maxElevation: 2450,
    minElevation: 2000,
    route: [
      { lat: 33.2345, lng: 49.8765, elevation: 2000 },
      { lat: 33.2395, lng: 49.8815, elevation: 2150 },
      { lat: 33.2445, lng: 49.8865, elevation: 2300 },
      { lat: 33.2495, lng: 49.8915, elevation: 2450 },
      { lat: 33.2545, lng: 49.8965, elevation: 2350 },
      { lat: 33.2595, lng: 49.9015, elevation: 2200 }
    ],
    pointsOfInterest: [
      { name: 'دریاچه گهر', lat: 33.2445, lng: 49.8865, type: 'water' },
      { name: 'پارکینگ', lat: 33.2345, lng: 49.8765, type: 'parking' }
    ]
  },
  {
    id: 3,
    name: 'جنگل ابر - شاهرود',
    region: 'سمنان',
    difficulty: 'آسان',
    length: 5.2,
    duration: '2-3 ساعت',
    rating: 4.5,
    reviewCount: 156,
    verified: true,
    status: 'باز',
    activityType: 'پیاده‌روی',
    description: 'پیاده‌روی آرام در جنگل‌های ابری با رطوبت بالا و منظره شگفت‌انگیز',
    safetyNotes: [
      'مسیر ممکن است لغزنده باشد',
      'کفش مناسب همراه داشته باشید',
      'توجه به علائم راهنما'
    ],
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800'
    ],
    elevationGain: 280,
    maxElevation: 1950,
    minElevation: 1670,
    route: [
      { lat: 36.4189, lng: 55.0289, elevation: 1670 },
      { lat: 36.4239, lng: 55.0339, elevation: 1750 },
      { lat: 36.4289, lng: 55.0389, elevation: 1850 },
      { lat: 36.4339, lng: 55.0439, elevation: 1950 },
      { lat: 36.4389, lng: 55.0489, elevation: 1900 }
    ],
    pointsOfInterest: [
      { name: 'ورودی جنگل', lat: 36.4189, lng: 55.0289, type: 'entrance' },
      { name: 'چشمه ابر', lat: 36.4289, lng: 55.0389, type: 'water' }
    ]
  },
  {
    id: 4,
    name: 'آبشار شلماش - گیلان',
    region: 'گیلان',
    difficulty: 'متوسط',
    length: 6.8,
    duration: '3-4 ساعت',
    rating: 4.6,
    reviewCount: 189,
    verified: true,
    status: 'خطر فصلی',
    statusNote: 'در پاییز و زمستان احتمال ریزش سنگ',
    activityType: 'پیاده‌روی',
    description: 'مسیر زیبا به سمت آبشار شلماش در دل جنگل‌های انبوه گیلان',
    safetyNotes: [
      'در فصل بارش احتیاط کنید',
      'مسیر ممکن است گل‌آلود باشد',
      'از نزدیک شدن زیاد به لبه پرتگاه خودداری کنید'
    ],
    images: [
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800'
    ],
    elevationGain: 520,
    maxElevation: 1200,
    minElevation: 680,
    route: [
      { lat: 37.1234, lng: 49.5678, elevation: 680 },
      { lat: 37.1284, lng: 49.5728, elevation: 800 },
      { lat: 37.1334, lng: 49.5778, elevation: 950 },
      { lat: 37.1384, lng: 49.5828, elevation: 1100 },
      { lat: 37.1434, lng: 49.5878, elevation: 1200 }
    ],
    pointsOfInterest: [
      { name: 'روستای شلماش', lat: 37.1234, lng: 49.5678, type: 'village' },
      { name: 'آبشار', lat: 37.1434, lng: 49.5878, type: 'waterfall' }
    ]
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    trailId: 1,
    author: 'علی محمدی',
    rating: 5,
    date: '1403/02/15',
    comment: 'مسیر فوق‌العاده‌ای بود! منظره از قله واقعاً چشم‌نواز است. فقط حتماً آب کافی همراه داشته باشید.'
  },
  {
    id: 2,
    trailId: 1,
    author: 'مریم احمدی',
    rating: 4,
    date: '1403/01/28',
    comment: 'مسیر خوبی است اما برای مبتدی‌ها سخت. بهتر است ابتدا مسیرهای آسان‌تر را امتحان کنید.'
  },
  {
    id: 3,
    trailId: 2,
    author: 'رضا کریمی',
    rating: 5,
    date: '1403/02/10',
    comment: 'دریاچه گهر واقعاً بهشت روی زمین است. مسیر هم خیلی مناسب و راحت بود.'
  },
  {
    id: 4,
    trailId: 3,
    author: 'سارا نوری',
    rating: 4,
    date: '1403/01/20',
    comment: 'جنگل ابر خیلی زیباست. هوای خنک و دلپذیر داره. مناسب برای خانواده.'
  }
];

export const events: Event[] = [
  {
    id: 1,
    title: 'صعود گروهی به توچال',
    date: '1403/02/30',
    time: '06:00',
    meetingPoint: 'تله‌کابین دربند',
    trailId: 1,
    difficulty: 'سخت',
    organizer: 'کانون کوهنوردی البرز',
    participantCount: 12,
    maxParticipants: 20,
    description: 'صعود گروهی به قله توچال با همراهی راهنمای باتجربه. لطفاً تجهیزات کامل همراه داشته باشید.'
  },
  {
    id: 2,
    title: 'پیاده‌روی دریاچه گهر',
    date: '1403/03/05',
    time: '08:00',
    meetingPoint: 'میدان ورودی شهر دورود',
    trailId: 2,
    difficulty: 'متوسط',
    organizer: 'باشگاه کوهنوردی زاگرس',
    participantCount: 8,
    maxParticipants: 15,
    description: 'یک روز تفریحی در کنار دریاچه زیبای گهر. مناسب برای تمام سنین.'
  },
  {
    id: 3,
    title: 'کمپ در جنگل ابر',
    date: '1403/03/12',
    time: '14:00',
    meetingPoint: 'پارکینگ ورودی جنگل',
    trailId: 3,
    difficulty: 'آسان',
    organizer: 'گروه طبیعت‌گردی شمال',
    participantCount: 15,
    maxParticipants: 25,
    description: 'یک شب کمپ در دل جنگل ابر با شام دسته‌جمعی و کنسرت کوچک.'
  }
];

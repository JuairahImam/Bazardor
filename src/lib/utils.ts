export function toBnNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || isNaN(Number(num))) {
    return '০';
  }
  
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const formatted = num.toLocaleString('en-US'); // handles commas if number
  
  return formatted.replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

export function formatPrice(price: number | string | undefined | null): string {
  if (price === undefined || price === null) return '০ টাকা';
  return `${toBnNumber(price)} টাকা`;
}

export function formatUnit(unit: string | undefined): string {
  if (!unit) return 'প্রতি কেজি';
  const u = unit.toLowerCase();
  if (u === 'kg' || u === 'কেজি') return 'প্রতি কেজি';
  if (u === 'litre' || u === 'liter' || u === 'লিটার') return 'প্রতি লিটার';
  if (u === 'dozen' || u === 'ডজন') return 'প্রতি ডজন';
  if (u === 'piece' || u === 'pc' || u === 'pcs' || u === 'পিস') return 'প্রতি পিস';
  if (u.startsWith('প্রতি')) return unit;
  return `প্রতি ${unit}`;
}

export function getTodayDateBengali(): string {
  const now = new Date();
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const dayName = days[now.getDay()];
  const date = toBnNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const year = toBnNumber(now.getFullYear());

  return `${dayName}, ${date} ${monthName}, ${year}`;
}

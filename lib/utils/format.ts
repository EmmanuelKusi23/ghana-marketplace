import { formatDistanceToNow, format } from 'date-fns';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return format(new Date(date), 'MMM dd, yyyy');
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatPhoneNumber(phone: string): string {
  // Format Ghanaian phone numbers (e.g., 0244123456 to 024 412 3456)
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

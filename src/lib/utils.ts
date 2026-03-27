import slug from 'slug';

/**
 * Tạo URL-friendly slug từ tiếng Việt
 */
export function slugify(text: string): string {
  return slug(text, { lower: true, locale: 'vi' });
}

/**
 * Format ngày tháng kiểu Việt Nam: DD/MM/YYYY HH:mm
 */
export function formatDate(date: Date | string, includeTime = false): string {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  if (!includeTime) return `${day}/${month}/${year}`;

  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Cắt ngắn text và thêm "..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Tạo slug duy nhất, thêm suffix nếu trùng
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let finalSlug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return finalSlug;
}

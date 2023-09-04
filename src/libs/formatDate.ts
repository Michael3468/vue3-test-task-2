type TDateFormats = 'dd/mm/yyyy' | 'hh:mm:ss dd/mm/yyyy';

const addLeadingZeros = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

export default function formatDate(date: Date, dateFormat: TDateFormats): string | Date {
  if (!date) return '';

  const seconds = addLeadingZeros(date.getSeconds());
  const minutes = addLeadingZeros(date.getMinutes());
  const hours = addLeadingZeros(date.getHours());

  const day = addLeadingZeros(date.getDate());
  const month = addLeadingZeros(date.getMonth());
  const year = date.getFullYear();

  const datePrefix = 'created at:';

  switch (dateFormat) {
    case 'dd/mm/yyyy':
      return `${datePrefix} ${day}/${month}/${year}`;

    case 'hh:mm:ss dd/mm/yyyy':
      return `${datePrefix} ${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;

    default:
      return date;
  }
}

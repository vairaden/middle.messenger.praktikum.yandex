export default function getReadableTime(date: string) {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

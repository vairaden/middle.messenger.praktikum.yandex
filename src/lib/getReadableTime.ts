export default function getReadableTime(date: string) {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? '0' : ''}${dateObj.getMinutes()}`;
}

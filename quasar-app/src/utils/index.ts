export default function formatDate(date: string): string {
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date(date);
  return today.toLocaleDateString('en-US');
}
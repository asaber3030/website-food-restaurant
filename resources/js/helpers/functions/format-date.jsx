export default function formatDate(date, format = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}) {
  return new Date(date).toLocaleDateString("en-US", format)
}

export const fullDateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',

}

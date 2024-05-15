const MAX_LENGTH = 15
export function truncate(text) {
  if (text.length > MAX_LENGTH) {
    return text.substring(0, MAX_LENGTH) + ' ...'
  }
  return text
}
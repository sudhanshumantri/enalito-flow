export const getTitleShort = (title: string, id: string) => {
  return `${title}: ${id.substring(0, 3)}...`
}

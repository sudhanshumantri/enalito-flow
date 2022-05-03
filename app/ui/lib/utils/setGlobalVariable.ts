
export const SetGlobalVariable = (name: string, value: any) => {
  if (typeof window !== 'undefined' && document.documentElement) {
    document.documentElement.style.setProperty(name, value)
  }
}

export const CART_STORAGE_KEY = 'REACT_SHOPPING://CART_STORAGE_KEY'

export const setItem = (key: string, value: string): void => {
  if (!key) return

  window.localStorage.setItem(key, value)
}

export const getItem = (key: string): string => {
  if (!key) return ''

  return window.localStorage.getItem(key) || ''
}

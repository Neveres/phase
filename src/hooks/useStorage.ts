import { setItem, getItem, removeItem } from 'src/libraries'

/**
 * A custom hook to use client storage inside a React component
 * You can replce current client storage with any other client storages such as session storage, IndexedDB, etc.
 *
 * @param key - Key of data that stored in client storage
 * @param shoudlParse - Should process JSON.parse after get data from client storage
 *
 * @returns An object containing the method that can operate client storage
 */
export const useStorage = (key: string, shouldParse?: boolean) => {
  const get = () => getItem(key, !!shouldParse)
  const set = (value: Parameters<typeof JSON.stringify>[0]) => {
    setItem(key, value)
  }
  const remove = () => {
    removeItem(key)
  }

  return {
    get,
    set,
    remove,
  }
}

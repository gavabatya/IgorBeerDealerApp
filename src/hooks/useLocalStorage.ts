export const useLocalStorage = () => {
  const localStorageSet = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const localStorageGet = <T>(key: string): T | null => {
    const dataFromLocalStorage = localStorage.getItem(key);

    if (!dataFromLocalStorage) return null;

    return JSON.parse(dataFromLocalStorage);
  };

  return {
    localStorageSet,
    localStorageGet,
  };
};

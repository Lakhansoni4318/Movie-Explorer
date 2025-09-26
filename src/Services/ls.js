export default {
  get(key, useSession = false) {
    const storage = useSession ? sessionStorage : localStorage;
    return storage.getItem(key) || null;
  },

  set(key, val, useSession = false) {
    const storage = useSession ? sessionStorage : localStorage;
    storage.setItem(key, val);
  },

  remove(key, useSession = false) {
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(key);
  },
};

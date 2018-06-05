let localStorage = {};

export default {
  setItem(key, value) {
    return { ...localStorage, key: value };
  },
  removeItem(key) {
    return delete localStorage[key];
  },
  getItem(key, value) {
    return { ...localStorage, key: value };
  },
  clear() {
    localStorage = {};
  }
};

let localStorage = {};

export default {
  setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
  },
  removeItem(key) {
    return delete localStorage[key];
  },
  getItem(key) {
    return localStorage[key];
  },
  clear() {
    localStorage = {};
  }
};

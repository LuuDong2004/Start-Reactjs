const TOKEN_KEY = 'ACCESS_TOKEN';

export const token = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  set(value: string) {
    localStorage.setItem(TOKEN_KEY, value);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

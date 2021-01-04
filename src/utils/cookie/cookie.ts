export function setCookie(
  cookieName: string,
  cookieValue: string,
  expiredays: number
) {
  const date = new Date();

  date.setDate(date.getDate() + expiredays);

  document.cookie =
    escape(cookieName) +
    '=' +
    escape(cookieValue) +
    '; path=/; expires=' +
    date.toUTCString();
}

export function getCookie(cookieName: string) {
  if (document.cookie !== '') {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const name = cookie.substr(0, cookie.indexOf('='));
      const value = cookie.substr(cookie.indexOf('=') + 1);
      if (name == cookieName) {
        return unescape(value);
      }
    }
  }
  return '';
}

export function setCookie(name: string, value: string, expiredays: number) {
  const date = new Date();

  date.setDate(date.getDate() + expiredays);

  document.cookie = escape(name) + '=' + escape(value) + '; path=/; expires=' + date.toUTCString();
}

export function getCookie() {
  const cookie = document.cookie;

  if (cookie !== '') {
    const cookieArray = cookie.split('; ');
    for (const index in cookieArray) {
      const cookieName = cookieArray[index].split('=');
      if (cookieName[0] == 'routineEnd') {
        return cookieName[1];
      }
    }
  }
  return '';
}
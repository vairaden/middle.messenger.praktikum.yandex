export function checkName(word: string) {
  return /^[A-ZА-ЯЁ][a-zа-яё\-]+$/.test(word);
}

export function checkLogin(word: string) {
  return /^[A-ZА-ЯЁ][a-zа-яё\-]*$/.test(word);
}

export function checkEmail(word: string) {
  return /^[A-Za-z\d\-_]+@[A-Za-z\d\-_]+\.$/.test(word);
}

export function checkPassword(word: string) {
  return /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(word);
}

export function checkPhone(word: string) {
  return /^\+?\d{10,15}$/.test(word);
}

export function checkNotEmpty(word: string) {
  return /.+/.test(word);
}

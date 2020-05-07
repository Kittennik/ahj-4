export default function cards(number) {
  let result = false;
  if (/^4/.test(number)) {
    result = 'visa';
    return result;
  }
  if (/^5[1-5]/.test(number)) {
    result = 'mastercard';
    return result;
  }
  if (/^2/.test(number)) {
    result = 'mir';
    return result;
  }
  if (/^3[15]/.test(number)) {
    result = 'jcb';
    return result;
  }
  if (/^3[068]/.test(number)) {
    result = 'diners_club';
    return result;
  }
  if (/^60/.test(number)) {
    result = 'discover';
    return result;
  }
  if (/^3[47]/.test(number)) {
    result = 'american';
    return result;
  }
  return result;
}

export default function validate(number) {
  let check = 0;
  let nDigit = 0;
  let even = false;
  for (let i = number.length - 1; i >= 0; i -= 1) {
    const cDigit = number[i];
    nDigit = parseInt(cDigit, 10);
    if (even) {
      nDigit *= 2;
      if (nDigit > 9) {
        nDigit -= 9;
      }
    }
    check += nDigit;
    even = !even;
  }

  return (check % 10) === 0;
}

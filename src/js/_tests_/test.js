import validate from '../validate';

test('Valid', () => {
  const number = '5555555555554444';
  expect(validate(number)).toBe(true);
});

test('Invalid', () => {
  const number = '555555555555444';
  expect(validate(number)).toBe(false);
});

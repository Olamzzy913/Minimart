function generateUsername() {
  const getRandomChar = (chars) =>
    chars.charAt(Math.floor(Math.random() * chars.length));
  const getRandomDigit = () => Math.floor(Math.random() * 10).toString();

  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";

  const username = [
    getRandomChar(uppercaseLetters), // One uppercase letter
    getRandomChar(lowercaseLetters), // One lowercase letter
    getRandomDigit(), // One digit
    getRandomDigit(), // Another digit
    getRandomChar(lowercaseLetters), // One lowercase letter
    getRandomDigit(), // One digit
    getRandomDigit(), // Another digit
  ].join("");

  return username;
}

export default generateUsername;

export default function reducedHash(str) {
  // eslint-disable-next-line no-bitwise
  return str.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);
}

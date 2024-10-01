export default function reducedHash(str) {
  // eslint-disable-next-line no-bitwise
  return str.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);
}

// TODO исправить ключ на дату создания, хеш не нужен.
//  Вообще нужно убрать этот метод и встроить присваивание
//  ключа на месте где он там присваивается

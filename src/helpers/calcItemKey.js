import reducedHash from './reducedHash';

export default function calcItemKey(item) {
  return reducedHash(item.created + item.description);
}

import reducedHash from './reducedHash';

export default function getItemKey(item) {
  return reducedHash(item.created + item.description);
}

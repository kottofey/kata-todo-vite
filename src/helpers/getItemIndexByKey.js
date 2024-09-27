import calcItemKey from './calcItemKey';

export default (allItems, key) => allItems.findIndex((item) => calcItemKey(item) === key);

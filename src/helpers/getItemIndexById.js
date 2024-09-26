import getItemKey from './getItemKey';

export default (allItems, id) => allItems.findIndex((item) => getItemKey(item) === id);

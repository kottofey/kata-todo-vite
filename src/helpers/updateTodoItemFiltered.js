/**
 *
 * @param {string} filterId - current filter name. Taken from state.
 * @param {Object} item - Item to be updated
 * @returns {Object} - Updated item with current filter applied
 */

export default function updateTodoItemFiltered(filterId, item) {
  if (filterId === 'completed' && !item.isDone) {
    return { ...item, hidden: true };
  }

  if (filterId === 'active' && item.isDone) {
    return { ...item, hidden: true };
  }

  return { ...item, hidden: false };
}

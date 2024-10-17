/**
 *
 * @param {string} filterSelected - current filter name. Taken from state.
 * @param {Object} item - Item to be updated
 * @returns {Object} - Updated item with current filter applied
 */

export default function updateTodoItemFiltered(filterSelected, item) {
  if (filterSelected === 'completed' && !item.isDone) {
    return { ...item, isHidden: true };
  }

  if (filterSelected === 'active' && item.isDone) {
    return { ...item, isHidden: true };
  }

  return { ...item, isHidden: false };
}

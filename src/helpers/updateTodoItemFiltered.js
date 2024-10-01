/**
 *
 * @param {string} filterSelected - current filter name. Taken from state.
 * @param {Object} item - Item to be updated
 * @returns {Object} - Updated item with current filter applied
 */

export default function updateTodoItemFiltered(filterSelected, item) {
  console.log(`item: ${item.description}, fil: ${filterSelected}`);
  if (filterSelected === 'completed' && !item.isDone) {
    return { ...item, hidden: true };
  }

  if (filterSelected === 'active' && item.isDone) {
    return { ...item, hidden: true };
  }

  return { ...item, hidden: false };
}

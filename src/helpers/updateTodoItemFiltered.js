export default function updateTodoItemFiltered(filterId, item) {
  if (filterId === 'completed' && !item.isDone) {
    return { ...item, hidden: true };
  }

  if (filterId === 'active' && item.isDone) {
    return { ...item, hidden: true };
  }

  return { ...item, hidden: false };
}

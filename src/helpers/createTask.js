export default function createTask(description) {
  return {
    description,
    created: Date.now(),
    isDone: false,
    isEditing: false,
    hidden: false,
  };
}

export default function createTask(description) {
  return {
    description,
    created: (new Date()).toISOString(),
    isDone: false,
    isEditing: false,
    hidden: false,
  };
}

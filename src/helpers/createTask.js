export default function createTask(description) {
  return {
    description,
    created: new Date().getTime(),
    isDone: false,
    isEditing: false,
    hidden: false,
  };
}

export default function createTask(description) {
  return {
    description,
    created: new Date(),
    isDone: false,
    isEditing: false,
    hidden: false,
  };
}

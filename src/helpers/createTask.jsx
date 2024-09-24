export default function createTask(description) {
  return {
    taskState: '',
    description,
    created: (new Date()).toISOString(),
    isDone: false,
    isEditing: false,
  };
}

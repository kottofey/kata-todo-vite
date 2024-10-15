export default function createTask(description, minutes, seconds) {
  return {
    description,
    minutes,
    seconds,
    created: new Date().getTime(),
    isDone: false,
    isEditing: false,
    hidden: false,
  };
}

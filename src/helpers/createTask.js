export default function createTask(description, minutes, seconds) {
  const parsedMinutes = Number.parseInt(minutes, 10);
  const parsedSeconds = Number.parseInt(seconds, 10);

  return {
    description,
    minutes: parsedMinutes,
    seconds: parsedSeconds,
    created: new Date().getTime(),
    isDone: false,
    isEditing: false,
  };
}

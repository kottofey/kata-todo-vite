export default function Timer({
  minutes,
  seconds,
  onTimerStart,
  onTimerPause,
}) {
  return (
    <span className='description'>
      <button
        className='icon icon-play'
        type='button'
        onClick={onTimerStart}
      />
      <button
        className='icon icon-pause'
        type='button'
        onClick={onTimerPause}
      />
      {minutes}:{seconds}
    </span>
  );
}

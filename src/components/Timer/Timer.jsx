import { useEffect, useState } from 'react';

export default function Timer({ minutes, seconds }) {
  const [min, setMin] = useState(minutes);
  const [sec, setSec] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  const onTimerStart = () => {
    setIsRunning(true);
  };

  const onTimerPause = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setTimeout(() => {
        setSec(sec - 1);

        if (sec === -1) {
          setMin(min - 1);
          setSec(59);
        }

        if (min === 0 && sec === 1) {
          clearTimeout(timer);
          setIsRunning(false);
        }
      }, 1000);
    } else {
      clearTimeout(timer);
    }

    return () => {};
  }, [isRunning, min, sec]);

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
      {min}:{sec}
    </span>
  );
}

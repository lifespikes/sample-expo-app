import {useState} from 'react';

export default function useDebounce() {
  const [timeoutId, setTimeoutId] = useState(null);

  return (callback, timeout) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(setTimeout(callback, timeout));
  };
}

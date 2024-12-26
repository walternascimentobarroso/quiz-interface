import { useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  initialTime: number;
  onTimeEnd?: () => void;
}

export const useTimer = ({ initialTime, onTimeEnd }: UseTimerOptions) => {
  const [time, setTime] = useState<number>(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (onTimeEnd) onTimeEnd();
    }
  }, [time, onTimeEnd]);

  const resetTimer = () => {
    setTime(initialTime);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  };

  return { time, resetTimer };
};

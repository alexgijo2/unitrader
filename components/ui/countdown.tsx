'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownProps {
  endTime: string;
  className?: string;
}

export function Countdown({ endTime, className = '' }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds, ended: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (timeRemaining.ended) {
    return (
      <div className={`glass rounded-xl px-6 py-4 ${className}`}>
        <div className="flex items-center gap-2 text-red-500">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Auction Ended</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass rounded-xl px-6 py-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground">Auction ends in</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Days', value: timeRemaining.days },
          { label: 'Hours', value: timeRemaining.hours },
          { label: 'Minutes', value: timeRemaining.minutes },
          { label: 'Seconds', value: timeRemaining.seconds },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="font-mono text-2xl font-bold">
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

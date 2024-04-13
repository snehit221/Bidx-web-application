// Shahroz Ahmad

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

export function formatDateTime(dateArray: number[]): string {
  const [year, month, day, hour, minute] = dateArray;

  const date = new Date(year, month - 1, day, hour, minute);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short',
  };

  const formatter = new Intl.DateTimeFormat(undefined, options);
  const formattedDate = formatter.format(date);

  return formattedDate;
}

export function formatRemainingTime(providedDate: Date, currentDate: Date) {
  const daysDifference = differenceInDays(providedDate, currentDate);
  const hoursDifference = differenceInHours(providedDate, currentDate) % 24;
  const minutesDifference = differenceInMinutes(providedDate, currentDate) % 60;
  const secondsDifference = differenceInSeconds(providedDate, currentDate) % 60;

  return `${daysDifference} days, ${hoursDifference} hours, ${minutesDifference} minutes, ${secondsDifference} seconds`;
}

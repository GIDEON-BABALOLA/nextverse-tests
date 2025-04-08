import { formatDistanceToNow } from 'date-fns';

export const compactFormatDistanceToNow = (date) => {
  const distance = formatDistanceToNow(date, { includeSeconds: true });
  const regex = /(\d+)\s?(\w+)/g; // Adjusted to allow for optional space between number and unit
  
  let result = distance.replace(regex, (match, p1, p2) => {
    const abbreviations = {
      day: 'd',
      days: 'd',
      hour: 'h',
      hours: 'h',
      minute: 'm',
      minutes: 'm',
      second: 's',
      seconds: 's',
      month: 'mo',  // Added abbreviation for months
      months: 'mo'
    };
    
    return abbreviations[p2] ? `${p1}${abbreviations[p2]}` : match;
  });

  return result;
};

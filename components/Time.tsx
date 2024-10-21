import { formatTimeUntil } from "../utils/time";

export const Time = ({ timeString }: { timeString: string }) => {
  const now = new Date(Date.now());
  const dateTime = new Date(timeString);

  if (dateTime === now) {
    return <>Now</>;
  } else {
    return <>{formatTimeUntil(new Date(timeString))}</>;
  }
};

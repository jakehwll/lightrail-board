import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatTimeUntil = (timeString: Date) => {
  return formatDistance(new Date(timeString), new Date(), {
    locale: {
      ...enUS,
      formatDistance: (unit: string, count: number) => {
        switch (true) {
          case unit === "xDays":
            return `${count} day`;
          case unit === "xHours":
          case unit === "aboutXHours":
            return `${count} hour`;
          case unit === "xMinutes":
          case unit === "lessThanXMinutes":
            return `${count} min`;
          case unit === "xMonths":
            return `${count} month`;
          case unit === "xSeconds":
            return "Now";
          case unit === "xYears":
            return `${count} y`;
        }
        return `${count} ???`;
      },
    },
  });
};

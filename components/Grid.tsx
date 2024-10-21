import { format, formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import { css } from "hono/css";
import { type PropsWithChildren } from "hono/jsx";

const ServiceId = ({
  children,
  size = "small",
  odd = false,
}: PropsWithChildren<{
  size?: "small" | "large";
  odd?: boolean;
}>) => {
  const root = css`
    display: flex;
    align-items: center;
    font-size: ${size === "small" ? "1.5rem" : "2.5rem"};
    background: ${odd ? "transparent" : "var(--gray)"};
    padding: 1rem;
    font-weight: 500;
  `;

  return <div className={root}>{children}</div>;
};

const ServiceName = ({
  children,
  size = "small",
  odd = false,
}: PropsWithChildren<{
  size?: "small" | "large";
  odd?: boolean;
}>) => {
  const root = css`
    display: flex;
    align-items: center;
    font-size: ${size === "small" ? "1.5rem" : "2.5rem"};
    background: ${odd ? "transparent" : "var(--gray)"};
    padding: 1rem;
    font-weight: 500;
  `;

  return <div className={root}>{children}</div>;
};

const ServiceTime = ({
  timeString,
  size = "small",
  odd = false,
}: {
  timeString: string;
  size?: "small" | "large";
  odd?: boolean;
}) => {
  const root = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: ${size === "small" ? "1.5rem" : "2rem"};
    background: ${odd ? "transparent" : "var(--gray)"};
    padding: 1rem;
    text-align: right;
    font-weight: 500;
  `;

  const time = format(new Date(timeString), "HH:mm");
  const now = format(new Date(), "HH:mm");

  if ( time === now ) {
    return <div className={root}>Now</div>;
  } else {
    return (
      <div className={root}>
        {formatDistance(new Date(timeString), new Date(), {
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
        })}
      </div>
    );
  }

};

export const Grid = ({
  data,
}: {
  data: {
    departureTimePlanned: string;
    transportation: {
      disassembledName: string;
      destination: {
        name: string;
      };
    };
  }[];
}) => {
  const gridClass = css`
    display: grid;
    grid-template-columns: max-content 1fr max-content;
  `;

  const headerClass = css`
    padding: 1rem;
    background: var(--red);
    color: white;
    display: flex;
    align-items: center;
  `;

  const headerClassTime = css`
    padding: 1rem;
    background: var(--red);
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `;

  const TIME_NOW = new Date();

  return (
    <div className={gridClass}>
      <div className={headerClass}>Service</div>
      <div className={headerClass}>Travelling to</div>
      <div className={headerClassTime}>Time {format(TIME_NOW, "hh:mm")}</div>
      {data.map((time, i) => (
        <>
          <ServiceId size={i === 0 ? "large" : "small"} odd={i % 2 === 0}>
            {time.transportation.disassembledName}
          </ServiceId>
          <ServiceName size={i === 0 ? "large" : "small"} odd={i % 2 === 0}>
            {time.transportation.destination.name}
          </ServiceName>
          <ServiceTime
            size={i === 0 ? "large" : "small"}
            odd={i % 2 === 0}
            timeString={time.departureTimePlanned}
          />
        </>
      ))}
    </div>
  );
};

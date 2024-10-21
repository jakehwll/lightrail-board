import { format } from "date-fns";
import { css } from "hono/css";
import { type PropsWithChildren } from "hono/jsx";
import { Time } from "../Time";

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

  return (
    <div className={root}>
      <Time timeString={timeString} />
    </div>
  );
};

export const Grid = ({
  events,
}: {
  events: {
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

  const TIME_NOW = new Date(Date.now());

  return (
    <div className={gridClass}>
      <div className={headerClass}>Service</div>
      <div className={headerClass}>Travelling to</div>
      <div className={headerClassTime}>Time {format(TIME_NOW, "hh:mm")}</div>
      {events.map((time, i) => (
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

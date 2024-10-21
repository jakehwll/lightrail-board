import { format, formatDistance } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { enUS } from "date-fns/locale";
import { css } from "hono/css";

const ServiceTime = ({
  timeString
}: {
  timeString: string;
}) => {

  const time = format(new Date(timeString), "HH:mm");
  const now = format(new Date(), "HH:mm");

  if (time === now) {
    return <>Now</>;
  } else {
    return (
      <>
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
      </>
    );
  }
};

export const Grid = ({
  time,
  data,
}: {
  time: Date,
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
  const root = css`
    width: 100%;
    overflow: hidden;
    border-collapse: collapse;
  `;
  
  const tableHeader = css`
    background: black;
    color: white;
    font-weight: normal;
    text-align: left;
    padding: 1rem;
  `

  const tableHeaderRight = css`
    ${tableHeader}
    text-align: right;
  `;

  const tableData = css`
    padding: 1rem;
    font-weight: 500;
  `;

  const serviceDisassembledName = css`
    ${tableData}
    width: 50px;
  `

  const serviceDestinationName = css`
    ${tableData}
  `

  const serviceDepartureTime = css`
    ${tableData}
    width: 100px;
    text-align: right;
  `;

  const serviceLgDisassembledName = css`
    ${serviceDisassembledName}
    font-size: 1.5rem;
  `;

  const serviceLgDestinationName = css`
    ${serviceDestinationName}
    font-size: 1.5rem;
  `;

  const serviceLgDepartureTime = css`
    ${serviceDepartureTime}
    font-size: 1.5rem;
  `;

  return (
    <>
      <table className={root}>
        <thead>
          <tr>
            <th className={tableHeader}>Service</th>
            <th className={tableHeader}>Travelling to</th>
            <th className={tableHeaderRight}>
              Time {formatInTimeZone(time, "Australia/Sydney", "HH:mm")}
            </th>
          </tr>
        </thead>
        {data.map((time, i) => (
          <tr>
            <td
              className={
                i === 0 ? serviceLgDisassembledName : serviceDisassembledName
              }
            >
              {time.transportation.disassembledName}
            </td>
            <td
              className={
                i === 0 ? serviceLgDestinationName : serviceDestinationName
              }
            >
              {time.transportation.destination.name}
            </td>
            <td
              className={
                i === 0 ? serviceLgDepartureTime : serviceDepartureTime
              }
            >
              <ServiceTime timeString={time.departureTimePlanned} />
            </td>
          </tr>
        ))}
      </table>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              location.reload();
            }, ${30 * 1000});
          `,
        }}
      />
    </>
  );
};

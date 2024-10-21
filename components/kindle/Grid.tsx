import { formatInTimeZone } from "date-fns-tz";
import { css } from "hono/css";
import { Time } from "../Time";

export const Grid = ({
  time,
  events,
}: {
  time: Date;
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
  `;

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
  `;

  const serviceDestinationName = css`
    ${tableData}
  `;

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
        {events.map((time, i) => (
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
              <Time timeString={time.departureTimePlanned} />
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

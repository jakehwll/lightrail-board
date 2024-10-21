import { Hono } from "hono";
import { Grid } from "../components/kindle/Grid";
import { format } from "date-fns";
import { Layout } from "../components/board/Layout";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export const kindle = new Hono();

const API_KEY = process.env.API_KEY;
const STOP_ID = process.env.STOP_ID;
const STOP_IGNORE_LIST = [
  "Juniors Kingsford",
  "Juniors Kingsford Light Rail, Kingsford",
];


kindle.get("/", async (c) => {
  if (!API_KEY || !STOP_ID) {
    return c.json({ error: "STOP_ID is not set." }, 500);
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `apikey ${API_KEY}`,
    },
  };

  const datetimeNow = toZonedTime(new Date(), "Australia/Sydney");
  const urlParams = new URLSearchParams({
    // variables
    name_dm: STOP_ID,
    itdDate: formatInTimeZone(datetimeNow, "Australia/Sydney", "yyyyMMdd"),
    itdTime: formatInTimeZone(datetimeNow, "Australia/Sydney", "HHmm"),
    // constants
    outputFormat: "rapidJSON",
    coordOutputFormat: "EPSG:4326",
    mode: "direct",
    type_dm: "stop",
    TfNSWDM: "true",
    version: "10.2.1.42",
    departureMonitorMacro: "true",
  });

  const res = await fetch(
    `https://api.transport.nsw.gov.au/v1/tp/departure_mon?${urlParams.toString()}`,
    options
  );

  if (!res.ok) {
    return c.json({ error: res.status });
  }

  const data = await res.json();

  const stopEvents = data.stopEvents.filter(
    (v: any) => !STOP_IGNORE_LIST.includes(v.transportation.destination.name)
  );

  return c.html(
    <Layout>
      <Grid time={datetimeNow} data={stopEvents} />
    </Layout>
  );
});

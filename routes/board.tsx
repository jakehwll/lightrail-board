import { Hono } from "hono";
import { Layout } from "../components/Layout";
import { Grid } from "../components/Grid";
import { format } from "date-fns";

export const board = new Hono();

const API_KEY = process.env.API_KEY;
const STOP_ID = process.env.STOP_ID;
const STOP_IGNORE_LIST = [
  "Juniors Kingsford",
  "Juniors Kingsford Light Rail, Kingsford",
]

board.get("/", async (c) => {
  if (!API_KEY || !STOP_ID) {
    return c.json({ error: "STOP_ID is not set." }, 500);
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `apikey ${API_KEY}`,
    },
  };

  const urlParams = new URLSearchParams({
    // variables
    name_dm: STOP_ID,
    itdDate: format(new Date(), "yyyyMMdd"),
    itdTime: format(new Date(), "HHmm"),
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
  )

  if ( !res.ok ) {
    return c.json({ error: res.status });
  }

  const data = await res.json();

  const stopEvents = data.stopEvents.filter((v: any) => 
    !STOP_IGNORE_LIST.includes(v.transportation.destination.name)
  )

  return c.html(
    <Layout>
      <Grid data={stopEvents} />
    </Layout>
  );
});

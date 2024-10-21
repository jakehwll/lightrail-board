import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export const API_KEY = process.env.API_KEY;
export const STOP_ID = process.env.STOP_ID;
export const STOP_IGNORE_LIST = [
  "Juniors Kingsford",
  "Juniors Kingsford Light Rail, Kingsford",
];

if (!API_KEY || !STOP_ID) {
  throw Error("STOP_ID or API_KEY is not set.");
}

export const fetchStopEvents = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `apikey ${API_KEY}`,
    },
  };

  const refreshedAt = toZonedTime(new Date(), "Australia/Sydney");
  const urlParams = new URLSearchParams({
    // variables
    name_dm: STOP_ID,
    itdDate: formatInTimeZone(refreshedAt, "Australia/Sydney", "yyyyMMdd"),
    itdTime: formatInTimeZone(refreshedAt, "Australia/Sydney", "HHmm"),
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
    throw new Error("Failed to retrieve departures.")
  }

  const data = await res.json();

  const events = data.stopEvents.filter(
    (v: any) => !STOP_IGNORE_LIST.includes(v.transportation.destination.name)
  );

  return {
    events,
    refreshedAt
  }
}
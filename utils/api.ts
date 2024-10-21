import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export const TFNSW_API_KEY = process.env.TFNSW_API_KEY;
export const TFNSW_STOP_ID = process.env.TFNSW_STOP_ID;
export const TFNSW_STOP_IGNORED = process.env.TFNSW_STOP_IGNORED?.split(',') ?? [];

if (!TFNSW_API_KEY || !TFNSW_STOP_ID) {
  throw Error("TFNSW_STOP_ID or TFNSW_API_KEY is not set.");
}

export const fetchStopEvents = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `apikey ${TFNSW_API_KEY}`,
    },
  };

  const refreshedAt = new Date(Date.now());
  const urlParams = new URLSearchParams({
    // variables
    name_dm: TFNSW_STOP_ID,
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
    (v: any) => !TFNSW_STOP_IGNORED.includes(v.transportation.destination.id)
  );

  return {
    events,
    refreshedAt
  }
}
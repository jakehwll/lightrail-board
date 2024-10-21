import { Hono } from "hono";
import { Grid } from "../components/kindle/Grid";
import { Layout } from "../components/Layout";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { fetchStopEvents } from "../utils/api";

export const kindle = new Hono();

kindle.get("/", async (c) => {
  const { events, refreshedAt } = await fetchStopEvents();

  return c.html(
    <Layout>
      <Grid time={refreshedAt} events={events} />
    </Layout>
  );
});

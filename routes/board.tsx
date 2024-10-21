import { Hono } from "hono";
import { Layout } from "../components/Layout";
import { Grid } from "../components/board/Grid";
import { fetchStopEvents } from "../utils/api";

export const board = new Hono();

board.get("/", async (c) => {
  const { events } = await fetchStopEvents();

  return c.html(
    <Layout>
      <Grid events={events} />
    </Layout>
  );
});

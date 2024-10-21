import { Hono } from "hono";
import { board } from "./routes/board";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { kindle } from "./routes/kindle";

const app = new Hono();

app.use("*", logger())

app.route("/kindle", kindle);
app.route("/board", board);

app.get("/static/*", serveStatic({ root: "./" }));

export default {
  port: 3000,
  fetch: app.fetch,
};

FROM oven/bun:1.1 as base
WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=production
RUN bun install

FROM oven/bun:1.1 as serve
WORKDIR /usr/src/app

COPY --from=base /usr/src/app .

ENV NODE_ENV=production

RUN cd /usr/src/app

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "./index.ts" ]
import { Style } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Style />
        <style>{`
          @font-face {
            font-family: NewFrank;
            font-weight: 400;
            src: url(./static/NewFrank-Regular.woff) format(woff);
          }

          @font-face {
            font-family: NewFrank;
            font-weight: 500;
            src: url(./static/NewFrank-Medium.woff) format(woff);
          }

          :root {
            --red: #d7153a;
            --gray: #f7f7f7;
          }

          html,body {
            margin: 0;
            padding: 0;
            font-family: NewFrank, sans-serif;
          }
          `}</style>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

import { Head, Html, Main, NextScript } from "next/document";
import { RecoilRoot } from "recoil";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <RecoilRoot>
          <Main />
        </RecoilRoot>
        <NextScript />
      </body>
    </Html>
  );
}

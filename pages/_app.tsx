import "normalize.css";
import "../src/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { RecoilRoot } from "recoil";
import * as gtag from "../src/libs/gtag";
import App_ from "../src/components/layouts/app";
import Gtm from "../src/libs/gtm";
import Script from "next/script";
import Head from "next/head";
import { MAIN_TITLE, TAB_LIST } from "../src/constants/common";

export default function App({ Component, pageProps, router: r }: AppProps) {
  const router = useRouter();

  const subtitle = useMemo(() => TAB_LIST.find(_ => _?.href === router.pathname)?.title, [router.pathname]);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <Gtm />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8583770780355894"
        crossOrigin="anonymous"
      />
      <Head>
        <meta name={"viewport"} content={"width=device-width,initial-scale=1"} />
        <meta name={"title"} content={MAIN_TITLE + " - " + subtitle} />
        <title>{MAIN_TITLE + " - " + subtitle}</title>
      </Head>
      <App_ Component={Component} pageProps={pageProps} router={r} />
    </RecoilRoot>
  );
}

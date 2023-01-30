import "normalize.css";
import "../src/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import Header from "../src/components/layouts/header";
import {
  Box,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { tabList, topTitle } from "../src/constants/common";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import * as gtag from "../src/lib/gtag";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(() => createTheme({ palette: { mode: mode } }), [mode]);
  const subtitle = useMemo(
    () => tabList.find(_ => _?.href === router.pathname)?.title,
    [router.pathname]
  );

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

  useEffect(() => {
    setMode(new Cookies().get("mode") ?? "light");
    setLoaded(true);
  }, []);
  useEffect(() => {
    loaded && mode && new Cookies().set("mode", mode);
  }, [loaded, mode]);

  if (!loaded) return null;

  return (
    <RecoilRoot>
      <Gtm />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8583770780355894"
        crossOrigin="anonymous"
      />
      <Head>
        <meta
          name={"viewport"}
          content={"width=device-width,initial-scale=1"}
        />
        <meta name={"title"} content={topTitle + " - " + subtitle} />
        <title>{topTitle + " - " + subtitle}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Header mode={mode} setMode={setMode} />
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Gtm = () =>
  process.env.NODE_ENV !== "development" ? (
    <>
      <Script
        id={"gtm"}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P7TNQRK');
          `,
        }}
      />
      {/* GA 설정 시작 */}
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* GA 설정 끝 */}
    </>
  ) : null;

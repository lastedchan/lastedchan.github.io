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
import { tabList } from "../src/constants/common";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { RecoilRoot } from "recoil";
import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [mode, setMode] = useState<PaletteMode>("light");
  useEffect(() => {
    setMode(new Cookies().get("mode") ?? "light");
    setLoaded(true);
  }, []);
  useEffect(() => {
    loaded && mode && new Cookies().set("mode", mode);
  }, [loaded, mode]);

  const theme = useMemo(() => createTheme({ palette: { mode: mode } }), [mode]);

  const title = "LASTCHAN";
  const subtitle = useMemo(
    () => tabList.find(_ => _?.href === router.pathname)?.title,
    [router.pathname]
  );

  if (!loaded) return null;

  return (
    <RecoilRoot>
      <Head>
        <meta
          name={"viewport"}
          content={"width=device-width,initial-scale=1"}
        />
        <meta name={"title"} content={title + " - " + subtitle} />
        <title>{title + " - " + subtitle}</title>
      </Head>
      {/*Google tag (gtag.js)*/}
      <Script
        strategy={"afterInteractive"}
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-LZLFJGKZJT"
      />
      <Script
        id={"gtag-init"}
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-LZLFJGKZJT');`,
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Header title={subtitle} mode={mode} setMode={setMode} />
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

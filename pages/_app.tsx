import "normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/layouts/header";
import {
  Box,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { tabList } from "../constants/common";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [mode, setMode] = useState<PaletteMode>("light");
  useEffect(() => {
    setMode(new Cookies().get("mode"));
    setLoaded(true);
  }, []);
  useEffect(() => {
    loaded && new Cookies().set("mode", mode);
  }, [loaded, mode]);

  const theme = useMemo(() => createTheme({ palette: { mode: mode } }), [mode]);

  const title = "LASTCHAN";
  const subtitle = useMemo(
    () => tabList.find(_ => _.href === router.pathname)?.title,
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
  padding: 8px;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

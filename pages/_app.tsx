import "normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/layouts/header";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { tabList } from "../constants/common";
import { useMemo } from "react";

const mainTitle = "lastchan utils";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const title = useMemo(() => {
    const subtitle = tabList.find(_ => _.href === router.pathname)?.title;
    return mainTitle + (subtitle ? " - " + subtitle : "");
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta
          name={"viewport"}
          content={"width=device-width,initial-scale=1"}
        />
        <meta name={"title"} content={title} />
        <title>{title}</title>
      </Head>
      <Container>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Container>
    </>
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
  overflow: auto;
`;

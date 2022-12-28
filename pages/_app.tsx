import "normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/layouts/header";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

export default function App({ Component, pageProps }: AppProps) {
  const title = "lastchan utils";

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
`;

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  padding: 8px;
`;

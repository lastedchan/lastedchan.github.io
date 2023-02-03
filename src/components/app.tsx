import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./templates/header";
import { useMemo } from "react";
import useDarkMode from "../hooks/useDarkMode";
import styled from "@emotion/styled";
import { AppProps } from "next/app";

export default function App_({ Component, pageProps }: AppProps) {
  const { mode, loaded } = useDarkMode();

  const theme = useMemo(() => createTheme({ palette: { mode: mode } }), [mode]);

  if (!loaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Container>
    </ThemeProvider>
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

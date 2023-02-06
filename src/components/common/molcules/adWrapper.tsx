import React from "react";
import styled from "@emotion/styled";

export default function AdWrapper() {
  return (
    <Container>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8583770780355894"
        data-ad-slot="4169298389"
      />
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

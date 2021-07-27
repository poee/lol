import "../styles/global.css";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";

import PageContainer from "../src/containers/PageContainer";

import Attribution from "../src/components/Attribution";
// import Link from "../src/components/Link";
import SmallCaps from "../src/components/SmallCaps";
import Divider from "../src/components/Divider";
import Kopy from "../src/components/Kopy";
import Random from "../src/components/Random";
import Stamp from "../src/components/Stamp";
// import Image from "../src/components/Image";

const transform = {
  // a: Link,
  attr: Attribution,
  del: SmallCaps,
  hr: Divider,
  kopy: Kopy,
  // img: Image,
  random: Random,
  stamp: Stamp,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={transform}>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </MDXProvider>
  );
}
export default MyApp;

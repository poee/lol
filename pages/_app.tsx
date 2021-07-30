import "../styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";

import PageContainer from "../src/containers/PageContainer";

import Attribution from "../src/components/Attribution";
// import Link from "../src/components/Link";
import SmallCaps from "../src/components/SmallCaps";
import Divider from "../src/components/Divider";
import Kopy from "../src/components/Kopy";
import Random from "../src/components/Random";
import Stamp from "../src/components/Stamp";
import Image from "../src/components/Image";

const transform: MDXProviderComponents = {
  // a: Link,
  attr: Attribution,
  del: SmallCaps,
  hr: Divider,
  kopy: Kopy,
  img: Image,
  random: Random,
  stamp: Stamp,
};

function MyApp({ Component, pageProps }: AppProps) {
  const pageTitle = ["POEE 👽"];
  let style = null;
  if (typeof window !== "undefined") {
    const hueSeed = Math.round(new Date().getTime() / 2299) % 361;
    const ribbonHue = (149 + hueSeed) % 361;
    style = (
      <style key="variables">
        {`:root {
            --chao-color: hsl(${hueSeed}, 69%, 35%);
            --ribbon-color: hsl(${ribbonHue}, 44%, 40%);
            --ribbon-border-color: hsl(${ribbonHue}, 34%, 30%);
          }`}
      </style>
    );
  }

  return (
    <MDXProvider components={transform}>
      <Head>
        <link href="/image/favicon.png" rel="shortcut icon" />
        <title>{pageTitle}</title>
        <script
          defer
          data-domain="poee.lol"
          src="https://plausible.io/js/plausible.js"
        ></script>
        {style}
      </Head>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </MDXProvider>
  );
}
export default MyApp;

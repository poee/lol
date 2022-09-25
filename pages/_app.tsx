import "../styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";
import { ReactNode, useState } from "react";

import PageContainer from "../src/components/layout/PageContainer";

import { Attribution, Blockquote } from "../src/components/Blockquote";
import Divider from "../src/components/Divider";
import Footer from "../src/components/Footer";
import Image from "../src/components/Image";
import Kopy from "../src/components/Kopy";
import Link from "../src/components/Link";
import Random from "../src/components/Random";
import SmallCaps from "../src/components/SmallCaps";
import Stamp from "../src/components/Stamp";

import { TitleContext, useUpdateTitle } from "../src/hooks/titleContext";

const PageTitleWrapper = ({
  children,
  meta,
}: {
  children: ReactNode;
  meta?: { description?: string; title?: string };
}) => {
  useUpdateTitle(meta?.title ?? "");
  return (
    <>
      <Head>
        {meta?.description && (
          <meta name="description" content={meta.description}></meta>
        )}
      </Head>
      {children}
    </>
  );
};

const transform: MDXProviderComponents = {
  a: Link,
  attr: Attribution,
  blockquote: Blockquote,
  del: SmallCaps,
  hr: Divider,
  img: Image,
  kopy: Kopy,
  random: Random,
  stamp: Stamp,
  wrapper: PageTitleWrapper,
};

const APP_TITLE = "POEE";
const EMOJIS = [
  "👽", "💩", "🌻", "🛎", "🗝", "🍄", "🎲", "🎟", "🚩", "⛲", "🔮", "🌬",
]

export default function MyApp({ Component, pageProps }: AppProps) {
  const [pageTitle, setPageTitle] = useState("");

  const now = new Date()
  const hueMod = Math.round(now.getTime() / 2299) % 361;
  const hourMod = now.getHours() % EMOJIS.length;

  let style = null;
  if (typeof window !== "undefined") {
    const ribbonHue = (149 + hueMod) % 361;
    style = (
      <style key="variables">
        {`:root {
            --chao-color: hsl(${hueMod}, 69%, 35%);
            --ribbon-color: hsl(${ribbonHue}, 44%, 40%);
            --ribbon-border-color: hsl(${ribbonHue}, 34%, 30%);
          }`}
      </style>
    );
  }

  return (
    <TitleContext.Provider value={{ title: pageTitle, setTitle: setPageTitle }}>
      <MDXProvider components={transform}>
        <Head>
          <link href="/image/favicon.png" rel="shortcut icon" />
          <title>{[pageTitle, EMOJIS[hourMod], APP_TITLE].join(" ~ ")}</title>
          {style}
        </Head>
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
        <Footer />
      </MDXProvider>
    </TitleContext.Provider>
  );
}

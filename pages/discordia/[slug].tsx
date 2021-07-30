/* eslint-disable @next/next/no-img-element */
import React from "react";

import styles from "../../src/components/css/Discordia.module.css";

import Image from "../../src/components/Image";
import { PAGES, ROUTE_PREFIX, SlugInfo } from "../../src/data/discordia";
import Link from "next/link";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";

type DiscordiaPageParams = {
  prevSlug: string;
  nextSlug: string;
  slug: string;
};

// function onError(error: SyntheticEvent<HTMLImageElement>) {
//   if (error.target.src !== "/image/mancala.png") {
//     error.target.src = "/image/mancala.png";
//     error.target.alt = "Could not find this page";
//   }
// }

export default function Discordia({
  slug,
  nextSlug,
  prevSlug,
}: DiscordiaPageParams) {
  let content;

  content = (
    <Image
      className="page"
      src={`/pd/${slug}.png`}
      alt={`page ${slug}`}
      // onError={onError}
    />
  );

  return (
    <div className={styles.discordia}>
      {content}
      <hr />
      <nav>
        {prevSlug && (
          <Link href={ROUTE_PREFIX + prevSlug}>
            <a className={styles.arrowLeft}>
              <img
                alt="previous page"
                title="previous page"
                src="/image/arrow.png"
              />
            </a>
          </Link>
        )}
        {nextSlug && (
          <Link href={ROUTE_PREFIX + nextSlug}>
            <a className={styles.arrowRight}>
              <img alt="next page" title="next page" src="/image/arrow.png" />
            </a>
          </Link>
        )}
        <Link href={`${ROUTE_PREFIX}stool`} key="soc">
          <a className={styles.stool}>
            <img
              alt="stool of contents"
              title="stool of contents"
              src="/image/amanita.png"
            />
          </a>
        </Link>
      </nav>
    </div>
  );
}

const getSlugFromSlugInfo = (slugInfo: SlugInfo): string =>
  typeof slugInfo === "string" ? slugInfo : slugInfo.slug;

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<Pick<DiscordiaPageParams, "slug">>
> {
  const paths = PAGES.map((slugInfo, idx) => {
    const slug = getSlugFromSlugInfo(slugInfo);
    return {
      params: {
        slug,
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: Pick<DiscordiaPageParams, "slug">;
}): Promise<GetStaticPropsResult<DiscordiaPageParams>> {
  const pageIdx = PAGES.findIndex((slugInfo) => {
    if (typeof slugInfo === "string") {
      return slugInfo === slug;
    }
    return slugInfo.slug === slug;
  });
  const prev = PAGES[pageIdx - 1];
  const next = PAGES[pageIdx + 1];
  return {
    props: {
      slug,
      prevSlug: prev ? getSlugFromSlugInfo(prev) : "",
      nextSlug: next ? getSlugFromSlugInfo(next) : "",
    },
  };
}

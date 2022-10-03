/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import styles from "../../src/components/css/Cacophonia.module.css";

import Image from "../../src/components/Image";
import { PAGES, ROUTE_PREFIX, SlugInfo } from "../../src/data/discordia";
import Link from "next/link";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { useUpdateTitle } from "../../src/hooks/titleContext";
import clsx from "clsx";

type CacophoniaPageParams = {
  prevSlug: string;
  nextSlug: string;
  slug: string;
  title: string;
};

// function onError(error: SyntheticEvent<HTMLImageElement>) {
//   if (error.target.src !== "/image/mancala.png") {
//     error.target.src = "/image/mancala.png";
//     error.target.alt = "Could not find this page";
//   }
// }

export default function Cacophonia({
  slug,
  title,
  nextSlug,
  prevSlug,
}: CacophoniaPageParams) {
  useUpdateTitle(title);
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => setIsLoaded(false), [slug])

  let content;

  content = (
    <section className={clsx(styles.pageWrapper, { [styles.isLoaded]: isLoaded })}>
      <Image
        className="page"
        key={slug}
        src={`/caco/${slug}.png`}
        alt={`page ${slug}`}
        onLoad={() => setIsLoaded(true)}
      />
    </section>
  );

  return (
    <div className={styles.discordia}>
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
      <hr />
      {content}
    </div>
  );
}

const getSlugFromSlugInfo = (slugInfo: SlugInfo): string =>
  typeof slugInfo === "string" ? slugInfo : slugInfo.slug;

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<Pick<CacophoniaPageParams, "slug">>
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
  params: Pick<CacophoniaPageParams, "slug">;
}): Promise<GetStaticPropsResult<CacophoniaPageParams>> {
  const pageIdx = PAGES.findIndex((slugInfo) => {
    if (typeof slugInfo === "string") {
      return slugInfo === slug;
    }
    return slugInfo.slug === slug;
  });
  const prev = PAGES[pageIdx - 1];
  const next = PAGES[pageIdx + 1];
  const thisPage = PAGES[pageIdx];
  const title = typeof thisPage === "string" ? "" : thisPage.title;
  return {
    props: {
      slug,
      title,
      prevSlug: prev ? getSlugFromSlugInfo(prev) : "",
      nextSlug: next ? getSlugFromSlugInfo(next) : "",
    },
  };
}

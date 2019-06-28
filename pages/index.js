import { Box, styleGuide } from "@jcblw/box";
import { css, rehydrate } from "glamor";
import Head from "next/head";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout";
import getNotionData from "../data/notion";
import { useFocus } from "../hooks/use-focus";
import { Block } from "../components/block";
import * as styles from "../styles/utils";
import { getMetadata } from "../lib/metadata";

if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}

styleGuide.push(styles);
css.global("body, html, #__next", {
  margin: 0,
  minHeight: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column"
});

export default function Page({ blocks, etag, tables }) {
  const focused = useFocus();
  useEffect(
    () => {
      if (focused) {
        fetch(window.location, {
          headers: {
            pragma: "no-cache"
          }
        }).then(res => {
          if (res.ok && res.headers.get("x-version") !== etag) {
            window.location.reload();
          }
        });
      }
    },
    [focused]
  );

  const meta = getMetadata(tables);

  return (
    <Layout>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
      </Head>
      <Box backgroundColor="outerSpace" color="mischka" padding="l" flex="1">
        {blocks.map((block, i) => {
          return <Block {...block} key={`block-${i}`} />;
        })}
      </Box>
    </Layout>
  );
}

Page.getInitialProps = async ({ res }) => {
  const notionData = await getNotionData();
  const etag = require("crypto")
    .createHash("md5")
    .update(JSON.stringify(notionData))
    .digest("hex");

  if (res) {
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.setHeader("X-version", etag);
  }

  return { ...notionData, etag };
};

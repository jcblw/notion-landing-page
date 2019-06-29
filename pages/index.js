import { Box, styleGuide } from "@jcblw/box";
import { css, rehydrate } from "glamor";
import Head from "next/head";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout";
import getNotionData from "../data/notion";
import { useFocus } from "../hooks/use-focus";
import { Block } from "../components/block";
import { HeaderL } from "../components/fonts";
import * as styles from "../styles/utils";
import { colors } from "../styles/colors";

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

css.global("*", {
  boxSizing: "border-box"
});

export default function Page({
  blocks,
  etag,
  tables,
  title,
  cover,
  coverPosition,
  icon
}) {
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

  const coverPositionPercent = 100 - coverPosition * 100;
  const maxWidth = "800px";

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        display="flex"
        direction="column"
        backgroundColor="white"
        color="merlin"
        flex="1"
        alignItems="center"
      >
        {cover ? (
          <Box
            css={{
              backgroundSize: "cover",
              backgroundPosition: `center ${coverPositionPercent}%`,
              backgroundImage: `url("${cover}")`,
              height: "30vh",
              width: "100vw"
            }}
          />
        ) : (
          <Box
            css={{
              height: "10vh"
            }}
          />
        )}
        <Box
          display="block"
          direction="column"
          paddingLeft="l"
          paddingRight="l"
          css={{ marginTop: icon ? "-80px" : "24px", maxWidth, width: "100%" }}
        >
          {icon && (
            <Box
              Component="img"
              src={icon}
              css={{
                height: "124px",
                width: "124px"
              }}
            />
          )}
          {title && <HeaderL>{title}</HeaderL>}
        </Box>
        <Box
          paddingLeft="l"
          paddingRight="l"
          paddingBottom="l"
          css={{ maxWidth }}
          Component="article"
        >
          {blocks.map((block, i) => {
            return <Block {...block} key={`block-${i}`} />;
          })}
        </Box>
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

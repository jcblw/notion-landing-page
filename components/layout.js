import Head from "next/head";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=yes"
        />
        <link
          href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap"
          rel="stylesheet"
        />
        <style type="text/css" />
      </Head>
      {children}
    </>
  );
};

import Head from "next/head";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=yes"
        />
      </Head>
      {children}
    </>
  );
};

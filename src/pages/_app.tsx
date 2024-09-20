import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layouts/header";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <Header />
      <div className="pt-16">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

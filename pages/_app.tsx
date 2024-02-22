import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import "../css/tailwind.css";
import { AppProps } from "next/app";
import { store } from "../app/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;

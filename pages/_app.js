import { ThemeProvider } from "next-themes";
import { SessionProvider, getSession } from "next-auth/react";
import "../css/tailwind.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;

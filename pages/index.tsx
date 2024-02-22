import Head from "next/head";
import Header from "../components/header";
import Menu from "./menu";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Teste FrontEnd Duo</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Menu />
    </>
  );
};

export default Home;

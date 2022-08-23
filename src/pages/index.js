import Head from "next/head";
import { MainLayout } from "../components/layout/main-layout";
import { HomeHero } from "../components/home/home-hero";

const Home = () => {
  return (
    <>
      <Head>
        <title>#1 Bike Rental Service</title>
      </Head>
      <main>
        <HomeHero />
      </main>
    </>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Home;

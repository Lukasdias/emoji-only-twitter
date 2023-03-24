import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { Profile } from "../components/Profile";
import { Posts } from "../components/Posts";
import { Container, ContentContainer } from "../components/common/Containers";
import { AnimatePresence, motion } from "framer-motion";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={"flex h-screen w-screen items-center justify-center"}
        >
          Loading...
        </motion.div>
      </AnimatePresence>
    );
  if (!data) return <div>Something went wrong...</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ContentContainer>
          <Profile />
          <Posts posts={data} />
        </ContentContainer>
      </Container>
    </>
  );
};

export default Home;

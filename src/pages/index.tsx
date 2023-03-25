import { type NextPage } from "next";
import Head from "next/head";
import { Container, ContentContainer } from "~/components/common/Containers";
import { Posts } from "~/components/Posts";
import { Profile } from "~/components/Profile";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  api.posts.getAll.useQuery();
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
          <Posts />
        </ContentContainer>
      </Container>
    </>
  );
};

export default Home;

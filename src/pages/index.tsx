import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <motion.div
          initial={{
            opacity: 0,
            y: 200,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
            },
          }}
          className="flex flex-col items-center justify-center space-y-4 text-white"
        >
          <span className="rounded-2xl bg-zinc-700 p-2 text-4xl font-bold">
            Auth with Clerk
          </span>
          <span className="p-2 text-2xl font-bold">
            {hello.data ? hello.data.greeting : "Loading..."}
          </span>
          {!!user ? <SignOutButton /> : <SignInButton />}
        </motion.div>
      </main>
    </>
  );
};

export default Home;

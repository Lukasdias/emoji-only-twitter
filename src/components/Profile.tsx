/* eslint-disable @typescript-eslint/no-misused-promises */
import { SignInButton, useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { NativeAvatar } from "~/components/Avatar";
import { api } from "~/utils/api";
import { Button } from "~/components/common/Button";
import { POST_SCHEMA } from "~/utils/schemas";
import { AnimatePresence, motion } from "framer-motion";
const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState<string>("");
  const [errorOnSubmit, setErrorOnSubmit] = useState<string | null>(null);

  const { mutate, isLoading: isSendingPost } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
    },
    onError: () => {
      setErrorOnSubmit("Only Emoji are allowed!");
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorOnSubmit(null);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [errorOnSubmit]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    mutate({
      content: input,
    });
  };

  if (!user) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <NativeAvatar
          alt={user.fullName ?? "UserImage"}
          src={user.profileImageUrl}
          fallbackText={user.fullName?.charAt(0) ?? "U"}
          size="medium"
          borderVariant="circle"
        />
        <p className="text-xl font-bold">{user.fullName}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className={"flex w-full flex-col items-center gap-4"}
      >
        <div className={"flex w-full flex-1 flex-col gap-2"}>
          <input
            placeholder="What's on your mind?"
            className={
              "focus:ring--purple-400 rounded border-0 border-slate-400 bg-transparent p-3 outline-none ring-2 ring-transparent ring-purple-200  transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-purple-700"
            }
            onChange={handleChangeInput}
            value={input}
            disabled={isSendingPost}
          />
          <AnimatePresence>
            {errorOnSubmit && (
              <motion.p
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                className="text-red-500"
              >
                {errorOnSubmit}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Button
          variant={errorOnSubmit || isSendingPost ? "disabled" : "success"}
          loading={isSendingPost}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export const Profile = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return <></>;
  return (
    <>
      <div className={"flex justify-center border-b border-slate-400 p-4"}>
        {!isSignedIn && (
          <div className="flex flex-col">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
      </div>
    </>
  );
};

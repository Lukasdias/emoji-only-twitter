import { SignInButton, useUser } from "@clerk/nextjs";
import { NativeAvatar } from "~/components/Avatar";

const CreatePostWizard = () => {
  const { user } = useUser();
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

      <input
        type="text"
        placeholder="What's on your mind?"
        className={"rounded border border-slate-400 bg-transparent p-3"}
      />
    </div>
  );
};

export const Profile = () => {
  const { isSignedIn } = useUser();
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

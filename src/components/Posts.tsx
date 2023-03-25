import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { memo } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { NativeAvatar } from "./Avatar";
import { LoadingPage } from "./common/LoadingPage";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = ({ ...props }: PostWithUser) => {
  const tweetDate = dayjs(props.post.createdAt).fromNow();
  return (
    <div className="flex w-full items-center gap-3 border-b border-slate-400 p-8">
      <NativeAvatar
        alt={props.author?.lastName ?? "UserThumbnail"}
        src={props.author?.profileImageUrl ?? ""}
        fallbackText={props.author?.lastName ?? "U"}
        size="small"
        borderVariant="circle"
      />
      <div className="flex flex-col">
        <div className={"flex gap-1"}>
          <p className="text font-bold text-slate-200">
            {`@${props.author.username}`}
          </p>
          <p className="text text-slate-200">{`${tweetDate}`}</p>
        </div>

        <p className="text text-violet-600">{props.post.content}</p>
      </div>
    </div>
  );
};

export const Posts = memo(() => {
  const { data: posts, isLoading: postsLoading } = api.posts.getAll.useQuery();
  if (postsLoading) return <LoadingPage />;
  return (
    <div className="flex flex-col">
      {posts?.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
});

Posts.displayName = "Posts";

import { POST_SCHEMA, type POST_FORM } from "~/utils/schemas";
import type { User } from "@clerk/clerk-sdk-node";
import clerkClient from "@clerk/clerk-sdk-node";

import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

const filterUserForCLient = (user: User) => {
  const { id, emailAddresses, firstName, lastName, profileImageUrl, username } =
    user;
  return {
    id,
    emailAddresses,
    firstName,
    lastName,
    username,
    profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserForCLient);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author || !author.username)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found",
        });
      return {
        post,
        author: {
          ...author,
          username: author.username,
        },
      };
    });
  }),
  create: privateProcedure
    .input(POST_SCHEMA)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });
      return post;
    }),
});

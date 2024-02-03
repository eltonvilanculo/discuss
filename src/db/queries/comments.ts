import type { Comment } from "@prisma/client";
import { db } from "../db";
import { cache } from "react";

// export type CommentWithData  = {

// }
export type CommentWithData = Awaited<
  ReturnType<typeof fetchCommentsByPostId>
>[number];

// export type CommentWithDataManual = ({
//     user: {
//         name: string;
//         image: string | null;
//     };
// } & Comment)
export const fetchCommentsByPostId = cache((postId: string) => {
  console.log("query");
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});

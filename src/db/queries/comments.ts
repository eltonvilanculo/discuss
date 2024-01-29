import type { Comment } from "@prisma/client";
import { db } from "../db";

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
export function fetchCommentsByPostId(postId: string) {
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
}

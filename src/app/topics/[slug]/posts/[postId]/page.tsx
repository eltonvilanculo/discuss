import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import PostSkeleton from "@/components/posts/post.skeleton";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import paths from "@/helpers/path";
import Link from "next/link";
import { Suspense } from "react";

interface IShowPostParams {
  params: {
    slug: string;
    postId: string;
  };
}
export default function ShowPostPage({ params }: IShowPostParams) {
  return (
    <div className="space-y-4">
      <Link
        href={paths.showTopic(params.slug)}
        className="underline decoration-solid"
      >
        Back to {params.slug}
      </Link>

      <Suspense fallback={<PostSkeleton />}>
        <PostShow postId={params.postId} />
      </Suspense>
      <CommentCreateForm postId={params.postId} startOpen />
      <CommentList postId={params.postId} />
    </div>
  );
}

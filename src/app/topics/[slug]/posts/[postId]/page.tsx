import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import paths from "@/helpers/path";
import Link from "next/link";

interface IShowPostParams {
  params: {
    slug: string;
    postId: string;
  };
}
export default function ShowPostPage({ params }: IShowPostParams) {
  return (
    <div>
      <Link
        href={paths.showTopic(params.slug)}
        className="underline decoration-solid"
      >
        Back to {params.slug}
      </Link>

      <PostShow postId={params.postId} />
      <CommentCreateForm postId={params.postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(params.postId)} />
    </div>
  );
}

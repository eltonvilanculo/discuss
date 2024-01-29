import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/post-list";
import { db } from "@/db/db";
import { fetchPostsBySlug } from "@/db/queries/posts";

interface IShowTopic {
  params: { slug: string };
}
export default async function ShowTopicPage({ params }: IShowTopic) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-3">
        <h1 className="font-semibold">{params.slug}</h1>{" "}
        <PostList fetchData={() => fetchPostsBySlug(params.slug)} />
      </div>

      <PostCreateForm slug={params.slug} />
    </div>
  );
}

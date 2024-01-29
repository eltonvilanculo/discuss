import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import TopicList from "@/components/topics/TopicList";
import { fetchPosts } from "@/db/queries/posts";
import { Divider } from "@nextui-org/react";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Topics</h1>
        <PostList fetchData={() => fetchPosts()} />
      </div>

      <div className="border border-gray-200 py-3 px-2 shadow">
        <TopicCreateForm />
        <Divider />
        <h3 className="font-regular text-gray-500">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}

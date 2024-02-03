import PostList from "@/components/posts/post-list";
import { fetchPostBySearchTerm } from "@/db/queries/posts";

interface ISearchParams {
  searchParams: {
    term: string;
  };
}

export default function SearchPage({ searchParams }: ISearchParams) {
  const { term } = searchParams;
  return (
    <div>
      <PostList fetchData={() => fetchPostBySearchTerm(term)} />
    </div>
  );
}

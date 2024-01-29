import type { Post } from "@prisma/client";
import { db } from "../db";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string };
  _count: { comments: number };
};

type PostAutomatedType = Awaited<ReturnType<typeof fetchPosts>>[number]; //Como eu quero o type de qualquer elemento do array

export function fetchPostsBySlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      topic: {
        slug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function fetchPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

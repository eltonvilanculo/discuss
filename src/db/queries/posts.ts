import type { Post } from "@prisma/client";
import { db } from "../db";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string };
  _count: { comments: number };
};

type PostAutomatedType = Awaited<ReturnType<typeof fetchPosts>>[number]; //Como eu quero o type de qualquer elemento do array

export function fetchPostBySearchTerm(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: term,
          },

          content: {
            contains: term,
          },
        },
      ],
    },
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}

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

export function fecthTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

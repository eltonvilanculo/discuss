"use server";

import { db } from "@/db/db";
import { auth } from "@/helpers/auth";
import paths from "@/helpers/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface IFormResult {
  errors: {
    title?: string[];
    content?: string[];
    formCustomErrors?: string[];
  };
}
export async function createPost(
  slug: string,
  formState: IFormResult,
  formData: FormData
): Promise<IFormResult> {
  const session = await auth();
  const inputSchema = z.object({
    title: z
      .string()
      .min(3)
      .regex(/[a-zA-Z]/, { message: "Title must have at least 3 characters" }),
    content: z
      .string()
      .min(5, { message: "Content must have at least 5 characters" }),
  });

  const result = inputSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!session) {
    return {
      errors: {
        formCustomErrors: ["You must login to create post"],
      },
    };
  }

  if (result.success) {
    const user = session.user;
    try {
      const topic = await db.topic.findFirst({
        where: {
          slug,
        },
      });

      if (topic && user) {
        await db.post.create({
          data: {
            title: result.data.title,
            content: result.data.content,
            userId: user.id,
            topicId: topic.id,
          },
        });
      }
    } catch (error) {}

    revalidatePath(paths.showTopic(slug));
    redirect(paths.showTopic(slug));
  }

  return { errors: result.error.flatten().fieldErrors };

  // TODO: revalidate show topic
}

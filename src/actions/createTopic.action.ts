"use server";

import { auth } from "@/helpers/auth";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { db } from "@/db/db";
import { redirect } from "next/navigation";
import paths from "@/helpers/path";
import { revalidatePath } from "next/cache";

interface createTopicFormStateProps {
  errors: {
    name?: string[];
    description?: string[];
    _formErrors?: string[];
  };
}
export async function createTopic(
  formState: createTopicFormStateProps,
  formData: FormData
): Promise<createTopicFormStateProps> {
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));

  const name = formData.get("name");
  const description = formData.get("description");

  const session = await auth();
  const inputSchema = z.object({
    name: z
      .string()
      .min(3)
      .regex(/^[a-z-]+$/, {
        message: "Must be lower case letters or dashes without spaces",
      }),
    description: z.string().min(5),
  });

  const result = inputSchema.safeParse({
    name,
    description,
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);

    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!session || !session.user) {
    // OR CALL LOGIN ACTION HERE
    return {
      errors: {
        _formErrors: ["You must be logged in for creating a new topic"],
      },
    };
  }

  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _formErrors: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.showTopic(topic.slug));
  // return {
  //   errors: {},
  // };

  // TODO: revalidate home page
}

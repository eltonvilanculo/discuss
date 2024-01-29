"use server";

import { db } from "@/db/db";
import paths from "@/helpers/path";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

export default async function TopicList() {
  const topics = await db.topic.findMany();
  return (
    <div className="flex flex-row gap-2 flex-wrap content-center">
      {topics.map((topic) => (
        <Link href={paths.showTopic(topic.slug)}>
          <Chip>{topic.slug}</Chip>
        </Link>
      ))}
    </div>
  );
}

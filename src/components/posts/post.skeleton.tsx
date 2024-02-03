import { Skeleton } from "@nextui-org/react";

export default function PostSkeleton() {
  return (
    <div>
      <div>
        <Skeleton className="h-8 w-1/3 py-2" />
      </div>

      <div className="py-4 space-y-4">
        <Skeleton className="h-8 w-1/2 py-8" />
        <Skeleton className="h-8 w-1/2 py-8" />
        <Skeleton className="h-8 w-1/2 py-8" />
      </div>
    </div>
  );
}

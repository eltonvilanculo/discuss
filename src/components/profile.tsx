"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data } = useSession();

  return (
    <div>
      {data?.user ? (
        <span>From client : {JSON.stringify(data.user)}</span>
      ) : null}
    </div>
  );
}

"use client";
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  let authContent: React.ReactNode;

  const session = useSession();

  if (session.status === "loading") {
    authContent = null;
  } else if (session?.data?.user) {
    authContent = (
      <Popover placement="right">
        <PopoverTrigger>
          <Avatar src={session.data.user.image ?? ""} />
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.signOut}>
            <Button type="submit" className="bg-white">
              SIGN OUT
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <form action={actions.signIn} className="grid grid-cols-2">
        <NavbarItem>
          <Button
            className="bg-black text-white rounded-sm uppercase"
            type="submit"
          >
            Sign IN
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="bg-white text-black border-black rounded-sm border-small uppercase"
            type="submit"
          >
            Sign UP
          </Button>
        </NavbarItem>
      </form>
    );
  }

  return authContent;
}

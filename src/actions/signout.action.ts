"use server";
import * as actions from "@/helpers/auth";
export async function signOut() {
  return actions.signOut();
}

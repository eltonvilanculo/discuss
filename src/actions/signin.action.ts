"use server";
import * as actions from "@/helpers/auth";

export async function signIn() {
  return actions.signIn("github");
}

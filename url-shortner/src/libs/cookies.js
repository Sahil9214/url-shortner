"use server";
import { cookies } from "next/headers";

export const setCookies = async (token) => {
  let cookieStore = await cookies();
  cookieStore.set("token", token);
};

export const getCookies = async () => {
  let cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};

export const setProfileImage = async (image) => {
  let cookieStore = await cookies();
  cookieStore.set("profileImage", image);
};

export const getProfileImage = async () => {
  let cookieStore = await cookies();
  return cookieStore.get("profileImage")?.value;
};

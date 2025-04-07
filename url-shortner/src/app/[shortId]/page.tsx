// app/[shortId]/page.tsx
import { redirect } from "next/navigation";
const url = "https://url-shortner-2-jwar.onrender.com";
export default async function ShortUrlRedirect({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;
  console.log("params:::", shortId);
  let data;
  try {
    const res = await fetch(`${url}/${shortId}`);
    data = await res.json();
    console.log("data:::", data);
  } catch (error) {
    console.log("error:::", error);
  }

  redirect(data.originalUrl); // Original URL pe redirect
}

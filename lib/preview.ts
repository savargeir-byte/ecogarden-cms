import { cookies } from "next/headers";

export async function isPreview() {
  const cookieStore = await cookies();
  return cookieStore.get("preview")?.value === "true";
}

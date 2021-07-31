import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function RedirectToFront() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/discordia/front"), [router];
  });
  return null;
}

import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function RedirectToFront() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cacophonia/front"), [router];
  });
  return null;
}

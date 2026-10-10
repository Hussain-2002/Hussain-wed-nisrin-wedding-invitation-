import { Suspense } from "react";
import { Invitation } from "@/components/Invitation";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-dvh place-items-center bg-night text-gold">
          Lighting the fuse…
        </div>
      }
    >
      <Invitation />
    </Suspense>
  );
}

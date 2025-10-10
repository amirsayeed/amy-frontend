import Image from "next/image";

export default function Loading() {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Image src="/images/loading.gif" alt="Loading…" width={150} height={150} unoptimized />
      </div>
    );
  }
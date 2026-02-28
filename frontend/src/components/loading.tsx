// import React from "react";

// const Loading = () => {
//   return (
//     <div className="w-[200px] m-auto mt-[200px]">
//       <p className="text-2xl text-blue-500 font-bold text-center">Loading...</p>
//     </div>
//   );
// };

// export default Loading;


'use client';
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => (
  <div className="min-h-[60vh] w-full px-6 py-10">
    <div className="mx-auto w-full max-w-[780px] space-y-6">
      <Skeleton className="h-7 w-48" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm"
          >
            <Skeleton className="h-40 w-full rounded-2xl" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Loading;

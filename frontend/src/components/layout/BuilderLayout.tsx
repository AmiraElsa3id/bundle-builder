import type { ReactNode } from "react";

interface BuilderLayoutProps {
  builder: ReactNode;
  review: ReactNode;
}

export function BuilderLayout({ builder, review }: BuilderLayoutProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:grid lg:grid-cols-[1fr_25rem] lg:items-start lg:gap-6 lg:px-12 2xl:block 2xl:max-w-[1728px] 2xl:px-16">
      <div className="flex flex-col gap-3">{builder}</div>
      <div className="mt-6 lg:mt-0 2xl:mt-6">{review}</div>
    </div>
  );
}

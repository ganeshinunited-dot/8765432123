import Link from "next/link";
import Image from "next/image";

export type CarouselCourse = {
  slug: string;
  title: string;
  price: number;
  category: string | null;
  views: number;
  sales: number;
  thumbnailUrl: string | null;
  instructorName: string;
  isVerified: boolean;
};

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

export function CourseCard({ c }: { c: CarouselCourse }) {
  const free = c.price === 0;
  return (
    <Link
      href={`/courses/${c.slug}`}
      className="group block w-40 shrink-0 snap-start overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md sm:w-56"
    >
      <div className="relative aspect-video gx-btn gx-btn-dark">
        {c.thumbnailUrl ? (
          <Image src={c.thumbnailUrl} alt={c.title} fill sizes="(max-width: 640px) 160px, 224px" className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full w-full items-center justify-center gx-btn gx-btn-dark">
            <PlayIcon className="h-8 w-8 text-slate-500" />
          </div>
        )}
        <span
          className={`absolute left-1.5 top-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            free ? "bg-emerald-600 text-white" : "bg-slate-900/80 text-white"
          }`}
        >
          {free ? "Free" : `NPR ${c.price.toLocaleString()}`}
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition group-hover:gx-btn gx-btn-primary sm:h-11 sm:w-11">
            <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </span>
      </div>
      <div className="p-2.5 sm:p-3">
        <p className="line-clamp-2 min-h-8 text-xs font-semibold leading-snug text-slate-900 sm:min-h-10 sm:text-sm">{c.title}</p>
        <p className="mt-1 truncate text-[10px] text-slate-500 sm:text-xs">
          {c.instructorName}
          {c.isVerified ? " ✓" : ""}
          {c.category ? ` · ${c.category}` : ""}
        </p>
        <span className="mt-2 inline-flex h-8 w-full items-center justify-center rounded-lg gx-btn gx-btn-primary text-xs font-semibold text-white transition group- sm:h-9 sm:text-sm">
          Learn
        </span>
      </div>
    </Link>
  );
}

"use client";

import { useState } from "react";

export type PlayerVideo = {
  id: string;
  title: string;
  durationSec: number | null;
  youtubeId: string | null;
};

export function CoursePlayer({ videos }: { videos: PlayerVideo[] }) {
  const playable = videos.filter((v) => v.youtubeId);
  const [activeId, setActiveId] = useState<string | null>(playable[0]?.id ?? null);
  const active = playable.find((v) => v.id === activeId) ?? playable[0] ?? null;

  if (playable.length === 0) {
    return (
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {videos.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">Lessons coming soon.</p>
        ) : (
          videos.map((v, i) => (
            <div key={v.id} className="flex items-center justify-between px-5 py-3">
              <p className="text-sm font-medium text-slate-800">{i + 1}. {v.title}</p>
              {v.durationSec ? <span className="text-xs text-slate-400">{Math.floor(v.durationSec / 60)} min</span> : null}
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-black">
        <div className="aspect-video w-full">
          {active?.youtubeId && (
            <iframe
              key={active.id}
              src={`https://www.youtube.com/embed/${active.youtubeId}?rel=0`}
              title={active.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {playable.map((v, i) => {
          const isActive = v.id === active?.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveId(v.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition sm:px-5 ${
                isActive ? "bg-emerald-50" : "hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-sm font-medium ${isActive ? "text-emerald-900" : "text-slate-800"}`}>
                  {i + 1}. {v.title}
                </span>
              </span>
              {isActive && <span className="shrink-0 text-xs font-bold text-emerald-700">Now playing</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

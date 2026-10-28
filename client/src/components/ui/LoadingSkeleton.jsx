import React from 'react';

export const ProjectSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 w-full" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/5" />
        </div>
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-16" />
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-16" />
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-16" />
        </div>
      </div>
    </div>
  );
};


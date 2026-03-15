import { ReactNode } from 'react';

interface SkeletonProps {
    className?: string;
}

/**
 * Base skeleton component with shimmer animation
 */
export const Skeleton = ({ className = '' }: SkeletonProps) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`} />
);

/**
 * Shimmer effect overlay for skeleton loaders
 */
const Shimmer = () => (
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
);

/**
 * Card skeleton for portfolio/blog cards
 */
export const CardSkeleton = () => (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <Shimmer />
        <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
            </div>
        </div>
    </div>
);

/**
 * Grid of card skeletons
 */
export const CardGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

/**
 * Text skeleton with multiple lines
 */
export const TextSkeleton = ({ lines = 3 }: { lines?: number }) => (
    <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

/**
 * Image skeleton
 */
export const ImageSkeleton = ({ aspectRatio = '1/1' }: { aspectRatio?: string }) => (
    <div className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800" style={{ aspectRatio }}>
        <Shimmer />
    </div>
);

/**
 * List skeleton for admin tables
 */
export const ListSkeleton = ({ rows = 5 }: { rows?: number }) => (
    <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="relative overflow-hidden flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <Shimmer />
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
            </div>
        ))}
    </div>
);

/**
 * Hero section skeleton for homepage
 */
export const HeroSkeleton = () => (
    <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <div className="flex gap-4 pt-4">
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-12 w-32" />
                </div>
            </div>
            <div className="flex-1">
                <ImageSkeleton aspectRatio="1/1" />
            </div>
        </div>
    </div>
);

/**
 * Blog post detail skeleton
 */
export const BlogPostSkeleton = () => (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <div className="flex items-center justify-center gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
            </div>
            <ImageSkeleton aspectRatio="16/9" />
            <div className="space-y-4 pt-8">
                <TextSkeleton lines={8} />
                <TextSkeleton lines={6} />
                <TextSkeleton lines={7} />
            </div>
        </div>
    </article>
);

/**
 * Dashboard stats skeleton
 */
export const DashboardStatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <Shimmer />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
        ))}
    </div>
);

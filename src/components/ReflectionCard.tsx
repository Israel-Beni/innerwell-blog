'use client';

import Image from 'next/image';
import { ReflectionData } from '@/types/reflection';

interface ReflectionCardProps {
  reflection: ReflectionData;
}

export function ReflectionCard({ reflection }: ReflectionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
  };

  const handleClick = () => {
    const url = `https://helloinnerwell.com/reflections/${reflection.slug}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src={reflection.imageUrl}
          alt={reflection.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6">
        <div className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
          {formatDate(reflection.publishDate)}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-3">
          {reflection.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium">{reflection.author}</span>
          {reflection.wordCount !== 'N/A' && (
            <span>{reflection.wordCount} words</span>
          )}
        </div>
        
        <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-mono">
          {reflection.slug}
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <span className="font-medium">Image URL:</span>
          <div className="mt-1 text-blue-600 break-all">
            {reflection.imageUrl}
          </div>
        </div>
      </div>
    </div>
  );
} 
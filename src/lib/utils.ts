import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isCheckImage(fileName: string) {
  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'svg',
    'webp',
    'tiff',
    'ico',
  ];

  const fileExtension = fileName.toLowerCase();
  return imageExtensions.includes(fileExtension);
}

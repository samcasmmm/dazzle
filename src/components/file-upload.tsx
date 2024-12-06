'use client';

import React, { useState } from 'react';
import '@uploadthing/react/styles.css';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

import { UploadDropzone } from '@/lib/uploadthing';

interface FileUploadProps {
  onChange: (url?: string) => void;
  getType?: (e?: any) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

export function FileUpload({
  onChange,
  value,
  endpoint,
  getType,
}: FileUploadProps) {
  const fileType1 = value.split('.').pop()?.toLowerCase();
  const [fileType, setFileType] = useState('img');

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image fill src={value} alt='Upload' className='rounded-full' />
        <button
          onClick={() => onChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  if (value && fileType) {
    return (
      <div className='relative flex items-center p-2 mt-2 rounded-md bg-[#202020] max-w-lg'>
        <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline break-words max-w-sm'
        >
          {value}
        </a>

        <button
          onClick={() => onChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute top-[-8px] right-[-8px] shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      className='dark:border-neutral-400 dark:text-white'
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const uploadedFile = res?.[0];
        if (uploadedFile) {
          console.log('Uploaded file:', uploadedFile.name.split('.')[1]);
          if (getType) {
            getType(uploadedFile.name.split('.')[1].toLowerCase());
          }
          if (uploadedFile.name.split('.')[1] === 'pdf') {
            setFileType('pdf');
          }
          onChange(uploadedFile.url);
        }
      }}
      onUploadError={(error: Error) =>
        console.error('Upload error:', error.message)
      }
    />
  );
}

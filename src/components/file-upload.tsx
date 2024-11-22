'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import React from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { FileUploadData, GetFileUrlsOptions } from 'uploadthing/types';
import { DeleteUploadThingByUrl } from '@/lib/AxiosRequest';

interface Props {
  endpoint: 'messageFile' | 'serverImage';
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: Props) => {
  const fileType = value?.split('.').pop();
  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20 '>
        <Image src={String(value)} alt='Upload' className='rounded-full' fill />
        <button
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm hover:bg-rose-600 duration-100 ease-linear '
          type='button'
          onClick={async () => {
            await DeleteUploadThingByUrl(value);
            return onChange();
          }}
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      className='dark:border-neutral-400 dark:text-white'
      endpoint='serverImage'
      onClientUploadComplete={(res) => {
        if (res) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(e: Error) => {
        console.log('onUploadError', e);
      }}
    />
  );
};

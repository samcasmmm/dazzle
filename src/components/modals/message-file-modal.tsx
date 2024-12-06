'use client';

import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FileUpload } from '@/components/file-upload';
import { useModal } from '@/hooks/use-modal-store';

type Props = {};

const formSchema = z.object({
  fileUrl: z.string().min(1, { message: 'Attachment is required.' }),
  // fileUrlType: z.string().min(1, { message: 'Attachment is required.' }),
});

export const MessageFileModal = (props: Props) => {
  const router = useRouter();
  const {
    isOpen,
    onClose,
    type,
    data: { apiUrl, query },
  } = useModal();

  const isModalOpen = isOpen && type === 'messageFile';
  const [fileType, setFileType] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;

  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    console.log(fileType);
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
        fileUrlType: fileType,
      });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
      toast(String(error));
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white dark:bg-neutral-900 text-black p-0 overflow-hidden border-2 dark:border-gray-800 max-w-lg'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold  dark:text-secondary/70 dark:text-white'>
            Add an attachment
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)} className='space-y-8'>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  control={form.control}
                  name='fileUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='messageFile'
                          value={field.value}
                          onChange={field.onChange}
                          getType={setFileType}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className='bg-gray-100 px-6 py-4 dark:bg-neutral-900'>
              <Button disabled={isLoading} variant={'primary'}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

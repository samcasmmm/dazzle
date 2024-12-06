import { useModal } from '@/hooks/use-modal-store';
import qs from 'query-string';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

type Props = {};

export const DeleteMessageModal = (props: Props) => {
  const { isOpen, onOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === 'deleteMessage';

  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });
      await axios.delete(url);
      onClose();
      toast.success(`You deleted Message`);
    } catch (error) {
      console.log(error);
      toast.error('Somthing went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden dark:bg-neutral-900  border-2 dark:border-gray-800 dark:text-white'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Message
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to fo this ? <br />
            The message will be permanently deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4 dark:bg-neutral-800'>
          <div className='flex items-center justify-between w-full'>
            <Button disabled={isLoading} variant={'ghost'} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant={'primary'}
              onClick={handleOnClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

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

export const DeleteServerModal = (props: Props) => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteServer';

  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    const server_name = server?.name;
    try {
      toast.info('Verify & Validating profile');
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      toast.success(`You delete the ${server_name}`);
      router.refresh();
      router.push('/');
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
            Delete Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to fo this ? <br />
            <span className='font-semibold text-indigo-500'>
              {server?.name}
            </span>{' '}
            will be permanently deleted
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

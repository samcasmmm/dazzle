import { useModal } from '@/hooks/use-modal-store';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, Navigation, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import { toast } from 'sonner';
import { string } from 'zod';
import axios from 'axios';

type Props = {};

export const InviteModal = (props: Props) => {
  const { isOpen, type, onClose, onOpen, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'invite';

  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen('invite', { server: res.data });
      toast.success('Generated new invite link');
    } catch (error) {
      console.log(error);
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const CopyTextComponent = () => {
    return (
      <Button
        size={'icon'}
        className='dark:bg-black'
        onClick={onCopy}
        disabled={isLoading}
      >
        {copied ? (
          <Check className='w-4 h-4 dark:text-emerald-600 text-emerald-600' />
        ) : (
          <Copy className='w-4 h-4 dark:text-white' />
        )}
      </Button>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden dark:bg-neutral-900  border-2 dark:border-gray-800 dark:text-white'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 dark:text-white'>
            Server invite link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:text-white selection:bg-blue-600'
              value={inviteUrl}
              disabled={isLoading}
            />
            <CopyTextComponent />
          </div>
          <Button
            variant={'link'}
            size={'sm'}
            className='text-xs text-zinc-500 mt-4 dark:text-white '
            disabled={isLoading}
            onClick={onNew}
          >
            Generate a new link
            <RefreshCw className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

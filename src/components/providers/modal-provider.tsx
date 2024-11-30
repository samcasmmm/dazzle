'use client';

import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/use-modal-store';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { InviteModal } from '@/components/modals/invite-modal';
import { EditServerModal } from '@/components/modals/edit-server-modal';
import { MemebersModal } from '@/components/modals/members-modal';
import { CreateChannelModal } from '@/components/modals/create-channel-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemebersModal />
      <CreateChannelModal />
    </>
  );
};

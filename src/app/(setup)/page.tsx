import React from 'react';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

import { initialProfile } from '@/lib/initial-profile';
import { InitailModal } from '@/components/modals/initial-modal';

type Props = {};

const SetupPage = async (props: Props) => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <InitailModal />;
};

export default SetupPage;

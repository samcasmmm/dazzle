import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

type Props = {
  params: {
    serverId: string;
  };
};

export default async function ServerIdPage({ params }: Props) {
  const profile = await currentProfile();

  if (!profile) return (await auth()).redirectToSignIn;
  const { serverId } = await params;
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  });
  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== 'general') return null;

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
}

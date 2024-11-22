import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

import { ServerSidebar } from '@/components/server/server-sidebar';

type Params = Promise<{ serverId: string }>;
type Props = {
  children: React.ReactNode;
  params: Params;
};

const ServerIdLayout = async (props: Props) => {
  const profile = await currentProfile();
  const { serverId } = await props.params;
  if (!profile) {
    return (await auth()).redirectToSignIn;
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  console.log(server);
  if (!server) {
    return redirect('/');
  }
  return (
    <div className='h-full'>
      <div className='hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0'>
        <ServerSidebar serverId={serverId} />
      </div>
      <main className='h-full md:pl-60'>{props.children}</main>
    </div>
  );
};

export default ServerIdLayout;

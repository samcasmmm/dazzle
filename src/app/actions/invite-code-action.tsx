'use server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function handleInviteCode(inviteCode: string) {
  const profile = await currentProfile();

  if (!profile) {
    return (await auth()).redirectToSignIn;
  }

  if (!inviteCode) {
    return redirect('/');
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: { some: { profileId: profile.id } },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: { inviteCode },
    data: {
      members: { create: [{ profileId: profile.id }] },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return redirect('/');
}

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await params;
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log('[DELETE_SERVER]', error);
    return new NextResponse('[DELETE_SERVER]', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    const { serverId } = await params;
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

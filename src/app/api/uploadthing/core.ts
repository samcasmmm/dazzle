import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@clerk/nextjs/server';

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthroized');
  }
  return { userId: userId };
};
export const ourFileRouter = {
  serverImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      console.log('Message File Upload Completed.');
    }),
  messageFile: f(['image', 'pdf', 'image/gif', 'video'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      console.log('Message File Upload Completed.');
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

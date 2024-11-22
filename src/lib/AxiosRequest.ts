import axios from 'axios';

export const DeleteUploadThingByUrl = async (url: string) => {
  await axios.delete('api/uploadthing', {
    data: {
      url: url,
    },
  });
};

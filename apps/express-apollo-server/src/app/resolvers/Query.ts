import { isAfter } from 'date-fns';

import { PHOTOS } from '../data';

export const Query = {
  totalPhotos: () => PHOTOS.length,
  allPhotos: (parent, args: { after: string }) => {
    if (!args.after) {
      return PHOTOS;
    }
    return PHOTOS.filter((p) =>
      isAfter(new Date(p.created), new Date(args.after))
    );
  },
  photoById(_, args: { id: string }) {
    return PHOTOS.find((p) => p.id === args.id);
  },
};

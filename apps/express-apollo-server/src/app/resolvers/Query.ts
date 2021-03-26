import { isAfter } from 'date-fns';

import { PHOTOS } from '../data';

export const Query = {
  totalPhotos: () => PHOTOS.length,
  allPhotos: (parent, args: { after: string }) => {
    return PHOTOS.filter((p) =>
      isAfter(new Date(p.created), new Date(args.after))
    );
  },
};

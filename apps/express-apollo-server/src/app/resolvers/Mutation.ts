import { v4 as uuidv4 } from 'uuid';

import { PHOTOS } from '../data';
import { Photo } from '../types';

export const Mutation = {
  /**
   * @param parent 親オブジェクトへの参照
   * @param args ClientからのVariable
   */
  postPhoto(parent, args: { input: Photo }): Photo {
    const id = uuidv4();
    const newPhoto: Photo = { id, ...args.input, created: new Date() };

    PHOTOS.push(newPhoto);

    return newPhoto;
  },
  updatePhotoName(
    parent,
    args: { input: { id: string; name: string } }
  ): Photo {
    const idx = PHOTOS.findIndex((p) => p.id === args.input.id);
    PHOTOS[idx] = { ...PHOTOS[idx], name: args.input.name };
    return PHOTOS[idx];
  },
};

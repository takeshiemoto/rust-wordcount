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
};

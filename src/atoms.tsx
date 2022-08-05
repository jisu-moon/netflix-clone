import { atom } from 'recoil';

export const homeVideoState = atom<boolean>({
  key: 'videoShow',
  default: false,
});

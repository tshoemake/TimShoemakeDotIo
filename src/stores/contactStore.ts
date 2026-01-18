import { atom } from 'nanostores';

export const isContactOpen = atom(false);

export function openContact() {
  isContactOpen.set(true);
}

export function closeContact() {
  isContactOpen.set(false);
}

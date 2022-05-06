import { X } from 'phosphor-react';
import { Popover } from '@headlessui/react';

export function CloseButton() {
  return (
    <Popover.Button className="absolute right-5 top-5"><X/></Popover.Button>
  )
}

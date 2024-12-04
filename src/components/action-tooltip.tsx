'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActionTooltipProp {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'left' | 'bottom';
  align?: 'start' | 'center' | 'end';
}

export const ActionTooltip = ({
  label,
  children,
  side = 'right',
  align = 'center',
}: ActionTooltipProp) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className='bg-white dark:bg-[#202020]'
        >
          <p className='font-semibold capitalize text-sm dark:text-white'>
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// tooltip.jsx
// This file defines a reusable Tooltip component using Radix UI primitives, with custom styling.

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../../lib/utils';

// TooltipProvider wraps the app to provide tooltip context (Radix primitive)
const TooltipProvider = TooltipPrimitive.Provider;

// Tooltip root component (Radix primitive)
const Tooltip = TooltipPrimitive.Root;

// TooltipTrigger is the element that triggers the tooltip (Radix primitive)
const TooltipTrigger = TooltipPrimitive.Trigger;

// TooltipContent wraps Radix's Content, adds custom classes and offset
const TooltipContent = React.forwardRef((props, ref) => {
  props = props || {};
  const { className, sideOffset = 4, ...rest } = props;
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...rest}
    />
  );
});
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }; 
// tabs.jsx
// This file defines a reusable Tabs component using Radix UI primitives, with custom styling.

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../lib/utils';

// Tabs root component (Radix primitive)
const Tabs = TabsPrimitive.Root;

// TabsList wraps Radix's List with custom classes
const TabsList = React.forwardRef((props, ref) => {
  props = props || {};
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
      {...rest}
    />
  );
});
TabsList.displayName = 'TabsList';

// TabsTrigger wraps Radix's Trigger with custom classes
const TabsTrigger = React.forwardRef((props, ref) => {
  props = props || {};
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        className
      )}
      {...rest}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

// TabsContent wraps Radix's Content with custom classes
const TabsContent = React.forwardRef((props, ref) => {
  props = props || {};
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...rest}
    />
  );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent }; 
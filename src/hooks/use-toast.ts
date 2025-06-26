// use-toast.ts
// This file provides a custom toast notification system using React state and a reducer pattern.

import * as React from 'react';
import type { ToastProps, ToastActionProps } from '@radix-ui/react-toast';

const TOAST_LIMIT = 1; // Maximum number of toasts to show at once
const TOAST_REMOVE_DELAY = 1000000; // Delay before removing a toast (in ms)

// Use ToastActionProps as the type for ToastActionElement
type ToastActionElement = React.ReactElement<ToastActionProps>;

// Type for a toast object
// Extends ToastProps with additional fields
// id: unique identifier for the toast
// title, description: content of the toast
// action: optional action element
// open: whether the toast is visible
// onOpenChange: callback for open state changes
// ...other ToastProps

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Action types for the reducer
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0; // Used to generate unique toast IDs

// Generates a unique ID for each toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

// Action type for the reducer
// - ADD_TOAST: add a new toast
// - UPDATE_TOAST: update an existing toast
// - DISMISS_TOAST: mark a toast as dismissed (will be removed after delay)
// - REMOVE_TOAST: remove a toast from state

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

// State type for the reducer
interface State {
  toasts: ToasterToast[];
}

// Map to keep track of toast removal timeouts
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// Adds a toast to the removal queue after a delay
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// Reducer function to manage toast state
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      // Add new toast to the front of the list, limit to TOAST_LIMIT
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      // Update an existing toast by ID
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Mark the toast as closed (open: false)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOAST':
      // Remove the toast from the state
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// Listeners for toast state changes
const listeners: Array<(state: State) => void> = [];

// In-memory state for toasts
let memoryState: State = { toasts: [] };

// Dispatches an action and notifies all listeners
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

// toast() creates a new toast and returns control functions
function toast({ ...props }: Toast) {
  const id = genId();

  // Update the toast by ID
  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  // Dismiss the toast by ID
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  // Add the toast to state
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

// useToast hook provides access to the toast state and actions
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

export { useToast, toast };

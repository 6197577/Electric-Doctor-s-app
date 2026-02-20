
'use client';

import { useRef } from 'react';

/**
 * A hook that stabilizes a Firestore reference or query.
 * It only updates when the dependencies change, preventing infinite loops in Firestore hooks.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  const ref = useRef<{ value: T; deps: any[] } | null>(null);

  const isDepsEqual = (oldDeps: any[], newDeps: any[]) => {
    if (oldDeps.length !== newDeps.length) return false;
    return oldDeps.every((dep, i) => dep === newDeps[i]);
  };

  if (!ref.current || !isDepsEqual(ref.current.deps, deps)) {
    ref.current = { value: factory(), deps };
  }

  return ref.current.value;
}

/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { setDevContentOpsWriteOperationsEnabled } from './devContentOpsApi';

export const WRITE_OPS_DISABLED_HINT =
  'Enable write Operations in the toolbar to use mutating actions.';

type WriteGateContextValue = {
  writeOperationsEnabled: boolean;
  setWriteOperationsEnabled: (enabled: boolean) => void;
};

const DevContentOpsWriteGateContext = createContext<WriteGateContextValue | null>(null);

export function DevContentOpsWriteGateProvider({
  writeOperationsEnabled,
  onWriteOperationsEnabledChange,
  children
}: {
  writeOperationsEnabled: boolean;
  onWriteOperationsEnabledChange: (enabled: boolean) => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    setDevContentOpsWriteOperationsEnabled(writeOperationsEnabled);
    return () => setDevContentOpsWriteOperationsEnabled(false);
  }, [writeOperationsEnabled]);

  const value = useMemo<WriteGateContextValue>(
    () => ({
      writeOperationsEnabled,
      setWriteOperationsEnabled: onWriteOperationsEnabledChange
    }),
    [writeOperationsEnabled, onWriteOperationsEnabledChange]
  );

  return (
    <DevContentOpsWriteGateContext.Provider value={value}>{children}</DevContentOpsWriteGateContext.Provider>
  );
}

export function useDevContentOpsWriteGate(): WriteGateContextValue {
  const ctx = useContext(DevContentOpsWriteGateContext);
  if (!ctx) {
    return {
      writeOperationsEnabled: false,
      setWriteOperationsEnabled: setDevContentOpsWriteOperationsEnabled
    };
  }
  return ctx;
}

/** True when write controls should be disabled. */
export function useWriteOpsLocked(): boolean {
  return !useDevContentOpsWriteGate().writeOperationsEnabled;
}

import { createContext, useContext, useState, useCallback, useRef } from "react";
import ConfirmModal from "@/ui/modal/ConfirmModal";
import { useCloseComponents } from "@/hooks/useCloseComponents";

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const ref = useRef(null);
  const [config, setConfig] = useCloseComponents(ref);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfig({
        ...options,
        onConfirm: () => {
          resolve(true);
          setConfig(null);
        },
        onCancel: () => {
          resolve(false);
          setConfig(null);
        },
      });
    });
  }, []);


  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {config && (
        <ConfirmModal
          isOpen={!!config}
          title={config.title}
          message={config.message}
          onConfirm={config.onConfirm}
          onCancel={config.onCancel}
          confirmLabel={config.confirmLabel}
          cancelLabel={config.cancelLabel}
          isPending={config.isPending}
          danger={config.danger}
          setOpen={() => setConfig(null)}
          ref={ref}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}


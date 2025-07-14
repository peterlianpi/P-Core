// components/ui/confirm-dialog-provider.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmState = {
  open: boolean;
  message: string;
  resolve: (confirmed: boolean) => void;
};

const ConfirmContext = createContext<(message: string) => Promise<boolean>>(
  () => Promise.resolve(false)
);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState>({
    open: false,
    message: "",
    resolve: () => {},
  });

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        open: true,
        message,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    state.resolve(true);
    setState((s) => ({ ...s, open: false }));
  };

  const handleCancel = () => {
    state.resolve(false);
    setState((s) => ({ ...s, open: false }));
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog
        open={state.open}
        onOpenChange={(open) => !open && handleCancel()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">{state.message}</div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export const useConfirmDialog = () => useContext(ConfirmContext);

import * as React from "react";
import { useConfirmationDialog } from "../zustand-stores";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export type ConfirmationDialogProps = {
  title: string;
  content: string | React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  hideCancelButton?: boolean;
  confirmButtonText?: string;
  confirmButtonVariant?:
    | "destructive"
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  cancelButtonText?: string;
};

export default function ConfirmationDialog() {
  const props = useConfirmationDialog((store) => store.props);

  if (!props) return null;

  const {
    title,
    content,
    onCancel,
    onConfirm,
    hideCancelButton = false,
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
    confirmButtonVariant = "default",
  } = props;

  const handleOpenChange = (open: boolean) => {
    if (!open) onCancel();
  };

  return (
    <Dialog open={Boolean(props)} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
        <DialogFooter>
          {hideCancelButton ? null : (
            <Button onClick={onCancel} className="w-full" variant="outline">
              {cancelButtonText}
            </Button>
          )}
          <Button
            onClick={onConfirm}
            className="w-full"
            variant={confirmButtonVariant}
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

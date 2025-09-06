import React from "react";

export function useUnsavedChangedConfirmation(changes: number) {
  React.useEffect(() => {
    if (!changes) {
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [changes]);
}

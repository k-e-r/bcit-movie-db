import { useToast } from "../../hooks/useToast";

export const Toast = () => {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="fixed top-5 right-0 z-[9999] min-w-[280px] overflow-hidden border border-neutral-700 bg-neutral-950 text-neutral-100 shadow-lg"
      style={{
        animation: toast.isClosing
          ? "toast-out 300ms ease-in forwards"
          : "toast-in 300ms ease-out",
      }}
    >
      <div className="px-4 py-3 text-sm font-medium">
        {toast.message}
      </div>

      <div className="h-1 w-full bg-neutral-800">
        <div className="h-full w-full origin-left bg-neutral-400 animate-toast-progress" />
      </div>
    </div>
  );
};
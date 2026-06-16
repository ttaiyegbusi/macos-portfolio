interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

export default function WindowControls({ onClose, onMinimize, onMaximize, isMaximized }: WindowControlsProps) {
  const stop = (e: React.PointerEvent) => e.stopPropagation(); // don't start a window drag from the buttons

  return (
    <div className="traffic-lights flex items-center gap-2" onPointerDown={stop} onDoubleClick={(e) => e.stopPropagation()}>
      <button
        aria-label="Close window"
        onClick={onClose}
        className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-ctlClose shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)] transition-transform active:scale-90"
      >
        <svg viewBox="0 0 8 8" className="traffic-light-icon h-[6px] w-[6px]" stroke="#7E1D14" strokeWidth="1.3" strokeLinecap="round">
          <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" />
        </svg>
      </button>
      <button
        aria-label="Minimize window"
        onClick={onMinimize}
        className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-ctlMin shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)] transition-transform active:scale-90"
      >
        <svg viewBox="0 0 8 8" className="traffic-light-icon h-[6px] w-[6px]" stroke="#8F5B0B" strokeWidth="1.4" strokeLinecap="round">
          <path d="M1.2 4h5.6" />
        </svg>
      </button>
      <button
        aria-label={isMaximized ? "Restore window" : "Maximize window"}
        onClick={onMaximize}
        className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-ctlMax shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)] transition-transform active:scale-90"
      >
        <svg viewBox="0 0 8 8" className="traffic-light-icon h-[6px] w-[6px]" fill="#155E0B">
          {isMaximized ? (
            <path d="M1.2 4.6h2.6v2.6L1.2 4.6zM6.8 3.4H4.2V0.8l2.6 2.6z" />
          ) : (
            <path d="M1.2 1.2h3.2L1.2 4.4V1.2zM6.8 6.8H3.6l3.2-3.2v3.2z" />
          )}
        </svg>
      </button>
    </div>
  );
}

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalWrapperProps {
    isOpen: boolean;
    close: () => void;
    children: React.ReactNode;
    /** Max width class for the modal container. Defaults to max-w-md. */
    maxWidth?: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, close, children, maxWidth = "max-w-md" }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
                onClick={close}
            />
            
            {/* Modal Content container */}
            <div className={`relative z-10 w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-surface border border-outline-variant rounded-3xl shadow-2xl m-4 animate-in zoom-in-95 fade-in duration-200`}>
                {/* Close Button - positioned absolutely to be always available */}
                <button 
                    onClick={close}
                    aria-label="بستن"
                    className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer z-20"
                >
                    <X className="size-4" strokeWidth={2}/>
                </button>
                {children}
            </div>
        </div>
    );
};

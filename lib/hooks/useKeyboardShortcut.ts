import { useEffect } from "react";
type Key = "s" | string;


const useKeyboardShortcut = (callback: () => void) => {
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if(
                event.metaKey && event.key === "s" ||
                event.ctrlKey && event.key === "s" ||
                event.metaKey && event.key === "S" ||
                event.ctrlKey && event.key === "S"
            ) {
                event.preventDefault()
                event.stopPropagation()
                callback();
            }
        }
        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        }
    }, [callback]);
};

export default useKeyboardShortcut;


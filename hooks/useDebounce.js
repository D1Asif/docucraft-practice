import { useEffect, useRef } from "react"

export const useDebounce = (callback, delay) => {
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, []);

    const debouncedFunction = (...args) => {
        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }

    return debouncedFunction;
}
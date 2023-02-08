import { useEffect, useState } from "react";

export default function useClickCount() {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        window.addEventListener("click", () => {
            setClickCount(prev => prev = prev + 1);
        });
        return () => window.removeEventListener("click", () => {});
    }, []);

    return clickCount;
}
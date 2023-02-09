import { useEffect, useState } from "react";

export default function useClickCount() {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        window.addEventListener("click", () => {
            setClickCount(prev => prev = prev + 1);
        });

        let int;

        window.addEventListener("mousedown", () => {
            int = setInterval(() => {
                setClickCount(prev => prev = prev + 1);
            }, 40);
        })

        window.addEventListener("mouseup", () => {
            clearInterval(int);
        })

        return () => {
            window.removeEventListener("click", () => {});
            window.removeEventListener("mousedown", () => {});
            window.removeEventListener("mouseup", () => {});
        };
    }, []);

    return clickCount;
}
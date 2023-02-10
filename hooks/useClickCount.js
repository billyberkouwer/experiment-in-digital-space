import { useEffect, useState } from "react";

export default function useClickCount() {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        let interval;

        window.addEventListener("click", () => {
            setClickCount(prev => prev = prev + 1);
        });

        window.addEventListener("mousedown", () => {
            interval = setInterval(() => {
                setClickCount(prev => prev = prev + 1);
            }, 10);
        });

        window.addEventListener("mouseup", () => {
            clearInterval(interval)
        });

        return () => {
            window.removeEventListener("click", () => {
                setClickCount(prev => prev = prev + 1);
            });

            window.removeEventListener("mousedown", () => {
                interval = setInterval(() => {
                    setClickCount(prev => prev = prev + 1);
                }, 10);
            });

            window.removeEventListener("mouseup", () => {
                clearInterval(interval)
            });
            
            clearInterval(interval);
        };
    }, []);

    return clickCount;
}
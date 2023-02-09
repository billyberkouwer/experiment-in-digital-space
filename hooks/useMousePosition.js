import { useEffect, useState } from "react"

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    useEffect(() => {
        window.addEventListener("mousemove", (event) => {
            if (mousePosition.x !== event.clientX && mousePosition.y !== event.clientY) {
                setMousePosition({x: event.x, y: event.y});
                return;
            };
            if (mousePosition.x !== event.clientX) {
                setMousePosition(prev => ({x: event.x, y: prev.y}));
            };
            if (mousePosition.y !== event.clientY) {
                setMousePosition(prev => ({x: prev.x, y: event.y}));
            };
        });
        return () => window.removeEventListener("mousemove", () => {});
    }, []);

    return mousePosition;
}
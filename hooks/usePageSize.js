import { useEffect, useState } from "react";

export default function usePageSize() {
    const [pageSize, setPageSize] = useState({x: null, y: null});

    useEffect(() => {
        let pageWidth = {x: window.innerWidth, y: window.innerHeight};
        setPageSize(pageWidth);
        window.addEventListener('resize', () => setPageSize({x: window.innerWidth, y: window.innerHeight}));
        window.removeEventListener('resize', () => {});
    }, []);

    return pageSize;
}
import { useEffect, useState } from "react";

export function useIsScrolledY() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return [isScrolled]
}
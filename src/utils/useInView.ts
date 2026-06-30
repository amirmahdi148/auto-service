import {useEffect, useRef, useState} from "react";


export function useInView<T extends HTMLElement>(threshold = 0.3) {
    const [inView, setInView] = useState<boolean>(false)
    const ref = useRef<T>(null)
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true)
                observer.unobserve(el)
            }
        } , {threshold})


    observer.observe(el)

        return () => observer.disconnect()
    } , [threshold])

    return {
        ref,
        inView
    }
}

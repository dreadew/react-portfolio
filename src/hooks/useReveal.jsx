import { useState, useLayoutEffect } from "react"

export const useReveal = (revealRefs, dep) => {
    let [isIntersected, setIsIntersected] = useState(false);
    function showItems(item) {
        for (let i = 0; i < item.length; i++) {
            // setIsIntersected(item[i].isIntersecting) for looping observer process
            if (item[i].isIntersecting)
                setIsIntersected(true);
        }
    }
    useLayoutEffect(() => {
        const options = {
            rootMargin: '0%',
            thershold: 0.0
        }
        const observer = new IntersectionObserver(showItems, options)
        if (revealRefs.current.length > 0)
            for (let i = 0; i < revealRefs.current.length; i++)
                observer.observe(revealRefs.current[i]);
    }, [revealRefs, dep])
    return { isIntersected }
}
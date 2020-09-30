import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

export const ScrollContext = createContext(0);


export const WithScrollContext = ({
    children,
    throttle=100,
}: {children: React.ReactNode; throttle?: number}) => {
    const [currentScroll, setCurrentScroll] = useState(0);
    const prevPositionRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = pageYOffset;

            if(currentPosition > prevPositionRef.current + throttle) {
                setCurrentScroll(currentPosition);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [throttle]);

    return (
        <ScrollContext.Provider value={currentScroll}>
            {children}
        </ScrollContext.Provider>
    );
};


export const useScrollContext = () => useContext(ScrollContext);

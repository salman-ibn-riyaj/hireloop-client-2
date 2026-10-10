'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

export default function DashboardAnimations({ children }) {
    const containerRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // GSAP entrance animation
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
        }

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div ref={containerRef} className="opacity-0 w-full">
            {children}
        </div>
    );
}
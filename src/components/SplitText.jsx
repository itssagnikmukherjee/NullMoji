import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const SplitText = ({
    text,
    className = "",
    delay = 50,
    duration = 1.25,
    ease = "power3.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "left",
    onLetterAnimationComplete,
    showCallback = false,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedIndices, setAnimatedIndices] = useState(new Set());
    const containerRef = useRef(null);

    // Split text based on type
    const splitTextArray = splitType === "words"
        ? text.split(' ').map(word => word + ' ')
        : text.split('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (showCallback) {
                            console.log('Text became visible');
                        }
                    }
                });
            },
            { threshold, rootMargin }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin, showCallback]);

    useEffect(() => {
        if (isVisible) {
            splitTextArray.forEach((_, index) => {
                setTimeout(() => {
                    setAnimatedIndices(prev => new Set([...prev, index]));

                    // Call callback when last letter animates
                    if (index === splitTextArray.length - 1 && onLetterAnimationComplete) {
                        setTimeout(() => {
                            onLetterAnimationComplete();
                        }, duration * 1000);
                    }
                }, index * delay);
            });
        }
    }, [isVisible, delay, duration, onLetterAnimationComplete]);

    // Convert ease string to cubic-bezier
    const getEaseCurve = (easeType) => {
        const eases = {
            'power3.out': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            'power2.out': 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            'power1.out': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            'ease-out': 'ease-out',
            'ease-in': 'ease-in',
            'ease-in-out': 'ease-in-out',
        };
        return eases[easeType] || 'ease-out';
    };

    return (
        <span
            ref={containerRef}
            className={cn("inline-block", className)}
            style={{ textAlign }}
        >
            {splitTextArray.map((char, index) => {
                const isAnimated = animatedIndices.has(index);

                return (
                    <span
                        key={index}
                        className="inline-block"
                        style={{
                            opacity: isAnimated ? to.opacity : from.opacity,
                            transform: isAnimated
                                ? `translateY(${to.y}px)`
                                : `translateY(${from.y}px)`,
                            transition: isAnimated
                                ? `all ${duration}s ${getEaseCurve(ease)}`
                                : 'none',
                            display: char === ' ' ? 'inline' : 'inline-block',
                            whiteSpace: char === ' ' ? 'pre' : 'normal',
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                );
            })}
        </span>
    );
};

export default SplitText;

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const DecryptedText = ({
    text,
    speed = 50,
    maxIterations = 8,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
    animateOn = "hover",
    revealDirection = "start",
    sequential = false,
    useOriginalCharsOnly = false,
    className = "",
    parentClassName = "",
    encryptedClassName = "",
}) => {
    const [displayText, setDisplayText] = useState(text.split('').map(() => ''));
    const [isAnimating, setIsAnimating] = useState(animateOn === "view");
    const [hasAnimated, setHasAnimated] = useState(false);
    const intervalRef = useRef(null);
    const elementRef = useRef(null);

    // Generate random character
    const getRandomChar = (originalChar) => {
        if (useOriginalCharsOnly && originalChar !== ' ') {
            return originalChar;
        }
        if (originalChar === ' ') return ' ';
        return characters[Math.floor(Math.random() * characters.length)];
    };

    // Decrypt animation logic
    const decrypt = () => {
        const textArray = text.split('');
        const iterations = new Array(textArray.length).fill(0);
        const revealed = new Array(textArray.length).fill(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        let currentIndex = revealDirection === "end" ? textArray.length - 1 : 0;
        const step = revealDirection === "end" ? -1 : 1;

        intervalRef.current = setInterval(() => {
            const newDisplayText = textArray.map((char, index) => {
                // If already revealed, show the actual character
                if (revealed[index]) {
                    return char;
                }

                // If this is the current character being processed
                if (sequential) {
                    if (index === currentIndex) {
                        iterations[index]++;
                        if (iterations[index] >= maxIterations) {
                            revealed[index] = true;
                            return char;
                        }
                        return getRandomChar(char);
                    }
                    // If not yet reached or already passed
                    if (revealDirection === "end" ? index > currentIndex : index < currentIndex) {
                        return char;
                    }
                    return getRandomChar(char);
                } else {
                    // Non-sequential: all characters animate together
                    iterations[index]++;
                    if (iterations[index] >= maxIterations) {
                        revealed[index] = true;
                        return char;
                    }
                    return getRandomChar(char);
                }
            });

            setDisplayText(newDisplayText);

            // Check if current character is done (for sequential)
            if (sequential && revealed[currentIndex]) {
                currentIndex += step;
                if (
                    (revealDirection === "end" && currentIndex < 0) ||
                    (revealDirection === "start" && currentIndex >= textArray.length)
                ) {
                    clearInterval(intervalRef.current);
                    setIsAnimating(false);
                    setHasAnimated(true);
                }
            }

            // Check if all are done (for non-sequential)
            if (!sequential && revealed.every(r => r)) {
                clearInterval(intervalRef.current);
                setIsAnimating(false);
                setHasAnimated(true);
            }
        }, speed);
    };

    // Reset to encrypted state
    const encrypt = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setDisplayText(text.split('').map((char) => char === ' ' ? ' ' : getRandomChar(char)));
        setIsAnimating(false);
    };

    // Handle intersection observer for "view" mode
    useEffect(() => {
        if (animateOn === "view" && !hasAnimated && elementRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsAnimating(true);
                            decrypt();
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.1 }
            );

            observer.observe(elementRef.current);

            return () => observer.disconnect();
        }
    }, [animateOn, hasAnimated]);

    // Start decrypt animation when isAnimating becomes true
    useEffect(() => {
        if (isAnimating && animateOn === "hover") {
            decrypt();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isAnimating]);

    // Initialize encrypted text
    useEffect(() => {
        if (animateOn === "hover") {
            encrypt();
        } else {
            // For "view" mode, start with random characters too
            setDisplayText(text.split('').map((char) => char === ' ' ? ' ' : getRandomChar(char)));
        }
    }, [text]);

    const handleMouseEnter = () => {
        if (animateOn === "hover") {
            setIsAnimating(true);
        }
    };

    const handleMouseLeave = () => {
        if (animateOn === "hover") {
            encrypt();
        }
    };

    return (
        <span
            ref={elementRef}
            className={cn("inline", parentClassName)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {displayText.map((char, index) => {
                const isRevealed = char === text[index];
                return (
                    <span
                        key={index}
                        className={cn(
                            "inline transition-colors duration-200",
                            isRevealed ? className : encryptedClassName,
                            char === ' ' && 'w-[0.25em]'
                        )}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                );
            })}
        </span>
    );
};

export default DecryptedText;

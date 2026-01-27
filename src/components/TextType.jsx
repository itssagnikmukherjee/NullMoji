import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const TextType = ({
    texts = ["Welcome to React Bits! Good to see you!", "Build some amazing experiences!"],
    typingSpeed = 75,
    deletingSpeed = 50,
    pauseDuration = 1500,
    showCursor = true,
    cursorCharacter = "_",
    cursorBlinkDuration = 0.5,
    variableSpeedEnabled = false,
    variableSpeedMin = 60,
    variableSpeedMax = 120,
    typeOnce = false,  // New prop: if true, types once and stops
    className = "",
}) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isComplete, setIsComplete] = useState(false);  // Track if typing is complete
    const timeoutRef = useRef(null);

    useEffect(() => {
        // If typeOnce is true and we're complete, don't do anything
        if (typeOnce && isComplete) {
            return;
        }

        const handleTyping = () => {
            const fullText = texts[currentTextIndex];

            if (isPaused) {
                timeoutRef.current = setTimeout(() => {
                    setIsPaused(false);
                    // If typeOnce is true, don't start deleting
                    if (!typeOnce) {
                        setIsDeleting(true);
                    } else {
                        setIsComplete(true);  // Mark as complete and stop
                    }
                }, pauseDuration);
                return;
            }

            if (!isDeleting) {
                // Typing
                if (currentText.length < fullText.length) {
                    const nextChar = fullText[currentText.length];
                    setCurrentText(fullText.substring(0, currentText.length + 1));

                    const speed = variableSpeedEnabled
                        ? Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin
                        : typingSpeed;

                    timeoutRef.current = setTimeout(handleTyping, speed);
                } else {
                    // Finished typing
                    if (typeOnce) {
                        // If typeOnce, just mark as complete and stop
                        setIsComplete(true);
                    } else {
                        // Otherwise, pause before deleting
                        setIsPaused(true);
                        timeoutRef.current = setTimeout(handleTyping, pauseDuration);
                    }
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(currentText.substring(0, currentText.length - 1));

                    const speed = variableSpeedEnabled
                        ? Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin
                        : deletingSpeed;

                    timeoutRef.current = setTimeout(handleTyping, speed);
                } else {
                    // Finished deleting, move to next text
                    setIsDeleting(false);
                    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                    timeoutRef.current = setTimeout(handleTyping, 500);
                }
            }
        };

        timeoutRef.current = setTimeout(handleTyping, typingSpeed);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [
        currentText,
        currentTextIndex,
        isDeleting,
        isPaused,
        isComplete,
        typeOnce,
        texts,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        variableSpeedEnabled,
        variableSpeedMin,
        variableSpeedMax,
    ]);

    return (
        <span className={cn("inline-block", className)}>
            {currentText}
            {showCursor && (
                <span
                    className="inline-block"
                    style={{
                        animation: `blink ${cursorBlinkDuration}s step-end infinite`,
                    }}
                >
                    {cursorCharacter}
                </span>
            )}
            <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </span>
    );
};

export default TextType;

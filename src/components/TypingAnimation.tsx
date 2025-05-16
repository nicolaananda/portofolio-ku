
import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  strings: string[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  delayBetweenStrings?: number;
  className?: string;
}

const TypingAnimation = ({
  strings,
  typingSpeed = 100,
  backspaceSpeed = 50,
  delayBetweenStrings = 1000,
  className = '',
}: TypingAnimationProps) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingPaused, setIsTypingPaused] = useState(false);

  useEffect(() => {
    if (!strings.length) return;

    const currentString = strings[stringIndex];
    
    const timeout = setTimeout(() => {
      // Handle pausing at full word
      if (!isDeleting && charIndex === currentString.length) {
        if (!isTypingPaused) {
          setIsTypingPaused(true);
          return;
        }
        
        setIsDeleting(true);
        setIsTypingPaused(false);
        return;
      }
      
      // Handle completed deletion and moving to next word
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        const nextIndex = (stringIndex + 1) % strings.length;
        setStringIndex(nextIndex);
        return;
      }
      
      // Handle typing or deleting
      const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setCharIndex(nextCharIndex);
      setText(currentString.substring(0, nextCharIndex));
    }, isTypingPaused ? delayBetweenStrings : isDeleting ? backspaceSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [
    strings,
    stringIndex,
    charIndex,
    isDeleting,
    isTypingPaused,
    typingSpeed,
    backspaceSpeed,
    delayBetweenStrings,
  ]);

  return (
    <span className={`typing-container ${className}`}>
      {text}
    </span>
  );
};

export default TypingAnimation;

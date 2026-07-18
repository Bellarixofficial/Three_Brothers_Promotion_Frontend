import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0.200,
  distance = '50px',
  duration = '1.2s',
  tag: Tag = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08, // Trigger when 8% is visible, works nicely for large sections
        rootMargin: '0px 0px -70px 0px', // Trigger slightly before it fully reaches the viewport bottom
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const revealStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : `translateY(${distance})`,
    transition: `opacity ${duration} cubic-bezier(0.16, 1, 0.3, 1), transform ${duration} cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}ms`,
    willChange: 'transform, opacity',
  };

  const combinedStyle = props.style ? { ...props.style, ...revealStyle } : revealStyle;

  return (
    <Tag ref={ref} className={className} style={combinedStyle} {...props}>
      {children}
    </Tag>
  );
}

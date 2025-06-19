import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 


export default function SyntaxHighlightedCode({ className = '', children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      hljs.highlightElement(ref.current);
    }
  }, [children]);

  return (
    <code ref={ref} className={className} {...props}>
      {children}
    </code>
  );
}

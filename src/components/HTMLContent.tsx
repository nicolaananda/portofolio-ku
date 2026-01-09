import DOMPurify from 'dompurify';

interface HTMLContentProps {
    html: string;
    className?: string;
}

export const HTMLContent = ({ html, className = '' }: HTMLContentProps) => {
    const sanitizedHTML = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre',
            'ul', 'ol', 'li',
            'blockquote',
            'a', 'img',
            'hr',
            'div', 'span',
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'target', 'rel'],
    });

    return (
        <div
            className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
    );
};

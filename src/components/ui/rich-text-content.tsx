import { cn } from "@/lib/utils";

interface RichTextContentProps {
  html: string;
  className?: string;
}

/**
 * Renders HTML content from the WYSIWYG editor on the public frontend.
 * Uses Tailwind's prose classes for consistent typography styling.
 *
 * If the content is plain text (no HTML tags), it wraps it in a <p> tag
 * for backward compatibility with existing data.
 */
export function RichTextContent({ html, className }: RichTextContentProps) {
  if (!html) return null;

  // Check if content contains HTML tags
  const isHTML = /<[a-z][\s\S]*>/i.test(html);
  const content = isHTML ? html : `<p>${html}</p>`;

  return (
    <div
      className={cn(
        "prose prose-invert prose-sm max-w-none",
        "prose-headings:text-brand-cream prose-headings:font-display prose-headings:mt-4 prose-headings:mb-2",
        "prose-p:text-brand-cream/70 prose-p:leading-relaxed prose-p:my-2",
        "prose-strong:text-brand-cream",
        "prose-em:text-brand-cream/80",
        "prose-ul:text-brand-cream/70 prose-ol:text-brand-cream/70",
        "prose-li:my-0.5",
        "prose-blockquote:border-brand-orange/40 prose-blockquote:text-brand-cream/70 prose-blockquote:not-italic",
        "prose-a:text-brand-orange prose-a:no-underline hover:prose-a:text-brand-gold prose-a:transition-colors",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

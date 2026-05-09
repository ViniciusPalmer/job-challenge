import { useEffect } from "react";

interface SeoMetadataProps {
  title: string;
  description?: string;
}

export function SeoMetadata({ title, description }: SeoMetadataProps) {
  useEffect(() => {
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');

    if (metaDesc && description) {
      metaDesc.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}

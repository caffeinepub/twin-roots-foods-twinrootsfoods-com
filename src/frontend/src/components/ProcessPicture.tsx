import type { Product } from '../backend';
import { getProcessPicturePath } from '../lib/processPictures';
import { Package } from 'lucide-react';

interface ProcessPictureProps {
  product: Product;
  variant?: 'thumbnail' | 'large';
  className?: string;
}

/**
 * Renders a product's process picture with safe fallback to placeholder.
 * Supports thumbnail (card) and large (detail page) variants.
 */
export default function ProcessPicture({ product, variant = 'thumbnail', className = '' }: ProcessPictureProps) {
  const imagePath = getProcessPicturePath(product);

  if (!imagePath) {
    // Neutral placeholder when no process picture is available
    return (
      <div
        className={`flex items-center justify-center bg-muted/30 ${
          variant === 'large' ? 'min-h-[400px] rounded-lg' : 'aspect-video rounded-t-lg'
        } ${className}`}
      >
        <div className="text-center">
          <Package className={`mx-auto text-muted-foreground ${variant === 'large' ? 'h-16 w-16' : 'h-12 w-12'}`} />
          <p className="mt-2 text-sm text-muted-foreground">No image available</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imagePath}
      alt={`${product.name} production process`}
      className={`object-cover ${
        variant === 'large' ? 'w-full rounded-lg' : 'aspect-video w-full rounded-t-lg'
      } ${className}`}
      loading="lazy"
    />
  );
}

import type { Product } from '../backend';

/**
 * Maps backend process picture references to static asset paths.
 * Handles optional/absent values safely.
 */
export function getProcessPicturePath(product: Product): string | null {
  if (!product.processPicture) {
    return null;
  }

  // Backend stores paths like "/images/product_processes/turmeric_powder.png"
  // Map to our static generated assets
  const filename = product.processPicture.split('/').pop();
  if (!filename) {
    return null;
  }

  // Map backend filenames to our generated asset filenames
  const filenameMap: Record<string, string> = {
    'turmeric_powder.png': 'process-turmeric-powder.dim_1600x1000.png',
    'dhaniya_powder.png': 'process-dhaniya-powder.dim_1600x1000.png',
    'chili_powder.png': 'process-chili-powder.dim_1600x1000.png',
    'onion_powder.png': 'process-onion-powder.dim_1600x1000.png',
    'ginger_powder.png': 'process-ginger-powder.dim_1600x1000.png',
    'garlic_powder.png': 'process-garlic-powder.dim_1600x1000.png',
    'tomato_powder.png': 'process-tomato-powder.dim_1600x1000.png',
    'moringa_powder.png': 'process-moringa-powder.dim_1600x1000.png',
    'dry_fruits.png': 'process-dry-fruits.dim_1600x1000.png',
  };

  const mappedFilename = filenameMap[filename];
  if (!mappedFilename) {
    return null;
  }

  return `/assets/generated/${mappedFilename}`;
}

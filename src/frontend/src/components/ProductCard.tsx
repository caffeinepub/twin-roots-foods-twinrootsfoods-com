import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProcessPicture from './ProcessPicture';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
  productId: number;
}

export default function ProductCard({ product, productId }: ProductCardProps) {
  const formattedPrice = product.price ? `₹${Number(product.price)}` : 'Contact for price';

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-warm">
      <ProcessPicture product={product} variant="thumbnail" />
      <CardHeader>
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <CardTitle className="font-display text-xl">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-lg font-semibold text-primary">{formattedPrice}</p>
      </CardContent>
      <CardFooter>
        <Link to="/product/$productId" params={{ productId: String(productId) }} className="w-full">
          <Button className="w-full" variant="default">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

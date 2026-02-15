import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProcessPicture from './ProcessPicture';
import { useT } from '../i18n/useT';
import { useLanguage } from '../i18n/LanguageProvider';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
  productId: number;
}

export default function ProductCard({ product, productId }: ProductCardProps) {
  const t = useT();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const formattedPrice = product.price ? `₹${Number(product.price)}` : t('product.contactForPrice');

  const handleViewDetails = () => {
    navigate({ to: `/${language}/product/${productId}` as any });
  };

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
        <Button className="w-full" variant="default" onClick={handleViewDetails}>
          {t('product.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
}

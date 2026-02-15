import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useProducts } from '../hooks/useQueries';
import { useCart } from '../context/CartContext';
import ProcessPicture from '../components/ProcessPicture';
import { useT } from '../i18n/useT';
import { useLanguage } from '../i18n/LanguageProvider';

export default function ProductDetailPage() {
  const { productId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const t = useT();
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="text-center text-muted-foreground">{t('productDetail.loading')}</div>
      </div>
    );
  }

  const productIndex = Number(productId) - 1;
  const product = products[productIndex];

  if (!product) {
    return (
      <div className="container-custom py-16">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 font-display text-3xl font-bold">{t('productDetail.notFound')}</h1>
          <Button className="mt-4" onClick={() => navigate({ to: `/${language}/shop` as any })}>
            {t('cart.continueShopping')}
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, Number(productId), quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="container-custom py-12">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate({ to: `/${language}/shop` as any })}>
        <ArrowLeft className="h-4 w-4" /> {t('common.back')}
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ProcessPicture product={product} variant="large" />
        </div>

        <div>
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
          <h1 className="mb-4 font-display text-4xl font-bold">{product.name}</h1>
          <p className="mb-6 text-lg text-muted-foreground">{product.description}</p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('productDetail.availability')}</span>
                <Badge variant={product.available ? 'default' : 'secondary'}>
                  {product.available ? t('productDetail.available') : t('productDetail.unavailable')}
                </Badge>
              </div>

              {product.price && (
                <div className="mb-6">
                  <p className="text-3xl font-bold text-primary">₹{Number(product.price)}</p>
                </div>
              )}

              <div className="mb-6">
                <Label className="mb-2 block text-sm font-medium">{t('productDetail.quantity')}</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.available}
              >
                <ShoppingCart className="h-5 w-5" />
                {t('productDetail.addToCart')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('productDetail.specifications')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('productDetail.category')}</span>
                <span className="font-medium">{product.category}</span>
              </div>
              {product.price && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('productDetail.price')}</span>
                  <span className="font-medium">₹{Number(product.price)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}

import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import ProcessPicture from '../components/ProcessPicture';
import { useProducts } from '../hooks/useQueries';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { productId } = useParams({ strict: false }) as { productId: string };
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const productIndex = parseInt(productId) - 1;
  const product = products[productIndex];

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Button className="mt-4" onClick={() => navigate({ to: '/shop' })}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, parseInt(productId), quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const formattedPrice = product.price ? `₹${Number(product.price)}` : 'Contact for price';

  return (
    <div className="container-custom py-12">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate({ to: '/shop' })}>
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ProcessPicture product={product} variant="large" />
          <div className="mt-4">
            <Badge variant="secondary">{product.category}</Badge>
          </div>
        </div>

        <div>
          <h1 className="mb-4 font-display text-4xl font-bold">{product.name}</h1>
          <p className="mb-6 text-lg text-muted-foreground">{product.description}</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{formattedPrice}</CardTitle>
              <CardDescription>
                {product.available ? 'In Stock' : 'Currently Unavailable'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="mt-1"
                  />
                </div>
                <Button
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.available}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="font-medium">{product.available ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

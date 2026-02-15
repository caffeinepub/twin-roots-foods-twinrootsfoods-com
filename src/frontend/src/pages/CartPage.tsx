import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getCartItemCount, calculateTotal } from '../lib/cart';
import { useT } from '../i18n/useT';
import { useLanguage } from '../i18n/LanguageProvider';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem } = useCart();
  const itemCount = getCartItemCount(cart);
  const total = calculateTotal(cart);
  const t = useT();
  const { language } = useLanguage();

  if (itemCount === 0) {
    return (
      <div className="container-custom py-16">
        <div className="mx-auto max-w-md text-center">
          <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 font-display text-3xl font-bold">{t('cart.empty')}</h1>
          <p className="mb-6 text-muted-foreground">{t('cart.emptyDesc')}</p>
          <Button onClick={() => navigate({ to: `/${language}/shop` as any })}>{t('cart.continueShopping')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="mb-8 font-display text-4xl font-bold">{t('cart.title')}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('cart.product')}</TableHead>
                    <TableHead>{t('cart.price')}</TableHead>
                    <TableHead>{t('cart.quantity')}</TableHead>
                    <TableHead>{t('cart.total')}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.unitPrice !== null ? `₹${item.unitPrice}` : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.unitPrice !== null ? `₹${item.unitPrice * item.quantity}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('cart.orderSummary')}</CardTitle>
              <CardDescription>{itemCount} {t('checkout.items')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('cart.subtotal')}:</span>
                <span>₹{total}</span>
              </div>
              <Button className="w-full" size="lg" onClick={() => navigate({ to: `/${language}/checkout` as any })}>
                {t('cart.proceedToCheckout')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

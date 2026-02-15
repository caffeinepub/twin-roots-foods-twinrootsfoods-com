import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { getCartItemCount, calculateTotal } from '../lib/cart';
import { usePlaceOrder } from '../hooks/useOrders';
import { useT } from '../i18n/useT';
import { useLanguage } from '../i18n/LanguageProvider';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const placeOrderMutation = usePlaceOrder();
  const itemCount = getCartItemCount(cart);
  const total = calculateTotal(cart);
  const t = useT();
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    contactDetails: '',
    shippingAddress: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.contactDetails || !formData.shippingAddress) {
      toast.error(t('checkout.fillRequired'));
      return;
    }

    try {
      const orderId = await placeOrderMutation.mutateAsync({
        customerName: formData.fullName,
        contactDetails: formData.contactDetails,
        shippingAddress: formData.shippingAddress,
        items: cart.map(item => ({
          productId: BigInt(item.productId),
          name: item.name,
          unitPrice: item.unitPrice !== null ? BigInt(item.unitPrice) : undefined,
          quantity: BigInt(item.quantity)
        }))
      });

      clearCart();
      toast.success(t('checkout.success'));
      navigate({ to: `/${language}/order-confirmation` as any, search: { orderId: orderId.toString() } as any });
    } catch (error) {
      toast.error(t('checkout.error'));
      console.error(error);
    }
  };

  if (itemCount === 0) {
    navigate({ to: `/${language}/cart` as any });
    return null;
  }

  return (
    <div className="container-custom py-12">
      <h1 className="mb-8 font-display text-4xl font-bold">{t('checkout.title')}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.customerInfo')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t('checkout.fullName')} *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactDetails">{t('checkout.contactDetails')} *</Label>
                  <Input
                    id="contactDetails"
                    value={formData.contactDetails}
                    onChange={e => setFormData({ ...formData, contactDetails: e.target.value })}
                    placeholder={t('checkout.contactPlaceholder')}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shippingAddress">{t('checkout.shippingAddress')} *</Label>
                  <Textarea
                    id="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={e => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder={t('checkout.addressPlaceholder')}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">{t('checkout.notes')}</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t('checkout.notesPlaceholder')}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={placeOrderMutation.isPending}>
                  {placeOrderMutation.isPending ? t('checkout.placing') : t('checkout.placeOrder')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.orderSummary')}</CardTitle>
              <CardDescription>{itemCount} {t('checkout.items')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{item.unitPrice !== null ? `₹${item.unitPrice * item.quantity}` : '-'}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t('checkout.total')}:</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '../context/CartContext';
import { usePlaceOrder } from '../hooks/useOrders';
import { calculateTotal } from '../lib/cart';
import { toast } from 'sonner';
import type { OrderItem } from '../backend';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const placeOrderMutation = usePlaceOrder();
  const total = calculateTotal(cart);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.address || (!formData.email && !formData.phone)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const contactDetails = [formData.email, formData.phone].filter(Boolean).join(', ');
    const items: OrderItem[] = cart.map(item => ({
      productId: BigInt(item.productId),
      name: item.name,
      unitPrice: item.unitPrice !== null ? BigInt(item.unitPrice) : undefined,
      quantity: BigInt(item.quantity)
    }));

    try {
      const orderId = await placeOrderMutation.mutateAsync({
        customerName: formData.customerName,
        contactDetails,
        shippingAddress: formData.address + (formData.notes ? `\n\nNotes: ${formData.notes}` : ''),
        items
      });

      clearCart();
      toast.success('Order placed successfully!');
      navigate({ to: '/order-confirmation', search: { orderId: orderId.toString() } });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error(error);
    }
  };

  if (cart.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  return (
    <div className="container-custom py-12">
      <h1 className="mb-8 font-display text-4xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Please provide your contact and delivery details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Shipping Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    placeholder="Any special instructions..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={placeOrderMutation.isPending}>
                  {placeOrderMutation.isPending ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{item.unitPrice !== null ? `₹${item.unitPrice * item.quantity}` : '-'}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

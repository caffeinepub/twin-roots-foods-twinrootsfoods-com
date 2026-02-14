import { useSearch, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmationPage() {
  const search = useSearch({ strict: false }) as { orderId?: string };
  const navigate = useNavigate();

  return (
    <div className="container-custom py-16">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="font-display text-3xl">Order Confirmed!</CardTitle>
          <CardDescription>Thank you for your order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              Your order has been successfully placed and is being processed.
            </AlertDescription>
          </Alert>

          {search.orderId && (
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-1 text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-lg font-semibold">{search.orderId}</p>
            </div>
          )}

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>We'll contact you shortly to confirm your order details and arrange delivery.</p>
            <p>Please keep your order ID for reference.</p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={() => navigate({ to: '/shop' })}>
              Continue Shopping
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate({ to: '/' })}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

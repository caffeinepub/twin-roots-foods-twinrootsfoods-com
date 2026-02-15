import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useT } from '../i18n/useT';
import { useLanguage } from '../i18n/LanguageProvider';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { orderId?: string };
  const t = useT();
  const { language } = useLanguage();

  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-display text-3xl">{t('orderConfirm.title')}</CardTitle>
            <CardDescription className="text-lg">{t('orderConfirm.thankYou')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {search.orderId && (
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="mb-1 text-sm text-muted-foreground">{t('orderConfirm.orderNumber')}</p>
                <p className="font-mono text-xl font-semibold">{search.orderId}</p>
              </div>
            )}

            <p className="text-center text-muted-foreground">
              {t('orderConfirm.message')}
            </p>

            <div className="flex gap-4">
              <Button className="flex-1" onClick={() => navigate({ to: `/${language}/shop` as any })}>
                {t('orderConfirm.continueShopping')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

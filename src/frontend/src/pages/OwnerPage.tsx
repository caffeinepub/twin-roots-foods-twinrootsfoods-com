import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import OwnerGate from '../components/OwnerGate';
import { useAllOrders, useAllExportInquiries } from '../hooks/useOwnerData';
import { getOwnerContact, setOwnerContact, isValidEmail, isValidWhatsApp } from '../lib/ownerContact';
import { useT } from '../i18n/useT';

function OrdersTab() {
  const { data: orders = [], isLoading } = useAllOrders();
  const t = useT();

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">{t('owner.orders.loading')}</div>;
  }

  if (orders.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">{t('owner.orders.empty')}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('owner.orders.title')}</CardTitle>
        <CardDescription>{t('owner.orders.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('owner.orders.orderId')}</TableHead>
              <TableHead>{t('owner.orders.customer')}</TableHead>
              <TableHead>{t('owner.orders.items')}</TableHead>
              <TableHead>{t('owner.orders.total')}</TableHead>
              <TableHead>{t('owner.orders.status')}</TableHead>
              <TableHead>{t('owner.orders.date')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.orderId.toString()}>
                <TableCell className="font-mono">{order.orderId.toString()}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.items.length} {t('owner.orders.items')}</TableCell>
                <TableCell>₹{Number(order.totalPrice)}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'pending' ? 'secondary' : 'default'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(Number(order.createdAt) / 1000000).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{t('owner.orderDetail.title')} #{order.orderId.toString()}</DialogTitle>
                        <DialogDescription>{t('owner.orderDetail.subtitle')}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 font-semibold">{t('owner.orderDetail.customerInfo')}</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">{t('owner.orderDetail.name')}:</span> {order.customerName}</p>
                            <p><span className="text-muted-foreground">{t('owner.orderDetail.contact')}:</span> {order.contactDetails}</p>
                            <p><span className="text-muted-foreground">{t('owner.orderDetail.address')}:</span> {order.shippingAddress}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold">{t('owner.orderDetail.orderItems')}</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>{t('owner.orderDetail.product')}</TableHead>
                                <TableHead>{t('owner.orderDetail.quantity')}</TableHead>
                                <TableHead>{t('owner.orderDetail.price')}</TableHead>
                                <TableHead>{t('owner.orderDetail.total')}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>{item.quantity.toString()}</TableCell>
                                  <TableCell>
                                    {item.unitPrice ? `₹${Number(item.unitPrice)}` : '-'}
                                  </TableCell>
                                  <TableCell>
                                    {item.unitPrice ? `₹${Number(item.unitPrice) * Number(item.quantity)}` : '-'}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                          <span>{t('owner.orderDetail.total')}:</span>
                          <span>₹{Number(order.totalPrice)}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function InquiriesTab() {
  const { data: inquiries = [], isLoading } = useAllExportInquiries();
  const t = useT();

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">{t('owner.inquiries.loading')}</div>;
  }

  if (inquiries.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">{t('owner.inquiries.empty')}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('owner.inquiries.title')}</CardTitle>
        <CardDescription>{t('owner.inquiries.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('owner.inquiries.id')}</TableHead>
              <TableHead>{t('owner.inquiries.company')}</TableHead>
              <TableHead>{t('owner.inquiries.contact')}</TableHead>
              <TableHead>{t('owner.inquiries.country')}</TableHead>
              <TableHead>{t('owner.inquiries.date')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map(inquiry => (
              <TableRow key={inquiry.inquiryId.toString()}>
                <TableCell className="font-mono">{inquiry.inquiryId.toString()}</TableCell>
                <TableCell>{inquiry.companyName}</TableCell>
                <TableCell>{inquiry.contactPerson}</TableCell>
                <TableCell>{inquiry.destinationCountry}</TableCell>
                <TableCell>{new Date(Number(inquiry.submittedAt) / 1000000).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{t('owner.inquiryDetail.title')} #{inquiry.inquiryId.toString()}</DialogTitle>
                        <DialogDescription>{t('owner.inquiryDetail.subtitle')}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-muted-foreground">{t('owner.inquiryDetail.company')}</p>
                            <p className="font-medium">{inquiry.companyName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('owner.inquiryDetail.contactPerson')}</p>
                            <p className="font-medium">{inquiry.contactPerson}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('owner.inquiryDetail.email')}</p>
                            <p className="font-medium">{inquiry.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('owner.inquiryDetail.phone')}</p>
                            <p className="font-medium">{inquiry.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('owner.inquiryDetail.destination')}</p>
                            <p className="font-medium">{inquiry.destinationCountry}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('owner.inquiryDetail.quantity')}</p>
                            <p className="font-medium">{inquiry.estimatedQuantity || t('owner.inquiryDetail.notSpecified')}</p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-sm text-muted-foreground">{t('owner.inquiryDetail.products')}</p>
                          <div className="flex flex-wrap gap-2">
                            {inquiry.productsOfInterest.map((product, idx) => (
                              <Badge key={idx} variant="secondary">{product}</Badge>
                            ))}
                          </div>
                        </div>
                        {inquiry.englishTranslation && (
                          <div>
                            <p className="mb-2 text-sm font-semibold text-foreground">{t('owner.inquiryDetail.englishTranslation')}</p>
                            <p className="rounded-lg bg-primary/5 p-3 text-sm border border-primary/20">{inquiry.englishTranslation}</p>
                          </div>
                        )}
                        {inquiry.message && (
                          <div>
                            <p className="mb-2 text-sm text-muted-foreground">{t('owner.inquiryDetail.originalMessage')}</p>
                            <p className="rounded-lg bg-muted/50 p-3 text-sm">{inquiry.message}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ContactDetailsTab() {
  const currentContact = getOwnerContact();
  const [email, setEmail] = useState(currentContact.email);
  const [whatsapp, setWhatsapp] = useState(currentContact.whatsapp);
  const [errors, setErrors] = useState<{ email?: string; whatsapp?: string }>({});
  const t = useT();

  const handleSave = () => {
    const newErrors: { email?: string; whatsapp?: string } = {};

    // Validate email if provided
    if (email && !isValidEmail(email)) {
      newErrors.email = t('owner.contact.invalidEmail');
    }

    // Validate WhatsApp (required, must contain at least one digit)
    if (!whatsapp) {
      newErrors.whatsapp = t('owner.contact.whatsappRequired');
    } else if (!isValidWhatsApp(whatsapp)) {
      newErrors.whatsapp = t('owner.contact.whatsappInvalid');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setOwnerContact(email, whatsapp);
      setErrors({});
      toast.success(t('owner.contact.saveSuccess'));
    } catch (error) {
      toast.error(t('owner.contact.saveError'));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('owner.contact.title')}</CardTitle>
        <CardDescription>
          {t('owner.contact.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t('owner.contact.email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('owner.contact.emailPlaceholder')}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
          <p className="text-sm text-muted-foreground">
            {t('owner.contact.emailHelp')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">{t('owner.contact.whatsapp')}</Label>
          <Input
            id="whatsapp"
            type="text"
            placeholder={t('owner.contact.whatsappPlaceholder')}
            value={whatsapp}
            onChange={(e) => {
              setWhatsapp(e.target.value);
              if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
            }}
          />
          {errors.whatsapp && (
            <p className="text-sm text-destructive">{errors.whatsapp}</p>
          )}
          <p className="text-sm text-muted-foreground">
            {t('owner.contact.whatsappHelp')}
          </p>
        </div>

        <Button onClick={handleSave}>
          {t('owner.contact.save')}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function OwnerPage() {
  const t = useT();
  
  return (
    <OwnerGate>
      <div className="container-custom py-12">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-bold">{t('owner.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('owner.subtitle')}</p>
        </div>

        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">{t('owner.tabOrders')}</TabsTrigger>
            <TabsTrigger value="inquiries">{t('owner.tabInquiries')}</TabsTrigger>
            <TabsTrigger value="contact">{t('owner.tabContact')}</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="mt-6">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="inquiries" className="mt-6">
            <InquiriesTab />
          </TabsContent>
          <TabsContent value="contact" className="mt-6">
            <ContactDetailsTab />
          </TabsContent>
        </Tabs>
      </div>
    </OwnerGate>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import OwnerGate from '../components/OwnerGate';
import { useAllOrders, useAllExportInquiries } from '../hooks/useOwnerData';

function OrdersTab() {
  const { data: orders = [], isLoading } = useAllOrders();

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No orders yet</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
        <CardDescription>View and manage customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.orderId.toString()}>
                <TableCell className="font-mono">{order.orderId.toString()}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.items.length} items</TableCell>
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
                        <DialogTitle>Order #{order.orderId.toString()}</DialogTitle>
                        <DialogDescription>Order details and items</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 font-semibold">Customer Information</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">Name:</span> {order.customerName}</p>
                            <p><span className="text-muted-foreground">Contact:</span> {order.contactDetails}</p>
                            <p><span className="text-muted-foreground">Address:</span> {order.shippingAddress}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold">Order Items</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Total</TableHead>
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
                          <span>Total:</span>
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

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">Loading inquiries...</div>;
  }

  if (inquiries.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No inquiries yet</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Inquiries</CardTitle>
        <CardDescription>View export inquiry submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Date</TableHead>
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
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Inquiry #{inquiry.inquiryId.toString()}</DialogTitle>
                        <DialogDescription>Export inquiry details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Company</p>
                            <p className="font-medium">{inquiry.companyName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Contact Person</p>
                            <p className="font-medium">{inquiry.contactPerson}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{inquiry.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{inquiry.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Destination</p>
                            <p className="font-medium">{inquiry.destinationCountry}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Estimated Quantity</p>
                            <p className="font-medium">{inquiry.estimatedQuantity || 'Not specified'}</p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-sm text-muted-foreground">Products of Interest</p>
                          <div className="flex flex-wrap gap-2">
                            {inquiry.productsOfInterest.map((product, idx) => (
                              <Badge key={idx} variant="secondary">{product}</Badge>
                            ))}
                          </div>
                        </div>
                        {inquiry.message && (
                          <div>
                            <p className="mb-2 text-sm text-muted-foreground">Message</p>
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

export default function OwnerPage() {
  return (
    <OwnerGate>
      <div className="container-custom py-12">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-bold">Owner Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage orders and export inquiries</p>
        </div>

        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inquiries">Export Inquiries</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="mt-6">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="inquiries" className="mt-6">
            <InquiriesTab />
          </TabsContent>
        </Tabs>
      </div>
    </OwnerGate>
  );
}

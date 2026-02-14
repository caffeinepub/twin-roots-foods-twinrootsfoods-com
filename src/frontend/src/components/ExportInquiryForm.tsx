import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { useSubmitExportInquiry } from '../hooks/useExportInquiry';
import { toast } from 'sonner';

interface ExportInquiryFormProps {
  onSuccess?: () => void;
  showSuccessInline?: boolean;
}

export default function ExportInquiryForm({ onSuccess, showSuccessInline = false }: ExportInquiryFormProps) {
  const submitInquiryMutation = useSubmitExportInquiry();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    destinationCountry: '',
    productsOfInterest: '',
    estimatedQuantity: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone || !formData.destinationCountry) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await submitInquiryMutation.mutateAsync({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        destinationCountry: formData.destinationCountry,
        productsOfInterest: formData.productsOfInterest.split(',').map(p => p.trim()).filter(Boolean),
        estimatedQuantity: formData.estimatedQuantity,
        message: formData.message
      });

      setSubmitted(true);
      toast.success('Inquiry submitted successfully!');
      
      if (onSuccess) {
        onSuccess();
      }

      // Reset form after 3 seconds if inline success
      if (showSuccessInline) {
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            companyName: '',
            contactPerson: '',
            email: '',
            phone: '',
            destinationCountry: '',
            productsOfInterest: '',
            estimatedQuantity: '',
            message: ''
          });
        }, 3000);
      }
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
      console.error(error);
    }
  };

  if (submitted && showSuccessInline) {
    return (
      <Alert className="border-primary/50 bg-primary/5">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertDescription>
          Thank you for your inquiry! Our team will contact you within 24-48 hours.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactPerson">Contact Person *</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
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
        <Label htmlFor="destinationCountry">Destination Country *</Label>
        <Input
          id="destinationCountry"
          value={formData.destinationCountry}
          onChange={e => setFormData({ ...formData, destinationCountry: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="productsOfInterest">Products of Interest</Label>
        <Input
          id="productsOfInterest"
          value={formData.productsOfInterest}
          onChange={e => setFormData({ ...formData, productsOfInterest: e.target.value })}
          placeholder="e.g., Turmeric Powder, Chili Powder"
        />
        <p className="mt-1 text-xs text-muted-foreground">Separate multiple products with commas</p>
      </div>

      <div>
        <Label htmlFor="estimatedQuantity">Estimated Quantity</Label>
        <Input
          id="estimatedQuantity"
          value={formData.estimatedQuantity}
          onChange={e => setFormData({ ...formData, estimatedQuantity: e.target.value })}
          placeholder="e.g., 1000 kg, 50 tons"
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          placeholder="Tell us more about your requirements..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitInquiryMutation.isPending}>
        {submitInquiryMutation.isPending ? 'Submitting...' : 'Submit Inquiry'}
      </Button>
    </form>
  );
}

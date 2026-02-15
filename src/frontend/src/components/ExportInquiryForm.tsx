import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { useSubmitExportInquiry } from '../hooks/useExportInquiry';
import { useLanguage } from '../i18n/LanguageProvider';
import { translateText } from '../lib/translation/translator';
import { useT } from '../i18n/useT';
import { toast } from 'sonner';

interface ExportInquiryFormProps {
  onSuccess?: () => void;
  showSuccessInline?: boolean;
}

export default function ExportInquiryForm({ onSuccess, showSuccessInline = false }: ExportInquiryFormProps) {
  const submitInquiryMutation = useSubmitExportInquiry();
  const { language } = useLanguage();
  const t = useT();
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
      toast.error(t('inquiryForm.fillRequired'));
      return;
    }

    try {
      // Translate message to English if not already in English
      let englishTranslation: string | null = null;
      if (language !== 'en' && formData.message.trim()) {
        englishTranslation = await translateText(formData.message, 'en', language);
      }

      await submitInquiryMutation.mutateAsync({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        destinationCountry: formData.destinationCountry,
        productsOfInterest: formData.productsOfInterest.split(',').map(p => p.trim()).filter(Boolean),
        estimatedQuantity: formData.estimatedQuantity,
        message: formData.message,
        englishTranslation
      });

      setSubmitted(true);
      toast.success(t('inquiryForm.submitSuccess'));
      
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
      toast.error(t('inquiryForm.submitError'));
      console.error(error);
    }
  };

  if (submitted && showSuccessInline) {
    return (
      <Alert className="border-primary/50 bg-primary/5">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertDescription>
          {t('inquiryForm.successInline')}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="companyName">{t('inquiryForm.companyName')} *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactPerson">{t('inquiryForm.contactPerson')} *</Label>
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
          <Label htmlFor="email">{t('inquiryForm.email')} *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">{t('inquiryForm.phone')} *</Label>
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
        <Label htmlFor="destinationCountry">{t('inquiryForm.destinationCountry')} *</Label>
        <Input
          id="destinationCountry"
          value={formData.destinationCountry}
          onChange={e => setFormData({ ...formData, destinationCountry: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="productsOfInterest">{t('inquiryForm.productsOfInterest')}</Label>
        <Input
          id="productsOfInterest"
          value={formData.productsOfInterest}
          onChange={e => setFormData({ ...formData, productsOfInterest: e.target.value })}
          placeholder={t('inquiryForm.productsPlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor="estimatedQuantity">{t('inquiryForm.estimatedQuantity')}</Label>
        <Input
          id="estimatedQuantity"
          value={formData.estimatedQuantity}
          onChange={e => setFormData({ ...formData, estimatedQuantity: e.target.value })}
          placeholder={t('inquiryForm.quantityPlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor="message">{t('inquiryForm.message')}</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          placeholder={t('inquiryForm.messagePlaceholder')}
          rows={4}
        />
      </div>

      <Button type="submit" disabled={submitInquiryMutation.isPending} className="w-full">
        {submitInquiryMutation.isPending ? t('inquiryForm.submitting') : t('inquiryForm.submit')}
      </Button>
    </form>
  );
}

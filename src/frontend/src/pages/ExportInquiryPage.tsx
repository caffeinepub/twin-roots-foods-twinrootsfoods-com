import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import ExportInquiryForm from '../components/ExportInquiryForm';

export default function ExportInquiryPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="container-custom py-16">
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </div>
            <CardTitle className="font-display text-3xl">Inquiry Submitted!</CardTitle>
            <CardDescription>We'll get back to you soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Thank you for your interest in our export services. Our team will review your inquiry and contact you within 24-48 hours.
              </AlertDescription>
            </Alert>
            <Button className="mt-6 w-full" onClick={() => setSubmitted(false)}>
              Submit Another Inquiry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold">Export Inquiry</h1>
          <p className="text-lg text-muted-foreground">
            Interested in bulk orders or export? Fill out the form below and we'll get back to you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inquiry Details</CardTitle>
            <CardDescription>Please provide your company and order information</CardDescription>
          </CardHeader>
          <CardContent>
            <ExportInquiryForm onSuccess={() => setSubmitted(true)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

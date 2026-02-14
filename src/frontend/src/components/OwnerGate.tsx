import { useState, useEffect, type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';
import { isOwnerModeEnabled, enableOwnerMode, disableOwnerMode } from '../lib/ownerMode';

interface OwnerGateProps {
  children: ReactNode;
}

export default function OwnerGate({ children }: OwnerGateProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(isOwnerModeEnabled());
  }, []);

  if (isEnabled) {
    return (
      <div>
        <div className="mb-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              disableOwnerMode();
              setIsEnabled(false);
            }}
          >
            Exit Owner Mode
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="container-custom py-16">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center">Owner Access</CardTitle>
          <CardDescription className="text-center">
            This area is restricted to site owners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertDescription>
              Click below to enable owner mode and access management features.
            </AlertDescription>
          </Alert>
          <Button
            className="w-full"
            onClick={() => {
              enableOwnerMode();
              setIsEnabled(true);
            }}
          >
            Enable Owner Mode
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

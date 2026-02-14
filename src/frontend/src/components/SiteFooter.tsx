import { SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Heart, MessageCircle } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'twinrootsfoods';
  const whatsappNumber = '+919876543210'; // Placeholder number

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Twin Roots Foods</h3>
            <p className="text-sm text-muted-foreground">
              Premium natural products from Indian farms to global tables. Founded by two brothers committed to sustainable, ethical sourcing and export-quality standards.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop" className="text-muted-foreground hover:text-primary">Shop</a></li>
              <li><a href="/export-inquiry" className="text-muted-foreground hover:text-primary">Export Inquiry</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Connect</h3>
            <div className="mb-4 flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <SiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp: {whatsappNumber}
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Twin Roots Foods. Built with <Heart className="h-4 w-4 fill-primary text-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-primary"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

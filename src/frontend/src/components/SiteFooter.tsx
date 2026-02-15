import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram, SiLinkedin, SiWhatsapp } from 'react-icons/si';
import { Heart } from 'lucide-react';
import { useOwnerContact } from '../hooks/useOwnerContact';
import { useT } from '../i18n/useT';
import { useLanguage } from '../i18n/LanguageProvider';
import BrandLogo from './BrandLogo';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'twinrootsfoods';
  const { whatsapp, whatsappLink } = useOwnerContact();
  const { language } = useLanguage();
  const t = useT();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <BrandLogo size="sm" />
              <div>
                <h3 className="font-display text-lg font-semibold">Twin Roots Foods</h3>
                <p className="text-sm font-light italic text-muted-foreground">{t('header.tagline')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.companyDescription')}
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to={`/${language}/shop` as any} className="text-muted-foreground hover:text-primary">{t('nav.shop')}</Link></li>
              <li><Link to={`/${language}/export-inquiry` as any} className="text-muted-foreground hover:text-primary">{t('nav.exportInquiry')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">{t('footer.connect')}</h3>
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
              href={`https://wa.me/${whatsappLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <SiWhatsapp className="h-4 w-4" />
              {t('footer.whatsapp')}: {whatsapp}
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Twin Roots Foods. {t('footer.builtWith')} <Heart className="h-4 w-4 fill-primary text-primary" /> {t('footer.using')}{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

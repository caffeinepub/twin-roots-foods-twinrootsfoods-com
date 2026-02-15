/**
 * Language selector dropdown component
 */

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '../i18n/LanguageProvider';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../lib/language';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { switchLanguageInPath } from '../lib/i18nRouting';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    
    // Update URL to new language prefix
    const newPath = switchLanguageInPath(location.pathname, newLang);
    navigate({ to: newPath as any });
  };

  const currentLang = SUPPORTED_LANGUAGES[language];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title="Select Language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? 'bg-accent' : ''}
          >
            <span className="flex items-center gap-2">
              {lang.nativeName}
              {language === lang.code && <span className="text-xs text-muted-foreground">✓</span>}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, Shield, Award, Users, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import ExportInquiryForm from '../components/ExportInquiryForm';
import { useOwnerContact } from '../hooks/useOwnerContact';
import { useT } from '../i18n/useT';
import { useLanguage } from '../i18n/LanguageProvider';

export default function HomePage() {
  const { email, whatsapp, whatsappLink } = useOwnerContact();
  const t = useT();
  const { language } = useLanguage();

  const products = [
    {
      title: t('home.products.indianSpices'),
      description: t('home.products.indianSpicesDesc'),
      image: '/assets/generated/home-products-collage.dim_1600x900.png'
    },
    {
      title: t('home.products.dryFruits'),
      description: t('home.products.dryFruitsDesc'),
      image: '/assets/generated/home-dry-fruits.dim_1600x900.png'
    },
    {
      title: t('home.products.dehydratedPowders'),
      description: t('home.products.dehydratedPowdersDesc'),
      image: '/assets/generated/home-dehydrated-powders.dim_1600x900.png'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: t('home.whyChoose.exportQuality'),
      description: t('home.whyChoose.exportQualityDesc')
    },
    {
      icon: Leaf,
      title: t('home.whyChoose.pureClean'),
      description: t('home.whyChoose.pureCleanDesc')
    },
    {
      icon: Award,
      title: t('home.whyChoose.certified'),
      description: t('home.whyChoose.certifiedDesc')
    },
    {
      icon: Users,
      title: t('home.whyChoose.directFarmers'),
      description: t('home.whyChoose.directFarmersDesc')
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container-custom py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {t('home.hero.title')}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={`/${language}/shop` as any}>
                  <Button size="lg" className="gap-2">
                    {t('home.hero.browseProducts')} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/${language}/export-inquiry` as any}>
                  <Button size="lg" variant="outline" className="gap-2">
                    {t('home.hero.requestQuote')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-banner.dim_1600x600.png"
                alt="Premium natural products from Indian farms"
                className="rounded-lg shadow-warm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="border-t py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{t('home.products.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('home.products.subtitle')}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-display">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/${language}/shop` as any}>
                    <Button variant="ghost" className="gap-2 p-0">
                      {t('home.products.viewProducts')} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container-custom">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{t('home.about.title')}</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                {t('home.about.p1')}
              </p>
              <p className="mb-6 text-lg text-muted-foreground">
                {t('home.about.p2')}
              </p>
              <Link to={`/${language}/export-inquiry` as any}>
                <Button size="lg" className="gap-2">
                  {t('home.about.partnerWithUs')} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/assets/generated/home-farmers-harvest.dim_1600x900.png"
                alt="Indian farmers harvesting crops in traditional fields"
                className="rounded-lg shadow-warm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{t('home.whyChoose.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('home.whyChoose.subtitle')}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Quality */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container-custom">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <img
                src="/assets/generated/home-processing-unit.dim_1600x900.png"
                alt="Hygienic food-grade processing facility with modern equipment"
                className="rounded-lg shadow-warm"
              />
            </div>
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{t('home.processing.title')}</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                {t('home.processing.p1')}
              </p>
              <p className="text-lg text-muted-foreground">
                {t('home.processing.p2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{t('home.certifications.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('home.certifications.subtitle')}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/generated/certifications-strip.dim_1400x220.png"
              alt="FSSAI, APEDA, ISO, HACCP, and Organic certification logos"
              className="max-w-full rounded-lg shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Bulk Inquiry Form */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{t('home.bulkInquiry.title')}</h2>
              <p className="text-lg text-muted-foreground">
                {t('home.bulkInquiry.subtitle')}
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <ExportInquiryForm showSuccessInline />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{t('home.contact.title')}</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('home.contact.subtitle')}
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <a
                  href={`https://wa.me/${whatsappLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="h-5 w-5" />
                  {t('home.contact.chatWhatsApp')}
                </a>
              </Button>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center justify-center gap-2">
                  <SiWhatsapp className="h-4 w-4" />
                  {t('footer.whatsapp')}: {whatsapp}
                </p>
                {email && (
                  <p className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${email}`} className="hover:text-primary">
                      {email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, Shield, Award, Users, MessageCircle } from 'lucide-react';
import ExportInquiryForm from '../components/ExportInquiryForm';

export default function HomePage() {
  const whatsappNumber = '+919876543210'; // Placeholder number

  const products = [
    {
      title: 'Indian Spices',
      description: 'Premium turmeric, chili, coriander, and traditional spice blends',
      image: '/assets/generated/home-products-collage.dim_1600x900.png'
    },
    {
      title: 'Dry Fruits',
      description: 'High-quality almonds, cashews, raisins, and mixed dry fruits',
      image: '/assets/generated/home-products-collage.dim_1600x900.png'
    },
    {
      title: 'Dehydrated Powders',
      description: 'Onion, garlic, ginger, and moringa leaf powder for global markets',
      image: '/assets/generated/home-products-collage.dim_1600x900.png'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Export Quality Standards',
      description: 'Lab-tested products meeting international food safety regulations'
    },
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'No chemicals, preservatives, or artificial additives'
    },
    {
      icon: Award,
      title: 'Certified Processing',
      description: 'Hygienic facilities with FSSAI, APEDA, and ISO certifications'
    },
    {
      icon: Users,
      title: 'Direct from Farmers',
      description: 'Sustainable sourcing supporting local farming communities'
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
                From Indian Farms to Global Tables
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Twin Roots Foods brings you premium natural products sourced directly from Indian farms. Founded by two brothers committed to quality, sustainability, and export excellence for international buyers and wholesale partners worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop">
                  <Button size="lg" className="gap-2">
                    Browse Products <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/export-inquiry">
                  <Button size="lg" variant="outline" className="gap-2">
                    Request Bulk Quote
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
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Our Products</h2>
            <p className="text-lg text-muted-foreground">
              Premium quality products for international markets
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
                  <Link to="/shop">
                    <Button variant="ghost" className="gap-2 p-0">
                      View Products <ArrowRight className="h-4 w-4" />
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
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Our Story</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Twin Roots Foods was founded by two brothers with a vision to connect the richness of Indian agriculture with global markets. Growing up in farming communities, we witnessed firsthand the quality and care that goes into every harvest.
              </p>
              <p className="mb-6 text-lg text-muted-foreground">
                Today, we work directly with farmers across India to source premium spices, dry fruits, and dehydrated powders. Our state-of-the-art processing facilities ensure every product meets international export standards while preserving natural goodness and supporting sustainable farming practices.
              </p>
              <Link to="/export-inquiry">
                <Button size="lg" className="gap-2">
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/assets/generated/home-farmers.dim_1600x900.png"
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
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">
              Trusted by international buyers for quality and reliability
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
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Hygienic Processing</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Our state-of-the-art processing facilities maintain the highest standards of hygiene and food safety. Every step from cleaning to packaging is monitored to ensure export-quality products.
              </p>
              <p className="text-lg text-muted-foreground">
                We use modern equipment and follow strict protocols to preserve the natural properties, aroma, and nutritional value of our products while meeting international quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Certifications</h2>
            <p className="text-lg text-muted-foreground">
              Certified for quality and compliance with international standards
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
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Bulk Inquiry</h2>
              <p className="text-lg text-muted-foreground">
                Interested in wholesale or export orders? Submit your inquiry and our team will respond within 24-48 hours.
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
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Get in Touch</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Have questions or need immediate assistance? Contact us directly on WhatsApp for quick responses.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              WhatsApp: {whatsappNumber}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

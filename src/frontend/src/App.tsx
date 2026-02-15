import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './i18n/LanguageProvider';
import { useActor } from './hooks/useActor';
import { parseLanguageFromPath, addLanguagePrefix } from './lib/i18nRouting';
import { isValidLanguage, DEFAULT_LANGUAGE } from './lib/language';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ExportInquiryPage from './pages/ExportInquiryPage';
import OwnerPage from './pages/OwnerPage';

function RootComponent() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.createInitialCatalog().catch(console.error);
    }
  }, [actor]);

  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent
});

// Redirect handler for non-prefixed routes
const redirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: ({ location }) => {
    const lang = parseLanguageFromPath(location.pathname);
    if (!lang) {
      // No language prefix, redirect to default language
      throw redirect({ to: addLanguagePrefix('/', DEFAULT_LANGUAGE) as any });
    }
  },
  component: () => null
});

// Language-prefixed routes
const langRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$lang',
  beforeLoad: ({ params }) => {
    if (!isValidLanguage(params.lang)) {
      throw redirect({ to: addLanguagePrefix('/', DEFAULT_LANGUAGE) as any });
    }
  }
});

const indexRoute = createRoute({
  getParentRoute: () => langRoute,
  path: '/',
  component: HomePage
});

const shopRoute = createRoute({
  getParentRoute: () => langRoute,
  path: 'shop',
  component: ShopPage
});

const productRoute = createRoute({
  getParentRoute: () => langRoute,
  path: 'product/$productId',
  component: ProductDetailPage
});

const cartRoute = createRoute({
  getParentRoute: () => langRoute,
  path: 'cart',
  component: CartPage
});

const checkoutRoute = createRoute({
  getParentRoute: () => langRoute,
  path: 'checkout',
  component: CheckoutPage
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => langRoute,
  path: 'order-confirmation',
  component: OrderConfirmationPage
});

const exportInquiryRoute = createRoute({
  getParentRoute: () => langRoute,
  path: 'export-inquiry',
  component: ExportInquiryPage
});

const ownerRoute = createRoute({
  getParentRoute: () => langRoute,
  path: 'owner',
  component: OwnerPage
});

const routeTree = rootRoute.addChildren([
  redirectRoute,
  langRoute.addChildren([
    indexRoute,
    shopRoute,
    productRoute,
    cartRoute,
    checkoutRoute,
    orderConfirmationRoute,
    exportInquiryRoute,
    ownerRoute
  ])
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

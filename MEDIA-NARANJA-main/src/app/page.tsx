import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import ProductCatalog from '@/components/landing/product-catalog';
import NewProductsSection from '@/components/landing/new-products';
import Testimonials from '@/components/landing/testimonials';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import { NewProductsData } from '@/lib/new-products';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <NewProductsSection products={NewProductsData} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

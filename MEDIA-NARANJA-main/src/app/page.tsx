import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import FeaturedCollections from '@/components/landing/featured-collections';
import ProductCatalog from '@/components/landing/product-catalog';
import Testimonials from '@/components/landing/testimonials';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <FeaturedCollections />
        <ProductCatalog />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

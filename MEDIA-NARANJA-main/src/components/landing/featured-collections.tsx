import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 'premium-roses',
    name: 'Rosas Premium',
    href: '#catalogo',
  },
  {
    id: 'special-collections',
    name: 'Colecciones Especiales',
    href: '#catalogo',
  },
  {
    id: 'exotic-flowers',
    name: 'Flores Exóticas',
    href: '#catalogo',
  },
  {
    id: 'limited-editions',
    name: 'Ediciones Limitadas',
    href: '#catalogo',
  },
];

export default function FeaturedCollections() {
  return (
    <section id="collections" className="bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Colecciones Destacadas</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Descubre nuestras creaciones exclusivas, diseñadas para momentos inolvidables.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => {
            const image = PlaceHolderImages.find((img) => img.id === collection.id);
            return (
              <Link href={collection.href} key={collection.id} className="group">
                <Card className="overflow-hidden h-full border-0 bg-transparent shadow-none transition-all duration-300 rounded-lg">
                  <CardContent className="p-0 flex flex-col h-full">
                    {image && (
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={image.imageHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-6 absolute bottom-0 text-white">
                      <h3 className="text-xl font-headline font-semibold">{collection.name}</h3>
                      <div className="flex items-center text-sm font-semibold text-white/80 mt-2">
                        Ver más <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

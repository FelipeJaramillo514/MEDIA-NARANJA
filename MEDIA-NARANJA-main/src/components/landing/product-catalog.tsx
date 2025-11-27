"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  description: string;
  price?: string;
};

const products: Product[] = [
  { id: "blooming-love", name: "Blooming Love", description: "Ramo en tonos rosados con acabado elegante." },
  { id: "bouquet-little-special", name: "Bouquet Little Special", description: "Detalle floral delicado para ocasiones especiales." },
  { id: "bouquete-deluxe-15-anos", name: "Bouquet Deluxe 15 años", description: "Arreglo con toque de lujo para 15 años." },
  { id: "bouquete-especial-pequeno", name: "Bouquet Especial Pequeño", description: "Versión compacta para un detalle rápido y especial." },
  { id: "bouquete-glamour", name: "Bouquet Glamour", description: "Composición glamorosa con tonos sofisticados." },
  { id: "diamond-bouquet", name: "Diamond Bouquet", description: "Bouquet luminoso con mezcla de rosas y follaje." },
  { id: "glow-bouquete", name: "Glow Bouquet", description: "Arreglo con efecto glow y contraste de colores." },
  { id: "glow-buquet", name: "Glow Buquet", description: "Versión compacta del glow, perfecta para regalo." },
  { id: "golden-roses", name: "Golden Roses", description: "Rosas en tonos dorados para un gesto impactante." },
  { id: "gourmet-rose", name: "Gourmet Rose", description: "Caja gourmet con rosas y detalles premium." },
  { id: "luxury-bouquete", name: "Luxury Bouquet", description: "Arreglo lujoso con acabados exclusivos." },
  { id: "mini-romance", name: "Mini Romance", description: "Mini bouquet romántico, ideal para sorprender." },
  { id: "ramillete-express", name: "Ramillete Express", description: "Ramillete rápido y fresco para entrega al momento." },
];

export default function ProductCatalog() {
  return (
    <section id="catalogo" className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Nuestro Catálogo</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Cada ramo es una obra de arte, creada con las flores más frescas y exclusivas.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const image = PlaceHolderImages.find((img) => img.id === product.id);
            return (
              <Card
                key={product.id}
                className="group flex flex-col rounded-lg overflow-hidden border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-transparent"
              >
                {image && (
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-lg">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  </CardContent>
                )}
                <CardHeader className="bg-card rounded-b-lg flex-grow">
                  <CardTitle className="font-headline text-2xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>

                  <div className="flex-grow flex items-center justify-between pt-4">
                    {product.price ? (
                      <p className="text-xl font-semibold text-foreground">
                        <span className="text-sm font-normal text-muted-foreground">COP</span> ${product.price}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground">Precio por definir</p>
                    )}
                    <Button asChild variant="outline">
                      <Link href="#contacto">{product.price ? "Ordenar" : "Consultar"}</Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

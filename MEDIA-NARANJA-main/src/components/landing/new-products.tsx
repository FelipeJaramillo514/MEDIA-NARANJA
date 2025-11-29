"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { NewProduct } from "@/lib/new-products";

type Props = {
  title?: string;
  products: NewProduct[];
};

function buildWhatsAppLink(productName: string) {
  const msg = `Hola, quiero ordenar el ramo ${productName} de la sección NUEVOS.`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function NewProductsSection({ title = "Nuevas Creaciones", products }: Props) {
  return (
    <section id="nuevos" className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">{title}</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Descubre nuestras creaciones más recientes, diseñadas con flores frescas y un toque boutique.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="group flex flex-col rounded-lg overflow-hidden border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-transparent">
              <CardContent className="p-0">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-lg">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardContent>
              <CardHeader className="bg-card rounded-b-lg flex-grow">
                <CardTitle className="font-headline text-2xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <div className="flex-grow flex items-center justify-between pt-4">
                  <p className="text-xl font-semibold text-foreground">
                    <span className="text-sm font-normal text-muted-foreground">COP</span> ${product.price}
                  </p>
                  <Button asChild variant="outline">
                    <Link href={buildWhatsAppLink(product.name)} target="_blank" rel="noopener noreferrer">Ordenar ya</Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

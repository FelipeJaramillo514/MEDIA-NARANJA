"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-flowers");
  const fallbackImage = "/brand/hero-tulips.jpg";
  const heroSrc = heroImage?.imageUrl ?? fallbackImage;

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">
      <Image
        src={heroSrc}
        alt={heroImage?.description ?? "Tulipanes en fondo elegante"}
        fill
        className="object-cover object-center z-0"
        priority
        data-ai-hint={heroImage?.imageHint ?? "tulips background"}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-primary/25 to-transparent" />
      <div className="absolute inset-0 z-10 backdrop-blur-[3px]" />

      <div className="container px-4 md:px-6 text-white relative z-20">
        <div className="flex flex-col items-center space-y-6">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
              Floristería Boutique
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl font-body drop-shadow-md text-white/85">
              Arte floral para momentos únicos. Arreglos hechos a mano con flores premium.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-white/90 text-primary-foreground hover:bg-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 rounded-full shadow-lg"
          >
            <Link href="#catalogo">Explorar Colección</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppIcon } from "./icons";

const navLinks = [{ href: "#catalogo", label: "Catálogo" }];
const logoSrc = "/brand/logo-media-naranja.png";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 text-white backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <div className="container flex h-16 max-w-7xl items-center justify-between gap-6">
        <Link href="#" className="flex items-center gap-3" prefetch={false}>
          <div className="relative h-16 w-64 sm:h-20 sm:w-80">
            <Image
              src={logoSrc}
              alt="Media Naranja logo"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 220px, 320px"
              priority
            />
          </div>
          <span className="sr-only">MEDIA NARANJA</span>
        </Link>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-primary" prefetch={false}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            size="sm"
            className="bg-green-500 text-white hover:bg-green-600 gap-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            <Link href="https://wa.me/573183785679" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5" />
              ¡Haz tu pedido!
            </Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="#" className="mr-6 flex items-center" prefetch={false}>
                <div className="relative h-12 w-56">
                  <Image src={logoSrc} alt="Media Naranja logo" fill className="object-contain" sizes="224px" priority />
                </div>
              </Link>
              <div className="grid gap-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600 gap-3 text-lg py-7 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 mt-4"
                >
                  <Link href="https://wa.me/573183785679" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-7 w-7" />
                    ¡Haz tu pedido!
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

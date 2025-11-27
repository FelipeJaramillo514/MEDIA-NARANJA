"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contacto" className="bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Contacto</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            ¿Tienes alguna pregunta o un proyecto especial en mente? Nos encantaría escucharte. ¡Escríbenos a WhatsApp!
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl items-center gap-12">
          <div className="mx-auto flex flex-col items-center space-y-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h3 className="text-2xl font-headline font-bold">Nuestro Taller</h3>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Barrio San Sebastián, Túquerres, Nariño
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" /> 318 378 5679
                </p>
                <p className="flex items-center gap-2">
                  <InstagramIcon className="h-5 w-5 text-primary" />{" "}
                  <Link href="#" className="hover:text-primary">
                    @medianaranja_tuquerres
                  </Link>
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-green-500 text-white hover:bg-green-600 gap-3 text-lg py-7 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              <Link href="https://wa.me/573183785679" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-7 w-7" />
                ¡Haz tu pedido!
              </Link>
            </Button>
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-headline font-bold">Horario</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>Lunes a Viernes: 10:00 - 20:00</p>
                <p>Sábados: 10:00 - 14:00</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

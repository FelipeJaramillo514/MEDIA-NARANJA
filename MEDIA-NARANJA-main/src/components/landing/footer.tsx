import Link from "next/link";
import { Flower2 } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground font-body">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <Flower2 className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-bold">
                MEDIA NARANJA
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Arte floral para momentos inolvidables.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Navegación</h4>
            <ul className="space-y-1">
              <li><Link href="#catalogo" className="text-sm hover:text-primary" prefetch={false}>Catálogo</Link></li>
              <li><Link href="#contacto" className="text-sm hover:text-primary" prefetch={false}>Contacto</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
                <p>hola@medianaranja.com</p>
                <p>318 378 5679</p>
                <p>Barrio San Sebastian, Túquerres</p>
            </div>
          </div>
           <div className="space-y-2">
            <h4 className="font-semibold">Síguenos</h4>
             <div className="flex items-center gap-4">
              <Link href="#" aria-label="Instagram" prefetch={false}><InstagramIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Facebook" prefetch={false}><FacebookIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="https://wa.me/573183785679" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" ><WhatsAppIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MEDIA NARANJA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

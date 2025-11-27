import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function About() {
  const workshopImage = PlaceHolderImages.find((img) => img.id === 'workshop-2');

  return (
    <section id="nosotros" className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Nuestra Historia</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pasión por el Arte Floral
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
              MEDIA NARANJA nació de un sueño: transformar la floristería tradicional en una experiencia única. No solo vendemos flores; creamos emociones y contamos historias a través de diseños florales que son verdaderas obras de arte.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
              Inspirados en la belleza de la naturaleza, nuestro taller es un espacio donde la creatividad florece. Cada ramo es cuidadosamente diseñado por nuestros artistas florales, utilizando solo las flores más frescas y extraordinarias.
            </p>
          </div>
          <div className="flex items-center justify-center">
             {workshopImage && (
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-full">
                <Image
                    src={workshopImage.imageUrl}
                    alt={workshopImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={workshopImage.imageHint}
                />
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

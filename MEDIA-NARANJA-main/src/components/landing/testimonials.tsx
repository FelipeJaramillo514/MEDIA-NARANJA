'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 1,
    name: 'Sofía L.',
    avatarId: 'avatar-1',
    text: 'El ramo superó todas mis expectativas. Era una verdadera obra de arte. La atención al detalle es increíble. Sin duda, la mejor floristería.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos M.',
    avatarId: 'avatar-2',
    text: 'Encargué un ramo personalizado para mi aniversario y fue un éxito rotundo. Captaron la idea a la perfección y el resultado fue espectacular. Servicio impecable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena G.',
    avatarId: 'avatar-3',
    text: 'La calidad de las flores es excepcional. Se nota que trabajan con el mejor producto. El servicio de entrega fue puntual y muy profesional. Muy recomendable.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Javier P.',
    avatarId: 'avatar-2',
    text: 'Un servicio de primera clase. Desde el pedido hasta la entrega, todo fue perfecto. El ramo era fresco, elegante y duró muchísimo tiempo. Volveré a comprar.',
    rating: 5,
  }
];

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < value ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Lo que dicen nuestros clientes</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            La satisfacción de nuestros clientes es nuestra mayor inspiración.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const avatarImage = PlaceHolderImages.find((img) => img.id === testimonial.avatarId);
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col h-full justify-between shadow-sm rounded-lg bg-background p-6">
                      <CardContent className="p-0">
                        <Rating value={testimonial.rating} />
                        <p className="text-muted-foreground mt-4 text-base">"{testimonial.text}"</p>
                      </CardContent>
                      <div className="flex items-center gap-4 mt-6">
                           {avatarImage && (
                              <Avatar>
                                <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name} data-ai-hint={avatarImage.imageHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                           )}
                           <p className="text-base font-semibold">{testimonial.name}</p>
                         </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="ml-12"/>
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}

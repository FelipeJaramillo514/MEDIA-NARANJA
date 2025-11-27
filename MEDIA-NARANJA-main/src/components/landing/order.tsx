'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const products = [
  { name: 'Amor Eterno' },
  { name: 'Sueño de Verano' },
  { name: 'Jardín Secreto' },
  { name: 'Cielo Estrellado' },
  { name: 'Nube Blanca' },
  { name: 'Sonrisa Rosa' },
  { name: 'Ramo Personalizado' },
];

const FormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  phone: z.string().min(9, { message: 'Introduce un número de teléfono válido.' }),
  address: z.string().min(10, { message: 'La dirección debe tener al menos 10 caracteres.' }),
  deliveryDate: z.date({ required_error: 'Por favor, selecciona una fecha de entrega.' }),
  bouquet: z.string({ required_error: 'Por favor, selecciona un ramo.' }),
  message: z.string().max(300, 'El mensaje no puede superar los 300 caracteres.').optional(),
  reference: z.any().optional(),
});

export default function Order() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'Pedido realizado con éxito',
      description: `Gracias por tu pedido, ${data.name}. Recibirás una confirmación pronto.`,
    });
    console.log(data);
    form.reset({
      name: '',
      phone: '',
      address: '',
      deliveryDate: undefined,
      bouquet: undefined,
      message: '',
      reference: undefined,
    });
  }

  const workshopImage = PlaceHolderImages.find((img) => img.id === 'workshop-1');

  return (
    <section id="pedidos" className="bg-secondary/50">
      <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Realizar un Pedido</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Completa el formulario para enviar una obra de arte floral a esa persona especial. Nos encargamos de cada detalle para que tu gesto sea inolvidable.
          </p>
          {workshopImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mt-8">
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
        <div className="w-full max-w-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Nombre completo</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input placeholder="Tu teléfono" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FormLabel>Dirección de entrega</FormLabel><FormControl><Input placeholder="Calle, número, ciudad" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="deliveryDate" render={({ field }) => (
                  <FormItem className="flex flex-col"><FormLabel>Fecha de entrega</FormLabel><FormControl><DatePicker date={field.value} setDate={field.onChange} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="bouquet" render={({ field }) => (
                  <FormItem><FormLabel>Selección del ramo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Elige un ramo" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {products.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Mensaje personalizado</FormLabel><FormControl><Textarea placeholder="Escribe aquí tu dedicatoria..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="reference" render={({ field }) => (
                 <FormItem>
                    <FormLabel>Adjuntar referencia visual (opcional)</FormLabel>
                    <FormControl>
                      <Input type="file" {...form.register('reference')} />
                    </FormControl>
                    <FormDescription>Si tienes una foto de inspiración, puedes subirla aquí.</FormDescription>
                    <FormMessage />
                  </FormItem>
              )} />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">Confirmar Pedido</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

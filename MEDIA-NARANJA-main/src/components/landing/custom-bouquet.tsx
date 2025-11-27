'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  style: z.enum(['clasico', 'romantico', 'moderno', 'minimalista', 'exotico'], {
    required_error: 'Debes seleccionar un estilo.',
  }),
  preferences: z.string().optional(),
});

const bouquetStyles = [
  { id: 'clasico', label: 'Clásico' },
  { id: 'romantico', label: 'Romántico' },
  { id: 'moderno', label: 'Moderno' },
  { id: 'minimalista', label: 'Minimalista' },
  { id: 'exotico', label: 'Exótico' },
];

export default function CustomBouquet() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'Solicitud enviada',
      description: `Hemos recibido tu solicitud de ramo personalizado estilo ${data.style}. Nos pondremos en contacto contigo pronto.`,
    });
    form.reset({style: undefined, preferences: ''});
  }

  return (
    <section id="ramos-personalizados" className="bg-background">
      <div className="container grid items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Crea Tu Ramo Ideal</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Nuestro equipo de artistas florales está a tu disposición para dar vida a tu visión. Explícanos tu idea y crearemos una composición única y exclusiva para ti, un ramo que cuente tu historia.
          </p>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Selecciona un estilo como punto de partida y déjanos tus preferencias.
          </p>
        </div>
        <div className="w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8 border rounded-lg shadow-sm">
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold">Selecciona un estilo</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {bouquetStyles.map((style) => (
                          <FormItem key={style.id} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={style.id} />
                            </FormControl>
                            <FormLabel className="font-normal">{style.label}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferencias (colores, flores, etc.)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Tonos pastel, con peonías y un toque de verde eucalipto..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Solicitar Ramo Personalizado</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

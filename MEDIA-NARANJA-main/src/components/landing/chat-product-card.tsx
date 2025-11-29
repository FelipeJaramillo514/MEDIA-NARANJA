"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProductInfo } from "@/lib/recommendation";
import { formatCOP, waLinkFor } from "@/lib/recommendation";

export default function ChatProductCard({ product }: { product: ProductInfo }) {
  const hrefCatalog = product.section === "nuevos" ? "#nuevos" : "#catalogo";
  return (
    <div className="max-w-full">
      <Card className="rounded-xl overflow-hidden border bg-card">
        {product.imageUrl && (
          <CardContent className="p-0">
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </CardContent>
        )}
        <CardHeader>
          <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
          {product.description && <CardDescription>{product.description}</CardDescription>}
          <div className="flex items-center justify-between pt-3">
            <p className="text-lg font-semibold text-foreground">
              <span className="text-sm font-normal text-muted-foreground">COP</span> ${formatCOP(product.price)}
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={waLinkFor(product)} target="_blank" rel="noopener noreferrer">Ordenar</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={hrefCatalog}>Ver en catálogo</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

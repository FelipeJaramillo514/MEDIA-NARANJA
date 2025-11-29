"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MessageCircle, Send } from "lucide-react";
import { Answers, recommendProducts, buildReason, formatCOP, waLinkFor, enrichProduct, byId } from "@/lib/recommendation";
import ChatProductCard from "@/components/landing/chat-product-card";

type ChatMsg =
  | { role: "assistant" | "user"; kind: "text"; content: string }
  | { role: "assistant"; kind: "product"; productId: string };

type Step = "occasion" | "recipient" | "style" | "budget" | "done";

const initialGreeting =
  "No sabes qué elegir? ¡Naranjita con gusto te ayudará!\n\nHola, soy Naranjita, tu asistente floral. ¿Me cuentas para qué ocasión buscas un arreglo? Puedo ayudarte a elegir la opción perfecta.";

function detectBudgetNumber(text: string): number | undefined {
  // Captura números tipo 35.000, 70000, 120,000
  const clean = text.replace(/[^0-9]/g, "");
  if (!clean) return undefined;
  const n = parseInt(clean, 10);
  if (!Number.isFinite(n)) return undefined;
  // Heurística: si es < 1000 probablemente omitió miles -> *1000
  return n < 1000 ? n * 1000 : n;
}

function nextStep(answers: Answers): Step {
  if (!answers.occasion) return "occasion";
  if (!answers.recipient) return "recipient";
  if (!answers.style) return "style";
  if (!answers.budget) return "budget";
  return "done";
}

function assistantPromptFor(step: Step): string {
  switch (step) {
    case "occasion":
      return "¿Para qué ocasión es el ramo? (cumpleaños, aniversario, 15 años, graduación, condolencias…)";
    case "recipient":
      return "¿Para quién es el detalle? (pareja, madre/mamá, amiga/amigo, hija, cliente…)";
    case "style":
      return "¿Qué estilo te gustaría? (elegante, romántico, minimalista, colorido, suave…)";
    case "budget":
      return "¿Tienes un presupuesto aproximado en COP? (por ejemplo: 70.000)";
    default:
      return "Déjame ayudarte a encontrar algo perfecto para esa ocasión tan especial.";
  }
}

export default function NaranjitaWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: "assistant", kind: "text", content: initialGreeting }]);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const step = useMemo(() => nextStep(answers), [answers]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function handleAssistant(text: string) {
    setMessages((m) => [...m, { role: "assistant", kind: "text", content: text }]);
  }

  function handleUser(text: string) {
    setMessages((m) => [...m, { role: "user", kind: "text", content: text }]);
  }

  function processUserInput(text: string) {
    const lower = text.toLowerCase();
    const next = { ...answers } as Answers;

    if (step === "occasion") {
      next.occasion = lower;
    } else if (step === "recipient") {
      next.recipient = lower;
    } else if (step === "style") {
      next.style = lower;
    } else if (step === "budget") {
      const n = detectBudgetNumber(lower);
      if (n) next.budget = n;
    }

    setAnswers(next);

    const s = nextStep(next);
    if (s === "done") {
      const recs = recommendProducts(next, 3);
      if (!recs.length) {
        handleAssistant(
          "Puedo sugerirte varias opciones hermosas. ¿Te gustaría ver nuestro catálogo completo?"
        );
        return;
      }
      const top = enrichProduct(recs[0]);
      const others = recs.slice(1);
      const reason = buildReason(top, next);
      const link = waLinkFor(top);

      const lines = [
        `Creo que este ramo te encantará: \n• ${top.name} — COP $${formatCOP(top.price)}.`,
        reason,
        `[Ordenar por WhatsApp](${link})`,
      ];
      handleAssistant(lines.join("\n\n"));

      // Mostrar tarjeta del producto con foto/descripcion/precio/botones
      setMessages((m) => [...m, { role: "assistant", kind: "product", productId: top.id }]);

      if (others.length) {
        const alt = others
          .map((p) => `• ${p.name} — COP $${formatCOP(p.price)}. [Ordenar](${waLinkFor(p)})`)
          .join("\n");
        handleAssistant(`También podrían gustarte:\n${alt}`);
      }

      // Reiniciar ciclo con una pregunta suave
      setTimeout(() => {
        handleAssistant("¿Deseas ajustar estilo o presupuesto para ver otras opciones?");
      }, 300);
    } else {
      handleAssistant(assistantPromptFor(s));
    }
  }

  async function onSend() {
    const text = input.trim();
    if (!text) return;
    handleUser(text);
    setInput("");
    processUserInput(text);
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setOpen(true)} className="shadow-lg" variant="default">
          <MessageCircle className="mr-2 h-5 w-5" /> No sabes qué elegir? Naranjita te ayuda
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[380px] p-0 flex flex-col">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="font-headline">Naranjita</SheetTitle>
            <p className="text-sm text-muted-foreground">Asesora floral amable y experta</p>
          </SheetHeader>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((m, idx) => {
              if (m.kind === "text") {
                return (
                  <div
                    key={idx}
                    className={
                      m.role === "assistant"
                        ? "max-w-[85%] bg-card text-foreground border rounded-2xl px-3 py-2"
                        : "ml-auto max-w-[85%] bg-primary text-primary-foreground rounded-2xl px-3 py-2"
                    }
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                  </div>
                );
              }
              // kind === 'product'
              const base = byId.get(m.productId);
              if (!base) return null;
              return (
                <div key={idx} className="max-w-[85%]">
                  <ChatProductCard product={enrichProduct(base)} />
                </div>
              );
            })}
          </div>
          <div className="p-3 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
            />
            <Button onClick={onSend} title="Enviar">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

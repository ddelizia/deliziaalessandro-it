import { generateText, Output } from 'ai';
import z from 'zod';
import { openai } from '@ai-sdk/openai';
import type { BrandRowData } from '../data/csv';

const brandSchema = z.object({
  extract: z.string().describe('Estratto di 2-3 righe che riassuma il brand in modo chiaro e conciso'),
  description: z.string().describe('Descrizione del brand in italiano in formato markdown'),
});

export const brandInvestigationAgent = async (brand: BrandRowData) => await generateText({
  model: openai('gpt-5-nano'),
  output: Output.object({
    schema: brandSchema,

  }),
  prompt: `\
Sei un assistente specializzato per la creazione di contenuti di brand per un sito web distributore di prodotti di della marca ${brand.Name}.

Il tuo compito è creare contenuti per il brand ${brand.Name}, per poter vendere i suoi prodotti nel sito web del distributore.

L'obbiettivo é usare questa informazione per creare contenuti nel sito web del distributore.

1) Il nome del brand: ${brand.Name}
2) Il sito web del brand: ${brand.Site}

La tua missione è:

1. Estrarre un **breve estratto di 2-3 righe** che riassuma il brand in modo chiaro e conciso.
   - Ottimizza per la parola chiave "${brand.Category}"
   - Ottimizza per il meta description
2. Scrivere una **descrizione del brand** in italiano, includendo:
   - Quali prodotti/servizi offre il brand.
   - Concentrati sull'informazione del brand e dei prodotti che offre.
   - La descrizione deve essere in formato markdown o ottimizzata per il SEO
   - Ottimizza per la parola chiave "${brand.Category}"
   - Non ripetere il testo del breve estratto nella descrizione
   - Nel markdown usa una struttura h2 e h3 (opzionale) per organizzare le sezioni
   - Non usare h1
   - Puoi utilizzare bullet points per elencare elementi
   - Non includere le fonti nel markdown finale

I tuoi output devono essere ben strutturati e in italiano. Usa un tono professionale e chiaro.

Dopo avere eventualmente utilizzato gli strumenti a disposizione:
- **Devi restituire SOLO un oggetto JSON valido che rispetta esattamente lo schema fornito.**
- **Non includere testo extra fuori dal JSON.**
- Se riesci a trovare informazioni utili nella home page non é necessario utilizzare il tool web_search.

Esempio di output in fomaato JSON:

{
  "extract": "Estratto del brand",
  "description": "Descrizione del brand"
}

  `,
  // tools: {
  //   web_search: openai.tools.webSearch({
  //     // optional configuration:
  //     externalWebAccess: true,
  //     searchContextSize: 'low',
  //     filters: {
  //       allowedDomains: [new URL(brand.Site).hostname],
  //     },
  //     userLocation: {
  //       type: 'approximate',
  //       city: 'Rome',
  //       region: 'Italy',
  //     },
  //   }),
  // },
  // // Force web search tool (optional):
  // toolChoice: 'auto',

});
import { generateText, Output } from 'ai';
import z from 'zod';
import { openai } from '@ai-sdk/openai';
import type { CategoryRowData } from '../data/csv';

const brandSchema = z.object({
  extract: z.string().describe('Estratto di 2-3 righe che riassuma il brand in modo chiaro e conciso'),
  content: z.string().describe('Descrizione del brand in italiano in formato markdown'),
});

export const categoryInvestigationAgent = async (category: CategoryRowData) => await generateText({
  model: openai('gpt-5'),
  output: Output.object({
    schema: brandSchema,
  }),
  prompt: `\
Genera il contenuto SEO completa per una pagina categoria del sito deliziaalessandro.it, operante nel settore edilizia, finiture per la casa, arredo bagno, pavimenti e materiali tecnici.
La categoria da descrivere è: ${category.Name}.

Il contenuto deve essere:

- In Markdown, con struttura chiara e leggibile.
- Con titolo H1, sottosezioni H2 e H3 dove utili.
- Con bullet points per elenchi prodotti o servizi.
- Enfatizza la qualità dei marchi trattati.
- Usa il bold per enfatizzare le parole chiave.
- Lunga, completa e ottimizzata lato SEO.
- Con parole chiave correlate alla categoria principale (compra-intenzioni, long-tail, sinonimi, termini tecnici).
- Deve esprimere la professionalità dell’azienda Delizia Alessandro, attiva dagli anni ’50.
- Deve enfatizzare competenza, assistenza, ampia scelta prodotti, qualità dei marchi trattati.
- Deve includere un richiamo ai servizi principali senza listarli tutti: consulenza, preventivi, progettazione 3D, consegna, post-vendita, pagamenti personalizzati.
- Deve includere una breve sezione “Perché scegliere noi”.
- Deve mantenere un tono professionale, chiaro, orientato alla vendita ma non eccessivamente pubblicitario.

Non inserire call-to-action aggressive.

La localizzazione deve essere chiara: Cosenza, Amantea, Campora San Giovanni, costa tirrenica.

Linguaggio in italiano naturale, non tradotto.

Esempio di output in fomaato JSON:

{
  "extract": "Estratto della descrizione della categoria",
  "content": "Descrizione della categoria"
}
  `,

});
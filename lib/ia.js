import Anthropic from '@anthropic-ai/sdk';

// Modèle rapide et peu coûteux, comme demandé dans le cahier des charges
const MODEL = 'claude-haiku-5-5';

let client = null;

// La clé est lue uniquement côté serveur, dans la variable d'environnement ANTHROPIC_API_KEY.
export function iaActive() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export async function repondreIA(system, messages) {
  client = client || new Anthropic({ timeout: 15000, maxRetries: 1 });
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    // la fiche du suspect ne change pas d'une question à l'autre : on la met en cache
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
    output_config: { effort: 'low' },
    messages,
  });
  if (res.stop_reason === 'refusal') {
    return '*secoue la tête* Je ne répondrai pas à ça. Revenons à l\'enquête, voulez-vous ?';
  }
  return res.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
}

export { Anthropic };

export default defineEventHandler(async (event) => {
  const { message, history = [] } = await readBody<{
    message: string;
    history?: { role: 'user' | 'assistant'; content: string }[];
  }>(event);

  if (!message?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Пустое сообщение' });
  }

  const config = useRuntimeConfig(event);

  const messages = [
    {
      role: 'system',
      content: 'Ты — дружелюбный ассистент на сайте с todo-листом, погодой и таймерами. Отвечай кратко на РУССКОМ.',
    },
    ...history,
    { role: 'user', content: message },
  ];

  const ac = new AbortController();
  const onClose = () => ac.abort();
  event.node.req.on('close', onClose);

  try {
    const ollamaRes = await fetch(`${config.ollamaBaseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.ollamaModel,
        messages,
        stream: true,
      }),
      signal: ac.signal,
    });

    if (!ollamaRes.ok || !ollamaRes.body) {
      throw createError({ statusCode: 502, statusMessage: 'Ollama недоступна' });
    }

    setResponseHeaders(event, {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    return ollamaRes.body;
  } catch (e) {
    if ((e as Error).name === 'AbortError') return;
    throw e;
  } finally {
    event.node.req.off('close', onClose);
  }
});
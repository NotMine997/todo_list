import { ref, watch } from 'vue';

type Msg = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'ollama-chat-history';
const DEFAULT_HISTORY: Msg[] = [
  { role: 'assistant', content: 'Привет! Чем помочь?' },
];

const messages = ref<Msg[]>([...DEFAULT_HISTORY]);
const loading = ref(false);

let controller: AbortController | null = null;
let initialized = false;

const persist = () => {
  if (typeof window === 'undefined') return;
  const clean = messages.value.filter((m) => m.content.trim() !== '');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
};

const restore = () => {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as Msg[];
    if (Array.isArray(parsed) && parsed.length) messages.value = parsed;
  } catch {  }
};

const init = () => {
  if (initialized) return;
  initialized = true;
  if (import.meta.client) {
    restore();
    watch(
      messages,
      () => {
        if (!loading.value) persist();
      },
      { deep: true },
    );
    window.addEventListener('beforeunload', persist);
  }
};

const send = async (text: string) => {
  init();
  if (!text.trim() || loading.value) return;

  messages.value.push({ role: 'user', content: text });

  const assistantMsg: Msg = { role: 'assistant', content: '' };
  messages.value.push(assistantMsg);

  loading.value = true;
  controller = new AbortController();

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        history: messages.value.slice(-11, -1),
      }),
      signal: controller.signal,
    });

    if (!res.body) throw new Error('Нет тела ответа');

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const chunk = JSON.parse(line);
          if (chunk.message?.content) {
            assistantMsg.content += chunk.message.content;
          }
          if (chunk.done) break;
        } catch { }
      }
    }
  } catch (e) {
    if ((e as Error).name === 'AbortError') {
      if (!assistantMsg.content.trim()) {
        assistantMsg.content = 'Генерация отменена.';
      }
    } else {
      assistantMsg.content = assistantMsg.content || 'Не удалось получить ответ.';
    }
  } finally {
    loading.value = false;
    controller = null;
    persist();
  }
};

const cancel = () => {
  if (controller) {
    controller.abort();
    controller = null;
  }
  loading.value = false;
};

const clear = () => {
  cancel();
  messages.value = [...DEFAULT_HISTORY];
  persist();
};

export const useOllamaChat = () => {
  init();
  return { messages, loading, send, cancel, clear };
};
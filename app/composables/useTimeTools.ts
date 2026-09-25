import { ref, computed } from 'vue';


const currentTime = ref('--:--:--');
let clockTimer: ReturnType<typeof setInterval> | null = null;


const swRunning = ref(false);
const swElapsed = ref(0); 
let swTimer: ReturnType<typeof setInterval> | null = null;
let swStartedAt = 0; 


const timerTotal = ref(5 * 60); 
const timerLeft = ref(timerTotal.value);
const timerRunning = ref(false);
let timerTimer: ReturnType<typeof setInterval> | null = null;
let timerEndsAt = 0; 


const pad = (n: number) => String(n).padStart(2, '0');

const fmtHMS = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
};

const fmtSeconds = (s: number) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;


const STORAGE_KEY = 'time-tools-state';

const persist = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      swElapsed: swElapsed.value,
      swRunning: swRunning.value,
      swStartedAt,
      timerTotal: timerTotal.value,
      timerLeft: timerLeft.value,
      timerRunning: timerRunning.value,
      timerEndsAt,
    }),
  );
};

const restore = () => {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const s = JSON.parse(raw);

    swRunning.value = !!s.swRunning;
    if (swRunning.value && s.swStartedAt) {
      swStartedAt = s.swStartedAt;
      swElapsed.value = Date.now() - swStartedAt;
    } else {
      swElapsed.value = s.swElapsed ?? 0;
    }

    timerTotal.value = s.timerTotal ?? 5 * 60;
    timerRunning.value = !!s.timerRunning;
    if (timerRunning.value && s.timerEndsAt) {
      timerEndsAt = s.timerEndsAt;
      timerLeft.value = Math.max(0, Math.round((timerEndsAt - Date.now()) / 1000));
      if (timerLeft.value <= 0) timerRunning.value = false;
    } else {
      timerLeft.value = s.timerLeft ?? timerTotal.value;
    }
  } catch { }
};


const tickClock = () => {
  currentTime.value = new Date().toLocaleTimeString('ru-RU');
};

const startSwTick = () => {
  if (swTimer) return;
  swTimer = setInterval(() => {
    swElapsed.value = Date.now() - swStartedAt;
  }, 31);
};

const startTimerTick = () => {
  if (timerTimer) return;
  timerTimer = setInterval(() => {
    timerLeft.value = Math.max(0, Math.round((timerEndsAt - Date.now()) / 1000));
    if (timerLeft.value <= 0) {
      stopTimer();
    }
  }, 250);
};

const startClock = () => {
  if (clockTimer) return;
  tickClock();
  clockTimer = setInterval(tickClock, 1000);
};

const startSw = () => {
  if (swRunning.value) return;
  swRunning.value = true;
  swStartedAt = Date.now() - swElapsed.value;
  startSwTick();
  persist();
};

const stopSw = () => {
  swRunning.value = false;
  if (swTimer) clearInterval(swTimer);
  swTimer = null;
  persist();
};

const resetSw = () => {
  stopSw();
  swElapsed.value = 0;
  swStartedAt = 0;
  persist();
};

const startTimer = () => {
  if (timerRunning.value || timerLeft.value <= 0) return;
  timerRunning.value = true;
  timerEndsAt = Date.now() + timerLeft.value * 1000;
  startTimerTick();
  persist();
};

const stopTimer = () => {
  timerRunning.value = false;
  if (timerTimer) clearInterval(timerTimer);
  timerTimer = null;
  persist();
};

const resetTimer = () => {
  stopTimer();
  timerLeft.value = timerTotal.value;
  persist();
};

const setTimerMinutes = (m: number) => {
  stopTimer();
  timerTotal.value = m * 60;
  timerLeft.value = m * 60;
  persist();
};


let initialized = false;

export const useTimeTools = () => {
  if (!initialized) {
    initialized = true;

    if (import.meta.client) {
      restore();
      startClock();

      if (swRunning.value) startSwTick();
      if (timerRunning.value) startTimerTick();


      window.addEventListener('beforeunload', persist);
    }
  }

  return {

    currentTime,

    swRunning,
    swElapsed,
    startSw,
    stopSw,
    resetSw,

    timerTotal,
    timerLeft,
    timerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    setTimerMinutes,

    fmtHMS,
    fmtSeconds,
    fmtClock: currentTime, 
  };
};
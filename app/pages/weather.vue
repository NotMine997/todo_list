<script setup lang="ts">
import { ref } from 'vue';
import type { WeatherResponse } from '~/types/weather';

const city = ref('Москва');
const weather = ref<WeatherResponse | null>(null);
const error = ref<string | null>(null);

const loadWeather = async () => {
  error.value = null;
  try {
    const { data, error: fetchError } = await useFetch<WeatherResponse>('/api/weather', {
      query: { city: city.value },
    });

    if (fetchError.value) {
      throw fetchError.value;
    }

    weather.value = data.value ?? null;
  } catch {
    error.value = 'Город не найден';
    weather.value = null;
    city.value = '';
  }
};

loadWeather();
</script>

<template>
  <main
    class="min-h-screen bg-bg-primary py-6 px-3 sm:py-12 sm:px-6 lg:px-8 font-sans text-text-primary transition-colors duration-300"
  >
    <div
      class="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto bg-surface-primary rounded-xl overflow-hidden p-4 sm:p-6 transition-colors duration-300"
    >
      <h1
        class="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-text-primary tracking-tight"
      >
        Погода в {{ city }}
      </h1>

      <div
        v-if="error"
        class="mb-4 px-4 py-3 rounded-lg bg-input-bg border border-border-primary text-status-danger text-sm transition-colors duration-300"
      >
        {{ error }}
      </div>

      <div v-else-if="weather" class="space-y-4">
        <div class="text-lg sm:text-xl font-semibold text-text-primary">
          {{ weather.name }}, {{ weather.sys.country }}
        </div>

        <div
          class="flex items-center gap-3 p-3 bg-input-bg border border-border-primary rounded-lg transition-colors duration-300"
        >
          <img
            :src="`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`"
            :alt="weather.weather[0]?.description"
            class="w-12 h-12 shrink-0"
          />
          <div class="min-w-0">
            <div class="text-2xl sm:text-3xl font-bold text-text-primary">
              {{ Math.round(weather.main.temp) }}°C
            </div>
            <div class="text-sm text-text-secondary capitalize truncate">
              {{ weather.weather[0]?.description }}
            </div>
          </div>
        </div>

        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <li
            class="p-3 bg-input-bg border border-border-primary rounded-lg text-text-secondary transition-colors duration-300"
          >
            <strong class="text-text-primary">Влажность:</strong>
            {{ weather.main.humidity }}%
          </li>
          <li
            class="p-3 bg-input-bg border border-border-primary rounded-lg text-text-secondary transition-colors duration-300"
          >
            <strong class="text-text-primary">Давление:</strong>
            {{ weather.main.pressure }} гПа
          </li>
          <li
            class="p-3 bg-input-bg border border-border-primary rounded-lg text-text-secondary transition-colors duration-300"
          >
            <strong class="text-text-primary">Ветер:</strong>
            {{ weather.wind.speed }} м/с
          </li>
          <li
            class="p-3 bg-input-bg border border-border-primary rounded-lg text-text-secondary transition-colors duration-300"
          >
            <strong class="text-text-primary">Ощущается как:</strong>
            {{ Math.round(weather.main.feels_like) }}°C
          </li>
        </ul>
      </div>

      <div v-else class="text-text-muted text-sm py-4 text-center">
        Загрузка...
      </div>

      <div class="mt-6">
        <input
          v-model="city"
          type="text"
          placeholder="Название города"
          class="w-full px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all bg-input-bg text-text-primary"
        />
        <button
          @click="loadWeather"
          class="mt-3 w-full px-4 py-2 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-sm sm:text-md rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
        >
          Обновить
        </button>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
const cityInput = ref('')
const searchQuery = ref('')

const { data: weather, pending, error } = await useFetch("server/api/weather.ts", {
  query: { city: searchQuery },
  watch: [searchQuery],
  immediate: false,
})

const handleSearch = () => {
  if (cityInput.value.trim()) {
    searchQuery.value = cityInput.value.trim()
  }
}
</script>

<template>
  <div>
    <h1>Погода</h1>

    <form @submit.prevent="handleSearch">
      <input 
        v-model="cityInput" 
        type="text" 
        placeholder="Введите город..." 
        required 
      />
      <button type="submit" class="cursor-pointer">
        {{ pending ? 'Загрузка...' : 'Поиск' }}
      </button>
    </form>

    <div v-if="error">
      Ошибка: {{ error.statusMessage || 'Не удалось загрузить данные' }}
    </div>

    <div v-if="weather && !pending">
      <h2>{{ weather.location.name }}, {{ weather.location.country }}</h2>
      <p>Координаты: {{ weather.location.latitude }}°, {{ weather.location.longitude }}°</p>
      <p>Высота над уровнем моря: {{ weather.location.elevation }} м</p>

      <h3>Текущие данные</h3>
      <ul>
        <li>Время: {{ weather.current.time }}</li>
        <li>Температура: {{ weather.current.temperature_2m }} °C</li>
        <li>Скорость ветра: {{ weather.current.wind_speed_10m }} м/с</li>
      </ul>

      <h3>Почасовой прогноз (Первые 5 часов)</h3>
      <ul>
        <li v-for="(time, index) in weather.hourly.time.slice(0, 5)" :key="time">
          {{ time }}: {{ weather.hourly.temperature_2m[index] }} °C
        </li>
      </ul>
    </div>
  </div>
</template>
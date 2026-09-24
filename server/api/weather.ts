import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';
import { getQuery } from 'h3'
import type { WeatherResponse } from '~/types/weather';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const city = getQuery(event).city as string | undefined;

  if (!city) {
    return { error: 'Missing query parameter: city' };
  }

  try {
    const data = await $fetch<WeatherResponse>(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        query: {
          q: city,
          appid: config.openWeatherApiKey, 
          units: 'metric',
          lang: 'ru',
        },
      }
    );

    return data;
  } catch (error: unknown) {
    console.error('Weather API error:', error);
    if (error instanceof Error && 'statusCode' in error) {
      throw createError({
        statusCode: (error as any).statusCode,
        statusMessage: (error as any).statusMessage,
      });
    }
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch weather data' });
  }
});

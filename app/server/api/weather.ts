import { fetchWeatherApi } from 'openmeteo'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const city = query.city as string

  if (!city) {
    throw createError({ statusCode: 400, statusMessage: 'City query parameter is required' })
  }

  try {
    const geoUrl = `https://open-meteo.com{encodeURIComponent(city)}&count=1&language=ru`
    const geoResponse = await $fetch<{ results?: Array<{ latitude: number, longitude: number, name: string, country: string }> }>(geoUrl)

    if (!geoResponse.results || geoResponse.results.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'City not found' })
    }

    const { latitude, longitude, name, country } = geoResponse.results[0]!

    const params = {
      latitude,
      longitude,
      hourly: 'temperature_2m',
      current: ['temperature_2m', 'wind_speed_10m'],
    }
    const weatherUrl = 'https://open-meteo.com'
    const responses = await fetchWeatherApi(weatherUrl, params)
    const response = responses[0]!

    const elevation = response.elevation()
    const utcOffsetSeconds = response.utcOffsetSeconds()
    const current = response.current()!
    const hourly = response.hourly()!

    return {
      location: { name, country, latitude, longitude, elevation },
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000).toISOString(),
        temperature_2m: current.variables(0)!.value(),
        wind_speed_10m: current.variables(1)!.value(),
      },
      hourly: {
        time: Array.from(
          { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
          (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000).toISOString()
        ),
        temperature_2m: Array.from(hourly.variables(0)!.valuesArray() || []),
      },
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    })
  }
})
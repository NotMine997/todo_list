
import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope


precacheAndRoute(self.__WB_MANIFEST)


self.addEventListener('push', (event) => {
  if (!event.data) return

  try {

    const payload = event.data.json()

    const title = payload.title || 'Новое уведомление!'
    const options = {
      body: payload.body || 'Кликните, чтобы открыть сайт',
      badge: '',       
      data: {
        url: payload.url || '/'
      }
    }

    event.waitUntil(self.registration.showNotification(title, options))
  } catch (e) {
    console.error('Ошибка обработки push-данных:', e)
  }
})


self.addEventListener('notificationclick', (event) => {
  event.notification.close() 

  const targetUrl = event.notification.data.url


  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {

      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus()
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl)
      }
    })
  )
})

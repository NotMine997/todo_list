
<script setup>
const isSupported = ref(false)

onMounted(() => {
  if (process.client && 'serviceWorker' in navigator && 'PushManager' in window) {
    isSupported.value = true
  }
})

const subscribeToPush = async () => {
  try {

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      alert('Вы запретили уведомления')
      return
    }

    const registration = await navigator.serviceWorker.ready

    const YOUR_PUBLIC_VAPID_KEY = 'BF0cX-qSFtn-PmklXYaeXBGJblyagUr7lMSYoB06iTFgE3KQH170MGfrgCwJ6sZ-5Gm1bHcDDVQztDkqXOzsqwk'
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: YOUR_PUBLIC_VAPID_KEY
    })

    console.log('Данные подписки для бэкенда:', JSON.stringify(subscription))

    await $fetch('/api/save-subscription', {
      method: 'POST',
      body: subscription
    })

    alert('Уведомления успешно настроены!')
  } catch (error) {
    console.error('Ошибка при подписке:', error)
  }
}
</script>

<template>
  <div class="p-8">
    <button 
      if="isSupported"
      @click="subscribeToPush" 
      class="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Включить уведомления на рабочем столе
    </button>
  </div>
</template>

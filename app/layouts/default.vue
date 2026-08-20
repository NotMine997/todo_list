

<template>
    <div class="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
    <Header />
        <slot />
    <Footer />
    </div>
</template>

<script lang="ts" setup>

import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';



</script>

<style>

</style>
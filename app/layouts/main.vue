

<template>
    <div class="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
    <HeaderMain />
        <slot />
    <Footer />
    </div>
</template>

<script lang="ts" setup>

import HeaderMain from '~/components/HeaderMain.vue';
import Footer from '~/components/Footer.vue';



</script>

<style>

</style>
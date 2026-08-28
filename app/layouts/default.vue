

<template>
    <div class="flex min-h-screen flex-col">
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
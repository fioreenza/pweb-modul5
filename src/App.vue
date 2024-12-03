<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue';
import AppNavbar from './components/AppNavbar.vue';
</script>

<template>
    <AppNavbar>
    </AppNavbar>
    <RouterView />
    <AppFooter />
</template>
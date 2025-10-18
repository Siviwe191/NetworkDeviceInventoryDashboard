<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <SideMenu />
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Network Device Inventory Dashboard</v-app-bar-title>

      <v-btn icon @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- Main content goes here -->
       <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import SideMenu from './SideMenu.vue'

// Drawer state
const drawer = ref<boolean>(false)

// Theme setup
const theme = useTheme()
const saved = localStorage.getItem('theme') || 'light'
theme.global.name.value = saved
const current = ref(saved)

// Watch for changes and persist them
watch(
  () => theme.global.name.value,
  (newVal) => {
    localStorage.setItem('theme', newVal)
    current.value = newVal
  }
)

// Toggle between light and dark
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>

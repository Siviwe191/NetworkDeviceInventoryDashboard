<template>
  <v-list>
    <v-list-item
      v-for="[icon, text, to] in links"
      :key="icon"
      link
      :prepend-icon="icon"
      :title="text"
      :to="to"
    />
  </v-list>
</template>
<script lang="ts" setup>
  const links = [
    ['mdi-home-variant-outline', 'Home', '/'],
    ['mdi-devices', 'Devices', '/devices'],
  ]
</script>

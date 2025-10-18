<template>
       <v-list>
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :to="to"
          link
        ></v-list-item>
      </v-list>
</template>
<script lang="ts" setup>
  const links = [
    ['mdi-home-variant-outline', 'Home', '/'],
    ['mdi-devices', 'Devices', '/devices'],
  ];
</script>
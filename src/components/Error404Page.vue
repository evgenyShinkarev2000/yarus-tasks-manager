<template>
  <h2>Страница не найдена</h2>
  <div v-if="redirectedFromPath">
    <h3>Скорее всего ссылка</h3>
    <a>{{ redirectedFromPath }}</a>
    <h3>устарела</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404Page',
  created() {
  },
  computed: {
    redirectedFromPath(): string | null {
      return this.$route.redirectedFrom?.fullPath ?? null;
    }
  }
})
</script>
<template>
    <MainHeader></MainHeader>
    <RouterView></RouterView>
</template>
<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "WorkPlacePage",
    created() {
    },
    computed: {},
    components: { MainHeader }
})
</script>
<style lang="scss"></style>
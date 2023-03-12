<template>

    <Ech :option='option1'></Ech>
    <Ech :option='option2'></Ech>
    <Ech :option='option3'></Ech>
    <Ech :option='option4'></Ech>
    <Ech :option='option5'></Ech>

</template>

<script setup>

import Ech from "./components/ech/ech.vue";
import { option1, option2, option3, option4, option5 } from "./components/option";

</script>

<style scoped>

</style>
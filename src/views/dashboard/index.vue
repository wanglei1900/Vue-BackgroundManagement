<template>
  <div>
    <Card />
    <Sale />
  </div>
</template>

<script>
import Card from "@/views/dashboard/Card";
import Sale from '@/views/dashboard/Sale'

export default {
  name: "Dashboard",
  components: { Card,Sale },
};
</script>

<style scoped>
</style>

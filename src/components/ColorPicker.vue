<template>
  <div class="color-picker-container">
    <h3>Escolha uma cor</h3>

    <color-picker
      v-model:pureColor="color"
      v-model:gradientColor="gradient"
    />

    <div
      class="selected-color"
      :style="{ backgroundColor: color }"
    >
      {{ color }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const color = ref('#ff0000')

const gradient = ref(
  'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)'
)
</script>

<style scoped>
.color-picker-container {
  width: 300px;
}

.selected-color {
  margin-top: 15px;
  padding: 10px;
  border-radius: 30px;
  color: white;
  text-align: center;
}
</style>
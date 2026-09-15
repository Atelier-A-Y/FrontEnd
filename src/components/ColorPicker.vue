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
      <strong>{{ colorName }}</strong>
      <span>{{ color }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['update:colorName'])

const color = ref('#ff0000')

const gradient = ref(
  'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)'
)

// Converte HEX para RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('')
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

// Converte RGB para HSL
function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h
  let s

  const l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min

    s = l > 0.5
      ? d / (2 - max - min)
      : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d) + (g < b ? 6 : 0)
        break

      case g:
        h = ((b - r) / d) + 2
        break

      case b:
        h = ((r - g) / d) + 4
        break
    }

    h /= 6
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  }
}

// Converte HEX para nome da cor
function hexToColorName(hex) {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)

  // Preto
  if (l <= 10) {
    return 'preto'
  }

  // Branco
  if (l >= 90 && s <= 15) {
    return 'branco'
  }

  // Cinza
  if (s <= 15) {
    return 'cinza'
  }

  // Marrom
  if (h >= 15 && h < 45 && l < 50) {
    return 'marrom'
  }

  // Vermelho
  if (h >= 345 || h < 15) {
    return 'vermelho'
  }

  // Laranja
  if (h >= 15 && h < 45) {
    return 'laranja'
  }

  // Amarelo
  if (h >= 45 && h < 75) {
    return 'amarelo'
  }

  // Verde
  if (h >= 75 && h < 165) {
    return 'verde'
  }

  // Azul
  if (h >= 165 && h < 255) {
    return 'azul'
  }

  // Roxo
  if (h >= 255 && h < 285) {
    return 'roxo'
  }

  // Rosa
  if (h >= 285 && h < 345) {
    return 'rosa'
  }

  return 'outra'
}

// Nome da cor é atualizado automaticamente
// sempre que "color" mudar
const colorName = computed(() => {
  return hexToColorName(color.value)
})

watch(colorName, (novoNome) => {
  emit('update:colorName', novoNome)
})
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

  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
```

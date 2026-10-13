<template>
  <div class="color-picker-container">
    <h3>Escolha uma cor</h3>

    <color-picker
      v-model:pureColor="color"
      v-model:gradientColor="gradient"
    />

    <div
      class="selected-color"
      :style="{ backgroundColor: colorHex }"
    >
      <strong>{{ colorName }}</strong>
      <span>{{ colorHex }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits([

  'update:colorName',
  'update:pureColor'
])

const color = ref('#ff0000')

const gradient = ref(
  'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)'
)

// --------------------------------------------------
// Converte RGB/RGBA para HEX
// --------------------------------------------------

function rgbToHex(r, g, b) {
  const red = Math.max(0, Math.min(255, Math.round(r)))
  const green = Math.max(0, Math.min(255, Math.round(g)))
  const blue = Math.max(0, Math.min(255, Math.round(b)))

  return (
    '#' +
    red.toString(16).padStart(2, '0') +
    green.toString(16).padStart(2, '0') +
    blue.toString(16).padStart(2, '0')
  ).toUpperCase()
}

// --------------------------------------------------
// Garante que a cor esteja em HEX
// --------------------------------------------------

function normalizeToHex(value) {
  if (!value) {
    return '#FF0000'
  }

  const valor = String(value).trim()

  // Já é HEX
  if (/^#[0-9A-Fa-f]{6}$/.test(valor)) {
    return valor.toUpperCase()
  }

  // HEX de 3 caracteres
  if (/^#[0-9A-Fa-f]{3}$/.test(valor)) {
    const hex = valor.substring(1)

    return (
      '#' +
      hex[0] +
      hex[0] +
      hex[1] +
      hex[1] +
      hex[2] +
      hex[2]
    ).toUpperCase()
  }

  // RGB ou RGBA
  const rgbMatch = valor.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)$/i
  )

  if (rgbMatch) {
    return rgbToHex(
      Number(rgbMatch[1]),
      Number(rgbMatch[2]),
      Number(rgbMatch[3])
    )
  }

  // Se não conseguir identificar a cor,
  // mantém vermelho como padrão
  return '#FF0000'
}

// --------------------------------------------------
// HEX usado no componente
// --------------------------------------------------

const colorHex = computed(() => {
  return normalizeToHex(color.value)
})

// --------------------------------------------------
// Converte HEX para RGB
// --------------------------------------------------

function hexToRgb(hex) {
  const valor = normalizeToHex(hex).replace('#', '')

  const r = parseInt(valor.substring(0, 2), 16)
  const g = parseInt(valor.substring(2, 4), 16)
  const b = parseInt(valor.substring(4, 6), 16)

  return { r, g, b }
}

// --------------------------------------------------
// Converte RGB para HSL
// --------------------------------------------------

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0
  let s = 0

  const l = (max + min) / 2

  if (max !== min) {
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

// --------------------------------------------------
// Converte HEX para nome da cor
// --------------------------------------------------

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

// --------------------------------------------------
// Nome da cor
// --------------------------------------------------

const colorName = computed(() => {
  return hexToColorName(colorHex.value)
})

// --------------------------------------------------
// Envia o HEX para o componente pai
// --------------------------------------------------

watch(
  colorHex,
  (novaCor) => {
    console.log('HEX selecionado:', novaCor)

    emit('update:pureColor', novaCor)
  },
  { immediate: true }
)

// --------------------------------------------------
// Envia o nome da cor para o componente pai
// --------------------------------------------------

watch(
  colorName,
  (novoNome) => {
    console.log('Nome da cor:', novoNome)

    emit('update:colorName', novoNome)
  },
  { immediate: true }
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

  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
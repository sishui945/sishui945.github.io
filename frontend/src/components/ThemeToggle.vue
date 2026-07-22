<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const btnRef = ref<HTMLElement | null>(null)

function onThemeChange(e: Event) {
  const detail = (e as CustomEvent).detail as 'dark' | 'light'
  const shouldBeDark = detail === 'dark'
  if (theme.isDark !== shouldBeDark) {
    theme.toggle()
  }
}

onMounted(() => {
  btnRef.value?.addEventListener('change', onThemeChange)
})

onUnmounted(() => {
  btnRef.value?.removeEventListener('change', onThemeChange)
})
</script>

<template>
  <theme-button
    ref="btnRef"
    :value="theme.isDark ? 'dark' : 'light'"
    size="1.2"
    class="scale-75"
  />
</template>

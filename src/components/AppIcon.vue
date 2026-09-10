<script setup>
/**
 * Small inline icon set for the customer dashboard, drawn as simple
 * Feather-style strokes that inherit `currentColor`. These are hand-built
 * recreations of the glyphs shown in the Figma screenshot — swap in the exact
 * exported Figma icons if/when they become available.
 */
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

const icons = {
  bell: ['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 0 1-3.4 0'],
  gear: [
    'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
    'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z',
  ],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  plus: ['M12 5v14', 'M5 12h14'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  'check-circle': ['M22 11.1V12a10 10 0 1 1-5.9-9.1', 'M22 4L12 14l-3-3'],
  history: ['M3 3v6h6', 'M3.5 9a9 9 0 1 0 2-3.6L3 9', 'M12 8v4l3 2'],
  washer: [
    'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
    'M12 18a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z',
    'M8 6h.01',
  ],
  waves: ['M2 11q2-3 4 0t4 0t4 0t4 0', 'M2 16q2-3 4 0t4 0t4 0t4 0'],
  spin: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
  hanger: ['M12 4a2 2 0 1 0 1.2 3.6c-.5.3-.8.8-.8 1.4L20.5 14a2 2 0 0 1 1 1.7V17a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-1.3a2 2 0 0 1 1-1.7l8.7-5'],
  inbox: [
    'M22 12h-6l-2 3h-4l-2-3H2',
    'M5.5 5.1L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z',
  ],
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in icons[name]" :key="i" :d="d" />
  </svg>
</template>

<script setup>
/**
 * Small inline icon set for the customer screens (Dashboard, Services,
 * Book Now), drawn as simple Feather-style strokes that inherit `currentColor`.
 * These are hand-built recreations of the glyphs shown in the Figma
 * screenshots — swap in the exact exported Figma icons if/when they become
 * available.
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
  // Book Now — logistics + payment glyphs (screenshot approximations)
  truck: [
    'M1 4h15v12H1z',
    'M16 8h4l3 3v5h-7z',
    'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    'M18.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  ],
  store: ['M3 8l1.8-4h14.4L21 8', 'M4 8v12h16V8', 'M3 8h18', 'M9 20v-5h6v5'],
  walk: [
    'M14 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
    'M12 6v7',
    'M12 13l-3 7',
    'M12 13l3 7',
    'M12 8l-4 2',
    'M12 8l4 2',
  ],
  cash: ['M2 6h20v12H2z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 9h.01', 'M18 15h.01'],
  card: ['M2 5h20v14H2z', 'M2 10h20', 'M5 15h5'],
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

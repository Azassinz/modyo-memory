<template>
  <div
    class="Card flex w-full cursor-pointer items-center justify-center rounded-lg border-4 border-black bg-slate-400"
  >
    <img
      v-if="selected || flipped"
      :src="image"
      class="h-full w-full rounded object-cover"
      :class="{ grayscale: !flipped }"
      data-test="image"
      :alt="`${title} Card`"
    />
    <p v-else class="text-6xl" data-test="number">{{ number }}</p>
  </div>
</template>

<script>
export default {
  props: {
    flipped: Boolean,
    image: String,
    number: Number,
    selected: Boolean,
    title: String
  }
};
</script>

<style>
.Card {
  @apply h-24 sm:h-32 md:h-36 lg:h-40 xl:h-48;
}
</style>

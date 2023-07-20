<template>
  <div
    class="Card cursor-pointer border-black border-4 rounded-lg bg-slate-400 flex justify-center items-center w-full"
  >
    <img
      v-if="selected || flipped"
      :src="image"
      class="h-full w-full object-cover rounded"
      :class="{ grayscale: !flipped }"
    />
    <p v-else class="text-6xl">{{ number }}</p>
  </div>
</template>

<script>
export default {
  props: {
    flipped: Boolean,
    image: String,
    number: Number,
    selected: Boolean
  }
};
</script>

<style>
.Card {
  @apply h-24 sm:h-32 md:h-36 lg:h-40 xl:h-48;
}
</style>

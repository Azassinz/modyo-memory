<template>
  <WelcomePage v-if="!name" @saveName="saveName" />
  <div v-else>
    <div class="my-2 flex justify-evenly">
      <p class="text-2xl font-medium text-green-600">Aciertos: {{ hits }}</p>
      <p class="text-2xl font-medium text-red-600">Errores: {{ miss }}</p>
    </div>
    <div class="grid-rows-auto relative grid grid-cols-4 justify-items-center gap-2 md:grid-cols-5">
      <ImageCard
        v-for="(image, index) in images"
        :key="index"
        class="h-full w-full rounded-lg"
        :image="image.url"
        :number="index + 1"
        :selected="selectedCards.includes(index)"
        :flipped="matchedCards.includes(image.uuid)"
        @click="selectedCards.length < 2 && selectedCards.push(index)"
      />
      <div
        v-if="images.length && matchedCards.length == images.length / 2"
        class="absolute inset-0 z-10 flex w-full justify-center bg-slate-100/50"
      >
        <button
          class="self-center rounded-lg border-4 border-black bg-slate-400 p-2"
          @click="restartGame"
        >
          <p class="self-center text-4xl font-medium">¡Ganaste {{ name }}!</p>
          <br />
          <p class="text-base font-medium">Jugar de nuevo</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

import ImageCard from './components/ImageCard.vue';
import WelcomePage from './components/WelcomePage.vue';

export default {
  components: {
    ImageCard,
    WelcomePage
  },
  setup() {
    const nameInput = ref('');
    const name = ref('');
    const images = ref([]);
    const hits = ref(0);
    const miss = ref(0);
    const selectedCards = ref([]);
    const matchedCards = ref([]);

    const increaseHits = () => {
      hits.value++;
    };

    const increaseMiss = () => {
      miss.value++;
    };

    const saveName = (newName) => {
      localStorage.name = newName;
      name.value = newName;
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const fecthImages = () => {
      fetch(
        'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
      )
        .then((response) => response.json())
        .then((data) => {
          // clean entries to only work with the images data
          let imagesArray = data.entries.map((entry) => entry.fields.image);
          // shuffle so the game can be played with different images on each run
          shuffleArray(imagesArray);
          // get only first 10 images and duplicate them
          imagesArray = imagesArray.slice(0, 10).flatMap((el) => [el, el]);
          shuffleArray(imagesArray);
          images.value = imagesArray;
        });
    };

    const restartGame = () => {
      images.value = [];
      matchedCards.value = [];
      hits.value = 0;
      miss.value = 0;
      fecthImages();
    };

    if (localStorage.name) {
      name.value = localStorage.name;
    }

    fecthImages();

    watch(
      () => [...selectedCards.value],
      (currentValue) => {
        if (currentValue.length == 2) {
          if (images.value[currentValue[0]].uuid === images.value[currentValue[1]].uuid) {
            increaseHits();
            matchedCards.value.push(images.value[currentValue[0]].uuid);
          } else {
            increaseMiss();
          }
          setTimeout(() => {
            selectedCards.value = [];
          }, 1000);
        }
      }
    );

    return {
      hits,
      images,
      increaseHits,
      increaseMiss,
      matchedCards,
      miss,
      name,
      nameInput,
      restartGame,
      saveName,
      selectedCards
    };
  }
};
</script>

<template>
  <div class="md:w-2/4 mx-auto">
    <h1 class="text-5xl text-center text-sky-950 font-medium my-3">
      ¡Bienvenido al juego de Memorama!
    </h1>
    <h2 class="font-mono text-xl text-sky-950">Reglas:</h2>
    <ol class="list-disc list-inside text-base">
      <li>
        El jugador debe ir volteando las cartas intentando adivinar las cartas que se repiten.
      </li>
      <li>Todas las cartas se encuentran repetidas 1 vez en el tablero.</li>
      <li>Por cada turno puedes voltear 2 cartas.</li>
      <li>Si las cartas no coinciden, sumarás 1 punto de error en el marcador.</li>
      <li>Si las cartas coinciden, sumarás 1 punto de acierto en el marcador.</li>
      <li>
        Las cartas que aciertes quedarán boca arriba, mientras que las cartas de error
        volveran a quedar boca abajo.
      </li>
    </ol>
    <p class="font-mono text-lg text-center text-sky-950 mt-4">
      Introduce tu nombre y da enter para comenzar
    </p>
    <input
      class="flex mx-auto my-2"
      type="text"
      ref="nameInput"
      autofocus
      placeholder="Nombre"
      required
      @keyup.enter="emitName"
    />
    <div class="absolute inset-x-0 bottom-0 mx-4">
      <p class="font-mono text-center">Desarrollado usando Vue.js y Tailwind CSS por David López</p>
      <div class="flex wrap justify-evenly">
        <VueIcon class="w-20" />
        <TailwindIcon class="w-20" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import TailwindIcon from './icons/IconTailwind.vue';
import VueIcon from './icons/IconVue.vue';

export default {
  components: {
    TailwindIcon,
    VueIcon
  },
  setup(_, { emit }) {
    const nameInput = ref('');

    const emitName = () => {
      const newName = nameInput.value.value;
      emit('saveName', newName);
    };

    return { emitName, nameInput };
  }
};
</script>

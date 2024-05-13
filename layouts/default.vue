<script setup>
// Masterball colors
//60% zinc
//30% #BC40F0
//10% ##F040CC
</script>

<template>
  <div class="bg-zinc-100">
    <header>
      <h1 class="font-semibold text-center text-4xl bg-[#BC40F0] text-zinc-100">Pokemon Searcher</h1>
      <nav>
        <ul class="flex justify-end space-x-4 p-4 font-bold bg-[#BC40F0] text-zinc-100">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/pokemon">Pokemon</NuxtLink></li>
          <li><NuxtLink to="/items">Items</NuxtLink></li>
          <li><NuxtLink to="/berries">Berries</NuxtLink></li>
          <li><NuxtLink to="/moves">Moves</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>

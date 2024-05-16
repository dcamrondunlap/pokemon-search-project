<script setup>
// Masterball colors
//60% zinc
//30% #BC40F0
//10% #F040CC
</script>

<template>
  <div class="bg-zinc-100 min-h-screen">
    <header>
      <h1 class="font-semibold text-center text-4xl bg-[#BC40F0] text-zinc-100">Pokemon Searcher</h1>
      <nav>
        <ul class="flex justify-center space-x-4 p-4 font-bold bg-[#BC40F0] text-zinc-100">
          <li><NuxtLink to="/" class="hover:text-[#F040CC]">Home</NuxtLink></li>
          <li><NuxtLink to="/pokemon" class="hover:text-[#F040CC]">Pokemon</NuxtLink></li>
          <li><NuxtLink to="/items" class="hover:text-[#F040CC]">Items</NuxtLink></li>
          <li><NuxtLink to="/berries" class="hover:text-[#F040CC]">Berries</NuxtLink></li>
          <li><NuxtLink to="/moves" class="hover:text-[#F040CC]">Moves</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>

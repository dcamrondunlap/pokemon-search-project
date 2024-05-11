<script setup>
// Masterball colors
//60% white (might use a slightly darker white)
//30% #AC13EC
//10% #EC13BF
</script>

<template>
  <div class="bg-zinc-100">
    <header>
      <nav>
        <ul class="flex justify-end space-x-4 p-4 font-bold bg-blue-500">
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

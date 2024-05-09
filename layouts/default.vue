<script setup>

</script>

<template>
  <div class="">
    <header>
      <nav>
        <ul class="flex justify-end space-x-4 p-4 font-bold">
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

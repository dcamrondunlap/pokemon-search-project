<script setup>
const {berries} = fetchBerries();
</script>

<template>
  <div class="grid grid-cols-1 justify-items-center sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-10 ">
    <div v-for="berry in berries" :key="berry.name" class="relative flex flex-col mt-6 text-gray-700 bg-white  bg-clip-border rounded-xl w-80 shadow-sm shadow-[#EC13BF] hover:bg-[#F040CC] min-[360px]:w-36">
      <div class="p-2">
        <NuxtLink :to="`/berries/${berry.id}`">
          <h5 class="block font-sans mb-2 text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 uppercase">
            {{ berry.name.charAt(0).toUpperCase() + berry.name.slice(1) }}
          </h5>
        </NuxtLink>
        <p class="block font-sans text-base antialiased leading-relaxed text-inherit">
          Firmness:  <br>{{  berry.firmness }} <br>
          Flavor: <br>{{  berry.flavors.join(', ') }}<br/>
          Growth Time (in hours):<br/>{{ berry.growth_time }}<br/>
          Size: <br/>{{ berry.size }}<br/>
          Smoothness: <br/>{{ berry.smoothness }}<br/>
          Soil Dryness:<br/>{{ berry.soil_dryness }}<br/>
        </p>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="row justify-center">
    <div class="chart-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  background-color: white;
  height: 60vh;
  width: 80vw;
  /* object-fit: contain; */
  /* min-width: 100%; */
}
</style>

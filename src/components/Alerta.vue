<template>
  <div class="alerta">
      <slot></slot>
  </div>
</template>

<style>
  .alerta {
      text-align: center;
      margin-bottom: 2rem;
      color: var(--blanco);
      background-color: rgb(174, 0, 0);
      text-transform: uppercase;
      font-weight: 700;
      font-size: 1.4rem;
      padding: .5rem
  }
</style>
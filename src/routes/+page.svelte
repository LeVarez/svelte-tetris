<script lang="ts">
  import Tetris from "$lib/Tetris.svelte";
</script>

<div class="page-container">
  <h1>
    TETRIS
  </h1>
  <Tetris />

  <button class="start-button">
    START
  </button>
</div>

<style>
  :global(body) {
    margin: 0 !important;
  }
  .page-container {
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: #d3d3d3;
  }

  .start-button {
    background-color: #dedede;
  }
</style>
<script lang="ts">
  import Tetris from "$lib/Tetris.svelte";

  let start = false;
  let fallInterval: 1000;
  let gameOver = false;
  let resetGame: any;

  const handleClick = () => {
    start = !start;
    if (gameOver) {
      resetGame();
      gameOver = false;
      start = true;
    }
  }

  const getText = (gameOver: boolean, start: boolean) => {
    if (gameOver) return 'TRY AGAIN';
    if (start) return 'PAUSE'
    return 'PLAY'
  }

  $: buttonText = getText(gameOver, start);
</script>

<div class="page-container">
  <h1>
    TETRIS
  </h1>
  <Tetris bind:start bind:fallInterval bind:gameOver bind:resetGame/>

  <button class="start-button" on:click={handleClick}>
    {buttonText}
  </button>
  Speed
  <input type="range" bind:value={fallInterval} min="100" max="2000"/>
</div>

<style>
  :global(body) {
    margin: 0 !important;
    font-family: monospace;
  }
  .page-container {

    display: grid;
    place-items: center;
    height: 100vh;
    background-color: #d3d3d3;
  }

  .start-button {
    all: unset;
    cursor: pointer;
    font-size: 28px;
    background-color: #505050;
    color: #f5deb3;
    padding: 5px;
    border-radius: 5px;
  }

  .start-button:hover {
    background-color: #f5deb3;
    color: #505050;
  }
</style>
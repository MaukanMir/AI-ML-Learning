<script lang="ts">
  export let name: string = 'World';
</script>
<main>
  <h1>Hello {name}!</h1>
</main>
<style>
  main {
    text-align: center;
    color: purple;
  }

  /* $ npm create vite
? Project name: › chat_frontend
? Select a framework:  Svelte
? Select a variant: TypeScript */

/* $ cd chat_frontend
$ npm add axios@1.6.7 svelte-routing@2.11.0
$ npm install */
</style>
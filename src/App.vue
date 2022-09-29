<template>
  <navbar/>

  <div class="main">
    <RouterView />
      
    <p></p>
  </div>
  
  <footer>
    <div class="footerText">
      <p>Created by <a href="https://github.com/emiyl" target="_blank">emiyl</a>.</p>
      <p>If you need further help, ask on the official Cemu <a href="https://discord.gg/5psYsup" target="_blank">Discord Server</a> for assistance.</p>
    </div>
  </footer>
</template>

<style>
  @import '@/assets/main.scss';
</style>
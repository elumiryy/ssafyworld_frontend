<template>
  <main class='blue'>
        <br>
        <div>A problem has been detected and Yerimjirim has been shut down to prevent
            damage to your computer.
        </div>

        <br>
        <br>

        <div>If this is the first time you've seen this Stop error screen,<br>
        restart your computer. If this screen appears again. follow <br>
        thest steps:
        </div>
        <br>
        <div>Check to make sure any new hardware or software is property instailed. <br>
        If this is a new installatio. ask your hardware or software manufacturer<br>
        for any Yerimjirim updates you might need.
        </div>
        <br>
        <div>
            If problems continue. disable or remove any newly installed hardware <br>
            or software. Disable BIOS memory options such as caching or shadowing.<br>
            If you need to use Safe Mode to remove or disable components. restart <br>
            your computer. press F8 to select Advanced Startup Options, and then <br>
            selct Safe Mode.
        </div>
        <br>

        <div>Technical information:</div>
        <br>
        <div>*** STOP: 0xC000218 (0x00060010,0x00000000,0x00000000,0x00000000) </div>
    </main>
</template>

<script setup>

</script>

<style scoped>
    .blue {
        position: relative;
        z-index: 1;
        background-color: #000080;
        height: 95vh;
    }
   
    div {
        color : white;
        font-size: 30px;
    }
  
</style>
<template>
    <div class="blue">
        <label>
            A problem has been detected and Yerimjirim has been shut down to prevent
            damage to your computer.
        </label>
        <label>
            If this is the first time you've seen this Stop error screen,
            restart your computer. If this screen appears again. follow 
            thest steps:
        </label>
        <label>
            Check to make sure any new hardware or software is property instailed.
            If this is a new installatio. ask your hardware or software manufacturer
            for any Yerimjirim updates you might need.
        </label>
        <label>
            If problems continue. disable or remove any newly installed hardware 
            or software. Disable BIOS memory options such as caching or shadowing.
            If you need to use Safe Mode to remove or disable components. restart 
            your computer. press F8 to select Advanced Startup Options, and then 
            selct Safe Mode.
        </label>
        <label>Technical information:</label>
        <label>*** STOP: 0xC000218 (04x1120880,04x1127290,04x1122333,04x1125983, 04x1129001)</label>
    </div>
</template>
<script setup>

</script>
<style scoped>
    .blue {
        height: 100vh;
        padding: 30px;
        background-color: #000080;
    }

    label {
        padding: 20px 0;
        margin: 0;
        color : #D5E4FF;
        font-size: x-large;
    }
</style>
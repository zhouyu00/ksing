<template>
  <div id="sRcdBtn">
      <Button type="primary"  @click="toStopRecording">停止录制</Button>
  </div>
</template>
<script>
  export default {
    name:'sRcdBtn',
    props:['recording','recorder','paused'],
    methods:{
      toStopRecording:function(){
        this.$emit('update:recording',false);
        this.$emit('update:paused',false);
        this.recorder.stop();
      }
    }
  }
</script>

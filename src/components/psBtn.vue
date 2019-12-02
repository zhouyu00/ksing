<template>
  <Button type="primary" @click="toPause">
    <span v-if="!paused">暂停</span>
    <span v-else>恢复</span>
  </Button>
</template>
<script>
  export default{
    name:'psBtn',
    props:['recorder','paused','recording'],
    methods:{
      toPause:function(){
        console.log(this.recording);
        console.log(this.paused);
        let pausedStatus = this.recording&&!this.paused;
        console.log(pausedStatus);
        if(pausedStatus){
          this.recorder.pause();
        }
        else{
          this.recorder.resume();
        }
        this.$emit("update:paused",pausedStatus);
      }
    }
  }
</script>

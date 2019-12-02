<template>
  <div id="plyBtn">
      <Button type="primary" @click="rcdPlay">播放</Button>
  </div>
</template>

<script>
  export default {
    name:'plyBtn',
    props:['recorder','playing'],
    methods:{
      rcdPlay:function(){
        this.recorder.play();
        this.$emit("update:playing",true);
      }
    }
  }
</script>

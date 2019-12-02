<template>
  <div id="rcdBtn">
    <Button type="primary" :loading="recording"  @click="toRecording">
      <span v-if="!recording">开始录制</span>
      <span v-else>录制中...</span>
    </Button>
  </div>

</template>
<script>
  export default {
    name:'rcdBtn',
    // data:function(){
    //   return {
    //     recording: false
    //   }
    // },
    props:['recording','recorder'],
    methods:{
      toRecording:function(){
        this.recorder.start().then(()=>{
            //开始录制
            this.$emit('update:recording',true);
            }, (error)=>{
            //出错
            console.log(`${error.name} : ${error.message}`);
          });
      }
    }
  }
</script>

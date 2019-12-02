<template>
  <div id="recordComponent">
      <Row type="flex" justify="space-around" align="middle">
        <Col span="4"><rcd-btn :recording.sync="recording" :recorder="recorder"></rcd-btn></Col>
        <Col span="4"><s-rcd-btn :recording.sync="recording" :paused.sync="paused" :recorder="recorder"></s-rcd-btn></Col>
        <Col span="4"><ps-btn :recording="recording" :paused.sync="paused" :recorder="recorder" ></ps-btn></Col>
        <Col span="4"><ply-btn :recorder="recorder" :playing.sync="playing"></ply-btn></Col>
      </Row>
      <Row>
        <Col><wave></wave></Col>
      </Row>
  </div>
</template>

<script>
  import Recorder from 'js-audio-recorder';
  import RcdBtn from "./rcdBtn";
  import SRcdBtn from "./sRcdBtn";
  import PlyBtn from "./plyBtn";
  import PsBtn from "./psBtn";
  import Wave from "./wave";

  export default {
    name:'recordComponent',
    components: {Wave, PsBtn, PlyBtn, SRcdBtn, RcdBtn},
    mounted() {
      // this.recorder=new Recorder({
      //   sampleBits:16,//采样位数，支持8或16，默认16
      //   sampleRate:16000,//
      //   numChannels:1,//声道，支持1或2，默认1
      //   compiling:false,//是否边录边转换
      // });
      },
    data:function(){
      return {
        recording:false,
        paused:false,
        playing:false,
        recorder:new Recorder({
          sampleBits:16,//采样位数，支持8或16，默认16
          sampleRate:16000,//
          numChannels:1,//声道，支持1或2，默认1
          compiling:false,//是否边录边转换
        }),

      };
    }
  }

</script>

<style>

</style>

<template>
  <div id="recordComponent">
      <Row type="flex" justify="space-around" align="middle">
        <Col span="4">
          <div id="rcdBtn">
            <Button type="primary" :loading="recording"  @click="toRecord">
              <span v-if="!recording">开始录制</span>
              <span v-else>录制中...</span>
            </Button>
          </div>
        </Col>
        <Col span="4">
          <div id="sRcdBtn">
            <Button type="primary"  @click="toStopRecord">停止录制</Button>
          </div>
        </Col>
        <Col span="4">
          <div id="psBtn">
            <Button type="primary" @click="toPause">
              <span v-if="!paused">暂停</span>
              <span v-else>恢复</span>
            </Button>
          </div>
        </Col>
        <Col span="4">
          <div id="plyBtn">
            <Button type="primary" @click="toPlay">播放</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div id="wave">
           <canvas id="cas" width="500" height="500"></canvas>
          </div>
        </Col>
      </Row>
  </div>
</template>

<script>
  import Recorder from 'js-audio-recorder';
  //import eventbus from "./eventBus"

  export default {
    name:'recordComponent',
    //components: {Wave, PsBtn, PlyBtn, SRcdBtn, RcdBtn},
    mounted() {
      //eventbus.$on('');
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
    },
    methods:{
      toRecord:function(){
        this.recorder.start().then(()=>{
          //开始录制
          this.recording = true;
        }, (error)=>{
          //出错
          console.log(`${error.name} : ${error.message}`);
        });
        this.toDrawWave();
      },
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
        this.paused = pausedStatus;
      },
      toStopRecord:function(){
        this.recording=false;
        this.paused=false;
        this.recorder.stop();
      },
      toPlay:function() {
        this.recorder.play();
        this.playing=true;
        this.toDrawWave();
      },
      toDrawWave:function(){
        this.canvas = document.querySelector("#cas");
        this.canvasCtx = this.canvas.getContext('2d');
        //统一AudioContext对象
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        //实例化AudioContext对象
        let audioContext = new AudioContext();
        this.draw();
      },
      draw:function(){
        let drawVisual = requestAnimationFrame(this.draw);
        let canvasCtx = this.canvasCtx;
        let dataArray = this.recorder.getRecordAnalyseData();
        //绘制图像框
        const WIDTH = 500;
        const HEIGHT =500;
        canvasCtx.fillStyle='rgb(240,240,240)';
        canvasCtx.fillRect(0,0,WIDTH,HEIGHT);

        let arrayLength = dataArray.length;
        let itemWidth =(WIDTH/arrayLength);
        let itemHeight;
        let x =0;
        for(let i=0;i<arrayLength;i++) {
          itemHeight = dataArray[i]*2;
          //绘制波形图
          canvasCtx.fillStyle = 'rgb(' + (itemHeight + 100) + ',50,50)';
          canvasCtx.fillRect(x, 500-itemHeight, itemWidth, itemHeight);
          x += itemWidth + 1;
        }
      }
    }
  }

</script>

<style>

</style>

<template>
  <div id="wave">
    <canvas id="cas" width="500" height="500"></canvas>
  </div>
</template>

<script>
    import Recorder from "js-audio-recorder";

    export default {
      name: "wave",
      props:['recorder'],
      computed:{
      },
      mounted(){
        this.drawProcess();
      },
      methods:{
        drawProcess:function(){
          this.canvas = document.querySelector("#cas");
          this.canvasCtx = this.canvas.getContext('2d');
          //统一AudioContext对象
          let AudioContext = window.AudioContext || window.webkitAudioContext;
          //实例化AudioContext对象
          let audioContext = new AudioContext();
          //数据来源
          //let source = this.recorder?this.recorder.getRecordAnalyseData():new Uint8Array(1024);

          //解码并调用回调函数
          // audioContext.decodeAudioData(source.buffer,function(buffer){
          //   //创建分析器
          //   let analyser = audioContext.createAnalyser();
          //   let audioBufferSourceNode = audioContext.createBufferSource();
          //   audioBufferSourceNode.connect(analyser);
          //   //analyser.connect(audioContext.destination);
          //   audioBufferSourceNode.buffer=buffer;
          //   audioBufferSourceNode.start();
          //   this.draw(source);
          // });
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
            itemHeight = dataArray[i];
            //绘制波形点
            canvasCtx.fillStyle = 'rgb(' + (itemHeight + 100) + ',50,50)';
            canvasCtx.fillRect(x, 500-itemHeight, itemWidth, itemHeight);
            x += itemWidth + 1;
          }
        }
      }
    }
</script>

<style scoped>

</style>

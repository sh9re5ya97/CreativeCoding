const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
  //dimensions:  'A4',
  orientation: 'landscape',
  animate:true
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle='black';

    // y+=velocity;

    // if(y>=1080 || y<=0){

    // }
     context.beginPath();

    for(let i=0;i<200;i++){
       context.lineWidth=Math.random()*5;
       context.rect(Math.random()*2048,Math.random()*2048,Math.random()*50,Math.random()*50);
       context.stroke();
     }
 
  };
};

canvasSketch(sketch, settings);

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
  //dimensions:  'A4',
  orientation: 'landscape',
  animate:true
};

const sketch = () => {
  let y=500;
  let velocity=30;
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle='black';

    y+=velocity;

    if(y>=1080 || y<=0){
        //bounce
        velocity*=-1
    }
     
    context.beginPath();
    context.arc(500,y,20,0,Math.PI*2);
    context.fill();

 
  };
};

canvasSketch(sketch, settings);

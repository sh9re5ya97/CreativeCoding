const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
  //dimensions:  'A4',
  orientation: 'landscape'
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    const recWidth=width*0.01;
    const recHeight=height*0.1;

    context.fillStyle='black';
    context.beginPath();

   for(let i=0;i<200;i++){
      context.lineWidth=Math.random()*5;
      context.rect(Math.random()*2048,Math.random()*2048,Math.random()*50,Math.random()*50);
      context.stroke();
    }

    setTimeout(sketch,1000)
    
  };
};

canvasSketch(sketch, settings);

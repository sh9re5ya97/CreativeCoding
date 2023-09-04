const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
  //dimensions:  'A4',
  orientation: 'landscape',
  animate:true
};

const sketch = () => {
  let circles=[];
  for(let i=0;i<300;i++){
    circles.push(new Circle(Math.random()*2048,Math.random()*2048,Math.random()*20+5));
  }
  return ({ context, width, height }) => {
    // for(let i=0;i<5;i++){
    //   circles.push(new Circle(Math.random()*2048,Math.random()*2048,Math.random()*30));
    // }
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    //context.fillStyle='black';
    context.lineWidth=4;
    circles.forEach(circle=>{
      circle.draw(context);
      circle.move();
      circle.bounce(width,height);
    })
  };
};

canvasSketch(sketch, settings);

class Circle{
  constructor(x,y,radius,color,velocityX,velocityY){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=this.randomColorGen();
    this.velocityX=Math.random()*4-2;
    this.velocityY=Math.random()*4-2;
  }

  draw(context){
    context.strokeStyle=this.color;
    context.beginPath();
    context.arc(this.x,this.y,this.radius,0,Math.PI*2);
    context.stroke();
  }
  randomColorGen(){
    let blueValue = (Math.floor(Math.random() * 150)+156).toString(16).padStart(2, '0');
        let greenValue = (Math.floor(Math.random() * 200)).toString(16).padStart(2, '0');
        let redValue = (Math.floor(Math.random() * 250)+156).toString(16).padStart(2, '0');
    
      // Combine the blue value with fixed red and green values for shades of blue
      return `#${redValue}${greenValue}${blueValue}`;
  }
  move(){
      this.x+=this.velocityX;
      this.y+=this.velocityY;
  }

  bounce(width,height){
    if(this.x<=0 || this.x>=width){
      this.velocityX*=-1;
    }
    if(this.y<=0 || this.y>=height){
      this.velocityY*=-1;
    }
  }
}
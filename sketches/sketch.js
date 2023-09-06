const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
  //dimensions:  'A4',
  orientation: 'landscape',
  animate:true
};

// const canvas = document.getElementsByTagName("canvas"); // Replace "myCanvas" with your canvas ID
// canvas.addEventListener("click", function(event) {
//     for(let i=0;i<1;i++){
//       circles.push(new Circle(Math.random()*2048,Math.random()*2048,Math.random()*20+5));
//     }
// });
const sketch = (context) => {
  let circles=[];
  for(let i=0;i<5;i++){
    circles.push(new Circle(Math.random()*2048,Math.random()*2048,Math.random()*20+5));
  }
    context.canvas.addEventListener('click',(e)=>{
      // if(circles.length<300){
        // for(let i=0;i<1;i++){
          circles.push(new Circle(Math.random()*2048,Math.random()*2048,Math.random()*20+5));
        // }
      // }
  })
  
  return ({ context, width, height }) => {
    
  
   
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle='black';
    context.strokeStyle = 'light grey';
    for(let i=0;i<circles.length;i++){
      const circle1=circles[i];  
      for(let j=0;j<circles.length;j++){
        const circle2=circles[j];
        const distance=getDistance(circle1.x,circle2.x,circle1.y,circle2.y)
        if(distance<250){
            // context.strokeStyle =randomColorGen() ;
          context.strokeStyle ='black';
          context.lineWidth=10-distance/25;
          context.beginPath();
          context.moveTo(circle1.x,circle1.y);
          context.lineTo(circle2.x,circle2.y);
          context.stroke();
        }
        
      }
    }
    
    context.lineWidth=8;
    circles.forEach(circle=>{
      circle.draw(context);
      circle.move();
      circle.bounce(width,height);
    })
  };
};

console.log(sketch)

const getDistance=(x1,x2,y1,y2)=>{
  const a = x2-x1;
  const b = y2-y1;
  return Math.sqrt(a*a+b*b);
}

const randomColorGen=()=>{
  let blueValue = (Math.floor(Math.random() * 150)+156).toString(16).padStart(2, '0');
      let greenValue = (Math.floor(Math.random() * 150)+156).toString(16).padStart(2, '0');
      let redValue = (Math.floor(Math.random() * 150)+156).toString(16).padStart(2, '0');
  
    // Combine the blue value with fixed red and green values for shades of blue
    return `#${redValue}${greenValue}${blueValue}`;
}
canvasSketch(sketch, settings);

class Circle{
  constructor(x,y,radius,color,velocityX,velocityY){
    this.x=x;
    this.y=y;
    this.radius=radius;
    //this.color=this.randomColorGen();
    this.color='black';
    this.velocityX=Math.random()*4-2;
    this.velocityY=Math.random()*4-2;
  }

  draw(context){
    context.strokeStyle=this.color;
    context.beginPath();
    context.arc(this.x,this.y,this.radius,0,Math.PI*2);
    context.stroke();
    context.fillStyle='white';
    context.fill();
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
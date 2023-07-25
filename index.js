const canvas=document.getElementById("my-canvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
console.log(ctx);

function randomColor(){
    var blueValue = (Math.floor(Math.random() * 150)).toString(16).padStart(2, '0');
        var greenValue = (Math.floor(Math.random() * 100)).toString(16).padStart(2, '0');
        var redValue = (Math.floor(Math.random() * 150)).toString(16).padStart(2, '0');
    
      // Combine the blue value with fixed red and green values for shades of blue
      return`#${redValue}00${blueValue}`;
}
class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.radius=3;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle = randomColor();
        ctx.fill();
    }
}

let points=[];
let count=0;
let clickCount=0;
let timeGap=50;

// //Top
// const Top=new Point(window.innerWidth/2,50);
// Top.draw();
// //Left
// const Left=new Point(50,window.innerHeight-50);
// Left.draw();
// //Right
// const Right=new Point(window.innerWidth-50,window.innerHeight-50);
// Right.draw();

//const triangle=[Top,Left,Right];
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}
function drawRest(prevPnt){
    let vertex,midPnt;
    if(count<5000){
        vertex=points[getRandomInt(0,3)];
        // vertex=triangle[getRandomInt(0,3)];
        midPnt=new Point(
            (prevPnt.x+vertex.x)/2,
            (prevPnt.y+vertex.y)/2
        );
        midPnt.draw();
        setTimeout(()=>{drawRest(midPnt);},timeGap);
        count++;
        timeGap-=1;
        }

    }

// canvas.addEventListener('click',(e)=>{
//  const randomPnt=new Point(e.x,e.y);
//  randomPnt.draw();
//  drawRest(randomPnt);
// },{once:true})

canvas.addEventListener('click',(e)=>{
    if(clickCount<3){
        console.log(e.x,e.y)
        const Pnt=new Point(e.x,e.y);
        Pnt.draw();
        points.push(Pnt);
        clickCount++;
    }
    if(clickCount==3){
      let randomPoint= getPointInTriangle();
      drawRest(randomPoint);
    }
    
})

function getPointInTriangle(){
    const randomU = Math.random();
  const randomV = Math.random();

  // Ensure that the random point is within the triangle by limiting the range of u and v
  const u = Math.sqrt(randomU);
  const v = (1 - u) * randomV;

  // Calculate the coordinates of the random point within the triangle
  const x = points[0].x * u + points[1].x * v + points[2].x * (1 - u - v);
  const y = points[0].y * u + points[1].y * v + points[2].y * (1 - u - v);
    let randomPoint=new Point(x,y)
    randomPoint.draw();
  return randomPoint;
}

const generateSerpinskiPoints=()=>{
    // do{
    //     Math.random()
    // }
    // while();
    
    let stopper=0;
    for(let i=0;i<4;i++){
        if(i==3){
            i=0;
        }
        mid=midPoint(pointRandom,points[i]);
        drawPoint(mid);
        console.log(i)
        
        pointRandom=mid;
        stopper++;
        console.log(stopper)
        if(stopper==100000){break};
    }

}


let p=500;
let degree=0;
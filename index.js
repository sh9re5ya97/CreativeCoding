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
let timeGap=50;

//Top
const Top=new Point(window.innerWidth/2,50);
Top.draw();
//Left
const Left=new Point(50,window.innerHeight-50);
Left.draw();
//Right
const Right=new Point(window.innerWidth-50,window.innerHeight-50);
Right.draw();

const triangle=[Top,Left,Right];
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}
function drawRest(prevPnt){
    let vertex,midPnt;
    if(count<5000){
        vertex=triangle[getRandomInt(0,3)];
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

canvas.addEventListener('click',(e)=>{
 const randomPnt=new Point(e.x,e.y);
 randomPnt.draw();
 drawRest(randomPnt);
},{once:true})

// canvas.addEventListener('click',(e)=>{
//     if(clickCount<3){
//         console.log(e.x,e.y)
//         var pnt={
//             x:e.x,
//             y:e.y
//         }
//         points.push(pnt);
//     drawPoint(pnt);
//         clickCount++;
//     }
//     if(clickCount==3){
//       generateSerpinskiPoints();
//     }
    
// })
const generateSerpinskiPoints=()=>{
    // do{
    //     Math.random()
    // }
    // while();
    let pointRandom={
        x:points[0].x+(points[2].x-points[0].x)/3,
        y:points[1].y+(points[2].y-points[1].y)/3
    }
    draw(pointRandom);
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
const midPoint=(a,b)=>{
    return{
        x:Math.min(a.x,b.x)+Math.abs(a.x-b.x)/2,
        y:Math.min(a.y,b.y)+Math.abs(a.y-b.y)/2
    }
}

let p=500;
let degree=0;
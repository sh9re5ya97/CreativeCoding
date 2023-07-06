const canvas=document.getElementById("my-canvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
console.log(ctx);


// canvas.addEventListener('mousemove',(e)=>{
//     ctx.beginPath();
//     ctx.rect(e.x,e.y,10,10);
//     ctx.fill();
// })


// const degToRad=(deg)=>{
// return(deg/180)*Math.PI;
// }
// ctx.beginPath();
// ctx.arc(100,100,200,0,degToRad(90));
// ctx.stroke();
// ctx.fill();
let atoms=[];

// canvas.addEventListener('mousemove',(e)=>{
//   //  var randomColor = Math.floor(Math.random()*200000).toString(16);
//     var blueValue = Math.floor(Math.random() * 250).toString(16).padStart(2, '0');
//     var greenValue = Math.floor(Math.random() * 250).toString(16).padStart(2, '0');
//     var redValue = Math.floor(Math.random() * 250).toString(16).padStart(2, '0');

//   // Combine the blue value with fixed red and green values for shades of blue
//   var randomColor = `#${redValue}${greenValue}${blueValue}`;
//   console.log(randomColor)

//     for (let i = 0; i < 20; i++) {
//         // ctx.fillStyle = '#'+randomColor;
//         atoms.push(new Atom(e.x,e.y,randomColor));
//     }
// })


const animate=()=>{
        atoms.forEach((atom,index)=>{
            atom.draw();
            atom.updateSpeed();
            atom.updateSize();
            if(atom.radius<0.1){
                atoms.splice(index,1);
            }
        })

        ctx.save();
       // ctx.fillStyle='rgba(255,255,255,0.4)';
        ctx.fillStyle='rgba(0,0,0,0.1)';
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.restore();

        requestAnimationFrame(animate);
}

animate();
class Atom{
    constructor(x,y,color){
        this.x=x;
        this.y=y;
        this.radius=Math.random()+1;
       // this.radius=11;
        this.speedX=Math.random()*-22;//-2 +2
        this.speedY=Math.random()*-2;//-2 +2
        this.color=color;
        //  var randomColor = Math.floor(Math.random()*16777215).toString(16);
        //  this.color=randomColor;
        // console.log(randomColor);

    }

    updateSpeed(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    }

    updateSize(){
        this.radius-=0.1;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
const point={
    x:0,
    y:0
}
const generateAtoms=()=>{
    for (let i = 0; i < 8; i++) {
        var blueValue = (Math.floor(Math.random() * 150)+156).toString(16).padStart(2, '0');
        var greenValue = (Math.floor(Math.random() * 200)).toString(16).padStart(2, '0');
        var redValue = (Math.floor(Math.random() * 250)+156).toString(16).padStart(2, '0');
    
      // Combine the blue value with fixed red and green values for shades of blue
      var randomColor = `#${redValue}${greenValue}${blueValue}`;
        // atoms.push(new Atom(Math.random()*canvas.width,Math.random()*canvas.height,randomColor));
        atoms.push(new Atom(canvas.width/2,canvas.height/2,randomColor));
            }
   

    requestAnimationFrame(generateAtoms)
}

generateAtoms();
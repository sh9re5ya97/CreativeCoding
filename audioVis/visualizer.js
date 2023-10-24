const microphone=new Microphone();
const canvas=document.getElementById('my-canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

class Figure{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size=8;
        var blueValue = (Math.floor(Math.random() * 256)).toString(16).padStart(2, '0');
        var greenValue = (Math.floor(Math.random() * 100)).toString(16).padStart(2, '0');
        var redValue = (Math.floor(Math.random() * 200)).toString(16).padStart(2, '0');
    
      // Combine the blue value with fixed red and green values for shades of blue
        var randomColor = `#${redValue}${greenValue}${blueValue}`;
        this.color=randomColor;
        this.counter=0;
    }

    draw(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }

    circularMovement(){
        if(this.counter>=360){
            this.counter=0;
        }

        this.x+=Math.cos(this.counter/180 *Math.PI);
        this.y+=Math.sin(this.counter/180 *Math.PI);

        this.counter++;

    }

    changeSize(value){
        const sound=value*300;
        if(sound>this.size){
            this.size=sound;
        }else{
            this.size-=this.size*0.1;
        }
    }

    teleport(){
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
    }

}

let figures=[];
for (let i = 0; i < 20; i++) {
 figures.push(new Figure(Math.random()*canvas.width,Math.random()*canvas.height))   
}

function animate(){
    if(microphone.initialized){
        const samples=microphone.getSamples();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        figures.forEach((figure,index) => {
            figure.draw();
            figure.circularMovement();
            figure.changeSize(samples[index]);
            if(Math.random()>=0.9){
                figure.teleport();
            }
        });
    }
    requestAnimationFrame(animate);
}

for (let i = 0; i < 5; i++) {
    animate();
}

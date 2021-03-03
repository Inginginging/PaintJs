const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColors");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");

let painting = false;
let filling = false;

canvas.width=700;
canvas.height=700;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

function handleColors(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle=color;
}

function handleRange(event){
    const size = event.target.value;
    ctx.lineWidth= size;
}
    
function handleMode(event){
    if (filling===true){  //이해 안됨 다시.
        filling =false;
        mode.innerText="Fill";
    }
    else{
        filling=true;
        mode.innerText="Paint";
    }
}

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x =event.offsetX;
    const y =event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
        }
    }



if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

Array.from(colors).forEach(color=>color.addEventListener("click",handleColors));

if(range){
    range.addEventListener("input",handleRange);
}

if(mode){
    mode.addEventListener("click",handleMode);
}
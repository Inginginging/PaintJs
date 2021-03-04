const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColors");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const INITIAL_COLOR= "#2c2c2c";
const CANVAS_SIZE=700;

let painting = false;
let filling = false;

canvas.width= CANVAS_SIZE;
canvas.height= CANVAS_SIZE;
ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE); //배경색을 white로 초기화 해놓음. 

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle= INITIAL_COLOR;
ctx.lineWidth = 2.5;

function handleColors(event){  //팔레트를 클릭했을때 stroke과 fill의 색사이 모두 해당 색으로 변함.
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRange(event){ //붓크기 조절 함수
    const size = event.target.value;
    ctx.lineWidth= size;
}
    
function handleMode(event){
    if (filling===true){  //2. fill의 상태에서 btn을 클릭했을때. filling은 거짓이 되고(paint모드로 바뀌고) btn의 text는 Fill로 바뀜.
        filling =false;
        mode.innerText="Fill";
    }
    else{  //1. fill을 클릭 햇을때. fill은 true가 되고 btn의 text는 paint로 바뀜
        filling=true;
        mode.innerText="Paint";
    }
}

function handleClick(event){ //handleMode 함수에 의해 filling이 true가 되면 캔버스를 클릭했을 시 색을 fill 하게됨.
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){ //우클릭 저장 막기 함수.
    event.preventDefault();
}

function handleSave(event){  //save버튼 함수
    const image = canvas.toDataURL();  //이미지를 데이터화.
    const link = document.createElement("a"); //html에 링크 생성
    link.href = image; //링크 참조는 데이터화된 이미지
    link.download = "Paint JS👏" // 다운로드 이름.
    link.click();// 링크를 페이크 클릭.
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



if(canvas) {  //canvas 안에서 일어나느 event들에 대한 함수들
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color=>color.addEventListener("click",handleColors)); //팔레트에서 일어나는 event에 대한 함수

if(range){ //붓 크리의 input에서 일어나는 event에 대한 함수
    range.addEventListener("input",handleRange);
}

if(mode){
    mode.addEventListener("click",handleMode);
}

if(save){
    save.addEventListener("click", handleSave);
}
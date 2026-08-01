document.addEventListener("keydown",(e)=>{

if(e.key==="ArrowLeft"){

document.querySelector(".pager .btn").click();

}

if(e.key==="ArrowRight"){

document.querySelector(".pager .primary").click();

}

});
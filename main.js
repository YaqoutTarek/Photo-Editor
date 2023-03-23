let saturate = document.getElementById("saturate")
let contrast = document.getElementById("contrast")
let brightness = document.getElementById("brightness")
let sepia = document.getElementById("sepia")
let grayscale = document.getElementById("grayscale")
let blur = document.getElementById("blur")
let huerotate = document.getElementById("hue-rotate")

let reset = document.getElementById("reset")
let download = document.getElementById("download")

let imgBox= document.querySelector(`.img-box`)
let upload = document.getElementById("upload")
let img = document.getElementById("img")
const canvas = document.getElementById("canvas")
const ctx= canvas.getContext(`2d`) 
// getContext(`2d`) will run drawing image


function resetV() {
    ctx.filter=`none`;
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    saturate.value= `100`
    contrast.value= `100`
    brightness.value= `100`
    sepia.value= `0`
    grayscale.value= `0`
    blur.value= `0`
    huerotate.value= `0`
}; 

window.onload = ()=> {
    download.style.display= `none`;
    imgBox.style.display= `none`;
    reset.style.display= `none`;
};
upload.onchange = ()=> { // not .onclick >> .onchange meaning when changing type from file to url
    resetV();
    download.style.display= `block`;
    imgBox.style.display= `block`;
    reset.style.display= `block`;
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]); // upload is array , [0] the file you choice it
    file.onload = () => {
        img.src = file.result; // do file function result in src
    };
    img.onload= ()=> {
        canvas.width= img.width;
        canvas.height= img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        // drawImage(sourceOfCanvas,0,0,width,height);
        img.style.display= `none`;
    }
};
let filters = document.querySelectorAll(`ul li input`);
filters.forEach( filter => {
    filter.addEventListener(`input`, ()=>{
        ctx.filter= `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value}) 
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
        `;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
});
download.onclick = ()=> {
    download.href= canvas.toDataURL(`image/jpeg`)
}
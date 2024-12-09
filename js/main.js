import * as data from './data.js';

document.addEventListener('DOMContentLoaded', ()=>{

    // debug()
    generateHead('F1 Dashboard Project')
    generateHeader()
    //generateAside()

})

/* FUNCTIONS */


//generate head content
function generateHead(titleArg){
    const head =  document.querySelector('head');

    //meta tags
    const charset = document.createElement('meta');
    charset.setAttribute('charset','UTF-8');
    head.appendChild(charset);
    head.appendChild(createMetaTag('description','COMP 3512 - Assignment #2 - Alexander Hilliard'));
    head.appendChild(createMetaTag('author','Alexander Hilliard'));
    head.appendChild(createMetaTag('viewport','width=device-width, initial-scale=1.0'));

    //title
    const title = document.createElement('title');
    title.textContent = titleArg;
    head.appendChild(title);

    //css sheet
    const css = document.createElement('link');
    css.href = 'css/general.css';
    css.rel = 'stylesheet';
    head.appendChild(css);
    
}

//generate meta tag - used in generateHead()
function createMetaTag(name,content){
    const meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    return meta;
}

//generate header content
function generateHeader(){
    const header = document.querySelector('header');

    //logo&title - button to reset page to initial 'home' state
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.style.cursor = 'pointer';

    const logoImg = document.createElement('img');
    logoImg.src = './images/F1-logo.png';
    logoImg.alt = 'F1 Logo';
    logoImg.width = '100';

    const h1 = document.createElement('h1');
    h1.textContent = ' Dashboard Project';

    titleDiv.appendChild(logoImg);
    titleDiv.appendChild(h1);

    //event to reset page
    titleDiv.addEventListener('click', ()=>{

    })

    header.appendChild(titleDiv);

}

//returns a div element for buttons - used by multiple functions
    //passed the button's text, & and function used for the button's listener
function generateButton(label,eventFunction){

    const button = document.createElement('div');
    button.classList.add('button');
    button.textContent = label;
    button.addEventListener('click',eventFunction);
    
    return button;
}

//generate aside
function generateAsideHome(){

}

function debug(){
    localStorage.clear();
    console.log('fetch testing')
    data.getSeasonData('2023', races=>{
        console.log(races)
    })
    setTimeout(()=>{
        console.log('getLocalData - qualifying')
        data.getLocalData('qualifying','2023','raceId','1116',d=>{
            console.log(d)
        })
        console.log('getLocalData - results')
        data.getLocalData('results','2023','raceId','1116',d=>{
            console.log(d)
        })
        console.log('getLocalData - driver')
        data.getLocalData('results','2023','driverId','830',d=>{
            console.log(d)
        })
        console.log('getLocalData - constructor')
        data.getLocalData('results','2023','constructorId','1',d=>{
            console.log(d)
        })
        console.log('getCircuits')
        data.getCircuits('3',d=>{
            console.log(d)
        })
    },5000)
}
document.addEventListener('DOMContentLoaded', ()=>{

    generateHead('F1 Dashboard Project')
    //generateHeaderContent()
    //generateAside()

})

//functions
//generate head content
function generateHead(titleArg){
    const head =  document.querySelector('head');
    //meta tags
    const charset = document.createElement('meta');
    charset.charset = 'UTF-8';
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
    
}

//generate meta tag - used in generateHead()
function createMetaTag(name,content){
    const meta = document.createElement(meta);
    meta.name = name;
    meta.content = content;
    return meta;
}

//generate header content
    //title

    //nav

//generate aside
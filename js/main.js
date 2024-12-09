import * as data from './data.js';

document.addEventListener('DOMContentLoaded', ()=>{

    // debug()
    generateHead('F1 Dashboard Project')
    generateHeader()
    generateAside()
    generateContent()

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
        returnHome()
    })

    header.appendChild(titleDiv);

}

//return page to "home screen"
function returnHome(){
    activateAside(`#homeAside`)
    activateContent(`#homeContent`)
    //reset season select option to default
    document.querySelector(`#seasonSelector`).value = `Seasons`

}

//generate divs that populate article - home article visible, others hidden
function generateAside(){
    const aside = document.querySelector('aside');
    aside.appendChild(generateAsideHome());
}

function activateAside(id){
    //make all hidden
    hideAllAside()
    //make specified div visible
    document.querySelector(id).style.display = 'block'

}

function generateContent(){
    const content = document.querySelector('.content');
    content.appendChild(generateContentHome());

}

function activateContent(id){
    //make all hidden
    hideAllContent();
    //make specified div visible
    document.querySelector(id).style.display = 'block'
}

//returns a div element for buttons - used by multiple functions
    //passed the button's text, a value attribute, and a function used for the button's listener
function generateButton(label,value,eventFunction){

    const button = document.createElement('div');
    button.classList.add('button');
    button.textContent = label;
    button.value = value;
    button.addEventListener('click',eventFunction(value));
    
    return button;
}

//generate homescreen aside
function generateAsideHome(){
    const div = createDiv('homeAside')

    //Description
    const h2 = createH2('Welcome to the Formula 1 Dashboard Project.')
    const p1 = createP('These webpages represent <b>assignment #2</b> for <b>COMP 3512</b> at <b>Mount Royal University.</b></br>')
    const p2 = createP('They are intended for <b>education purposes only.</b>')
    const p3 = createP('This project utilizes JavaScript, and retrieves data from PHP APIs.')
    const p4 = createP('<b>Author:</b> Alexander Hilliard')
    const p5 = createP('This dashboard allows you to browse a database of Formula 1 data.</br>')
    const github = generateGithubButton()
    const children = [h2,p1,p2,p3,p4,p5,github]
    children.forEach(c=>{div.appendChild(c)})

    //Select List
    div.appendChild(generateSeasonSelect());

    return div

}

//generate homescreen content
function generateContentHome(){
    const div = createDiv('homeContent');
    const img = createImg('./images/car.png','car','An F1 Car')
    div.appendChild(img)
    return div
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

function clearElement(element){
    element.innerHTML = '';
}

function createH2(innerHTML){
    const h2 = document.createElement('h2');
    h2.innerHTML = innerHTML;
    return h2;
}

function createP(innerHTML){
    const p = document.createElement('p');
    p.innerHTML = innerHTML;
    return p;
}

function createDiv(id){
    const div = document.createElement('div');
    div.id = id;
    return div;
}

//generate github button used in Aside Home
function generateGithubButton(){
    const button = document.createElement('div')
    button.classList.add('buttonWrapper');
    const a = document.createElement('a')
    a.classList.add('button');
    a.href = 'https://github.com/ahill-mtroyal/COMP-3512-assign2-ahill389'
    a.target = '_blank'
    a.textContent = 'GitHub Repo';
    button.appendChild(a)
    return button;
}

//return div for the season selector
function generateSeasonSelect(){
    const div = createDiv('seasonSelect');
    const h2 = createH2('Select A Season:')
    div.appendChild(h2)
    const defaultOpt = document.createElement('option');
    defaultOpt.textContent = 'Seasons'
    const options = [defaultOpt,createOpt(2020,'2020 Season'),createOpt(2021,'2021 Season'),createOpt(2022,'2022 Season'),createOpt(2023,'2023 Season')]
    const select = document.createElement('select')
    select.id = 'seasonSelector'
    options.forEach(o => select.appendChild(o))

    //event to change aside & content
    select.addEventListener('change', e => {
        console.log(`${e.target.value} selected`)
        const season = e.target.value
        //check default option not selected (would do nothing / error)
        if (season == 'Seasons') {
            //do nothing - default opt selected
        } else if (document.querySelector(`#races${season}`)) {
            //season list already generated
            displayRaces(season);
        } else {
            //new season selected
            data.getSeasonData(season,generateRaceList,displayRaces)
        }
        
    })

    div.appendChild(select)

    function createOpt(value,label){
        const opt = document.createElement('option')
        opt.value = value
        opt.textContent = label
        return opt
    }

    return div
}

//generates list of races & appends list to aside with hidden display
function generateRaceList(season,races){
    const aside = document.querySelector('aside');
    const div = createDiv(`races${season}`)
    
    //header
    const h2 = createH2(`${season} Races`);

    //table
    const table = document.createElement('table');
    table.classList.add('browse_table')
    const tableHead = createTr()
    const th = [createTh('Round'),createTh('Race'),createTh()]
    th.forEach(t => tableHead.appendChild(t))
    const rows = []
    //generate races table rows - assigns event listeners to button that display content using the button's raceId value
    races.forEach(r => {
        const tr = createTr()
        const tdRnd = createTd(r.round)
        const tdRace = createTd(r.name)
        const tdButton = createTd()
        tdButton.appendChild(generateButton('Results',r.id,displayContent))
        const tds = [tdRnd,tdRace,tdButton]
        tds.forEach(t => tr.appendChild(t))
        rows.push(tr);
    })
    table.appendChild(tableHead)
    rows.forEach(r => table.appendChild(r))

    div.appendChild(h2)
    div.appendChild(table)
    div.style.display = 'none'
    
    aside.appendChild(div);
}

//hide all other aside content, & display specified race list
function displayRaces(season){
    console.log(`displaying races for ${season}`)
    hideAllAside()
    document.querySelector(`#races${season}`).style.display = 'block'
}

//display requested content
function displayContent(raceId){
    displayQualifying(raceId)
    displayResults(raceId)
}

//return qualifying div of content
function displayQualifying(){

}

//return results div of content
function displayResults(){

}

//create tr element
function createTr(){
    const tr = document.createElement('tr');
    return tr;
}

//create th element
function createTh(textContent){
    const th = document.createElement('th');
    th.textContent = textContent;
    return th;
}

//create td element
function createTd(textContent){
    const td = document.createElement('td');
    td.textContent = textContent;
    return td;
}

//create img element
function createImg(src, classList,alt){
    const img = document.createElement('img');
    img.src = src
    img.classList.add(classList)
    img.alt = alt
    return img
}

//change display of all aside elements to none
function hideAllAside(){
    const asideChildren = document.querySelector('aside').children
    for( let i = 0; i < asideChildren.length; i++){
        asideChildren[i].style.display = 'none'
    }
}

//change display styling of all elements within the content div to none
function hideAllContent(){
    const contentChildren = document.querySelector('.content').children
    for( let i = 0; i < contentChildren.length; i++){
        contentChildren[i].style.display = 'none'
    }
}
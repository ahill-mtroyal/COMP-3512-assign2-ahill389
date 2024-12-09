/* DATA & STORAGE RELATED FUNCTIONS */
//api domain
const domain = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1 '

//retrieves season data into local storage if not already present, then executes passed function (displayRaces probably)
function getSeasonData(season, displayRaces){
    const racesKey = `races${season}`;
    const resultsKey = `results${season}`;
    const qualifyingKey = `qualifying${season}`;
    const racesURL = `${domain}/races.php?season=${season}`;
    const resultsURL = `${domain}/results.php?season=${season}`;
    const qualifyingURL = `${domain}/qualifying.php?season=${season}`;

    //if a season's race data is in storage, then results and qualifying probably are as well
    //this isn't a perfect assumption, but I suspect that even in full production solving this problem is more effort than it's worth
    //continuing with this assumption for now, but I may return to this later
    console.log(`Invoking checkLocalStorage with ${racesKey}`)
    let racesData = checkLocalStorage(racesKey);
    if(racesData){
        //season data is in storage - proceed with displaying information
        displayRaces(racesData);
    } else {
        //season data is not in storage - fetch & add to local storage before displaying race list
        //these vars are promises
        racesData = fetchData(racesURL);
        let resultsData = fetchData(resultsURL);
        let qualifyingData = fetchData(qualifyingURL);

        let dataArray = [racesData,resultsData,qualifyingData];
        
        //add all data to local storage, then display races
        Promise.all(dataArray)
            .then(resolves => {
                [racesData,resultsData,qualifyingData] = resolves;
                submitLocalStorage(racesKey,racesData);
                submitLocalStorage(resultsKey,resultsData);
                submitLocalStorage(qualifyingKey,qualifyingData)
                displayRaces(racesData)
            })
    }
}

//retieve local data, filtered by attribute, then calls display function with retrieved data
//attributeName supports raceId,constructorId, and driverId
//usage example: getLocalData(races,2023,raceId,123,displayRaces) -> function compares raceId attribute of retrieved data (races2023 from localStorage) against attributeName while filtering data
//NOTE: I'm not sure if this implementation is prefered. I would be interested in improved implementation suggestions. It consolidates ~4 similar functions into 1, but I'm unsure if it could be more concise (particularly with the arguments).
function getLocalData(keyPrefix,season,attributeName,attributeValue,displayFunc){
    console.log(`Invoking checkLocalStorage with ${keyPrefix}${season}`)
    let localData = checkLocalStorage(`${keyPrefix}${season}`);
    let filtered = [];

    //filter data with provided attribute
    switch(attributeName){
        case 'raceId':
            filtered = localData.filter(d => {d.raceId == attributeValue});
            break;
        case 'constructorId':
            filtered = localData.filter(d => {d.constructorId == attributeValue});
            break;
        case 'driverId':
            filtered = data.filter(d => {d.driverId == attributeValue});
            break;
    }

    displayFunc(filtered);

}

//retrieves circuit data into local storage if not already present, filters data by circuitId, then executes passed function (display circuit probably) - similar structure to getSeasonData, just only looking at circuits
function getCircuits(circuitId, displayCircuit){
    const circuitsKey = `circuits`;
    const circuitsURL = `${domain}/circuits.php`;
    let specifiedCircuit;

    //check local storage for data
    console.log(`Invoking checkLocalStorage with ${circuitsKey}`)
    let circuitsData = checkLocalStorage(circuitsKey);

    if(circuitData){
        //data was in local storage -> filter results for specific circuit & execute function
        specifiedCircuit = circuitsData.find(c => c.ciruitId == circuitId);
        displayCircuit(specifiedCircuit);
    } else {
        //data was not in local storage -> fetch, submit to storage, then filter results for specific circuit & execute function
        circuitsData = fetchData(circuitsURL)
                        .then(data =>{
                            submitToStorage(circuitsKey,data);
                            specifiedCircuit = data.find(c => c.circuitId == circuitId);
                            displayCircuit(data);
                        })
    }
}

//check to see if data is on local storage - passed the storage key string - returns a JSON object if one existed in storage, or false
//implementing this like the lab - using a return statment like this : return JSON.parse(localStorage.getItem(key)) || []; - was not behaving as expected. was simply trying to JSON.parse() with a string that said undefined
//missed localStorage lecture so not sure how to fix other than what I did - found through experimentation
function checkLocalStorage(key){
    let data = localStorage.getItem(key);
    if (data != 'undefined') {return JSON.parse(data)}
    else {return false}

}

//stringifies json data before submitting to local storage - removes localstorage for specified key beforehand, just in case
function submitLocalStorage(key,data){
    localStorage.removeItem(key)
    localStorage.setItem(key,JSON.stringify(data));
}

//wrapper for fetch function - returns promise of requested data with error defined
function fetchData(url){
    fetch(url)
        .then(resp => {
        if (resp.ok){
            return resp.json();
        } else {
            throw new Error(`Could not fetch data from ${url}`)
        }
    }).catch(error => errorHandler(error));
}

//function for error handling fetches
function errorHandler(error){
    console.log(error.message);
}

export {getSeasonData,getLocalData,getCircuits};
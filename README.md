# COMP 3512 (Fall 2024) - F1 Dashboard Project
### Overview
This repository represents Assignment #2 for COMP 3512 at Mount Royal Univserity.
The purpose of this assignment is to implement a single-page application to view
formula 1 race data, using JavaScript. The project utilizes APIs and local storage
to obtain and store data.

### Features
- Browse Race Results - View qualifying and race results from races in the 2020-2023 seasons.
- Specified Race Results - View race results for a specified driver or constructor.
- Circuit Information - View basic f1 circuit information for a specified circuit.

### Technologies Used
- HTML, CSS, JavaScript

### Main Project Files
- index.html - The project's web page, includes all features
    - Home view allows user to select a season
    - Subsequent views display specified information

### APIs Used
Project utilizes several php APIs to acquire JSON data:
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=2023      -> Returns all the races for the specified season.
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=2023    -> Returns all the results for all the races in the season.
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=2023 -> Returns all the qualifying for all the races in the season.


### Known Issues / Todo:
- Qualifying & results sorting functionality not yet implemented.
- Favouriting driver / constructor / circuit feature not yet implemented.
- Placeholder images not yet implemented
- No loading animation implemented for data fetches
- Styling needs polish -> in particular the results tables need to be adjacent horizontally instead of vertically & popup windows are a little ugly
- Document housekeeping -> cleaning / polish of documents required. Some functions unused, some are just bad.
    - compartmentalize table building into functions when implementing table sorting
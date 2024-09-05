# Countries Catalog App
This implementation is called Countires Calatog
The purpose is to testing only

## What about this app
This app uses the free API, [restcountries.com](https://restcountries.com/)
Handle response as follow
* Use the following fields in the catalog and inside the parenthenses is the property of data from REST API
  * Flags (use png file within flags property)
  * Country Name (use name.official)
  * 2 Character Country Code (cca2)
  * 3 Character Country Code (cca3)
  * Native Country Name (name.nativeName)
  * Alternative Country Name (altSpellings)
  * Country Calling Codes (idd)
* Search by Country Name (Fuzzy Search)
* Sorting by Country Name (both Ascending and Descending)
* Pagination (25 rows per page)
* After we click on Country Name, popup a modal and show all other informations

## Frameworks
This app uses the following frameworks
* React JS using TypeScript template
* Material UI for UI Library
* Axios library for requesting to REST API


## See the demo
You can view this app demo online via the follwing url
https://fridaycam.github.io/countries-catalog-react/
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { CountryTable, HeadCell } from './components/table';
import { CountryDetailsDialog } from './components/dialog';


// export type Country = {
//   id: string
//   flag: string
//   countryName: string
//   twoCharacterCountryCode: string
//   threeCharacterCountryCode: string
//   nativeCountryName: string
//   alternativeCountryName: string
//   countryCallingCodes: string
// }

export type Name = { common: string, official: string }
export type Currency = { name: string, symbol: string }
export type Country = {
  name: Name & {nativeName: {[x: string]: Name}} // eng: Name
  tld: string[]
  cca2: string, ccn3: string, cca3: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: {[x: string]: Currency}
  idd: { root: string, suffixes: string[] }
  capital: string[]
  altSpellings: string[]
  region: string
  languages: {[x: string]: string}
  translations: {[x: string]: Name}
  latlng: number[]
  landlocked: boolean
  area: number
  demonyms: {[x: string]: { f: string, m: string }}
  flag: string
  maps: {googleMaps: string, openStreetMaps: string}
  population: number
  car: {signs: string[], side: string}
  timezones: string
  continents: string
  flags: {png: string, svg: string, alt: string}
  coatOfArms: {png: string, svg: string}
  startOfWeek: string
  capitalInfo: {latlng: number[]}
  fifa: string
}


export const headCells: HeadCell[] = [
  { id: 'no', label: 'No.', width: '2%'},
  { id: 'flag', label: 'Flag' },
  { id: 'countryName', label: 'Country Name'},
  { id: 'cca2', label: '2 Character Country Code'},
  { id: 'cca3', label: '3 Character Country Code'},
  { id: 'nativeName', label: 'Native Country Name'},
  { id: 'altSpellings', label: 'Alternative Country Name', width: '18%'},
  { id: 'idd', label: 'Country Calling Codes', width: '18%'}
]


function App() {

  const [isFetching, setIsFetching] = useState(true)
  const [countries, setCountries] = useState<Country[]>() // This is for original data from api, and we will use each to show in details dialog
  const [eachData, setEachData] = useState<any>()

  // const [dataForTable, setDataForTable] = useState<Country[]>()
  const [errMsg, setErrMsg] = useState('Error something went wrong')

  const [isOpenDetailsDialog, setIsOpenDetailsDialog] = useState(false)

  const handleCloseDialog = () => {
    setIsOpenDetailsDialog(false)
  }
  const handleShowDialog = (each: Country) => {
    // console.log({each})
    if (each) {
      setEachData(each)
      setIsOpenDetailsDialog(true)
    } else {
      alert('Nothing to show')
    }
  }

  const getCountries = () => {

    axios.get(process.env.REACT_APP_API_URL as string).then(res => {
    // Take only needed fields
    // axios.get(process.env.REACT_APP_API_URL + '?fields=name,flags,cca2,cca3,altSpellings,idd').then(res => {
      setIsFetching(true)
      setErrMsg('')
      if (res.status === 200) {
        // Get needed property only
        // const newData: Country[] = []
        // res.data.map((each: any) => {
        //   newData.push({
        //     id: each.cca2 + each.ccn3 + each.cca3,
        //     flag: each.flags.png,

        //     countryName: each.name && each.name.official ? each.name.official : '',

        //     twoCharacterCountryCode: each.cca2,
        //     threeCharacterCountryCode: each.cca3,

        //     nativeCountryName: each.name.nativeName
        //       && each.name.nativeName.eng
        //       && each.name.nativeName.eng.official ? each.name.nativeName.eng.official : '',

        //     alternativeCountryName: each.altSpellings ? each.altSpellings.join('\n') : '',
        //     countryCallingCodes: each.idd.root + each.idd.suffixes ? each.idd.suffixes.join('\n') : ''
        //   })
        // })
        // if (newData.length === 0) { setDataForTable(undefined); setData(undefined) }
        // else { setDataForTable(newData); setData(res.data) }
        setCountries(res.data)
        setIsFetching(false)
      } else {
        console.log('Error: get response from api with error: ', res.statusText)
        setErrMsg('Failed data with response error. Plz try again')
        setIsFetching(false)
      }
      // console.log(res)
    }).catch(err => {
      console.log('Error: cannot fetch data from api: ', err)
      setErrMsg('Failed to fetch country data. Plz try again')
      setIsFetching(false)
    })
  }
  
  useEffect(() => {
    getCountries()
  }, [])

  return (
    <div className="App">
      <Box mb={8} mt={2}>
        <Typography variant='h4'>Countries Catalog</Typography>
        {/* <Button variant='contained' onClick={handleShowDialog}>Show Details</Button> */}
      </Box>

      <CountryTable headCells={headCells} data={countries} isFetching={isFetching} errMsg={errMsg} handleShowDialog={handleShowDialog} />
      
      <CountryDetailsDialog isOpen={isOpenDetailsDialog} handleClose={handleCloseDialog} country={eachData && eachData} />

    </div>
  );
}

export default App;

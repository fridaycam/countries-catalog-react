import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Alert, Box, Button } from '@mui/material';
import axios from 'axios';
import { CountryTable, HeadCell } from './components/table';


export type Country = {
  id: string
  flag: string
  countryName: string
  twoCharacterCountryCode: string
  threeCharacterCountryCode: string
  nativeCountryName: string
  alternativeCountryName: string
  countryCallingCodes: string
}


export const headCells: HeadCell[] = [
  { id: 'flag', label: 'Flag' },
  { id: 'countryName', label: 'Country Name'},
  { id: 'cca2', label: '2 Character Country Code'},
  { id: 'cca3', label: '3 Character Country Code'},
  { id: 'nativeName', label: 'Native Country Name'},
  { id: 'altSpellings', label: 'Alternative Country Name'},
  { id: 'idd', label: 'Country Calling Codes'}
]


function App() {

  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<Country[]>()
  const [errMsg, setErrMsg] = useState('')

  const getCountries = () => {

    // axios.get(process.env.REACT_APP_API_URL as string).then(res => {
    //   if (res.status === 200) {

    //   } else {
    //     console.log('Error: get response from api with error: ', res.statusText)
    //   }
    //   console.log(res)
    // }).catch(err => {
    //   console.log('Error: cannot fetch data from api: ', err)
    //   setData(undefined)
    // })

    setTimeout(() => {
      setIsFetching(false)

      const eachData: Country = {
        id: '1',
        flag: "https://flagcdn.com/w320/gs.png",
        countryName: "South Georgia and the South Sandwich Islands",
        twoCharacterCountryCode: 'GS',
        threeCharacterCountryCode: 'SGS',
        nativeCountryName: 'South Georgia and the South Sandwich Islands',
        alternativeCountryName: 'GS',
        countryCallingCodes: '473'
      }
      setData([eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData])
    }, 2000)
  }
  
  useEffect(() => {
    getCountries()
  }, [])

  return (
    <div className="App">
      <Box mb={8}>
        <h2>Welcome to Countries Catalog Table</h2>
      </Box>

      <CountryTable headCells={headCells} data={data} isFetching={isFetching} />
    </div>
  );
}

export default App;

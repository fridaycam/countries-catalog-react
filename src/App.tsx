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
  { id: 'altSpellings', label: 'Alternative Country Name', width: '18%'},
  { id: 'idd', label: 'Country Calling Codes', width: '18%'}
]


function App() {

  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<Country[]>()
  const [errMsg, setErrMsg] = useState('Error something went wrong')

  const getCountries = () => {

    console.log(process.env.REACT_APP_API_URL)

    axios.get(process.env.REACT_APP_API_URL as string).then(res => {
      setIsFetching(true)
      setErrMsg('')
      if (res.status === 200) {
        // Get needed property only
        const newData: Country[] = []
        res.data.map((each: any) => {
          newData.push({
            id: each.cca2 + each.ccn3 + each.cca3,
            flag: each.flags.png,

            countryName: each.name && each.name.official ? each.name.official : '',

            twoCharacterCountryCode: each.cca2,
            threeCharacterCountryCode: each.cca3,

            nativeCountryName: each.name.nativeName
              && each.name.nativeName.eng
              && each.name.nativeName.eng.official ? each.name.nativeName.eng.official : '',

            alternativeCountryName: each.altSpellings ? each.altSpellings.join('\n') : '',
            countryCallingCodes: each.idd.root + each.idd.suffixes ? each.idd.suffixes.join('\n') : ''
          })
        })
        if (newData.length === 0) setData(undefined)
        else setData(newData)
        setIsFetching(false)
      } else {
        console.log('Error: get response from api with error: ', res.statusText)
        setErrMsg('Failed data with response error. Plz try again')
        setIsFetching(false)
      }
      console.log(res)
    }).catch(err => {
      console.log('Error: cannot fetch data from api: ', err)
      setErrMsg('Failed to fetch country data. Plz try again')
      setIsFetching(false)
    })

    // setTimeout(() => {
    //   setIsFetching(false)

    //   const eachData: Country = {
    //     id: '1',
    //     flag: "https://flagcdn.com/w320/gs.png",
    //     countryName: "South Georgia and the South Sandwich Islands",
    //     twoCharacterCountryCode: 'GS',
    //     threeCharacterCountryCode: 'SGS',
    //     nativeCountryName: 'South Georgia and the South Sandwich Islands',
    //     alternativeCountryName: 'GS',
    //     countryCallingCodes: '473'
    //   }
    //   setData([eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData, eachData])
    // }, 2000)
  }
  
  useEffect(() => {
    getCountries()
  }, [])

  return (
    <div className="App">
      <Box mb={8}>
        <h2>Welcome to Countries Catalog Table</h2>
      </Box>

      <CountryTable headCells={headCells} data={data} isFetching={isFetching} errMsg={errMsg} />
    </div>
  );
}

export default App;

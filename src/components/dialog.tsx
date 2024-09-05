import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Divider, Link, Stack, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import { useState } from "react"

export type Name = { common: string, official: string }
export type Currency = { name: string, symbol: string }
export type DetailData = {
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
  flags: {png: string, svg: string}
  coatOfArms: {png: string, svg: string}
  startOfWeek: string
  capitalInfo: {latlng: number[]}
  fifa: string
}


type Props = {
  isOpen: boolean
  handleClose: () => void
  detailData: DetailData
}

export const CountryDetailsDialog = (props: Props) => {

  const {isOpen, handleClose, detailData} = props

  
  return <Dialog
    maxWidth='lg'
    open={isOpen}
    fullWidth
  >
    <DialogTitle>Details of {detailData && detailData.name.official} country {detailData && detailData.flag}</DialogTitle>
    <DialogContent dividers>
      {detailData && <DialogContentText>
        <Grid container spacing={2}>
          {/* LEFT */}
          <Grid size={6}>
            <Divider>Information</Divider>
            <RenderShowInfo label="Flag" value={detailData.flags && <img src={detailData.flags.png} width={'60'} />} />
            <RenderShowInfo label="CCA2" value={detailData.cca2 ? detailData.cca2 : ''} />
            <RenderShowInfo label="CCN3" value={detailData.ccn3 ? detailData.ccn3 : ''} />
            <RenderShowInfo label="CCA3" value={detailData.cca3 ? detailData.cca3 : ''} />
            <RenderShowInfo label="Country Calling Code" value={detailData.idd ? detailData.idd.root + detailData.idd.suffixes.join('') : ''} />
            <RenderShowInfo label="Name" value={''} />
              <RenderShowInfo label="Official" value={detailData.name.official} indent={2} />
              <RenderShowInfo label="Common" value={detailData.name.common} indent={2} />
              <RenderShowInfo label="Native Name" value={''} indent={2} />
              {detailData.name.nativeName && Object.keys(detailData.name.nativeName).map((key: any) => {
                return <>
                  <RenderShowInfo label={`${key} Official`} value={detailData.name.nativeName[key].official} indent={4} />
                  <RenderShowInfo label={`${key} Common`} value={detailData.name.nativeName[key].common} indent={4} />
                </>
              })}
            <RenderShowInfo label="Alternative Country Name" value={detailData.altSpellings ? detailData.altSpellings.join(', ') : ''} />
            
            <RenderShowInfo label="Capital" value={detailData.capital && detailData.capital.join(', ')} />
            <RenderShowInfo label="Independent" value={detailData.independent ? 'Yes' : 'No' } />
            <RenderShowInfo label="UN Member" value={detailData.unMember ? 'Yes' : 'No' } />
            <RenderShowInfo label="Status" value={detailData.status ? detailData.status : '' } />
            <RenderShowInfo label="Land Locked" value={detailData.landlocked ? "Yes" : 'No' } />
            <RenderShowInfo label="Currencies" value={''} />
            {detailData.currencies && Object.keys(detailData.currencies).map((key: any) => {
              return <>
                <RenderShowInfo label={`${key} Name`} value={detailData.currencies[key].name ? detailData.currencies[key].name : '' } indent={2} />
                <RenderShowInfo label={`${key} Symbol`} value={detailData.currencies[key].symbol ? detailData.currencies[key].symbol : ''} indent={2} />
              </>
            })}

            <RenderShowInfo label="Region" value={detailData.region ? detailData.region : ''} />
            <RenderShowInfo label="Continents" value={detailData.continents ? detailData.continents : ''} />
            <RenderShowInfo label="Languages" value={''} />
            {detailData.languages && Object.keys(detailData.languages).map((key: any) =>
              <RenderShowInfo label={`${key}`} value={detailData.languages[key] ? detailData.languages[key] : '' } indent={2} />  
            )}

            <RenderShowInfo label="Population" value={detailData.population ? detailData.population : ''} />
            <RenderShowInfo label="Area" value={detailData.area ? detailData.area : ''} />
            <RenderShowInfo label="Timezone" value={detailData.timezones ? detailData.timezones : ''} />
            <RenderShowInfo label="Start of Week" value={detailData.startOfWeek ? detailData.startOfWeek : ''} />


            <RenderShowInfo label="Latitude Longitude" value={detailData.latlng ? detailData.latlng.join(', ') : ''} />
            <RenderShowInfo label="Maps" value={detailData.maps ? <>
              {detailData.maps.googleMaps && <Link href={detailData.maps.googleMaps} target="_blank" rel="noreferrer">Google Maps</Link>}
              {detailData.maps.openStreetMaps && <>, <Link href={detailData.maps.openStreetMaps} target="_blank" rel="noreferrer">Open Street Maps</Link></>}
            </> : ''} />
            <RenderShowInfo label="Capital Info" value={detailData.capitalInfo && detailData.capitalInfo.latlng ? detailData.capitalInfo.latlng.join(', ') : ''} />
            <RenderShowInfo label="FIFA" value={detailData.fifa && detailData.fifa ? detailData.fifa : ''} />

            <RenderShowInfo label="Car" value={''} />
              <RenderShowInfo label="Sign" value={detailData.car && detailData.car.signs ? detailData.car.signs.join(', ') : ''} indent={2} />
              <RenderShowInfo label="Side" value={detailData.car && detailData.car.side ? detailData.car.side : ''} indent={2} />
            
            <RenderShowInfo label="Coat of Arms" value={detailData.coatOfArms && detailData.coatOfArms.png ? <img src={detailData.coatOfArms.png} width={'60'} /> : ''} />
            <RenderShowInfo label="Demonyms" value={''} />
            {detailData.demonyms && Object.keys(detailData.demonyms).map((key: any) => {
              return <>
                <RenderShowInfo label={`${key} F`} value={detailData.demonyms[key].f ? detailData.demonyms[key].f : '' } indent={2} />
                <RenderShowInfo label={`${key} M`} value={detailData.demonyms[key].m ? detailData.demonyms[key].m : ''} indent={2} />
              </>
            })}

            <RenderShowInfo label="TLD" value={detailData.tld ? detailData.tld.join(', ') : ''} />

            
          </Grid>

          {/* RIGHT */}
          <Grid size={6}>
            <Divider>Translations Information</Divider>
            {detailData.translations && Object.keys(detailData.translations).map((key: any) => <>
              <RenderShowInfo label={key} value={''} />
              <RenderShowInfo label={'Official'} value={detailData.translations[key].official ? detailData.translations[key].official : ''} indent={2} />
              <RenderShowInfo label={'Common'} value={detailData.translations[key].common ? detailData.translations[key].common : ''} indent={2} />
            </>)}
          </Grid>
        </Grid>
      </DialogContentText>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
}


const RenderShowInfo = ({label, value, indent = 0}: {label: string, value: string | JSX.Element | number, indent?: number}) => {
  let space = ""
  for (let i=0; i<indent; i++) space += '\u00A0'
  return <Grid container spacing={2} justifyContent={"space-between"}>
    <Grid size={6}>{space}{label}:</Grid>
    <Grid size={6} textAlign={"right"} color={'black'}>{typeof value === 'number' ? formatNumber(value) : value}</Grid>
  </Grid>
}

export const formatNumber = (x: string | number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
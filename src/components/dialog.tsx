import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Divider, Link, Stack, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import { Country } from "../App"


type Props = {
  isOpen: boolean
  handleClose: () => void
  country: Country
}

export const CountryDetailsDialog = (props: Props) => {

  const {isOpen, handleClose, country} = props


  return <Dialog
    maxWidth='lg'
    open={isOpen}
    fullWidth
  >
    <DialogTitle>Details of {country && country.name.official} country {country && country.flag}</DialogTitle>
    <DialogContent dividers>
      {country && <DialogContentText>
        <Grid container spacing={2}>
          {/* LEFT */}
          <Grid size={6}>
            <Divider>Information</Divider>
            <RenderShowInfo label="Flag" value={country.flags && <img src={country.flags.png} width={'60'} />} />
            <RenderShowInfo label="CCA2" value={country.cca2 ? country.cca2 : ''} />
            <RenderShowInfo label="CCN3" value={country.ccn3 ? country.ccn3 : ''} />
            <RenderShowInfo label="CCA3" value={country.cca3 ? country.cca3 : ''} />
            <RenderShowInfo label="Country Calling Code" value={country.idd ? country.idd.root + country.idd.suffixes.join('') : ''} />
            <RenderShowInfo label="Name" value={''} />
              <RenderShowInfo label="Official" value={country.name.official} indent={2} />
              <RenderShowInfo label="Common" value={country.name.common} indent={2} />
              <RenderShowInfo label="Native Name" value={''} indent={2} />
              {country.name.nativeName && Object.keys(country.name.nativeName).map((key: any) => {
                return <>
                  <RenderShowInfo label={`${key} Official`} value={country.name.nativeName[key].official} indent={4} />
                  <RenderShowInfo label={`${key} Common`} value={country.name.nativeName[key].common} indent={4} />
                </>
              })}
            <RenderShowInfo label="Alternative Country Name" value={country.altSpellings ? country.altSpellings.join(', ') : ''} />
            
            <RenderShowInfo label="Capital" value={country.capital && country.capital.join(', ')} />
            <RenderShowInfo label="Independent" value={country.independent ? 'Yes' : 'No' } />
            <RenderShowInfo label="UN Member" value={country.unMember ? 'Yes' : 'No' } />
            <RenderShowInfo label="Status" value={country.status ? country.status : '' } />
            <RenderShowInfo label="Land Locked" value={country.landlocked ? "Yes" : 'No' } />
            <RenderShowInfo label="Currencies" value={''} />
            {country.currencies && Object.keys(country.currencies).map((key: any) => {
              return <>
                <RenderShowInfo label={`${key} Name`} value={country.currencies[key].name ? country.currencies[key].name : '' } indent={2} />
                <RenderShowInfo label={`${key} Symbol`} value={country.currencies[key].symbol ? country.currencies[key].symbol : ''} indent={2} />
              </>
            })}

            <RenderShowInfo label="Region" value={country.region ? country.region : ''} />
            <RenderShowInfo label="Continents" value={country.continents ? country.continents : ''} />
            <RenderShowInfo label="Languages" value={''} />
            {country.languages && Object.keys(country.languages).map((key: any) =>
              <RenderShowInfo label={`${key}`} value={country.languages[key] ? country.languages[key] : '' } indent={2} />  
            )}

            <RenderShowInfo label="Population" value={country.population ? country.population : ''} />
            <RenderShowInfo label="Area" value={country.area ? country.area : ''} />
            <RenderShowInfo label="Timezone" value={country.timezones ? country.timezones : ''} />
            <RenderShowInfo label="Start of Week" value={country.startOfWeek ? country.startOfWeek : ''} />


            <RenderShowInfo label="Latitude Longitude" value={country.latlng ? country.latlng.join(', ') : ''} />
            <RenderShowInfo label="Maps" value={country.maps ? <>
              {country.maps.googleMaps && <Link href={country.maps.googleMaps} target="_blank" rel="noreferrer">Google Maps</Link>}
              {country.maps.openStreetMaps && <>, <Link href={country.maps.openStreetMaps} target="_blank" rel="noreferrer">Open Street Maps</Link></>}
            </> : ''} />
            <RenderShowInfo label="Capital Info" value={country.capitalInfo && country.capitalInfo.latlng ? country.capitalInfo.latlng.join(', ') : ''} />
            <RenderShowInfo label="FIFA" value={country.fifa && country.fifa ? country.fifa : ''} />

            <RenderShowInfo label="Car" value={''} />
              <RenderShowInfo label="Sign" value={country.car && country.car.signs ? country.car.signs.join(', ') : ''} indent={2} />
              <RenderShowInfo label="Side" value={country.car && country.car.side ? country.car.side : ''} indent={2} />
            
            <RenderShowInfo label="Coat of Arms" value={country.coatOfArms && country.coatOfArms.png ? <img src={country.coatOfArms.png} width={'60'} /> : ''} />
            <RenderShowInfo label="Demonyms" value={''} />
            {country.demonyms && Object.keys(country.demonyms).map((key: any) => {
              return <>
                <RenderShowInfo label={`${key} F`} value={country.demonyms[key].f ? country.demonyms[key].f : '' } indent={2} />
                <RenderShowInfo label={`${key} M`} value={country.demonyms[key].m ? country.demonyms[key].m : ''} indent={2} />
              </>
            })}

            <RenderShowInfo label="TLD" value={country.tld ? country.tld.join(', ') : ''} />

            
          </Grid>

          {/* RIGHT */}
          <Grid size={6}>
            <Divider>Translations Information</Divider>
            {country.translations && Object.keys(country.translations).map((key: any) => <>
              <RenderShowInfo label={key} value={''} />
              <RenderShowInfo label={'Official'} value={country.translations[key].official ? country.translations[key].official : ''} indent={2} />
              <RenderShowInfo label={'Common'} value={country.translations[key].common ? country.translations[key].common : ''} indent={2} />
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
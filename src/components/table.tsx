import { Box, CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Country } from "../App"

export type HeadCell = {
  id: string
  label: string
}


type Props = {
  headCells: HeadCell[]
  data: Country[] | undefined
  isFetching: boolean
}

export const CountryTable = (props: Props) => {
  const {headCells, data, isFetching} = props
  
  return <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="Countires Catalog"
        >
          <TableHead>
            <TableRow>
              {headCells.map(headCell => <TableCell key={headCell.id}>  
                {headCell.label}
              </TableCell>)}
            </TableRow>
          </TableHead>

          <TableBody>
            { isFetching
              ? <TableRow><TableCell align="center" colSpan={99}>
                  <Box my={4} display="flex" alignItems="center" flexDirection='column' justifyContent="center" gap={2}>
                    <CircularProgress />
                    <Typography color="primary" variant="caption">Fetching Country Data...</Typography>
                  </Box>
                </TableCell></TableRow>


              : data && data.map(each => <TableRow hover key={each.id}>
                <TableCell><img src={each.flag} width={80} loading="lazy" /></TableCell>
                <TableCell>{each.countryName}</TableCell>
                <TableCell>{each.twoCharacterCountryCode}</TableCell>
                <TableCell>{each.threeCharacterCountryCode}</TableCell>
                <TableCell>{each.nativeCountryName}</TableCell>
                <TableCell>{each.alternativeCountryName}</TableCell>
                <TableCell>{each.countryCallingCodes}</TableCell>
              </TableRow>)
            }
          </TableBody>



        </Table>
      </TableContainer>
    </Paper>
  </Box>
}
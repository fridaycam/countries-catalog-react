import { Box, CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Typography } from "@mui/material"
import { Country } from "../App"
import { useMemo, useState } from "react"

export type HeadCell = {
  id: string
  label: string
  width?: string
}

const rowPerPage = 25
const orderBy = 'countryName'

type Order = 'asc' | 'desc'

type Props = {
  headCells: HeadCell[]
  data: Country[] | undefined
  isFetching: boolean
  errMsg: string
}

export const CountryTable = (props: Props) => {
  const [order, setOrder] = useState<Order>('asc');
  const [searchText, setSearchText] = useState('')

  const [page, setPage] = useState(0);

  const {headCells, data, isFetching, errMsg} = props

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(e.target.value)
    setPage(0)
  }

  const filteredData = data && data.filter(each =>
    each.countryName.toLowerCase().includes(searchText.toLowerCase())
    // || other fields can go here
  )

  const handleCountryNameSorting = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }


  const handleChangePage = (_:unknown, newPage:number) => {
    setPage(newPage);
  };

  
  return <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Stack spacing={2} direction={'row'} marginLeft={2} marginRight={2}>
        <TextField fullWidth label={"Search Country Name"} onChange={handleSearchTextChange} />
        <Box width={'200%'} textAlign={'left'} alignContent={'center'}>
          <Typography>Total: {filteredData ? filteredData.length : 0} / {data ? data.length : 0 }</Typography>
        </Box>
      </Stack>
      {filteredData && <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowPerPage}
        page={page}
        onPageChange={handleChangePage}
      />}
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="Countires Catalog"
        >
          <TableHead>
            <TableRow>
              {headCells.map(headCell => <TableCell width={headCell.width ? headCell.width : ''} key={headCell.id}>  
                {headCell.id === 'countryName' ? <TableSortLabel
                  active
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={handleCountryNameSorting}
                >
                  {headCell.label}
                </TableSortLabel>: headCell.label}
              </TableCell>)}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Show error message */}{/* TODO: this same code like showing loading animation below, should make it component */}
            {!isFetching && errMsg !== '' && <TableRow><TableCell align="center" colSpan={99}>
              <Box my={4} display="
              flex" alignItems="center" flexDirection='column' justifyContent="center" gap={2}>
                <Typography color="red">{errMsg}</Typography>
              </Box>
            </TableCell></TableRow>
            }
            { isFetching
              ? <TableRow><TableCell align="center" colSpan={99}>
                  <Box my={4} display="flex" alignItems="center" flexDirection='column' justifyContent="center" gap={2}>
                    <CircularProgress />
                    <Typography color="primary" variant="caption">Fetching Country Data...</Typography>
                  </Box>
                </TableCell></TableRow>




              : filteredData && filteredData
                .sort((a, b) => {
                  if (a.countryName > b.countryName) return order === 'asc' ? 1 : -1
                  if (a.countryName < b.countryName) return order === 'asc' ? -1 : 1
                  return 0
                })
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((each, i) => <TableRow hover key={each.id}>
                <TableCell>{rowPerPage * page + i + 1}</TableCell>
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
      {filteredData && <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowPerPage}
        page={page}
        onPageChange={handleChangePage}
      />}
    </Paper>
  </Box>
}
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import DatePicker from '@components/DatePicker'
import { observer } from 'mobx-react'
import { useStore } from '@lib/store'
import { DateRangeProps } from './TopBar.model'
// import { dateRangeStore } from './DateRange.store'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const DateRange: React.FC<DateRangeProps> = (props) => {
  const { startDate, endDate, changeFrom, changeTo } = useStore(props.store)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Item>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              label="From:"
              date={startDate}
              handleChange={changeFrom}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker label="To:" date={endDate} handleChange={changeTo} />
          </Grid>
        </Grid>
      </Item>
    </Box>
  )
}

export default observer(DateRange)

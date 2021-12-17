import * as React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'

interface DatePickerProps {
  date: Date
  handleChange: (date: Date) => void
  label: string
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  handleChange,
  label,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={(d) => {
            const newDate = d ?? new Date()
            handleChange(newDate)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default DatePicker

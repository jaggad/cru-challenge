import * as React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

interface DateTimePickerProps {
  date: Date
  handleChange: (date: Date) => void
  label: string
}

const DatePicker: React.FC<DateTimePickerProps> = ({
  date,
  handleChange,
  label,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label={label}
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

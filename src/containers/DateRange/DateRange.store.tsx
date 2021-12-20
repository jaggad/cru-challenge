import { types } from 'mobx-state-tree'
import { convertToTimeZone } from 'date-fns-timezone'

export const dateRangeModel = {
  startDate: types.Date,
  endDate: types.Date,
}

export const dateRangeInitialState = {
  startDate: new Date(`2018-06-18T05:00:00+00:00`),
  endDate: new Date(`2018-06-26T05:30:00+00:00`),
}

export const dateRangeActions = (self: {
  startDate: Date
  endDate: Date
  config: {
    timezone: string
  }
}) => ({
  changeFrom: (date: Date) =>
    (self.startDate = convertToTimeZone(date, {
      timeZone: self.config.timezone,
    })),
  changeTo: (date: Date) =>
    (self.endDate = convertToTimeZone(date, {
      timeZone: self.config.timezone,
    })),
})

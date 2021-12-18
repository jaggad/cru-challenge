import { types } from 'mobx-state-tree'

export const dateRangeModel = {
  startDate: types.Date,
  endDate: types.Date,
}

export const dateRangeInitialState = {
  startDate: new Date(`2018-06-18T05:00:00+00:00`),
  endDate: new Date(`2018-06-25T05:30:00+00:00`),
}

export const dateRangeActions = (self: { startDate: Date; endDate: Date }) => ({
  changeFrom: (date: Date) => (self.startDate = date),
  changeTo: (date: Date) => (self.endDate = date),
})

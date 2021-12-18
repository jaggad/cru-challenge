import { ShiftData } from './ShiftEditorModal.model'
import { types } from 'mobx-state-tree'

/**
 * Modal Store
 */
export const shiftEditorModalModel = {
  isOpen: types.boolean,
  shiftId: types.optional(types.number, 0),
}

export const shiftEditorModalInitialState = {
  isOpen: false,
  shiftId: 0,
}

export const shiftEditorModalActions = (self: {
  isOpen: boolean
  shiftId: number
  shifts: ShiftData[]
}) => ({
  handleOpen: (shiftId: number) => {
    self.shiftId = shiftId
    self.isOpen = true
  },
  handleClose: () => (self.isOpen = false),
  updateShift: (
    shiftId: number,
    shiftData?: { start_time?: string; end_time?: string }
  ) => {
    const shiftIndex = self.shifts.findIndex((shift) => shift.id === shiftId)
    console.log('update:', shiftData)
    self.shifts[shiftIndex] = {
      ...self.shifts[shiftIndex],
      ...shiftData,
    }
  },
})

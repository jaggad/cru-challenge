import { ShiftData } from '@containers/RosterTable/RosterTable.model'
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

/**
 * Shift editor modal actions root functions
 *
 * @param self the root store object reference
 * @returns an object of localised store actions
 */
export const shiftEditorModalActions = (self: {
  isOpen: boolean
  shiftId: number
  shifts: ShiftData[]
}) => ({
  /**
   * Opens the modal and updates shiftId in global store
   * @param shiftId
   * @returns void
   */
  handleOpen: (shiftId: number): void => {
    self.shiftId = shiftId
    self.isOpen = true
  },

  /**
   * Closes the modal and empties shift id
   * @returns void
   */
  handleClose: (): void => {
    self.isOpen = false
    self.shiftId = 0
  },

  /**
   * Update the store's current shift data with user input
   * @param shiftId shift unique id
   * @param shiftData the shift data start time and end time properties
   * @returns void
   */
  updateShift: (
    shiftId: number,
    shiftData?: { start_time?: string; end_time?: string }
  ): void => {
    const shiftIndex = self.shifts.findIndex((shift) => shift.id === shiftId)

    self.shifts[shiftIndex] = {
      ...self.shifts[shiftIndex],
      ...shiftData,
    }
  },
})

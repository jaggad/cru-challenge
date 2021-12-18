import { types } from 'mobx-state-tree'

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
}) => ({
  handleOpen: (shiftId: number) => {
    self.shiftId = shiftId
    self.isOpen = true
  },
  handleClose: () => (self.isOpen = false),
})

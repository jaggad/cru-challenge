import * as React from 'react'
import {
  Modal,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material'
import { observer } from 'mobx-react'
import { useStore } from '@lib/store'
import { ShiftEditorModalProps } from './ShiftEditorModal.model'
import {
  ModalContainer,
  ModalInner,
  FormControlWrapper,
} from './ShiftEditorModal.styles'
import DateTimePicker from '@components/DateTimePicker'

// API Data
import roles from '../../api/roles.json'

/**
 * A ShiftEditorModal Component to display and edit shift data
 * inside of a modal component
 *
 * @returns A JSX Element
 */
const ShiftEditorModal: React.FC<ShiftEditorModalProps> = ({ store }) => {
  const { isOpen, handleClose, shiftId, shifts, updateShift } = useStore(store)

  const shiftData = shifts.find((shift) => shift.id === shiftId)

  // Handle no matching shift
  if (typeof shiftData === 'undefined') {
    return null
  }

  const startTime = new Date(shiftData.start_time)
  const endTime = new Date(shiftData.end_time)

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <ModalInner>
            <form>
              <h4>Employee Name</h4>
              <FormGroup>
                <FormControlWrapper>
                  <DateTimePicker
                    label="Shift start"
                    date={startTime}
                    handleChange={(date) =>
                      updateShift(shiftId, { start_time: date.toString() })
                    }
                  />
                </FormControlWrapper>

                <FormControlWrapper>
                  <DateTimePicker
                    label="Shift end"
                    date={endTime}
                    handleChange={(date) =>
                      updateShift(shiftId, { end_time: date.toString() })
                    }
                  />
                </FormControlWrapper>

                <FormControlWrapper>
                  <InputLabel>Break</InputLabel>

                  <Select value={shiftData.break_duration} label="Break">
                    <MenuItem value={900}>15 mins</MenuItem>
                    <MenuItem value={1800}>30 mins</MenuItem>
                    <MenuItem value={3600}>1 hour</MenuItem>
                    <MenuItem value={5400}>1.5 hours</MenuItem>
                  </Select>
                </FormControlWrapper>

                <FormControlWrapper>
                  <InputLabel>Role</InputLabel>
                  <Select value={shiftData.role_id} label="Role">
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControlWrapper>

                <Button variant="contained" onClick={handleClose}>
                  Update
                </Button>
              </FormGroup>
            </form>
          </ModalInner>
        </ModalContainer>
      </Modal>
    </div>
  )
}

export default observer(ShiftEditorModal)

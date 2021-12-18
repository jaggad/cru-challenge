import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import FormControl from '@mui/material/FormControl'

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ModalInner = styled(Paper)`
  padding: 32px 24px;
`

export const FormControlWrapper = styled(FormControl)`
  margin-bottom: 1rem;
`

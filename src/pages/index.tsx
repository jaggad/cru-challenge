// import { initializeApollo, addApolloState } from '../lib/apolloClient'

import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Head from 'next/head'
import DateRange from '@containers/DateRange/DateRange'
import RosterTable from '@containers/RosterTable/RosterTable'
import ShiftEditorModal from '@containers/ShiftEditorModal/ShiftEditorModal'

/**
 * The CRU Challenge IndexPage
 * @returns CRU Index Page
 */
export default function IndexPage() {
  return (
    <>
      <Head>
        <title>CRU Challenge - Rostering</title>
      </Head>
      <Container>
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Select Roster Period
          </Typography>
          <DateRange />
        </Box>
        <Box>
          <RosterTable />
        </Box>
        <ShiftEditorModal />
      </Container>
    </>
  )
}

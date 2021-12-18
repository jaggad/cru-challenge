import React, { ReactChildren } from 'react'
import { render, cleanup } from '../../lib/testUtils'
import { getShiftType } from './getShiftType'

afterEach(cleanup)

describe('getShiftType', () => {
  it('return the correct day period string based on hours', () => {
    const morning = new Date('2018-06-18T06:30:00+00:00')
    const day = new Date('2018-06-18T13:30:00+00:00')
    const evening = new Date('2018-06-18T17:30:00+00:00')
    const night = new Date('2018-06-18T20:30:00+00:00')

    expect(getShiftType(morning)).toStrictEqual('Morning')
    expect(getShiftType(day)).toStrictEqual('Day')
    expect(getShiftType(evening)).toStrictEqual('Evening')
    expect(getShiftType(night)).toStrictEqual('Night')
  })

  it('return N/A if not a valid input', () => {
    const fail = new Date('fake')
    expect(getShiftType(fail)).toStrictEqual('N/A')
  })
})

describe('RosterTable', () => {
  it('return N/A if not a valid input', () => {
    const fail = new Date('fake')
    expect(getShiftType(fail)).toStrictEqual('N/A')
  })
})

import { cleanup } from '../../lib/testUtils'
import { getShiftType } from './RosterTable.logic'

afterEach(cleanup)

describe('getShiftType', () => {
  // Dates are in UTC Time and converted
  const timeZone = 'Australia/Brisbane'

  it('return the correct day period string based on hours', () => {
    const night = new Date(`2018-06-18T13:30:00+00:00`)
    expect(getShiftType(night, timeZone)).toStrictEqual('Night')

    const morning = new Date(`2018-06-18T17:30:00+00:00`)
    expect(getShiftType(morning, timeZone)).toStrictEqual('Morning')

    const day = new Date(`2018-06-18T04:30:00+00:00`)
    expect(getShiftType(day, timeZone)).toStrictEqual('Day')

    const evening = new Date(`2018-06-19T07:30:00+00:00`)
    expect(getShiftType(evening, timeZone)).toStrictEqual('Evening')
  })

  it('return N/A if not a valid input', () => {
    const fail = new Date('fake')
    expect(getShiftType(fail, timeZone)).toStrictEqual('N/A')
  })

  it('return N/A if not a valid input', () => {
    const fail = new Date('fake')
    expect(getShiftType(fail, timeZone)).toStrictEqual('N/A')
  })
})

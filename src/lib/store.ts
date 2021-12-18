import { useMemo } from 'react'
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree'
import {
  dateRangeInitialState,
  dateRangeActions,
  dateRangeModel,
} from '@containers/DateRange/DateRange.store'
import {
  shiftEditorModalInitialState,
  shiftEditorModalModel,
  shiftEditorModalActions,
} from '@containers/ShiftEditorModal/ShiftEditorModal.store'

let store: IStore | undefined

// import employees from '../../../api/employees.json'
import shifts from '../api/shifts.json'
import config from '../api/config.json'

export const shiftModel = types.model({
  employee_id: types.number,
  start_time: types.string,
  role_id: types.number,
  end_time: types.string,
  id: types.number,
  break_duration: types.number,
})

const shiftsStore = {
  shifts: types.array(shiftModel),
}

const configModel = types.model({
  timezone: types.string,
  location: types.string,
})

const configStore = {
  config: configModel,
}

const Store = types
  .model('RosterStore')
  // API Data
  // (Adding to store for easy access given there's no API)
  .props(shiftsStore)
  .props(configStore)
  // Shift Editor Modal
  .props(shiftEditorModalModel)
  .actions(shiftEditorModalActions)
  // Date Range
  .props(dateRangeModel)
  .actions(dateRangeActions)

export type IStore = Instance<typeof Store>
export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    Store.create({
      ...dateRangeInitialState,
      ...shiftEditorModalInitialState,
      config,
      shifts,
    })

  // If your page has Next.js data fetching methods that use a Mobx store, it will get hydrated here
  if (snapshot) {
    applySnapshot(_store, snapshot)
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  // Create the store once in the client
  if (!store) store = _store

  return store
}

// eslint-disable-next-line
export type InitialState = null | undefined | any

export interface InitialStatePageProps {
  initialState: InitialState
}

export function useStore(initialState: InitialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

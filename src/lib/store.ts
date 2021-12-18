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

const Store = types
  .model('RosterStore')
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
    Store.create({ ...dateRangeInitialState, ...shiftEditorModalInitialState })

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

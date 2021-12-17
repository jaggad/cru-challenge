import { useMemo } from 'react'
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from 'mobx-state-tree'
import {
  dateRangeInitialState,
  dateRangeStore,
} from '@containers/DateRange/DateRange.store'

let store: IStore | undefined

const Store = dateRangeStore

export type IStore = Instance<typeof Store>
export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export function initializeStore(snapshot = null) {
  const _store = store ?? Store.create({ ...dateRangeInitialState })

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

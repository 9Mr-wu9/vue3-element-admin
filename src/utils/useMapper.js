import { useStore } from "vuex"
import { computed } from "vue"

export function useStateMapper(mapper, mapFn) {
  const store = useStore();
  const storeStateFns = mapFn(mapper)
  const storeState = {}

  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })

  return storeState
}

export function useActionMapper(mapper, mapFn) {
  const store = useStore()
  const storeActionFns = mapFn(mapper)
  const storeAction = {}
  
  Object.keys(storeActionFns).forEach(fnKey => {
    storeAction[fnKey] = storeActionFns[fnKey].bind({ $store: store })
  })

  return storeAction
}

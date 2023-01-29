import { mapState, createNamespacedHelpers } from "vuex"
import { useStateMapper } from './useMapper'
// import { checkType } from './index'

/**
 * 
 * @param {*} moduleName 模块名称
 * @param {*} mapper state 属性集合 ['name', 'age']
 */
export function useState(moduleName, mapper) {
  let mapperFn = mapState
  // if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
  //   mapperFn = createNamespacedHelpers(moduleName).mapState
  // }

  mapperFn = createNamespacedHelpers(moduleName).mapState

  return useStateMapper(mapper, mapperFn)
}

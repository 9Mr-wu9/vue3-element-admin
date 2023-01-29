import { mapActions, createNamespacedHelpers } from "vuex"
import { useActionMapper } from './useMapper'
// import { checkType } from './index'

/**
 * 
 * @param {*} moduleName 模块名称
 * @param {*} mapper mapper 方法名集合 ['name', 'age']
 */
export function useActions(moduleName, mapper) {
  let mapperFn = mapActions
  // if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
  //   mapperFn = createNamespacedHelpers(moduleName).mapActions
  // }

  mapperFn = createNamespacedHelpers(moduleName).mapActions

  return useActionMapper(mapper, mapperFn)
}

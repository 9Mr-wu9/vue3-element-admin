import { mapGetters, createNamespacedHelpers } from 'vuex'
import { useStateMapper } from './useMapper'
// import { checkType } from './index'

/**
 * 
 * @param {*} moduleName 模块名称
 * @param {*} mapper getters 属性集合 ['name', 'age']
 */

export function useGetters(moduleName, mapper) {
  let mapperFn = mapGetters;

  // if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
  //   mapperFn = createNamespacedHelpers(moduleName).mapGetters
  // }

  mapperFn = createNamespacedHelpers(moduleName).mapGetters

  return useStateMapper(mapper, mapperFn)
}

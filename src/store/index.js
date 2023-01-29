// import { createStore } from 'vuex'
// import getters from './getters'

// const modulesFiles = import.meta.glob('./modules/*.js')

// const modules = {};

// for (const modulePath in modulesFiles) {
//   modulesFiles[modulePath]().then((val) => {
//     const moduleName = modulePath.replace(/.*\/(.+)\.js/, '$1') // ./modules/xxx.js => xxx
//     modules[moduleName] = val.default

//   })
// }

// const store = createStore({
//   modules,
//   getters
// })

// export default store;

import { createStore } from 'vuex';
import getters from './getters'

import app from './modules/app';
import settings from './modules/settings';
import permission from './modules/permission';

const store = createStore({
  modules: {
    app,
    settings,
    permission,
  },
  getters
})

export default store;

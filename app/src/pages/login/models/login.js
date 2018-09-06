import { query } from '../services/login'

export default {
  namespace: 'login',
  state: {
    text: 'page work',
    list: [],
  },
  effects: {
    *fetch({ payload }, { put }) {
      const data = yield query(payload)
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          text: JSON.stringify(data),
        },
      })
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}

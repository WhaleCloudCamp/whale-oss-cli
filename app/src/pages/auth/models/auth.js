import { query } from '../services/auth'

export default {
  namespace: 'auth',
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

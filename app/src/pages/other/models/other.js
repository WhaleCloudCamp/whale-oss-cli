import { query } from '../services/other'

export default {
  namespace: 'other',
  state: {
    text: 'page work',
    list: [],
  },
  subscriptions: {
    setup(props) {
      console.log(props)
      // dispatch({ type: 'loadStorage' })
    },
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

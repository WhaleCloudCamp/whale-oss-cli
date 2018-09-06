import { query } from '../services/home'

export default {
  namespace: 'home',
  state: {
    text: 'Dva Native',
    list: [],
  },
  subscriptions: {
    setup(props) {
      console.log(props)
      // dispatch({ type: 'loadStorage' })
    },
  },
  effects: {
    *reset({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          text: payload,
        },
      })
    },
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

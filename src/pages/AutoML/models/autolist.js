import { queryAutoList, removeAutoList, addAutoList, updateAutoList } from '@/services/api';

export default {
  namespace: 'autolist',

  state: {
    autolist: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAutoList, payload);
      yield put({
        type: 'queryAutoList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryAutoList, payload);
      yield put({
        type: 'appendAutoList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeAutoList : updateAutoList;
      } else {
        callback = addAutoList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryAutoList',
        payload: response,
      });
    },
  },

  reducers: {
    queryAutoList(state, action) {
      return {
        ...state,
        autolist: action.payload,
      };
    },
    appendAutoList(state, action) {
      return {
        ...state,
        autolist: state.autolist.concat(action.payload),
      };
    },
  },
};

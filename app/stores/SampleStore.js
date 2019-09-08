import { ReduceStore } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";

import { ActionTypes } from "../constants/AppConstants";

class SampleStore extends ReduceStore {
  getInitialState() {
    return {
      title: "Title",
      subtitle: "Subtitle",
      text: "Text",
      count: 0
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SAMPLE_TYPE_001: {
        const newCount = state.count + 1;
        return {
          title: action.data.title,
          subtitle: action.data.subtitle,
          text: `Action Creator was called ${newCount} times.`,
          count: newCount
        };
      }
      case ActionTypes.SAMPLE_TYPE_002:
        return state;
      default:
        return state;
    }
  }
}

export default new SampleStore(AppDispatcher);

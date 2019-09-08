import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";

const getTopAction001 = () => ({
  type: ActionTypes.TOP_TYPE_001,
  data: {
    title: "New Title",
    subtitle: "Created by ActionCreator",
    text: "This text will be overwritten"
  }
});

const getTopAction002 = () => ({
  type: ActionTypes.TOP_TYPE_002,
  data: "RESULT OF YOUT ACTION"
});

const getTopAction003 = () => ({
  type: ActionTypes.TOP_TYPE_003,
  data: "RESULT OF YOUT ACTION"
});

export const TopActionCreators = {
  actionCreator001() {
    AppDispatcher.dispatch(getTopAction001());
  },
  actionCreator002() {
    AppDispatcher.dispatch(getTopAction002());
  },
  actionCreator003() {
    AppDispatcher.dispatch(getTopAction003());
  }
};

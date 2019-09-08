import { ReduceStore } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
var EventEmitter = require("events").EventEmitter;

import { ActionTypes } from "../constants/AppConstants";
var request = require("superagent");

class TopStore extends ReduceStore {
  getInitialState() {
    return {
      title: "Title",
      subtitle: "Subtitle",
      text: "Text",
      count: 0,
      pokemonData: ["ronak"]
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.TOP_TYPE_001: {
        const newCount = state.count + 1;
        return {
          title: action.data.title,
          subtitle: action.data.subtitle,
          text: `Action Creator was called ${newCount} times.`,
          count: newCount
        };
      }
      case ActionTypes.TOP_TYPE_002:
        return state;
      case ActionTypes.TOP_TYPE_003: {
        request
          .get("https://pokeapi.co/api/v2/pokemon/?limit=811")
          .set("Accept", "application/json")
          .end(function(err, response) {
            if (err) return console.error(err);
            // console.log(response.body);

            //console.log(response);
            let pokemonData = [];
            for (let idx in response.body.results) {
              pokemonData.push(response.body.results[idx]["name"]);
            }
            console.log(pokemonData);
            return {
              pokemonData: pokemonData
            };
          });
      }
      default:
        return state;
    }
  }
}

export default new TopStore(AppDispatcher);

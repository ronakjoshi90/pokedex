import React, { Component } from "react";

var request = require("superagent");

var divStyle = {
  marginTop: "25px"
};

var divStyle2 = {
  marginTop: "5px"
};
var divStyle3 = {
  marginLeft: "5px"
};

class TopContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: ["ronak", "foram"],
      pokeMonOfTheDay: "",
      todays_date: "",
      pokeMonOfTheDay_image: "",
      searchString: "",
      tabType: "home",
      searchData: [],
      pokemonDetail: {},
      selectedPokemon: ""
    };

    this.fetchPokeMonOfTheDay = this.fetchPokeMonOfTheDay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showSearchData = this.showSearchData.bind(this);
    //this.viewPokeMonDetails = this.viewPokeMonDetails.bind(this);
  }

  handleChange(e) {
    this.setState({ searchString: e.target.value });
  }

  showSearchData() {
    let searchString = this.state.searchString.toUpperCase();
    let pokemonData = this.state.pokemonData;
    let result = pokemonData.filter(o => o.includes(searchString));

    //console.log(result);

    if (result.length == 0) {
      alert("No Data Found");
    } else {
      this.setState({
        searchData: result,
        tabType: "search"
      });
    }
  }

  componentDidMount() {
    //TopActionCreators.actionCreator003();
    let currentComponent = this;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "_" + dd + "_" + yyyy;
    this.setState({
      todays_date: today
    });

    let pokeMonOfTheDay = localStorage.getItem("pokeMonOfTheDay_" + today);
    let pokeMonOfTheDay_image = localStorage.getItem("pokeMonOfTheDay_image");

    request
      .get("https://pokeapi.co/api/v2/pokemon/?limit=811")
      .set("Accept", "application/json")
      .end(function(err, response) {
        if (err) return console.error(err);
        // console.log(response.body);

        //console.log(response);
        let pokemonData = [];
        for (let idx in response.body.results) {
          pokemonData.push(response.body.results[idx]["name"].toUpperCase());
        }

        if (
          typeof pokeMonOfTheDay == "undefined" ||
          pokeMonOfTheDay == null ||
          pokeMonOfTheDay == ""
        ) {
          pokeMonOfTheDay =
            pokemonData[Math.floor(Math.random() * pokemonData.length)];

          localStorage.setItem("pokeMonOfTheDay_" + today, pokeMonOfTheDay);
          //localStorage.setItem("mytime", Date.now());
        }

        currentComponent.fetchPokeMonOfTheDay(pokeMonOfTheDay);

        currentComponent.setState({
          pokemonData: pokemonData
        });
      });
  }

  viewPokeMonDetails(pokemon) {
    console.log("in viewPokeMonDetails  ");
    console.log(pokemon);
    let currentComponent = this;

    let pokemon_name = pokemon.toLowerCase();
    request
      .get("https://pokeapi.co/api/v2/pokemon/" + pokemon_name + "/")
      .set("Accept", "application/json")
      .end(function(err, response) {
        if (err) return console.error(err);

        currentComponent.setState({
          pokemonDetail: response.body,
          tabType: "details",
          selectedPokemon: pokemon_name
        });
      });
  }

  fetchPokeMonOfTheDay(pokeMonOfTheDay) {
    let currentComponent = this;
    request
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeMonOfTheDay + "/")
      .set("Accept", "application/json")
      .end(function(err, response) {
        if (err) return console.error(err);
        // console.log(response.body);

        //console.log(response);

        let pokeMonOfTheDay_image = response.body.sprites.front_default;
        localStorage.setItem("pokeMonOfTheDay_image", pokeMonOfTheDay_image);
        //localStorage.setItem("mytime", Date.now());

        currentComponent.setState({
          pokeMonOfTheDay: pokeMonOfTheDay.toUpperCase(),
          pokeMonOfTheDay_image: pokeMonOfTheDay_image
        });
      });
  }

  render() {
    const {
      pokemonData,
      pokeMonOfTheDay,
      pokeMonOfTheDay_image,
      searchString,
      tabType,
      searchData,
      pokemonDetail,
      selectedPokemon
    } = this.state;

    const thisObj = this;

    // console.log(pokemonData);
    return (
      <>
        <div className="container">
          <h3>Pokedex</h3>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for Pokemon"
              value={searchString}
              onChange={e => this.handleChange(e)}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.showSearchData}
              >
                <i className="fa fa-search fa-fw"></i> Search
              </button>
            </span>
          </div>
          {tabType == "home" && (
            <div>
              <div className="alert alert-danger" role="alert" style={divStyle}>
                Pokemon Of the Day
              </div>
              <div className="col-xs-12 col-sm-12">
                <a href="#" className="thumbnail">
                  <img src={pokeMonOfTheDay_image} />
                </a>
              </div>
              <span className="label label-warning col-xs-12 col-sm-12">
                <h4>{pokeMonOfTheDay}</h4>
              </span>

              {/* {pokemonData.map((name, index) => (
            <span key={index} className="label label-warning">
              {name}
            </span>
          ))} */}
            </div>
          )}
          {tabType == "search" && (
            <div>
              <div className="alert alert-danger" role="alert" style={divStyle}>
                Showing Search Result(s)
              </div>

              {searchData.map(function(name2, index2) {
                return (
                  <div
                    key={index2}
                    style={divStyle2}
                    className="card col-xs-4 col-sm-4"
                  >
                    <div
                      className="card-body"
                      onClick={() => thisObj.viewPokeMonDetails(name2)}
                    >
                      <h5 className="card-title">{name2}</h5>
                      <a href="#" className="card-link">
                        View Details
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tabType == "details" && (
            <div>
              <span
                className="label label-warning col-xs-12 col-sm-12"
                style={divStyle}
              >
                <h4>
                  {"#" +
                    pokemonDetail["id"] +
                    " " +
                    selectedPokemon.toUpperCase()}
                </h4>
              </span>
              <span className="col-xs-12 col-sm-12" style={divStyle2}>
                {pokemonDetail.types.map(function(name4, index4) {
                  let typeData = pokemonDetail.types[index4];
                  console.log(typeData);
                  return (
                    <span
                      className="badge badge-success pull-right"
                      key={index4}
                      style={divStyle3}
                    >
                      {typeData["type"]["name"]}
                    </span>
                  );
                })}
              </span>
              <div className="col-xs-12 col-sm-12">
                <div className="col-xs-6 col-sm-6" style={divStyle}>
                  <a href="#" className="thumbnail">
                    <img src={pokemonDetail["sprites"]["front_default"]} />
                  </a>
                </div>
                <div className="col-xs-6 col-sm-6">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Property</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pokemonDetail.stats.map(function(name3, index3) {
                        let statsData = pokemonDetail.stats[index3];

                        return (
                          <tr key={index3}>
                            <th scope="row">{index3 + 1}</th>
                            <td>{statsData["stat"]["name"]}</td>
                            <td>{statsData["base_stat"]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12">
                <span
                  className="label label-danger col-xs-12 col-sm-12"
                  style={divStyle2}
                >
                  <h6>Profile</h6>
                </span>
                <table className="table" style={divStyle}>
                  <tbody>
                    <tr>
                      <th scope="row">Height</th>
                      <td>{pokemonDetail["height"]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Weight</th>
                      <td>{pokemonDetail["weight"]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}{" "}
        </div>
      </>
    );
  }
}

export default TopContainer;

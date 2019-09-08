import React, { Component } from "react";
import { Container } from "flux/utils";
import TopStore from "../stores/TopStore";
import { Navi } from "./Navi";
import TopContent from "./TopContent";

class TopContainer extends Component {
  static getStores() {
    return [TopStore];
  }

  static calculateState() {
    const data = TopStore.getState();
    return {
      title: data.title,
      subtitle: data.subtitle,
      text: data.text
    };
  }

  render() {
    const { title, subtitle, text } = this.state;
    return (
      <>
        <Navi title="Top" />
        <TopContent title={title} subtitle={subtitle} text={text} />
      </>
    );
  }
}

export default Container.create(TopContainer);

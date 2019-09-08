import React, { Component } from "react";
import { Container } from "flux/utils";
import SampleStore from "../stores/SampleStore";
import { Navi } from "./Navi";
import SampleContent from "./SampleContent";

class SampleContainer extends Component {
  static getStores() {
    return [SampleStore];
  }

  static calculateState() {
    const data = SampleStore.getState();
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
        <Navi title="Sample" />
        <SampleContent title={title} subtitle={subtitle} text={text} />
      </>
    );
  }
}

export default Container.create(SampleContainer);

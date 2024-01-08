import Block from "../../components/Block";
import template from "./modal.hbs";
import "./modal.pcss";

export default class Modal extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}

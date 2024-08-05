import { Component } from "react";
import ErrorMessage from "./error-message/ErrorMessage";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      message: "",
    };
  }

  static getDerivedStateFromError(err) {
    console.log(err);

    return {
      hasError: true,
      message: err.message,
    };
  }

  render() {
    if (this.state.hasError) {
      // return <h1> {this.state.message} </h1>;
      return <ErrorMessage message={this.state.message} />;
    }

    return this.props.children;
  }
}

import React, { Component } from "react";
import Spinner from "../components/spinner";

// import ErrorIndicator from '../error-indicator';

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
    };

    componentDidMount() {
      this.updata()
    }

    componentDidUpdate(prevProps) {
      if(this.props.getData !== prevProps.getData) {
        this.updata()
      }
    }

    updata = () => {
      this.props.getData().then((data) => {
        this.setState({
          data,
        });
      });
    };

    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;

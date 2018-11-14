import React from "react";
import { css } from "react-emotion";
// First way to import
import { HashLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <HashLoader
          className={override}
          sizeUnit={"px"}
          size={50}
          color={"#F5A623"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
export default AwesomeComponent;

import * as React from "react";
import styles from "../../portivaSearch/components/PortivaSearch.module.scss";

import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

export class LoadingSpinner extends React.Component<{ text?: string, size?: SpinnerSize }, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <Spinner
        label={this.props.text ? this.props.text : "Loading..."}
        size={this.props.size ? this.props.size : SpinnerSize.large}
      />
    );
  }
}

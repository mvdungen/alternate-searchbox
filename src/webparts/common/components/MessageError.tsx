import * as React from "react";
import styles from "../../portivaSearch/components/PortivaSearch.module.scss";

export class ErrorMessage extends React.Component<{ text?: string, severity?: number }, {}> {
  public render(): React.ReactElement<{}> {

    const errMessage: string = this.props.text !== "" ? this.props.text : "An error occured, please don't panic!";

    // get error icon
    let errIcon: string = "";

    switch (this.props.severity) {
      case 1:
        errIcon = "Error";
        break;
      default:
        errIcon = "Warning";
    }

    return (
      <div className={styles.errorContainer}>
        <i className={`ms-Icon ms-Icon--${errIcon}`} aria-hidden="true"></i>
        {errMessage}
      </div>
    );
  }
}

import * as React from "react";
import styles from "../../portivaSearch/components/PortivaSearch.module.scss";

export class ComponentTitle extends React.Component<{ title: string }, {}> {
  public render(): React.ReactElement<{}> {
    if (this.props.title !== "") {
      return (
        <div className={styles.row}>
          <div className={styles.fullColumn}>
            <div className={styles.title}>
              {this.props.title}
            </div>
          </div>
        </div>
      );
    } else {
      // no title > return nothing to reduce height in web part
      return null;
    }
  }
}

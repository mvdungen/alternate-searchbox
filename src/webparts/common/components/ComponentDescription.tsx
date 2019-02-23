import * as React from "react";
import styles from "../../portivaSearch/components/PortivaSearch.module.scss";

export class ComponentDescription extends React.Component<{ description: string }, {}> {
  public render(): React.ReactElement<{}> {
    if (this.props.description !== "") {
      return (
        <div className={styles.row}>
          <div className={styles.fullColumn}>
            <div className={styles.description}>
              {this.props.description}
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

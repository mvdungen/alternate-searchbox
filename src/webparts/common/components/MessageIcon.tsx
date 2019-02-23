import * as React from "react";
import styles from "../../portivaSearch/components/PortivaSearch.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export class IconMessage extends React.Component<{ text?: string, icon?:string }, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <div>
        <Icon iconName={`${this.props.icon}`} className={`ms-IconExample ${styles.iconMessage}`} /> {this.props.text}
      </div>
    );
  }
}

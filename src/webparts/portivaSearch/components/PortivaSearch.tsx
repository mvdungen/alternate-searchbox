import * as React from "react";

import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import {
  IPortivaSearchProps,
  IPortivaSearchState
} from "../interfaces/PortivaSearchInterfaces";
import { ComponentTitle } from "../../common/components/ComponentTitle";
import { ComponentDescription } from "../../common/components/ComponentDescription";

import styles from "../../portivaSearch/components/PortivaSearch.module.scss";

const enum ENUMDefaultSearch {
  unset = 0,
  alternateSearch,
  searchAll,
  searchDocuments,
  searchSites
}

export default class PortivaSearch extends React.Component<IPortivaSearchProps, IPortivaSearchState> {

  private _searchValue: string = "";
  private _defaultSearch: ENUMDefaultSearch = ENUMDefaultSearch.unset;

  public render(): React.ReactElement<IPortivaSearchProps> {

    if (this.props.hideSPSearchBox) {
      // check: hide the default SP search
      this._hideSPSearchBox();
    }

    // additional styling for searchbox and centering
    const styleRowSearchBox: string =
      this.props.showSearchButton ? styles.column10 : styles.column12;
    const styleCenterWebpart: string =
      this.props.centerSearchWebPart ? styles.centerWebPart : "";

    return (
      <div className={styles.portivaSearch}>
        <div className={styles.container}>
          <div className={`${styleCenterWebpart}`}>
            <ComponentTitle title={this.props.title} />
            {
              this.props.showDescriptionBelowSearchBox ? null :
                <ComponentDescription description={this.props.description} />
            }
            <div className={styles.row}>
              <div className={styleRowSearchBox}>
                <SearchBox
                  placeholder={this.props.searchBoxPlaceholder}
                  onSearch={this._onSearch}
                  onChange={(value: string) => this._searchValue = value} />
              </div>
              {
                !this.props.showSearchButton ? null :
                  <div className={styles.column02}>
                    <PrimaryButton
                      text={this.props.searchButtonLabel}
                      onClick={() => this._onSearch(this._searchValue)} />
                  </div>
              }
            </div>
            {
              !this.props.showDescriptionBelowSearchBox ? null :
                <ComponentDescription description={this.props.description} />
            }
            {
              this._renderPivots()
            }
          </div>
        </div>
      </div>
    );
  }

  private _renderPivots = (): JSX.Element => {
    // set return value to nothing
    let returnPivots: JSX.Element[] = [];

    // set default search
    this._defaultSearch = this.props.useDefaultSearchResult
      ? ENUMDefaultSearch.unset : ENUMDefaultSearch.alternateSearch;

    // check if we should render pivots
    if (this.props.useDefaultSearchResult) {
      // render the requested pivots
      if (this.props.showPivotAll) {
        returnPivots.push(
          <PivotItem key="all"
            headerText={"Alles"} />
        );
        // set default
        this._defaultSearch = this._defaultSearch === ENUMDefaultSearch.unset
          ? ENUMDefaultSearch.searchAll : this._defaultSearch;
      }
      if (this.props.showPivotDocuments) {
        returnPivots.push(
          <PivotItem key="docs"
            headerText={"Bestanden"} />
        );
        // set default
        this._defaultSearch = this._defaultSearch === ENUMDefaultSearch.unset
          ? ENUMDefaultSearch.searchDocuments : this._defaultSearch;
      }
      if (this.props.showPivotSites) {
        returnPivots.push(
          <PivotItem key="sites"
            headerText={"Sites"} />
        );
        // set default
        this._defaultSearch = this._defaultSearch === ENUMDefaultSearch.unset
          ? ENUMDefaultSearch.searchSites : this._defaultSearch;
      }
    }

    if (returnPivots.length > 0) {
      // return the Pivot element (only when 2 or more pivots selected)
      return (
        <div>
          <Pivot onLinkClick={this._onPivotClick}>
            {
              returnPivots.map((pivotItem: JSX.Element, idx: number) => {
                return pivotItem;
              })
            }
          </Pivot>
        </div>
      );
    } else {
      // nothing the render (alternate search or one pivot selected)
      this._defaultSearch = this._defaultSearch === ENUMDefaultSearch.unset
        ? ENUMDefaultSearch.searchAll : this._defaultSearch;
      // return empty element
      return null;
    }
  }

  private _onPivotClick = (item?: any, ev?: React.MouseEvent<HTMLElement>): void => {
    switch (item.key) {
      case ".$all":
        this._defaultSearch = ENUMDefaultSearch.searchAll;
        break;
      case ".$docs":
        this._defaultSearch = ENUMDefaultSearch.searchDocuments;
        break;
      case ".$sites":
        this._defaultSearch = ENUMDefaultSearch.searchSites;
        break;
      default:
      // we should not be here...
    }
  }

  private _hideSPSearchBox = (): void => {
    if (this.props.spSearchBoxClassName !== "") {
      // hide the search box by creating a callback/timeout (really neat...)
      window.setTimeout(
        (): void => {
          // get the search element(s)
          const elmSPSearch: any = document.getElementsByClassName(this.props.spSearchBoxClassName);
          // hide the search element
          if (elmSPSearch.length !== 0) {
            elmSPSearch[0].style.display = "none";
          } else {
            console.log("Search class not found, increase the timeout value in the settings!");
          }
        }, this.props.spSearchBoxHideTimeOut
      );
    }
  }

  private _onSearch = (searchValue: string): void => {

    // set result pages for default search
    const searchUrls: string[] = [];
    const baseUrl: string = this.props.context.pageContext.web._absoluteUrl;

    searchUrls[ENUMDefaultSearch.unset] = "";
    searchUrls[ENUMDefaultSearch.alternateSearch]
      = `${this.props.ResultPageUrl}?k=${encodeURI(searchValue)}`;
    searchUrls[ENUMDefaultSearch.searchAll]
      = `${baseUrl}/_layouts/15/search.aspx/siteall?q=${searchValue}`;
    searchUrls[ENUMDefaultSearch.searchDocuments]
      = `${baseUrl}/_layouts/15/search.aspx/sitefiles?q=${searchValue}`;
    searchUrls[ENUMDefaultSearch.searchSites]
      = `${baseUrl}/_layouts/15/search.aspx/sitesites?q=${searchValue}`;

    if (searchValue !== "" && searchUrls[this._defaultSearch] !== "") {
      // open the result page
      window.location.href = searchUrls[this._defaultSearch];
    }
  }

}

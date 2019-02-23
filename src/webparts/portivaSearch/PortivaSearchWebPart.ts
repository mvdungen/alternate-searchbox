import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from "@microsoft/sp-webpart-base";
import {
  IPortivaSearchProps,
  IPortivaSearchWebPartProps, ISearchPivot
} from "./interfaces/PortivaSearchInterfaces";
import PortivaSearch from "./components/PortivaSearch";

import * as strings from "PortivaSearchWebPartStrings";


export default class PortivaSearchWebPart extends BaseClientSideWebPart<IPortivaSearchWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPortivaSearchProps> = React.createElement(
      PortivaSearch,
      {
        context: this.context,
        title: this.properties.title,
        description: this.properties.description,
        showDescriptionBelowSearchBox: this.properties.showDescriptionBelowSearchBox,
        ResultPageUrl: this.properties.ResultPageUrl,
        searchBoxPlaceholder: this.properties.searchBoxPlaceholder,
        showSearchButton: this.properties.showSearchButton,
        searchButtonLabel: this.properties.searchButtonLabel,
        centerSearchWebPart: this.properties.centerSearchWebPart,
        hideSPSearchBox: this.properties.hideSPSearchBox,
        spSearchBoxClassName: this.properties.spSearchBoxClassName,
        spSearchBoxHideTimeOut: this.properties.spSearchBoxHideTimeOut,
        searchPivots: this.properties.searchPivots,
        useDefaultSearchResult: this.properties.useDefaultSearchResult,
        showPivotAll: this.properties.showPivotAll,
        showPivotDocuments: this.properties.showPivotDocuments,
        showPivotSites: this.properties.showPivotSites
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            // tslint:disable-next-line:max-line-length
            description: "The Portiva Search integrates a searchbox on the page that show the results in the search result page."
          },
          groups: [
            {
              groupName: "Title and Description",
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title"
                }),
                PropertyPaneTextField("description", {
                  label: "Description", multiline: true, rows: 5
                }),
                PropertyPaneToggle("showDescriptionBelowSearchBox", {
                  label: "",
                  onText: "Description below Search Box",
                  offText: "Description above Search Box"
                })
              ]
            },
            {
              groupName: "Search Settings",
              groupFields: [
                PropertyPaneToggle("centerSearchWebPart", {
                  label: "",
                  onText: "Search Box Centered on Page",
                  offText: "Search Box Default Alignment"
                }),
                PropertyPaneTextField("searchBoxPlaceholder", {
                  label: "Search Box Placeholder"
                }),
                PropertyPaneTextField("searchButtonLabel", {
                  label: "Search Button Label",
                  onGetErrorMessage: this._validateRequiredField, disabled: !this.properties.showSearchButton
                }),
                PropertyPaneToggle("showSearchButton", {
                  label: "",
                  onText: "Search Button visible",
                  offText: "Search Button hidden"
                })
              ]
            }
          ]
        },
        {
          header: {
            // tslint:disable-next-line:max-line-length
            description: "The Portiva Search integrates a searchbox on the page that show the results in the search result page."
          },
          groups: [
            {
              groupName: "Result pages",
              groupFields: [
                PropertyPaneToggle("useDefaultSearchResult", {
                  label: "",
                  onText: "Use default result pages",
                  offText: "Use alternate result pages"
                }),
                PropertyPaneToggle("showPivotAll", {
                  label: "",
                  onText: "All Content Pivot visible",
                  offText: "All Content Pivot hidden",
                  disabled: !this.properties.useDefaultSearchResult
                }),
                PropertyPaneToggle("showPivotDocuments", {
                  label: "",
                  onText: "Documents Pivot visible",
                  offText: "Documents Pivot hidden",
                  disabled: !this.properties.useDefaultSearchResult
                }),
                PropertyPaneToggle("showPivotSites", {
                  label: "",
                  onText: "Sites Pivot visible",
                  offText: "Sites Pivot hidden",
                  disabled: !this.properties.useDefaultSearchResult
                }),
                PropertyPaneTextField("ResultPageUrl", {
                  label: "Absolute URL to search result page",
                  description: "Enter the absolute url to the search result page",
                  disabled: this.properties.useDefaultSearchResult
                })
              ]
            }
          ]
        },
        {
          header: {
            // tslint:disable-next-line:max-line-length
            description: "The Portiva Search integrates a searchbox on the page that show the results in the search result page."
          },
          groups: [
            {
              groupName: "Advanced Settings",
              groupFields: [
                PropertyPaneToggle("hideSPSearchBox", {
                  label: "Hide the standard SharePoint search box"
                }),
                PropertyPaneTextField("spSearchBoxClassName", {
                  label: "Classname of the default SP search box",
                  description: "The classname can be found using F12/Inspect. Do not use a '.' in front of the classname.",
                  disabled: !this.properties.hideSPSearchBox
                }),
                PropertyPaneTextField("spSearchBoxHideTimeOut", {
                  label: "Timeout in milliseconds before the search box is hidden",
                  description: "Sometimes it can take some time before the search box is displayed, use this timeout to wait.",
                  disabled: !this.properties.hideSPSearchBox
                })
              ]
            }
          ]
        }
      ]
    };
  }


  private _validateRequiredField = (value: string): string => {
    return value === "" ? "Please enter a value for this field" : "";
  }

}

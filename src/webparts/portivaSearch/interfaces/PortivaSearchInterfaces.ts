
export interface ISearchPivot {
  title: string;
  url: string;
  isDefault?: boolean;
}

export interface IPortivaSearchWebPartProps {
  context: any;
  title: string;
  description: string;
  showDescriptionBelowSearchBox: boolean;
  ResultPageUrl: string;
  searchBoxPlaceholder: string;
  showSearchButton: boolean;
  searchButtonLabel: string;
  centerSearchWebPart: boolean;
  hideSPSearchBox: boolean;
  spSearchBoxClassName: string;
  spSearchBoxHideTimeOut: number;
  searchPivots: string;
  useDefaultSearchResult: boolean;
  showPivotAll: boolean;
  showPivotDocuments: boolean;
  showPivotSites: boolean;
}

export interface IPortivaSearchProps extends IPortivaSearchWebPartProps { }

export interface IPortivaSearchState {
}

export interface ITitleProps {
  showTitle: boolean;
  title: string;
}
export interface IDescriptionProps {
  showDescription: boolean;
  description: string;
}

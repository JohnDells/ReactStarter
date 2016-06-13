import { FilterOperation, SortDirection } from 'Definitions';

export const QueryDataHelper = {
    toQuery: (querydata?: IQueryDataParameters) => {
        const parameters: string[] = [];
        if (querydata != null) {
            if (querydata.filters != null) {
                var filters = [];
                for (var i = 0; i < querydata.filters.length; i++) {
                    const filter = querydata.filters[i];
                    const fieldName = filter.fieldName;
                    const operation = filter.operation;
                    //  The replace below is a hack - http://stackoverflow.com/questions/3979367/how-to-escape-a-single-quote-to-be-used-in-an-odata-query
                    const rawFieldValue = filter.fieldValue;
                    const fieldValue = (typeof rawFieldValue === "string") ? encodeURIComponent(rawFieldValue) : rawFieldValue.toString();

                    let filterString = "";
                    switch (operation) {
                        case FilterOperation.Equals:
                            filterString = fieldName + "=" + fieldValue + "";
                            break;
                        case FilterOperation.NotEquals:
                            filterString = fieldName + "!=" + fieldValue + "";
                            break;
                        case FilterOperation.Contains:
                            filterString = fieldName + ".Contains(" + fieldValue + ")";
                            break;
                        case FilterOperation.GreaterThan:
                            filterString = fieldName + ">" + fieldValue + "";
                            break;
                        case FilterOperation.LessThan:
                            filterString = fieldName + "<" + fieldValue + "";
                            break;
                        case FilterOperation.GreaterThanOrEqualTo:
                            filterString = fieldName + ">=" + fieldValue + "";
                            break;
                        case FilterOperation.LessThanOrEqualTo:
                            filterString = fieldName + "<=" + fieldValue + "";
                            break;
                        case FilterOperation.Any:
                            filterString = fieldName + ".Any(" + fieldValue + ")";
                            break;
                    }
                    if (filterString.length > 0) {
                        filters.push(filterString);
                    }
                }
                if (filters.length > 0) {
                    var masterFilterString = filters.join(" and ");
                    parameters.push("$filter=" + masterFilterString);
                }
            }
            if (querydata.orderby != null) {
                const columnName = querydata.orderby.columnName;
                const direction = querydata.orderby.sortDirection;
                const querydataDirection = direction === SortDirection.Ascending ? "" : "desc";
                parameters.push("$orderby=" + columnName + "%20" + querydataDirection);
            }
            else {
                //  The order parameter is required for skip and top.
                const columnName = querydata.keyColumn;
                parameters.push("$orderby=" + columnName);
            }
            if (querydata.skip != null) {
                parameters.push("$skip=" + querydata.skip);
            }
            if (querydata.top != null) {
                parameters.push("$top=" + querydata.top);
            }
            if (querydata.count != null) {
                parameters.push("$count=" + (querydata.count ? "true" : "false"));
            }
        }

        return (parameters.length === 0 ? "" : "?" + parameters.join("&"));
    }
}

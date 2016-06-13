System.register(['Definitions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Definitions_1;
    var QueryDataHelper;
    return {
        setters:[
            function (Definitions_1_1) {
                Definitions_1 = Definitions_1_1;
            }],
        execute: function() {
            exports_1("QueryDataHelper", QueryDataHelper = {
                toQuery: function (querydata) {
                    var parameters = [];
                    if (querydata != null) {
                        if (querydata.filters != null) {
                            var filters = [];
                            for (var i = 0; i < querydata.filters.length; i++) {
                                var filter = querydata.filters[i];
                                var fieldName = filter.fieldName;
                                var operation = filter.operation;
                                //  The replace below is a hack - http://stackoverflow.com/questions/3979367/how-to-escape-a-single-quote-to-be-used-in-an-odata-query
                                var rawFieldValue = filter.fieldValue;
                                var fieldValue = (typeof rawFieldValue === "string") ? encodeURIComponent(rawFieldValue) : rawFieldValue.toString();
                                var filterString = "";
                                switch (operation) {
                                    case Definitions_1.FilterOperation.Equals:
                                        filterString = fieldName + "=" + fieldValue + "";
                                        break;
                                    case Definitions_1.FilterOperation.NotEquals:
                                        filterString = fieldName + "!=" + fieldValue + "";
                                        break;
                                    case Definitions_1.FilterOperation.Contains:
                                        filterString = fieldName + ".Contains(" + fieldValue + ")";
                                        break;
                                    case Definitions_1.FilterOperation.GreaterThan:
                                        filterString = fieldName + ">" + fieldValue + "";
                                        break;
                                    case Definitions_1.FilterOperation.LessThan:
                                        filterString = fieldName + "<" + fieldValue + "";
                                        break;
                                    case Definitions_1.FilterOperation.GreaterThanOrEqualTo:
                                        filterString = fieldName + ">=" + fieldValue + "";
                                        break;
                                    case Definitions_1.FilterOperation.LessThanOrEqualTo:
                                        filterString = fieldName + "<=" + fieldValue + "";
                                        break;
                                    case Definitions_1.FilterOperation.Any:
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
                            var columnName = querydata.orderby.columnName;
                            var direction = querydata.orderby.sortDirection;
                            var querydataDirection = direction === Definitions_1.SortDirection.Ascending ? "" : "desc";
                            parameters.push("$orderby=" + columnName + "%20" + querydataDirection);
                        }
                        else {
                            //  The order parameter is required for skip and top.
                            var columnName = querydata.keyColumn;
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
            });
        }
    }
});
//# sourceMappingURL=QueryData.js.map
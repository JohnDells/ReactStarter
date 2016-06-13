System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ColorName, AnimationType, SortDirection, FilterOperation;
    return {
        setters:[],
        execute: function() {
            ColorName = (function () {
                function ColorName() {
                }
                ColorName.White = "#FFFFFF";
                ColorName.Gray = "#A3A3A3";
                return ColorName;
            }());
            exports_1("ColorName", ColorName);
            (function (AnimationType) {
                AnimationType[AnimationType["SlideFromTop"] = 1] = "SlideFromTop";
                AnimationType[AnimationType["FadeIn"] = 2] = "FadeIn";
            })(AnimationType || (AnimationType = {}));
            exports_1("AnimationType", AnimationType);
            (function (SortDirection) {
                SortDirection[SortDirection["Ascending"] = 1] = "Ascending";
                SortDirection[SortDirection["Descending"] = 2] = "Descending";
            })(SortDirection || (SortDirection = {}));
            exports_1("SortDirection", SortDirection);
            (function (FilterOperation) {
                FilterOperation[FilterOperation["Equals"] = 1] = "Equals";
                FilterOperation[FilterOperation["NotEquals"] = 2] = "NotEquals";
                FilterOperation[FilterOperation["Contains"] = 3] = "Contains";
                FilterOperation[FilterOperation["GreaterThan"] = 4] = "GreaterThan";
                FilterOperation[FilterOperation["LessThan"] = 5] = "LessThan";
                FilterOperation[FilterOperation["GreaterThanOrEqualTo"] = 6] = "GreaterThanOrEqualTo";
                FilterOperation[FilterOperation["LessThanOrEqualTo"] = 7] = "LessThanOrEqualTo";
                FilterOperation[FilterOperation["Any"] = 8] = "Any";
            })(FilterOperation || (FilterOperation = {}));
            exports_1("FilterOperation", FilterOperation);
        }
    }
});
//# sourceMappingURL=Definitions.js.map
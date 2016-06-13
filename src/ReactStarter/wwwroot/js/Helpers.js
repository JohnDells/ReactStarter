System.register(['Definitions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Definitions_1;
    var Helpers;
    return {
        setters:[
            function (Definitions_1_1) {
                Definitions_1 = Definitions_1_1;
            }],
        execute: function() {
            exports_1("Helpers", Helpers = {
                toSafeString: function (value) {
                    return value == null ? "" : value.toString();
                },
                toSafeNullableInt: function (value) {
                    var result = parseInt(value);
                    if (isNaN(result)) {
                        return null;
                    }
                    return result;
                },
                nullIfEmpty: function (value) {
                    return value === "" ? null : value;
                },
                getAnimationNameFromType: function (value) {
                    switch (value) {
                        case Definitions_1.AnimationType.SlideFromTop:
                            return "animatetop";
                        case Definitions_1.AnimationType.FadeIn:
                            return "fadein";
                        default:
                            return "animatetop";
                    }
                }
            });
        }
    }
});
//# sourceMappingURL=Helpers.js.map
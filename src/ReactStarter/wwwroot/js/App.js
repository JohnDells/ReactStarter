System.register(['react', 'react-dom', 'Store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, ReactDOM, Store_1;
    function initialize(options) {
        var root = document.getElementById('divMain');
        var render = function () {
            ReactDOM.render(React.createElement("div", null, "HERE"), root);
        };
        Store_1.store.subscribe(function () {
            render();
        });
        render();
    }
    exports_1("initialize", initialize);
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (Store_1_1) {
                Store_1 = Store_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=App.js.map
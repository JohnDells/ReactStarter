System.register(['react'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React;
    var Select;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            Select = (function (_super) {
                __extends(Select, _super);
                function Select(props) {
                    _super.call(this, props);
                }
                Select.prototype.onChange = function (e) {
                    var newValue = parseInt(e.target.value);
                    this.props.controller.set(newValue);
                    if (this.props.onChange)
                        this.props.onChange(e);
                };
                Select.prototype.render = function () {
                    var _this = this;
                    var controller = this.props.controller;
                    var value = controller.get();
                    var items = this.props.items == null ? [] : this.props.items;
                    var selectProps = {
                        value: controller.get().toString(),
                        onChange: function (e) { _this.onChange(e); },
                        style: this.props.style,
                        className: this.props.className
                    };
                    return React.createElement("select", React.__spread({}, selectProps), React.createElement("option", {value: "-1"}, this.props.nullItemText), items.map(function (item, i) {
                        return React.createElement("option", {key: i, value: item.value}, item.text);
                    }));
                };
                return Select;
            }(React.Component));
            exports_1("Select", Select);
        }
    }
});
//# sourceMappingURL=Select.js.map
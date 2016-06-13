System.register(['react'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React;
    var Input;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            Input = (function (_super) {
                __extends(Input, _super);
                function Input(props) {
                    _super.call(this, props);
                }
                Input.prototype.onChange = function (e) {
                    var newValue = e.target.value;
                    this.props.controller.set(newValue);
                    if (this.props.onChange)
                        this.props.onChange(e);
                };
                Input.prototype.render = function () {
                    var _this = this;
                    var controller = this.props.controller;
                    var inputProps = {
                        type: "text",
                        value: controller.get(),
                        onChange: function (e) { _this.onChange(e); },
                        onBlur: this.props.onBlur ? function (e) { _this.props.onBlur(e); } : null,
                        style: this.props.style,
                        className: this.props.className,
                        placeholder: this.props.placeholder
                    };
                    return React.createElement("input", React.__spread({}, inputProps));
                };
                return Input;
            }(React.Component));
            exports_1("Input", Input);
        }
    }
});
//# sourceMappingURL=Input.js.map
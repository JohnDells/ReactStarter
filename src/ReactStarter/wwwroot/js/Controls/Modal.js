System.register(['react', 'Helpers', 'Definitions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React, Helpers_1, Definitions_1;
    var Modal, Curtain;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (Helpers_1_1) {
                Helpers_1 = Helpers_1_1;
            },
            function (Definitions_1_1) {
                Definitions_1 = Definitions_1_1;
            }],
        execute: function() {
            Modal = (function (_super) {
                __extends(Modal, _super);
                function Modal(props) {
                    _super.call(this, props);
                }
                Modal.prototype.render = function () {
                    var animationName = Helpers_1.Helpers.getAnimationNameFromType(this.props.animationType);
                    var animateTime = (this.props.animationTime || 0.5) + "s";
                    var contentStyle = {
                        position: "relative",
                        WebkitAnimationName: animationName,
                        WebkitAnimationDuration: animateTime,
                        animationName: animationName,
                        animationDuration: animateTime,
                        backgroundColor: Definitions_1.ColorName.White,
                        margin: "15% auto",
                        padding: 40,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: Definitions_1.ColorName.Gray,
                        borderRadius: 10,
                        width: "40%"
                    };
                    var theContentStyle = Object.assign({}, contentStyle, this.props.style);
                    return React.createElement(Curtain, React.__spread({}, this.props), React.createElement("div", {className: "animate-top", style: theContentStyle}, this.props.children));
                };
                return Modal;
            }(React.Component));
            exports_1("Modal", Modal);
            Curtain = (function (_super) {
                __extends(Curtain, _super);
                function Curtain(props) {
                    _super.call(this, props);
                }
                Curtain.prototype.render = function () {
                    var backgroundStyle = {
                        display: this.props.show ? "block" : "none",
                        position: "fixed",
                        zIndex: 9999,
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                        backgroundColor: "rgba(0,0,0,0.4)"
                    };
                    return React.createElement("div", {style: backgroundStyle}, this.props.children);
                };
                return Curtain;
            }(React.Component));
            exports_1("Curtain", Curtain);
        }
    }
});
//# sourceMappingURL=Modal.js.map
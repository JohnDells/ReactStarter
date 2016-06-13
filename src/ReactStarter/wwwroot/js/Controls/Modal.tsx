import * as React from 'react';
import { Helpers } from 'Helpers';
import { ColorName } from 'Definitions';

interface ICurtainProps extends IDomProps {
    show: boolean;
    onHide?: () => void;
}

interface IModalProps extends ICurtainProps {
    animationType?: number;
    animationTime?: number;
}

export class Modal extends React.Component<IModalProps, any> {
    constructor(props: IModalProps) {
        super(props);
    }

    render() {
        const animationName = Helpers.getAnimationNameFromType(this.props.animationType);
        const animateTime = (this.props.animationTime || 0.5) + "s";

        const contentStyle: React.CSSProperties = {
            position: "relative",
            WebkitAnimationName: animationName,
            WebkitAnimationDuration: animateTime,
            animationName: animationName,
            animationDuration: animateTime,
            backgroundColor: ColorName.White,
            margin: "15% auto",
            padding: 40,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: ColorName.Gray,
            borderRadius: 10,
            width: "40%"
        };

        const theContentStyle = Object.assign({}, contentStyle, this.props.style);

        return <Curtain {...this.props}>
            <div className="animate-top" style={ theContentStyle }>
                { this.props.children }
            </div>
        </Curtain>;
    }
}

export class Curtain extends React.Component<ICurtainProps, any> {
    constructor(props: ICurtainProps) {
        super(props);
    }

    render() {
        const backgroundStyle: React.CSSProperties = {
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

        return <div style={ backgroundStyle }>
            { this.props.children }
        </div>;
    }
}
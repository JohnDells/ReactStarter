import * as React from 'react';

export class Input extends React.Component<IInputProps, any> {

    constructor(props: IInputProps) {
        super(props);
    }

    onChange(e: React.FormEvent) {
        const newValue = (e.target as HTMLInputElement).value;
        this.props.controller.set(newValue);
        if (this.props.onChange) this.props.onChange(e);
    }

    render() {
        const controller = this.props.controller;

        const inputProps = {
            type: "text",
            value: controller.get(),
            onChange: (e) => { this.onChange(e) },
            onBlur: this.props.onBlur ? (e) => { this.props.onBlur(e); } : null,
            style: this.props.style,
            className: this.props.className,
            placeholder: this.props.placeholder
        };

        return <input { ...inputProps }></input>;
    }
}

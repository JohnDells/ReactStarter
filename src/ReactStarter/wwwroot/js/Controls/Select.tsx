import * as React from 'react';

export class Select extends React.Component<ISelectProps, any> {
    constructor(props: ISelectProps) {
        super(props);
    }

    onChange(e: React.FormEvent) {
        const newValue = parseInt((e.target as HTMLSelectElement).value);
        this.props.controller.set(newValue);
        if (this.props.onChange) this.props.onChange(e);
    }

    render() {
        const controller = this.props.controller;
        const value = controller.get();
        const items = this.props.items == null ? [] : this.props.items;

        const selectProps = {
            value: controller.get().toString(),
            onChange: (e) => { this.onChange(e) },
            style: this.props.style,
            className: this.props.className
        };

        return <select { ...selectProps }>
            <option value="-1">{ this.props.nullItemText }</option>
            { items.map((item, i) => {
                return <option key={ i } value={ item.value }>{ item.text }</option>;
            }) }
        </select>;
    }
}

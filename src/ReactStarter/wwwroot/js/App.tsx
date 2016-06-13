import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from 'Store';

export function initialize(options: any) {

    const root: HTMLElement = document.getElementById('divMain');

    const render = () => {
        ReactDOM.render(<div>HERE</div>, root);
    };

    store.subscribe(() => {
        render();
    });

    render();
}

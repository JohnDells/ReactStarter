import { store, Action } from 'Store';
import { QueryDataHelper } from 'QueryData';
import * as Definitions from 'Definitions';
import * as request from 'superagent';
import { Promise } from 'es6-promise';

const API_ROOT = "api/";
const DATA_KEY = "DATA:";
const LOOKUP_KEY = "LOOKUP:";
const META_KEY = "META:";
const MESSAGES_KEY = "MESSAGES:";
const ERROR_STATE_KEY = "ERRORS:";
const DIRTY_STATE_KEY = "DIRTY:";
const VALUE_KEY = ":VALUE";

const getProcess = (url: string, dispatch: Redux.Dispatch, dataKey: string, keyPath: string, err: any, res: request.Response): void => {
    if (res.ok) {
        const data = res.body;
        console.log("get result: " + url, data);
        if (data) {
            const dataData = data.Data;
            if (dataData != undefined) {
                dispatch(Action.setState(dataKey + keyPath, dataData));
            }
            const dataMeta = data.Meta;
            if (dataMeta != undefined) {
                dispatch(Action.setState(META_KEY + keyPath, dataMeta));
            }
            const dataMessages = data.Messages;
            if (dataMessages != undefined) {
                dispatch(Action.setState(MESSAGES_KEY + keyPath, dataMessages));
            }
        }
    } else {
        dispatch(Action.setState(MESSAGES_KEY + keyPath, err));
    }
};

const postProcess = (dispatch: Redux.Dispatch, keyPath: string, err, res) => {
    if (res.ok) {
        const data = res.body;
        console.log("post result: ", data);
        if (data) {
            const dataData = data.Data;
            if (dataData != undefined) {
                dispatch(Action.setState(DATA_KEY + keyPath, dataData));
            }
            const dataMessages = data.Messages;
            if (dataMessages != undefined) {
                dispatch(Action.setState(MESSAGES_KEY + keyPath, dataMessages));
            }
        }
    } else {
        dispatch(Action.setState(MESSAGES_KEY + keyPath, err));
    }
};

const fetch = (api: string, dataKey: string, keyPath: string, querydata?: IQueryDataParameters) => {
    return (dispatch, getState) => {
        const query = QueryDataHelper.toQuery(querydata);
        const url: string = API_ROOT + api + query;
        console.log("fetch action: " + url);
        return new Promise((resolve, reject) => {
            request.get(url)
                .end((err, res) => {
                    getProcess(url, dispatch, dataKey, keyPath, err, res);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    };
};

const post = (api: string, keyPath: string, data: any) => {
    return (dispatch, getState) => {
        const url = API_ROOT + api;
        console.log("post action: " + url);
        return new Promise((resolve, reject) => {
            request.post(url)
                .type('json')
                .send(data)
                .end((err, res) => {
                    postProcess(dispatch, keyPath, err, res);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    };
};

const getState = (keyPath: string, defaultValue: any): any => {
    const keyPathArray = keyPath.split(":");
    const result = store.getState().getIn(keyPathArray);
    if (result == null) return defaultValue;
    if (result.toJS) return result.toJS();
    return result;
};

const setState = (keyPath: string, data: any) => {
    store.dispatch(Action.setState(keyPath, data));
}

class PostAccessor<T, U> implements IPostAccessor<T, U> {
    private api: string;
    private keyPath: string;

    constructor(api: string, keyPath: string) {
        this.api = api;
        this.keyPath = keyPath;
    }

    getResponse(): U {
        return getState(DATA_KEY + this.keyPath, null);
    }

    post(value: T): Thenable<any> {
        return store.dispatch(post(this.api + value, this.keyPath, {}));
    }

    postData(value: T): Thenable<any> {
        return store.dispatch(post(this.api, this.keyPath, value));
    }
}

class FetchAccessor<T> implements IFetchAccessor<T> {
    private api: string;
    private keyPath: string;
    private callback: IFetchCallback;
    private dataPath: string;
    private metaPath: string;
    private id: IAccessor<TNumberOrString>;

    constructor(api: string, keyPath: string, callback?: IFetchCallback, id?: IAccessor<TNumberOrString>) {
        this.api = api;
        this.keyPath = keyPath;
        this.callback = callback;
        this.dataPath = DATA_KEY + keyPath;
        this.metaPath = META_KEY + keyPath;
        this.id = id;
    }

    get(): T[] {
        return getState(this.dataPath, []);
    }

    fetch(querydata?: IQueryDataParameters): Thenable<any> {
        const theQueryData = this.callback ? this.callback(querydata) : querydata;

        //  NOTE:  If callback returns false, clear the data and do not do query.
        if (typeof (theQueryData) === "boolean") {
            setState(this.dataPath, []);
            return;
        }

        const api = this.id ? this.api + "/" + this.id.get() : this.api;
        return store.dispatch(fetch(api, DATA_KEY, this.keyPath, theQueryData as IQueryDataParameters));
    }

    ensure(querydata?: IQueryDataParameters) {
        const currentItems = getState(this.dataPath, null);
        if (currentItems == null) {
            this.fetch(querydata);
        }
    }

    meta(): number {
        return getState(this.metaPath, null);
    }

    delete(index: number) {
        store.dispatch(Action.deleteState(this.dataPath + ":" + index));
    }
}

class Accessor<T> implements IAccessor<T> {
    private defaultValue: T;
    private _validators: IValidator<T>[];
    private _isReadOnly: boolean;
    private dataPath: string;
    private dirtyPath: string;
    private errorPath: string;
    private _onChange: IFunctionAction;

    constructor(basePath: string, keyPath: string, defaultValue: T, isReadOnly: boolean = false, validators: IValidator<T>[] = [], onChange?: IFunctionAction) {
        this.defaultValue = defaultValue;
        this._validators = validators;
        this._isReadOnly = isReadOnly;
        this.dataPath = basePath + keyPath;
        this.dirtyPath = DIRTY_STATE_KEY + keyPath + VALUE_KEY;
        this.errorPath = ERROR_STATE_KEY + keyPath + VALUE_KEY;
        this._onChange = onChange;
    }

    get(): T {
        return getState(this.dataPath, this.defaultValue) as T;
    }

    set(value: T) {
        if (this.isReadOnly) return;
        setState(this.dataPath, value);
        setState(this.dirtyPath, true);

        if (this._onChange != undefined) {
            store.dispatch(this._onChange);
        }
    }

    clear() {
        setState(this.dataPath, this.defaultValue);
        setState(this.dirtyPath, false);
    };

    //  Should implement a shallow compare check since this is immutable.
    //  Should also implement an undo function?
    isDirty(): boolean {
        return getState(this.dirtyPath, false);
    }

    get isReadOnly(): boolean {
        return this._isReadOnly;
    }

    errors(): any[] {
        return getState(this.errorPath, []);
    }

    private _setErrors(value: string[]) {
        setState(this.errorPath, value);
    }

    get validators() {
        return this._validators;
    }

    validate(): boolean {
        if (this.isReadOnly) return true;

        const value = this.get();
        const errors: string[] = [];
        if (this._validators && this._validators.length > 0) {
            for (let i = 0; i < this._validators.length; i++) {
                const validator = this._validators[i];
                const isValid = validator.validate(value);
                if (!isValid) {
                    errors.push(validator.message);
                    if (validator.stopOnFail) {
                        break;
                    }
                }
            }
        }
        this._setErrors(errors);
        return !(errors.length > 0);
    };

}

export const Accessors = {

    /** This accessor is intended for single item client use.  It features get/set/clear, dirty tracking, and validation. */
    dataAccessor<T>(keyPath: string, defaultValue: T, isReadOnly: boolean = false, validators: IValidator<T>[] = [], onChange?: IFunctionAction): IAccessor<T> {
        return new Accessor<T>(DATA_KEY, keyPath, defaultValue, isReadOnly, validators, onChange);
    },

    /** This function posts to the api using the querystring. */
    postAccessor<T, U>(api: string, keyPath: string): IPostAccessor<T, U> {
        return new PostAccessor<T, U>(api, keyPath);
    },

    /** This accessor is intended to pull a collection of data from an api and treat it as read-only. */
    fetchAccessor<T>(api: string, keyPath: string, callback?: IFetchCallback, id?: IAccessor<TNumberOrString>): IFetchAccessor<T> {
        return new FetchAccessor<T>(api, keyPath, callback, id);
    },

    /** This helper method is intended to call validate on an array of fields and return true if all are valid. */
    validate(fields: IValidate[]): boolean {
        let isValid = true;
        for (var i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (!field.validate()) {
                isValid = false;
            }
        }
        return isValid;
    },

    /** This helper method calls isDirty() on an array of fields and returns true if any are dirty. */
    isDirty(fields: IHasIsDirty[]): boolean {
        let isDirty = false;
        for (var i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (field.isDirty()) {
                isDirty = true;
            }
        }
        return isDirty;
    },

    /** This helper method calls clear() on an array of fields.  */
    clear(fields: IHasClear[]): void {
        for (var i = 0; i < fields.length; i++) {
            const field = fields[i];
            field.clear();
        }
    }
};



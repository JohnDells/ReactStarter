declare type TNumberOrString = number | string;

declare type IState = Immutable.Map<string, any>;

declare type IFunctionAction = (dispatch: Redux.Dispatch, getState: () => IState) => any;

declare type IFunctionActionCreator = (...args: any[]) => IFunctionAction;

declare type IActionCreator = (keyPath: string, ...args: any[]) => IAction;

//===================================================
//  Framework
//===================================================

interface IAction {
    type: number;
    store: string;
    data: any;
}

//===================================================
//  Query Data
//===================================================

interface IOrderBy {
    columnName: string;
    sortDirection: number;
}

interface IQueryDataFilter {
    fieldName: string;
    operation: number;
    fieldValue: string | boolean | number;
}

interface IQueryDataParameters {
    filters?: IQueryDataFilter[];
    orderby?: IOrderBy;
    skip?: number;
    top?: number;
    count?: boolean;
    keyColumn: string;
}

//===================================================
//  Accessors
//===================================================

declare type IFetchCallback = (querydata?: IQueryDataParameters) => IQueryDataParameters | boolean;

interface IBaseAccessor<T> {
    get: () => T;
    set: (value: T) => void;
    isReadOnly: boolean;
}

interface IHasIsDirty {
    isDirty: () => boolean;
}

interface IHasClear {
    clear: () => void;
}

interface IStateAccessor<T> extends IBaseAccessor<T>, IHasIsDirty, IHasClear {
}

interface IValidator<T> {
    validate: (value: T) => boolean;
    message: string;
    stopOnFail?: boolean;
}

interface IValidate {
    validate: () => boolean;
}

interface IStateValidator<T> extends IValidate {
    validators?: IValidator<T>[];
    errors: () => string[];
}

interface IAccessor<T> extends IStateAccessor<T>, IStateValidator<T> {
}

interface IDropDownItem<T> {
    value: T;
    text: string;
}

interface IPostAccessor<T, U> {
    getResponse: () => U;
    post: (value: T) => Thenable<any>;
    postData: (value: T) => Thenable<any>;
}

interface IFetchAccessor<T> {
    get: () => T[];
    fetch: (querydata?: IQueryDataParameters) => Thenable<any>;
    ensure: (querydata?: IQueryDataParameters) => void;
    delete: (index: number) => void;
    meta: () => number;
}

interface IApiAccessor<T> {
    get: () => T;
    fetch: (id: TNumberOrString) => Thenable<any>;
    save: () => Thenable<any>;
    clear: () => void;
}

interface IStringAccessor extends IAccessor<string> {
}

interface INumberAccessor extends IAccessor<number> {
}

interface IBooleanAccessor extends IAccessor<boolean> {
}

//===================================================
//  Controls
//===================================================

interface IDomProps {
    id?: string;
    key?: number;
    className?: string;
    style?: __React.CSSProperties;
    onClick?: (e: __React.MouseEvent) => void;
    onChange?: (e: __React.FormEvent) => void;
    onBlur?: (e: __React.FormEvent) => void;
    children?: __React.ReactNode;
    placeholder?: string;
    label?: string;
}

interface IHasControllerProps<T> {
    controller: T;
}

interface IInputProps extends IDomProps, IHasControllerProps<IStringAccessor> {
    isPassword?: boolean;
}

interface ISelectProps extends IDomProps, IHasControllerProps<INumberAccessor> {
    items: IDropDownItem<number>[];
    nullItemText: string;
}
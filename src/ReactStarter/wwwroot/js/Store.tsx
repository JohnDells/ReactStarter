import { Reducer, Store, createStore, applyMiddleware } from 'redux';
import { Map, fromJS } from 'immutable';

//=====================================================================
//  ACTIONS
//=====================================================================

enum Actions {
    SetState,
    MergeState,
    DeleteState
}

const setState: IActionCreator = (keyPath: string, data: any): IAction => {
    return {
        type: Actions.SetState,
        store: keyPath,
        data: data
    };
};

const mergeState: IActionCreator = (keyPath: string, data: any): IAction => {
    return {
        type: Actions.MergeState,
        store: keyPath,
        data: data
    };
};

const clearState: IActionCreator = (keyPath: string): IAction => {
    return Action.setState(keyPath, {});
};

const deleteState: IActionCreator = (keyPath: string): IAction => {
    return {
        type: Actions.DeleteState,
        store: keyPath,
        data: null
    };
};

export const Action = {
    setState: setState,
    mergeState: mergeState,
    //  NOTE:  We cannot set data to null here, immutablejs blows up on child keys later during a setIn if we do.
    clearState: clearState,
    deleteState: deleteState
};

//=====================================================================
//  REDUCERS
//=====================================================================

const initialState: IState = fromJS({
});

const ActionHandlers = {
    setStateHandler: (state: IState, action: IAction): IState => {
        const newData = fromJS(action.data);
        const keyPathArray = action.store.split(":");
        try {
            const newState = state.setIn(keyPathArray, newData);
            return newState;
        } catch (e) {
            console.log(e, action, state.toJS());
            return state;
        }
    },
    mergeStateHandler: (state: IState, action: IAction): IState => {
        const newData = fromJS(action.data);
        const keyPathArray = action.store.split(":");
        const newState = state.mergeIn(keyPathArray, newData);
        return newState;
    },
    deleteStateHandler: (state: IState, action: IAction): IState => {
        const keyPathArray = action.store.split(":");
        const newState = state.deleteIn(keyPathArray);
        return newState;
    }
};

const rootReducer: Reducer = function (state: IState = initialState, action: IAction): IState {
    try {
        switch (action.type) {
            case Actions.SetState:
                return ActionHandlers.setStateHandler(state, action);
            case Actions.MergeState:
                return ActionHandlers.mergeStateHandler(state, action);
            case Actions.DeleteState:
                return ActionHandlers.deleteStateHandler(state, action);
            default:
                return state;
        }
    } catch (e) {
        console.log(e);
    }
    return state;
};

//  handleFunctionActions makes the store.dispatch() method treat functions as things to execute before the reducers are called.
const handleFunctionActions: Redux.Middleware = ({ dispatch, getState }) => {
    return next => action =>
        typeof action === 'function' ?
            action(dispatch, getState) :
            next(action);
};

const createStoreWithMiddleware: Function = applyMiddleware(handleFunctionActions)(createStore);

export const store: Store = createStoreWithMiddleware(rootReducer);




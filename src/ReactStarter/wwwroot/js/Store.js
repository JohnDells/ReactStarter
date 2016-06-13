System.register(['redux', 'immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var redux_1, immutable_1;
    var Actions, setState, mergeState, clearState, deleteState, Action, initialState, ActionHandlers, rootReducer, handleFunctionActions, createStoreWithMiddleware, store;
    return {
        setters:[
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            //=====================================================================
            //  ACTIONS
            //=====================================================================
            (function (Actions) {
                Actions[Actions["SetState"] = 0] = "SetState";
                Actions[Actions["MergeState"] = 1] = "MergeState";
                Actions[Actions["DeleteState"] = 2] = "DeleteState";
            })(Actions || (Actions = {}));
            setState = function (keyPath, data) {
                return {
                    type: Actions.SetState,
                    store: keyPath,
                    data: data
                };
            };
            mergeState = function (keyPath, data) {
                return {
                    type: Actions.MergeState,
                    store: keyPath,
                    data: data
                };
            };
            clearState = function (keyPath) {
                return Action.setState(keyPath, {});
            };
            deleteState = function (keyPath) {
                return {
                    type: Actions.DeleteState,
                    store: keyPath,
                    data: null
                };
            };
            exports_1("Action", Action = {
                setState: setState,
                mergeState: mergeState,
                //  NOTE:  We cannot set data to null here, immutablejs blows up on child keys later during a setIn if we do.
                clearState: clearState,
                deleteState: deleteState
            });
            //=====================================================================
            //  REDUCERS
            //=====================================================================
            initialState = immutable_1.fromJS({});
            ActionHandlers = {
                setStateHandler: function (state, action) {
                    var newData = immutable_1.fromJS(action.data);
                    var keyPathArray = action.store.split(":");
                    try {
                        var newState = state.setIn(keyPathArray, newData);
                        return newState;
                    }
                    catch (e) {
                        console.log(e, action, state.toJS());
                        return state;
                    }
                },
                mergeStateHandler: function (state, action) {
                    var newData = immutable_1.fromJS(action.data);
                    var keyPathArray = action.store.split(":");
                    var newState = state.mergeIn(keyPathArray, newData);
                    return newState;
                },
                deleteStateHandler: function (state, action) {
                    var keyPathArray = action.store.split(":");
                    var newState = state.deleteIn(keyPathArray);
                    return newState;
                }
            };
            rootReducer = function (state, action) {
                if (state === void 0) { state = initialState; }
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
                }
                catch (e) {
                    console.log(e);
                }
                return state;
            };
            //  handleFunctionActions makes the store.dispatch() method treat functions as things to execute before the reducers are called.
            handleFunctionActions = function (_a) {
                var dispatch = _a.dispatch, getState = _a.getState;
                return function (next) { return function (action) {
                    return typeof action === 'function' ?
                        action(dispatch, getState) :
                        next(action);
                }; };
            };
            createStoreWithMiddleware = redux_1.applyMiddleware(handleFunctionActions)(redux_1.createStore);
            exports_1("store", store = createStoreWithMiddleware(rootReducer));
        }
    }
});
//# sourceMappingURL=Store.js.map
System.register(['Store', 'QueryData', 'superagent', 'es6-promise'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Store_1, QueryData_1, request, es6_promise_1;
    var API_ROOT, DATA_KEY, LOOKUP_KEY, META_KEY, MESSAGES_KEY, ERROR_STATE_KEY, DIRTY_STATE_KEY, VALUE_KEY, getProcess, postProcess, fetch, post, getState, setState, PostAccessor, FetchAccessor, Accessor, Accessors;
    return {
        setters:[
            function (Store_1_1) {
                Store_1 = Store_1_1;
            },
            function (QueryData_1_1) {
                QueryData_1 = QueryData_1_1;
            },
            function (request_1) {
                request = request_1;
            },
            function (es6_promise_1_1) {
                es6_promise_1 = es6_promise_1_1;
            }],
        execute: function() {
            API_ROOT = "api/";
            DATA_KEY = "DATA:";
            LOOKUP_KEY = "LOOKUP:";
            META_KEY = "META:";
            MESSAGES_KEY = "MESSAGES:";
            ERROR_STATE_KEY = "ERRORS:";
            DIRTY_STATE_KEY = "DIRTY:";
            VALUE_KEY = ":VALUE";
            getProcess = function (url, dispatch, dataKey, keyPath, err, res) {
                if (res.ok) {
                    var data = res.body;
                    console.log("get result: " + url, data);
                    if (data) {
                        var dataData = data.Data;
                        if (dataData != undefined) {
                            dispatch(Store_1.Action.setState(dataKey + keyPath, dataData));
                        }
                        var dataMeta = data.Meta;
                        if (dataMeta != undefined) {
                            dispatch(Store_1.Action.setState(META_KEY + keyPath, dataMeta));
                        }
                        var dataMessages = data.Messages;
                        if (dataMessages != undefined) {
                            dispatch(Store_1.Action.setState(MESSAGES_KEY + keyPath, dataMessages));
                        }
                    }
                }
                else {
                    dispatch(Store_1.Action.setState(MESSAGES_KEY + keyPath, err));
                }
            };
            postProcess = function (dispatch, keyPath, err, res) {
                if (res.ok) {
                    var data = res.body;
                    console.log("post result: ", data);
                    if (data) {
                        var dataData = data.Data;
                        if (dataData != undefined) {
                            dispatch(Store_1.Action.setState(DATA_KEY + keyPath, dataData));
                        }
                        var dataMessages = data.Messages;
                        if (dataMessages != undefined) {
                            dispatch(Store_1.Action.setState(MESSAGES_KEY + keyPath, dataMessages));
                        }
                    }
                }
                else {
                    dispatch(Store_1.Action.setState(MESSAGES_KEY + keyPath, err));
                }
            };
            fetch = function (api, dataKey, keyPath, querydata) {
                return function (dispatch, getState) {
                    var query = QueryData_1.QueryDataHelper.toQuery(querydata);
                    var url = API_ROOT + api + query;
                    console.log("fetch action: " + url);
                    return new es6_promise_1.Promise(function (resolve, reject) {
                        request.get(url)
                            .end(function (err, res) {
                            getProcess(url, dispatch, dataKey, keyPath, err, res);
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    });
                };
            };
            post = function (api, keyPath, data) {
                return function (dispatch, getState) {
                    var url = API_ROOT + api;
                    console.log("post action: " + url);
                    return new es6_promise_1.Promise(function (resolve, reject) {
                        request.post(url)
                            .type('json')
                            .send(data)
                            .end(function (err, res) {
                            postProcess(dispatch, keyPath, err, res);
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    });
                };
            };
            getState = function (keyPath, defaultValue) {
                var keyPathArray = keyPath.split(":");
                var result = Store_1.store.getState().getIn(keyPathArray);
                if (result == null)
                    return defaultValue;
                if (result.toJS)
                    return result.toJS();
                return result;
            };
            setState = function (keyPath, data) {
                Store_1.store.dispatch(Store_1.Action.setState(keyPath, data));
            };
            PostAccessor = (function () {
                function PostAccessor(api, keyPath) {
                    this.api = api;
                    this.keyPath = keyPath;
                }
                PostAccessor.prototype.getResponse = function () {
                    return getState(DATA_KEY + this.keyPath, null);
                };
                PostAccessor.prototype.post = function (value) {
                    return Store_1.store.dispatch(post(this.api + value, this.keyPath, {}));
                };
                PostAccessor.prototype.postData = function (value) {
                    return Store_1.store.dispatch(post(this.api, this.keyPath, value));
                };
                return PostAccessor;
            }());
            FetchAccessor = (function () {
                function FetchAccessor(api, keyPath, callback, id) {
                    this.api = api;
                    this.keyPath = keyPath;
                    this.callback = callback;
                    this.dataPath = DATA_KEY + keyPath;
                    this.metaPath = META_KEY + keyPath;
                    this.id = id;
                }
                FetchAccessor.prototype.get = function () {
                    return getState(this.dataPath, []);
                };
                FetchAccessor.prototype.fetch = function (querydata) {
                    var theQueryData = this.callback ? this.callback(querydata) : querydata;
                    //  NOTE:  If callback returns false, clear the data and do not do query.
                    if (typeof (theQueryData) === "boolean") {
                        setState(this.dataPath, []);
                        return;
                    }
                    var api = this.id ? this.api + "/" + this.id.get() : this.api;
                    return Store_1.store.dispatch(fetch(api, DATA_KEY, this.keyPath, theQueryData));
                };
                FetchAccessor.prototype.ensure = function (querydata) {
                    var currentItems = getState(this.dataPath, null);
                    if (currentItems == null) {
                        this.fetch(querydata);
                    }
                };
                FetchAccessor.prototype.meta = function () {
                    return getState(this.metaPath, null);
                };
                FetchAccessor.prototype.delete = function (index) {
                    Store_1.store.dispatch(Store_1.Action.deleteState(this.dataPath + ":" + index));
                };
                return FetchAccessor;
            }());
            Accessor = (function () {
                function Accessor(basePath, keyPath, defaultValue, isReadOnly, validators, onChange) {
                    if (isReadOnly === void 0) { isReadOnly = false; }
                    if (validators === void 0) { validators = []; }
                    this.defaultValue = defaultValue;
                    this._validators = validators;
                    this._isReadOnly = isReadOnly;
                    this.dataPath = basePath + keyPath;
                    this.dirtyPath = DIRTY_STATE_KEY + keyPath + VALUE_KEY;
                    this.errorPath = ERROR_STATE_KEY + keyPath + VALUE_KEY;
                    this._onChange = onChange;
                }
                Accessor.prototype.get = function () {
                    return getState(this.dataPath, this.defaultValue);
                };
                Accessor.prototype.set = function (value) {
                    if (this.isReadOnly)
                        return;
                    setState(this.dataPath, value);
                    setState(this.dirtyPath, true);
                    if (this._onChange != undefined) {
                        Store_1.store.dispatch(this._onChange);
                    }
                };
                Accessor.prototype.clear = function () {
                    setState(this.dataPath, this.defaultValue);
                    setState(this.dirtyPath, false);
                };
                ;
                //  Should implement a shallow compare check since this is immutable.
                //  Should also implement an undo function?
                Accessor.prototype.isDirty = function () {
                    return getState(this.dirtyPath, false);
                };
                Object.defineProperty(Accessor.prototype, "isReadOnly", {
                    get: function () {
                        return this._isReadOnly;
                    },
                    enumerable: true,
                    configurable: true
                });
                Accessor.prototype.errors = function () {
                    return getState(this.errorPath, []);
                };
                Accessor.prototype._setErrors = function (value) {
                    setState(this.errorPath, value);
                };
                Object.defineProperty(Accessor.prototype, "validators", {
                    get: function () {
                        return this._validators;
                    },
                    enumerable: true,
                    configurable: true
                });
                Accessor.prototype.validate = function () {
                    if (this.isReadOnly)
                        return true;
                    var value = this.get();
                    var errors = [];
                    if (this._validators && this._validators.length > 0) {
                        for (var i = 0; i < this._validators.length; i++) {
                            var validator = this._validators[i];
                            var isValid = validator.validate(value);
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
                ;
                return Accessor;
            }());
            exports_1("Accessors", Accessors = {
                /** This accessor is intended for single item client use.  It features get/set/clear, dirty tracking, and validation. */
                dataAccessor: function (keyPath, defaultValue, isReadOnly, validators, onChange) {
                    if (isReadOnly === void 0) { isReadOnly = false; }
                    if (validators === void 0) { validators = []; }
                    return new Accessor(DATA_KEY, keyPath, defaultValue, isReadOnly, validators, onChange);
                },
                /** This function posts to the api using the querystring. */
                postAccessor: function (api, keyPath) {
                    return new PostAccessor(api, keyPath);
                },
                /** This accessor is intended to pull a collection of data from an api and treat it as read-only. */
                fetchAccessor: function (api, keyPath, callback, id) {
                    return new FetchAccessor(api, keyPath, callback, id);
                },
                /** This helper method is intended to call validate on an array of fields and return true if all are valid. */
                validate: function (fields) {
                    var isValid = true;
                    for (var i = 0; i < fields.length; i++) {
                        var field = fields[i];
                        if (!field.validate()) {
                            isValid = false;
                        }
                    }
                    return isValid;
                },
                /** This helper method calls isDirty() on an array of fields and returns true if any are dirty. */
                isDirty: function (fields) {
                    var isDirty = false;
                    for (var i = 0; i < fields.length; i++) {
                        var field = fields[i];
                        if (field.isDirty()) {
                            isDirty = true;
                        }
                    }
                    return isDirty;
                },
                /** This helper method calls clear() on an array of fields.  */
                clear: function (fields) {
                    for (var i = 0; i < fields.length; i++) {
                        var field = fields[i];
                        field.clear();
                    }
                }
            });
        }
    }
});
//# sourceMappingURL=Accessors.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramInvalidErr = void 0;
const HttpStatusCodes_1 = __importDefault(require("@configurations/HttpStatusCodes"));
exports.paramInvalidErr = 'One or more of the required params was ' +
    'missing or invalid.';
function validate(...params) {
    const loopFns = [];
    for (const param of params) {
        const { paramName, type, reqObjProp } = getParamFields(param);
        let loopFn = () => false;
        if (type === 'string') {
            loopFn = checkStr(reqObjProp, paramName);
        }
        else if (type === 'number') {
            loopFn = checkNum(reqObjProp, paramName);
        }
        else if (type === 'boolean') {
            loopFn = checkBool(reqObjProp, paramName);
        }
        else if (type === 'function') {
            const fn = param[1];
            loopFn = checkValidatorFn(reqObjProp, paramName, fn);
        }
        else {
            loopFn = checkDefault(reqObjProp, paramName, type);
        }
        loopFns.push(loopFn);
    }
    return (req, res, next) => {
        for (const loopFn of loopFns) {
            if (!loopFn(req)) {
                return res
                    .status(HttpStatusCodes_1.default.BAD_REQUEST)
                    .json({ error: exports.paramInvalidErr });
            }
        }
        return next();
    };
}
function getParamFields(param) {
    let paramName = '';
    let type = 'string';
    let reqObjProp = 'body';
    if (typeof param === 'string') {
        paramName = param;
    }
    else if (param instanceof Array) {
        paramName = param[0];
        if (typeof paramName !== 'string') {
            throw Error('param name must be a string');
        }
        if (typeof param[1] === 'string') {
            type = param[1];
        }
        else if (typeof param[1] === 'function') {
            type = 'function';
        }
        else {
            throw Error('param[1] must be a string or a validator function');
        }
        const prop = (param.length >= 3 ? param[2] : 'body');
        if (prop !== 'body' && prop !== 'params' && prop !== 'query') {
            throw Error('param[2] must be "body", "query", or "params"');
        }
        else {
            reqObjProp = prop;
        }
    }
    else {
        throw Error('"validate()" argument must be a string or array');
    }
    return { paramName, type, reqObjProp };
}
function checkStr(reqObjProp, paramName) {
    return getLoopFn(reqObjProp, paramName, (toCheck) => {
        return (typeof toCheck === 'string');
    });
}
function checkNum(reqObjProp, paramName) {
    return getLoopFn(reqObjProp, paramName, (toCheck) => {
        if (reqObjProp === 'query' || reqObjProp === 'params') {
            return !isNaN(toCheck);
        }
        else if (reqObjProp === 'body' && typeof toCheck !== 'number') {
            return false;
        }
        else {
            return true;
        }
    });
}
function checkBool(reqObjProp, paramName) {
    return getLoopFn(reqObjProp, paramName, (toCheck) => {
        if (reqObjProp === 'query' || reqObjProp === 'params') {
            return isBool(toCheck);
        }
        else if (reqObjProp === 'body' && typeof toCheck !== 'boolean') {
            return false;
        }
        else {
            return true;
        }
    });
}
function isBool(arg) {
    if (typeof arg === 'boolean') {
        return true;
    }
    else if (typeof arg === 'string') {
        arg = arg.toLowerCase();
        return (arg === 'true' || arg === 'false');
    }
    else {
        return false;
    }
}
function checkValidatorFn(reqObjProp, paramName, validatorFn) {
    return getLoopFn(reqObjProp, paramName, (toCheck) => {
        return validatorFn(toCheck);
    });
}
function checkDefault(reqObjProp, paramName, type) {
    return getLoopFn(reqObjProp, paramName, (toCheck) => {
        return (toCheck === type);
    });
}
function getLoopFn(reqObjProp, paramName, cb) {
    return (req) => {
        const toCheck = req[reqObjProp][paramName];
        return cb(toCheck);
    };
}
exports.default = validate;

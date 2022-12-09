"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["Standard"] = 0] = "Standard";
    UserRoles[UserRoles["Admin"] = 1] = "Admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
function _new(name, email, role, pwdHash) {
    return {
        id: -1,
        email,
        name,
        role: (role !== null && role !== void 0 ? role : UserRoles.Standard),
        pwdHash: (pwdHash !== null && pwdHash !== void 0 ? pwdHash : ''),
    };
}
function copy(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        pwdHash: user.pwdHash,
    };
}
function instanceOf(arg) {
    return (!!arg &&
        typeof arg === 'object' &&
        'id' in arg &&
        'email' in arg &&
        'name' in arg &&
        'role' in arg);
}
exports.default = {
    new: _new,
    copy,
    instanceOf,
};

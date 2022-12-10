"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    nodeEnv: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : '',
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 0,
    cookieProps: {
        key: 'AccessToken',
        secret: (_c = process.env.COOKIE_SECRET) !== null && _c !== void 0 ? _c : '',
        options: {
            httpOnly: true,
            signed: true,
            path: (_d = process.env.COOKIE_PATH) !== null && _d !== void 0 ? _d : '',
            maxAge: Number((_e = process.env.COOKIE_EXP) !== null && _e !== void 0 ? _e : 0),
            domain: (_f = process.env.COOKIE_DOMAIN) !== null && _f !== void 0 ? _f : '',
            secure: process.env.SECURE_COOKIE === 'true',
        },
    },
    jwt: {
        secret: (_g = process.env.JWT_SECRET) !== null && _g !== void 0 ? _g : '',
        exp: (_h = process.env.COOKIE_EXP) !== null && _h !== void 0 ? _h : '',
    },
    dbDialect: (_j = process.env.DB_DIALECT) !== null && _j !== void 0 ? _j : '',
    dbHost: (_k = process.env.DB_HOST) !== null && _k !== void 0 ? _k : '',
    dbUser: (_l = process.env.DB_USER) !== null && _l !== void 0 ? _l : '',
    dbPassword: (_m = process.env.DB_PASSWORD) !== null && _m !== void 0 ? _m : '',
    dbName: (_o = process.env.DB_NAME) !== null && _o !== void 0 ? _o : '',
    sbProjectUrl: (_p = process.env.SB_PROJECT_URL) !== null && _p !== void 0 ? _p : '',
    sbApiKey: (_q = process.env.SB_API_KEY) !== null && _q !== void 0 ? _q : '',
    sbUploadsBucket: (_r = process.env.SB_UPLOADS_BUCKET) !== null && _r !== void 0 ? _r : '',
};

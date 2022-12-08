"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const api_1 = __importDefault(require("./routes/api"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const EnvVars_1 = __importDefault(require("@configurations/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@configurations/HttpStatusCodes"));
const enums_1 = require("@declarations/enums");
const classes_1 = require("@declarations/classes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(EnvVars_1.default.cookieProps.secret));
if (EnvVars_1.default.nodeEnv === enums_1.NodeEnvs.Dev) {
    app.use((0, morgan_1.default)('dev'));
}
if (EnvVars_1.default.nodeEnv === enums_1.NodeEnvs.Production) {
    app.use((0, helmet_1.default)());
}
app.use('/api', api_1.default);
app.use((err, _, res, next) => {
    jet_logger_1.default.err(err, true);
    let status = HttpStatusCodes_1.default.BAD_REQUEST;
    if (err instanceof classes_1.RouteError) {
        status = err.status;
    }
    return res.status(status).json({ error: err.message });
});
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
app.get('/', (_, res) => {
    res.sendFile('index.html', { root: staticDir });
});
exports.default = app;

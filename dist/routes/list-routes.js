"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = __importDefault(require("@configurations/HttpStatusCodes"));
const list_service_1 = __importDefault(require("@services/list-service"));
const paths = {
    basePath: '/lists',
    get: '/:id',
    getPopular: '/popular',
    getByQuery: '/search',
    getByCategory: '/category/:id',
    create: '/',
    update: '/:id',
    delete: '/:id',
};
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const list = yield list_service_1.default.getById(parseInt(id, 10));
        if (!list) {
            return res.status(HttpStatusCodes_1.default.NOT_FOUND).json('List not found');
        }
        return res.status(HttpStatusCodes_1.default.OK).json(list);
    });
}
function getMostPopular(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lists = yield list_service_1.default.getPopular();
        return res.status(HttpStatusCodes_1.default.OK).json(lists);
    });
}
function getByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query.query;
        const lists = yield list_service_1.default.getByQuery(query);
        return res.status(HttpStatusCodes_1.default.OK).json(lists);
    });
}
function getByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = parseInt(req.params.id, 10);
        const lists = yield list_service_1.default.getByCategory(categoryId);
        return res.status(HttpStatusCodes_1.default.OK).json(lists);
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const newId = yield list_service_1.default.createOrUpdate(authData.id, req.body);
        return res.status(HttpStatusCodes_1.default.OK).json(newId);
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const id = parseInt(req.params.id, 10);
        const newId = yield list_service_1.default.createOrUpdate(authData.id, req.body, id);
        if (!newId) {
            return res.status(HttpStatusCodes_1.default.NOT_FOUND).json('List not found!');
        }
        return res.status(HttpStatusCodes_1.default.NO_CONTENT).send();
    });
}
function _delete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const id = parseInt(req.params.id, 10);
        yield list_service_1.default.markAsDeleted(authData.id, id);
        return res.status(HttpStatusCodes_1.default.NO_CONTENT).send();
    });
}
exports.default = {
    paths,
    getById,
    getMostPopular,
    getByQuery,
    getByCategory,
    create,
    update,
    delete: _delete,
};

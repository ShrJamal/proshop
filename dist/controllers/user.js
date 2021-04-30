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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.userProfile = exports.signup = exports.loginUser = void 0;
var validation_1 = require("../helpers/validation");
var user_1 = require("../models/user");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error, _a, email, password, user, _b, _id, username, isAdmin, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    error = validation_1.loginValidation(req.body).error;
                    if (error)
                        throw error;
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, user_1.UserModel.findOne({ email: email })];
                case 1:
                    user = _c.sent();
                    _b = !user;
                    if (_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                case 2:
                    _b = !(_c.sent());
                    _c.label = 3;
                case 3:
                    if (_b) {
                        throw new Error('Email or Password is invalid');
                    }
                    _id = user._id, username = user.username, isAdmin = user.isAdmin;
                    res.json({
                        token: jsonwebtoken_1.default.sign({ _id: _id, isAdmin: isAdmin }, process.env.JWT_SECRET),
                        _id: _id,
                        username: username,
                        email: email,
                        isAdmin: isAdmin,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    res.status(401);
                    next(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.loginUser = loginUser;
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error, _a, username, email, unhashedPassword, password, _b, _c, _d, user, err_2;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 5, , 6]);
                    error = validation_1.signupValidation(req.body).error;
                    if (error)
                        throw error;
                    _a = req.body, username = _a.username, email = _a.email, unhashedPassword = _a.password;
                    return [4 /*yield*/, user_1.UserModel.findOne({ email: email })];
                case 1:
                    if (_e.sent()) {
                        throw new Error('User Already exist');
                    }
                    _c = (_b = bcryptjs_1.default).hash;
                    _d = [unhashedPassword];
                    return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                case 3:
                    password = _e.sent();
                    return [4 /*yield*/, new user_1.UserModel({
                            username: username,
                            email: email,
                            password: password,
                        }).save()];
                case 4:
                    user = _e.sent();
                    if (user) {
                        res.status(201).json({
                            token: jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET),
                            _id: user._id,
                            username: username,
                            email: email,
                            isAdmin: user.isAdmin,
                        });
                    }
                    else {
                        throw new Error('Invalid User Data');
                    }
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _e.sent();
                    res.status(400);
                    next(err_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.signup = signup;
function userProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, user, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.body._id;
                    return [4 /*yield*/, user_1.UserModel.findById(_id)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error('Ooops! Cant find user');
                    }
                    res.json({
                        _id: _id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    res.status(401);
                    next(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.userProfile = userProfile;
function updateProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error, _id, user, _a, _b, _c, _d, _e, _f, username, email, isAdmin, err_4;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 6, , 7]);
                    error = validation_1.profileValidation(req.body).error;
                    if (error)
                        throw error;
                    _id = req.body._id;
                    return [4 /*yield*/, user_1.UserModel.findById(_id)];
                case 1:
                    user = _g.sent();
                    if (!user) {
                        throw new Error('Ooops! Cant find user');
                    }
                    user.username = req.body.username || user.username;
                    _a = user;
                    _b = req.body.password;
                    if (!_b) return [3 /*break*/, 4];
                    _d = (_c = bcryptjs_1.default).hash;
                    _e = [req.body.password];
                    return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([_g.sent()]))];
                case 3:
                    _b = (_g.sent());
                    _g.label = 4;
                case 4:
                    _a.password =
                        (_b) ||
                            user.password;
                    return [4 /*yield*/, user.save()];
                case 5:
                    _f = _g.sent(), username = _f.username, email = _f.email, isAdmin = _f.isAdmin;
                    res.json({
                        _id: _id,
                        username: username,
                        email: email,
                        isAdmin: isAdmin,
                    });
                    return [3 /*break*/, 7];
                case 6:
                    err_4 = _g.sent();
                    res.status(401);
                    next(err_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateProfile = updateProfile;

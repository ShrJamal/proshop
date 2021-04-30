"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var error_1 = require("./middleware/error");
var products_1 = __importDefault(require("./routers/products"));
var user_1 = __importDefault(require("./routers/user"));
var config_1 = require("./config");
var path_1 = __importDefault(require("path"));
// Create the express application
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var __dirname = path_1.default.resolve();
// User Routers
app.use('/api', user_1.default);
// Product Routers
app.use('/api/products', products_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend/build')));
    app.get('*', function (_, res) {
        return res.sendFile(path_1.default.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
else {
    app.get('/', function (_, res) {
        res.send('API Running');
    });
}
// Error Handler
app.use(error_1.notFound).use(error_1.errorHandler);
config_1.connectDB().then(function () {
    var PORT = process.env.PORT || 5000;
    app.listen(PORT);
    console.log(("App listening on port " + PORT + "...").cyan.underline);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./routes/auth.route");
const todo_route_1 = require("./routes/todo.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Mongodb connection success"))
    .catch((error) => {
    console.log(process.env.MONGO_URI);
    console.log("Mongodb connection failed");
    console.log(error);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/", auth_route_1.authRouter);
app.use("/todos", todo_route_1.todoRouter);
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_role_enum_1 = require("../dto/user.role.enum");
let User = class User extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: {
            addr1: { type: String, required: true },
            addr2: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            zip: { type: String }
        }
    }),
    __metadata("design:type", Object)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(user_role_enum_1.UserRole),
        default: user_role_enum_1.UserRole.USER
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map
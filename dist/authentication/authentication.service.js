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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthenticationService = class AuthenticationService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signup(signupDTO) {
        const { firstname, lastname, email, password, role, address } = signupDTO;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            firstname,
            lastname,
            email,
            role,
            address,
            password: hashedPassword,
        });
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
    async login(loginDTO) {
        const { email, password: userPassword } = loginDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid Email or Password");
        }
        const isPasswordMatch = await bcrypt.compare(userPassword, user.password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException("Invalid Email or Password");
        }
        const token = this.jwtService.sign({ id: user._id });
        console.log(user, "user here");
        return {
            token,
            user: {
                role: user.role,
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                address: {
                    addr1: user.address.addr1,
                    addr2: user.address.addr2,
                    city: user.address.city,
                    state: user.address.state,
                    country: user.address.country,
                    zip: user.address.zip,
                }
            },
        };
    }
    async findOne(query) {
        return await this.userModel.findOne(query).select("+password");
    }
    async find(usersFilterQuery) {
        return this.userModel.find({ usersFilterQuery });
    }
    async findOneAndUpdate(query, payload) {
        return this.userModel.findOneAndUpdate(query, payload, {
            new: true,
            upsert: true,
        });
    }
    async findOneAndRemove(query) {
        return this.userModel.findOneAndRemove(query);
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map
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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const at_least_three_words_validator_1 = require("../../common/validators/at-least-three-words.validator");
class CreateProductDto {
    name;
    description;
    price;
    stock;
    image_url;
    category_id;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product name (must contain at least 3 words)', example: 'lilisa satoru fushiguro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, at_least_three_words_validator_1.IsAtLeastThreeWords)({ message: 'Product name must  be at least 3 words' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product description (at least 20 characters)', example: 'A beautifully crafted ceramic coffee mug for your daily caffeine needs.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(20, { message: 'Product description must have at least 20 characters' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product price(must be positive integer, at least 1)', example: 250000 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Price must be at least 1' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product stock (must be between 0 and 999)', example: 50 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, { message: 'Stock must be at least 0' }),
    (0, class_validator_1.Max)(999, { message: 'Stock cannot exceed 999' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product image URL (optional)', example: 'https://i.pinimg.com/1200x/3b/e8/2c/3be82cc8fadeb7c11a152f1cd06fb332.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Existing Category ID', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "category_id", void 0);
//# sourceMappingURL=create-product.dto.js.map
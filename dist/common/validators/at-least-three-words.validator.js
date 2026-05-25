"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAtLeastThreeWords = IsAtLeastThreeWords;
const class_validator_1 = require("class-validator");
function IsAtLeastThreeWords(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isAtLeastThreeWords',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (typeof value !== 'string')
                        return false;
                    const words = value.trim().split(/\s+/);
                    return words.length >= 3;
                },
                defaultMessage(args) {
                    return `${args.property} must contain at least 3 words`;
                },
            },
        });
    };
}
//# sourceMappingURL=at-least-three-words.validator.js.map
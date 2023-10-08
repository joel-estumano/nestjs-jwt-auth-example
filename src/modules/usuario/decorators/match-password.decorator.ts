import { ClassConstructor } from "class-transformer";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

export const MatchPassword = <T>(
    type: ClassConstructor<T>,
    property: (o: T) => any,
    validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchPasswordConstraint
        })
    }
}

@ValidatorConstraint({ name: "MatchPassword" })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [fn] = args.constraints;
        return fn(args.object) === value;
    }

    defaultMessage(args: ValidationArguments) {
        const [constraintProperty]: (() => any)[] = args.constraints;
        return `${constraintProperty} and ${args.property} does not match`;
    }
}
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// only to be used when both "minDifficulty" and "maxDifficulty" fields are present in the same dto
@ValidatorConstraint({ name: 'maxDifficultyValidator' })
export class MaxDifficultyValidator implements ValidatorConstraintInterface {
  validate(maxDifficulty: number, args: ValidationArguments) {
    return maxDifficulty >= args.object['minDifficulty'];
  }

  defaultMessage() {
    return 'maxDifficulty must be greater or equal to minDifficulty';
  }
}

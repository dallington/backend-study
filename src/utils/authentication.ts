import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function isPasswordMatching(
  userPassword: string,
  hashedPassword: string,
): Promise<boolean | Error> {
  const isPasswordMatching = await bcrypt.compare(hashedPassword, userPassword);
  if (!isPasswordMatching) {
    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }
  return isPasswordMatching;
}

export async function hashedPassword(
  userPassword: string,
  salt = 10,
): Promise<string> {
  return await bcrypt.hash(userPassword, salt);
}
export default {
  isPasswordMatching,
  hashedPassword,
};

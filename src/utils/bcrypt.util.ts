import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/infrastructure/persistence/relational/entities/user.entity';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  credentials: any,
): Promise<boolean> => {
  return await bcrypt.compare(password, credentials.password);
};

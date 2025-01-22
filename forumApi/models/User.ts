import mongoose, { HydratedDocument, Model } from 'mongoose';
import { UserTypes } from '../types';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';

interface UserMethods {
  passwordCheckout(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserTypes, {}, UserMethods>;
const SALT = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema<
  HydratedDocument<UserTypes>,
  UserModel,
  UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(this: HydratedDocument<UserTypes>, value: string): Promise<boolean> {
        if(!this.isModified('username')) return true
        const user: UserTypes | null = await User.findOne({username: value});
        return !user;
      },
      message: 'This name is already taken!'
    }
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
})

UserSchema.methods.passwordCheckout = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
  this.token = randomUUID();
};

const User = mongoose.model("User", UserSchema);
export default User;
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty()
  @Prop({
    required: true,
  })
  firstName: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  lastName: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

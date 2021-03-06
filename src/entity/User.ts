import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany
} from "typeorm";

import { IsNotEmpty, IsInt, IsBoolean, IsArray, IsDate } from "class-validator";

import { Todo } from "./Todo";

@Entity("users")
export class User extends BaseEntity {
  constructor(
    email: string,
    password: string,
    todos,
    created_at: Date,
    updated_at: Date
  ) {
    super();
    this.email = email;
    this.password = password;
    this.todos = [];
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @ObjectIdColumn()
  @IsNotEmpty()
  id: ObjectID;

  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @OneToMany(type => Todo, todo => todo.author)
  @IsArray()
  todos: Todo[];

  @Column("datetime")
  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @Column("datetime")
  @IsNotEmpty()
  @IsDate()
  updated_at: Date;

  public static async findByEmail(email: string): Promise<User[]> {
    return await this.find({ where: { email } });
  }

  public static async findOneByEmail(email: string): Promise<User> {
    return await this.findOne({ where: { email } });
  }
}

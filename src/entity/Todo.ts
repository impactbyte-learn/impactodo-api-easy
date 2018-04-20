import {
  Entity,
  BaseEntity,
  Column,
  Generated,
  ObjectID,
  ObjectIdColumn
} from "typeorm";
import { IsNotEmpty, IsInt, IsBoolean, IsDate } from "class-validator";

const cuid = require("cuid");

@Entity("todos")
export class Todo extends BaseEntity {
  constructor(
    text: string,
    bookmark: string,
    created_at: Date,
    updated_at: Date
  ) {
    super();
    this.text = text;
    this.bookmark = false;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @ObjectIdColumn()
  @IsNotEmpty()
  id: ObjectID;

  @Column()
  @Generated("uuid")
  idn: string;

  @Column()
  @IsNotEmpty()
  text: string;

  @Column("boolean")
  @IsNotEmpty()
  @IsBoolean()
  bookmark: boolean;

  @Column("datetime")
  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @Column("datetime")
  @IsNotEmpty()
  @IsDate()
  updated_at: Date;

  public static async findByText(text: string): Promise<Todo[]> {
    return await this.find({ where: { text } });
  }

  public static async findByBookmark(condition: boolean): Promise<Todo[]> {
    return await this.find({ where: { bookmark: condition } });
  }
}

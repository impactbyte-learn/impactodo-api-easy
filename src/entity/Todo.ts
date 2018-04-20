import {
  Entity,
  BaseEntity,
  Column,
  Generated,
  ObjectID,
  ObjectIdColumn
} from "typeorm";

const cuid = require("cuid");

@Entity("todos")
export class Todo extends BaseEntity {
  @ObjectIdColumn() id: ObjectID;

  @Column()
  @Generated("uuid")
  idn: string;

  @Column() text: string;

  @Column("boolean") bookmark: boolean;

  @Column("datetime") created_at: Date;

  @Column("datetime") updated_at: Date;

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

  public static async findByText(text: string): Promise<Todo[]> {
    return await this.find({ where: { text } });
  }

  public static async findByBookmark(condition: boolean): Promise<Todo[]> {
    return await this.find({ where: { bookmark: condition } });
  }
}

import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

import { Todo } from "./Todo";

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn() _id: ObjectID;

  @Column() email: string;

  @Column() password: string;

  @Column("datetime") created_at: Date;

  @Column(type => Todo)
  photos: Todo[];

  // @Column(type => Profile)
  // profile: Profile;

  public static async findByEmail(email: string): Promise<User[]> {
    return await this.find({ where: { email } });
  }
}

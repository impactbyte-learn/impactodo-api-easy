import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("todo")
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;

  @Column("text") public text: string;

  public static FindByText(text: string): Promise<Todo[]> {
    return this.find({ where: { text } });
  }
}

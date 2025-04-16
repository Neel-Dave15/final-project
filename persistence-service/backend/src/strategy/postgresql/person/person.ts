import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum PersonType {
  ACTOR = "actor",
  DIRECTOR = "director",
  STAFF = "staff",
}

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  unionId: string;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  nationality: string;

  @Column("text")
  biography: string;

  @Column()
  contactInfo: string; // Or consider using JSON if it's structured

  @Column({
    type: "enum",
    enum: PersonType,
  })
  personType: PersonType;
}
export { person } from "./person";


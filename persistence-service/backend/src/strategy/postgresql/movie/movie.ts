import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Award } from "../award/award";
import { Contract } from "../contract/contract"; 

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  title: string;

  @Column("text")
  description: string;

  @Column()
  releaseDate: Date;

  @Column("double precision")
  budget: number;

  @Column()
  isReleased: boolean;

  @OneToMany(() => Award, award => award.movie)
  awards: Award[];

  @OneToMany(() => Contract, contract => contract.movie)
  contracts: Contract[];
}

import {
  BaseEntity, Column, Entity,
  PrimaryGeneratedColumn
} from "typeorm";

// @Entity("TableNameForExampleEntity")
// export class ExampleEntity extends BaseEntity {
//   @PrimaryGeneratedColumn("uuid")
//     id: string;

//   @Column()
//     exampleColumn: string;

//   @CreateDateColumn()
//     createdDate: Date;

//   @UpdateDateColumn()
//     updatedDate: Date;

//   @DeleteDateColumn()
//     deletedDate: Date;
// }

@Entity()
export class Cars extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    vin: string;

  @Column()
    make: string;

  @Column()
    model: string;

  @Column()
    year: number;

  @Column()
    licensePlateNum: string;

  @Column()
    registrationNum: string;

  @Column()
    registrationState: string;

  @Column()
    registrationExp: string;

  @Column()
    registrationName: string;

  @Column()
    carValue: number;

  @Column()
    currentMileage: number;

  @Column()
    description: string;

  @Column()
    color: string;
}
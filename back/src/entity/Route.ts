import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bus } from "./Bus";

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "timestamptz", nullable: false })
  start!: Date;

  @Column({ type: "timestamptz", nullable: false })
  end!: Date;

  @ManyToOne(() => Bus, (bus) => bus.routes)
  @JoinColumn()
  bus!: Bus;
}

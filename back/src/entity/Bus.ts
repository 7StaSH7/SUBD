import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "./Route";

@Entity()
export class Bus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "text", nullable: false })
  driver!: string;

  @OneToMany(() => Route, (route) => route.bus)
  routes!: Route[];
}

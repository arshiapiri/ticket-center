import { sessionEntity } from 'src/auth/auth.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean ;

  @OneToMany(() => sessionEntity , (session) => session.user)
  sessions : sessionEntity[];
}
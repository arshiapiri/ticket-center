import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name : "session"})
export class sessionEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    token: string

    @Column({nullable:true, default : Date.now() })
    expireTime:string

    @ManyToOne(() => UserEntity , (user) => user.id)
    user:UserEntity
}
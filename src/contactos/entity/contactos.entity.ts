import { Usuario } from "src/usuarios/entiy/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Contactos{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 80})
    nombre: string

    @Column('integer')
    numero: number

    @Column({type: 'varchar', length: 80})
    correoElectronico: string

    @ManyToOne(() => Usuario, usuario => usuario.contactos)
    usuario: Usuario
    
}
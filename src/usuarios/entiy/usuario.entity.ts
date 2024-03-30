import { Contactos } from "src/contactos/entity/contactos.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 80})
    nombre: string;

    @Column({type: 'varchar', length: 80})
    apellido: string;

    @Column({type: 'varchar', length: 80})
    correoElectronico: string;

    @Column({type: 'varchar', length: 80})
    password: string;

    @OneToMany( () => Contactos, contacto => contacto.usuario, { cascade: true })
    contactos: Contactos[];
}

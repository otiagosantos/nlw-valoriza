import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Expose } from "class-transformer";

@Entity("tags")
class Tag {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name: "hashtag"})
    hashtag(): string {
        const tag = `#${this.name}`
        return tag.replace(" ", "");
    }

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { Tag };

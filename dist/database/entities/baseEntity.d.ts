export declare abstract class BaseEntity {
    id: string;
    created_at: Date;
    updated_at: Date;
    beforeCreate(): void;
    beforeUpdate(): void;
}

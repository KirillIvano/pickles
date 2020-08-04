export interface Identified<T> {
    id: T;
}

export const normalizeById = <T extends string | number>(entities: Identified<T>[]) =>
    entities.reduce(
        (
            acc,
            entity,
        ) => {
            acc[entity.id] = entity;

            return acc;
        }, {} as Record<T, Identified<T>>,
    );


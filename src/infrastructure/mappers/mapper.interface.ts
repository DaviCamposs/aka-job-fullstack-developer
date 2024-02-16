export interface Mapper<S, D> {
    toDomain(data: S): D;
  }
  
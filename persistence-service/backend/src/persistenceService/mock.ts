import { EntityTarget, ObjectLiteral } from "typeorm";
import { Person, PersonType } from "../strategy/postgresql/person/person";
import { Movie } from "../strategy/postgresql/movie/movie";
import { Award } from "../strategy/postgresql/award/award";
import { Role } from "../strategy/postgresql/role/role";
import { Contract } from "../strategy/postgresql/contract/contract";
import IPersistenceService from "./persistenceService";

export default class MockPersistenceService implements IPersistenceService {
  create<T extends ObjectLiteral & { id: number }>(Entity: EntityTarget<T>, id: number): Promise<T[]> {
    if (Entity === Person) {
      const person = new Person();
      person.id = id;
      person.unionId = "U1234";
      person.name = "John Doe";
      person.dob = new Date("1990-01-01");
      person.nationality = "Canadian";
      person.biography = "An experienced actor";
      person.contactInfo = "johndoe@example.com";
      person.personType = PersonType.ACTOR;
      return Promise.resolve([person as unknown as T]);
    }

    if (Entity === Movie) {
      const movie = new Movie();
      movie.id = id;
      movie.title = "Inception";
      movie.description = "Mind-bending thriller";
      movie.releaseDate = new Date("2010-07-16");
      movie.budget = 160000000;
      movie.isReleased = true;
      return Promise.resolve([movie as unknown as T]);
    }

    if (Entity === Award) {
      const award = new Award();
      award.id = id;
      award.awardName = "Best Picture";
      award.year = 2020;
      award.movie = new Movie();
      award.movie.id = 1;
      award.movie.title = "Inception";
      return Promise.resolve([award as unknown as T]);
    }

    if (Entity === Role) {
      const role = new Role();
      role.id = id;
      role.roleName = "Lighting Technician";
      role.person = new Person();
      role.person.id = 1;
      role.person.name = "John Doe";
      return Promise.resolve([role as unknown as T]);
    }

    if (Entity === Contract) {
      const contract = new Contract();
      contract.id = id;
      contract.contractId = "C-001";
      contract.cost = 5000;
      contract.person = new Person();
      contract.person.id = 1;
      contract.person.name = "John Doe";
      contract.movie = new Movie();
      contract.movie.id = 1;
      contract.movie.title = "Inception";
      return Promise.resolve([contract as unknown as T]);
    }

    return Promise.reject("Unknown entity.");
  }

  insert<T extends ObjectLiteral>(Entity: EntityTarget<T>, data: T): Promise<T> {
    return Promise.resolve(data);
  }

  update<T extends ObjectLiteral>(Entity: EntityTarget<T>, id: number, updates: Partial<T>): Promise<void> {
    return Promise.resolve();
  }

  delete<T extends ObjectLiteral>(Entity: EntityTarget<T>, id: number): Promise<void> {
    return Promise.resolve();
  }

  findAll<T extends ObjectLiteral>(Entity: EntityTarget<T>): Promise<T[]> {
    return this.create(Entity as EntityTarget<T & { id: number }>, 1);
  }
}

﻿# final-project
# Movie Production Company – Persistence Service
This project is a backend persistence layer for a Movie Production Company. It is built using Node.js, TypeScript, TypeORM, and PostgreSQL. The system models real-world entities such as actors, directors, staff, movies, roles, contracts, and awards. Docker is used to containerize and manage the services.

Project Overview
The persistence service tracks the following:

Person (actors, directors, staff)

Movie (films being produced or released)

Role (assigned to a person for a movie)

Contract (linking people to movies with payment)

Award (given to movies)

Each entity is stored in a relational database and connected through proper foreign key relationships.

System Architecture
Backend: Node.js + TypeScript

ORM: TypeORM

Database: PostgreSQL

Containerization: Docker and Docker Compose

Admin UI: pgAdmin

Entities and Relationships
Person: stores details of actors, directors, and staff.

Movie: stores details of each movie.

Role: describes the position or title a person held during a production.

Contract: represents a person’s contract and cost per movie.

Award: represents an award won by a movie.

Relationships:

A Person can have many Roles.

A Movie can have many Awards.

A Contract connects a Person and a Movie.

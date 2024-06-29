import { gql } from "@apollo/client";

export const GET_CARS = gql`
  {
    cars {
      id
      make
      model
      personId
      price
      year
    }
  }
`;

export const GET_PEOPLE = gql`
  {
    people {
      firstName
      id
      lastName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      firstName
      id
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      firstName
      id
      lastName
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $id: String!
    $year: String!
    $make: String!
    $model: String!
    $price: String!
    $personId: String!
  ) {
    addCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      personId
      price
      year
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation Mutation($id: String!) {
    removeCar(id: $id) {
      id
      make
      model
      personId
      price
      year
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: String!
    $year: String!
    $make: String!
    $model: String!
    $price: String!
    $personId: String!
  ) {
    updateCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      personId
      price
      year
    }
  }
`;

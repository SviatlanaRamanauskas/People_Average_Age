'use strict';
debugger

const people = [
  { sex: 'm', born: 1535, died: 1582, name: 'Pauwels van Haverbeke', father: 'N. van Haverbeke', mother: null },
  { sex: 'f', born: 1542, died: 1582, name: 'Lievijne Jans', father: null, mother: null },
  { sex: 'm', born: 1570, died: 1636, name: 'Lieven van Haverbeke', father: 'Pauwels van Haverbeke', mother: 'Lievijne Jans' },
  { sex: 'm', born: 1602, died: 1642, name: 'Pieter Haverbeke', father: 'Lieven van Haverbeke', mother: null },
  { sex: 'f', born: 1607, died: 1670, name: 'Anna van Hecke', father: 'Paschasius van Hecke', mother: 'Martijntken Beelaert' },
  { sex: 'm', born: 1631, died: 1676, name: 'Lieven Haverbeke', father: 'Pieter Haverbeke', mother: 'Anna van Hecke' },
  { sex: 'f', born: 1632, died: 1674, name: 'Elisabeth Hercke', father: 'Willem Hercke', mother: 'Margriet de Brabander' },
  { sex: 'm', born: 1652, died: 1723, name: 'Daniel Haverbeke', father: 'Lieven Haverbeke', mother: 'Elisabeth Hercke' },
];

  function calculateMenAverageAge(people, century) {
    const menArr = [...people].filter(person => person.sex === 'm');
    let finalMenArr;
  
    if (century !== undefined) {
      finalMenArr = menArr
        .filter(person => Math.ceil(person.died / 100) === century);
    } else {
      finalMenArr = menArr;
    }
  
    const sumLifeTimes = finalMenArr
      .map(person => person.died - person.born)
      .reduce((prev, person) => {
        return prev + person;
      }, 0);
  
    if (finalMenArr.length === 0) {
      return 0;
    }
  
    return sumLifeTimes / finalMenArr.length;
  }
  
  function calculateWomenAverageAge(people, withChildren) {
    const womenArr = [...people].filter(person => person.sex === 'f');
    let finalWomenArr;
  
    if (withChildren === true) {
      const mothersNames = people
        .filter(person => person.mother !== null)
        .map(person => person.mother);
  
      finalWomenArr = womenArr
        .filter(person => mothersNames.includes(person.name));
    } else {
      finalWomenArr = womenArr;
    }
  
    const sumLifeTimes = finalWomenArr
      .map(person => person.died - person.born)
      .reduce((prev, person) => {
        return prev + person;
      }, 0);
  
    if (finalWomenArr.length === 0) {
      return 0;
    }
  
    return sumLifeTimes / finalWomenArr.length;
  }
  

  function calculateMotherAverageAge(people, onlyWithSon = false) {
    const mothers = people.filter(person => person.sex === 'f');

    const children = people.filter(person =>
      onlyWithSon
        ? people.some(mother => person.mother === mother.name)
          && person.sex === 'm'
        : people.some(mother => person.mother === mother.name));
  
      const ages = children.map(child =>
        child.born - mothers.find(mother => mother.name === child.mother).born);

      const sumAges = ages.reduce((sum, age) => {
        return sum + age;
      }, 0);

      return sumAges / ages.length;
  }

calculateMotherAverageAge(people, true);
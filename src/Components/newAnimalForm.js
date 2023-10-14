import React, { useState } from 'react';


export const NewAnimalForm = (props) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [animals, setAnimals] = useState([]); // State to store added animals

    const handleBreedInput = (e) => {
        setBreed(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name && breed) {
            const newAnimal = { name, breed };
            setAnimals([...animals, newAnimal]); // Add the new animal to the animals state
            props.addNewAnimal(newAnimal);
            setName('');
            setBreed('');
        } else {
            console.log('Invalid input');
        }
    };

    const deleteAnimal = (index) => {
        const updatedAnimals = [...animals];
        updatedAnimals.splice(index, 1);
        setAnimals(updatedAnimals);
    };

    return (
        <div>
            <h4>Add a new animal</h4>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    placeholder="breed"
                    onChange={handleBreedInput}
                    value={breed}
                />
                <button type="submit">Add Animal</button>
            </form>

        </div>
    );
};

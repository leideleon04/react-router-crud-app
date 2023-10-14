import React, { useState } from 'react';
import { NewAnimalForm } from './newAnimalForm'; 
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Rescue = (props) => {
    const { rescue: initialRescue = {}, updateRescue } = props; // Provide a default value for rescue

    const [rescue, setRescue] = useState(initialRescue);

    const deleteAnimal = (animalId) => {
        const updatedRescue = {
            ...rescue,
            animals: rescue.animals ? rescue.animals.filter((x) => x._id !== animalId) : []
        };
        setRescue(updatedRescue); // Use setRescue to update the rescue state
    };

    const addNewAnimal = (animal) => {
        const newAnimal = { ...animal, _id: Date.now() }; // Add a unique ID
        setRescue((prevRescue) => ({
            ...prevRescue,
            animals: [...(prevRescue.animals || []), newAnimal],
        }));
    };

    const animals = () => (
        <div>
            <h4>Animals Table:</h4>
            <Table striped border="1" hover>
                
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Breed</th>
                    </tr>
                </thead>
                <tbody>
                    {(rescue.animals || []).map((animal, index) => (
                        <tr key={index}>
                            <td>{animal.name}</td>
                            <td>{animal.breed}</td>
                            <Button onClick={() => deleteAnimal(animal._id)}>
                                Delete
                            </Button>
                        </tr>
                    ))}
                </tbody>
                
            </Table>
        </div>
    );
    
    return (
        <div>
            <Card border='15px'>
            <h1>{rescue.name}</h1> <p>Capacity: {rescue.capacity}</p>
            {animals()}
            {rescue && <NewAnimalForm addNewAnimal={addNewAnimal} />}
            <br></br>
            </Card>
        </div>
    );   
       
};

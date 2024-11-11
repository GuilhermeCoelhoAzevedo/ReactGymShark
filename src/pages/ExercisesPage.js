import DefaultPage from "../components/DefaultPage/DefaultPage";
import Button from 'react-bootstrap/Button';
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToolBarDiv } from "./styles";
const ExercisesPage = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
      // Fetch exercises when the component mounts
      const fetchExercises = async () => {
        try {
          const response = await axios.get('/api/exercises');
          setExercises(response.data);
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      };
  
      fetchExercises();
    }, []);
    
    const handleRowClick = (exerciseId) => {
        console.log(exerciseId);
    }  

    return (
        <DefaultPage>
            <ToolBarDiv>
                <Button variant="dark" href="exercise">Add exercise</Button>
            </ToolBarDiv>
            <Table hover>
                <thead>
                    <tr>
                    <th>Exercise</th>
                    <th>Category</th>
                    <th>Instructions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, index) => (
                        <tr key={exercise.exerciseId} onClick={()=> handleRowClick(exercise.exerciseId)} role="button">
                            <td>{exercise.name}</td>
                            <td>{exercise.exerciseCategory.category}</td>
                            <td>{exercise.instructions}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </DefaultPage>
    );
}

export default ExercisesPage;
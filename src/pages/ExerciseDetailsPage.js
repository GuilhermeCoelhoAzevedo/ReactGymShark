import DefaultPage from "../components/DefaultPage/DefaultPage";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToolBarDiv } from "./styles";
import { useEffect } from "react";

function ExerciseDetailsPage() {
    const [name, setName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      // Fetch categories when the component mounts
      const fetchCategories = async () => {
        try {
          const response = await axios.get('/api/exerciseCategories');
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      };
  
      fetchCategories()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('instructions', instructions);
        formData.append('exerciseCategory', findCategory());

        await axios.post('/api/exercises', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        navigate('/exercises');
    };

    //Gets Category Id selected in Form.select
    const findCategory = () => {
        return categories.find((element) => element.category === category).exerciseCategoryId;
    };

    return (
        <DefaultPage>
        <Form onSubmit={handleSubmit} autoComplete="off">
            <ToolBarDiv>
                <Button variant="dark" onClick={() => navigate('/exercises')}>Cancel</Button>
                <Button variant="dark" type="submit">Save</Button> 
            </ToolBarDiv>
            <Form.Group className="mb-3" controlId="formExerciseName">
            <Form.Label>Exercise name</Form.Label>
            <Form.Control 
                required
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required>
                    {category === "" && <option value="">Select a category</option>}
                    {categories.map((category, index) => (
                        <option key={category.exerciseCategoryId}>{category.category}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInstructions">
            <Form.Label>Instructions</Form.Label>
            <Form.Control 
                as="textarea" 
                rows={5} 
                value={instructions}
                onChange={e => setInstructions(e.target.value)}/>
            </Form.Group>
        </Form>
        </DefaultPage>
    );
}

export default ExerciseDetailsPage;
import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Textarea, Button } from '@chakra-ui/react';

import axios from 'axios';

const WorkOrder = () => {
  const [turbineModel, setTurbineModel] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [technician, setTechnician] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://wind-turbine-app-backend.onrender.com/work/work-orders', {
        turbineModel: turbineModel,
        description: description,
        location: location,
        technician: technician,
        date: date
      });
      console.log('User signed up:', response.data);
      // Reset the form fields
      setTurbineModel('');
      setDescription('');
      setLocation('');
      setTechnician('');
      setDate();
      // Redirect to the wind turbines page or perform any other desired action
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error submit didnt work:', error);
    }
  };


  // 39.627038, -2.287618
  // 39.630678, -2.284431
  // 39.634185, -2.281091
  // 39.637196, -2.278140
  // 39.640481, -2.277091
  // 39.641390, -2.294946
  // 39.638467, -2.298962
  // 39.635318, -2.303638
  // 39.580464, -2.253965
  // 39.576838, -2.258782
  // 39.573908, -2.260765
  return (
    <Box padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
        Work Order Form
      </Text>
      <form onSubmit={handleSubmit}>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Turbine Model
          </Text>
          <Input
            type="text"
            name="turbineModel"
            value={turbineModel}
            onChange={(e) => setTurbineModel(e.target.value)}
            placeholder="Enter turbine model"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Description
          </Text>
          <Textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter work order description"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Location
          </Text>
          <Input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Technician
          </Text>
          <Input
            type="text"
            name="technician"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            placeholder="Enter technician name"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Date
          </Text>
          <Input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Box>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default WorkOrder;

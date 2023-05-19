import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import './post.css';

export default function Post({ post }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null); // State for tracking the selected work order
  const [isOpen, setIsOpen] = useState(false); // State for controlling the modal window

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get('https://wind-turbine-app-backend.onrender.com/work/all');
        setWorkOrders(response.data);
      } catch (error) {
        console.error('Error fetching work orders:', error);
      }
    };

    fetchWorkOrders();
  }, []);

  const openModal = (workOrderId) => {
    setSelectedWorkOrderId(workOrderId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkOrderId(null);
    setIsOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform your form submission logic here
    closeModal();
  };

  return (
    <div className='post'>
      <div className="postWrapper">
        <div>
          {workOrders.length > 0 ? (
            workOrders.map((workOrder) => (
              <div key={workOrder._id} className="workOrderCard">
                <Box>
                  <Text className='model' marginBottom="0.5rem">
                    Turbine Model: {workOrder.turbineModel}
                  </Text>
                  <Text className='des' marginBottom="0.5rem">
                    Description: {workOrder.description}
                  </Text>
                  <Text className='des' marginBottom="0.5rem">
                    Location: {workOrder.location}
                  </Text>
                  <Text className='tech' marginBottom="0.5rem">
                    Technician: {workOrder.technician}
                  </Text>
                  <Text className='data'>Date: {workOrder.date}</Text>
                  <Button onClick={() => openModal(workOrder._id)}>Add Info</Button>
                </Box>
              </div>
            ))
          ) : (
            <p>No work orders found.</p>
          )}
        </div>
      </div>
      {selectedWorkOrderId && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Info</ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormControl>
                  <FormLabel>Information:</FormLabel>
                  <Input type="text" placeholder="Enter information" />
                </FormControl>
                {/* Add more form fields as needed */}
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={closeModal}>
                    Close
                  </Button>
                  <Button type="submit" variant="ghost">Save</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

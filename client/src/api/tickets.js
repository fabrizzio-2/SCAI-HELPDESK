const API_URL = 'http://localhost:3000/api';

export const getTickets = async () => {
  const response = await fetch(`${API_URL}/tickets`);
  if (!response.ok) throw new Error('Failed to fetch tickets');
  return response.json();
};

export const getTicket = async (id) => {
  const response = await fetch(`${API_URL}/tickets/${id}`);
  if (!response.ok) throw new Error('Failed to fetch ticket');
  return response.json();
};

export const createTicket = async (ticketData) => {
  const response = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticketData),
  });
  if (!response.ok) throw new Error('Failed to create ticket');
  return response.json();
};

export const updateTicketStatus = async ({ ticketId, status }) => {
  const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update ticket status');
  return response.json();
};

export const addResponse = async ({ ticketId, content }) => {
  const response = await fetch(`${API_URL}/tickets/${ticketId}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error('Failed to add response');
  return response.json();
};
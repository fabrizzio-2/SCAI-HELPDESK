const API_URL = 'http://localhost:3000/api';

export const getUnits = async () => {
  const response = await fetch(`${API_URL}/units`);
  if (!response.ok) throw new Error('Failed to fetch units');
  return response.json();
};
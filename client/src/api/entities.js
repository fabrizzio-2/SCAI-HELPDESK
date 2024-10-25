const API_URL = 'http://localhost:3000/api';

export const getEntityTypes = async () => {
  const response = await fetch(`${API_URL}/entities/types`);
  if (!response.ok) throw new Error('Failed to fetch entity types');
  return response.json();
};
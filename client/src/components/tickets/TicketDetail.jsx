import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTicket, updateTicketStatus, addResponse } from '../../api/tickets';
import { useAuth } from '../../contexts/AuthContext';

const TicketDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: ticket, isLoading } = useQuery(['ticket', id], () => getTicket(id));
  
  const statusMutation = useMutation(updateTicketStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ticket', id]);
    },
  });

  const responseMutation = useMutation(addResponse, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ticket', id]);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900">{ticket.title}</h2>
          <select
            value={ticket.status}
            onChange={(e) => statusMutation.mutate({ ticketId: id, status: e.target.value })}
            className="rounded-md border-gray-300"
          >
            <option value="new">New</option>
            <option value="processing">Processing</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        
        <div className="mt-6">
          <p className="text-gray-600">{ticket.description}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Responses</h3>
          <div className="mt-4 space-y-4">
            {ticket.responses.map((response, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">{response.content}</p>
                <p className="mt-2 text-sm text-gray-500">
                  By {response.author.firstName} {response.author.lastName} - 
                  {new Date(response.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {ticket.status !== 'closed' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const content = e.target.response.value;
              responseMutation.mutate({ ticketId: id, content });
              e.target.reset();
            }}
            className="mt-6"
          >
            <textarea
              name="response"
              rows="4"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add a response..."
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Response
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;
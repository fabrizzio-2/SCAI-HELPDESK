import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const TicketItem = ({ ticket }) => {
  return (
    <Link
      to={`/tickets/${ticket._id}`}
      className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
          <p className="mt-1 text-sm text-gray-600">
            {ticket.description.substring(0, 150)}
            {ticket.description.length > 150 ? '...' : ''}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          ticket.status === 'new' ? 'bg-green-100 text-green-800' :
          ticket.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {ticket.status}
        </span>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>By {ticket.creator.firstName} {ticket.creator.lastName}</span>
        <span>{formatDistanceToNow(new Date(ticket.createdAt))} ago</span>
      </div>
    </Link>
  );
};

export default TicketItem;
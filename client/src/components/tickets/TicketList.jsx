import { useQuery } from 'react-query';
import { Tab } from '@headlessui/react';
import { getTickets } from '../../api/tickets';
import TicketItem from './TicketItem';

const TicketList = () => {
  const { data: tickets, isLoading } = useQuery('tickets', getTickets);

  const filterTickets = (status) => {
    return tickets?.filter(ticket => ticket.status === status) || [];
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['new', 'processing', 'closed'].map((status) => (
            <Tab
              key={status}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {['new', 'processing', 'closed'].map((status) => (
            <Tab.Panel
              key={status}
              className="rounded-xl bg-white p-3"
            >
              <div className="space-y-4">
                {filterTickets(status).map((ticket) => (
                  <TicketItem key={ticket._id} ticket={ticket} />
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TicketList;
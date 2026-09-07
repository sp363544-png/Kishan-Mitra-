import { motion } from 'motion/react';
import { Tractor, UserCog, LineChart } from 'lucide-react';
import { Role } from '../types';

interface Props {
  onSelect: (role: Role) => void;
}

export default function RoleSelector({ onSelect }: Props) {
  const roles = [
    {
      id: 'farmer' as Role,
      title: 'Farmer Portal',
      description: 'Book slots, track queues, and view payment status.',
      icon: Tractor,
      color: 'bg-emerald-100 text-emerald-700',
      hover: 'hover:border-emerald-500 hover:shadow-emerald-100'
    },
    {
      id: 'supervisor' as Role,
      title: 'Center Supervisor',
      description: 'Manage live queues, weighment, and staff allocation.',
      icon: UserCog,
      color: 'bg-blue-100 text-blue-700',
      hover: 'hover:border-blue-500 hover:shadow-blue-100'
    },
    {
      id: 'gov' as Role,
      title: 'Government Dashboard',
      description: 'Monitor statewide procurement, bottlenecks, and forecasts.',
      icon: LineChart,
      color: 'bg-purple-100 text-purple-700',
      hover: 'hover:border-purple-500 hover:shadow-purple-100'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Welcome to Kishan Mitra
        </h2>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
          Select your portal to continue. This demo environment simulates the end-to-end procurement workflow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {roles.map((role, idx) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect(role.id)}
            className={`cursor-pointer bg-white rounded-2xl shadow-sm border-2 border-transparent p-8 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${role.hover}`}
          >
            <div className={`p-4 rounded-full ${role.color} mb-6`}>
              <role.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{role.title}</h3>
            <p className="text-slate-500">{role.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

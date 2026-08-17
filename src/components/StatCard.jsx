// components/StatCard.jsx
'use client';

import { Card } from '@heroui/react';

export default function StatCard({ title, value, icon: IconComponent }) {
  return (
    <Card 
      className="bg-[#18181b] border border-[#27272a] hover:border-zinc-700 transition-colors duration-200 rounded-xl"
    >
      <Card.Content className="p-4 sm:p-5 flex flex-col justify-between gap-3 sm:gap-4">
        {/* Icon Badge */}
        {IconComponent && (
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-[#27272a] flex items-center justify-center text-zinc-300">
            <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
          </div>
        )}

        {/* Text Details */}
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[11px] sm:text-xs font-medium text-zinc-400">
            {title}
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {value}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}
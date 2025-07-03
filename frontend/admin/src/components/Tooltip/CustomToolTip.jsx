export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="pt-1 pb-2 pl-2 pr-8 bg-white flex flex-col gap-1 rounded-md shadow-sm">
        <p className="font-[i-m]">{label}</p>
        <p className="text-sm text-neutral-800">
          <span className="">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
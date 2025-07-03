import { use, useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { host } from '../../../config';
import { useFetch } from '../../../hooks/useFetch';
import { DatePick } from "../../../components/Balise";
import { motion, AnimatePresence } from 'framer-motion';
import { bottom_top } from '../../../components/animations/Index';
import { CustomTooltip } from '../../../components/Tooltip/CustomToolTip';

const Activity = () => {

  const { data } = useFetch(`${host}/dashboard/activites`);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [debut, setDebut] = useState(null);
  const [fin, setFin] = useState(null);
  const [curDebut, setCurDebut] = useState(null);
  const [curFin, setCurFin] = useState(null);

  const changeData = async () => {
    if (!debut || !fin) return;

    const formatDate = (date) => date.toLocaleDateString("fr-CA");
    const arg = `?debut=${formatDate(debut)}&fin=${formatDate(fin)}`;
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(`${host}/dashboard/activites${arg}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setActivities(data);
      setCurDebut(data.debut);
      setCurFin(data.fin);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setActivities(data);
      setCurDebut(data.debut);
      setCurFin(data.fin);
    }
  }, [data]);
  useEffect(() => {
    if (debut && fin) {
      changeData();
    }
  }, [debut, fin]);

  return (
    <div className="p-4">

      <div className="pl-8">

        <div className='text-2xl pt-1 pb-4 font-[i]'>Recettes</div>

        <div className="pb-8 flex items-center gap-8 w-[900px] relative">
          <div className="p-1 flex flex-col gap-1 text-neutral-600">
            <div className="flex">debut</div>
            <div className="relative">
              <DatePick
                selected={debut}
                onChange={(date) => setDebut(date)}
              />
            </div>
          </div>

          <div className="p-1 flex flex-col gap-1 text-neutral-600">
            <div className="flex">fin</div>
            <div className="relative">
              <DatePick
                selected={fin}
                onChange={(date) => setFin(date)}
              />
            </div>
          </div>
        </div>

      </div>

      <div className="w-full h-96 flex flex-col gap-4 pr-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={activities.activites}
            margin={{ right: 30 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <YAxis />
            <XAxis dataKey="date" width={1} />
            <CartesianGrid strokeDasharray="2 2" vertical={false} />

            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={24} />

            <Area
              type="monotone"
              dataKey="recettes"
              stroke="#8884d8"
              fill="url(#colorUv)"
              fillOpacity={1}
              stackId="1"
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center p-8 pr-24">
        <AnimatePresence mode="popLayout">
            <motion.div key={curDebut+curFin} {...bottom_top} className="text-neutral-500 text-2xl font-[i-m]">
              {curDebut} - {curFin}
            </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}


export default Activity;
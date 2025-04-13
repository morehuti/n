import { motion } from "framer-motion";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

export default function App() {
  const startDate = new Date(2022, 3, 20);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = differenceInDays(currentDate, startDate);
  const hours = differenceInHours(currentDate, startDate) % 24;
  const minutes = differenceInMinutes(currentDate, startDate) % 60;
  const seconds = differenceInSeconds(currentDate, startDate) % 60;

  const handleClick = () => {
    setClickCount(count => count + 1);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4 cursor-pointer"
      onClick={handleClick}
      animate={{
        scale: [1, 0.98, 1],
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-purple-600 mb-8"
      >
        حسين
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring" }}
      >
        <div className="grid grid-cols-4 gap-4 text-center mb-8">
          <CounterBox label="أيام" value={days} />
          <CounterBox label="ساعات" value={hours} />
          <CounterBox label="دقائق" value={minutes} />
          <CounterBox label="ثواني" value={seconds} />
        </div>

        <motion.div
          className="text-2xl text-center text-pink-600 font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          نور
        </motion.div>

        <motion.div 
          className="text-center mt-4 text-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          عدد الضغطات: {clickCount} ❤️
        </motion.div>
      </motion.div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: 360,
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            {["🌸", "✨", "💖", "🎀", "⭐"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CounterBox({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-3 shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-2xl font-bold text-purple-700">{value}</div>
      <div className="text-sm text-purple-600">{label}</div>
    </motion.div>
  );
}

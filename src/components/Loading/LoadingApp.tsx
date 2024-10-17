"use client";

import { motion } from "framer-motion";

export function LoadingApp() {
  return (
    <div className="fixed h-[100svh] w-[100svw] inset-0 bg-gradient-to-br from-[rgba(0,0,0,.1)] to-[rgba(255,255,255,.1)] flex items-center justify-center z-50">
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute inset-0 border-4 border-blue-200 rounded-lg"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-2 bg-white rounded-md shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-1 bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{
              delay: 0.7,
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>
      <motion.div
        className="absolute mt-40 text-blue-500 font-semibold text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      >
        carregando
      </motion.div>
    </div>
  );
}

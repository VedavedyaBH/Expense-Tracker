import { motion } from "framer-motion";

const animationConfig = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const Transitions = ({ children }: any) => {
    return (
        <motion.div
            variants={animationConfig}
            initial="initial"
            exit="exit"
            transition={{ duration: 0.5 }}
            animate="animate"
        >
            {children}
        </motion.div>
    );
};
export default Transitions;

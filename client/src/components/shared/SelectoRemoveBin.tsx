import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AnimatePresence, motion } from "motion/react";
import { taskAPI } from "@/services/TaskService";
import { select } from "@/store/reducers/SelectoSlice";

const SelectoRemoveBin = () => {
    const selectedIds = useAppSelector((state) => state.selecto.selectedIds);
    const dispatch = useAppDispatch();
    const [deleteTasks] = taskAPI.useDeleteTasksMutation();
    const isVisible = selectedIds.length > 0 ? true : false;

    const handleDelete = async () => {
        try {
            const result = await deleteTasks(selectedIds);
            const isSuccess = result?.data?.success;

            if (isSuccess) dispatch(select([]));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AnimatePresence initial={false}>
            {isVisible && (
                <motion.div
                    onClick={handleDelete}
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1.2, rotate: 360 }}
                    exit={{ opacity: 0, scale: 0, rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={
                        "fixed bottom-4 right-4 z-50 cursor-pointer rounded-full bg-red-500 p-2 text-white"
                    }
                >
                    <Trash2 />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SelectoRemoveBin;

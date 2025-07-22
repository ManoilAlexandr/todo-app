import { useAppSelector } from "@/hooks/redux";
import { Loader2 } from "lucide-react";

const Loader = () => {
    const isLoading = useAppSelector((state) => state.loader.isLoading);

    return isLoading ? (
        <div className="fixed inset-0 z-10 bg-black/5 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
    ) : null;
};

export default Loader;

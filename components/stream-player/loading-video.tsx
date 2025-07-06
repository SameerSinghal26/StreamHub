import { Loader } from "lucide-react";

interface LoadingVideoProps {
    label : string;
}

export const LoadingVideo = ({
    label,
} : LoadingVideoProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Loader className="w-10 h-10 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground capitalize">
                {label}
            </p>
        </div>
    )
}
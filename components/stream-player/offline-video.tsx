import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
    username : string;
}

export const OfflineVideo = ({
        username,
} : OfflineVideoProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <WifiOff className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
                {username} is offline
            </p>
        </div>
    )
}
import { Info } from "lucide-react";
import { useMemo } from "react";
import { Hint } from "@/components/hint";

interface ChatInfoProps {
    isDelayed : boolean;
    isFollowersOnly : boolean;
}

export const ChatInfo = ({
    isDelayed,
    isFollowersOnly,
} : ChatInfoProps) => {
    const hint = useMemo(() => {
        if(isFollowersOnly && !isDelayed){
            return "Only followers can chat"
        }

        if(isDelayed && !isFollowersOnly){
            return "Message are delayed by 3 seconds";
        }

        if(isDelayed && isFollowersOnly) {
            return "Only followers can chat. Message are delayed by 3 seconds"
        }

        return "";
    }, [isDelayed, isFollowersOnly]);

    const label = useMemo(() => {
        if(isFollowersOnly && !isDelayed){
            return "Followers Only.";
        }

        if(isDelayed && !isFollowersOnly){
            return "Delay Mode.";
        }

        if(isDelayed && isFollowersOnly) {
            return "Followers Only and Delay Mode.";
        }

        return "";
    }, [isDelayed, isFollowersOnly]);

    if(!isDelayed && !isFollowersOnly){
        return null;
    }

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4"/>
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    );
};
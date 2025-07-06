"use client"

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";


interface ActionsProps {
    hostIdentity : string;
    isFollowing : boolean;
    isHost : boolean
};

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost,
} : ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const {userId} = useAuth();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success( `You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went Wrong!!!"));
        });
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success( `You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went Wrong!!!"))
        });
    }
    const toggleFollow = () => {
        if(!userId) {
            return router.push("/sign-in");
        }

        if(isHost) return;

        if(isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }
    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="third_red"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4",
                isFollowing ? "fill-white" : "fill-none",
            )}/>
            {isFollowing ? "UnFollow" : "Follow"}
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}
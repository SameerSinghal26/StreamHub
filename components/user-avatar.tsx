import { cn } from "@/lib/utils";
import { cva,  type VariantProps} from "class-variance-authority";
import { Skeleton } from "@/components/ui/skeleton";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { LiveBadge } from "@/components/live-badge";

const avatarSizes = cva(
    "",
    {
        variants: {
            size : {
                default : "h-8 w-8",
                lg : "h-14 w-14"
            },
        },
        defaultVariants : {
            size : "default",
        },
    },
);

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username : string;
    imageUrl : string;
    isLive? : boolean;
    showBadge?: boolean;
};


export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    showBadge,
    size,
} : UserAvatarProps) => {

    const canshowbadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar 
                className={cn(
                    isLive && "ring-2 ring-rose-500 border border-background",
                    avatarSizes({ size })
                )}
            >
                <AvatarImage src={imageUrl} className="object-cover"/>
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canshowbadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge/>
                </div>
            )}
        </div>
    )
}

export const UserAvatarSkeleton = ({
    size,
} : VariantProps<typeof avatarSizes>) => {
    return (
        <Skeleton className={cn(
          "rounded-full",
          avatarSizes({size}),  
        )} />
    );
};
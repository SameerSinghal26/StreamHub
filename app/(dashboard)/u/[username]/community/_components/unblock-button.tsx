"use client"

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId : string;
};

export const UnblockButton = ({
    userId,
} : UnblockButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((result) => toast.success(`User ${result.blocked.username} Unblocked`))
                .catch(() => toast.error("Something went wrong"))
        });
    };

    return (
        <Button
            disabled={isPending}
            onClick={onClick}
            variant="link"
            size="sm"
            className="text-red-600 w-full"
        >
            Unblock
        </Button>
    )
}
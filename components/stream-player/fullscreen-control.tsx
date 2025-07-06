"use client";

import { Hint } from "@/components/hint";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullscreenControlProps {
    isFullscreen : boolean;
    onToggle : () => void;
};

export const FullscreenControl = ({
    isFullscreen,
    onToggle,
} : FullscreenControlProps) => {
    const Icon = isFullscreen ? Minimize : Maximize;

    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen"

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <Button
                    onClick={onToggle}
                    className="p-1 bg-transparent text-white hover:bg-white/10 rounded-lg"
                >
                    <Icon className="h-7 w-7"/>
                </Button>
            </Hint>
        </div>
    )
}

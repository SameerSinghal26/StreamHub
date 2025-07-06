"use server";

import { getself } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const updateStream = async (value : Partial <Stream>) => {
    try {
        const self = await getself();
        const selfStream = await db.stream.findUnique({
            where : {
                userId : self.id,
            },
        });

        if(!selfStream) {
            throw new Error("Stream not found")
        }

        const validData = {
            thumbnailUrl : value.thumbnailUrl,
            name : value.name,
            isChatEnabled : value.isChatEnabled,
            isChatFollowersOnly : value.isChatFollowersOnly,
            isChatDelayed : value.isChatDelayed
        };

        const stream = await db.stream.update({
            where : {
                id : selfStream.id,
            },
            data : {
                ...validData,
            },
        });

        revalidatePath(`/u/${self.username}/chat`);
        revalidatePath(`/u/${self.username}`);
        revalidatePath(`/${self.username}`);

        return stream;
        
    } catch (error) {
        throw new Error("Internal Error")
    }
}
import { getself } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getSearch = async (term?: string) => {
    let userId;

    try {
        const self = await getself();
        userId = self.id;
    } catch {
        userId = null;
    }

    let streams = [];

    if(userId) {
        const blockedBy = await db.block.findMany({
            where: { blockedId: userId },
            select: { blockerId: true },
        });
        const blockedByIds = blockedBy.map(b => b.blockerId);

        streams = await db.stream.findMany({
            where: {
                userId: { notIn: blockedByIds },
                OR: [
                    {
                        name: {
                            contains : term,
                        },
                    },
                    {
                        user : {
                            username : {
                                contains: term,
                            },
                        },
                    },
                ],
            },
            select: {
                user : true,
                id: true,
                name: true,
                isLive : true,
                thumbnailUrl: true,
                updatedAt : true,
            },
            orderBy : [
                {
                    isLive: "desc",
                },
                {
                    updatedAt : "desc",
                },
            ],
        });
    } else {
        streams = await db.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains : term,
                        },
                    },
                    {
                        user : {
                            username : {
                                contains: term,
                            },
                        },
                    },
                ],
            },
            select: {
                user : true,
                id: true,
                name: true,
                isLive : true,
                thumbnailUrl: true,
                updatedAt : true,
            },
            orderBy : [
                {
                    isLive: "desc",
                },
                {
                    updatedAt : "desc",
                },
            ],
        });
    };

    return streams;
};
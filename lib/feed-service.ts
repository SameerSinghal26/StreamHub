import { db } from "@/lib/db";
import { getself } from "@/lib/auth-service";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getself();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    const blockedBy = await db.block.findMany({
      where: {
        blockedId: userId,
      },
      select: {
        blockerId: true,
      },
    });

    const blockedByIds = blockedBy.map((b) => b.blockerId);

    streams = await db.stream.findMany({
      where: {
        userId: {
          notIn: blockedByIds,
        },
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};

import { db } from "@/lib/db";
import { getself } from "@/lib/auth-service";

export const getRecommended = async () => {
  let userId;
  try {
    const self = await getself();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {

    const blockedBy = await db.block.findMany({
      where: { blockedId: userId },
      select: { blockerId: true },
    });
    const blockedByIds = blockedBy.map(b => b.blockerId);
  
    const followed = await db.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followedIds = followed.map(f => f.followingId);
  
    const iBlocked = await db.block.findMany({
      where: { blockerId: userId },
      select: { blockedId: true },
    });
    const iBlockedIds = iBlocked.map(b => b.blockedId);

    const excludeIds = [...new Set([
      ...blockedByIds,
      ...followedIds,
      ...iBlockedIds,
      userId,
    ])];

    users = await db.user.findMany({
      where: {
        id : {
          notIn: excludeIds,
        }
      },
      include : {
        stream : {
          select : {
            isLive : true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream : {
          select : {
            isLive : true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};

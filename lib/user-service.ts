import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        externalUserId: true,
        username: true,
        bio: true,
        imageUrl: true,
        stream: {
          select: {
            id: true,
            isLive: true,
            isChatDelayed: true,
            isChatEnabled: true,
            isChatFollowersOnly: true,
            thumbnailUrl: true,
            name: true,
          },
        },
      },
    });
  
    if (!user) return null;
  
    const followerCount = await db.follow.count({
      where: {
        followingId: user.id,
      },
    });
  
    return {
      ...user,
      followerCount,
    };
  };
  

export const getUserById = async (id : string) => {
    const user = await db.user.findUnique({
        where : {
            id
        },
        include : {
            stream : true,
        },
    });

    return user;
};
import { getself } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getself();
      
      return { user : self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        try {
            await db.stream.update({
                where: {
                    userId: metadata.user.id,
                },
                data: {
                    thumbnailUrl: file.ufsUrl,
                },
            });
            return { fileUrl: file.ufsUrl };
        } catch (error) {
            console.error("UPLOAD ERROR:", error);
            throw error;
        }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

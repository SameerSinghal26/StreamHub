// actions/ingress.ts
"use server";

import { getself } from "@/lib/auth-service";
import { db } from "@/lib/db";
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  type CreateIngressOptions,
} from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (formData: FormData) => {
  const ingressType = formData.get("ingressType") as "RTMP_INPUT" | "WHIP_INPUT";

  const self = await getself();

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === "WHIP_INPUT") {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: "preset",
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    } as any;

    options.audio = {
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: "preset",
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      },
    } as any;
  }

  const type =
    ingressType === "WHIP_INPUT"
      ? IngressInput.WHIP_INPUT
      : IngressInput.RTMP_INPUT;

  const ingress = await ingressClient.createIngress(type, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress!!!");
  }

  await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      StreamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);
};

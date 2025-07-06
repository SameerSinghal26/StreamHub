import { Button } from "@/components/ui/button"
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { getself } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ConnectModel } from "./_components/connect-model";

const keysPage = async () => {
    const self = await getself();
    const stream = await getStreamByUserId(self.id);
    
    if(!stream) {
        throw new Error("Stream not found");
    }
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Keys & URLs
                </h1>
                <ConnectModel />
            </div>
            <div className="space-y-4"> 
                <UrlCard value={stream.serverUrl} />
                <KeyCard value={stream.StreamKey} />
            </div>
        </div>
    )
}

export default keysPage;
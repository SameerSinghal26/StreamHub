"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useRef, ElementRef } from "react";
import { createIngress } from "@/actions/ingress";

const RTMP = "RTMP_INPUT";
const WHIP = "WHIP_INPUT";

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModel = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="third_red">Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            try {
              await createIngress(formData);
              closeRef?.current?.click();
            } catch {
              console.error("Something went wrong");
            }
          }}
        >
          <input type="hidden" name="ingressType" value={ingressType} />

          <Select
            value={ingressType}
            onValueChange={(value) => setIngressType(value as IngressType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ingress Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RTMP}>RTMP</SelectItem>
              <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectContent>
          </Select>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning!!!</AlertTitle>
            <AlertDescription>
              This action will reset all active streams using the current connection
            </AlertDescription>
          </Alert>

          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="third_red">
              Generate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { scanReceipt } from "@/actions/createtransaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { Camera, FileInput, Loader, Loader2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

const ReceiptScanner = ({ onScanComplete }) => {
  const fileRef = useRef(null);
  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scanData,
  } = useFetch(scanReceipt);

  const handleReceiptScane = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);
  };

  useEffect(() => {
    if (scanData && !scanReceiptLoading) {
      onScanComplete(scanData);
      toast.success("Receipt scanned successfully !!");
    }
  }, [scanReceiptLoading, scanData]);

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScane(file);
        }}
      />
      <Button
        type="button"
        variant={"outline"}
        onClick={(e) => {
          fileRef.current?.click();
        }}
        disabled={scanReceiptLoading}
        className="w-full cursor-pointer h-10 bg-gradient-to-br from-[#614BFB] via-pink-500 to-[#614BFB] animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scan Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" /> <span>Scan Receipt with AI</span>{" "}
          </>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;

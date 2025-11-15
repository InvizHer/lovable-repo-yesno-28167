import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface QRCodeDownloadProps {
  url: string;
  title: string;
}

const QRCodeDownload = ({ url, title }: QRCodeDownloadProps) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPNG = () => {
    setDownloading(true);
    try {
      const svg = document.getElementById("qr-code-svg");
      if (!svg) {
        toast.error("QR Code not found");
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `complaint-box-qr-${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success("QR Code downloaded successfully");
          }
          setDownloading(false);
        });
      };

      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code");
      setDownloading(false);
    }
  };

  const handleDownloadSVG = () => {
    try {
      const svg = document.getElementById("qr-code-svg");
      if (!svg) {
        toast.error("QR Code not found");
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `complaint-box-qr-${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("QR Code downloaded successfully");
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          <CardTitle>QR Code</CardTitle>
        </div>
        <CardDescription>
          Share this QR code for easy access to the complaint box
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-6 bg-background border rounded-lg">
          <QRCodeSVG
            id="qr-code-svg"
            value={url}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="hsl(var(--foreground))"
            bgColor="hsl(var(--background))"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleDownloadPNG}
            disabled={downloading}
            className="flex-1"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
          <Button
            onClick={handleDownloadSVG}
            className="flex-1"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download SVG
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeDownload;

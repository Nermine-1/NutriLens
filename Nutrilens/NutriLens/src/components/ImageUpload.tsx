import { useState, useRef } from "react";
import { Upload, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onAnalyze, isAnalyzing }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onAnalyze(file);
    }
  };

  return (
    <Card className="p-6 md:p-8 shadow-md bg-white border">
      <div className="space-y-6">
        {preview ? (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden shadow-sm border">
              <img
                src={preview}
                alt="Meal preview"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            {!isAnalyzing && (
              <Button
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                  if (cameraInputRef.current) cameraInputRef.current.value = "";
                }}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Choose Different Image
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 md:p-16 text-center hover:border-primary/40 transition-all duration-300 bg-muted/30">
              <Upload className="w-14 h-14 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Upload a meal photo
              </h3>
              <p className="text-base text-muted-foreground mb-6 max-w-md mx-auto">
                Take a picture or select from your gallery to get instant nutritional analysis
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  size="lg"
                  className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-md text-base"
                  disabled={isAnalyzing}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  size="lg"
                  variant="outline"
                  className="text-base"
                  disabled={isAnalyzing}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-lg font-semibold">Analyzing your meal...</span>
            <p className="text-sm text-muted-foreground">This will only take a moment</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload image file"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Take photo with camera"
        />
      </div>
    </Card>
  );
};

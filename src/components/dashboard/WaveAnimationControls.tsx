import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WaveSettings {
  opacity: number;
  height: number;
  fixed: boolean;
  variant: string;
}

const WaveAnimationControls = () => {
  const [settings, setSettings] = useState<WaveSettings>({
    opacity: 100,
    height: 100,
    fixed: true,
    variant: 'random'
  });

  const handleSave = () => {
    // In a real implementation, this would save to a database or local storage
    localStorage.setItem('waveSettings', JSON.stringify(settings));
    toast.success('Wave animation settings saved!');
  };

  const handleReset = () => {
    setSettings({
      opacity: 100,
      height: 100,
      fixed: true,
      variant: 'random'
    });
    localStorage.removeItem('waveSettings');
    toast.success('Wave animation settings reset to defaults!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wave Animation Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Opacity Control */}
        <div className="space-y-2">
          <Label htmlFor="opacity">Opacity: {settings.opacity}%</Label>
          <Slider
            id="opacity"
            min={0}
            max={100}
            step={5}
            value={[settings.opacity]}
            onValueChange={(value) => setSettings(prev => ({ ...prev, opacity: value[0] }))}
            className="w-full"
          />
        </div>

        {/* Height Control */}
        <div className="space-y-2">
          <Label htmlFor="height">Height: {settings.height}%</Label>
          <Slider
            id="height"
            min={20}
            max={100}
            step={5}
            value={[settings.height]}
            onValueChange={(value) => setSettings(prev => ({ ...prev, height: value[0] }))}
            className="w-full"
          />
        </div>

        {/* Position Control */}
        <div className="flex items-center space-x-2">
          <Switch
            id="fixed"
            checked={settings.fixed}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, fixed: checked }))}
          />
          <Label htmlFor="fixed">
            {settings.fixed ? 'Fixed Position' : 'Follow Scroll'}
          </Label>
        </div>

        {/* Wave Variant */}
        <div className="space-y-2">
          <Label htmlFor="variant">Wave Style</Label>
          <Select value={settings.variant} onValueChange={(value) => setSettings(prev => ({ ...prev, variant: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select wave style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random">Random</SelectItem>
              <SelectItem value="purple">Purple/Teal</SelectItem>
              <SelectItem value="blue">Blue/Teal</SelectItem>
              <SelectItem value="red">Red/Orange</SelectItem>
              <SelectItem value="silver">Purple/Silver</SelectItem>
              <SelectItem value="default">Default</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Save Settings
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset to Default
          </Button>
        </div>

        {/* Preview Info */}
        <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
          <p className="font-medium mb-1">Current Settings:</p>
          <p>Opacity: {settings.opacity}%</p>
          <p>Height: {settings.height}%</p>
          <p>Position: {settings.fixed ? 'Fixed' : 'Scrollable'}</p>
          <p>Style: {settings.variant}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveAnimationControls;
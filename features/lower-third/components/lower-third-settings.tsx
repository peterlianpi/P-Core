"use client";

import { TextSettings } from "@/features/lower-third/lib/type";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LowerThirdSettingsProps {
  settings: TextSettings;
  setSettings: (settings: TextSettings) => void;
}

export default function LowerThirdSettings({
  settings,
  setSettings,
}: LowerThirdSettingsProps) {
  return (
    <Card className="max-w-3xl mx-auto mt-4">
      <h1 className="flex justify-center text-center items-center font-semibold sm:text-xl p-2 text-3xl">
        Lower Third Settings
      </h1>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
        <div className="flex flex-col gap-1">
          <Label>Font Size</Label>
          <Input
            value={settings.fontSize}
            onChange={(e) =>
              setSettings({ ...settings, fontSize: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Font Weight</Label>
          <Input
            value={settings.fontWeight}
            onChange={(e) =>
              setSettings({ ...settings, fontWeight: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Text Color</Label>
          <Input
            type="color"
            value={settings.color}
            onChange={(e) =>
              setSettings({ ...settings, color: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Background Color</Label>
          <Input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              setSettings({ ...settings, backgroundColor: e.target.value })
            }
            disabled={settings.backgroundTransparent}
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center gap-2">
          <Switch
            checked={settings.backgroundTransparent}
            onCheckedChange={(val) =>
              setSettings({ ...settings, backgroundTransparent: val })
            }
          />
          <Label>Transparent Background</Label>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Text Transform</Label>
          <Select
            value={settings.textTransform}
            onValueChange={(val) =>
              setSettings({
                ...settings,
                textTransform: val as TextSettings["textTransform"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Box Width</Label>
          <Input
            value={settings.width}
            onChange={(e) =>
              setSettings({ ...settings, width: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Box Height</Label>
          <Input
            value={settings.height}
            onChange={(e) =>
              setSettings({ ...settings, height: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Box Position</Label>
          <Select
            value={settings.position}
            onValueChange={(val) => setSettings({ ...settings, position: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>IP Address</Label>
          <Input
            value={settings.IPAddress}
            onChange={(e) =>
              setSettings({ ...settings, IPAddress: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Port</Label>
          <Input
            type="number"
            value={settings.IPPort}
            onChange={(e) =>
              setSettings({ ...settings, IPPort: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input
            type="password"
            value={settings.Password}
            onChange={(e) =>
              setSettings({ ...settings, Password: e.target.value })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

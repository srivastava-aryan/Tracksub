import { useState, useEffect } from "react";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { useReminders } from "@/context/ReminderContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BellOff,
  Calendar,
  Mail,
  MessageSquare,
  Clock,
  Loader2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reminders = () => {
  const { subscriptions } = useSubscriptions();
  const { settings: savedSettings, updateSettings, loading } = useReminders();
  const [settings, setSettings] = useState(savedSettings);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Sync with context when loaded
  useEffect(() => {
    setSettings(savedSettings);
  }, [savedSettings]);

  // Request push notification permission
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setSettings({ ...settings, pushNotifications: true });
        new Notification("Reminders Enabled!", {
          body: "You'll now receive push notifications for upcoming renewals.",
          icon: "/logo.png",
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        });
      }
    }
  };

  const handleToggle = (key) => {
    if (key === "pushNotifications" && !settings.pushNotifications) {
      requestNotificationPermission();
    } else {
      setSettings({ ...settings, [key]: !settings[key] });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(settings);
      toast({
        title: "Settings Saved",
        description: "Your reminder preferences have been updated.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Get upcoming renewals
  const upcomingRenewals = subscriptions
    .map((sub) => ({
      ...sub,
      daysUntilRenewal: Math.ceil(
        (new Date(sub.nextBillingDate) - new Date()) / (1000 * 60 * 60 * 24)
      ),
    }))
    .filter((sub) => sub.daysUntilRenewal >= 0 && sub.daysUntilRenewal <= 30)
    .sort((a, b) => a.daysUntilRenewal - b.daysUntilRenewal);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reminders & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Manage how you receive subscription renewal alerts
          </p>
        </div>
        <Badge variant="outline" className="flex gap-2 px-3 py-1">
          <Bell className="size-4" />
          {upcomingRenewals.length} Upcoming
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="size-5" />
              Notification Channels
            </CardTitle>
            <CardDescription>
              Choose how you want to receive renewal reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push" className="text-base font-medium">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive browser notifications
                </p>
              </div>
              <Switch
                id="push"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>

            <Separator />

            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email" className="text-base font-medium">
                  <Mail className="inline size-4 mr-2" />
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get email reminders before renewals
                </p>
              </div>
              <Switch
                id="email"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <Separator />

            {/* SMS Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms" className="text-base font-medium">
                  <MessageSquare className="inline size-4 mr-2" />
                  SMS Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Text message alerts (Premium)
                </p>
              </div>
              <Switch
                id="sms"
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Reminder Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Reminder Preferences
            </CardTitle>
            <CardDescription>
              Customize when and what reminders you receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reminder Days */}
            <div className="space-y-2">
              <Label htmlFor="days" className="text-base font-medium">
                Remind me before renewal
              </Label>
              <Select
                value={settings.reminderDays}
                onValueChange={(value) =>
                  setSettings({ ...settings, reminderDays: value })
                }
              >
                <SelectTrigger id="days">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day before</SelectItem>
                  <SelectItem value="3">3 days before</SelectItem>
                  <SelectItem value="7">1 week before</SelectItem>
                  <SelectItem value="14">2 weeks before</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Auto-Renew Warning */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autorenew" className="text-base font-medium">
                  Auto-Renew Warnings
                </Label>
                <p className="text-sm text-muted-foreground">
                  Alert for automatic renewals
                </p>
              </div>
              <Switch
                id="autorenew"
                checked={settings.autoRenewWarning}
                onCheckedChange={() => handleToggle("autoRenewWarning")}
              />
            </div>

            <Separator />

            {/* Price Change Alert */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pricechange" className="text-base font-medium">
                  Price Change Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notify when subscription prices change
                </p>
              </div>
              <Switch
                id="pricechange"
                checked={settings.priceChangeAlert}
                onCheckedChange={() => handleToggle("priceChangeAlert")}
              />
            </div>

            <Separator />

            {/* Weekly Digest */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="digest" className="text-base font-medium">
                  Weekly Digest
                </Label>
                <p className="text-sm text-muted-foreground">
                  Summary email every Monday
                </p>
              </div>
              <Switch
                id="digest"
                checked={settings.weeklyDigest}
                onCheckedChange={() => handleToggle("weeklyDigest")}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Renewals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Upcoming Renewals (Next 30 Days)
          </CardTitle>
          <CardDescription>
            Subscriptions that will renew soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingRenewals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BellOff className="size-12 mx-auto mb-3 opacity-50" />
              <p>No upcoming renewals in the next 30 days</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingRenewals.map((sub) => (
                <div
                  key={sub._id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{sub.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(sub.nextBillingDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-lg">${sub.price}</p>
                      <Badge
                        variant={
                          sub.daysUntilRenewal <= 3
                            ? "destructive"
                            : sub.daysUntilRenewal <= 7
                            ? "default"
                            : "secondary"
                        }
                      >
                        {sub.daysUntilRenewal === 0
                          ? "Today"
                          : sub.daysUntilRenewal === 1
                          ? "Tomorrow"
                          : `${sub.daysUntilRenewal} days`}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Reminders;
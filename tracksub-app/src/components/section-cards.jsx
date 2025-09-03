import { CalendarIcon, DollarSignIcon, PackageIcon, TrendingUpIcon } from "lucide-react"
import { useSubscriptions } from "@/context/SubscriptionContext"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const { subscriptions } = useSubscriptions();

  // Calculate total monthly cost
  const totalMonthlyCost = subscriptions.reduce((total, sub) => total + sub.price, 0);

  // Get most expensive subscription
  const mostExpensive = subscriptions.reduce((max, sub) => 
    sub.price > (max?.price || 0) ? sub : max, null);

  // Calculate upcoming renewals (next 7 days)
  const upcomingRenewals = subscriptions.filter(sub => {
    const renewalDate = new Date(sub.renewalDate);
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    return renewalDate <= sevenDaysFromNow;
  });

  return (
    <div
      className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Monthly Cost</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ${totalMonthlyCost.toFixed(2)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <DollarSignIcon className="size-3" />
              Monthly
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total Active Subscriptions
          </div>
          <div className="text-muted-foreground">
            Across {subscriptions.length} services
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active Subscriptions</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {subscriptions.length}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <PackageIcon className="size-3" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Currently Active Services
          </div>
          <div className="text-muted-foreground">
            Managing your subscriptions
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Most Expensive</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ${mostExpensive?.price.toFixed(2) || '0.00'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Highest
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {mostExpensive?.name || 'No subscriptions'}
          </div>
          <div className="text-muted-foreground">
            Highest monthly payment
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Upcoming Renewals</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {upcomingRenewals.length}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <CalendarIcon className="size-3" />
              Next 7d
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Due in the next week
          </div>
          <div className="text-muted-foreground">
            Upcoming subscription renewals
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

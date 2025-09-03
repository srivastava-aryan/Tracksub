import { MailIcon, PlusCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSubscriptions } from "@/context/SubscriptionContext";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { exportSubscriptionsToCSV } from "@/utils/exportCSV";

export function NavMain({
  items
}) {
  const { subscriptions } = useSubscriptions();
  
  const handleExport = () => {
    exportSubscriptionsToCSV(subscriptions);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Link to="/add">
              <SidebarMenuButton
                tooltip="Add Subscription"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground">
                <PlusCircleIcon />
                <span>Add Subscription</span>
              </SidebarMenuButton>
            </Link>
            <Button
              onClick={handleExport}
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              title="Export Subscriptions">
              <MailIcon />
              <span className="sr-only">Export Subscriptions</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link to={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

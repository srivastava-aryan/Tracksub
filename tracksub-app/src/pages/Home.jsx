import { useSubscriptions } from "../context/SubscriptionContext";
import { getTotalCost } from "../utils/subscriptionUtils";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "../components/ui/drawer";

const Home = () => {
  const { subscriptions } = useSubscriptions();
  const totalCost = getTotalCost(subscriptions);

  return (
  <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background text-foreground transition-colors">
      <h1 className="text-5xl font-bold mb-5">Welcome to SubTrack.</h1>
  <p className="text-lg max-w-2xl text-muted-foreground mb-6 ">
        SubTrack is your personal subscription manager that helps you keep track
        of all your recurring expenses in one place. Easily add your subscriptions,
        categorize them with tags, filter by services, and calculate your total
        monthly spending. Stay organized and never lose track of where your money goes!
      </p>
      {/* <img
        src=""
        alt="Subscriptions illustration"
        className="w-64 h-64 opacity-90"
      /> */}
      <Drawer>
        <DrawerTrigger asChild>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">Pay Now</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Complete Your Payment!</DrawerTitle>
            <DrawerDescription> Review your subscription details before making payment.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">Your Total is ${totalCost.toFixed(2)}.</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="bg-muted text-muted-foreground px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors">Close</button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default Home;
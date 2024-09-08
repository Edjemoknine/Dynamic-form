import { LoginForm } from "./components/shared/Form";
import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const App = () => {
  return (
    <Tabs defaultValue="shadcn" className="">
      <TabsList>
        <TabsTrigger value="shadcn">Shadcn Form</TabsTrigger>
        <TabsTrigger value="custom">Custom Form</TabsTrigger>
      </TabsList>
      <TabsContent value="shadcn">
        <LoginForm />
      </TabsContent>
      <TabsContent value="custom">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default App;

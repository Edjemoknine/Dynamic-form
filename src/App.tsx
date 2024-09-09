import { LoginForm } from "./components/shared/Form";
import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UseFormArray from "./components/shared/UseFormArray";

const App = () => {
  return (
    <Tabs defaultValue="shadcn" className="">
      <TabsList>
        <TabsTrigger value="shadcn">Shadcn Form</TabsTrigger>
        {/* <TabsTrigger value="custom">Custom Form</TabsTrigger> */}
        <TabsTrigger value="dynamic">Dynamic Form</TabsTrigger>
      </TabsList>
      <TabsContent value="shadcn">
        <LoginForm />
      </TabsContent>
      {/* <TabsContent value="custom">
        <CustomForm />
      </TabsContent> */}
      <TabsContent value="dynamic">
        <UseFormArray />
        {/* <DynamicForm /> */}
      </TabsContent>
    </Tabs>
  );
};

export default App;

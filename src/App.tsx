import { LoginForm } from "./components/shared/Form";
import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UseFormArray from "./components/shared/UseFormArray";
import DynamicForm from "./components/shared/DynamicForm";
import ComplexForm from "./components/shared/ComplexForm";

const App = () => {
  return (
    <Tabs defaultValue="shadcn" className="">
      <TabsList>
        <TabsTrigger value="shadcn">Shadcn Form</TabsTrigger>
        <TabsTrigger value="custom">Custom Form</TabsTrigger>
        <TabsTrigger value="dynamic">Dynamic Form</TabsTrigger>
        <TabsTrigger value="complex">Complex Form</TabsTrigger>
      </TabsList>
      <TabsContent value="shadcn">
        <LoginForm />
      </TabsContent>
      <TabsContent value="custom">
        {/* <CustomForm /> */}
        <DynamicForm />
      </TabsContent>
      <TabsContent value="dynamic">
        <UseFormArray />
      </TabsContent>
      <TabsContent value="complex">
        <ComplexForm />
      </TabsContent>
    </Tabs>
  );
};

export default App;

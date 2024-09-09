/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const FormSchemaWithoutMidName = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  hasMidname: z.literal(false),
  email: z.string().email().min(2, {
    message: "Email is required.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  }),
  date: z.date({
    message: "date must be at least 8 characters.",
  }),
  gender: z.string({
    message: "gender must be at least 8 characters.",
  }),
});
const FormSchemaWithMidName = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  middleName: z.string().min(2, {
    message: "middlename must be at least 2 characters.",
  }),
  hasMidname: z.literal(true),
  email: z.string().email().min(2, {
    message: "Email is required.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  }),
  date: z.date({
    message: "date must be at least 8 characters.",
  }),
  gender: z.string({
    message: "gender must be at least 8 characters.",
  }),
});

const FormSchema = z.discriminatedUnion("hasMidname", [
  FormSchemaWithoutMidName,
  FormSchemaWithMidName,
]);

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      date: new Date(Date.now()),
      gender: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const hasAnMiddleName = form.watch("hasMidname");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 border rounded-lg p-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="moknine" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <label htmlFor="has" className="text-sm font-medium mr-3">
            Do you has middle name ?
          </label>
          <input type="checkbox" id="has" {...form.register("hasMidname")} />
        </div>
        {hasAnMiddleName && (
          // <>
          //   <Input
          //     placeholder="Edj"
          //     {...form.register("middleName", { shouldUnregister: true })}
          //   />
          // </>
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MiddleName</FormLabel>
                <FormControl>
                  <Input placeholder="Edj" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="moknineelhadj@oulook.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value as any}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>

      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
    </Form>
  );
}

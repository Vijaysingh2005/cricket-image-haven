
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QrCode, At, Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface UPIPaymentProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const formSchema = z.object({
  upiMethod: z.enum(["id", "qr"]),
  upiId: z.string().optional(),
});

const UPIPayment = ({ onSubmit, isProcessing }: UPIPaymentProps) => {
  const [upiMethod, setUpiMethod] = useState<"id" | "qr">("id");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiMethod: "id",
      upiId: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="upiMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose UPI Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: "id" | "qr") => {
                    field.onChange(value);
                    setUpiMethod(value);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="id" id="upi-id" />
                    <label htmlFor="upi-id" className="cursor-pointer flex items-center">
                      <At className="mr-2 h-4 w-4" />
                      <span>Pay via UPI ID</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="qr" id="upi-qr" />
                    <label htmlFor="upi-qr" className="cursor-pointer flex items-center">
                      <QrCode className="mr-2 h-4 w-4" />
                      <span>Scan QR Code</span>
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {upiMethod === "id" && (
          <FormField
            control={form.control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="yourname@upi"
                      {...field}
                      className="pl-10"
                    />
                    <At className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {upiMethod === "qr" && (
          <div className="flex flex-col items-center justify-center p-6 border rounded-md">
            <div className="bg-gray-200 p-1 rounded mb-4">
              <QrCode className="w-48 h-48" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Open your UPI app and scan this QR code to pay
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Pay via UPI"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UPIPayment;

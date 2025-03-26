
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Home, User, Copy, Clock, Calendar, IndianRupee, FileText } from 'lucide-react';
import { Loader2 } from '@/components/ui/custom-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';

interface PaymentSuccessProps {
  transactionId: string;
  navigate: (path: string) => void;
}

const PaymentSuccess = ({ transactionId, navigate }: PaymentSuccessProps) => {
  const [activeTab, setActiveTab] = useState("receipt");
  const [isDownloading, setIsDownloading] = useState(false);
  
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCopyTransactionId = () => {
    navigator.clipboard.writeText(transactionId);
    toast.success("Transaction ID copied to clipboard");
  };
  
  const handleDownloadReceipt = () => {
    setIsDownloading(true);
    
    // Create PDF document
    setTimeout(() => {
      try {
        const doc = new jsPDF();
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        
        // Add logo/header
        doc.setFontSize(22);
        doc.setTextColor(39, 174, 96);
        doc.text("ImageStock", 105, 20, { align: "center" });
        
        // Add receipt title
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text("Payment Receipt", 105, 35, { align: "center" });
        
        // Add horizontal line
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 40, 190, 40);
        
        // Add transaction details
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        
        // Left side information
        doc.text("Receipt Information:", 20, 55);
        doc.text(`Date: ${date}`, 20, 65);
        doc.text(`Time: ${time}`, 20, 75);
        doc.text(`Transaction ID: ${transactionId}`, 20, 85);
        doc.text("Payment Method: Card Payment", 20, 95);
        
        // Add horizontal line
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 105, 190, 105);
        
        // Add payment information
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Payment Details", 20, 120);
        
        // Get purchased items from localStorage
        const purchasedItems = JSON.parse(localStorage.getItem('purchasedImages') || '[]');
        const recentItems = purchasedItems.slice(-3); // Get last 3 purchased items
        
        let yPosition = 130;
        let total = 0;
        
        if (recentItems.length > 0) {
          // Add table headers
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text("Item", 20, yPosition);
          doc.text("Price (₹)", 150, yPosition);
          yPosition += 5;
          
          // Add horizontal line
          doc.setDrawColor(220, 220, 220);
          doc.line(20, yPosition, 190, yPosition);
          yPosition += 10;
          
          // Add items
          doc.setTextColor(0, 0, 0);
          recentItems.forEach((item: any) => {
            const price = (item.price * 83.5);
            total += price;
            
            // Truncate title if too long
            let title = item.title;
            if (title.length > 35) {
              title = title.substring(0, 32) + "...";
            }
            
            doc.text(title, 20, yPosition);
            doc.text(price.toFixed(2), 150, yPosition);
            yPosition += 10;
          });
        } else {
          doc.text("No items found", 20, yPosition);
          yPosition += 10;
        }
        
        // Add horizontal line
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 10;
        
        // Add total
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Total Amount:", 110, yPosition);
        doc.setFontSize(12);
        doc.setTextColor(39, 174, 96);
        doc.text(`₹${total.toFixed(2)}`, 150, yPosition);
        
        // Add footer
        yPosition = 250;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Thank you for your purchase!", 105, yPosition, { align: "center" });
        doc.text("For any queries, please contact support@imagestock.com", 105, yPosition + 10, { align: "center" });
        
        // Save the PDF
        doc.save(`Receipt_${transactionId}.pdf`);
        
        setIsDownloading(false);
        toast.success("Receipt downloaded successfully");
      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsDownloading(false);
        toast.error("Failed to download receipt");
      }
    }, 1000);
  };
  
  const handleDownloadImages = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("Images are ready to download");
      navigate('/account?tab=images');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-green-200 dark:border-green-800">
          <CardHeader className="pb-6">
            <div className="w-full flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-green-800 dark:text-green-400">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-center pt-2">
              Your transaction was completed successfully
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="receipt" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="receipt">Receipt</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="receipt" className="pt-4">
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Transaction ID:</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{transactionId}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={handleCopyTransactionId}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Date:</span>
                    </div>
                    <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Time:</span>
                    </div>
                    <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Payment Method:</span>
                    </div>
                    <span className="text-sm font-medium">Card Payment</span>
                  </div>
                </div>
                
                <p className="text-center text-sm text-muted-foreground pt-2">
                  We've sent a confirmation email with order details and download links to your registered email address.
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={handleDownloadReceipt}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Download PDF Receipt
                    </>
                  )}
                </Button>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="downloads" className="pt-4">
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-300">Your Purchased Items</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
                    All your purchased images are now available for download in your account.
                  </p>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleDownloadImages}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Files...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download All Images
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you encounter any issues with your downloads or purchase, our support team is ready to help.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/contact')}>
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex flex-col space-y-3 pt-4">
            <Button 
              className="w-full"
              onClick={() => navigate('/account')}
            >
              <User className="mr-2 h-4 w-4" />
              View in My Account
            </Button>
            <div className="flex w-full gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/explore')}
              >
                <Download className="mr-2 h-4 w-4" />
                Explore More
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

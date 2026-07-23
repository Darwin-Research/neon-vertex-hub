import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import UnderConstruction from "./pages/UnderConstruction";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPress from "./pages/admin/AdminPress";
import AdminIR from "./pages/admin/AdminIR";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<UnderConstruction />} />
          <Route path="/history" element={<UnderConstruction />} />
          <Route path="/leadership" element={<UnderConstruction />} />
          <Route path="/portfolio" element={<UnderConstruction />} />
          <Route path="/notice" element={<UnderConstruction />} />
          <Route path="/ir" element={<UnderConstruction />} />
          <Route path="/press" element={<UnderConstruction />} />
          <Route path="/:category/:id" element={<UnderConstruction />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/directions" element={<UnderConstruction />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/press" element={<AdminPress />} />
          <Route path="/admin/ir" element={<AdminIR />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

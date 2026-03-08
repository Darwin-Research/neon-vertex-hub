import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import History from "./pages/History";
import Leadership from "./pages/Leadership";
import Portfolio from "./pages/Portfolio";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Directions from "./pages/Directions";
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
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/notice" element={<BoardList category="notice" />} />
          <Route path="/notice/:id" element={<BoardDetail />} />
          <Route path="/ir" element={<BoardList category="ir" />} />
          <Route path="/ir/:id" element={<BoardDetail />} />
          <Route path="/press" element={<BoardList category="press" />} />
          <Route path="/press/:id" element={<BoardDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

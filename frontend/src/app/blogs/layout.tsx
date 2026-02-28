import SideBar from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

interface BlogsProps {
  children: ReactNode;
}

const HomeLayout: React.FC<BlogsProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <SideBar />
      <SidebarInset>
        <div className="w-full min-h-[calc(100vh-80px)] px-4 pb-16 pt-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default HomeLayout;

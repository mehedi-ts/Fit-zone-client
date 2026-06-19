"use client";

import { Drawer, Button } from "@heroui/react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardDrawer() {
  return (
    <Drawer>
      <Button isIconOnly variant="light" className="text-[#111827]">
        <Menu size={22} />
      </Button>

      <Drawer.Backdrop />

      <Drawer.Content placement="left" className="max-w-[320px] p-0">
        <Drawer.Dialog className="h-full">
          <Sidebar />
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer>
  );
}

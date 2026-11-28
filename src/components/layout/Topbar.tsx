"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
    const pathname = usePathname();
    const menuMap: Record<string, string> = {};
    const title = menuMap[pathname] || "SMK TELEKOMUNIKASI TUNAS HARAPAN";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <span className="font-semibold text-sm sm:text-base tracking-wide">
                        {title}
                    </span>
                </div>
            </div>
        </header>
    );
}
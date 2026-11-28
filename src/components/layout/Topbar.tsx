"use client"

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const menuMap: Record<string, string> = {};

    const title = menuMap[pathname] || "SMK TELEKOMUNIKASI TUNAS HARAPAN";

    return(
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
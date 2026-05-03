"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  username?: string
  className?: string
  fallbackClassName?: string
}

export function UserAvatar({ username, className, fallbackClassName }: UserAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!username) {
        setAvatarUrl(null)
        setIsLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/user/avatar?username=${encodeURIComponent(username)}`)
        
        if (!res.ok) {
          setAvatarUrl(null)
          return
        }

        const contentType = res.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json()
          if (data.avatar_url) {
            setAvatarUrl(data.avatar_url)
          } else {
            setAvatarUrl(null)
          }
        } else {
          setAvatarUrl(null)
        }
      } catch (error) {
        console.error("Avatar fetch error:", error)
        setAvatarUrl(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvatar()
    
    // Listen for avatar updates
    const handleAvatarUpdate = (e: any) => {
      if (e.detail?.username === username) {
        setAvatarUrl(e.detail.avatarUrl)
      }
    }
    window.addEventListener('avatar-updated', handleAvatarUpdate)
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate)
  }, [username])

  return (
    <Avatar className={cn("border border-white/10", className)}>
      <AvatarImage src={avatarUrl || ""} className="object-cover" />
      <AvatarFallback className={cn("bg-slate-800", fallbackClassName)}>
        <User className="w-1/2 h-1/2 text-slate-400" />
      </AvatarFallback>
    </Avatar>
  )
}

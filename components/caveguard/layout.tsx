"use client"

import { useState } from "react"
import { CaveGuardSidebar } from "./sidebar"
import { DashboardContent } from "./sections/dashboard"
import { ShipmentsContent } from "./sections/shipments"
import { RobotsContent } from "./sections/robots"
import { AnalyticsContent } from "./sections/analytics"
import { SettingsContent } from "./sections/settings"

export function CaveGuardLayout() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "shipments":
        return <ShipmentsContent />
      case "robots":
        return <RobotsContent />
      case "analytics":
        return <AnalyticsContent />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden topo-pattern">
      <CaveGuardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="grid-overlay min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

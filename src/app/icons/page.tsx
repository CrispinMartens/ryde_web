import Navbar from "@/components/Navbar";
import {
  LayoutDashboard,
  Building2,
  User,
  SendHorizontal,
  Settings,
  FileCheck,
  Gauge,
  ShieldAlert,
  FileSearch,
  Home,
  ArrowLeftRight,
  Palette,
  Code,
  PanelLeftClose,
  CheckCircle,
  XCircle,
  Eye,
  DoorClosed,
  Globe,
  ExternalLink,
  Network,
  type LucideIcon,
} from "lucide-react";

const iconItems: { label: string; icon: LucideIcon }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Entities", icon: Building2 },
  { label: "Individuals", icon: User },
  { label: "Applications", icon: SendHorizontal },
  { label: "Configure", icon: Settings },
  { label: "KYC Workflows", icon: FileCheck },
  { label: "Risk Scoring", icon: Gauge },
  { label: "Risk Monitoring", icon: ShieldAlert },
  { label: "ODD", icon: FileSearch },
  { label: "Properties", icon: Home },
  { label: "Transactions", icon: ArrowLeftRight },
  { label: "Themes", icon: Palette },
  { label: "Developer Tools", icon: Code },
  { label: "Collapse Menu", icon: PanelLeftClose },
  { label: "Pass", icon: CheckCircle },
  { label: "Fail", icon: XCircle },
  { label: "Eye", icon: Eye },
  { label: "Closure Screen", icon: DoorClosed },
  { label: "External Service Provider", icon: Globe },
  { label: "External Service Provider (alt 1)", icon: ExternalLink },
  { label: "External Service Provider (alt 2)", icon: Network },
];

export default function IconsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Icons</h1>
        <p className="text-muted-foreground mb-12">
          Navigation and feature icons used across the platform.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {iconItems.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card text-card-foreground hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <span className="text-sm font-medium text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

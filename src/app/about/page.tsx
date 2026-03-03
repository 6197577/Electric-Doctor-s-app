
import { Zap, ShieldCheck, Cpu, Heart, Users, Globe, Building2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-24 py-12 pb-24">
      {/* Brand Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <Badge variant="outline" className="border-primary text-primary px-4 py-1 uppercase tracking-widest text-[10px] font-black">Our Mission</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
            Eliminating Electrical Fires Through <span className="text-primary italic">AI Innovation.</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            Founded by a team of Master Electricians and AI Engineers, Electric Doctor's is the world's first platform dedicated to predicting electrical failure before it becomes a catastrophe.
          </p>
        </div>
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 orange-glow">
          <Image 
            src="https://picsum.photos/seed/about_elec/1200/800" 
            alt="The Team" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            data-ai-hint="electrician team"
          />
        </div>
      </section>

      {/* Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: "Safety First", desc: "Every line of code we write and every pro we verify is focused on one goal: keeping your property and family safe from electrical hazards." },
          { icon: Cpu, title: "AI-Powered", desc: "We use edge-computing and advanced acoustic analysis to detect the 'sound' of arcing wires—something the human ear can rarely catch." },
          { icon: Users, title: "Pro Network", desc: "We don't just match you with any electrician. We match you with masters who are trained to use our diagnostic data for surgical precision." }
        ].map((v, i) => (
          <Card key={i} className="bg-card/50 border-white/5 p-4 group hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black italic tracking-tight">{v.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed font-medium">{v.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Story Content */}
      <section className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase">The Story Behind Dr. Electric</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            In 2024, our founders noticed a recurring pattern in emergency calls: most homeowners reported hearing a "strange buzzing" or seeing "flickering lights" months before a fire occurred. The warning signs were there, but the tools to evaluate them weren't accessible.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We built Electric Doctor's to bridge that gap. By combining the mobile camera and microphone with a specialized AI model, we gave homeowners the ability to run a "Check Engine Light" for their entire house.
          </p>
        </div>
        
        <div className="p-12 bg-primary text-black rounded-[3rem] text-center space-y-6">
          <h3 className="text-3xl font-black italic">"We don't just fix problems; we prevent tragedies."</h3>
          <p className="font-bold opacity-80 uppercase tracking-widest text-xs">— Marcus Chen, Founder & Master Electrician</p>
        </div>
      </section>

      {/* Global Impact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-white/5 pt-24">
        <div className="space-y-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Our Scale</h2>
          <p className="text-muted-foreground leading-relaxed font-medium">
            From single-family homes in New York to massive industrial facilities in California, our AI monitors over 1.2GW of combined power demand every single day.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-bold">1</div>
              <p className="text-sm font-bold text-foreground">Multi-region redundancy across the United States.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-bold">2</div>
              <p className="text-sm font-bold text-foreground">Deep compliance with NEC 2023 and NFPA 70E standards.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-8 rounded-3xl bg-muted/20 border border-white/5 flex flex-col items-center justify-center gap-2">
            <Building2 className="w-8 h-8 text-primary opacity-20" />
            <span className="text-3xl font-black tracking-tighter">15k+</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground text-center leading-tight">Facilities<br/>Monitored</span>
          </div>
          <div className="p-8 rounded-3xl bg-muted/20 border border-white/5 flex flex-col items-center justify-center gap-2">
            <Globe className="w-8 h-8 text-primary opacity-20" />
            <span className="text-3xl font-black tracking-tighter">50</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground text-center leading-tight">Major Cities<br/>Served</span>
          </div>
        </div>
      </section>
    </div>
  )
}

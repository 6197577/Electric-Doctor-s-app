"use client"

import { useState, useEffect } from "react"
import { ClipboardList, Plus, History, Settings, Zap, Trash2, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

// Mock data for initial state
const INITIAL_LOGS = [
  { id: "1", date: "2024-02-15", serviceType: "Oil Change", hoursRun: 124, performedBy: "Self", notes: "Used 5W-30 Synthetic. Filter replaced." },
  { id: "2", date: "2023-11-20", serviceType: "Battery Check", hoursRun: 118, performedBy: "Self", notes: "Voltage test passed. Terminals cleaned." }
]

export default function GeneratorLogsPage() {
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    date: "", // Initialized empty for hydration safety
    serviceType: "General Inspection",
    hoursRun: "",
    performedBy: "",
    notes: ""
  })
  const { toast } = useToast()

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: format(new Date(), 'yyyy-MM-dd')
    }))
  }, [])

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault()
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      hoursRun: Number(formData.hoursRun)
    }
    setLogs([newLog, ...logs])
    setIsAdding(false)
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      serviceType: "General Inspection",
      hoursRun: "",
      performedBy: "",
      notes: ""
    })
    toast({ title: "Log Entry Saved", description: "Maintenance record has been added successfully." })
  }

  const deleteLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id))
    toast({ title: "Log Deleted", variant: "destructive" })
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Generator Logbook</h1>
          <p className="text-muted-foreground">Keep your backup power reliable with a digital maintenance history.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="font-bold">
          {isAdding ? "Cancel" : "Add Log Entry"}
          {!isAdding && <Plus className="ml-2 w-4 h-4" />}
        </Button>
      </div>

      {isAdding && (
        <Card className="border-primary/20 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAddLog}>
            <CardHeader>
              <CardTitle>New Maintenance Entry</CardTitle>
              <CardDescription>Enter details about the work performed on your generator.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date of Service</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Service Type</Label>
                <Select value={formData.serviceType} onValueChange={v => setFormData({...formData, serviceType: v})}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oil Change">Oil Change</SelectItem>
                    <SelectItem value="Filter Replacement">Filter Replacement</SelectItem>
                    <SelectItem value="Battery Check">Battery Check</SelectItem>
                    <SelectItem value="Spark Plug Service">Spark Plug Service</SelectItem>
                    <SelectItem value="General Inspection">General Inspection</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Engine Hours</Label>
                <Input 
                  id="hours" 
                  type="number" 
                  placeholder="e.g. 145" 
                  value={formData.hoursRun} 
                  onChange={e => setFormData({...formData, hoursRun: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="by">Performed By</Label>
                <Input 
                  id="by" 
                  placeholder="e.g. Self or Company Name" 
                  value={formData.performedBy} 
                  onChange={e => setFormData({...formData, performedBy: e.target.value})} 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Detail what was done, parts used, or future observations..." 
                  value={formData.notes} 
                  onChange={e => setFormData({...formData, notes: e.target.value})} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full font-bold">Save Log Entry</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {logs.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
            <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No maintenance logs found. Start by adding your first entry.</p>
          </div>
        ) : (
          logs.map((log) => (
            <Card key={log.id} className="hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {log.serviceType}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {format(new Date(log.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-1 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {log.hoursRun} Hours
                  </CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteLog(log.id)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{log.notes}</p>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>Performed by: <span className="text-foreground font-bold">{log.performedBy || "N/A"}</span></span>
                  <span className="text-primary font-bold">Log ID: #{log.id}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

'use client';

import { useState, useEffect } from "react"
import { ClipboardList, Plus, History, Settings, Zap, Trash2, Calendar, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import Image from "next/image"
import { collection, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'

export default function GeneratorLogsPage() {
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    serviceType: "General Inspection",
    hoursRun: "",
    performedBy: "",
    notes: ""
  })

  // Real-time Firestore Query
  const logsQuery = user && db ? query(
    collection(db, 'users', user.uid, 'generatorLogs'),
    orderBy('date', 'desc')
  ) : null;

  const { data: logs, loading } = useCollection(logsQuery);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !db) {
      toast({ title: "Auth Required", description: "Please sign in to save logs.", variant: "destructive" })
      return
    }

    const logData = {
      ...formData,
      hoursRun: Number(formData.hoursRun),
      createdAt: serverTimestamp(),
    }

    const colRef = collection(db, 'users', user.uid, 'generatorLogs')
    
    // Non-blocking mutation with rich error handling
    addDoc(colRef, logData)
      .then(() => {
        setIsAdding(false)
        setFormData({
          date: format(new Date(), 'yyyy-MM-dd'),
          serviceType: "General Inspection",
          hoursRun: "",
          performedBy: "",
          notes: ""
        })
        toast({ title: "Log Entry Saved", description: "Maintenance record added to cloud." })
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: logData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
  }

  const handleDelete = (logId: string) => {
    if (!user || !db) return
    const docRef = doc(db, 'users', user.uid, 'generatorLogs', logId)
    
    deleteDoc(docRef)
      .then(() => toast({ title: "Log Deleted", variant: "destructive" }))
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      })
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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {!logs || logs.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed flex flex-col items-center justify-center gap-6">
              <div className="relative w-48 h-32 opacity-20 grayscale">
                <Image 
                  src="https://picsum.photos/seed/elec_hd3/400/300" 
                  alt="Empty logs" 
                  fill 
                  className="object-cover rounded-xl"
                  data-ai-hint="industrial motor"
                />
              </div>
              <div className="space-y-2">
                <ClipboardList className="w-10 h-10 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground font-medium">No maintenance logs found. Start by adding your first entry.</p>
              </div>
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
                        <Calendar className="w-3 h-3" /> {log.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg mt-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {log.hoursRun} Hours
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(log.id)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{log.notes}</p>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Performed by: <span className="text-foreground font-bold">{log.performedBy || "N/A"}</span></span>
                    <span className="text-primary font-bold">Log ID: #{log.id.slice(0, 6)}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}


'use client';

import { useState } from "react"
import { ClipboardList, Plus, History, Settings, Zap, Trash2, Calendar, Clock, Loader2, Building2 } from "lucide-react"
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
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import Link from "next/link"

export default function GeneratorLogsPage() {
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  
  const [isAdding, setIsAdding] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    serviceType: "General Inspection",
    hoursRun: "",
    performedBy: "",
    notes: ""
  })

  const propsQuery = useMemoFirebase(() => {
    if (!user || !db) return null
    return query(collection(db, 'users', user.uid, 'properties'))
  }, [user, db])

  const { data: properties, loading: propsLoading } = useCollection(propsQuery)

  const logsQuery = useMemoFirebase(() => {
    if (!user || !db || !selectedPropertyId) return null
    return query(
      collection(db, 'users', user.uid, 'properties', selectedPropertyId, 'generatorLogs'),
      orderBy('date', 'desc')
    )
  }, [user, db, selectedPropertyId])

  const { data: logs, loading } = useCollection(logsQuery);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !db || !selectedPropertyId) {
      toast({ title: "Selection Required", description: "Please pick a property first.", variant: "destructive" })
      return
    }

    const logData = {
      ...formData,
      hoursRun: Number(formData.hoursRun),
      createdAt: serverTimestamp(),
    }

    const colRef = collection(db, 'users', user.uid, 'properties', selectedPropertyId, 'generatorLogs')
    
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
        toast({ title: "Log Entry Saved", description: "Maintenance record added to property history." })
      })
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: logData,
        }));
      })
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Generator Logbook</h1>
          <p className="text-muted-foreground">Tie maintenance history to specific properties and assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/properties">
            <Button variant="outline" size="sm" className="font-bold border-primary/20 text-primary">Manage Properties</Button>
          </Link>
          <Button onClick={() => setIsAdding(!isAdding)} className="font-bold">
            {isAdding ? "Cancel" : "Add Log Entry"}
            {!isAdding && <Plus className="ml-2 w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Select Active Property</Label>
        <Select value={selectedPropertyId || ""} onValueChange={setSelectedPropertyId}>
          <SelectTrigger className="h-12 border-primary/30 bg-card">
            <SelectValue placeholder={propsLoading ? "Loading properties..." : "Pick a property to view logs"} />
          </SelectTrigger>
          <SelectContent>
            {properties && properties.length > 0 ? (
              properties.map((p: any) => (
                <SelectItem key={p.id} value={p.id}>{p.nickname} ({p.address})</SelectItem>
              ))
            ) : (
              <div className="p-4 text-center text-xs italic">
                No properties found. <Link href="/properties" className="text-primary underline">Add one first.</Link>
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      {isAdding && selectedPropertyId && (
        <Card className="border-primary/20 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAddLog}>
            <CardHeader>
              <CardTitle>New Maintenance Entry</CardTitle>
              <CardDescription>Enter details about the work performed at {properties?.find((p:any) => p.id === selectedPropertyId)?.nickname}.</CardDescription>
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

      {loading && selectedPropertyId ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {!selectedPropertyId ? (
            <div className="text-center py-20 bg-muted/10 rounded-2xl border border-dashed flex flex-col items-center justify-center gap-4">
               <Building2 className="w-12 h-12 text-muted-foreground opacity-20" />
               <p className="text-muted-foreground italic">Select a property from the dropdown above to view its maintenance history.</p>
            </div>
          ) : !logs || logs.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed flex flex-col items-center justify-center gap-6">
              <ClipboardList className="w-10 h-10 text-muted-foreground mx-auto opacity-30" />
              <p className="text-muted-foreground font-medium">No logs for this property yet.</p>
            </div>
          ) : (
            logs.map((log: any) => (
              <Card key={log.id} className="hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 uppercase text-[9px] font-black">
                        {log.serviceType}
                      </Badge>
                      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {log.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg mt-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {log.hoursRun} Hours
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{log.notes}</p>
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                    <span>Performed by: <span className="text-foreground">{log.performedBy || "N/A"}</span></span>
                    <span className="text-primary">#{log.id.slice(0, 6)}</span>
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

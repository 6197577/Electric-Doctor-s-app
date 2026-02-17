
"use client"

import { useState } from "react"
import { Building2, Plus, MapPin, Trash2, Home as HomeIcon, Factory, ShieldAlert, Zap, Loader2, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useUser, useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, serverTimestamp, query, orderBy, doc, deleteDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function PropertiesPage() {
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    nickname: "",
    address: "",
    propertyType: "Residential",
    contactEmail: "",
    contactPhone: ""
  })

  // Simulated check for role (In production, use custom claims)
  const isPro = true // Defaulting to true for electrician simulation based on prompt
  const propertyLimit = isPro ? 5 : 1

  const propertiesQuery = user && db ? query(
    collection(db, 'users', user.uid, 'properties'),
    orderBy('createdAt', 'desc')
  ) : null

  const { data: properties, loading } = useCollection(propertiesQuery)

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !db) return

    if (properties && properties.length >= propertyLimit) {
      toast({
        variant: "destructive",
        title: "Limit Reached",
        description: `Your current plan allows for ${propertyLimit} property. Please upgrade for more space.`
      })
      return
    }

    const propData = {
      ...formData,
      createdAt: serverTimestamp()
    }

    const colRef = collection(db, 'users', user.uid, 'properties')
    addDoc(colRef, propData)
      .then(() => {
        setIsAdding(false)
        setFormData({ 
          nickname: "", 
          address: "", 
          propertyType: "Residential",
          contactEmail: "",
          contactPhone: ""
        })
        toast({ title: "Property Added", description: `${formData.nickname} is now being tracked.` })
      })
      .catch((err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: propData
        }))
      })
  }

  const handleDelete = (id: string) => {
    if (!user || !db) return
    const docRef = doc(db, 'users', user.uid, 'properties', id)
    deleteDoc(docRef).catch(() => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete'
      }))
    })
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Managed Properties</h1>
          <p className="text-muted-foreground">Track separate datasets for your residential and commercial assets.</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)} 
          className="font-bold bg-primary text-black hover:bg-primary/90"
          disabled={!loading && properties && properties.length >= propertyLimit && !isAdding}
        >
          {isAdding ? "Cancel" : (
            <>
              Add New Property
              <Plus className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {!loading && properties && properties.length >= propertyLimit && !isAdding && (
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="py-4 flex items-center gap-4">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
            <div className="flex-1">
              <p className="text-sm font-bold">Property Limit Reached ({properties.length}/{propertyLimit})</p>
              <p className="text-xs text-muted-foreground">Upgrade to a Pro Elite plan to manage up to 50 properties.</p>
            </div>
            <Button size="sm" variant="outline" className="border-amber-500/50 text-amber-600">Upgrade</Button>
          </CardContent>
        </Card>
      )}

      {isAdding && (
        <Card className="border-primary/20 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAddProperty}>
            <CardHeader>
              <CardTitle>Register Asset</CardTitle>
              <CardDescription>Enter the location and primary contact information for your property.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input 
                  id="nickname" 
                  placeholder="e.g. Vacation Home" 
                  value={formData.nickname} 
                  onChange={e => setFormData({...formData, nickname: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select value={formData.propertyType} onValueChange={v => setFormData({...formData, propertyType: v})}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Physical Address</Label>
                <Input 
                  id="address" 
                  placeholder="123 Electric Ave, Power City" 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="owner@example.com" 
                  value={formData.contactEmail} 
                  onChange={e => setFormData({...formData, contactEmail: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="(555) 000-0000" 
                  value={formData.contactPhone} 
                  onChange={e => setFormData({...formData, contactPhone: e.target.value})} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full font-bold">Save Property</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties && properties.length > 0 ? (
            properties.map((prop: any) => (
              <Card key={prop.id} className="hover:border-primary/30 transition-colors group">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      {prop.propertyType === 'Residential' ? <HomeIcon className="w-5 h-5 text-primary" /> : <Factory className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{prop.nickname}</CardTitle>
                      <Badge variant="outline" className="text-[10px] uppercase h-4">{prop.propertyType}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(prop.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{prop.address}</span>
                  </div>
                  {(prop.contactEmail || prop.contactPhone) && (
                    <div className="pt-2 border-t border-white/5 grid grid-cols-1 gap-2">
                      {prop.contactEmail && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{prop.contactEmail}</span>
                        </div>
                      )}
                      {prop.contactPhone && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{prop.contactPhone}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/30 pt-4 flex gap-2">
                   <Button variant="link" className="p-0 text-xs text-primary h-auto font-bold uppercase tracking-widest">
                     View Logs
                   </Button>
                   <span className="text-muted-foreground opacity-30">|</span>
                   <Button variant="link" className="p-0 text-xs text-primary h-auto font-bold uppercase tracking-widest">
                     View Audits
                   </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-20 bg-muted/20 rounded-2xl border border-dashed flex flex-col items-center justify-center gap-4">
              <Building2 className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">No properties registered. Click the button above to start tracking assets.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

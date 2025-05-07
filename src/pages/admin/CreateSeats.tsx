"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Plus, Save, Trash2, Loader2, AlertCircle, ArrowLeft, RefreshCw, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import DashboardLayout from "@/components/layout/DashboardLayout"
import api from "@/lib/api"

// Define seat types
const SEAT_TYPES = [
  { value: "WINDOW_SIDE", label: "Window Side" },
  { value: "WALL_SIDE", label: "Wall Side" },
  { value: "CENTER", label: "Center" },
]

// Define seat status options
const SEAT_STATUS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "MAINTENANCE", label: "Maintenance" },
]

interface Seat {
  id?: string
  workspaceId?: string
  label: string
  position?: { x: number; y: number } | null
  floor: number
  status: string
  seatType: string
  createdAt?: string
  updatedAt?: string
}

interface Workspace {
  id: string
  name: string
  seatingCapacity: number
  totalFloors: number
  [key: string]: any
}

const WorkspaceSeatManagement = () => {
  const { workspaceId } = useParams()
  const navigate = useNavigate()

  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [seats, setSeats] = useState<Seat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // For bulk creation
  const [bulkData, setBulkData] = useState({
    seatingCapacity: 0,
    windowSeats: 0,
    wallSideSeats: 0,
    centerSeats: 0,
  })

  // For individual seat creation/editing
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null)
  const [newSeat, setNewSeat] = useState<Seat>({
    label: "",
    floor: 1,
    status: "ACTIVE",
    seatType: "CENTER",
  })

  // For filtering
  const [floorFilter, setFloorFilter] = useState<number | "all">("all")
  const [typeFilter, setTypeFilter] = useState<string | "all">("all")

  // Fetch workspace and seats data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch workspace details
        const workspaceResponse = await api.get(`/workspace/${workspaceId}`)
        const workspaceData = workspaceResponse.data.data || workspaceResponse.data
        setWorkspace(workspaceData)

        // Initialize bulk data with workspace capacity
        setBulkData({
          ...bulkData,
          seatingCapacity: workspaceData.seatingCapacity || 0,
        })

        // Fetch seats
        const seatsResponse = await api.get(`/workspace/${workspaceId}/seats`)
        const seatsData = seatsResponse.data.data || seatsResponse.data || []
        setSeats(seatsData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load workspace data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [workspaceId])

  // Handle bulk creation form changes
  const handleBulkChange = (field: string, value: number) => {
    setBulkData({
      ...bulkData,
      [field]: value,
    })
  }

  // Handle individual seat form changes
  const handleSeatChange = (field: string, value: any) => {
    if (editingSeat) {
      setEditingSeat({
        ...editingSeat,
        [field]: value,
      })
    } else {
      setNewSeat({
        ...newSeat,
        [field]: value,
      })
    }
  }

  // Create seats in bulk
  const handleBulkCreate = async () => {
    if (!workspaceId) return

    // Validate total matches capacity
    const totalSeats = bulkData.windowSeats + bulkData.wallSideSeats + bulkData.centerSeats
    if (totalSeats !== bulkData.seatingCapacity) {
      toast.error("Total seats must match the seating capacity")
      return
    }

    setIsCreating(true)

    try {
      const response = await api.post(`/workspace/bulk-create-seats/${workspaceId}`, bulkData)

      toast.success("Seats created successfully")

      // Refresh seats data
      const seatsResponse = await api.get(`/workspace/${workspaceId}/seats`)
      const seatsData = seatsResponse.data.data || seatsResponse.data || []
      setSeats(seatsData)
    } catch (err: any) {
      console.error("Error creating seats:", err)
      toast.error(
        err.response?.data?.message ||
          "Failed to create seats. Bulk creation only works for workspaces with no existing seats.",
      )
    } finally {
      setIsCreating(false)
    }
  }

  // Create or update individual seat
  const handleSaveSeat = async () => {
    if (!workspaceId) return

    const seatData = editingSeat || newSeat

    // Validate required fields
    if (!seatData.label || !seatData.seatType) {
      toast.error("Please fill all required fields")
      return
    }

    setIsUpdating(true)

    try {
      if (editingSeat && editingSeat.id) {
        // Update existing seat
        await api.patch(`/workspace/${workspaceId}/seats/${editingSeat.id}`, seatData)
        toast.success("Seat updated successfully")
      } else {
        // Create new seat
        await api.post(`/workspace/${workspaceId}/seats`, seatData)
        toast.success("Seat created successfully")
      }

      // Reset form
      setEditingSeat(null)
      setNewSeat({
        label: "",
        floor: 1,
        status: "ACTIVE",
        seatType: "CENTER",
      })

      // Refresh seats data
      const seatsResponse = await api.get(`/workspace/${workspaceId}/seats`)
      const seatsData = seatsResponse.data.data || seatsResponse.data || []
      setSeats(seatsData)
    } catch (err) {
      console.error("Error saving seat:", err)
      toast.error("Failed to save seat. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  // Delete a seat
  const handleDeleteSeat = async (seatId: string) => {
    if (!workspaceId || !seatId) return

    try {
      await api.delete(`/workspace/${workspaceId}/seats/${seatId}`)
      toast.success("Seat deleted successfully")

      // Update local state
      setSeats(seats.filter((seat) => seat.id !== seatId))
    } catch (err) {
      console.error("Error deleting seat:", err)
      toast.error("Failed to delete seat. Please try again.")
    }
  }

  // Edit a seat
  const handleEditSeat = (seat: Seat) => {
    setEditingSeat(seat)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingSeat(null)
    setNewSeat({
      label: "",
      floor: 1,
      status: "ACTIVE",
      seatType: "CENTER",
    })
  }

  // Filter seats based on selected filters
  const filteredSeats = seats.filter((seat) => {
    const floorMatch = floorFilter === "all" || seat.floor === floorFilter
    const typeMatch = typeFilter === "all" || seat.seatType === typeFilter
    return floorMatch && typeMatch
  })

  // Get unique floor numbers for filter
  const floorNumbers = Array.from(new Set(seats.map((seat) => seat.floor))).sort((a, b) => a - b)

  // Format seat type for display
  const formatSeatType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ")
  }

  // Check if bulk creation is available (only for workspaces with no seats)
  const isBulkAvailable = seats.length === 0

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4 pl-0 text-deskhive-navy" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">
            {isLoading ? "Loading..." : `Manage Seats: ${workspace?.name || "Workspace"}`}
          </h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">Create and manage seats for this workspace</p>
        </div>

        {error ? (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <Card className="mb-6">
            <CardContent className="pt-6 flex justify-center">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Loading workspace data...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Tabs defaultValue={isBulkAvailable ? "bulk" : "individual"} className="mb-6">
              <TabsList>
                <TabsTrigger value="individual">Individual Seats</TabsTrigger>
                <TabsTrigger value="bulk" disabled={!isBulkAvailable}>
                  Bulk Creation
                  {!isBulkAvailable && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Only for new workspaces
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>{editingSeat ? "Edit Seat" : "Add New Seat"}</CardTitle>
                      <CardDescription>
                        {editingSeat ? `Editing seat ${editingSeat.label}` : "Create a new seat for this workspace"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="label">Seat Label</Label>
                        <Input
                          id="label"
                          placeholder="e.g., WS-1, CTR-2"
                          value={editingSeat?.label || newSeat.label}
                          onChange={(e) => handleSeatChange("label", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="floor">Floor</Label>
                        <Input
                          id="floor"
                          type="number"
                          min="1"
                          placeholder="Floor number"
                          value={editingSeat?.floor || newSeat.floor}
                          onChange={(e) => handleSeatChange("floor", Number.parseInt(e.target.value))}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="seatType">Seat Type</Label>
                        <Select
                          value={editingSeat?.seatType || newSeat.seatType}
                          onValueChange={(value) => handleSeatChange("seatType", value)}
                        >
                          <SelectTrigger id="seatType">
                            <SelectValue placeholder="Select seat type" />
                          </SelectTrigger>
                          <SelectContent>
                            {SEAT_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={editingSeat?.status || newSeat.status}
                          onValueChange={(value) => handleSeatChange("status", value)}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {SEAT_STATUS.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {editingSeat ? (
                        <>
                          <Button variant="outline" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveSeat} disabled={isUpdating}>
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Update Seat
                              </>
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button onClick={handleSaveSeat} disabled={isUpdating} className="ml-auto">
                          {isUpdating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Seat
                            </>
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Workspace Details</CardTitle>
                      <CardDescription>Information about this workspace</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Name</p>
                          <p>{workspace?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Seating Capacity</p>
                          <p>{workspace?.seatingCapacity}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Floors</p>
                          <p>{workspace?.totalFloors}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Current Seats</p>
                          <p>{seats.length}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Seat Distribution</p>
                        <div className="grid grid-cols-3 gap-2">
                          {SEAT_TYPES.map((type) => {
                            const count = seats.filter((seat) => seat.seatType === type.value).length
                            return (
                              <div key={type.value} className="flex flex-col items-center p-2 border rounded-md">
                                <p className="text-xs text-muted-foreground">{type.label}</p>
                                <p className="text-lg font-semibold">{count}</p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bulk" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bulk Create Seats</CardTitle>
                    <CardDescription>
                      Quickly create multiple seats for this workspace.
                      <span className="block mt-1 text-amber-500">
                        Note: This only works for workspaces with no existing seats.
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="seatingCapacity">Total Seating Capacity</Label>
                        <Input
                          id="seatingCapacity"
                          type="number"
                          min="1"
                          value={bulkData.seatingCapacity}
                          onChange={(e) => handleBulkChange("seatingCapacity", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="windowSeats">Window Side Seats</Label>
                        <Input
                          id="windowSeats"
                          type="number"
                          min="0"
                          value={bulkData.windowSeats}
                          onChange={(e) => handleBulkChange("windowSeats", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="wallSideSeats">Wall Side Seats</Label>
                        <Input
                          id="wallSideSeats"
                          type="number"
                          min="0"
                          value={bulkData.wallSideSeats}
                          onChange={(e) => handleBulkChange("wallSideSeats", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="centerSeats">Center Seats</Label>
                        <Input
                          id="centerSeats"
                          type="number"
                          min="0"
                          value={bulkData.centerSeats}
                          onChange={(e) => handleBulkChange("centerSeats", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Total Seats:</p>
                        <p className="font-medium">
                          {bulkData.windowSeats + bulkData.wallSideSeats + bulkData.centerSeats}
                        </p>
                      </div>

                      {bulkData.windowSeats + bulkData.wallSideSeats + bulkData.centerSeats !==
                        bulkData.seatingCapacity && (
                        <p className="text-sm text-red-500 mt-1">
                          Total seats must match the seating capacity ({bulkData.seatingCapacity})
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleBulkCreate}
                      disabled={
                        isCreating ||
                        bulkData.windowSeats + bulkData.wallSideSeats + bulkData.centerSeats !==
                          bulkData.seatingCapacity
                      }
                      className="ml-auto"
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Seats
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Workspace Seats</CardTitle>
                  <CardDescription>Manage all seats for this workspace</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={floorFilter.toString()}
                    onValueChange={(value) => setFloorFilter(value === "all" ? "all" : Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Floor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Floors</SelectItem>
                      {floorNumbers.map((floor) => (
                        <SelectItem key={floor} value={floor.toString()}>
                          Floor {floor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Seat Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {SEAT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredSeats.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No seats found</p>
                    {seats.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Try changing your filters or create new seats
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="border rounded-md">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                      <div>Label</div>
                      <div>Type</div>
                      <div>Floor</div>
                      <div>Status</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {filteredSeats.map((seat) => (
                      <div key={seat.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0 items-center">
                        <div>{seat.label}</div>
                        <div>{formatSeatType(seat.seatType)}</div>
                        <div>{seat.floor}</div>
                        <div>
                          <Badge
                            variant={
                              seat.status === "ACTIVE"
                                ? "default"
                                : seat.status === "INACTIVE"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {seat.status === "ACTIVE"
                              ? "Active"
                              : seat.status === "INACTIVE"
                                ? "Inactive"
                                : "Maintenance"}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditSeat(seat)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Seat</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete seat {seat.label}? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" className="mr-2">
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    if (seat.id) handleDeleteSeat(seat.id)
                                  }}
                                >
                                  Delete Seat
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default WorkspaceSeatManagement

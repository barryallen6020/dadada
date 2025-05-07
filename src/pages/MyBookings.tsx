"use client"

import { useState, useEffect } from "react"
import { format, parseISO, isAfter, isBefore, subMinutes } from "date-fns"
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Users,
  AlertTriangle,
  Search,
  Check,
  X,
  Loader2,
  LogIn,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { cn } from "@/lib/utils"
import {toast} from "sonner"
import api from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Seat {
  id: string
  workspaceId: string
  label: string
  position: string | null
  floor: number
  status: string
  seatType: string
  createdAt: string
  updatedAt: string
}

interface Workspace {
  id: string
  organizationId: string
  stateId: string
  lgaId: string
  name: string
  description: string
  openingTime: string | null
  closingTime: string | null
  seatingCapacity: number
  images: string[]
  amenities: string[]
  pricePerBooking: number
  isPaidBooking: boolean
  createdAt: string
  updatedAt: string
  address: string
  totalFloors: number
  status: string
}

interface Booking {
  id: string
  workspaceId: string
  seatId: string
  userId: string
  startTime: string
  endTime: string
  checkinTime: string | null
  actualCheckoutTime: string | null
  price: number
  status: string
  createdAt: string
  updatedAt: string
  seat: Seat
  workspace: Workspace
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.get("/booking/user")
      if (response.data && response.data.data) {
        setBookings(response.data.data)
      }
    } catch (err) {
      console.error("Error fetching bookings:", err)
      setError("Failed to load your bookings. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter bookings based on search query
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.workspace?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.seat?.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      format(parseISO(booking.startTime), "yyyy-MM-dd").includes(searchQuery),
  )

  // Split bookings into upcoming and past
  const now = new Date()
  const upcomingBookings = filteredBookings.filter(
    (booking) => isAfter(parseISO(booking.endTime), now) && booking.status !== "CANCELLED",
  )
  const pastBookings = filteredBookings.filter(
    (booking) => !isAfter(parseISO(booking.endTime), now) || booking.status === "CANCELLED",
  )

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return

    setIsCancelling(true)
    try {
      // In a real app, you would send a request to your backend to cancel the booking
      await api.patch(`/booking/cancel/${selectedBookingId}`)

      // Update the local state to reflect the cancellation
      setBookings(
        bookings.map((booking) => (booking.id === selectedBookingId ? { ...booking, status: "CANCELLED" } : booking)),
      )

      toast.success("Your booking has been cancelled successfully.")
    } catch (err) {
      console.error("Error cancelling booking:", err)
      toast.error("Failed to cancel booking. Please try again.")
    } finally {
      setIsCancelling(false)
      setCancelDialogOpen(false)
      setSelectedBookingId(null)
    }
  }

  const handleCheckIn = async (bookingId: string) => {
    setIsCheckingIn(true)
    setSelectedBookingId(bookingId)
    try {
      await api.patch(`/booking/check-in/${bookingId}`)

      // Update the local state to reflect check-in
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, checkinTime: new Date().toISOString() } : booking,
        ),
      )

      toast.success("You have successfully checked in to your booking.")
    } catch (err) {
      console.error("Error checking in:", err)
      toast.error("Failed to check in. Please try again or contact support.")
    } finally {
      setIsCheckingIn(false)
      setSelectedBookingId(null)
    }
  }

  const handleCheckOut = async (bookingId: string) => {
    setIsCheckingOut(true)
    setSelectedBookingId(bookingId)
    try {
      await api.patch(`/booking/check-out/${bookingId}`)

      // Update the local state to reflect check-out
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, actualCheckoutTime: new Date().toISOString() } : booking,
        ),
      )

      toast.success("You have successfully checked out from your booking.")
    } catch (err) {
      console.error("Error checking out:", err)
      toast.error("Failed to check out. Please try again or contact support.")
    } finally {
      setIsCheckingOut(false)
      setSelectedBookingId(null)
    }
  }

  const openCancelDialog = (bookingId: string) => {
    setSelectedBookingId(bookingId)
    setCancelDialogOpen(true)
  }

  const formatSeatType = (seatType: string) => {
    return seatType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const canCheckIn = (booking: Booking) => {
    const bookingStart = parseISO(booking.startTime)
    const bookingEnd = parseISO(booking.endTime)
    const earlyCheckInTime = subMinutes(bookingStart, 5) // 5 minutes before start time
    const currentTime = new Date()
  
    // Can check in if:
    // 1. Booking is confirmed
    // 2. Current time is at or after 5 minutes before the booking start time
    // 3. Current time is before the booking end time
    // 4. Not already checked in
    return (
      booking.status === "CONFIRMED" &&
      isAfter(currentTime, earlyCheckInTime) &&
      isBefore(currentTime, bookingEnd) &&
      !booking.checkinTime
    )
  }

  // Check if a booking is eligible for check-out
  const canCheckOut = (booking: Booking) => {
    // Can check out if:
    // 1. Already checked in
    // 2. Not already checked out
    return booking.checkinTime && !booking.actualCheckoutTime
  }

  const renderBookingCard = (booking: Booking) => {
    const isUpcoming = isAfter(parseISO(booking.endTime), now) && booking.status !== "CANCELLED"
    const bookingDate = format(parseISO(booking.startTime), "yyyy-MM-dd")
    const isCheckedIn = !!booking.checkinTime
    const isCheckedOut = !!booking.actualCheckoutTime

    return (
      <div
        key={booking.id}
        className={cn(
          "border rounded-lg overflow-hidden transition-all hover:shadow-md",
          booking.status === "CANCELLED" ? "opacity-70" : "",
        )}
      >
        <div className="p-4 flex flex-col md:flex-row gap-4">
          {/* Booking info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{booking.workspace?.name || "Unknown Workspace"}</h3>
              <Badge
                variant={
                  booking.status === "CONFIRMED" ? "default" : booking.status === "PENDING" ? "outline" : "destructive"
                }
              >
                {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
              </Badge>
              {isCheckedIn && !isCheckedOut && (
                <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
              )}
              {isCheckedOut && <Badge variant="secondary">Checked Out</Badge>}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-deskhive-navy" />
                {format(parseISO(booking.startTime), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-deskhive-navy" />
                {format(parseISO(booking.startTime), "HH:mm")} - {format(parseISO(booking.endTime), "HH:mm")}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-deskhive-navy" />
                {booking.workspace?.address || "Unknown Location"}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-deskhive-navy" />
                Seat: {booking.seat?.label} ({formatSeatType(booking.seat?.seatType)})
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-deskhive-navy" />
                Floor: {booking.seat?.floor}
              </div>
              {booking.price > 0 && (
                <div className="flex items-center font-medium">Price: ₦{booking.price.toLocaleString()}</div>
              )}

              {/* Check-in/out times if available */}
              {isCheckedIn && (
                <div className="flex items-center text-green-600">
                  <LogIn className="h-4 w-4 mr-2" />
                  Checked in: {format(parseISO(booking.checkinTime!), "MMM d, yyyy • HH:mm")}
                </div>
              )}
              {isCheckedOut && (
                <div className="flex items-center text-gray-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Checked out: {format(parseISO(booking.actualCheckoutTime!), "MMM d, yyyy • HH:mm")}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-row md:flex-col gap-2 justify-end">
            {isUpcoming ? (
              <>
                {canCheckIn(booking) && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          size="sm"
                          onClick={() => handleCheckIn(booking.id)}
                          disabled={isCheckingIn && selectedBookingId === booking.id}
                        >
                          {isCheckingIn && selectedBookingId === booking.id ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <LogIn className="h-4 w-4 mr-1" />
                          )}
                          Check In
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Check in to your booking</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {canCheckOut(booking) && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-orange-600 border-orange-600 hover:bg-orange-50"
                          size="sm"
                          onClick={() => handleCheckOut(booking.id)}
                          disabled={isCheckingOut && selectedBookingId === booking.id}
                        >
                          {isCheckingOut && selectedBookingId === booking.id ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <LogOut className="h-4 w-4 mr-1" />
                          )}
                          Check Out
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Check out from your booking</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {!isCheckedIn && (
                  <>
                    {/* <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50" size="sm">
                      <Clock className="h-4 w-4 mr-1" />
                      Reschedule
                    </Button> */}
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      size="sm"
                      onClick={() => openCancelDialog(booking.id)}
                      disabled={booking.status === "CANCELLED"}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button variant="outline" size="sm">
                <Check className="h-4 w-4 mr-1" />
                Book Again
              </Button>
            )}
          </div>
        </div>

        {booking.status === "CANCELLED" && (
          <div className="bg-red-50 p-2 border-t flex items-center justify-center text-red-600 text-sm">
            <AlertTriangle className="h-4 w-4 mr-1" />
            This booking has been cancelled
          </div>
        )}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">My Bookings</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">View and manage all your workspace bookings</p>
        </div>

        <div className="mb-6 relative">
          <Input
            placeholder="Search by workspace, seat or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deskhive-darkgray/70" />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-deskhive-navy" />
            <span className="ml-2">Loading your bookings...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-lg font-medium mb-2">Error Loading Bookings</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchBookings}>Try Again</Button>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map(renderBookingCard)
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-4">You don't have any workspace bookings scheduled.</p>
                  <Button asChild>
                    <a href="/dashboard">Book a Workspace</a>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastBookings.length > 0 ? (
                pastBookings.map(renderBookingCard)
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No past bookings</h3>
                  <p className="text-gray-600">You don't have any past workspace bookings.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)} disabled={isCancelling}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking} disabled={isCancelling}>
              {isCancelling ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

export default MyBookings

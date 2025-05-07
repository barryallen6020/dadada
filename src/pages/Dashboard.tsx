"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import WorkspaceCard from "@/components/dashboard/WorkspaceCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, SlidersHorizontal, MapPin, Building2, Clock } from "lucide-react"
import { workspaces } from "@/data/workspaces"
import FilterModal from "@/components/dashboard/FilterModal"
import CheckInStatus from "@/components/dashboard/CheckInStatus"
import { Link, useNavigate } from "react-router-dom"
import { useOrganization } from "@/contexts/OrganizationContext"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser } from "@/services/authService"
import api from "@/lib/api"
import { format, parseISO, isAfter } from "date-fns"

const Dashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [activeTab, setActiveTab] = useState("all")
  const [allWorkspaces, setAllWorkspaces] = useState<any[]>([])
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([])
  const [isLoadingBookings, setIsLoadingBookings] = useState(true)
  const [locations, setLocations] = useState<Record<string, string>>({})

  const { currentOrganization } = useOrganization()

  // Get the current user from authentication
  const user = getCurrentUser()
  const firstName = user?.firstName || "Guest"
  const lastName = user?.lastName || ""
  const userEmail = user?.email || ""
  const displayName = firstName + (lastName ? ` ${lastName}` : "")

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteHubs")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    const savedRatings = localStorage.getItem("hubRatings")
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings))
    }
  }, [])

  // Fetch upcoming bookings
  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      setIsLoadingBookings(true)
      try {
        const response = await api.get("/booking/user")
        if (response.data && response.data.data) {
          const now = new Date()
          // Filter to only upcoming bookings with status CONFIRMED or PENDING
          const upcoming = response.data.data
            .filter(
              (booking: any) =>
                (booking.status === "CONFIRMED" || booking.status === "PENDING") &&
                isAfter(parseISO(booking.endTime), now),
            )
            .sort((a: any, b: any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
            .slice(0, 3) // Get only the next 3 upcoming bookings

          setUpcomingBookings(upcoming)
        }
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setIsLoadingBookings(false)
      }
    }

    fetchUpcomingBookings()
  }, [])

  const organizationWorkspaces = workspaces
    .filter((workspace) => workspace.enabled !== false && workspace.organizationId === currentOrganization.id)
    .map((workspace) => ({
      ...workspace,
      isFavorite: favorites.includes(workspace.id),
      rating: ratings[workspace.id],
    }))

  const filteredWorkspaces = organizationWorkspaces.filter(
    (workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const favoriteWorkspaces = filteredWorkspaces.filter((workspace) => favorites.includes(workspace.id))

  const handleToggleFavorite = (workspaceId: string) => {
    const newFavorites = favorites.includes(workspaceId)
      ? favorites.filter((id) => id !== workspaceId)
      : [...favorites, workspaceId]

    setFavorites(newFavorites)
    localStorage.setItem("favoriteHubs", JSON.stringify(newFavorites))

    toast({
      title: favorites.includes(workspaceId) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(workspaceId)
        ? "The hub has been removed from your favorites"
        : "The hub has been added to your favorites",
    })
  }

  const handleRate = (workspaceId: string, rating: number) => {
    const newRatings = { ...ratings, [workspaceId]: rating }
    setRatings(newRatings)
    localStorage.setItem("hubRatings", JSON.stringify(newRatings))

    toast({
      title: "Rating updated",
      description: `You've rated this hub ${rating} stars`,
    })
  }

  const handleApplyFilters = (filters: any) => {
    console.log("Filters applied:", filters)
  }

  // Fetch workspaces and location data
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await api.get("/workspace")
        // Check the structure of the response and extract workspaces accordingly
        const workspacesData = response.data.data || response.data || []

        console.log("Workspace API response:", response.data)
        setAllWorkspaces(workspacesData)

        // Fetch location data for each workspace
        const locationData: Record<string, string> = {}
        for (const workspace of workspacesData) {
          try {
            // Fetch state data
            if (workspace.stateId) {
              const stateResponse = await api.get(`/location/id/${workspace.stateId}`)
              const stateName = stateResponse.data.data?.name || stateResponse.data?.name

              // Fetch LGA data if available
              let locationName = stateName
              if (workspace.lgaId) {
                const lgaResponse = await api.get(`/location/lga/${workspace.lgaId}`)
                const lgaName = lgaResponse.data.data?.name || lgaResponse.data?.name
                locationName = `${lgaName}, ${stateName}`
              }

              locationData[workspace.id] = locationName
            }
          } catch (error) {
            console.error(`Error fetching location for workspace ${workspace.id}:`, error)
            locationData[workspace.id] = workspace.address || "Location unavailable"
          }
        }

        setLocations(locationData)
      } catch (error) {
        console.error("Error fetching workspaces:", error)
      }
    }

    fetchWorkspaces()
  }, [])

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Welcome back, {displayName}</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Find and book the perfect workspace for your needs
          </p>
        </div>

        <div className="mb-6">
          <CheckInStatus userEmail={userEmail} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-deskhive-orange" />
                Upcoming Bookings
              </CardTitle>
              <CardDescription>Your scheduled workspaces</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBookings ? (
                <div className="p-4 text-center">
                  <p className="text-deskhive-darkgray">Loading your bookings...</p>
                </div>
              ) : upcomingBookings.length > 0 ? (
                <div className="space-y-2">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="p-2 border rounded-md">
                      <p className="font-medium">{booking.workspace?.name}</p>
                      <div className="flex items-center text-xs text-deskhive-darkgray/70 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(parseISO(booking.startTime), "MMM d, yyyy • h:mm a")}
                      </div>
                      <div className="flex items-center text-xs text-deskhive-darkgray/70 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.seat?.label} ({booking.seat?.seatType.replace("_", " ")})
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-deskhive-darkgray">You have no upcoming bookings</p>
                  <Link to="/bookings">
                    <Button className="mt-3 bg-deskhive-navy hover:bg-deskhive-navy/90" size="sm">
                      View All Bookings
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-deskhive-orange" />
                Featured Hubs
              </CardTitle>
              <CardDescription>Popular workspaces in {currentOrganization.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {allWorkspaces.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-deskhive-darkgray">Loading featured hubs...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {allWorkspaces.slice(0, 2).map((workspace) => (
                    <div key={workspace.id} className="p-2 border rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">{workspace.name}</p>
                        <div className="flex items-center text-xs text-deskhive-darkgray/70">
                          <MapPin className="h-3 w-3 mr-1" />
                          {locations[workspace.id] || workspace.address || "Location unavailable"}
                        </div>
                      </div>
                      <Link to={`/book/${workspace.id}`}>
                        <Button size="sm" className="bg-deskhive-navy">
                          Book
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="all">All Hubs</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6 relative w-full">
          <div className="relative w-full">
            <Input
              placeholder="Search by name, type, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deskhive-darkgray/70" />
            <Button
              variant="ghost"
              onClick={() => setIsFilterModalOpen(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              <SlidersHorizontal className="h-4 w-4 text-deskhive-darkgray/70" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allWorkspaces.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-deskhive-darkgray">Loading workspaces...</p>
            </div>
          ) : (
            (activeTab === "all" ? allWorkspaces : favoriteWorkspaces).map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={{
                  ...workspace,
                  location: locations[workspace.id] || workspace.address || "Location unavailable",
                }}
                onBook={() => navigate(`/book/${workspace.id}`)}
                onToggleFavorite={handleToggleFavorite}
                onRate={handleRate}
              />
            ))
          )}
        </div>

        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

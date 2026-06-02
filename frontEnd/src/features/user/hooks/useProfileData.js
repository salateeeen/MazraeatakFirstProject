import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { selectUser, selectUserFullName } from "@/features/user/userSlice";
import { useMyFarms } from "@/features/farms/hooks/useMyFarms";
import { useBookings } from "@/features/bookings/hooks/useBookings";
import { useOwnerBookings } from "@/features/bookings/hooks/useOwnerBookings";
import { useFavoritesFarms } from "@/features/farms/hooks/useFavoriteFarms";
import { fetchProfile } from "@/features/user/services/userApi";
import { formatToShortDate } from "@/utils/handleDate";

export function useProfileData() {
  const { id } = useParams();
  const loggedInUser = useSelector(selectUser);
  const loggedInFullName = useSelector(selectUserFullName);
  
  const isOwnProfile = !id || id === loggedInUser?._id;
  const targetId = id || loggedInUser?._id;

  // Fetch profile details if viewing another user's profile
  const { data: profileResponse, isPending: fetchingProfile, error: profileError } = useQuery({
    queryKey: ["profile", targetId],
    queryFn: () => fetchProfile(targetId),
    enabled: !!targetId && !isOwnProfile,
  });

  // Queries for live counts
  const { data: myFarmsData } = useMyFarms();
  const { data: ownerBookingsData } = useOwnerBookings();
  const { data: bookingsData } = useBookings();
  const { data: favoritesData } = useFavoritesFarms();

  const profileUser = isOwnProfile ? loggedInUser : profileResponse?.data;
  const isPending = !isOwnProfile && fetchingProfile;
  const error = !isOwnProfile && profileError;

  // Handle fallback details
  const fullName = isOwnProfile 
    ? loggedInFullName 
    : `${profileUser?.firstName || ""} ${profileUser?.lastName || ""}`.trim();
  const email = profileUser?.email || "No email available";
  const userRole = profileUser?.role || "user";
  
  // Format join date with handleDate utility
  const joinedDate = profileUser?.createdAt 
    ? formatToShortDate(profileUser.createdAt)
    : "Recently";

  // Stats calculation
  const totalFarms = myFarmsData?.data?.length || 0;
  const totalBookings = ownerBookingsData?.data?.length || 0;
  const totalEarnings = ownerBookingsData?.data
    ?.filter(b => b.status === "completed" || b.status === "confirmed")
    ?.reduce((sum, b) => sum + (b.price || 0), 0) || 0;

  const customerBookings = bookingsData?.data?.length || 0;
  const customerFavorites = favoritesData?.data?.length || 0;
  const customerReviewsCount = bookingsData?.data?.filter(b => b.status === "completed")?.length || 0;

  const getActivities = () => {
    const list = [];
    const joinTime = profileUser?.createdAt 
      ? formatToShortDate(profileUser.createdAt)
      : "recent date";

    if (userRole === "owner") {
      if (myFarmsData?.data && myFarmsData.data.length > 0) {
        const latestFarm = myFarmsData.data[0];
        list.push({
          id: "farm-add",
          type: "farm",
          title: "Added a new farm listing",
          desc: `Published "${latestFarm.farmName}" in ${latestFarm.city || "Jordan"}.`,
          time: latestFarm.createdAt ? formatToShortDate(latestFarm.createdAt) : "Recently",
        });
      }
      
      if (ownerBookingsData?.data && ownerBookingsData.data.length > 0) {
        const latestBooking = ownerBookingsData.data[0];
        list.push({
          id: "booking-receive",
          type: "booking",
          title: "Received a new booking",
          desc: `Received a booking for "${latestBooking.farm?.farmName || "your farm"}" on ${formatToShortDate(latestBooking.date)}.`,
          time: latestBooking.createdAt ? formatToShortDate(latestBooking.createdAt) : "Recently",
        });
      }

      list.push({
        id: "profile-update",
        type: "profile",
        title: "Updated business profile",
        desc: "Modified account details and updated email preference settings.",
        time: "1 week ago",
      });

      list.push({
        id: "join",
        type: "join",
        title: "Joined Mazraeatak",
        desc: "Registered as a verified Farm Owner listing agent.",
        time: joinTime,
      });
    } else {
      if (bookingsData?.data && bookingsData.data.length > 0) {
        const latestBooking = bookingsData.data[0];
        list.push({
          id: "booking-make",
          type: "booking",
          title: "Booked a farm listing",
          desc: `Booked "${latestBooking.farm?.farmName || "Farm"}" for ${latestBooking.timeSlot || "full day"} (${latestBooking.price} JD).`,
          time: latestBooking.createdAt ? formatToShortDate(latestBooking.createdAt) : "Recently",
        });
      }

      if (favoritesData?.data && favoritesData.data.length > 0) {
        const latestFavorite = favoritesData.data[0];
        list.push({
          id: "favorite-add",
          type: "favorite",
          title: "Saved a farm to Favorites",
          desc: `Saved "${latestFavorite.farmName}" to bookmarks folder.`,
          time: "Recently",
        });
      }

      list.push({
        id: "profile-update",
        type: "profile",
        title: "Updated contact settings",
        desc: "Modified profile picture and updated password options.",
        time: "2 weeks ago",
      });

      list.push({
        id: "join",
        type: "join",
        title: "Joined Mazraeatak",
        desc: "Registered as a customer to browse and book premium farm rentals.",
        time: joinTime,
      });
    }

    return list.slice(0, 4);
  };

  return {
    profileUser,
    isOwnProfile,
    isPending,
    error,
    fullName,
    email,
    userRole,
    joinedDate,
    targetId,
    stats: {
      totalFarms,
      totalBookings,
      totalEarnings,
      customerBookings,
      customerFavorites,
      customerReviewsCount
    },
    activities: getActivities()
  };
}

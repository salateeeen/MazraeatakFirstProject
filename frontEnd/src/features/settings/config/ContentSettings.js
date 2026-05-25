import Password from "../components/accountContent/Password";
import Email from "../components/accountContent/Email";
import Actions from "../components/accountContent/Actions";
import PersonalInfo from "../components/accountContent/PersonalInfo";

import DeliveryMethods from "../components/notificationsContent/DeliveryMethods";
import NotificationTypes from "../components/notificationsContent/NotificationTypes";
import SoundsAlerts from "../components/notificationsContent/SoundsAlerts";

import GeneralPreferences from "../components/preferencesContent/GeneralPreferences";
import Appearance from "../components/preferencesContent/Appearance";
import LanguageRegion from "../components/preferencesContent/LanguageRegion";
import ThemeMode from "../components/preferencesContent/ThemeMode";

import PrivacyOverview from "../components/privacyContent/PrivacyOverview";
import DataProtection from "../components/privacyContent/DataProtection";


import AutoAccept from "../components/ownerContent/AutoAccept";
import InstantBooking from "../components/ownerContent/InstantBooking";
import CancellationWindow from "../components/ownerContent/CancellationWindow";

import RequestOwner from "../components/requestOwnerContent/RequestOwner";

export const CONTENTS = {
  personalInfo: {
    component: PersonalInfo,
    title: "Personal Information",
    description: "Manage your personal details.",
  },
  email: {
    component: Email,
    title: "Email",
    description:
      "Update your email address and manage email-related security settings.",
  },
  password: {
    component: Password,
    title: "Password",
    description: "Change your account password to keep your account secure.",
  },
  actions: {
    component: Actions,
    title: "Account Actions",
    description:
      "Manage critical account actions such as logout, deactivate, or delete account.",
  },

  deliveryMethods: {
    component: DeliveryMethods,
    title: "Delivery Methods",
    description: "Choose how notifications are delivered to you, such as email or sms...",
  },
  notificationTypes: {
    component: NotificationTypes,
    title: "Notification Types",
    description: "Select the types of notifications you want to receive.",
  },
  sound: {
    component: SoundsAlerts,
    title: "Sounds & Alerts",
    description: "Customize notification sounds and alert preferences.",
  },

  general: {
    component: GeneralPreferences,
    title: "General Preferences",
    description: "Adjust general application behavior and default preferences.",
  },
  appearance: {
    component: Appearance,
    title: "Appearance",
    description: "Customize the visual appearance of the application.",
  },
  languageRegion: {
    component: LanguageRegion,
    title: "Language & Region",
    description: "Select your preferred language and regional settings.",
  },
  theme: {
    component: ThemeMode,
    title: "Theme Mode",
    description: "Choose between light, dark, or system-based theme mode.",
  },

  autoAccept: {
    component: AutoAccept,
    title: "Auto Accept Bookings",
    description: "Automatically accept booking requests from guests.",
  },
  instantBooking: {
    component: InstantBooking,
    title: "Allow Instant Booking",
    description: "Allow guests to book your farm instantly.",
  },
  cancellationWindow: {
    component: CancellationWindow,
    title: "Cancellation Window",
    description: "Set the default cancellation window in hours.",
  },
 
  overview: {
    component: PrivacyOverview,
    title: "Privacy Overview",
    description: "View an overview of your privacy and data settings.",
  },
  
  dataProtection: {
    component: DataProtection,
    title: "Data Protection",
    description: "Manage how your data is stored, used, and protected.",
  },

   request: {
    component: RequestOwner,
    title: "Request to become an Owner",
    description: "Fill out the form below to request to become a farm owner on our platform. We will review your request and get back to you soon.",
  },
};

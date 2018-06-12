import {
  Homepage,
  NotFound } from '../homepage.test';

import {
  ErrorUponSignUp,
  ErrorUponSignIn,
  SignIn,
  Logout
} from '../auth.test';

import {
  AdminDashboard,
  CreateCenter,
  EditCenter,
  ViewCenter,
  ShowNoEventsForCenter
} from '../center.test';

import {
  CreateEvent,
  EditEvent,
  DeleteEvent,
  ShowNoEvents
} from '../event.test';

module.exports = {

  // Navigate to the landing page
  'Landing Page Test': browser => Homepage(browser),

  // Redirect to NotFound Page
  'NotFound Page Test': browser => NotFound(browser),

  // Test for sign up errors upon unsuccessful submission
  'Users should receive error when signup form is not properly filled': browser =>
    ErrorUponSignUp(browser),

  // Test for sign up errors upon unsuccessful submission
  'Users should receive error when signin form is not properly filled': browser =>
    ErrorUponSignIn(browser),

  // Test successful signup submission
  'User gets logged in when input fields are correctly filled': browser =>
    SignIn(browser),

  // Log in user test
  'Logged in user should be able to log out by clicking the logout button': browser =>
    Logout(browser),

  // Admin Dashboard
  'Logged in Admin should be able to see the center\'s dashboard': browser =>
    AdminDashboard(browser),

  // Create Center
  'Logged in Admin should be able to create center by clicking the \'create center\' button': browser =>
    CreateCenter(browser),

  // Edit Center
  'Logged in Admin should be able to edit center by clicking edit center button': browser =>
    EditCenter(browser),

  // View Center
  'Logged in Admin should be able to view center by clicking view center button': browser =>
    ViewCenter(browser),

  // Show no events if none is slated for the selected center
  'Logged in Admin should no events if none is slated for a center': browser =>
    ShowNoEventsForCenter(browser),

  // Create Event
  'Logged in User should be able to create event by clicking the \'create event\' button': browser =>
    CreateEvent(browser),

  'Logged in User should be able to edit event by clicking edit event button': browser =>
    EditEvent(browser),

  'Logged in user should be able to delete an event': browser =>
    DeleteEvent(browser),

  'Logged in User sees no event when none is found': browser =>
    ShowNoEvents(browser),
};

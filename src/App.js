import signBgChef from "./images/signBgChef.jpg";
import signBgCust from "./images/signBgCust.png";
import Customer from "./element/Customer";
import Chef from "./element/Chef";
import SignIn from "./element/SignIn";
import SignUp from "./element/SignUp";
import OTPVerify from "./element/OTPVerify";
import PaymentDetail from "./element/PaymentDetail";
import PageNotFound from "./element/PageNotFound";
import AddCard from "./element/AddCard";
import AddNewCard from "./element/AddNewCard";
import ChefList from "./element/ChefList";
import UnderReview from "./element/UnderReview";
import ProfileChef from "./element/CompleteChefProfile";
import ChefDetail from "./element/ChefDetail";
import BookingPage1 from "./element/BookingPage1";
import BookingPage2 from "./element/BookingPage2";
import BookingPage3 from "./element/BookingPage3";
import TermsCondition from "./element/TermsCondition";
import PrivacyPolicy from "./element/PrivacyPolicy";
import BookRequestSent from "./element/BookRequestSent";
import TipAmountSent from "./element/TipAmountSent";
import TipAmount from "./element/TipAmount";
import UpdateCard from "./element/UpdateCard";
import Profile from "./element/Profile";
import OrderDetail from "./element/OrderDetail";
import ChefOrderDetail from "./element/ChefOrderDetail";
import ReviewToChef from "./element/ReviewToChef";
import OrderListChef from "./element/OrderListChef";
import OrderListCustomer from "./element/OrderListCustomer";
import { Routes, Route } from "react-router-dom";
import GroceryBillConfirm from "./element/GroceryBillConfirm";
import GroceryBill from "./element/GroceryBill";
import AtLocation from "./element/AtLocation";
import AtLocationConfirm from "./element/AtLocationConfirm";
import GreatJob from "./element/GreatJob";
import NotInterested from "./element/NotInterested";
import ApproveOrderConfirm from "./element/ApproveOrderConfirm";
import Reminder from "./element/Reminder";
import MessageList from "./element/MessageList";
import MessageDetail from "./element/MessageDetail";
import GroceryCamera from "./element/GroceryCamera";
import BrowseChefProfile from "./element/BrowseChefProfile";
import EditChefProfile from "./element/EditChefProfile";
import ForgotOTP from "./element/ForgotOTP";
import ForgotOTPVerify from "./element/ForgotOTPVerify";
import BrowseChefMobileProfile from "./element/BrowseChefMobileProfile";
import BookingDetailCancel from "./element/BookingDetailCancel";
import BookingDetailCancelChef from "./element/BookingDetailCancelChef";

import { isMobile } from "react-device-detect";

function App() {
  return (
    <>
      <Routes>
        {/* Common */}
        <Route
          path="/under-review"
          element={<UnderReview customer={true} />}
        ></Route>
        <Route path="*" element={<PageNotFound />} />

        {/* Customer */}
        <Route path="/"
          element={<Customer customer={true} />}></Route>
        <Route
          path="/sign-in"
          element={<SignIn image={signBgCust} customer={true} />}
        ></Route>
        <Route
          path="/sign-up"
          element={<SignUp image={signBgCust} customer={true} />}
        ></Route>
        <Route
          path="/terms-and-conditions"
          element={<TermsCondition customer={true} />}
        ></Route>
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy customer={true} />}
        ></Route>
        <Route
          path="/add-card-details"
          element={<AddCard image={signBgCust} customer={true} />}
        ></Route>
        <Route
          path="/sign-up/verify-otp"
          element={<OTPVerify image={signBgCust} customer={true} />}
        ></Route>
        <Route
          path="/profile"
          element={<Profile customer={true} />}></Route>

        {/* chef */}
        <Route
          path="/chef"
          element={<Chef customer={false} />}></Route>
        <Route
          path="/chef/terms-and-conditions"
          element={<TermsCondition customer={false} />}
        ></Route>
        <Route
          path="/chef/privacy-policy"
          element={<PrivacyPolicy customer={false} />}
        ></Route>
        <Route
          path="/chef/sign-in"
          element={<SignIn image={signBgChef} customer={false} />}
        ></Route>
        <Route
          path="/chef/sign-up"
          element={<SignUp image={signBgChef} customer={false} />}
        ></Route>
        <Route
          path="/chef/sign-up/verify-otp"
          element={<OTPVerify image={signBgChef} customer={false} />}
        ></Route>
        <Route
          path="/chef/add-payment-details"
          element={<PaymentDetail image={signBgChef} customer={false} />}
        ></Route>


        {/* PHASE 2 */}
        {/* CHEF */}
        <Route
          path="/chef/complete-profile"
          element={<ProfileChef customer={false} />}
        ></Route>
        <Route
          path="/chef/profile"
          element={
            isMobile ? <BrowseChefMobileProfile customer={false} /> : <BrowseChefProfile customer={false} />
          }
        ></Route>
        <Route
          path="/chef/profile/edit"
          element={
            <EditChefProfile customer={false} />
          }
        ></Route>
        <Route
          path="/chef/order-detail"
          element={<ChefOrderDetail customer={false} />}
        ></Route>
        <Route
          path="/chef/order-list"
          element={<OrderListChef customer={false} />}
        ></Route>
        <Route
          path="/chef/grocery-bill"
          element={<GroceryBill customer={false} />}
        ></Route>
        <Route
          path="/chef/grocery-bill/confirm"
          element={<GroceryBillConfirm customer={false} />}
        ></Route>
        <Route
          path="/chef/at-location"
          element={<AtLocation customer={false} />}
        ></Route>
        <Route
          path="/chef/at-location/confirm"
          element={<AtLocationConfirm customer={false} />}
        ></Route>
        <Route
          path="/chef/great-job"
          element={<GreatJob customer={false} />}
        ></Route>
        <Route
          path="/chef/not-interested"
          element={<NotInterested customer={false} />}
        ></Route>
        <Route
          path="/chef/order-detail/confirm"
          element={<ApproveOrderConfirm customer={false} />}
        ></Route>
        <Route
          path="/chef/message-list"
          element={<MessageList customer={false} />}
        ></Route>
        <Route
          path="/chef/grocery-camera"
          element={<GroceryCamera customer={false} />}
        ></Route>
        <Route
          path="/chef/message-view"
          element={<MessageDetail customer={false} />}
        ></Route>
        <Route
          path="/chef/forgot-password"
          element={<ForgotOTP customer={false} image={signBgChef} />}
        ></Route>
        <Route
          path="/chef/forgot-password/verify"
          element={<ForgotOTPVerify customer={false} image={signBgChef} />}
        ></Route>
        <Route
          path="/chef/reminder"
          element={<Reminder customer={false} />}
        ></Route>
        <Route
          path="/chef/order/cancel"
          element={<BookingDetailCancelChef customer={false} />}
        ></Route>

        {/* Customer */}
        <Route
          path="/forgot-password"
          element={<ForgotOTP customer={true} image={signBgCust} />}
        ></Route>
        <Route
          path="/forgot-password/verify"
          element={<ForgotOTPVerify customer={true} image={signBgCust} />}
        ></Route>
        <Route
          path="/message-list"
          element={<MessageList customer={true} />}
        ></Route>
        <Route
          path="/message-view"
          element={<MessageDetail customer={true} />}
        ></Route>
        <Route
          path="/chef-list"
          element={<ChefList customer={true} />}>
        </Route>
        <Route path="/browse-chef" element={<ChefDetail />}></Route>
        <Route
          path="/order-list"
          element={<OrderListCustomer customer={true} />}
        ></Route>
        <Route
          path="/order-detail"
          element={<OrderDetail customer={true} />}
        ></Route>
        <Route
          path="/booking-detail"
          element={<BookingPage1 />}
        ></Route>
        <Route
          path="/booking-detail-1"
          element={<BookingPage2 />}
        ></Route>
        <Route
          path="/booking-summary"
          element={<BookingPage3 />}
        ></Route>
        <Route
          path="/booking-detail/confirm"
          element={<BookRequestSent customer={true} />}
        ></Route>
        <Route
          path="/booking-detail/cancel"
          element={<BookingDetailCancel customer={true} />}
        ></Route>
        <Route
          path="/update-card-details"
          element={<UpdateCard customer={true} />}
        ></Route>
        <Route
          path="/add-new-card"
          element={<AddNewCard customer={true} />}
        ></Route>
        <Route
          path="/tip-amount"
          element={<TipAmount customer={true} />}
        ></Route>
        <Route
          path="/tip-amount/confirm"
          element={<TipAmountSent customer={true} />}
        ></Route>
        <Route
          path="/rate-chef"
          element={<ReviewToChef customer={true} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;

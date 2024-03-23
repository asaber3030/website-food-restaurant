<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Section;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AppController extends Controller {

  function __construct() {
    $this->middleware('verified');
  }

  public function performLogout() {
    Session::flush();
    Auth::logout();
    return redirect('login');
  }

  function home() {
    $user = Auth::user();
    return inertia('Welcome', [
      'sections' => Section::whereHas('sandwiches')->with('sandwiches')->get(),
      'user' => $user,
    ]);

  }

  function profile() {
    return inertia('Profile/Profile');
  }

  function addresses() {
    return inertia('Profile/Addresses', [
      'addresses' => Address::where('user', auth()->id())->get()
    ]);
  }

  function addAddress(Request $request) {
    $request->validate([
      'address' => 'required',
      'governorate' => 'required'
    ]);
    Address::create([
      'address' => $request->input('address'),
      'gove' => $request->input('governorate'),
      'user' => auth()->id()
    ]);

  }

  function deleteAddress(Request $request) {
    $address = Address::find($request->input('address'));
    if ($address->user === auth()->id()) {
      $address->delete();
    }
    return false;
  }

  function makeAddressMain(Request $request) {
    $address = Address::find($request->input('address'));
    if ($address->user == auth()->id()) {
      Address::where('user', $address->user)->update([
        'main' => 0
      ]);
      Address::where('id', $address->id)->update([
        'main' => 1
      ]);
    } else {
      return dd($address);
    }
  }

  function orders() {
    return inertia('Profile/Orders/List', [
      'orders' => Order::with([
        'coupon',
        'order_items' => fn($q) => $q->with('sandwich')
      ])->where('user', auth()->id())->orderBy('id', 'desc')->paginate(3)
    ]);
  }

  function viewOrder(Order $order) {
    if ($order->user == auth()->id()) {
      return inertia('Profile/Orders/ViewOrder', [
        'order' => Order::with([
          'coupon',
          'order_items' => fn ($q) => $q->with('sandwich', 'additions')
        ])->where('id', $order->id)->get()->first()
      ]);
    }
    return abort(403);
  }

  function cancelOrder(Order $order) {
    $order->forceDelete();
    $findX = Order::where('id', $order->id)->forceDelete();
    message('Ordered has been cancelled!');
    return redirect()->route('profile.orders.main');
  }

  function placeOrderView() {
    return inertia('Profile/Placeorder', [
      'currentUser' => User::with('addresses')->find(auth()->id()),
      'coupons' => Coupon::where('id', '!=', 1)->get()
    ]);
  }

  function placeOrderAction(Request $request) {

    $pendingOrder = Order::where('user', auth()->id())
      ->whereIn('status', [1, 2, 3])
      ->count();

    if ($pendingOrder == 1) {
      message('Cannot replace a new order right now! please wait for the current to arrive to you!');
      session()->flash('cart_success', false);
      return null;
    }

    $cart = $request->input('cart');
    $orderPrice = 0;
    $discountPrice = 0;
    $qtyAll = 0;

    $coupon = Coupon::where('code', $request->input('coupon'))->get()->first();

    foreach ($cart as $key => $item) {
      $orderPrice += ($item['unitPrice'] + $item['sizesPrice'] + $item['additionsPrice']) * $item['quantity'];
      $qtyAll += $item['quantity'];
    }

    $discountPrice = $coupon ? ($coupon->value / 100) * $orderPrice : $orderPrice;

    $order = Order::create([
      'user' => auth()->id(),
      'total_price' => $orderPrice,
      'total_items' => $qtyAll,
      'coupon' => $coupon ? $coupon->id : 1,
      'coupon_discount' => $discountPrice,
      'required_money' => $orderPrice - $discountPrice
    ]);

    $order->saveOrderItems($order->id, $cart);

    message('Order has been saved successfully! please wait patiently for about 45-60 mins to recieve your order!');
    session('cart_success', true);

    return redirect()->route('profile.orders.main');
  }
}

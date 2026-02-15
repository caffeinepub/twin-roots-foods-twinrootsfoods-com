import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
    email : ?Text;
    role : Text; // For display purposes
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Product = {
    name : Text;
    category : Text;
    description : Text;
    price : ?Nat;
    available : Bool;
    processPicture : ?Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };

    public func compareByCategory(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.category, p2.category);
    };
  };

  type OrderItem = {
    productId : Nat;
    name : Text;
    unitPrice : ?Nat;
    quantity : Nat;
  };

  type OrderStatus = {
    #pending;
    #processed;
    #shipped;
    #cancelled;
  };

  type Order = {
    orderId : Nat;
    customerName : Text;
    contactDetails : Text;
    shippingAddress : Text;
    items : [OrderItem];
    totalPrice : Nat;
    status : OrderStatus;
    createdAt : Time.Time;
  };

  type ExportInquiry = {
    inquiryId : Nat;
    companyName : Text;
    contactPerson : Text;
    email : Text;
    phone : Text;
    destinationCountry : Text;
    productsOfInterest : [Text];
    estimatedQuantity : Text;
    message : Text;
    submittedAt : Time.Time;
    englishTranslation : ?Text;
  };

  // Persistent state
  var nextProductId = 1;
  var nextOrderId = 1;
  var nextInquiryId = 1;

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let exportInquiries = Map.empty<Nat, ExportInquiry>();

  public shared ({ caller }) func createInitialCatalog() : async () {
    if (products.size() > 0) {
      return;
    };

    let initialProducts = [
      // Spices
      {
        name = "Turmeric Powder";
        category = "Spices";
        description = "High-quality turmeric powder for cooking";
        price = ?200;
        available = true;
        processPicture = ?"/images/product_processes/turmeric_powder.png";
      },
      {
        name = "Dhaniya Powder";
        category = "Spices";
        description = "Coriander (Dhaniya) powder for Indian cuisine";
        price = ?180;
        available = true;
        processPicture = ?"/images/product_processes/dhaniya_powder.png";
      },
      {
        name = "Chili Powder";
        category = "Spices";
        description = "Spicy chili powder for flavoring";
        price = ?150;
        available = true;
        processPicture = ?"/images/product_processes/chili_powder.png";
      },

      // Powders
      {
        name = "Onion Powder";
        category = "Powders";
        description = "Dehydrated onion powder for seasoning";
        price = ?220;
        available = true;
        processPicture = ?"/images/product_processes/onion_powder.png";
      },
      {
        name = "Ginger Powder";
        category = "Powders";
        description = "Ground ginger for cooking and tea";
        price = ?210;
        available = true;
        processPicture = ?"/images/product_processes/ginger_powder.png";
      },
      {
        name = "Garlic Powder";
        category = "Powders";
        description = "Flavorful garlic powder for culinary use";
        price = ?230;
        available = true;
        processPicture = ?"/images/product_processes/garlic_powder.png";
      },
      {
        name = "Tomato Powder";
        category = "Powders";
        description = "Concentrated tomato powder for sauces";
        price = ?250;
        available = true;
        processPicture = ?"/images/product_processes/tomato_powder.png";
      },
      {
        name = "Moringa Powder";
        category = "Powders";
        description = "Nutritious moringa leaf powder";
        price = ?300;
        available = true;
        processPicture = ?"/images/product_processes/moringa_powder.png";
      },

      // Dry Fruits (generic category)
      {
        name = "Dry Fruits";
        category = "Dry Fruits";
        description = "Variety of high-quality dry fruits for Snacks & Muesli";
        price = null;
        available = true;
        processPicture = ?"/images/product_processes/dry_fruits.png";
      },
    ];

    for (product in initialProducts.values()) {
      products.add(nextProductId, product);
      nextProductId += 1;
    };
  };

  // Public queries - No authorization needed (public catalog)
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filteredProducts = products.values().filter(
      func(p) { p.category == category }
    );
    filteredProducts.toArray();
  };

  public query ({ caller }) func getAvailableProducts() : async [Product] {
    let filteredProducts = products.values().filter(
      func(p) { p.available }
    );
    filteredProducts.toArray();
  };

  public query ({ caller }) func getProductCategories() : async [Text] {
    let categoriesSet = Map.empty<Text, Bool>();
    for (product in products.values()) {
      categoriesSet.add(product.category, true);
    };
    categoriesSet.keys().toArray();
  };

  // Order placement - Public (any customer can place orders)
  public shared ({ caller }) func placeOrder(
    customerName : Text,
    contactDetails : Text,
    shippingAddress : Text,
    items : [OrderItem]
  ) : async Nat {
    let totalPrice = items.foldLeft(
      0,
      func(sum, item) {
        switch (item.unitPrice) {
          case (null) { sum };
          case (?price) { sum + (price * item.quantity) };
        };
      },
    );

    let order : Order = {
      orderId = nextOrderId;
      customerName;
      contactDetails;
      shippingAddress;
      items;
      totalPrice;
      status = #pending;
      createdAt = Time.now();
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.orderId;
  };

  // Export inquiry submission - Public (any potential customer can submit)
  public shared ({ caller }) func submitExportInquiry(
    companyName : Text,
    contactPerson : Text,
    email : Text,
    phone : Text,
    destinationCountry : Text,
    productsOfInterest : [Text],
    estimatedQuantity : Text,
    message : Text,
    englishTranslation : ?Text
  ) : async Nat {
    let inquiry : ExportInquiry = {
      inquiryId = nextInquiryId;
      companyName;
      contactPerson;
      email;
      phone;
      destinationCountry;
      productsOfInterest;
      estimatedQuantity;
      message;
      submittedAt = Time.now();
      englishTranslation;
    };

    exportInquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.inquiryId;
  };

  // Admin-only: View all orders (Owner Dashboard)
  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  // Admin-only: View all export inquiries (Owner Dashboard)
  public query ({ caller }) func getAllExportInquiries() : async [ExportInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    exportInquiries.values().toArray();
  };

  // Admin-only: View specific order details
  public query ({ caller }) func getOrderById(orderId : Nat) : async Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view order details");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  // Admin-only: View specific inquiry details
  public query ({ caller }) func getExportInquiryById(inquiryId : Nat) : async ExportInquiry {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiry details");
    };
    switch (exportInquiries.get(inquiryId)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?inquiry) { inquiry };
    };
  };
};


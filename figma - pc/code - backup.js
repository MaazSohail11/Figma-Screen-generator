figma.showUI(__html__, { width: 400, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    
    const targetPage = figma.root.children.find(p => p.name === 'Web_HF') || figma.currentPage;
    const screens = [];
    const W = 1440;
    const H = 900;
    let x = 0;
    const G = 150;
    
    // COLOR SCHEME
    const C = {
      teal: {r: 0.24, g: 0.61, b: 0.61},
      darkTeal: {r: 0.17, g: 0.37, b: 0.37},
      yellow: {r: 0.96, g: 0.72, b: 0.26},
      red: {r: 0.91, g: 0.29, b: 0.24},
      white: {r: 1, g: 1, b: 1},
      text: {r: 0.2, g: 0.2, b: 0.2},
      lightBg: {r: 0.95, g: 0.95, b: 0.95},
      gray: {r: 0.7, g: 0.7, b: 0.7}
    };
    
    // HELPER FUNCTIONS (declared once)
    function btn(parent, name, x, y, w, h, color, text, fontSize) {
      const b = figma.createRectangle();
      b.name = name;
      b.resize(w, h);
      b.x = x;
      b.y = y;
      b.cornerRadius = 12;
      b.fills = [{type: 'SOLID', color: color}];
      parent.appendChild(b);
      
      if (text) {
        const t = figma.createText();
        t.fontName = { family: "Inter", style: "Bold" };
        t.characters = text;
        t.fontSize = fontSize;
        t.fills = [{type: 'SOLID', color: C.white}];
        t.textAlignHorizontal = "CENTER";
        t.textAlignVertical = "CENTER";
        t.x = x + w/2 - (text.length * fontSize * 0.3);
        t.y = y + h/2 - fontSize/2;
        parent.appendChild(t);
      }
      
      return b;
    }
    
    function txt(parent, text, x, y, size, color, style) {
      const t = figma.createText();
      t.fontName = { family: "Inter", style: style || "Regular" };
      t.characters = text;
      t.fontSize = size;
      t.fills = [{type: 'SOLID', color: color}];
      t.textAlignHorizontal = "LEFT";
      t.x = x;
      t.y = y;
      parent.appendChild(t);
      return t;
    }
    
    function card(parent, x, y, w, h, color) {
      const c = figma.createRectangle();
      c.resize(w, h);
      c.x = x;
      c.y = y;
      c.cornerRadius = 16;
      c.fills = [{type: 'SOLID', color: color}];
      parent.appendChild(c);
      return c;
    }
    
    function imgPlaceholder(parent, x, y, w, h, icon) {
      const img = figma.createRectangle();
      img.resize(w, h);
      img.x = x;
      img.y = y;
      img.cornerRadius = 16;
      img.fills = [{ type: 'SOLID', color: C.gray }];
      parent.appendChild(img);

      if (icon) {
        const iconTxt = figma.createText();
        iconTxt.fontName = { family: "Inter", style: "Bold" };
        iconTxt.characters = icon;
        iconTxt.fontSize = Math.min(w, h) * 0.4;
        iconTxt.fills = [{ type: 'SOLID', color: C.white }];
        iconTxt.textAlignHorizontal = "CENTER";
        iconTxt.textAlignVertical = "CENTER";
        iconTxt.x = x + w/2 - iconTxt.fontSize * 0.5;
        iconTxt.y = y + h/2 - iconTxt.fontSize / 2;
        parent.appendChild(iconTxt);
      }

      return img;
    }
    // Image loader helper
// REPLACE your img() function with this:
// CORRECTED img() function - replace your current one
async function img(parent, x, y, w, h, url) {
  try {
    // Fetch image and get the hash
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const imageHash = figma.createImage(uint8Array).hash;
    
    const imgRect = figma.createRectangle();
    imgRect.resize(w, h);
    imgRect.x = x;
    imgRect.y = y;
    imgRect.cornerRadius = 16;
    imgRect.fills = [{
      type: 'IMAGE',
      imageHash: imageHash,  // Now it's a string!
      scaleMode: 'FILL'
    }];
    parent.appendChild(imgRect);
    return imgRect;
  } catch (error) {
    console.log('Image failed to load:', url, error);
    // Gray fallback box
    const fallbackRect = figma.createRectangle();
    fallbackRect.resize(w, h);
    fallbackRect.x = x;
    fallbackRect.y = y;
    fallbackRect.cornerRadius = 16;
    fallbackRect.fills = [{type: 'SOLID', color: C.gray}];
    parent.appendChild(fallbackRect);
    return fallbackRect;
  }
}



    // Navigation Bar
    function navBar(parent, activeTab) {
      const header = figma.createRectangle();
      header.resize(W, 80);
      header.x = 0;
      header.y = 0;
      header.cornerRadius = 0;
      header.fills = [{type: 'SOLID', color: C.teal}];
      parent.appendChild(header);
      
      txt(parent, "BasKhao 🍕", 60, 28, 28, C.white, "Bold");
      
      const tabs = ["Home", "Restaurants", "Deals", "Orders", "Profile"];
      for (let i = 0; i < 5; i++) {
        const tabBtn = card(parent, 600 + (i * 150), 25, 130, 35, i === activeTab ? C.yellow : C.darkTeal);
        tabBtn.name = "NavTab" + i + "-CLICK";
        txt(parent, tabs[i], 620 + (i * 150), 32, 15, i === activeTab ? C.text : C.white, "Semi Bold");
      }
      
      const cartBtn = figma.createEllipse();
      cartBtn.name = "CartIcon-CLICK";
      cartBtn.resize(45, 45);
      cartBtn.x = W - 100;
      cartBtn.y = 18;
      cartBtn.fills = [{type: 'SOLID', color: C.yellow}];
      parent.appendChild(cartBtn);
      txt(parent, "🛒", cartBtn.x + 10, 27, 24, C.text, "Regular");
    }
    
    figma.notify('🚀 Generating web screens...');

    // SCREEN 1: Splash Screen
    const splash = figma.createFrame();
    splash.name = "WebSplash";
    splash.resize(W, H);
    splash.x = x;
    x += W + G;
    splash.fills = [{type: 'SOLID', color: C.teal}];
    targetPage.appendChild(splash);
    screens.push(splash);
    
    txt(splash, "BasKhao", W/2 - 180, H/2 - 80, 72, C.white, "Bold");
    txt(splash, "🍕", W/2 + 80, H/2 - 80, 72, C.yellow, "Bold");
    txt(splash, "Delicious food delivered to your door", W/2 - 280, H/2 + 30, 24, C.white, "Regular");
    btn(splash, "GetStarted-CLICK", W/2 - 120, H/2 + 120, 240, 60, C.yellow, "Get Started", 20);

    // SCREEN 2: Login
    const login = figma.createFrame();
    login.name = "WebLogin";
    login.resize(W, H);
    login.x = x;
    x += W + G;
    login.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(login);
    screens.push(login);
    
    navBar(login, -1);
    
    card(login, W/2 - 280, 180, 560, 520, C.lightBg);
    txt(login, "Welcome Back! 👋", W/2 - 150, 240, 32, C.text, "Bold");
    txt(login, "Login to continue", W/2 - 100, 290, 18, C.gray, "Regular");
    
    card(login, W/2 - 240, 350, 480, 55, C.white).name = "EmailInput";
    txt(login, "Email Address", W/2 - 220, 367, 16, C.gray, "Regular");
    
    card(login, W/2 - 240, 430, 480, 55, C.white).name = "PasswordInput";
    txt(login, "Password", W/2 - 220, 447, 16, C.gray, "Regular");
    
    btn(login, "ForgotPassword-CLICK", W/2 + 100, 505, 140, 30, C.white, "", 14);
    txt(login, "Forgot Password?", W/2 + 110, 512, 13, C.teal, "Regular");
    
    btn(login, "Login-CLICK", W/2 - 120, 560, 240, 58, C.teal, "Login", 20);
    
    txt(login, "Don't have an account?", W/2 - 120, 640, 15, C.gray, "Regular");
    btn(login, "SignupLink-CLICK", W/2 + 50, 635, 70, 25, C.white, "", 15);
    txt(login, "Sign Up", W/2 + 60, 640, 15, C.teal, "Bold");

    // SCREEN 3: Forgot Password
    const forgot = figma.createFrame();
    forgot.name = "WebForgotPassword";
    forgot.resize(W, H);
    forgot.x = x;
    x += W + G;
    forgot.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(forgot);
    screens.push(forgot);
    
    navBar(forgot, -1);
    
    card(forgot, W/2 - 280, 200, 560, 450, C.lightBg);
    txt(forgot, "Reset Password 🔐", W/2 - 150, 260, 32, C.text, "Bold");
    txt(forgot, "Enter your email to receive reset instructions", W/2 - 240, 315, 16, C.gray, "Regular");
    
    card(forgot, W/2 - 240, 380, 480, 55, C.white).name = "ResetEmailInput";
    txt(forgot, "Email Address", W/2 - 220, 397, 16, C.gray, "Regular");
    
    btn(forgot, "SendResetLink-CLICK", W/2 - 120, 470, 240, 58, C.teal, "Send Reset Link", 18);
    
    btn(forgot, "BackToLogin-CLICK", W/2 - 80, 560, 160, 40, C.white, "", 15);
    txt(forgot, "← Back to Login", W/2 - 70, 572, 15, C.teal, "Semi Bold");

    // SCREEN 4: Home Dashboard
const home = figma.createFrame();
home.name = "WebHome";
home.resize(W, H);
home.x = x;
x += W + G;
home.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(home);
screens.push(home);

navBar(home, 0);

card(home, 60, 120, W - 120, 200, C.teal);
txt(home, "Hungry? Order Now! 🍕", 100, 160, 36, C.white, "Bold");
txt(home, "Get your favorite food delivered in 30 minutes", 100, 210, 18, C.white, "Regular");
btn(home, "OrderNow-CLICK", 100, 260, 200, 50, C.yellow, "Order Now", 18);
await img(home, W - 380, 140, 280, 150, "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600");

const searchBar = card(home, 60, 360, W - 120, 60, C.lightBg);
searchBar.name = "SearchBar-CLICK";
txt(home, "🔍 Search restaurants, cuisines or dishes...", 90, 382, 18, C.gray, "Regular");

txt(home, "Browse by Category", 60, 460, 22, C.text, "Bold");
const categories = ["🍕 Pizza", "🍔 Burgers", "🍗 Chicken", "🥗 Salads", "🍜 Asian", "🌮 Mexican"];
for (let i = 0; i < 6; i++) {
  const catBtn = card(home, 60 + (i * 210), 510, 200, 55, C.teal);
  catBtn.name = "Category" + i + "-CLICK";
  txt(home, categories[i], 80 + (i * 210), 527, 16, C.white, "Semi Bold");
}

txt(home, "Popular Restaurants 🔥", 60, 610, 22, C.text, "Bold");
const restaurantsname = ["Pizza Palace", "Burger King", "Chicken Hub"];
const restaurantImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
  "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800"
];
for (let i = 0; i < 3; i++) {
  const restCard = card(home, 60 + (i * 440), 660, 420, 180, C.lightBg);
  restCard.name = "Restaurant" + i + "-CLICK";
  await img(home, 70 + (i * 440), 670, 400, 110, restaurantImages[i]);
  txt(home, restaurantsname[i], 80 + (i * 440), 795, 18, C.text, "Bold");
  txt(home, "⭐ 4.5 • 25-35 min", 80 + (i * 440), 820, 14, C.gray, "Regular");
}

    // SCREEN 5: Signup
    const signup = figma.createFrame();
    signup.name = "WebSignup";
    signup.resize(W, H);
    signup.x = x;
    x += W + G;
    signup.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(signup);
    screens.push(signup);
    
    navBar(signup, -1);
    
    card(signup, W/2 - 280, 140, 560, 620, C.lightBg);
    txt(signup, "Create Account 🎉", W/2 - 150, 200, 32, C.text, "Bold");
    txt(signup, "Sign up to get started", W/2 - 110, 250, 18, C.gray, "Regular");
    
    card(signup, W/2 - 240, 300, 480, 55, C.white).name = "FullNameInput";
    txt(signup, "Full Name", W/2 - 220, 317, 16, C.gray, "Regular");
    
    card(signup, W/2 - 240, 375, 480, 55, C.white).name = "EmailSignupInput";
    txt(signup, "Email Address", W/2 - 220, 392, 16, C.gray, "Regular");
    
    card(signup, W/2 - 240, 450, 480, 55, C.white).name = "PhoneInput";
    txt(signup, "Phone Number", W/2 - 220, 467, 16, C.gray, "Regular");
    
    card(signup, W/2 - 240, 525, 480, 55, C.white).name = "PasswordSignupInput";
    txt(signup, "Password", W/2 - 220, 542, 16, C.gray, "Regular");
    
    card(signup, W/2 - 240, 600, 480, 55, C.white).name = "ConfirmPasswordInput";
    txt(signup, "Confirm Password", W/2 - 220, 617, 16, C.gray, "Regular");
    
    btn(signup, "Signup-CLICK", W/2 - 120, 680, 240, 58, C.teal, "Sign Up", 20);
    
    txt(signup, "Already have an account?", W/2 - 120, 760, 15, C.gray, "Regular");
    btn(signup, "LoginLink-CLICK", W/2 + 60, 755, 60, 25, C.white, "", 15);
    txt(signup, "Login", W/2 + 70, 760, 15, C.teal, "Bold");

   // SCREEN 6: Restaurant Listing Page
const restaurants = figma.createFrame();
restaurants.name = "WebRestaurants";
restaurants.resize(W, H);
restaurants.x = x;
x += W + G;
restaurants.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(restaurants);
screens.push(restaurants);

navBar(restaurants, 1);

txt(restaurants, "All Restaurants 🍽️", 60, 120, 28, C.text, "Bold");

const filterBar = card(restaurants, 60, 170, W - 120, 60, C.lightBg);
btn(restaurants, "FilterCuisine-CLICK", 80, 185, 150, 30, C.white, "Cuisine ▾", 14);
btn(restaurants, "FilterRating-CLICK", 250, 185, 150, 30, C.white, "Rating ▾", 14);
btn(restaurants, "FilterDelivery-CLICK", 420, 185, 180, 30, C.white, "Delivery Time ▾", 14);
btn(restaurants, "FilterPrice-CLICK", 620, 185, 150, 30, C.white, "Price ▾", 14);

const restList = ["Golden Spoon", "Taste Buds", "Food Factory", "Grill Masters", "Fresh Bites", "Royal Kitchen"];
const restImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400"
];
for (let i = 0; i < 6; i++) {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const restCard = card(restaurants, 60 + (col * 660), 270 + (row * 190), 640, 170, C.lightBg);
  restCard.name = "RestaurantDetail" + i + "-CLICK";
  await img(restaurants, 75 + (col * 660), 285 + (row * 190), 200, 140, restImages[i]);
  txt(restaurants, restList[i], 295 + (col * 660), 295 + (row * 190), 22, C.text, "Bold");
  txt(restaurants, "⭐ 4." + (i + 3) + " • 20-30 min • $$$", 295 + (col * 660), 330 + (row * 190), 15, C.gray, "Regular");
  txt(restaurants, "Italian, Pizza, Pasta, Desserts", 295 + (col * 660), 360 + (row * 190), 14, C.gray, "Regular");
  btn(restaurants, "ViewMenu" + i + "-CLICK", 295 + (col * 660), 395 + (row * 190), 140, 40, C.teal, "View Menu", 15);
  btn(restaurants, "AddToFav" + i + "-CLICK", 650 + (col * 660), 295 + (row * 190), 35, 35, C.yellow, "♥", 18);
}


// SCREEN 7: Restaurant Detail Page
const restDetail = figma.createFrame();
restDetail.name = "WebRestaurantDetail";
restDetail.resize(W, H);
restDetail.x = x;
x += W + G;
restDetail.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(restDetail);
screens.push(restDetail);

navBar(restDetail, 1);

await img(restDetail, 60, 120, W - 120, 250, "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200");

txt(restDetail, "Pizza Palace", 60, 400, 32, C.text, "Bold");
txt(restDetail, "⭐ 4.8 (2,540 reviews) • Italian, Pizza • $$ • 25-35 min", 60, 445, 16, C.gray, "Regular");

btn(restDetail, "FavoriteRest-CLICK", W - 200, 405, 140, 45, C.yellow, "♥ Favorite", 16);

card(restDetail, 60, 490, W - 120, 80, C.lightBg);
txt(restDetail, "📍 123 Main Street, Downtown", 90, 508, 16, C.text, "Regular");
txt(restDetail, "🕒 Open: 10:00 AM - 11:00 PM", 90, 538, 16, C.text, "Regular");

txt(restDetail, "Menu Categories", 60, 600, 24, C.text, "Bold");
const menuCats = ["Popular", "Pizza", "Pasta", "Salads", "Beverages", "Desserts"];
for (let i = 0; i < 6; i++) {
  const catBtn = card(restDetail, 60 + (i * 210), 645, 200, 45, i === 0 ? C.teal : C.lightBg);
  catBtn.name = "MenuCat" + i + "-CLICK";
  txt(restDetail, menuCats[i], 80 + (i * 210), 659, 16, i === 0 ? C.white : C.text, "Semi Bold");
}

txt(restDetail, "Popular Items", 60, 720, 20, C.text, "Bold");
const menuItemImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200",
  "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200"
];
for (let i = 0; i < 3; i++) {
  const itemCard = card(restDetail, 60 + (i * 440), 760, 420, 120, C.lightBg);
  itemCard.name = "MenuItem" + i + "-CLICK";
  await img(restDetail, 75 + (i * 440), 770, 100, 100, menuItemImages[i]);
  txt(restDetail, i === 0 ? "Margherita" : i === 1 ? "Alfredo Pasta" : "Caesar Salad", 190 + (i * 440), 775, 18, C.text, "Bold");
  txt(restDetail, "$" + (12 + i * 2) + ".99", 190 + (i * 440), 805, 16, C.teal, "Bold");
  btn(restDetail, "AddItem" + i + "-CLICK", 190 + (i * 440), 835, 120, 35, C.teal, "+ Add", 14);
}

   // SCREEN 8: Menu Item Detail
const itemDetail = figma.createFrame();
itemDetail.name = "WebItemDetail";
itemDetail.resize(W, H);
itemDetail.x = x;
x += W + G;
itemDetail.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(itemDetail);
screens.push(itemDetail);

navBar(itemDetail, -1);

btn(itemDetail, "BackToMenu-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

card(itemDetail, W/2 - 400, 180, 800, 600, C.lightBg);
await img(itemDetail, W/2 - 380, 200, 360, 300, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600");

txt(itemDetail, "Margherita Pizza", W/2 + 20, 220, 28, C.text, "Bold");
txt(itemDetail, "⭐ 4.9 (850 reviews)", W/2 + 20, 260, 15, C.gray, "Regular");
txt(itemDetail, "$12.99", W/2 + 20, 295, 24, C.teal, "Bold");

txt(itemDetail, "Fresh tomatoes, mozzarella cheese,", W/2 + 20, 340, 16, C.text, "Regular");
txt(itemDetail, "basil, and olive oil on crispy crust", W/2 + 20, 365, 16, C.text, "Regular");

txt(itemDetail, "Size", W/2 + 20, 410, 18, C.text, "Bold");
btn(itemDetail, "SizeSmall-CLICK", W/2 + 20, 440, 100, 40, C.teal, "Small", 14);
btn(itemDetail, "SizeMedium-CLICK", W/2 + 140, 440, 100, 40, C.lightBg, "Medium", 14);
btn(itemDetail, "SizeLarge-CLICK", W/2 + 260, 440, 100, 40, C.lightBg, "Large", 14);

txt(itemDetail, "Add-ons", W/2 + 20, 500, 18, C.text, "Bold");
const addons = ["Extra Cheese +$2", "Olives +$1.5", "Mushrooms +$1.5"];
for (let i = 0; i < 3; i++) {
  card(itemDetail, W/2 + 20 + (i * 180), 530, 160, 40, C.lightBg).name = "Addon" + i + "-CLICK";
  txt(itemDetail, addons[i], W/2 + 35 + (i * 180), 543, 13, C.text, "Regular");
}

txt(itemDetail, "Quantity", W/2 + 20, 590, 18, C.text, "Bold");
btn(itemDetail, "QtyMinus-CLICK", W/2 + 20, 620, 50, 50, C.lightBg, "−", 24);
card(itemDetail, W/2 + 85, 620, 70, 50, C.white);
txt(itemDetail, "1", W/2 + 110, 634, 20, C.text, "Bold");
btn(itemDetail, "QtyPlus-CLICK", W/2 + 170, 620, 50, 50, C.teal, "+", 24);

btn(itemDetail, "AddToCart-CLICK", W/2 + 20, 700, 340, 55, C.teal, "Add to Cart - $12.99", 18);


// SCREEN 9: Cart Page
const cart = figma.createFrame();
cart.name = "WebCart";
cart.resize(W, H);
cart.x = x;
x += W + G;
cart.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(cart);
screens.push(cart);

navBar(cart, -1);

txt(cart, "Your Cart 🛒", 60, 120, 28, C.text, "Bold");
txt(cart, "3 items", 60, 160, 16, C.gray, "Regular");

const cartItemImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200",
  "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200"
];
for (let i = 0; i < 3; i++) {
  const cartCard = card(cart, 60, 210 + (i * 130), 840, 110, C.lightBg);
  await img(cart, 80, 225 + (i * 130), 80, 80, cartItemImages[i]);
  txt(cart, i === 0 ? "Margherita Pizza" : i === 1 ? "Alfredo Pasta" : "Coke", 180, 235 + (i * 130), 18, C.text, "Bold");
  txt(cart, "Size: " + (i === 0 ? "Small" : "Medium"), 180, 265 + (i * 130), 14, C.gray, "Regular");
  txt(cart, "$" + (i === 0 ? "12.99" : i === 1 ? "14.99" : "2.99"), 180, 285 + (i * 130), 16, C.teal, "Bold");
  
  btn(cart, "CartQtyMinus" + i + "-CLICK", 700, 245 + (i * 130), 35, 35, C.lightBg, "−", 18);
  txt(cart, "1", 750, 254 + (i * 130), 16, C.text, "Bold");
  btn(cart, "CartQtyPlus" + i + "-CLICK", 780, 245 + (i * 130), 35, 35, C.teal, "+", 18);
  btn(cart, "RemoveItem" + i + "-CLICK", 840, 245 + (i * 130), 40, 40, C.red, "×", 20);
}

card(cart, 960, 210, 420, 350, C.lightBg);
txt(cart, "Order Summary", 995, 235, 20, C.text, "Bold");

txt(cart, "Subtotal", 995, 285, 16, C.text, "Regular");
txt(cart, "$30.97", 1280, 285, 16, C.text, "Regular");

txt(cart, "Delivery Fee", 995, 320, 16, C.text, "Regular");
txt(cart, "$3.00", 1280, 320, 16, C.text, "Regular");

txt(cart, "Service Fee", 995, 355, 16, C.text, "Regular");
txt(cart, "$2.50", 1280, 355, 16, C.text, "Regular");

const divider = figma.createLine();
divider.resize(380, 0);
divider.x = 995;
divider.y = 390;
divider.strokes = [{type: 'SOLID', color: C.gray}];
cart.appendChild(divider);

txt(cart, "Total", 995, 405, 18, C.text, "Bold");
txt(cart, "$36.47", 1270, 405, 20, C.teal, "Bold");

btn(cart, "Checkout-CLICK", 980, 480, 380, 60, C.teal, "Proceed to Checkout", 18);


    // SCREEN 10: Checkout Page
    const checkout = figma.createFrame();
    checkout.name = "WebCheckout";
    checkout.resize(W, H);
    checkout.x = x;
    x += W + G;
    checkout.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(checkout);
    screens.push(checkout);
    
    navBar(checkout, -1);
    
    txt(checkout, "Checkout 📦", 60, 120, 28, C.text, "Bold");
    
    card(checkout, 60, 180, 840, 620, C.lightBg);
    
    txt(checkout, "Delivery Address", 90, 210, 20, C.text, "Bold");
    card(checkout, 90, 250, 780, 70, C.white).name = "AddressInput";
    txt(checkout, "123 Main St, Apt 4B, City, ZIP", 110, 272, 16, C.gray, "Regular");
    btn(checkout, "ChangeAddress-CLICK", 710, 265, 140, 40, C.teal, "Change", 14);
    
    txt(checkout, "Contact Number", 90, 350, 20, C.text, "Bold");
    card(checkout, 90, 390, 780, 60, C.white).name = "PhoneInput";
    txt(checkout, "+1 (555) 123-4567", 110, 410, 16, C.gray, "Regular");
    
    txt(checkout, "Delivery Instructions", 90, 480, 20, C.text, "Bold");
    card(checkout, 90, 520, 780, 100, C.white).name = "InstructionsInput";
    txt(checkout, "Leave at door, ring bell twice...", 110, 550, 15, C.gray, "Regular");
    
    txt(checkout, "Payment Method", 90, 650, 20, C.text, "Bold");
    btn(checkout, "PaymentCard-CLICK", 90, 690, 250, 50, C.teal, "💳 Card", 16);
    btn(checkout, "PaymentCash-CLICK", 360, 690, 250, 50, C.lightBg, "💵 Cash", 16);
    btn(checkout, "PaymentWallet-CLICK", 630, 690, 250, 50, C.lightBg, "👛 Wallet", 16);
    
    card(checkout, 960, 180, 420, 420, C.lightBg);
    txt(checkout, "Order Summary", 995, 210, 20, C.text, "Bold");
    txt(checkout, "3 items from Pizza Palace", 995, 250, 14, C.gray, "Regular");
    
    txt(checkout, "Subtotal", 995, 300, 16, C.text, "Regular");
    txt(checkout, "$30.97", 1280, 300, 16, C.text, "Regular");
    
    txt(checkout, "Delivery", 995, 335, 16, C.text, "Regular");
    txt(checkout, "$3.00", 1280, 335, 16, C.text, "Regular");
    
    txt(checkout, "Total", 995, 380, 18, C.text, "Bold");
    txt(checkout, "$36.47", 1270, 380, 20, C.teal, "Bold");
    
    btn(checkout, "PlaceOrder-CLICK", 980, 470, 380, 60, C.teal, "Place Order", 20);
    
    txt(checkout, "Estimated delivery: 25-35 min", 1010, 550, 14, C.gray, "Regular");

    // SCREEN 11: Order Confirmation
    const orderConfirm = figma.createFrame();
    orderConfirm.name = "WebOrderConfirmation";
    orderConfirm.resize(W, H);
    orderConfirm.x = x;
    x += W + G;
    orderConfirm.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(orderConfirm);
    screens.push(orderConfirm);
    
    navBar(orderConfirm, -1);
    
    card(orderConfirm, W/2 - 350, 180, 700, 550, C.lightBg);
    
    const checkmark = figma.createEllipse();
    checkmark.resize(100, 100);
    checkmark.x = W/2 - 50;
    checkmark.y = 230;
    checkmark.fills = [{type: 'SOLID', color: C.teal}];
    orderConfirm.appendChild(checkmark);
    txt(orderConfirm, "✓", W/2 - 20, 255, 60, C.white, "Bold");
    
    txt(orderConfirm, "Order Placed Successfully!", W/2 - 190, 360, 28, C.text, "Bold");
    txt(orderConfirm, "Order #12345", W/2 - 80, 410, 18, C.gray, "Regular");
    
    txt(orderConfirm, "Your order has been confirmed and will", W/2 - 230, 460, 16, C.text, "Regular");
    txt(orderConfirm, "be delivered in 25-35 minutes", W/2 - 160, 485, 16, C.text, "Regular");
    
    btn(orderConfirm, "TrackOrder-CLICK", W/2 - 180, 540, 360, 55, C.teal, "Track Order", 18);
    btn(orderConfirm, "BackToHome-CLICK", W/2 - 150, 620, 300, 50, C.lightBg, "Back to Home", 16);

    // SCREEN 12: Order Tracking
    const tracking = figma.createFrame();
    tracking.name = "WebOrderTracking";
    tracking.resize(W, H);
    tracking.x = x;
    x += W + G;
    tracking.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(tracking);
    screens.push(tracking);
    
    navBar(tracking, 3);
    
    txt(tracking, "Track Order #12345", 60, 120, 28, C.text, "Bold");
    txt(tracking, "Estimated arrival: 20 minutes", 60, 165, 16, C.gray, "Regular");
    
    card(tracking, 60, 210, 840, 600, C.lightBg);
    
    const trackSteps = [
      {label: "Order Placed", time: "2:30 PM", done: true},
      {label: "Restaurant Confirmed", time: "2:32 PM", done: true},
      {label: "Preparing Food", time: "2:35 PM", done: true},
      {label: "Out for Delivery", time: "2:50 PM", done: false},
      {label: "Delivered", time: "3:00 PM", done: false}
    ];
    
    for (let i = 0; i < 5; i++) {
      const step = trackSteps[i];
      const yPos = 260 + (i * 110);
      
      const circle = figma.createEllipse();
      circle.resize(40, 40);
      circle.x = 100;
      circle.y = yPos;
      circle.fills = [{type: 'SOLID', color: step.done ? C.teal : C.gray}];
      tracking.appendChild(circle);
      
      txt(tracking, step.done ? "✓" : String(i + 1), 110, yPos + 8, 20, C.white, "Bold");
      
      if (i < 4) {
        const line = figma.createLine();
        line.resize(0, 70);
        line.x = 120;
        line.y = yPos + 40;
        line.strokes = [{type: 'SOLID', color: step.done ? C.teal : C.gray}];
        line.strokeWeight = 3;
        tracking.appendChild(line);
      }
      
      txt(tracking, step.label, 160, yPos + 5, 18, C.text, "Bold");
      txt(tracking, step.time, 160, yPos + 30, 14, C.gray, "Regular");
    }
    
    card(tracking, 960, 210, 420, 450, C.lightBg);
    txt(tracking, "Delivery Details", 995, 240, 20, C.text, "Bold");
    
    imgPlaceholder(tracking, 995, 285, 100, 100, "👤");
    txt(tracking, "John Driver", 1115, 300, 18, C.text, "Bold");
    txt(tracking, "⭐ 4.9 (1,200 trips)", 1115, 330, 14, C.gray, "Regular");
    btn(tracking, "CallDriver-CLICK", 1115, 350, 140, 40, C.teal, "📞 Call", 14);
    
    txt(tracking, "Vehicle: Honda Civic (ABC-123)", 995, 420, 14, C.text, "Regular");
    txt(tracking, "Delivery to:", 995, 455, 16, C.text, "Bold");
    txt(tracking, "123 Main St, Apt 4B", 995, 480, 14, C.gray, "Regular");
    
    btn(tracking, "CancelOrder-CLICK", 980, 570, 380, 50, C.red, "Cancel Order", 16);

    // SCREEN 13: Deals Page
    const deals = figma.createFrame();
    deals.name = "WebDeals";
    deals.resize(W, H);
    deals.x = x;
    x += W + G;
    deals.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(deals);
    screens.push(deals);
    
    navBar(deals, 2);
    
    txt(deals, "Special Deals & Offers 🎉", 60, 120, 28, C.text, "Bold");
    
    const dealCards = [
      {title: "50% OFF", desc: "On your first order", code: "FIRST50"},
      {title: "Free Delivery", desc: "Orders above $25", code: "FREEDEL"},
      {title: "Buy 1 Get 1", desc: "On selected pizzas", code: "BOGO"},
      {title: "20% OFF", desc: "Weekend special", code: "WEEKEND20"},
      {title: "$5 OFF", desc: "Minimum order $30", code: "SAVE5"},
      {title: "30% OFF", desc: "Lunch deals 12-3PM", code: "LUNCH30"}
    ];
    
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const dealCard = card(deals, 60 + (col * 660), 190 + (row * 210), 640, 190, C.teal);
      dealCard.name = "Deal" + i + "-CLICK";
      
      txt(deals, dealCards[i].title, 90 + (col * 660), 225 + (row * 210), 32, C.white, "Bold");
      txt(deals, dealCards[i].desc, 90 + (col * 660), 270 + (row * 210), 18, C.white, "Regular");
      
      card(deals, 90 + (col * 660), 315 + (row * 210), 200, 40, C.white);
      txt(deals, dealCards[i].code, 110 + (col * 660), 326 + (row * 210), 16, C.teal, "Bold");
      
      btn(deals, "ApplyDeal" + i + "-CLICK", 520 + (col * 660), 315 + (row * 210), 140, 40, C.yellow, "Apply", 16);
    }

    // SCREEN 14: Orders History
const orders = figma.createFrame();
orders.name = "WebOrders";
orders.resize(W, H);
orders.x = x;
x += W + G;
orders.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(orders);
screens.push(orders);

navBar(orders, 3);

txt(orders, "Your Orders 📋", 60, 120, 28, C.text, "Bold");

btn(orders, "FilterActive-CLICK", 60, 170, 150, 45, C.teal, "Active", 16);
btn(orders, "FilterPast-CLICK", 230, 170, 150, 45, C.lightBg, "Past Orders", 16);

const orderImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200",
  "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200"
];
for (let i = 0; i < 5; i++) {
  const orderCard = card(orders, 60, 245 + (i * 130), W - 120, 110, C.lightBg);
  orderCard.name = "OrderDetail" + i + "-CLICK";
  
  await img(orders, 80, 260 + (i * 130), 80, 80, orderImages[i]);
  
  txt(orders, "Order #1234" + (5 - i), 180, 265 + (i * 130), 18, C.text, "Bold");
  txt(orders, "Pizza Palace • 3 items", 180, 295 + (i * 130), 14, C.gray, "Regular");
  txt(orders, "$36.47 • Jan " + (10 + i) + ", 2025", 180, 320 + (i * 130), 14, C.gray, "Regular");
  
  const status = i === 0 ? "Delivered" : "Preparing";
  const statusColor = i === 0 ? C.teal : C.yellow;
  card(orders, W - 280, 275 + (i * 130), 120, 35, statusColor);
  txt(orders, status, W - 255, 284 + (i * 130), 14, C.white, "Bold");
  
  btn(orders, "Reorder" + i + "-CLICK", W - 280, 315 + (i * 130), 120, 35, C.teal, "Reorder", 14);
  btn(orders, "ViewDetails" + i + "-CLICK", W - 140, 315 + (i * 130), 120, 35, C.lightBg, "Details", 14);
}

    // SCREEN 15: Profile Page
    const profile = figma.createFrame();
    profile.name = "WebProfile";
    profile.resize(W, H);
    profile.x = x;
    x += W + G;
    profile.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(profile);
    screens.push(profile);
    
    navBar(profile, 4);
    
    card(profile, 60, 120, 420, 720, C.lightBg);
    
    const avatar = figma.createEllipse();
    avatar.resize(120, 120);
    avatar.x = 210;
    avatar.y = 160;
    avatar.fills = [{type: 'SOLID', color: C.teal}];
    profile.appendChild(avatar);
    txt(profile, "👤", 240, 185, 60, C.white, "Bold");
    
    txt(profile, "Sarah Johnson", 180, 300, 24, C.text, "Bold");
    txt(profile, "sarah.j@email.com", 165, 335, 15, C.gray, "Regular");
    
    btn(profile, "EditProfile-CLICK", 160, 375, 160, 45, C.teal, "Edit Profile", 15);
    
    const menuItems = [
      {icon: "📍", text: "Manage Addresses"},
      {icon: "💳", text: "Payment Methods"},
      {icon: "🎁", text: "Rewards & Credits"},
      {icon: "🔔", text: "Notifications"},
      {icon: "⚙️", text: "Settings"},
      {icon: "❓", text: "Help & Support"},
      {icon: "🚪", text: "Logout"}
    ];
    
    for (let i = 0; i < 7; i++) {
      const menuBtn = card(profile, 85, 450 + (i * 65), 370, 55, C.white);
      menuBtn.name = "ProfileMenu" + i + "-CLICK";
      txt(profile, menuItems[i].icon, 105, 463 + (i * 65), 20, C.text, "Regular");
      txt(profile, menuItems[i].text, 150, 466 + (i * 65), 16, C.text, "Regular");
      txt(profile, "›", 425, 466 + (i * 65), 20, C.gray, "Regular");
    }
    
    card(profile, 540, 120, 840, 720, C.lightBg);
    txt(profile, "Account Statistics", 575, 155, 24, C.text, "Bold");
    
    const stats = [
      {label: "Total Orders", value: "47", icon: "📦"},
      {label: "Money Spent", value: "$1,234", icon: "💰"},
      {label: "Favorite Restaurant", value: "Pizza Palace", icon: "⭐"},
      {label: "Member Since", value: "Jan 2024", icon: "📅"}
    ];
    
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const statCard = card(profile, 560 + (col * 410), 220 + (row * 140), 390, 120, C.white);
      txt(profile, stats[i].icon, 585 + (col * 410), 245 + (row * 140), 32, C.text, "Regular");
      txt(profile, stats[i].label, 640 + (col * 410), 248 + (row * 140), 16, C.gray, "Regular");
      txt(profile, stats[i].value, 640 + (col * 410), 278 + (row * 140), 24, C.text, "Bold");
    }
    
    txt(profile, "Recent Activity", 575, 520, 22, C.text, "Bold");
    for (let i = 0; i < 4; i++) {
      card(profile, 560, 570 + (i * 65), 800, 55, C.white);
      txt(profile, "Ordered from Pizza Palace", 585, 583 + (i * 65), 15, C.text, "Regular");
      txt(profile, "2 hours ago", 1250, 583 + (i * 65), 14, C.gray, "Regular");
    }

    // SCREEN 16: Edit Profile
    const editProfile = figma.createFrame();
    editProfile.name = "WebEditProfile";
    editProfile.resize(W, H);
    editProfile.x = x;
    x += W + G;
    editProfile.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(editProfile);
    screens.push(editProfile);
    
    navBar(editProfile, 4);
    
    btn(editProfile, "BackToProfile-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(editProfile, W/2 - 350, 180, 700, 600, C.lightBg);
    txt(editProfile, "Edit Profile", W/2 - 80, 220, 28, C.text, "Bold");
    
    const editAvatar = figma.createEllipse();
    editAvatar.resize(100, 100);
    editAvatar.x = W/2 - 50;
    editAvatar.y = 280;
    editAvatar.fills = [{type: 'SOLID', color: C.teal}];
    editProfile.appendChild(editAvatar);
    txt(editProfile, "👤", W/2 - 20, 305, 50, C.white, "Bold");
    
    btn(editProfile, "ChangePhoto-CLICK", W/2 - 70, 395, 140, 35, C.yellow, "Change Photo", 13);
    
    txt(editProfile, "Full Name", W/2 - 280, 460, 16, C.text, "Bold");
    card(editProfile, W/2 - 280, 490, 560, 55, C.white).name = "EditNameInput";
    txt(editProfile, "Sarah Johnson", W/2 - 260, 507, 16, C.gray, "Regular");
    
    txt(editProfile, "Email", W/2 - 280, 570, 16, C.text, "Bold");
    card(editProfile, W/2 - 280, 600, 560, 55, C.white).name = "EditEmailInput";
    txt(editProfile, "sarah.j@email.com", W/2 - 260, 617, 16, C.gray, "Regular");
    
    txt(editProfile, "Phone Number", W/2 - 280, 680, 16, C.text, "Bold");
    card(editProfile, W/2 - 280, 710, 560, 55, C.white).name = "EditPhoneInput";
    txt(editProfile, "+1 (555) 123-4567", W/2 - 260, 727, 16, C.gray, "Regular");
    
    btn(editProfile, "SaveProfile-CLICK", W/2 - 120, 810, 240, 55, C.teal, "Save Changes", 18);

    // SCREEN 17: Manage Addresses
    const addresses = figma.createFrame();
    addresses.name = "WebAddresses";
    addresses.resize(W, H);
    addresses.x = x;
    x += W + G;
    addresses.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(addresses);
    screens.push(addresses);
    
    navBar(addresses, 4);
    
    btn(addresses, "BackToProfile2-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(addresses, "Saved Addresses 📍", 60, 190, 28, C.text, "Bold");
    btn(addresses, "AddNewAddress-CLICK", W - 280, 185, 220, 50, C.teal, "+ Add New Address", 16);
    
    const addressList = [
      {label: "Home", addr: "123 Main St, Apt 4B, Downtown", default: true},
      {label: "Work", addr: "456 Business Ave, Suite 200, Uptown", default: false},
      {label: "Other", addr: "789 Park Lane, City Center", default: false}
    ];
    
    for (let i = 0; i < 3; i++) {
      const addrCard = card(addresses, 60, 270 + (i * 150), W - 120, 130, C.lightBg);
      
      txt(addresses, addressList[i].label + (addressList[i].default ? " (Default)" : ""), 90, 295 + (i * 150), 20, C.text, "Bold");
      txt(addresses, "📍 " + addressList[i].addr, 90, 330 + (i * 150), 16, C.gray, "Regular");
      
      btn(addresses, "EditAddress" + i + "-CLICK", 90, 365 + (i * 150), 120, 35, C.teal, "Edit", 14);
      btn(addresses, "DeleteAddress" + i + "-CLICK", 230, 365 + (i * 150), 120, 35, C.red, "Delete", 14);
      
      if (!addressList[i].default) {
        btn(addresses, "SetDefault" + i + "-CLICK", W - 320, 365 + (i * 150), 180, 35, C.yellow, "Set as Default", 14);
      }
    }

    // SCREEN 18: Add New Address
    const addAddress = figma.createFrame();
    addAddress.name = "WebAddAddress";
    addAddress.resize(W, H);
    addAddress.x = x;
    x += W + G;
    addAddress.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(addAddress);
    screens.push(addAddress);
    
    navBar(addAddress, 4);
    
    btn(addAddress, "BackToAddresses-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(addAddress, W/2 - 400, 180, 800, 640, C.lightBg);
    txt(addAddress, "Add New Address", W/2 - 140, 220, 28, C.text, "Bold");
    
    txt(addAddress, "Address Label", W/2 - 340, 290, 16, C.text, "Bold");
    btn(addAddress, "LabelHome-CLICK", W/2 - 340, 320, 120, 45, C.teal, "🏠 Home", 14);
    btn(addAddress, "LabelWork-CLICK", W/2 - 200, 320, 120, 45, C.lightBg, "💼 Work", 14);
    btn(addAddress, "LabelOther-CLICK", W/2 - 60, 320, 120, 45, C.lightBg, "📍 Other", 14);
    
    txt(addAddress, "Street Address", W/2 - 340, 395, 16, C.text, "Bold");
    card(addAddress, W/2 - 340, 425, 680, 55, C.white).name = "StreetInput";
    txt(addAddress, "Enter street address", W/2 - 320, 442, 15, C.gray, "Regular");
    
    txt(addAddress, "Apartment / Suite", W/2 - 340, 505, 16, C.text, "Bold");
    card(addAddress, W/2 - 340, 535, 680, 55, C.white).name = "AptInput";
    txt(addAddress, "Apt, suite, building (optional)", W/2 - 320, 552, 15, C.gray, "Regular");
    
    txt(addAddress, "City", W/2 - 340, 615, 16, C.text, "Bold");
    card(addAddress, W/2 - 340, 645, 320, 55, C.white).name = "CityInput";
    txt(addAddress, "City", W/2 - 320, 662, 15, C.gray, "Regular");
    
    txt(addAddress, "ZIP Code", W/2 + 20, 615, 16, C.text, "Bold");
    card(addAddress, W/2 + 20, 645, 320, 55, C.white).name = "ZipInput";
    txt(addAddress, "ZIP Code", W/2 + 40, 662, 15, C.gray, "Regular");
    
    btn(addAddress, "SaveAddress-CLICK", W/2 - 120, 745, 240, 55, C.teal, "Save Address", 18);

    // SCREEN 19: Payment Methods
    const payments = figma.createFrame();
    payments.name = "WebPayments";
    payments.resize(W, H);
    payments.x = x;
    x += W + G;
    payments.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(payments);
    screens.push(payments);
    
    navBar(payments, 4);
    
    btn(payments, "BackToProfile3-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(payments, "Payment Methods 💳", 60, 190, 28, C.text, "Bold");
    btn(payments, "AddPaymentMethod-CLICK", W - 280, 185, 220, 50, C.teal, "+ Add Card", 16);
    
    for (let i = 0; i < 3; i++) {
      const cardBg = card(payments, 60, 270 + (i * 140), W - 120, 120, C.teal);
      
      txt(payments, "💳", 90, 295 + (i * 140), 32, C.white, "Regular");
      txt(payments, "•••• •••• •••• " + (1234 + i), 150, 305 + (i * 140), 20, C.white, "Bold");
      txt(payments, i === 0 ? "Visa" : i === 1 ? "Mastercard" : "Amex", 150, 335 + (i * 140), 15, C.white, "Regular");
      txt(payments, "Expires 12/2" + (6 + i), 150, 360 + (i * 140), 14, C.white, "Regular");
      
      if (i === 0) {
        card(payments, W - 250, 300 + (i * 140), 100, 30, C.yellow);
        txt(payments, "Default", W - 235, 307 + (i * 140), 14, C.text, "Bold");
      }
      
      btn(payments, "RemoveCard" + i + "-CLICK", W - 220, 345 + (i * 140), 100, 35, C.red, "Remove", 14);
    }

    // SCREEN 20: Add Payment Method
    const addPayment = figma.createFrame();
    addPayment.name = "WebAddPayment";
    addPayment.resize(W, H);
    addPayment.x = x;
    x += W + G;
    addPayment.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(addPayment);
    screens.push(addPayment);
    
    navBar(addPayment, 4);
    
    btn(addPayment, "BackToPayments-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(addPayment, W/2 - 350, 180, 700, 600, C.lightBg);
    txt(addPayment, "Add Payment Method", W/2 - 160, 220, 28, C.text, "Bold");
    
    txt(addPayment, "Card Number", W/2 - 280, 290, 16, C.text, "Bold");
    card(addPayment, W/2 - 280, 320, 560, 55, C.white).name = "CardNumberInput";
    txt(addPayment, "1234 5678 9012 3456", W/2 - 260, 337, 16, C.gray, "Regular");
    
    txt(addPayment, "Cardholder Name", W/2 - 280, 400, 16, C.text, "Bold");
    card(addPayment, W/2 - 280, 430, 560, 55, C.white).name = "CardNameInput";
    txt(addPayment, "Name on card", W/2 - 260, 447, 16, C.gray, "Regular");
    
    txt(addPayment, "Expiry Date", W/2 - 280, 510, 16, C.text, "Bold");
    card(addPayment, W/2 - 280, 540, 260, 55, C.white).name = "ExpiryInput";
    txt(addPayment, "MM/YY", W/2 - 260, 557, 16, C.gray, "Regular");
    
    txt(addPayment, "CVV", W/2 + 20, 510, 16, C.text, "Bold");
    card(addPayment, W/2 + 20, 540, 260, 55, C.white).name = "CVVInput";
    txt(addPayment, "123", W/2 + 40, 557, 16, C.gray, "Regular");
    
    const checkbox = card(addPayment, W/2 - 280, 625, 25, 25, C.white);
    checkbox.name = "SetDefaultCard-CLICK";
    txt(addPayment, "Set as default payment method", W/2 - 240, 628, 15, C.text, "Regular");
    
    btn(addPayment, "SaveCard-CLICK", W/2 - 120, 690, 240, 55, C.teal, "Add Card", 18);

    // SCREEN 21: Rewards & Credits
    const rewards = figma.createFrame();
    rewards.name = "WebRewards";
    rewards.resize(W, H);
    rewards.x = x;
    x += W + G;
    rewards.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(rewards);
    screens.push(rewards);
    
    navBar(rewards, 4);
    
    btn(rewards, "BackToProfile4-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(rewards, "Rewards & Credits 🎁", 60, 190, 28, C.text, "Bold");
    
    card(rewards, 60, 250, W - 120, 180, C.teal);
    txt(rewards, "Your Balance", 100, 290, 20, C.white, "Bold");
    txt(rewards, "$25.50", 100, 330, 48, C.white, "Bold");
    txt(rewards, "Available Credits", 100, 390, 16, C.white, "Regular");
    btn(rewards, "RedeemCredits-CLICK", W - 320, 350, 200, 50, C.yellow, "Redeem Now", 16);
    
    txt(rewards, "Loyalty Points: 1,250 pts", 60, 470, 20, C.text, "Bold");
    
    card(rewards, 60, 520, W - 120, 80, C.lightBg);
    txt(rewards, "Complete 3 more orders to unlock 10% OFF coupon! 🎉", 100, 545, 18, C.text, "Bold");
    
    txt(rewards, "Active Offers", 60, 640, 22, C.text, "Bold");
    
    for (let i = 0; i < 3; i++) {
      const offerCard = card(rewards, 60 + (i * 440), 690, 420, 140, C.lightBg);
      offerCard.name = "Offer" + i + "-CLICK";
      txt(rewards, i === 0 ? "🎁 $5 OFF" : i === 1 ? "🍕 Free Pizza" : "🚚 Free Delivery", 90 + (i * 440), 720, 22, C.text, "Bold");
      txt(rewards, "Valid until Jan 31, 2025", 90 + (i * 440), 755, 14, C.gray, "Regular");
      btn(rewards, "UseOffer" + i + "-CLICK", 90 + (i * 440), 785, 140, 35, C.teal, "Use Now", 14);
    }

    // SCREEN 22: Notifications Settings
    const notifications = figma.createFrame();
    notifications.name = "WebNotifications";
    notifications.resize(W, H);
    notifications.x = x;
    x += W + G;
    notifications.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(notifications);
    screens.push(notifications);
    
    navBar(notifications, 4);
    
    btn(notifications, "BackToProfile5-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(notifications, "Notification Settings 🔔", 60, 190, 28, C.text, "Bold");
    
    const notifSettings = [
      {title: "Order Updates", desc: "Get notified about your order status"},
      {title: "Promotions & Offers", desc: "Receive special deals and discounts"},
      {title: "New Restaurants", desc: "Know when new restaurants join"},
      {title: "Email Notifications", desc: "Receive updates via email"},
      {title: "SMS Notifications", desc: "Get text messages for orders"},
      {title: "Push Notifications", desc: "Allow app notifications"}
    ];
    
    for (let i = 0; i < 6; i++) {
      const settingCard = card(notifications, 60, 260 + (i * 100), W - 120, 80, C.lightBg);
      
      txt(notifications, notifSettings[i].title, 90, 278 + (i * 100), 18, C.text, "Bold");
      txt(notifications, notifSettings[i].desc, 90, 308 + (i * 100), 14, C.gray, "Regular");
      
      const toggle = card(notifications, W - 200, 285 + (i * 100), 80, 40, i % 2 === 0 ? C.teal : C.gray);
      toggle.name = "NotifToggle" + i + "-CLICK";
      const toggleCircle = figma.createEllipse();
      toggleCircle.resize(32, 32);
      toggleCircle.x = i % 2 === 0 ? W - 156 : W - 192;
      toggleCircle.y = 289 + (i * 100);
      toggleCircle.fills = [{type: 'SOLID', color: C.white}];
      notifications.appendChild(toggleCircle);
    }

    // SCREEN 23: Settings
    const settings = figma.createFrame();
    settings.name = "WebSettings";
    settings.resize(W, H);
    settings.x = x;
    x += W + G;
    settings.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(settings);
    screens.push(settings);
    
    navBar(settings, 4);
    
    btn(settings, "BackToProfile6-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(settings, "Settings ⚙️", 60, 190, 28, C.text, "Bold");
    
    const settingsMenu = [
      {icon: "🌐", title: "Language", value: "English"},
      {icon: "🌙", title: "Dark Mode", value: "Off"},
      {icon: "📱", title: "App Version", value: "2.5.0"},
      {icon: "🔒", title: "Privacy Policy", value: ""},
      {icon: "📄", title: "Terms of Service", value: ""},
      {icon: "ℹ️", title: "About BasKhao", value: ""}
    ];
    
    for (let i = 0; i < 6; i++) {
      const settingCard = card(settings, 60, 260 + (i * 90), W - 120, 70, C.lightBg);
      settingCard.name = "Setting" + i + "-CLICK";
      
      txt(settings, settingsMenu[i].icon, 90, 278 + (i * 90), 24, C.text, "Regular");
      txt(settings, settingsMenu[i].title, 140, 283 + (i * 90), 18, C.text, "Bold");
      if (settingsMenu[i].value) {
        txt(settings, settingsMenu[i].value, W - 250, 283 + (i * 90), 16, C.gray, "Regular");
      }
      txt(settings, "›", W - 110, 283 + (i * 90), 24, C.gray, "Regular");
    }

    // SCREEN 24: Help & Support
    const help = figma.createFrame();
    help.name = "WebHelp";
    help.resize(W, H);
    help.x = x;
    x += W + G;
    help.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(help);
    screens.push(help);
    
    navBar(help, 4);
    
    btn(help, "BackToProfile7-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(help, "Help & Support ❓", 60, 190, 28, C.text, "Bold");
    
    card(help, 60, 250, W - 120, 120, C.teal);
    txt(help, "Need Help? We're Here! 💬", 100, 285, 24, C.white, "Bold");
    txt(help, "Chat with our support team 24/7", 100, 325, 16, C.white, "Regular");
    btn(help, "LiveChat-CLICK", 100, 360, 200, 45, C.yellow, "Start Live Chat", 15);
    
    txt(help, "Frequently Asked Questions", 60, 410, 22, C.text, "Bold");
    
    const faqs = [
      "How do I track my order?",
      "How can I cancel my order?",
      "What payment methods do you accept?",
      "How do I apply a promo code?",
      "How do I change my delivery address?",
      "What if my order is wrong or missing items?"
    ];
    
    for (let i = 0; i < 6; i++) {
      const faqCard = card(help, 60, 470 + (i * 75), W - 120, 60, C.lightBg);
      faqCard.name = "FAQ" + i + "-CLICK";
      txt(help, faqs[i], 90, 488 + (i * 75), 16, C.text, "Regular");
      txt(help, "›", W - 110, 488 + (i * 75), 20, C.gray, "Regular");
    }
    
    txt(help, "Contact Us", 60, 930, 20, C.text, "Bold");
    txt(help, "📧 support@baskhao.com", 60, 970, 16, C.gray, "Regular");
    txt(help, "📞 1-800-BASKHAO", 60, 1000, 16, C.gray, "Regular");
    // SCREEN 25: Search Results
const searchResults = figma.createFrame();
searchResults.name = "WebSearchResults";
searchResults.resize(W, H);
searchResults.x = x;
x += W + G;
searchResults.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(searchResults);
screens.push(searchResults);

navBar(searchResults, -1);

btn(searchResults, "BackFromSearch-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

const searchBarFilled = card(searchResults, 190, 120, 1000, 60, C.lightBg);
searchBarFilled.name = "SearchInput-CLICK";
txt(searchResults, "🔍 pizza", 220, 142, 18, C.text, "Regular");

btn(searchResults, "FilterSearch-CLICK", 1210, 125, 150, 50, C.teal, "Filters", 15);

txt(searchResults, "Results for 'pizza' (24 found)", 60, 210, 20, C.text, "Bold");

const searchTabs = ["All", "Restaurants", "Dishes", "Deals"];
for (let i = 0; i < 4; i++) {
  const tabBtn = card(searchResults, 60 + (i * 180), 255, 170, 45, i === 0 ? C.teal : C.lightBg);
  tabBtn.name = "SearchTab" + i + "-CLICK";
  txt(searchResults, searchTabs[i], 80 + (i * 180), 268, 16, i === 0 ? C.white : C.text, "Semi Bold");
}

txt(searchResults, "Restaurants", 60, 340, 18, C.text, "Bold");
const searchRestImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
];
for (let i = 0; i < 2; i++) {
  const restCard = card(searchResults, 60 + (i * 660), 380, 640, 150, C.lightBg);
  restCard.name = "SearchRest" + i + "-CLICK";
  await img(searchResults, 75 + (i * 660), 395, 180, 120, searchRestImages[i]);
  txt(searchResults, i === 0 ? "Pizza Palace" : "Pizza Hub", 275 + (i * 660), 405, 20, C.text, "Bold");
  txt(searchResults, "⭐ 4.8 • 25-30 min", 275 + (i * 660), 440, 15, C.gray, "Regular");
  btn(searchResults, "ViewRestSearch" + i + "-CLICK", 275 + (i * 660), 470, 140, 40, C.teal, "View Menu", 14);
}

txt(searchResults, "Dishes", 60, 570, 18, C.text, "Bold");
const dishImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"
];
for (let i = 0; i < 4; i++) {
  const dishCard = card(searchResults, 60 + (i * 330), 610, 310, 180, C.lightBg);
  dishCard.name = "SearchDish" + i + "-CLICK";
  await img(searchResults, 75 + (i * 330), 625, 280, 110, dishImages[i]);
  txt(searchResults, "Margherita", 85 + (i * 330), 750, 16, C.text, "Bold");
  txt(searchResults, "$12.99", 85 + (i * 330), 775, 14, C.teal, "Bold");
}

    // SCREEN 26: Filter Options
    const filters = figma.createFrame();
    filters.name = "WebFilters";
    filters.resize(W, H);
    filters.x = x;
    x += W + G;
    filters.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(filters);
    screens.push(filters);
    
    navBar(filters, -1);
    
    txt(filters, "Filters 🎛️", 60, 120, 28, C.text, "Bold");
    btn(filters, "ClearFilters-CLICK", W - 220, 120, 160, 45, C.lightBg, "Clear All", 15);
    
    card(filters, 60, 190, W - 120, 650, C.lightBg);
    
    txt(filters, "Price Range", 100, 230, 20, C.text, "Bold");
    const priceOpts = ["$", "$$", "$$$", "$$$$"];
    for (let i = 0; i < 4; i++) {
      const priceBtn = card(filters, 100 + (i * 90), 270, 80, 45, i === 1 ? C.teal : C.white);
      priceBtn.name = "PriceFilter" + i + "-CLICK";
      txt(filters, priceOpts[i], 120 + (i * 90), 283, 16, i === 1 ? C.white : C.text, "Bold");
    }
    
    txt(filters, "Rating", 100, 350, 20, C.text, "Bold");
    const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"];
    for (let i = 0; i < 4; i++) {
      const rateBtn = card(filters, 100 + (i * 110), 390, 100, 45, i === 0 ? C.teal : C.white);
      rateBtn.name = "RatingFilter" + i + "-CLICK";
      txt(filters, "⭐ " + ratings[i], 110 + (i * 110), 403, 14, i === 0 ? C.white : C.text, "Bold");
    }
    
    txt(filters, "Delivery Time", 100, 470, 20, C.text, "Bold");
    const times = ["< 20 min", "20-30 min", "30-45 min", "> 45 min"];
    for (let i = 0; i < 4; i++) {
      const timeBtn = card(filters, 100 + (i * 150), 510, 140, 45, C.white);
      timeBtn.name = "TimeFilter" + i + "-CLICK";
      txt(filters, times[i], 110 + (i * 150), 523, 14, C.text, "Regular");
    }
    
    txt(filters, "Cuisine Type", 100, 590, 20, C.text, "Bold");
    const cuisines = ["Italian", "Chinese", "Mexican", "Indian", "American", "Japanese"];
    for (let i = 0; i < 6; i++) {
      const cuisineBtn = card(filters, 100 + (i % 3) * 220, 630 + Math.floor(i / 3) * 70, 200, 50, C.white);
      cuisineBtn.name = "CuisineFilter" + i + "-CLICK";
      txt(filters, cuisines[i], 120 + (i % 3) * 220, 645 + Math.floor(i / 3) * 70, 15, C.text, "Regular");
    }
    
    btn(filters, "ApplyFilters-CLICK", 100, 770, W - 240, 55, C.teal, "Apply Filters", 18);

    // SCREEN 27: Review Order
const reviewOrder = figma.createFrame();
reviewOrder.name = "WebReviewOrder";
reviewOrder.resize(W, H);
reviewOrder.x = x;
x += W + G;
reviewOrder.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(reviewOrder);
screens.push(reviewOrder);

navBar(reviewOrder, -1);

btn(reviewOrder, "BackFromReview-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

txt(reviewOrder, "Leave a Review ⭐", 60, 190, 28, C.text, "Bold");

card(reviewOrder, W/2 - 400, 250, 800, 550, C.lightBg);

await img(reviewOrder, W/2 - 360, 280, 150, 150, "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300");
txt(reviewOrder, "Pizza Palace", W/2 - 160, 300, 24, C.text, "Bold");
txt(reviewOrder, "Order #12345 • Delivered Jan 15", W/2 - 160, 340, 14, C.gray, "Regular");

txt(reviewOrder, "Rate your experience", W/2 - 360, 470, 18, C.text, "Bold");
for (let i = 0; i < 5; i++) {
  const star = btn(reviewOrder, "Star" + i + "-CLICK", W/2 - 360 + (i * 70), 510, 60, 60, C.white, "⭐", 32);
}

txt(reviewOrder, "Write a review", W/2 - 360, 600, 18, C.text, "Bold");
card(reviewOrder, W/2 - 360, 640, 720, 120, C.white).name = "ReviewTextInput";
txt(reviewOrder, "Share your experience...", W/2 - 340, 670, 15, C.gray, "Regular");

btn(reviewOrder, "SubmitReview-CLICK", W/2 - 120, 790, 240, 55, C.teal, "Submit Review", 18);


// SCREEN 28: Order Details
const orderDetail = figma.createFrame();
orderDetail.name = "WebOrderDetail";
orderDetail.resize(W, H);
orderDetail.x = x;
x += W + G;
orderDetail.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(orderDetail);
screens.push(orderDetail);

navBar(orderDetail, 3);

btn(orderDetail, "BackToOrders-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

txt(orderDetail, "Order #12345", 60, 190, 28, C.text, "Bold");

card(orderDetail, 60, 250, 840, 580, C.lightBg);

txt(orderDetail, "Delivered on Jan 15, 2025 at 3:15 PM", 90, 285, 16, C.teal, "Bold");

txt(orderDetail, "Items Ordered", 90, 330, 20, C.text, "Bold");
const orderDetailImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200",
  "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200"
];
for (let i = 0; i < 3; i++) {
  card(orderDetail, 90, 375 + (i * 90), 740, 75, C.white);
  await img(orderDetail, 100, 385 + (i * 90), 55, 55, orderDetailImages[i]);
  txt(orderDetail, i === 0 ? "Margherita Pizza" : i === 1 ? "Alfredo Pasta" : "Coke", 170, 392 + (i * 90), 16, C.text, "Bold");
  txt(orderDetail, "x1", 170, 420 + (i * 90), 14, C.gray, "Regular");
  txt(orderDetail, "$" + (i === 0 ? "12.99" : i === 1 ? "14.99" : "2.99"), 750, 402 + (i * 90), 16, C.text, "Bold");
}

txt(orderDetail, "Order Summary", 90, 670, 18, C.text, "Bold");
txt(orderDetail, "Subtotal", 90, 710, 15, C.text, "Regular");
txt(orderDetail, "$30.97", 750, 710, 15, C.text, "Regular");
txt(orderDetail, "Delivery Fee", 90, 740, 15, C.text, "Regular");
txt(orderDetail, "$3.00", 750, 740, 15, C.text, "Regular");
txt(orderDetail, "Total", 90, 780, 18, C.text, "Bold");
txt(orderDetail, "$36.47", 740, 780, 18, C.teal, "Bold");

card(orderDetail, 960, 250, 420, 300, C.lightBg);
txt(orderDetail, "Delivery Information", 995, 285, 20, C.text, "Bold");

txt(orderDetail, "Delivered to:", 995, 340, 16, C.text, "Bold");
txt(orderDetail, "123 Main St, Apt 4B", 995, 370, 14, C.gray, "Regular");
txt(orderDetail, "Downtown, City 12345", 995, 395, 14, C.gray, "Regular");

txt(orderDetail, "Contact:", 995, 440, 16, C.text, "Bold");
txt(orderDetail, "+1 (555) 123-4567", 995, 470, 14, C.gray, "Regular");

btn(orderDetail, "ReorderFromDetail-CLICK", 980, 660, 380, 50, C.teal, "Reorder", 16);
btn(orderDetail, "GetHelpOrder-CLICK", 980, 730, 380, 50, C.lightBg, "Get Help", 16);

    // SCREEN 29: Category View
const categoryView = figma.createFrame();
categoryView.name = "WebCategoryView";
categoryView.resize(W, H);
categoryView.x = x;
x += W + G;
categoryView.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(categoryView);
screens.push(categoryView);

navBar(categoryView, 1);

btn(categoryView, "BackFromCategory-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

txt(categoryView, "Pizza Restaurants 🍕", 60, 190, 28, C.text, "Bold");
txt(categoryView, "18 restaurants found", 60, 235, 16, C.gray, "Regular");

btn(categoryView, "SortBy-CLICK", W - 220, 185, 160, 50, C.teal, "Sort By ▾", 15);

const categoryImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
  "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400",
  "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?w=400"
];
for (let i = 0; i < 6; i++) {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const catRestCard = card(categoryView, 60 + (col * 660), 300 + (row * 190), 640, 170, C.lightBg);
  catRestCard.name = "CategoryRest" + i + "-CLICK";
  await img(categoryView, 75 + (col * 660), 315 + (row * 190), 200, 140, categoryImages[i]);
  txt(categoryView, "Pizza Place " + (i + 1), 295 + (col * 660), 325 + (row * 190), 20, C.text, "Bold");
  txt(categoryView, "⭐ 4." + (i + 3) + " • 25-35 min", 295 + (col * 660), 360 + (row * 190), 14, C.gray, "Regular");
  txt(categoryView, "Italian • Pizza • Pasta", 295 + (col * 660), 385 + (row * 190), 13, C.gray, "Regular");
  btn(categoryView, "ViewCategoryMenu" + i + "-CLICK", 295 + (col * 660), 415 + (row * 190), 140, 40, C.teal, "View Menu", 14);
}


// SCREEN 30: Favorites
const favorites = figma.createFrame();
favorites.name = "WebFavorites";
favorites.resize(W, H);
favorites.x = x;
x += W + G;
favorites.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(favorites);
screens.push(favorites);

navBar(favorites, -1);

txt(favorites, "Your Favorites ♥️", 60, 120, 28, C.text, "Bold");
txt(favorites, "8 saved items", 60, 165, 16, C.gray, "Regular");

const favTabs = ["Restaurants", "Dishes"];
for (let i = 0; i < 2; i++) {
  const favTab = card(favorites, 60 + (i * 220), 210, 210, 50, i === 0 ? C.teal : C.lightBg);
  favTab.name = "FavTab" + i + "-CLICK";
  txt(favorites, favTabs[i], 80 + (i * 220), 226, 16, i === 0 ? C.white : C.text, "Semi Bold");
}

const favImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400"
];
for (let i = 0; i < 6; i++) {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const favCard = card(favorites, 60 + (col * 660), 290 + (row * 180), 640, 160, C.lightBg);
  favCard.name = "FavItem" + i + "-CLICK";
  await img(favorites, 75 + (col * 660), 305 + (row * 180), 180, 130, favImages[i]);
  txt(favorites, "Restaurant " + (i + 1), 275 + (col * 660), 315 + (row * 180), 18, C.text, "Bold");
  txt(favorites, "⭐ 4.7 • 30 min", 275 + (col * 660), 345 + (row * 180), 14, C.gray, "Regular");
  btn(favorites, "OrderFromFav" + i + "-CLICK", 275 + (col * 660), 380 + (row * 180), 140, 40, C.teal, "Order Now", 14);
  btn(favorites, "RemoveFav" + i + "-CLICK", 650 + (col * 660), 315 + (row * 180), 35, 35, C.red, "×", 20);
}

    // SCREEN 31: Promo Code Entry
    const promoCode = figma.createFrame();
    promoCode.name = "WebPromoCode";
    promoCode.resize(W, H);
    promoCode.x = x;
    x += W + G;
    promoCode.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(promoCode);
    screens.push(promoCode);
    
    navBar(promoCode, -1);
    
    btn(promoCode, "BackFromPromo-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(promoCode, W/2 - 400, 200, 800, 500, C.lightBg);
    txt(promoCode, "Apply Promo Code 🎟️", W/2 - 150, 250, 28, C.text, "Bold");
    
    txt(promoCode, "Enter Code", W/2 - 340, 330, 18, C.text, "Bold");
    card(promoCode, W/2 - 340, 370, 520, 60, C.white).name = "PromoInput";
    txt(promoCode, "Enter promo code", W/2 - 320, 390, 16, C.gray, "Regular");
    btn(promoCode, "ApplyPromoBtn-CLICK", W/2 + 200, 375, 140, 50, C.teal, "Apply", 16);
    
    txt(promoCode, "Available Offers", W/2 - 340, 470, 20, C.text, "Bold");
    
    const promoCodes = [
      {code: "FIRST50", desc: "50% off first order"},
      {code: "FREEDEL", desc: "Free delivery"},
      {code: "SAVE20", desc: "20% off minimum $25"}
    ];
    
    for (let i = 0; i < 3; i++) {
      const promoCard = card(promoCode, W/2 - 340, 520 + (i * 85), 680, 70, C.white);
      promoCard.name = "PromoOption" + i + "-CLICK";
      txt(promoCode, promoCodes[i].code, W/2 - 310, 535 + (i * 85), 18, C.teal, "Bold");
      txt(promoCode, promoCodes[i].desc, W/2 - 310, 560 + (i * 85), 14, C.gray, "Regular");
      btn(promoCode, "UsePromo" + i + "-CLICK", W/2 + 240, 540 + (i * 85), 80, 35, C.teal, "Use", 14);
    }

    // SCREEN 32: FAQ Detail
    const faqDetail = figma.createFrame();
    faqDetail.name = "WebFAQDetail";
    faqDetail.resize(W, H);
    faqDetail.x = x;
    x += W + G;
    faqDetail.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(faqDetail);
    screens.push(faqDetail);
    
    navBar(faqDetail, -1);
    
    btn(faqDetail, "BackFromFAQ-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(faqDetail, W/2 - 500, 180, 1000, 650, C.lightBg);
    
    txt(faqDetail, "How do I track my order?", W/2 - 450, 230, 26, C.text, "Bold");
    
    txt(faqDetail, "You can easily track your order by:", W/2 - 450, 300, 18, C.text, "Regular");
    
    const steps = [
      "1. Go to 'Orders' section from the navigation menu",
      "2. Find your active order",
      "3. Click on 'Track Order' button",
      "4. You'll see real-time updates on your order status",
      "5. Get notifications at each stage of delivery"
    ];
    
    for (let i = 0; i < 5; i++) {
      txt(faqDetail, steps[i], W/2 - 430, 360 + (i * 50), 16, C.text, "Regular");
    }
    
    card(faqDetail, W/2 - 450, 620, 900, 150, C.teal);
    txt(faqDetail, "Still need help?", W/2 - 420, 655, 20, C.white, "Bold");
    txt(faqDetail, "Our support team is available 24/7", W/2 - 420, 690, 16, C.white, "Regular");
    btn(faqDetail, "ContactSupport-CLICK", W/2 - 420, 725, 180, 45, C.yellow, "Contact Us", 16);

    // SCREEN 33: Live Chat
    const liveChat = figma.createFrame();
    liveChat.name = "WebLiveChat";
    liveChat.resize(W, H);
    liveChat.x = x;
    x += W + G;
    liveChat.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(liveChat);
    screens.push(liveChat);
    
    navBar(liveChat, -1);
    
    btn(liveChat, "BackFromChat-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(liveChat, W/2 - 450, 180, 900, 650, C.lightBg);
    
    card(liveChat, W/2 - 450, 180, 900, 70, C.teal);
    txt(liveChat, "Live Chat Support 💬", W/2 - 420, 208, 22, C.white, "Bold");
    txt(liveChat, "Agent: Sarah • Online", W/2 - 420, 235, 14, C.white, "Regular");
    
    const messages = [
      {text: "Hi! How can I help you today?", agent: true, time: "2:30 PM"},
      {text: "I need help with my order", agent: false, time: "2:31 PM"},
      {text: "Of course! Can you share your order number?", agent: true, time: "2:31 PM"},
      {text: "Order #12345", agent: false, time: "2:32 PM"}
    ];
    
    let msgY = 270;
    for (let i = 0; i < 4; i++) {
      const msg = messages[i];
      const msgCard = card(liveChat, msg.agent ? W/2 - 420 : W/2 + 50, msgY, msg.agent ? 500 : 360, 65, msg.agent ? C.white : C.teal);
      txt(liveChat, msg.text, msg.agent ? W/2 - 395 : W/2 + 75, msgY + 18, 15, msg.agent ? C.text : C.white, "Regular");
      txt(liveChat, msg.time, msg.agent ? W/2 - 395 : W/2 + 75, msgY + 43, 12, msg.agent ? C.gray : C.white, "Regular");
      msgY += 90;
    }
    
    card(liveChat, W/2 - 420, 760, 740, 60, C.white).name = "ChatInput";
    txt(liveChat, "Type your message...", W/2 - 395, 779, 15, C.gray, "Regular");
    btn(liveChat, "SendMessage-CLICK", W/2 + 340, 765, 100, 50, C.teal, "Send", 15);

    // SCREEN 34: Referral Program
    const referral = figma.createFrame();
    referral.name = "WebReferral";
    referral.resize(W, H);
    referral.x = x;
    x += W + G;
    referral.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(referral);
    screens.push(referral);
    
    navBar(referral, -1);
    
    card(referral, 60, 120, W - 120, 250, C.teal);
    txt(referral, "Refer & Earn! 🎁", 100, 170, 32, C.white, "Bold");
    txt(referral, "Give $10, Get $10", 100, 220, 24, C.white, "Regular");
    txt(referral, "Share your code and earn rewards when friends order", 100, 260, 16, C.white, "Regular");
    
    card(referral, 100, 310, 400, 60, C.yellow);
    txt(referral, "Your Code: SARAH2025", 130, 328, 20, C.text, "Bold");
    btn(referral, "CopyCode-CLICK", 520, 310, 140, 60, C.darkTeal, "Copy Code", 16);
    
    txt(referral, "Share via", 60, 420, 22, C.text, "Bold");
    btn(referral, "ShareWhatsApp-CLICK", 60, 465, 180, 60, C.teal, "WhatsApp", 16);
    btn(referral, "ShareFacebook-CLICK", 260, 465, 180, 60, C.teal, "Facebook", 16);
    btn(referral, "ShareTwitter-CLICK", 460, 465, 180, 60, C.teal, "Twitter", 16);
    btn(referral, "ShareEmail-CLICK", 660, 465, 180, 60, C.teal, "Email", 16);
    
    txt(referral, "Your Referral Stats", 60, 570, 22, C.text, "Bold");
    
    card(referral, 60, 620, 400, 150, C.lightBg);
    txt(referral, "Total Referrals", 90, 655, 18, C.text, "Bold");
    txt(referral, "12", 90, 690, 40, C.teal, "Bold");
    
    card(referral, 480, 620, 400, 150, C.lightBg);
    txt(referral, "Rewards Earned", 510, 655, 18, C.text, "Bold");
    txt(referral, "$120", 510, 690, 40, C.teal, "Bold");
    
    card(referral, 900, 620, 400, 150, C.lightBg);
    txt(referral, "Pending Rewards", 930, 655, 18, C.text, "Bold");
    txt(referral, "$30", 930, 690, 40, C.yellow, "Bold");
    // SCREEN 35: Contact Us
    const contact = figma.createFrame();
    contact.name = "WebContact";
    contact.resize(W, H);
    contact.x = x;
    x += W + G;
    contact.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(contact);
    screens.push(contact);
    
    navBar(contact, -1);
    
    card(contact, W/2 - 450, 120, 900, 720, C.lightBg);
    
    txt(contact, "Contact Us 📧", W/2 - 100, 170, 28, C.text, "Bold");
    txt(contact, "We'd love to hear from you", W/2 - 150, 220, 16, C.gray, "Regular");
    
    txt(contact, "Full Name", W/2 - 380, 280, 16, C.text, "Bold");
    card(contact, W/2 - 380, 310, 760, 55, C.white).name = "ContactNameInput";
    txt(contact, "Your name", W/2 - 360, 327, 15, C.gray, "Regular");
    
    txt(contact, "Email Address", W/2 - 380, 390, 16, C.text, "Bold");
    card(contact, W/2 - 380, 420, 760, 55, C.white).name = "ContactEmailInput";
    txt(contact, "Your email", W/2 - 360, 437, 15, C.gray, "Regular");
    
    txt(contact, "Subject", W/2 - 380, 500, 16, C.text, "Bold");
    card(contact, W/2 - 380, 530, 760, 55, C.white).name = "ContactSubjectInput";
    txt(contact, "What is this about?", W/2 - 360, 547, 15, C.gray, "Regular");
    
    txt(contact, "Message", W/2 - 380, 610, 16, C.text, "Bold");
    card(contact, W/2 - 380, 640, 760, 120, C.white).name = "ContactMessageInput";
    txt(contact, "Your message...", W/2 - 360, 670, 15, C.gray, "Regular");
    
    btn(contact, "SendContact-CLICK", W/2 - 120, 790, 240, 55, C.teal, "Send Message", 18);

    // SCREEN 36: About Us
    const about = figma.createFrame();
    about.name = "WebAbout";
    about.resize(W, H);
    about.x = x;
    x += W + G;
    about.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(about);
    screens.push(about);
    
    navBar(about, -1);
    
    card(about, 60, 120, W - 120, 200, C.teal);
    txt(about, "About BasKhao 🍕", 100, 170, 36, C.white, "Bold");
    txt(about, "Delivering happiness, one meal at a time", 100, 230, 20, C.white, "Regular");
    
    txt(about, "Our Story", 60, 360, 24, C.text, "Bold");
    txt(about, "BasKhao started in 2020 with a simple mission: to connect people with", 60, 405, 16, C.text, "Regular");
    txt(about, "their favorite local restaurants and deliver delicious food right to their doorstep.", 60, 430, 16, C.text, "Regular");
    
    txt(about, "What We Offer", 60, 500, 24, C.text, "Bold");
    const features = [
      {icon: "🍽️", title: "1000+ Restaurants", desc: "Wide variety of cuisines"},
      {icon: "🚚", title: "Fast Delivery", desc: "Average delivery in 30 mins"},
      {icon: "💰", title: "Best Prices", desc: "Exclusive deals & offers"},
      {icon: "⭐", title: "Quality Service", desc: "4.8 star rating"}
    ];
    
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const featureCard = card(about, 60 + (col * 660), 555 + (row * 150), 640, 130, C.lightBg);
      txt(about, features[i].icon, 90 + (col * 660), 585 + (row * 150), 40, C.text, "Regular");
      txt(about, features[i].title, 160 + (col * 660), 590 + (row * 150), 20, C.text, "Bold");
      txt(about, features[i].desc, 160 + (col * 660), 625 + (row * 150), 15, C.gray, "Regular");
    }

    // SCREEN 37: Terms of Service
    const terms = figma.createFrame();
    terms.name = "WebTerms";
    terms.resize(W, H);
    terms.x = x;
    x += W + G;
    terms.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(terms);
    screens.push(terms);
    
    navBar(terms, -1);
    
    btn(terms, "BackFromTerms-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(terms, W/2 - 500, 180, 1000, 650, C.lightBg);
    
    txt(terms, "Terms of Service", W/2 - 150, 230, 28, C.text, "Bold");
    txt(terms, "Last updated: January 2025", W/2 - 130, 280, 14, C.gray, "Regular");
    
    const termsSections = [
      "1. Acceptance of Terms",
      "2. User Accounts",
      "3. Orders and Payments",
      "4. Delivery Terms",
      "5. Cancellation Policy",
      "6. Privacy and Data Protection"
    ];
    
    let termY = 340;
    for (let i = 0; i < 6; i++) {
      txt(terms, termsSections[i], W/2 - 450, termY, 18, C.text, "Bold");
      txt(terms, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", W/2 - 450, termY + 35, 14, C.gray, "Regular");
      txt(terms, "Sed do eiusmod tempor incididunt ut labore.", W/2 - 450, termY + 55, 14, C.gray, "Regular");
      termY += 95;
    }
    
    btn(terms, "AcceptTerms-CLICK", W/2 - 120, 750, 240, 55, C.teal, "I Accept", 18);

    // SCREEN 38: Privacy Policy
    const privacy = figma.createFrame();
    privacy.name = "WebPrivacy";
    privacy.resize(W, H);
    privacy.x = x;
    x += W + G;
    privacy.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(privacy);
    screens.push(privacy);
    
    navBar(privacy, -1);
    
    btn(privacy, "BackFromPrivacy-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(privacy, W/2 - 500, 180, 1000, 650, C.lightBg);
    
    txt(privacy, "Privacy Policy", W/2 - 130, 230, 28, C.text, "Bold");
    txt(privacy, "Last updated: January 2025", W/2 - 130, 280, 14, C.gray, "Regular");
    
    const privacySections = [
      "Information We Collect",
      "How We Use Your Information",
      "Data Security",
      "Cookies and Tracking",
      "Third-Party Services",
      "Your Rights"
    ];
    
    let privY = 340;
    for (let i = 0; i < 6; i++) {
      txt(privacy, (i + 1) + ". " + privacySections[i], W/2 - 450, privY, 18, C.text, "Bold");
      txt(privacy, "We respect your privacy and protect your personal data.", W/2 - 450, privY + 35, 14, C.gray, "Regular");
      txt(privacy, "All information is encrypted and stored securely.", W/2 - 450, privY + 55, 14, C.gray, "Regular");
      privY += 95;
    }

    // SCREEN 39: Email Verification
    const emailVerify = figma.createFrame();
    emailVerify.name = "WebEmailVerify";
    emailVerify.resize(W, H);
    emailVerify.x = x;
    x += W + G;
    emailVerify.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(emailVerify);
    screens.push(emailVerify);
    
    navBar(emailVerify, -1);
    
    card(emailVerify, W/2 - 350, 200, 700, 500, C.lightBg);
    
    txt(emailVerify, "📧", W/2 - 35, 250, 80, C.teal, "Regular");
    
    txt(emailVerify, "Verify Your Email", W/2 - 140, 370, 28, C.text, "Bold");
    txt(emailVerify, "We've sent a verification code to", W/2 - 180, 420, 16, C.gray, "Regular");
    txt(emailVerify, "sarah.j@email.com", W/2 - 100, 445, 16, C.teal, "Bold");
    
    txt(emailVerify, "Enter Verification Code", W/2 - 140, 500, 16, C.text, "Bold");
    
    for (let i = 0; i < 6; i++) {
      card(emailVerify, W/2 - 210 + (i * 70), 540, 60, 70, C.white).name = "VerifyCode" + i + "-INPUT";
      txt(emailVerify, "0", W/2 - 190 + (i * 70), 558, 28, C.gray, "Bold");
    }
    
    btn(emailVerify, "VerifyEmail-CLICK", W/2 - 120, 640, 240, 55, C.teal, "Verify", 18);
    
    btn(emailVerify, "ResendCode-CLICK", W/2 - 80, 710, 160, 35, C.white, "", 14);
    txt(emailVerify, "Resend Code", W/2 - 65, 720, 14, C.teal, "Bold");

    // SCREEN 40: Order Rating
    const orderRating = figma.createFrame();
    orderRating.name = "WebOrderRating";
    orderRating.resize(W, H);
    orderRating.x = x;
    x += W + G;
    orderRating.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(orderRating);
    screens.push(orderRating);
    
    navBar(orderRating, -1);
    
    card(orderRating, W/2 - 400, 180, 800, 600, C.lightBg);
    
    txt(orderRating, "Rate Your Experience", W/2 - 160, 230, 28, C.text, "Bold");
    txt(orderRating, "Order #12345 • Pizza Palace", W/2 - 140, 280, 16, C.gray, "Regular");
    
    txt(orderRating, "Food Quality", W/2 - 340, 340, 18, C.text, "Bold");
    for (let i = 0; i < 5; i++) {
      btn(orderRating, "FoodStar" + i + "-CLICK", W/2 - 340 + (i * 65), 375, 55, 55, C.white, "⭐", 28);
    }
    
    txt(orderRating, "Delivery Speed", W/2 - 340, 460, 18, C.text, "Bold");
    for (let i = 0; i < 5; i++) {
      btn(orderRating, "DeliveryStar" + i + "-CLICK", W/2 - 340 + (i * 65), 495, 55, 55, C.white, "⭐", 28);
    }
    
    txt(orderRating, "Rider Behavior", W/2 - 340, 580, 18, C.text, "Bold");
    for (let i = 0; i < 5; i++) {
      btn(orderRating, "RiderStar" + i + "-CLICK", W/2 - 340 + (i * 65), 615, 55, 55, C.white, "⭐", 28);
    }
    
    btn(orderRating, "SubmitRating-CLICK", W/2 - 120, 710, 240, 55, C.teal, "Submit Rating", 18);

    // SCREEN 41: Success Message
    const success = figma.createFrame();
    success.name = "WebSuccess";
    success.resize(W, H);
    success.x = x;
    x += W + G;
    success.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(success);
    screens.push(success);
    
    navBar(success, -1);
    
    card(success, W/2 - 350, 220, 700, 460, C.lightBg);
    
    const successIcon = figma.createEllipse();
    successIcon.resize(120, 120);
    successIcon.x = W/2 - 60;
    successIcon.y = 280;
    successIcon.fills = [{type: 'SOLID', color: C.teal}];
    success.appendChild(successIcon);
    txt(success, "✓", W/2 - 30, 310, 70, C.white, "Bold");
    
    txt(success, "Success!", W/2 - 70, 440, 32, C.text, "Bold");
    txt(success, "Your action has been completed successfully", W/2 - 220, 490, 16, C.gray, "Regular");
    
    btn(success, "SuccessOK-CLICK", W/2 - 120, 560, 240, 55, C.teal, "OK", 18);

    // SCREEN 42: Error Message
    const error = figma.createFrame();
    error.name = "WebError";
    error.resize(W, H);
    error.x = x;
    x += W + G;
    error.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(error);
    screens.push(error);
    
    navBar(error, -1);
    
    card(error, W/2 - 350, 220, 700, 460, C.lightBg);
    
    const errorIcon = figma.createEllipse();
    errorIcon.resize(120, 120);
    errorIcon.x = W/2 - 60;
    errorIcon.y = 280;
    errorIcon.fills = [{type: 'SOLID', color: C.red}];
    error.appendChild(errorIcon);
    txt(error, "!", W/2 - 20, 310, 70, C.white, "Bold");
    
    txt(error, "Oops! Something Went Wrong", W/2 - 210, 440, 28, C.text, "Bold");
    txt(error, "Please try again or contact support", W/2 - 180, 490, 16, C.gray, "Regular");
    
    btn(error, "ErrorRetry-CLICK", W/2 - 240, 560, 220, 55, C.teal, "Try Again", 18);
    btn(error, "ErrorSupport-CLICK", W/2 + 20, 560, 220, 55, C.lightBg, "Contact Support", 16);

    // SCREEN 43: Loading State
    const loading = figma.createFrame();
    loading.name = "WebLoading";
    loading.resize(W, H);
    loading.x = x;
    x += W + G;
    loading.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(loading);
    screens.push(loading);
    
    navBar(loading, -1);
    
    const loader = figma.createEllipse();
    loader.resize(100, 100);
    loader.x = W/2 - 50;
    loader.y = H/2 - 100;
    loader.fills = [];
    loader.strokes = [{type: 'SOLID', color: C.teal}];
    loader.strokeWeight = 8;
    loading.appendChild(loader);
    
    txt(loading, "Loading...", W/2 - 60, H/2 + 40, 24, C.text, "Bold");
    txt(loading, "Please wait", W/2 - 65, H/2 + 75, 16, C.gray, "Regular");

    // ============================================
    // ROW 2: RESTAURANT/CLOUD KITCHEN PORTAL
    // ============================================
    
    // Move to second row
    x = 0;
    
    // SCREEN 44: Restaurant Login
    const restLogin = figma.createFrame();
    restLogin.name = "RestaurantLogin";
    restLogin.resize(W, H);
    restLogin.x = x;
    restLogin.y = (H + 200) * 1;
    restLogin.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restLogin);
    screens.push(restLogin);
    x += W + G;
    
    navBar(restLogin, -1);
    
    card(restLogin, W/2 - 300, 180, 600, 560, C.lightBg);
    txt(restLogin, "Restaurant Portal 🍽️", W/2 - 160, 240, 28, C.text, "Bold");
    txt(restLogin, "Login to manage your restaurant", W/2 - 160, 290, 16, C.gray, "Regular");
    
    txt(restLogin, "Restaurant ID / Email", W/2 - 240, 350, 16, C.text, "Bold");
    card(restLogin, W/2 - 240, 380, 480, 55, C.white).name = "RestEmailInput";
    txt(restLogin, "Enter your restaurant ID or email", W/2 - 220, 397, 15, C.gray, "Regular");
    
    txt(restLogin, "Password", W/2 - 240, 460, 16, C.text, "Bold");
    card(restLogin, W/2 - 240, 490, 480, 55, C.white).name = "RestPasswordInput";
    txt(restLogin, "Enter password", W/2 - 220, 507, 15, C.gray, "Regular");
    
    btn(restLogin, "RestForgotPassword-CLICK", W/2 + 80, 565, 160, 30, C.white, "", 14);
    txt(restLogin, "Forgot Password?", W/2 + 90, 572, 13, C.teal, "Regular");
    
    btn(restLogin, "RestLogin-CLICK", W/2 - 120, 620, 240, 58, C.teal, "Login", 20);
    
    txt(restLogin, "New restaurant partner?", W/2 - 110, 700, 15, C.gray, "Regular");
    btn(restLogin, "RestSignupLink-CLICK", W/2 + 60, 695, 80, 25, C.white, "", 15);
    txt(restLogin, "Register", W/2 + 70, 700, 15, C.teal, "Bold");
    // SCREEN 45: Restaurant Signup
    const restSignup = figma.createFrame();
    restSignup.name = "RestaurantSignup";
    restSignup.resize(W, H);
    restSignup.x = x;
    restSignup.y = (H + 200) * 1;
    restSignup.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restSignup);
    screens.push(restSignup);
    x += W + G;
    
    navBar(restSignup, -1);
    
    card(restSignup, W/2 - 350, 140, 700, 680, C.lightBg);
    txt(restSignup, "Partner With Us 🤝", W/2 - 130, 190, 28, C.text, "Bold");
    txt(restSignup, "Register your restaurant", W/2 - 120, 235, 16, C.gray, "Regular");
    
    txt(restSignup, "Restaurant Name", W/2 - 280, 290, 16, C.text, "Bold");
    card(restSignup, W/2 - 280, 320, 560, 55, C.white).name = "RestNameInput";
    txt(restSignup, "Enter restaurant name", W/2 - 260, 337, 15, C.gray, "Regular");
    
    txt(restSignup, "Owner Name", W/2 - 280, 400, 16, C.text, "Bold");
    card(restSignup, W/2 - 280, 430, 560, 55, C.white).name = "OwnerNameInput";
    txt(restSignup, "Full name", W/2 - 260, 447, 15, C.gray, "Regular");
    
    txt(restSignup, "Email Address", W/2 - 280, 510, 16, C.text, "Bold");
    card(restSignup, W/2 - 280, 540, 560, 55, C.white).name = "RestEmailSignup";
    txt(restSignup, "Business email", W/2 - 260, 557, 15, C.gray, "Regular");
    
    txt(restSignup, "Phone Number", W/2 - 280, 620, 16, C.text, "Bold");
    card(restSignup, W/2 - 280, 650, 260, 55, C.white).name = "RestPhoneInput";
    txt(restSignup, "Contact number", W/2 - 260, 667, 15, C.gray, "Regular");
    
    txt(restSignup, "Password", W/2 + 20, 620, 16, C.text, "Bold");
    card(restSignup, W/2 + 20, 650, 260, 55, C.white).name = "RestPassSignup";
    txt(restSignup, "Create password", W/2 + 40, 667, 15, C.gray, "Regular");
    
    btn(restSignup, "RestSignup-CLICK", W/2 - 120, 750, 240, 58, C.teal, "Register", 20);

    // SCREEN 46: Restaurant Dashboard
    const restDash = figma.createFrame();
    restDash.name = "RestaurantDashboard";
    restDash.resize(W, H);
    restDash.x = x;
    restDash.y = (H + 200) * 1;
    restDash.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restDash);
    screens.push(restDash);
    x += W + G;
    
    navBar(restDash, -1);
    
    txt(restDash, "Pizza Palace Dashboard", 60, 120, 28, C.text, "Bold");
    txt(restDash, "Welcome back! Here's your overview", 60, 165, 16, C.gray, "Regular");
    
    const dashStats = [
      {label: "Today's Orders", value: "47", icon: "📦", color: C.teal},
      {label: "Revenue", value: "$1,245", icon: "💰", color: C.yellow},
      {label: "Pending", value: "8", icon: "⏳", color: C.red},
      {label: "Rating", value: "4.8⭐", icon: "⭐", color: C.teal}
    ];
    
    for (let i = 0; i < 4; i++) {
      const statCard = card(restDash, 60 + (i * 330), 220, 310, 140, C.lightBg);
      statCard.name = "Stat" + i + "-CLICK";
      txt(restDash, dashStats[i].icon, 85 + (i * 330), 250, 40, C.text, "Regular");
      txt(restDash, dashStats[i].label, 85 + (i * 330), 305, 16, C.gray, "Regular");
      txt(restDash, dashStats[i].value, 85 + (i * 330), 335, 32, C.text, "Bold");
    }
    
    txt(restDash, "Active Orders", 60, 400, 22, C.text, "Bold");
    btn(restDash, "ViewAllOrders-CLICK", W - 220, 395, 160, 45, C.teal, "View All", 15);
    
    for (let i = 0; i < 3; i++) {
      const orderCard = card(restDash, 60, 465 + (i * 120), W - 120, 100, C.lightBg);
      orderCard.name = "RestOrder" + i + "-CLICK";
      
      txt(restDash, "Order #" + (1234 + i), 90, 485 + (i * 120), 18, C.text, "Bold");
      txt(restDash, "2x Margherita, 1x Pasta", 90, 515 + (i * 120), 15, C.gray, "Regular");
      txt(restDash, "$" + (25 + i * 5) + ".99", 90, 540 + (i * 120), 16, C.teal, "Bold");
      
      card(restDash, W - 320, 490 + (i * 120), 100, 35, C.yellow);
      txt(restDash, "Preparing", W - 300, 499 + (i * 120), 13, C.text, "Bold");
      
      btn(restDash, "ViewOrder" + i + "-CLICK", W - 200, 490 + (i * 120), 80, 35, C.teal, "View", 13);
      btn(restDash, "ReadyOrder" + i + "-CLICK", W - 100, 490 + (i * 120), 80, 35, C.teal, "Ready", 13);
    }
    
    txt(restDash, "Quick Actions", 60, 820, 20, C.text, "Bold");
    btn(restDash, "ManageMenu-CLICK", 60, 860, 200, 55, C.teal, "📋 Manage Menu", 15);
    btn(restDash, "ViewReports-CLICK", 280, 860, 200, 55, C.teal, "📊 Reports", 15);
    btn(restDash, "Settings-CLICK", 500, 860, 200, 55, C.teal, "⚙️ Settings", 15);

// SCREEN 47: Restaurant Menu Management
const restMenu = figma.createFrame();
restMenu.name = "RestaurantMenuManage";
restMenu.resize(W, H);
restMenu.x = x;
restMenu.y = (H + 200) * 1;
restMenu.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(restMenu);
screens.push(restMenu);
x += W + G;

navBar(restMenu, -1);

btn(restMenu, "BackToDash-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

txt(restMenu, "Menu Management 📋", 60, 190, 28, C.text, "Bold");
btn(restMenu, "AddNewDish-CLICK", W - 220, 185, 160, 50, C.teal, "+ Add Dish", 16);

const menuCatsRest = ["All", "Pizza", "Pasta", "Salads", "Beverages"];
for (let i = 0; i < 5; i++) {
  const catBtn = card(restMenu, 60 + (i * 180), 260, 170, 45, i === 0 ? C.teal : C.lightBg);
  catBtn.name = "RestMenuCat" + i + "-CLICK";
  txt(restMenu, menuCatsRest[i], 80 + (i * 180), 273, 16, i === 0 ? C.white : C.text, "Semi Bold");
}

const menuDishImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300",
  "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300"
];
for (let i = 0; i < 6; i++) {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const dishCard = card(restMenu, 60 + (col * 660), 340 + (row * 160), 640, 140, C.lightBg);
  
  await img(restMenu, 75 + (col * 660), 355 + (row * 160), 110, 110, menuDishImages[i]);
  
  txt(restMenu, "Dish " + (i + 1), 205 + (col * 660), 365 + (row * 160), 18, C.text, "Bold");
  txt(restMenu, "$" + (10 + i * 2) + ".99", 205 + (col * 660), 395 + (row * 160), 16, C.teal, "Bold");
  txt(restMenu, i % 2 === 0 ? "Available" : "Out of Stock", 205 + (col * 660), 425 + (row * 160), 14, i % 2 === 0 ? C.teal : C.red, "Regular");
  
  btn(restMenu, "EditDish" + i + "-CLICK", 205 + (col * 660), 450 + (row * 160), 90, 35, C.teal, "Edit", 13);
  btn(restMenu, "ToggleAvail" + i + "-CLICK", 310 + (col * 660), 450 + (row * 160), 120, 35, C.lightBg, "Toggle", 13);
  btn(restMenu, "DeleteDish" + i + "-CLICK", 650 + (col * 660), 365 + (row * 160), 35, 35, C.red, "×", 18);
}


    // SCREEN 48: Add/Edit Dish
    const addDish = figma.createFrame();
    addDish.name = "RestaurantAddDish";
    addDish.resize(W, H);
    addDish.x = x;
    addDish.y = (H + 200) * 1;
    addDish.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(addDish);
    screens.push(addDish);
    x += W + G;
    
    navBar(addDish, -1);
    
    btn(addDish, "BackToMenu-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    card(addDish, W/2 - 450, 180, 900, 650, C.lightBg);
    txt(addDish, "Add New Dish", W/2 - 90, 220, 28, C.text, "Bold");
    
    txt(addDish, "Dish Photo", W/2 - 380, 280, 16, C.text, "Bold");
    imgPlaceholder(addDish, W/2 - 380, 310, 200, 200, "📷");
    btn(addDish, "UploadPhoto-CLICK", W/2 - 380, 525, 200, 40, C.teal, "Upload Photo", 14);
    
    txt(addDish, "Dish Name", W/2 - 130, 280, 16, C.text, "Bold");
    card(addDish, W/2 - 130, 310, 480, 55, C.white).name = "DishNameInput";
    txt(addDish, "Enter dish name", W/2 - 110, 327, 15, C.gray, "Regular");
    
    txt(addDish, "Category", W/2 - 130, 390, 16, C.text, "Bold");
    btn(addDish, "SelectCategory-CLICK", W/2 - 130, 420, 230, 50, C.white, "Select Category ▾", 15);
    
    txt(addDish, "Price", W/2 + 120, 390, 16, C.text, "Bold");
    card(addDish, W/2 + 120, 420, 230, 50, C.white).name = "DishPriceInput";
    txt(addDish, "$0.00", W/2 + 140, 437, 15, C.gray, "Regular");
    
    txt(addDish, "Description", W/2 - 380, 600, 16, C.text, "Bold");
    card(addDish, W/2 - 380, 630, 720, 100, C.white).name = "DishDescInput";
    txt(addDish, "Describe your dish...", W/2 - 360, 660, 15, C.gray, "Regular");
    
    txt(addDish, "Properties", W/2 - 380, 755, 16, C.text, "Bold");
    const props = ["Vegetarian", "Spicy", "Gluten-Free"];
    for (let i = 0; i < 3; i++) {
      const propBtn = card(addDish, W/2 - 380 + (i * 150), 785, 140, 40, C.white);
      propBtn.name = "DishProp" + i + "-CLICK";
      txt(addDish, props[i], W/2 - 360 + (i * 150), 797, 13, C.text, "Regular");
    }
    
    btn(addDish, "SaveDish-CLICK", W/2 - 120, 860, 240, 55, C.teal, "Save Dish", 18);

    // SCREEN 49: Restaurant Order Details
    const restOrderDetail = figma.createFrame();
    restOrderDetail.name = "RestaurantOrderDetail";
    restOrderDetail.resize(W, H);
    restOrderDetail.x = x;
    restOrderDetail.y = (H + 200) * 1;
    restOrderDetail.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restOrderDetail);
    screens.push(restOrderDetail);
    x += W + G;
    
    navBar(restOrderDetail, -1);
    
    btn(restOrderDetail, "BackToDash2-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(restOrderDetail, "Order #12345", 60, 190, 28, C.text, "Bold");
    
    card(restOrderDetail, 60, 250, 840, 580, C.lightBg);
    
    card(restOrderDetail, 90, 280, 780, 70, C.yellow);
    txt(restOrderDetail, "⏳ Preparing", 110, 300, 20, C.text, "Bold");
    txt(restOrderDetail, "Received 5 minutes ago", 110, 330, 14, C.text, "Regular");
    
    txt(restOrderDetail, "Customer Information", 90, 380, 20, C.text, "Bold");
    txt(restOrderDetail, "Name: John Customer", 90, 420, 15, C.text, "Regular");
    txt(restOrderDetail, "Phone: +1 (555) 123-4567", 90, 445, 15, C.text, "Regular");
    txt(restOrderDetail, "Address: 123 Main St, Apt 4B", 90, 470, 15, C.text, "Regular");
    
    txt(restOrderDetail, "Order Items", 90, 520, 20, C.text, "Bold");
    for (let i = 0; i < 3; i++) {
      txt(restOrderDetail, (i + 1) + "x " + (i === 0 ? "Margherita Pizza" : i === 1 ? "Alfredo Pasta" : "Coke"), 90, 565 + (i * 35), 15, C.text, "Regular");
      txt(restOrderDetail, "$" + (i === 0 ? "12.99" : i === 1 ? "14.99" : "2.99"), 800, 565 + (i * 35), 15, C.text, "Regular");
    }
    
    txt(restOrderDetail, "Total: $30.97", 90, 690, 18, C.teal, "Bold");
    
    txt(restOrderDetail, "Special Instructions:", 90, 735, 16, C.text, "Bold");
    txt(restOrderDetail, "No onions, extra cheese", 90, 765, 14, C.gray, "Regular");
    
    card(restOrderDetail, 960, 250, 420, 400, C.lightBg);
    txt(restOrderDetail, "Order Actions", 995, 285, 20, C.text, "Bold");
    
    btn(restOrderDetail, "AcceptOrder-CLICK", 980, 340, 380, 55, C.teal, "✓ Accept Order", 18);
    btn(restOrderDetail, "MarkReady-CLICK", 980, 415, 380, 55, C.teal, "Mark as Ready", 18);
    btn(restOrderDetail, "PrintReceipt-CLICK", 980, 490, 380, 50, C.lightBg, "🖨️ Print Receipt", 16);
    btn(restOrderDetail, "CallCustomer-CLICK", 980, 560, 380, 50, C.lightBg, "📞 Call Customer", 16);
    btn(restOrderDetail, "RejectOrder-CLICK", 980, 690, 380, 50, C.red, "Reject Order", 16);

    // SCREEN 50: Restaurant Reports
    const restReports = figma.createFrame();
    restReports.name = "RestaurantReports";
    restReports.resize(W, H);
    restReports.x = x;
    restReports.y = (H + 200) * 1;
    restReports.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restReports);
    screens.push(restReports);
    x += W + G;
    
    navBar(restReports, -1);
    
    btn(restReports, "BackToDash3-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(restReports, "Reports & Analytics 📊", 60, 190, 28, C.text, "Bold");
    
    const reportTabs = ["Today", "Week", "Month", "Year"];
    for (let i = 0; i < 4; i++) {
      const repTab = card(restReports, 60 + (i * 150), 250, 140, 45, i === 0 ? C.teal : C.lightBg);
      repTab.name = "ReportTab" + i + "-CLICK";
      txt(restReports, reportTabs[i], 80 + (i * 150), 263, 16, i === 0 ? C.white : C.text, "Semi Bold");
    }
    
    const reportStats = [
      {label: "Total Orders", value: "47", change: "+12%"},
      {label: "Revenue", value: "$1,245", change: "+8%"},
      {label: "Avg Order Value", value: "$26.49", change: "+5%"},
      {label: "Completion Rate", value: "94%", change: "+3%"}
    ];
    
    for (let i = 0; i < 4; i++) {
      const statCard = card(restReports, 60 + (i * 330), 330, 310, 130, C.lightBg);
      txt(restReports, reportStats[i].label, 85 + (i * 330), 355, 15, C.gray, "Regular");
      txt(restReports, reportStats[i].value, 85 + (i * 330), 385, 28, C.text, "Bold");
      card(restReports, 85 + (i * 330), 425, 80, 30, C.teal);
      txt(restReports, reportStats[i].change, 95 + (i * 330), 433, 13, C.white, "Bold");
    }
    
    card(restReports, 60, 500, W - 120, 350, C.lightBg);
    txt(restReports, "Sales Chart", 90, 535, 20, C.text, "Bold");
    
    for (let i = 0; i < 7; i++) {
      const barHeight = 50 + Math.random() * 150;
      card(restReports, 120 + (i * 180), 800 - barHeight, 120, barHeight, C.teal);
      txt(restReports, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i], 140 + (i * 180), 815, 14, C.gray, "Regular");
    }
    
    btn(restReports, "DownloadReport-CLICK", W - 280, 870, 220, 50, C.teal, "Download Report", 16);

    // SCREEN 51: Restaurant Settings
    const restSettings = figma.createFrame();
    restSettings.name = "RestaurantSettings";
    restSettings.resize(W, H);
    restSettings.x = x;
    restSettings.y = (H + 200) * 1;
    restSettings.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restSettings);
    screens.push(restSettings);
    x += W + G;
    
    navBar(restSettings, -1);
    
    btn(restSettings, "BackToDash4-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(restSettings, "Restaurant Settings ⚙️", 60, 190, 28, C.text, "Bold");
    
    card(restSettings, 60, 250, 640, 580, C.lightBg);
    txt(restSettings, "Basic Information", 90, 285, 20, C.text, "Bold");
    
    txt(restSettings, "Restaurant Name", 90, 340, 15, C.text, "Bold");
    card(restSettings, 90, 370, 580, 50, C.white).name = "RestNameSetting";
    txt(restSettings, "Pizza Palace", 110, 387, 15, C.gray, "Regular");
    
    txt(restSettings, "Contact Email", 90, 445, 15, C.text, "Bold");
    card(restSettings, 90, 475, 580, 50, C.white).name = "RestEmailSetting";
    txt(restSettings, "contact@pizzapalace.com", 110, 492, 15, C.gray, "Regular");
    
    txt(restSettings, "Phone Number", 90, 550, 15, C.text, "Bold");
    card(restSettings, 90, 580, 580, 50, C.white).name = "RestPhoneSetting";
    txt(restSettings, "+1 (555) 987-6543", 110, 597, 15, C.gray, "Regular");
    
    txt(restSettings, "Operating Hours", 90, 655, 15, C.text, "Bold");
    card(restSettings, 90, 685, 580, 50, C.white).name = "RestHours";
    txt(restSettings, "10:00 AM - 11:00 PM", 110, 702, 15, C.gray, "Regular");
    
    btn(restSettings, "SaveRestSettings-CLICK", 90, 770, 240, 50, C.teal, "Save Changes", 16);
    
    card(restSettings, 740, 250, 640, 350, C.lightBg);
    txt(restSettings, "Account Status", 770, 285, 20, C.text, "Bold");
    
    card(restSettings, 770, 340, 580, 70, C.teal);
    txt(restSettings, "✓ Online & Accepting Orders", 790, 360, 18, C.white, "Bold");
    
    btn(restSettings, "ToggleOnline-CLICK", 770, 435, 280, 50, C.red, "Go Offline", 16);
    btn(restSettings, "PauseOrders-CLICK", 1070, 435, 280, 50, C.yellow, "Pause Orders", 16);
    
    txt(restSettings, "Commission Rate: 15%", 770, 515, 16, C.text, "Regular");
    txt(restSettings, "Payment Cycle: Weekly", 770, 545, 16, C.text, "Regular");
    
    btn(restSettings, "ViewPayouts-CLICK", 770, 705, 280, 50, C.teal, "View Payouts", 16);

    // SCREEN 52: Restaurant Reviews
    const restReviews = figma.createFrame();
    restReviews.name = "RestaurantReviews";
    restReviews.resize(W, H);
    restReviews.x = x;
    restReviews.y = (H + 200) * 1;
    restReviews.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restReviews);
    screens.push(restReviews);
    x += W + G;
    
    navBar(restReviews, -1);
    
    btn(restReviews, "BackToDash5-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(restReviews, "Customer Reviews ⭐", 60, 190, 28, C.text, "Bold");
    
    card(restReviews, 60, 250, W - 120, 130, C.teal);
    txt(restReviews, "Overall Rating", 100, 285, 20, C.white, "Bold");
    txt(restReviews, "4.8", 100, 320, 48, C.white, "Bold");
    txt(restReviews, "⭐⭐⭐⭐⭐", 200, 340, 24, C.yellow, "Regular");
    txt(restReviews, "Based on 2,540 reviews", 100, 380, 14, C.white, "Regular");
    
    for (let i = 0; i < 5; i++) {
      const reviewCard = card(restReviews, 60, 420 + (i * 130), W - 120, 110, C.lightBg);
      
      txt(restReviews, "John Customer " + (i + 1), 90, 440 + (i * 130), 18, C.text, "Bold");
      txt(restReviews, "⭐⭐⭐⭐⭐", 90, 470 + (i * 130), 16, C.yellow, "Regular");
      txt(restReviews, "Great food and fast delivery! Highly recommend.", 90, 500 + (i * 130), 15, C.text, "Regular");
      txt(restReviews, "2 days ago", W - 200, 445 + (i * 130), 13, C.gray, "Regular");
      btn(restReviews, "ReplyReview" + i + "-CLICK", W - 200, 485 + (i * 130), 100, 35, C.teal, "Reply", 13);
    }

    // SCREEN 53: Restaurant Payouts
    const restPayouts = figma.createFrame();
    restPayouts.name = "RestaurantPayouts";
    restPayouts.resize(W, H);
    restPayouts.x = x;
    restPayouts.y = (H + 200) * 1;
    restPayouts.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restPayouts);
    screens.push(restPayouts);
    x += W + G;
    
    navBar(restPayouts, -1);
    
    btn(restPayouts, "BackToDash6-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(restPayouts, "Payouts 💰", 60, 190, 28, C.text, "Bold");
    
    card(restPayouts, 60, 250, 620, 150, C.teal);
    txt(restPayouts, "Available Balance", 100, 285, 18, C.white, "Bold");
    txt(restPayouts, "$3,458.50", 100, 325, 42, C.white, "Bold");
    btn(restPayouts, "RequestPayout-CLICK", 100, 385, 200, 45, C.yellow, "Request Payout", 16);
    
    card(restPayouts, 700, 250, 620, 150, C.lightBg);
    txt(restPayouts, "This Week's Earnings", 740, 285, 18, C.text, "Bold");
    txt(restPayouts, "$1,245.00", 740, 325, 36, C.teal, "Bold");
    txt(restPayouts, "47 orders completed", 740, 375, 14, C.gray, "Regular");
    
    txt(restPayouts, "Payout History", 60, 440, 22, C.text, "Bold");
    
    for (let i = 0; i < 6; i++) {
      const payoutCard = card(restPayouts, 60, 490 + (i * 90), W - 120, 70, C.lightBg);
      
      txt(restPayouts, "Week of Jan " + (1 + i), 90, 505 + (i * 90), 16, C.text, "Bold");
      txt(restPayouts, "145 orders • $3,250.00", 90, 535 + (i * 90), 14, C.gray, "Regular");
      
      card(restPayouts, W - 250, 510 + (i * 90), 90, 30, C.teal);
      txt(restPayouts, "Paid", W - 230, 518 + (i * 90), 13, C.white, "Bold");
      
      txt(restPayouts, "Jan " + (10 + i) + ", 2025", W - 140, 520 + (i * 90), 13, C.gray, "Regular");
    }

    // SCREEN 54: Restaurant Notifications
    const restNotif = figma.createFrame();
    restNotif.name = "RestaurantNotifications";
    restNotif.resize(W, H);
    restNotif.x = x;
    restNotif.y = (H + 200) * 1;
    restNotif.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(restNotif);
    screens.push(restNotif);
    x += W + G;
    
    navBar(restNotif, -1);
    
    btn(restNotif, "BackToDash7-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(restNotif, "Notifications 🔔", 60, 190, 28, C.text, "Bold");
    btn(restNotif, "MarkAllRead-CLICK", W - 220, 185, 160, 50, C.teal, "Mark All Read", 15);
    
    const notifTypes = [
      {icon: "🆕", title: "New Order Received", desc: "Order #12348 from John Customer", time: "2 min ago", unread: true},
      {icon: "✓", title: "Order Completed", desc: "Order #12347 delivered successfully", time: "15 min ago", unread: true},
      {icon: "⭐", title: "New Review", desc: "5-star review from Sarah J.", time: "1 hour ago", unread: false},
      {icon: "💰", title: "Payout Processed", desc: "Weekly payout of $3,250 processed", time: "2 hours ago", unread: false},
      {icon: "📊", title: "Daily Report Ready", desc: "Your daily sales report is available", time: "1 day ago", unread: false}
    ];
    
    for (let i = 0; i < 5; i++) {
      const notifCard = card(restNotif, 60, 260 + (i * 110), W - 120, 90, notifTypes[i].unread ? C.lightBg : C.white);
      notifCard.name = "Notif" + i + "-CLICK";
      
      txt(restNotif, notifTypes[i].icon, 90, 280 + (i * 110), 28, C.text, "Regular");
      txt(restNotif, notifTypes[i].title, 140, 283 + (i * 110), 18, C.text, "Bold");
      txt(restNotif, notifTypes[i].desc, 140, 313 + (i * 110), 14, C.gray, "Regular");
      txt(restNotif, notifTypes[i].time, W - 200, 288 + (i * 110), 13, C.gray, "Regular");
      
      if (notifTypes[i].unread) {
        const dot = figma.createEllipse();
        dot.resize(10, 10);
        dot.x = W - 100;
        dot.y = 292 + (i * 110);
        dot.fills = [{type: 'SOLID', color: C.teal}];
        restNotif.appendChild(dot);
      }
    }
    // ============================================
    // ROW 3: ADMIN PANEL
    // ============================================
    
    // Move to third row
    x = 0;
    
    // SCREEN 55: Admin Login
    const adminLogin = figma.createFrame();
    adminLogin.name = "AdminLogin";
    adminLogin.resize(W, H);
    adminLogin.x = x;
    adminLogin.y = (H + 200) * 2;
    adminLogin.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(adminLogin);
    screens.push(adminLogin);
    x += W + G;
    
    navBar(adminLogin, -1);
    
    card(adminLogin, W/2 - 300, 200, 600, 500, C.lightBg);
    txt(adminLogin, "Admin Portal 🔐", W/2 - 120, 260, 28, C.text, "Bold");
    txt(adminLogin, "Secure access for administrators", W/2 - 150, 310, 16, C.gray, "Regular");
    
    txt(adminLogin, "Admin ID / Email", W/2 - 240, 370, 16, C.text, "Bold");
    card(adminLogin, W/2 - 240, 400, 480, 55, C.white).name = "AdminEmailInput";
    txt(adminLogin, "Enter admin credentials", W/2 - 220, 417, 15, C.gray, "Regular");
    
    txt(adminLogin, "Password", W/2 - 240, 480, 16, C.text, "Bold");
    card(adminLogin, W/2 - 240, 510, 480, 55, C.white).name = "AdminPasswordInput";
    txt(adminLogin, "Enter secure password", W/2 - 220, 527, 15, C.gray, "Regular");
    
    btn(adminLogin, "AdminLogin-CLICK", W/2 - 120, 600, 240, 58, C.teal, "Login", 20);
    
    txt(adminLogin, "🔒 All admin actions are logged and monitored", W/2 - 180, 680, 13, C.gray, "Regular");

    // SCREEN 56: Admin Dashboard
    const adminDash = figma.createFrame();
    adminDash.name = "AdminDashboard";
    adminDash.resize(W, H);
    adminDash.x = x;
    adminDash.y = (H + 200) * 2;
    adminDash.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(adminDash);
    screens.push(adminDash);
    x += W + G;
    
    navBar(adminDash, -1);
    
    txt(adminDash, "Admin Dashboard 👨‍💼", 60, 120, 28, C.text, "Bold");
    txt(adminDash, "Platform Overview & Management", 60, 165, 16, C.gray, "Regular");
    
    const adminStats = [
      {label: "Total Users", value: "12,540", icon: "👥", color: C.teal},
      {label: "Active Orders", value: "347", icon: "📦", color: C.yellow},
      {label: "Restaurants", value: "156", icon: "🍽️", color: C.teal},
      {label: "Today's Revenue", value: "$45,230", icon: "💰", color: C.yellow}
    ];
    
    for (let i = 0; i < 4; i++) {
      const statCard = card(adminDash, 60 + (i * 330), 220, 310, 140, C.lightBg);
      statCard.name = "AdminStat" + i + "-CLICK";
      txt(adminDash, adminStats[i].icon, 85 + (i * 330), 250, 40, C.text, "Regular");
      txt(adminDash, adminStats[i].label, 85 + (i * 330), 305, 16, C.gray, "Regular");
      txt(adminDash, adminStats[i].value, 85 + (i * 330), 335, 32, C.text, "Bold");
    }
    
    txt(adminDash, "Quick Actions", 60, 400, 22, C.text, "Bold");
    
    const quickActions = [
      {icon: "👥", label: "Manage Users"},
      {icon: "🍽️", label: "Restaurants"},
      {icon: "📦", label: "Orders"},
      {icon: "🚴", label: "Drivers"},
      {icon: "📊", label: "Reports"},
      {icon: "⚙️", label: "Settings"}
    ];
    
    for (let i = 0; i < 6; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const actionCard = card(adminDash, 60 + (col * 440), 460 + (row * 130), 420, 110, C.teal);
      actionCard.name = "AdminAction" + i + "-CLICK";
      txt(adminDash, quickActions[i].icon, 90 + (col * 440), 490 + (row * 130), 32, C.white, "Regular");
      txt(adminDash, quickActions[i].label, 90 + (col * 440), 535 + (row * 130), 20, C.white, "Bold");
    }
    
    txt(adminDash, "Recent Activity", 60, 730, 20, C.text, "Bold");
    
    for (let i = 0; i < 3; i++) {
      card(adminDash, 60, 780 + (i * 70), W - 120, 55, C.lightBg);
      txt(adminDash, "New restaurant registered: Pizza Hub", 90, 795 + (i * 70), 15, C.text, "Regular");
      txt(adminDash, "5 minutes ago", W - 200, 795 + (i * 70), 13, C.gray, "Regular");
    }

    // SCREEN 57: Admin Users Management
    const adminUsers = figma.createFrame();
    adminUsers.name = "AdminUsers";
    adminUsers.resize(W, H);
    adminUsers.x = x;
    adminUsers.y = (H + 200) * 2;
    adminUsers.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(adminUsers);
    screens.push(adminUsers);
    x += W + G;
    
    navBar(adminUsers, -1);
    
    btn(adminUsers, "BackToAdminDash-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(adminUsers, "User Management 👥", 60, 190, 28, C.text, "Bold");
    txt(adminUsers, "12,540 total users", 60, 235, 16, C.gray, "Regular");
    
    const searchBarAdmin = card(adminUsers, 60, 270, 800, 55, C.lightBg);
    searchBarAdmin.name = "AdminSearchUsers";
    txt(adminUsers, "🔍 Search users...", 90, 289, 16, C.gray, "Regular");
    
    btn(adminUsers, "FilterUsers-CLICK", 880, 275, 150, 45, C.teal, "Filters", 15);
    btn(adminUsers, "ExportUsers-CLICK", 1050, 275, 150, 45, C.teal, "Export", 15);
    btn(adminUsers, "AddUser-CLICK", 1220, 275, 150, 45, C.teal, "+ Add User", 15);
    
    for (let i = 0; i < 6; i++) {
      const userCard = card(adminUsers, 60, 360 + (i * 95), W - 120, 75, C.lightBg);
      userCard.name = "AdminUser" + i + "-CLICK";
      
      const userAvatar = figma.createEllipse();
      userAvatar.resize(50, 50);
      userAvatar.x = 85;
      userAvatar.y = 373 + (i * 95);
      userAvatar.fills = [{type: 'SOLID', color: C.teal}];
      adminUsers.appendChild(userAvatar);
      txt(adminUsers, "👤", 100, 385 + (i * 95), 20, C.white, "Regular");
      
      txt(adminUsers, "User " + (i + 1) + " - John Customer", 155, 378 + (i * 95), 16, C.text, "Bold");
      txt(adminUsers, "user" + (i + 1) + "@email.com • Joined Jan 2025", 155, 408 + (i * 95), 13, C.gray, "Regular");
      
      card(adminUsers, W - 350, 380 + (i * 95), 80, 30, i % 2 === 0 ? C.teal : C.gray);
      txt(adminUsers, i % 2 === 0 ? "Active" : "Inactive", W - 335, 388 + (i * 95), 12, C.white, "Bold");
      
      btn(adminUsers, "ViewUser" + i + "-CLICK", W - 250, 378 + (i * 95), 80, 35, C.teal, "View", 13);
      btn(adminUsers, "EditUser" + i + "-CLICK", W - 150, 378 + (i * 95), 80, 35, C.lightBg, "Edit", 13);
    }

    // SCREEN 58: Admin Restaurants Management
const adminRests = figma.createFrame();
adminRests.name = "AdminRestaurants";
adminRests.resize(W, H);
adminRests.x = x;
adminRests.y = (H + 200) * 2;
adminRests.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(adminRests);
screens.push(adminRests);
x += W + G;

navBar(adminRests, -1);

btn(adminRests, "BackToAdminDash2-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

txt(adminRests, "Restaurant Management 🍽️", 60, 190, 28, C.text, "Bold");
txt(adminRests, "156 active restaurants", 60, 235, 16, C.gray, "Regular");

const restTabs = ["All", "Pending", "Active", "Suspended"];
for (let i = 0; i < 4; i++) {
  const tab = card(adminRests, 60 + (i * 180), 270, 170, 45, i === 0 ? C.teal : C.lightBg);
  tab.name = "AdminRestTab" + i + "-CLICK";
  txt(adminRests, restTabs[i], 80 + (i * 180), 283, 16, i === 0 ? C.white : C.text, "Semi Bold");
}

btn(adminRests, "AddRestaurant-CLICK", W - 280, 270, 220, 45, C.teal, "+ Add Restaurant", 15);

const adminRestImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=200"
];
for (let i = 0; i < 6; i++) {
  const restCard = card(adminRests, 60, 350 + (i * 100), W - 120, 80, C.lightBg);
  restCard.name = "AdminRest" + i + "-CLICK";
  
  await img(adminRests, 80, 365 + (i * 100), 60, 60, adminRestImages[i]);
  
  txt(adminRests, "Restaurant " + (i + 1), 160, 370 + (i * 100), 18, C.text, "Bold");
  txt(adminRests, "⭐ 4." + (i + 5) + " • 245 orders today", 160, 400 + (i * 100), 14, C.gray, "Regular");
  
  card(adminRests, W - 450, 375 + (i * 100), 100, 30, i % 3 === 0 ? C.teal : i % 3 === 1 ? C.yellow : C.gray);
  txt(adminRests, i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Offline", W - 430, 383 + (i * 100), 12, C.white, "Bold");
  
  btn(adminRests, "ViewRest" + i + "-CLICK", W - 330, 373 + (i * 100), 90, 35, C.teal, "View", 13);
  btn(adminRests, "EditRest" + i + "-CLICK", W - 220, 373 + (i * 100), 90, 35, C.lightBg, "Edit", 13);
  btn(adminRests, "SuspendRest" + i + "-CLICK", W - 110, 373 + (i * 100), 90, 35, C.red, "Suspend", 13);
}

    // SCREEN 59: Admin Orders Management
    const adminOrders = figma.createFrame();
    adminOrders.name = "AdminOrders";
    adminOrders.resize(W, H);
    adminOrders.x = x;
    adminOrders.y = (H + 200) * 2;
    adminOrders.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(adminOrders);
    screens.push(adminOrders);
    x += W + G;
    
    navBar(adminOrders, -1);
    
    btn(adminOrders, "BackToAdminDash3-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(adminOrders, "Orders Management 📦", 60, 190, 28, C.text, "Bold");
    txt(adminOrders, "347 active orders", 60, 235, 16, C.gray, "Regular");
    
    const orderTabs = ["All", "Pending", "Preparing", "Delivered", "Cancelled"];
    for (let i = 0; i < 5; i++) {
      const tab = card(adminOrders, 60 + (i * 180), 270, 170, 45, i === 0 ? C.teal : C.lightBg);
      tab.name = "AdminOrderTab" + i + "-CLICK";
      txt(adminOrders, orderTabs[i], 80 + (i * 180), 283, 15, i === 0 ? C.white : C.text, "Semi Bold");
    }
    
    btn(adminOrders, "RefreshOrders-CLICK", W - 220, 270, 160, 45, C.teal, "🔄 Refresh", 15);
    
    for (let i = 0; i < 7; i++) {
      const orderCard = card(adminOrders, 60, 350 + (i * 85), W - 120, 65, C.lightBg);
      orderCard.name = "AdminOrder" + i + "-CLICK";
      
      txt(adminOrders, "Order #" + (12340 + i), 90, 365 + (i * 85), 16, C.text, "Bold");
      txt(adminOrders, "Pizza Palace → John Customer", 90, 393 + (i * 85), 13, C.gray, "Regular");
      
      txt(adminOrders, "$" + (25 + i * 3) + ".99", 550, 373 + (i * 85), 15, C.text, "Bold");
      
      const statuses = ["Preparing", "On Delivery", "Delivered"];
      const statusColors = [C.yellow, C.teal, C.teal];
      card(adminOrders, 700, 367 + (i * 85), 120, 30, statusColors[i % 3]);
      txt(adminOrders, statuses[i % 3], 715, 375 + (i * 85), 12, C.white, "Bold");
      
      txt(adminOrders, "5 min ago", 900, 373 + (i * 85), 13, C.gray, "Regular");
      
      btn(adminOrders, "ViewAdminOrder" + i + "-CLICK", W - 220, 365 + (i * 85), 80, 35, C.teal, "View", 13);
      btn(adminOrders, "TrackAdminOrder" + i + "-CLICK", W - 120, 365 + (i * 85), 80, 35, C.lightBg, "Track", 13);
    }

    // SCREEN 60: Admin Drivers Management
const adminDrivers = figma.createFrame();
adminDrivers.name = "AdminDrivers";
adminDrivers.resize(W, H);
adminDrivers.x = x;
adminDrivers.y = (H + 200) * 2;
adminDrivers.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(adminDrivers);
screens.push(adminDrivers);
x += W + G;

navBar(adminDrivers, -1);

btn(adminDrivers, "BackToAdminDash4-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

txt(adminDrivers, "Drivers Management 🚴", 60, 190, 28, C.text, "Bold");
txt(adminDrivers, "89 registered drivers", 60, 235, 16, C.gray, "Regular");

const driverTabs = ["All", "Online", "Offline", "On Delivery"];
for (let i = 0; i < 4; i++) {
  const tab = card(adminDrivers, 60 + (i * 180), 270, 170, 45, i === 0 ? C.teal : C.lightBg);
  tab.name = "AdminDriverTab" + i + "-CLICK";
  txt(adminDrivers, driverTabs[i], 80 + (i * 180), 283, 15, i === 0 ? C.white : C.text, "Semi Bold");
}

btn(adminDrivers, "AddDriver-CLICK", W - 220, 270, 160, 45, C.teal, "+ Add Driver", 15);

const driverImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=200",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200"
];
for (let i = 0; i < 6; i++) {
  const driverCard = card(adminDrivers, 60, 350 + (i * 100), W - 120, 80, C.lightBg);
  driverCard.name = "AdminDriver" + i + "-CLICK";
  
  // Create circular driver avatar with image
  const driverAvatar = await img(adminDrivers, 85, 360 + (i * 100), 60, 60, driverImages[i]);
  driverAvatar.cornerRadius = 30; // Make it circular
  
  txt(adminDrivers, "Driver " + (i + 1) + " - John Rider", 165, 368 + (i * 100), 16, C.text, "Bold");
  txt(adminDrivers, "⭐ 4." + (i + 7) + " • " + (50 + i * 10) + " deliveries today", 165, 398 + (i * 100), 13, C.gray, "Regular");
  
  card(adminDrivers, W - 420, 373 + (i * 100), 80, 30, i % 2 === 0 ? C.teal : C.gray);
  txt(adminDrivers, i % 2 === 0 ? "Online" : "Offline", W - 405, 381 + (i * 100), 12, C.white, "Bold");
  
  btn(adminDrivers, "ViewDriver" + i + "-CLICK", W - 320, 370 + (i * 100), 90, 35, C.teal, "View", 13);
  btn(adminDrivers, "TrackDriver" + i + "-CLICK", W - 210, 370 + (i * 100), 90, 35, C.lightBg, "Track", 13);
  btn(adminDrivers, "ContactDriver" + i + "-CLICK", W - 100, 370 + (i * 100), 90, 35, C.yellow, "Call", 13);
}


    // SCREEN 61: Admin Analytics & Reports
    const adminReports = figma.createFrame();
    adminReports.name = "AdminReports";
    adminReports.resize(W, H);
    adminReports.x = x;
    adminReports.y = (H + 200) * 2;
    adminReports.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(adminReports);
    screens.push(adminReports);
    x += W + G;
    
    navBar(adminReports, -1);
    
    btn(adminReports, "BackToAdminDash5-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(adminReports, "Analytics & Reports 📊", 60, 190, 28, C.text, "Bold");
    
    const reportTabsAdmin = ["Today", "Week", "Month", "Year", "Custom"];
    for (let i = 0; i < 5; i++) {
      const tab = card(adminReports, 60 + (i * 160), 250, 150, 45, i === 0 ? C.teal : C.lightBg);
      tab.name = "AdminReportTab" + i + "-CLICK";
      txt(adminReports, reportTabsAdmin[i], 80 + (i * 160), 263, 15, i === 0 ? C.white : C.text, "Semi Bold");
    }
    
    btn(adminReports, "DownloadAdminReport-CLICK", W - 250, 250, 190, 45, C.teal, "📥 Download", 15);
    
    const adminReportStats = [
      {label: "Total Revenue", value: "$45,230", change: "+15%"},
      {label: "Total Orders", value: "2,540", change: "+12%"},
      {label: "New Users", value: "487", change: "+8%"},
      {label: "Avg Order Value", value: "$28.40", change: "+5%"}
    ];
    
    for (let i = 0; i < 4; i++) {
      const statCard = card(adminReports, 60 + (i * 330), 330, 310, 130, C.lightBg);
      txt(adminReports, adminReportStats[i].label, 85 + (i * 330), 355, 15, C.gray, "Regular");
      txt(adminReports, adminReportStats[i].value, 85 + (i * 330), 385, 28, C.text, "Bold");
      card(adminReports, 85 + (i * 330), 425, 80, 30, C.teal);
      txt(adminReports, adminReportStats[i].change, 95 + (i * 330), 433, 13, C.white, "Bold");
    }
    
    card(adminReports, 60, 500, W - 120, 340, C.lightBg);
    txt(adminReports, "Revenue Chart", 90, 535, 20, C.text, "Bold");
    
    for (let i = 0; i < 7; i++) {
      const barHeight = 60 + Math.random() * 160;
      card(adminReports, 120 + (i * 180), 800 - barHeight, 120, barHeight, C.teal);
      txt(adminReports, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i], 140 + (i * 180), 815, 14, C.gray, "Regular");
    }
// SCREEN 62: Admin Permissions
const adminPerms = figma.createFrame();
adminPerms.name = "AdminPermissions";
adminPerms.resize(W, H);
adminPerms.x = x;
adminPerms.y = (H + 200) * 2;
adminPerms.fills = [{type: 'SOLID', color: C.white}];
targetPage.appendChild(adminPerms);
screens.push(adminPerms);
x += W + G;

navBar(adminPerms, -1);

btn(adminPerms, "BackToAdminDash6-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);

txt(adminPerms, "Admin Permissions 🔐", 60, 190, 28, C.text, "Bold");
txt(adminPerms, "Manage admin roles and access levels", 60, 235, 16, C.gray, "Regular");

btn(adminPerms, "AddAdmin-CLICK", W - 220, 185, 160, 50, C.teal, "+ Add Admin", 15);

const adminImages = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
];
for (let i = 0; i < 5; i++) {
  const adminCard = card(adminPerms, 60, 300 + (i * 120), W - 120, 100, C.lightBg);
  
  // Create circular admin avatar with image
  const adminAvatar = await img(adminPerms, 85, 315 + (i * 120), 70, 70, adminImages[i]);
  adminAvatar.cornerRadius = 35; // Make it circular
  
  txt(adminPerms, "Admin " + (i + 1), 175, 323 + (i * 120), 18, C.text, "Bold");
  txt(adminPerms, "admin" + (i + 1) + "@baskhao.com", 175, 353 + (i * 120), 14, C.gray, "Regular");
  
  const roles = ["Super Admin", "Manager", "Support", "Analyst", "Moderator"];
  card(adminPerms, 175, 378 + (i * 120), 140, 28, i === 0 ? C.red : C.teal);
  txt(adminPerms, roles[i], 190, 385 + (i * 120), 12, C.white, "Bold");
  
  btn(adminPerms, "EditAdminPerm" + i + "-CLICK", W - 330, 330 + (i * 120), 110, 40, C.teal, "Edit Role", 13);
  btn(adminPerms, "ViewLogs" + i + "-CLICK", W - 200, 330 + (i * 120), 110, 40, C.lightBg, "View Logs", 13);
}

card(adminPerms, 60, 920, W - 120, 80, C.yellow);
txt(adminPerms, "⚠️ All permission changes are logged and require Super Admin approval", 100, 950, 16, C.text, "Bold");

    // SCREEN 63: Admin Settings
    const adminSettings = figma.createFrame();
    adminSettings.name = "AdminSettings";
    adminSettings.resize(W, H);
    adminSettings.x = x;
    adminSettings.y = (H + 200) * 2;
    adminSettings.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(adminSettings);
    screens.push(adminSettings);
    x += W + G;
    
    navBar(adminSettings, -1);
    
    btn(adminSettings, "BackToAdminDash7-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(adminSettings, "Platform Settings ⚙️", 60, 190, 28, C.text, "Bold");
    
    card(adminSettings, 60, 250, 640, 580, C.lightBg);
    txt(adminSettings, "General Settings", 90, 285, 20, C.text, "Bold");
    
    const platformSettings = [
      {label: "Platform Commission", value: "15%"},
      {label: "Delivery Fee", value: "$3.00"},
      {label: "Service Fee", value: "$2.50"},
      {label: "Min Order Amount", value: "$10.00"},
      {label: "Max Delivery Distance", value: "10 km"}
    ];
    
    let settingY = 340;
    for (let i = 0; i < 5; i++) {
      txt(adminSettings, platformSettings[i].label, 90, settingY, 15, C.text, "Bold");
      card(adminSettings, 90, settingY + 30, 520, 50, C.white).name = "PlatformSetting" + i;
      txt(adminSettings, platformSettings[i].value, 110, settingY + 47, 15, C.gray, "Regular");
      btn(adminSettings, "EditSetting" + i + "-CLICK", 530, settingY + 35, 60, 40, C.teal, "Edit", 13);
      settingY += 105;
    }
    
    btn(adminSettings, "SavePlatformSettings-CLICK", 90, 770, 240, 50, C.teal, "Save Changes", 16);
    
    card(adminSettings, 740, 250, 640, 300, C.lightBg);
    txt(adminSettings, "System Status", 770, 285, 20, C.text, "Bold");
    
    card(adminSettings, 770, 340, 580, 60, C.teal);
    txt(adminSettings, "✓ All Systems Operational", 790, 360, 18, C.white, "Bold");
    
    txt(adminSettings, "Server Status: Online", 770, 430, 15, C.text, "Regular");
    txt(adminSettings, "Database: Connected", 770, 460, 15, C.text, "Regular");
    txt(adminSettings, "Payment Gateway: Active", 770, 490, 15, C.text, "Regular");
    txt(adminSettings, "Last Backup: 2 hours ago", 770, 520, 15, C.text, "Regular");
    
    btn(adminSettings, "ViewSystemLogs-CLICK", 770, 705, 280, 50, C.teal, "View System Logs", 15);

    // SCREEN 64: Admin Notifications & Alerts
    const adminNotifs = figma.createFrame();
    adminNotifs.name = "AdminNotifications";
    adminNotifs.resize(W, H);
    adminNotifs.x = x;
    adminNotifs.y = (H + 200) * 2;
    adminNotifs.fills = [{type: 'SOLID', color: C.white}];
    targetPage.appendChild(adminNotifs);
    screens.push(adminNotifs);
    x += W + G;
    
    navBar(adminNotifs, -1);
    
    btn(adminNotifs, "BackToAdminDash8-CLICK", 60, 120, 100, 40, C.lightBg, "← Back", 15);
    
    txt(adminNotifs, "System Alerts & Notifications 🔔", 60, 190, 28, C.text, "Bold");
    btn(adminNotifs, "MarkAllReadAdmin-CLICK", W - 240, 185, 180, 50, C.teal, "Mark All Read", 15);
    
    const adminNotifTypes = [
      {icon: "🚨", title: "Critical: Payment Gateway Error", desc: "Multiple payment failures detected", time: "Just now", level: C.red},
      {icon: "⚠️", title: "Warning: High Server Load", desc: "Server CPU usage at 85%", time: "5 min ago", level: C.yellow},
      {icon: "ℹ️", title: "Info: New Restaurant Signup", desc: "Pizza Hub requested partnership", time: "15 min ago", level: C.teal},
      {icon: "✓", title: "Success: Backup Completed", desc: "Daily database backup successful", time: "1 hour ago", level: C.teal},
      {icon: "📊", title: "Report: Daily Summary Ready", desc: "Daily analytics report generated", time: "2 hours ago", level: C.teal}
    ];
    
    for (let i = 0; i < 5; i++) {
      const notifCard = card(adminNotifs, 60, 270 + (i * 120), W - 120, 100, C.lightBg);
      notifCard.name = "AdminNotif" + i + "-CLICK";
      
      const iconBg = card(adminNotifs, 85, 290 + (i * 120), 60, 60, adminNotifTypes[i].level);
      txt(adminNotifs, adminNotifTypes[i].icon, 100, 308 + (i * 120), 28, C.white, "Regular");
      
      txt(adminNotifs, adminNotifTypes[i].title, 165, 295 + (i * 120), 18, C.text, "Bold");
      txt(adminNotifs, adminNotifTypes[i].desc, 165, 325 + (i * 120), 14, C.gray, "Regular");
      txt(adminNotifs, adminNotifTypes[i].time, W - 220, 300 + (i * 120), 13, C.gray, "Regular");
      
      btn(adminNotifs, "ViewNotifDetail" + i + "-CLICK", W - 220, 330 + (i * 120), 100, 35, C.teal, "View", 13);
      btn(adminNotifs, "DismissNotif" + i + "-CLICK", W - 100, 330 + (i * 120), 80, 35, C.lightBg, "Dismiss", 13);
    }
    // ============================================
    // COMPLETE PROTOTYPING - ALL CONNECTIONS
    // ============================================
    
    figma.notify('✅ Creating comprehensive prototypes...');
    
    function connect(fromScreen, fromElement, toScreen) {
      const element = fromScreen.findOne(n => n.name === fromElement);
      if (element && toScreen) {
        try {
          element.reactions = [{
            trigger: { type: "ON_CLICK" },
            actions: [{  // ← PLURAL "actions" as ARRAY
              type: "NODE",
              destinationId: toScreen.id,
              navigation: "NAVIGATE",
              transition: { type: "DISSOLVE", duration: 0.3, easing: { type: "EASE_OUT" } }
            }]
          }];
        } catch (e) {
          // Ignore errors to prevent script halt
        }
      }
    }
    
    
    
    
    // ============================================
    // ROW 1: CUSTOMER SCREENS PROTOTYPING (0-42)
    // ============================================
    
    // Splash Screen (0)
    connect(screens[0], "GetStarted-CLICK", screens[1]);
    
    // Login (1)
    connect(screens[1], "Login-CLICK", screens[3]); // to Home
    connect(screens[1], "ForgotPassword-CLICK", screens[2]);
    connect(screens[1], "SignupLink-CLICK", screens[4]);
    connect(screens[1], "NavTab0-CLICK", screens[3]); // Home
    connect(screens[1], "NavTab1-CLICK", screens[5]); // Restaurants
    connect(screens[1], "NavTab2-CLICK", screens[12]); // Deals
    connect(screens[1], "NavTab3-CLICK", screens[13]); // Orders
    connect(screens[1], "NavTab4-CLICK", screens[14]); // Profile
    connect(screens[1], "CartIcon-CLICK", screens[8]);
    
    // Forgot Password (2)
    connect(screens[2], "SendResetLink-CLICK", screens[40]); // Success
    connect(screens[2], "BackToLogin-CLICK", screens[1]);
    connect(screens[2], "NavTab0-CLICK", screens[3]);
    connect(screens[2], "NavTab1-CLICK", screens[5]);
    connect(screens[2], "NavTab2-CLICK", screens[12]);
    connect(screens[2], "NavTab3-CLICK", screens[13]);
    connect(screens[2], "NavTab4-CLICK", screens[14]);
    connect(screens[2], "CartIcon-CLICK", screens[8]);
    
    // Home Dashboard (3)
    connect(screens[3], "OrderNow-CLICK", screens[5]); // Restaurants
    connect(screens[3], "SearchBar-CLICK", screens[24]); // Search Results
    for (let i = 0; i < 6; i++) {
      connect(screens[3], "Category" + i + "-CLICK", screens[28]); // Category View
    }
    for (let i = 0; i < 3; i++) {
      connect(screens[3], "Restaurant" + i + "-CLICK", screens[6]); // Restaurant Detail
    }
    connect(screens[3], "NavTab0-CLICK", screens[3]);
    connect(screens[3], "NavTab1-CLICK", screens[5]);
    connect(screens[3], "NavTab2-CLICK", screens[12]);
    connect(screens[3], "NavTab3-CLICK", screens[13]);
    connect(screens[3], "NavTab4-CLICK", screens[14]);
    connect(screens[3], "CartIcon-CLICK", screens[8]);
    
    // Signup (4)
    connect(screens[4], "Signup-CLICK", screens[38]); // Email Verify
    connect(screens[4], "LoginLink-CLICK", screens[1]);
    connect(screens[4], "NavTab0-CLICK", screens[3]);
    connect(screens[4], "NavTab1-CLICK", screens[5]);
    connect(screens[4], "NavTab2-CLICK", screens[12]);
    connect(screens[4], "NavTab3-CLICK", screens[13]);
    connect(screens[4], "NavTab4-CLICK", screens[14]);
    connect(screens[4], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Listing (5)
    connect(screens[5], "FilterCuisine-CLICK", screens[25]); // Filters
    connect(screens[5], "FilterRating-CLICK", screens[25]);
    connect(screens[5], "FilterDelivery-CLICK", screens[25]);
    connect(screens[5], "FilterPrice-CLICK", screens[25]);
    for (let i = 0; i < 6; i++) {
      connect(screens[5], "RestaurantDetail" + i + "-CLICK", screens[6]);
      connect(screens[5], "ViewMenu" + i + "-CLICK", screens[6]);
      connect(screens[5], "AddToFav" + i + "-CLICK", screens[29]); // Favorites
    }
    connect(screens[5], "NavTab0-CLICK", screens[3]);
    connect(screens[5], "NavTab1-CLICK", screens[5]);
    connect(screens[5], "NavTab2-CLICK", screens[12]);
    connect(screens[5], "NavTab3-CLICK", screens[13]);
    connect(screens[5], "NavTab4-CLICK", screens[14]);
    connect(screens[5], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Detail (6)
    connect(screens[6], "FavoriteRest-CLICK", screens[29]);
    for (let i = 0; i < 6; i++) {
      connect(screens[6], "MenuCat" + i + "-CLICK", screens[6]);
    }
    for (let i = 0; i < 3; i++) {
      connect(screens[6], "MenuItem" + i + "-CLICK", screens[7]); // Item Detail
      connect(screens[6], "AddItem" + i + "-CLICK", screens[8]); // Cart
    }
    connect(screens[6], "NavTab0-CLICK", screens[3]);
    connect(screens[6], "NavTab1-CLICK", screens[5]);
    connect(screens[6], "NavTab2-CLICK", screens[12]);
    connect(screens[6], "NavTab3-CLICK", screens[13]);
    connect(screens[6], "NavTab4-CLICK", screens[14]);
    connect(screens[6], "CartIcon-CLICK", screens[8]);
    
    // Menu Item Detail (7)
    connect(screens[7], "BackToMenu-CLICK", screens[6]);
    connect(screens[7], "SizeSmall-CLICK", screens[7]);
    connect(screens[7], "SizeMedium-CLICK", screens[7]);
    connect(screens[7], "SizeLarge-CLICK", screens[7]);
    for (let i = 0; i < 3; i++) {
      connect(screens[7], "Addon" + i + "-CLICK", screens[7]);
    }
    connect(screens[7], "QtyMinus-CLICK", screens[7]);
    connect(screens[7], "QtyPlus-CLICK", screens[7]);
    connect(screens[7], "AddToCart-CLICK", screens[8]); // Cart
    connect(screens[7], "NavTab0-CLICK", screens[3]);
    connect(screens[7], "NavTab1-CLICK", screens[5]);
    connect(screens[7], "NavTab2-CLICK", screens[12]);
    connect(screens[7], "NavTab3-CLICK", screens[13]);
    connect(screens[7], "NavTab4-CLICK", screens[14]);
    connect(screens[7], "CartIcon-CLICK", screens[8]);
    
    // Cart (8)
    for (let i = 0; i < 3; i++) {
      connect(screens[8], "CartQtyMinus" + i + "-CLICK", screens[8]);
      connect(screens[8], "CartQtyPlus" + i + "-CLICK", screens[8]);
      connect(screens[8], "RemoveItem" + i + "-CLICK", screens[8]);
    }
    connect(screens[8], "Checkout-CLICK", screens[9]); // Checkout
    connect(screens[8], "NavTab0-CLICK", screens[3]);
    connect(screens[8], "NavTab1-CLICK", screens[5]);
    connect(screens[8], "NavTab2-CLICK", screens[12]);
    connect(screens[8], "NavTab3-CLICK", screens[13]);
    connect(screens[8], "NavTab4-CLICK", screens[14]);
    connect(screens[8], "CartIcon-CLICK", screens[8]);
    
    // Checkout (9)
    connect(screens[9], "ChangeAddress-CLICK", screens[16]); // Addresses
    connect(screens[9], "PaymentCard-CLICK", screens[9]);
    connect(screens[9], "PaymentCash-CLICK", screens[9]);
    connect(screens[9], "PaymentWallet-CLICK", screens[9]);
    connect(screens[9], "PlaceOrder-CLICK", screens[10]); // Order Confirmation
    connect(screens[9], "NavTab0-CLICK", screens[3]);
    connect(screens[9], "NavTab1-CLICK", screens[5]);
    connect(screens[9], "NavTab2-CLICK", screens[12]);
    connect(screens[9], "NavTab3-CLICK", screens[13]);
    connect(screens[9], "NavTab4-CLICK", screens[14]);
    connect(screens[9], "CartIcon-CLICK", screens[8]);
    
    // Order Confirmation (10)
    connect(screens[10], "TrackOrder-CLICK", screens[11]); // Tracking
    connect(screens[10], "BackToHome-CLICK", screens[3]);
    connect(screens[10], "NavTab0-CLICK", screens[3]);
    connect(screens[10], "NavTab1-CLICK", screens[5]);
    connect(screens[10], "NavTab2-CLICK", screens[12]);
    connect(screens[10], "NavTab3-CLICK", screens[13]);
    connect(screens[10], "NavTab4-CLICK", screens[14]);
    connect(screens[10], "CartIcon-CLICK", screens[8]);
    
    // Order Tracking (11)
    connect(screens[11], "CallDriver-CLICK", screens[11]);
    connect(screens[11], "CancelOrder-CLICK", screens[41]); // Error
    connect(screens[11], "NavTab0-CLICK", screens[3]);
    connect(screens[11], "NavTab1-CLICK", screens[5]);
    connect(screens[11], "NavTab2-CLICK", screens[12]);
    connect(screens[11], "NavTab3-CLICK", screens[13]);
    connect(screens[11], "NavTab4-CLICK", screens[14]);
    connect(screens[11], "CartIcon-CLICK", screens[8]);
    
    // Deals (12)
    for (let i = 0; i < 6; i++) {
      connect(screens[12], "Deal" + i + "-CLICK", screens[30]); // Promo Code
      connect(screens[12], "ApplyDeal" + i + "-CLICK", screens[8]); // Cart
    }
    connect(screens[12], "NavTab0-CLICK", screens[3]);
    connect(screens[12], "NavTab1-CLICK", screens[5]);
    connect(screens[12], "NavTab2-CLICK", screens[12]);
    connect(screens[12], "NavTab3-CLICK", screens[13]);
    connect(screens[12], "NavTab4-CLICK", screens[14]);
    connect(screens[12], "CartIcon-CLICK", screens[8]);
    
    // Orders History (13)
    connect(screens[13], "FilterActive-CLICK", screens[13]);
    connect(screens[13], "FilterPast-CLICK", screens[13]);
    for (let i = 0; i < 5; i++) {
      connect(screens[13], "OrderDetail" + i + "-CLICK", screens[27]); // Order Detail
      connect(screens[13], "Reorder" + i + "-CLICK", screens[8]); // Cart
      connect(screens[13], "ViewDetails" + i + "-CLICK", screens[27]);
    }
    connect(screens[13], "NavTab0-CLICK", screens[3]);
    connect(screens[13], "NavTab1-CLICK", screens[5]);
    connect(screens[13], "NavTab2-CLICK", screens[12]);
    connect(screens[13], "NavTab3-CLICK", screens[13]);
    connect(screens[13], "NavTab4-CLICK", screens[14]);
    connect(screens[13], "CartIcon-CLICK", screens[8]);
    
    // Profile (14)
    connect(screens[14], "EditProfile-CLICK", screens[15]);
    connect(screens[14], "ProfileMenu0-CLICK", screens[16]); // Addresses
    connect(screens[14], "ProfileMenu1-CLICK", screens[18]); // Payments
    connect(screens[14], "ProfileMenu2-CLICK", screens[20]); // Rewards
    connect(screens[14], "ProfileMenu3-CLICK", screens[21]); // Notifications
    connect(screens[14], "ProfileMenu4-CLICK", screens[22]); // Settings
    connect(screens[14], "ProfileMenu5-CLICK", screens[23]); // Help
    connect(screens[14], "ProfileMenu6-CLICK", screens[1]); // Logout to Login
    connect(screens[14], "NavTab0-CLICK", screens[3]);
    connect(screens[14], "NavTab1-CLICK", screens[5]);
    connect(screens[14], "NavTab2-CLICK", screens[12]);
    connect(screens[14], "NavTab3-CLICK", screens[13]);
    connect(screens[14], "NavTab4-CLICK", screens[14]);
    connect(screens[14], "CartIcon-CLICK", screens[8]);
    
    // Edit Profile (15)
    connect(screens[15], "BackToProfile-CLICK", screens[14]);
    connect(screens[15], "ChangePhoto-CLICK", screens[15]);
    connect(screens[15], "SaveProfile-CLICK", screens[40]); // Success
    connect(screens[15], "NavTab0-CLICK", screens[3]);
    connect(screens[15], "NavTab1-CLICK", screens[5]);
    connect(screens[15], "NavTab2-CLICK", screens[12]);
    connect(screens[15], "NavTab3-CLICK", screens[13]);
    connect(screens[15], "NavTab4-CLICK", screens[14]);
    connect(screens[15], "CartIcon-CLICK", screens[8]);
    
    // Addresses (16)
    connect(screens[16], "BackToProfile2-CLICK", screens[14]);
    connect(screens[16], "AddNewAddress-CLICK", screens[17]); // Add Address
    for (let i = 0; i < 3; i++) {
      connect(screens[16], "EditAddress" + i + "-CLICK", screens[17]);
      connect(screens[16], "DeleteAddress" + i + "-CLICK", screens[16]);
      if (i > 0) connect(screens[16], "SetDefault" + i + "-CLICK", screens[16]);
    }
    connect(screens[16], "NavTab0-CLICK", screens[3]);
    connect(screens[16], "NavTab1-CLICK", screens[5]);
    connect(screens[16], "NavTab2-CLICK", screens[12]);
    connect(screens[16], "NavTab3-CLICK", screens[13]);
    connect(screens[16], "NavTab4-CLICK", screens[14]);
    connect(screens[16], "CartIcon-CLICK", screens[8]);
    
    // Add Address (17)
    connect(screens[17], "BackToAddresses-CLICK", screens[16]);
    connect(screens[17], "LabelHome-CLICK", screens[17]);
    connect(screens[17], "LabelWork-CLICK", screens[17]);
    connect(screens[17], "LabelOther-CLICK", screens[17]);
    connect(screens[17], "SaveAddress-CLICK", screens[40]); // Success
    connect(screens[17], "NavTab0-CLICK", screens[3]);
    connect(screens[17], "NavTab1-CLICK", screens[5]);
    connect(screens[17], "NavTab2-CLICK", screens[12]);
    connect(screens[17], "NavTab3-CLICK", screens[13]);
    connect(screens[17], "NavTab4-CLICK", screens[14]);
    connect(screens[17], "CartIcon-CLICK", screens[8]);
    
    // Payments (18)
    connect(screens[18], "BackToProfile3-CLICK", screens[14]);
    connect(screens[18], "AddPaymentMethod-CLICK", screens[19]); // Add Payment
    for (let i = 0; i < 3; i++) {
      connect(screens[18], "RemoveCard" + i + "-CLICK", screens[18]);
    }
    connect(screens[18], "NavTab0-CLICK", screens[3]);
    connect(screens[18], "NavTab1-CLICK", screens[5]);
    connect(screens[18], "NavTab2-CLICK", screens[12]);
    connect(screens[18], "NavTab3-CLICK", screens[13]);
    connect(screens[18], "NavTab4-CLICK", screens[14]);
    connect(screens[18], "CartIcon-CLICK", screens[8]);
    
    // Add Payment (19)
    connect(screens[19], "BackToPayments-CLICK", screens[18]);
    connect(screens[19], "SetDefaultCard-CLICK", screens[19]);
    connect(screens[19], "SaveCard-CLICK", screens[40]); // Success
    connect(screens[19], "NavTab0-CLICK", screens[3]);
    connect(screens[19], "NavTab1-CLICK", screens[5]);
    connect(screens[19], "NavTab2-CLICK", screens[12]);
    connect(screens[19], "NavTab3-CLICK", screens[13]);
    connect(screens[19], "NavTab4-CLICK", screens[14]);
    connect(screens[19], "CartIcon-CLICK", screens[8]);
    
    // Rewards (20)
    connect(screens[20], "BackToProfile4-CLICK", screens[14]);
    connect(screens[20], "RedeemCredits-CLICK", screens[20]);
    for (let i = 0; i < 3; i++) {
      connect(screens[20], "Offer" + i + "-CLICK", screens[30]); // Promo
      connect(screens[20], "UseOffer" + i + "-CLICK", screens[8]); // Cart
    }
    connect(screens[20], "NavTab0-CLICK", screens[3]);
    connect(screens[20], "NavTab1-CLICK", screens[5]);
    connect(screens[20], "NavTab2-CLICK", screens[12]);
    connect(screens[20], "NavTab3-CLICK", screens[13]);
    connect(screens[20], "NavTab4-CLICK", screens[14]);
    connect(screens[20], "CartIcon-CLICK", screens[8]);
    
    // Notifications Settings (21)
    connect(screens[21], "BackToProfile5-CLICK", screens[14]);
    for (let i = 0; i < 6; i++) {
      connect(screens[21], "NotifToggle" + i + "-CLICK", screens[21]);
    }
    connect(screens[21], "NavTab0-CLICK", screens[3]);
    connect(screens[21], "NavTab1-CLICK", screens[5]);
    connect(screens[21], "NavTab2-CLICK", screens[12]);
    connect(screens[21], "NavTab3-CLICK", screens[13]);
    connect(screens[21], "NavTab4-CLICK", screens[14]);
    connect(screens[21], "CartIcon-CLICK", screens[8]);
    
    // Settings (22)
    connect(screens[22], "BackToProfile6-CLICK", screens[14]);
    for (let i = 0; i < 6; i++) {
      connect(screens[22], "Setting" + i + "-CLICK", i < 3 ? screens[22] : i === 3 ? screens[37] : i === 4 ? screens[36] : screens[35]);
    }
    connect(screens[22], "NavTab0-CLICK", screens[3]);
    connect(screens[22], "NavTab1-CLICK", screens[5]);
    connect(screens[22], "NavTab2-CLICK", screens[12]);
    connect(screens[22], "NavTab3-CLICK", screens[13]);
    connect(screens[22], "NavTab4-CLICK", screens[14]);
    connect(screens[22], "CartIcon-CLICK", screens[8]);
    
    // Help & Support (23)
    connect(screens[23], "BackToProfile7-CLICK", screens[14]);
    connect(screens[23], "LiveChat-CLICK", screens[32]); // Live Chat
    for (let i = 0; i < 6; i++) {
      connect(screens[23], "FAQ" + i + "-CLICK", screens[31]); // FAQ Detail
    }
    connect(screens[23], "NavTab0-CLICK", screens[3]);
    connect(screens[23], "NavTab1-CLICK", screens[5]);
    connect(screens[23], "NavTab2-CLICK", screens[12]);
    connect(screens[23], "NavTab3-CLICK", screens[13]);
    connect(screens[23], "NavTab4-CLICK", screens[14]);
    connect(screens[23], "CartIcon-CLICK", screens[8]);
    
    // Search Results (24)
    connect(screens[24], "BackFromSearch-CLICK", screens[3]);
    connect(screens[24], "SearchInput-CLICK", screens[24]);
    connect(screens[24], "FilterSearch-CLICK", screens[25]);
    for (let i = 0; i < 4; i++) {
      connect(screens[24], "SearchTab" + i + "-CLICK", screens[24]);
    }
    for (let i = 0; i < 2; i++) {
      connect(screens[24], "SearchRest" + i + "-CLICK", screens[6]);
      connect(screens[24], "ViewRestSearch" + i + "-CLICK", screens[6]);
    }
    for (let i = 0; i < 4; i++) {
      connect(screens[24], "SearchDish" + i + "-CLICK", screens[7]);
    }
    connect(screens[24], "NavTab0-CLICK", screens[3]);
    connect(screens[24], "NavTab1-CLICK", screens[5]);
    connect(screens[24], "NavTab2-CLICK", screens[12]);
    connect(screens[24], "NavTab3-CLICK", screens[13]);
    connect(screens[24], "NavTab4-CLICK", screens[14]);
    connect(screens[24], "CartIcon-CLICK", screens[8]);
    
    // Filters (25)
    connect(screens[25], "ClearFilters-CLICK", screens[25]);
    for (let i = 0; i < 4; i++) {
      connect(screens[25], "PriceFilter" + i + "-CLICK", screens[25]);
      connect(screens[25], "RatingFilter" + i + "-CLICK", screens[25]);
      connect(screens[25], "TimeFilter" + i + "-CLICK", screens[25]);
    }
    for (let i = 0; i < 6; i++) {
      connect(screens[25], "CuisineFilter" + i + "-CLICK", screens[25]);
    }
    connect(screens[25], "ApplyFilters-CLICK", screens[5]); // Back to Restaurants
    connect(screens[25], "NavTab0-CLICK", screens[3]);
    connect(screens[25], "NavTab1-CLICK", screens[5]);
    connect(screens[25], "NavTab2-CLICK", screens[12]);
    connect(screens[25], "NavTab3-CLICK", screens[13]);
    connect(screens[25], "NavTab4-CLICK", screens[14]);
    connect(screens[25], "CartIcon-CLICK", screens[8]);
    
    // Review Order (26)
    connect(screens[26], "BackFromReview-CLICK", screens[27]);
    for (let i = 0; i < 5; i++) {
      connect(screens[26], "Star" + i + "-CLICK", screens[26]);
    }
    connect(screens[26], "SubmitReview-CLICK", screens[40]); // Success
    connect(screens[26], "NavTab0-CLICK", screens[3]);
    connect(screens[26], "NavTab1-CLICK", screens[5]);
    connect(screens[26], "NavTab2-CLICK", screens[12]);
    connect(screens[26], "NavTab3-CLICK", screens[13]);
    connect(screens[26], "NavTab4-CLICK", screens[14]);
    connect(screens[26], "CartIcon-CLICK", screens[8]);
    
    // Order Detail (27)
    connect(screens[27], "BackToOrders-CLICK", screens[13]);
    connect(screens[27], "ReorderFromDetail-CLICK", screens[8]); // Cart
    connect(screens[27], "GetHelpOrder-CLICK", screens[23]); // Help
    connect(screens[27], "NavTab0-CLICK", screens[3]);
    connect(screens[27], "NavTab1-CLICK", screens[5]);
    connect(screens[27], "NavTab2-CLICK", screens[12]);
    connect(screens[27], "NavTab3-CLICK", screens[13]);
    connect(screens[27], "NavTab4-CLICK", screens[14]);
    connect(screens[27], "CartIcon-CLICK", screens[8]);
    
    // Category View (28)
    connect(screens[28], "BackFromCategory-CLICK", screens[5]);
    connect(screens[28], "SortBy-CLICK", screens[28]);
    for (let i = 0; i < 6; i++) {
      connect(screens[28], "CategoryRest" + i + "-CLICK", screens[6]);
      connect(screens[28], "ViewCategoryMenu" + i + "-CLICK", screens[6]);
    }
    connect(screens[28], "NavTab0-CLICK", screens[3]);
    connect(screens[28], "NavTab1-CLICK", screens[5]);
    connect(screens[28], "NavTab2-CLICK", screens[12]);
    connect(screens[28], "NavTab3-CLICK", screens[13]);
    connect(screens[28], "NavTab4-CLICK", screens[14]);
    connect(screens[28], "CartIcon-CLICK", screens[8]);
    
    // Favorites (29)
    for (let i = 0; i < 2; i++) {
      connect(screens[29], "FavTab" + i + "-CLICK", screens[29]);
    }
    for (let i = 0; i < 6; i++) {
      connect(screens[29], "FavItem" + i + "-CLICK", screens[6]);
      connect(screens[29], "OrderFromFav" + i + "-CLICK", screens[6]);
      connect(screens[29], "RemoveFav" + i + "-CLICK", screens[29]);
    }
    connect(screens[29], "NavTab0-CLICK", screens[3]);
    connect(screens[29], "NavTab1-CLICK", screens[5]);
    connect(screens[29], "NavTab2-CLICK", screens[12]);
    connect(screens[29], "NavTab3-CLICK", screens[13]);
    connect(screens[29], "NavTab4-CLICK", screens[14]);
    connect(screens[29], "CartIcon-CLICK", screens[8]);
    
    // Promo Code (30)
    connect(screens[30], "BackFromPromo-CLICK", screens[8]);
    connect(screens[30], "ApplyPromoBtn-CLICK", screens[40]); // Success
    for (let i = 0; i < 3; i++) {
      connect(screens[30], "PromoOption" + i + "-CLICK", screens[8]);
      connect(screens[30], "UsePromo" + i + "-CLICK", screens[8]);
    }
    connect(screens[30], "NavTab0-CLICK", screens[3]);
    connect(screens[30], "NavTab1-CLICK", screens[5]);
    connect(screens[30], "NavTab2-CLICK", screens[12]);
    connect(screens[30], "NavTab3-CLICK", screens[13]);
    connect(screens[30], "NavTab4-CLICK", screens[14]);
    connect(screens[30], "CartIcon-CLICK", screens[8]);
    
    // FAQ Detail (31)
    connect(screens[31], "BackFromFAQ-CLICK", screens[23]);
    connect(screens[31], "ContactSupport-CLICK", screens[32]); // Live Chat
    connect(screens[31], "NavTab0-CLICK", screens[3]);
    connect(screens[31], "NavTab1-CLICK", screens[5]);
    connect(screens[31], "NavTab2-CLICK", screens[12]);
    connect(screens[31], "NavTab3-CLICK", screens[13]);
    connect(screens[31], "NavTab4-CLICK", screens[14]);
    connect(screens[31], "CartIcon-CLICK", screens[8]);
    
    // Live Chat (32)
    connect(screens[32], "BackFromChat-CLICK", screens[23]);
    connect(screens[32], "SendMessage-CLICK", screens[32]);
    connect(screens[32], "NavTab0-CLICK", screens[3]);
    connect(screens[32], "NavTab1-CLICK", screens[5]);
    connect(screens[32], "NavTab2-CLICK", screens[12]);
    connect(screens[32], "NavTab3-CLICK", screens[13]);
    connect(screens[32], "NavTab4-CLICK", screens[14]);
    connect(screens[32], "CartIcon-CLICK", screens[8]);
    
    // Referral (33)
    connect(screens[33], "CopyCode-CLICK", screens[40]); // Success
    connect(screens[33], "ShareWhatsApp-CLICK", screens[33]);
    connect(screens[33], "ShareFacebook-CLICK", screens[33]);
    connect(screens[33], "ShareTwitter-CLICK", screens[33]);
    connect(screens[33], "ShareEmail-CLICK", screens[33]);
    connect(screens[33], "NavTab0-CLICK", screens[3]);
    connect(screens[33], "NavTab1-CLICK", screens[5]);
    connect(screens[33], "NavTab2-CLICK", screens[12]);
    connect(screens[33], "NavTab3-CLICK", screens[13]);
    connect(screens[33], "NavTab4-CLICK", screens[14]);
    connect(screens[33], "CartIcon-CLICK", screens[8]);
    
    // Contact Us (34)
    connect(screens[34], "SendContact-CLICK", screens[40]); // Success
    connect(screens[34], "NavTab0-CLICK", screens[3]);
    connect(screens[34], "NavTab1-CLICK", screens[5]);
    connect(screens[34], "NavTab2-CLICK", screens[12]);
    connect(screens[34], "NavTab3-CLICK", screens[13]);
    connect(screens[34], "NavTab4-CLICK", screens[14]);
    connect(screens[34], "CartIcon-CLICK", screens[8]);
    
    // About Us (35)
    connect(screens[35], "NavTab0-CLICK", screens[3]);
    connect(screens[35], "NavTab1-CLICK", screens[5]);
    connect(screens[35], "NavTab2-CLICK", screens[12]);
    connect(screens[35], "NavTab3-CLICK", screens[13]);
    connect(screens[35], "NavTab4-CLICK", screens[14]);
    connect(screens[35], "CartIcon-CLICK", screens[8]);
    
    // Terms (36)
    connect(screens[36], "BackFromTerms-CLICK", screens[22]);
    connect(screens[36], "AcceptTerms-CLICK", screens[40]); // Success
    connect(screens[36], "NavTab0-CLICK", screens[3]);
    connect(screens[36], "NavTab1-CLICK", screens[5]);
    connect(screens[36], "NavTab2-CLICK", screens[12]);
    connect(screens[36], "NavTab3-CLICK", screens[13]);
    connect(screens[36], "NavTab4-CLICK", screens[14]);
    connect(screens[36], "CartIcon-CLICK", screens[8]);
    
    // Privacy (37)
    connect(screens[37], "BackFromPrivacy-CLICK", screens[22]);
    connect(screens[37], "NavTab0-CLICK", screens[3]);
    connect(screens[37], "NavTab1-CLICK", screens[5]);
    connect(screens[37], "NavTab2-CLICK", screens[12]);
    connect(screens[37], "NavTab3-CLICK", screens[13]);
    connect(screens[37], "NavTab4-CLICK", screens[14]);
    connect(screens[37], "CartIcon-CLICK", screens[8]);
    
    // Email Verify (38)
    connect(screens[38], "VerifyEmail-CLICK", screens[3]); // Home
    connect(screens[38], "ResendCode-CLICK", screens[38]);
    connect(screens[38], "NavTab0-CLICK", screens[3]);
    connect(screens[38], "NavTab1-CLICK", screens[5]);
    connect(screens[38], "NavTab2-CLICK", screens[12]);
    connect(screens[38], "NavTab3-CLICK", screens[13]);
    connect(screens[38], "NavTab4-CLICK", screens[14]);
    connect(screens[38], "CartIcon-CLICK", screens[8]);
    
    // Order Rating (39)
    for (let i = 0; i < 5; i++) {
      connect(screens[39], "FoodStar" + i + "-CLICK", screens[39]);
      connect(screens[39], "DeliveryStar" + i + "-CLICK", screens[39]);
      connect(screens[39], "RiderStar" + i + "-CLICK", screens[39]);
    }
    connect(screens[39], "SubmitRating-CLICK", screens[40]); // Success
    connect(screens[39], "NavTab0-CLICK", screens[3]);
    connect(screens[39], "NavTab1-CLICK", screens[5]);
    connect(screens[39], "NavTab2-CLICK", screens[12]);
    connect(screens[39], "NavTab3-CLICK", screens[13]);
    connect(screens[39], "NavTab4-CLICK", screens[14]);
    connect(screens[39], "CartIcon-CLICK", screens[8]);
    
    // Success (40)
    connect(screens[40], "SuccessOK-CLICK", screens[3]);
    connect(screens[40], "NavTab0-CLICK", screens[3]);
    connect(screens[40], "NavTab1-CLICK", screens[5]);
    connect(screens[40], "NavTab2-CLICK", screens[12]);
    connect(screens[40], "NavTab3-CLICK", screens[13]);
    connect(screens[40], "NavTab4-CLICK", screens[14]);
    connect(screens[40], "CartIcon-CLICK", screens[8]);
    
    // Error (41)
    connect(screens[41], "ErrorRetry-CLICK", screens[3]);
    connect(screens[41], "ErrorSupport-CLICK", screens[23]);
    connect(screens[41], "NavTab0-CLICK", screens[3]);
    connect(screens[41], "NavTab1-CLICK", screens[5]);
    connect(screens[41], "NavTab2-CLICK", screens[12]);
    connect(screens[41], "NavTab3-CLICK", screens[13]);
    connect(screens[41], "NavTab4-CLICK", screens[14]);
    connect(screens[41], "CartIcon-CLICK", screens[8]);
    
    // Loading (42) - no interactions
    connect(screens[42], "NavTab0-CLICK", screens[3]);
    connect(screens[42], "NavTab1-CLICK", screens[5]);
    connect(screens[42], "NavTab2-CLICK", screens[12]);
    connect(screens[42], "NavTab3-CLICK", screens[13]);
    connect(screens[42], "NavTab4-CLICK", screens[14]);
    connect(screens[42], "CartIcon-CLICK", screens[8]);
    
    // ============================================
    // ROW 2: RESTAURANT PORTAL PROTOTYPING (43-53)
    // ============================================
    
    // Restaurant Login (43)
    connect(screens[43], "RestLogin-CLICK", screens[45]); // Rest Dashboard
    connect(screens[43], "RestForgotPassword-CLICK", screens[2]);
    connect(screens[43], "RestSignupLink-CLICK", screens[44]);
    connect(screens[43], "NavTab0-CLICK", screens[3]);
    connect(screens[43], "NavTab1-CLICK", screens[5]);
    connect(screens[43], "NavTab2-CLICK", screens[12]);
    connect(screens[43], "NavTab3-CLICK", screens[13]);
    connect(screens[43], "NavTab4-CLICK", screens[14]);
    connect(screens[43], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Signup (44)
    connect(screens[44], "RestSignup-CLICK", screens[45]); // Rest Dashboard
    connect(screens[44], "NavTab0-CLICK", screens[3]);
    connect(screens[44], "NavTab1-CLICK", screens[5]);
    connect(screens[44], "NavTab2-CLICK", screens[12]);
    connect(screens[44], "NavTab3-CLICK", screens[13]);
    connect(screens[44], "NavTab4-CLICK", screens[14]);
    connect(screens[44], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Dashboard (45)
    for (let i = 0; i < 4; i++) {
      connect(screens[45], "Stat" + i + "-CLICK", screens[45]);
    }
    connect(screens[45], "ViewAllOrders-CLICK", screens[48]); // Order Detail
    for (let i = 0; i < 3; i++) {
      connect(screens[45], "RestOrder" + i + "-CLICK", screens[48]);
      connect(screens[45], "ViewOrder" + i + "-CLICK", screens[48]);
      connect(screens[45], "ReadyOrder" + i + "-CLICK", screens[48]);
    }
    connect(screens[45], "ManageMenu-CLICK", screens[46]); // Menu Management
    connect(screens[45], "ViewReports-CLICK", screens[49]); // Reports
    connect(screens[45], "Settings-CLICK", screens[50]); // Settings
    connect(screens[45], "NavTab0-CLICK", screens[3]);
    connect(screens[45], "NavTab1-CLICK", screens[5]);
    connect(screens[45], "NavTab2-CLICK", screens[12]);
    connect(screens[45], "NavTab3-CLICK", screens[13]);
    connect(screens[45], "NavTab4-CLICK", screens[14]);
    connect(screens[45], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Menu Management (46)
    connect(screens[46], "BackToDash-CLICK", screens[45]);
    connect(screens[46], "AddNewDish-CLICK", screens[47]); // Add Dish
    for (let i = 0; i < 5; i++) {
      connect(screens[46], "RestMenuCat" + i + "-CLICK", screens[46]);
    }
    for (let i = 0; i < 6; i++) {
      connect(screens[46], "EditDish" + i + "-CLICK", screens[47]);
      connect(screens[46], "ToggleAvail" + i + "-CLICK", screens[46]);
      connect(screens[46], "DeleteDish" + i + "-CLICK", screens[46]);
    }
    connect(screens[46], "NavTab0-CLICK", screens[3]);
    connect(screens[46], "NavTab1-CLICK", screens[5]);
    connect(screens[46], "NavTab2-CLICK", screens[12]);
    connect(screens[46], "NavTab3-CLICK", screens[13]);
    connect(screens[46], "NavTab4-CLICK", screens[14]);
    connect(screens[46], "CartIcon-CLICK", screens[8]);
    
    // Add/Edit Dish (47)
    connect(screens[47], "BackToMenu-CLICK", screens[46]);
    connect(screens[47], "UploadPhoto-CLICK", screens[47]);
    connect(screens[47], "SelectCategory-CLICK", screens[47]);
    for (let i = 0; i < 3; i++) {
      connect(screens[47], "DishProp" + i + "-CLICK", screens[47]);
    }
    connect(screens[47], "SaveDish-CLICK", screens[40]); // Success
    connect(screens[47], "NavTab0-CLICK", screens[3]);
    connect(screens[47], "NavTab1-CLICK", screens[5]);
    connect(screens[47], "NavTab2-CLICK", screens[12]);
    connect(screens[47], "NavTab3-CLICK", screens[13]);
    connect(screens[47], "NavTab4-CLICK", screens[14]);
    connect(screens[47], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Order Detail (48)
    connect(screens[48], "BackToDash2-CLICK", screens[45]);
    connect(screens[48], "AcceptOrder-CLICK", screens[48]);
    connect(screens[48], "MarkReady-CLICK", screens[48]);
    connect(screens[48], "PrintReceipt-CLICK", screens[48]);
    connect(screens[48], "CallCustomer-CLICK", screens[48]);
    connect(screens[48], "RejectOrder-CLICK", screens[41]); // Error
    connect(screens[48], "NavTab0-CLICK", screens[3]);
    connect(screens[48], "NavTab1-CLICK", screens[5]);
    connect(screens[48], "NavTab2-CLICK", screens[12]);
    connect(screens[48], "NavTab3-CLICK", screens[13]);
    connect(screens[48], "NavTab4-CLICK", screens[14]);
    connect(screens[48], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Reports (49)
    connect(screens[49], "BackToDash3-CLICK", screens[45]);
    for (let i = 0; i < 4; i++) {
      connect(screens[49], "ReportTab" + i + "-CLICK", screens[49]);
    }
    connect(screens[49], "DownloadReport-CLICK", screens[40]); // Success
    connect(screens[49], "NavTab0-CLICK", screens[3]);
    connect(screens[49], "NavTab1-CLICK", screens[5]);
    connect(screens[49], "NavTab2-CLICK", screens[12]);
    connect(screens[49], "NavTab3-CLICK", screens[13]);
    connect(screens[49], "NavTab4-CLICK", screens[14]);
    connect(screens[49], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Settings (50)
    connect(screens[50], "BackToDash4-CLICK", screens[45]);
    connect(screens[50], "SaveRestSettings-CLICK", screens[40]); // Success
    connect(screens[50], "ToggleOnline-CLICK", screens[50]);
    connect(screens[50], "PauseOrders-CLICK", screens[50]);
    connect(screens[50], "ViewPayouts-CLICK", screens[52]); // Payouts
    connect(screens[50], "NavTab0-CLICK", screens[3]);
    connect(screens[50], "NavTab1-CLICK", screens[5]);
    connect(screens[50], "NavTab2-CLICK", screens[12]);
    connect(screens[50], "NavTab3-CLICK", screens[13]);
    connect(screens[50], "NavTab4-CLICK", screens[14]);
    connect(screens[50], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Reviews (51)
    connect(screens[51], "BackToDash5-CLICK", screens[45]);
    for (let i = 0; i < 5; i++) {
      connect(screens[51], "ReplyReview" + i + "-CLICK", screens[51]);
    }
    connect(screens[51], "NavTab0-CLICK", screens[3]);
    connect(screens[51], "NavTab1-CLICK", screens[5]);
    connect(screens[51], "NavTab2-CLICK", screens[12]);
    connect(screens[51], "NavTab3-CLICK", screens[13]);
    connect(screens[51], "NavTab4-CLICK", screens[14]);
    connect(screens[51], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Payouts (52)
    connect(screens[52], "BackToDash6-CLICK", screens[45]);
    connect(screens[52], "RequestPayout-CLICK", screens[40]); // Success
    connect(screens[52], "NavTab0-CLICK", screens[3]);
    connect(screens[52], "NavTab1-CLICK", screens[5]);
    connect(screens[52], "NavTab2-CLICK", screens[12]);
    connect(screens[52], "NavTab3-CLICK", screens[13]);
    connect(screens[52], "NavTab4-CLICK", screens[14]);
    connect(screens[52], "CartIcon-CLICK", screens[8]);
    
    // Restaurant Notifications (53)
    connect(screens[53], "BackToDash7-CLICK", screens[45]);
    connect(screens[53], "MarkAllRead-CLICK", screens[53]);
    for (let i = 0; i < 5; i++) {
      connect(screens[53], "Notif" + i + "-CLICK", screens[53]);
    }
    connect(screens[53], "NavTab0-CLICK", screens[3]);
    connect(screens[53], "NavTab1-CLICK", screens[5]);
    connect(screens[53], "NavTab2-CLICK", screens[12]);
    connect(screens[53], "NavTab3-CLICK", screens[13]);
    connect(screens[53], "NavTab4-CLICK", screens[14]);
    connect(screens[53], "CartIcon-CLICK", screens[8]);
    
    // ============================================
    // ROW 3: ADMIN PANEL PROTOTYPING (54-63)
    // ============================================
    
    // Admin Login (54)
    connect(screens[54], "AdminLogin-CLICK", screens[55]); // Admin Dashboard
    connect(screens[54], "NavTab0-CLICK", screens[3]);
    connect(screens[54], "NavTab1-CLICK", screens[5]);
    connect(screens[54], "NavTab2-CLICK", screens[12]);
    connect(screens[54], "NavTab3-CLICK", screens[13]);
    connect(screens[54], "NavTab4-CLICK", screens[14]);
    connect(screens[54], "CartIcon-CLICK", screens[8]);
    
    // Admin Dashboard (55)
    for (let i = 0; i < 4; i++) {
      connect(screens[55], "AdminStat" + i + "-CLICK", screens[55]);
    }
    connect(screens[55], "AdminAction0-CLICK", screens[56]); // Users
    connect(screens[55], "AdminAction1-CLICK", screens[57]); // Restaurants
    connect(screens[55], "AdminAction2-CLICK", screens[58]); // Orders
    connect(screens[55], "AdminAction3-CLICK", screens[59]); // Drivers
    connect(screens[55], "AdminAction4-CLICK", screens[60]); // Reports
    connect(screens[55], "AdminAction5-CLICK", screens[62]); // Settings
    connect(screens[55], "NavTab0-CLICK", screens[3]);
    connect(screens[55], "NavTab1-CLICK", screens[5]);
    connect(screens[55], "NavTab2-CLICK", screens[12]);
    connect(screens[55], "NavTab3-CLICK", screens[13]);
    connect(screens[55], "NavTab4-CLICK", screens[14]);
    connect(screens[55], "CartIcon-CLICK", screens[8]);
    
    // Admin Users (56)
    connect(screens[56], "BackToAdminDash-CLICK", screens[55]);
    connect(screens[56], "AdminSearchUsers", screens[56]);
    connect(screens[56], "FilterUsers-CLICK", screens[25]);
    connect(screens[56], "ExportUsers-CLICK", screens[40]);
    connect(screens[56], "AddUser-CLICK", screens[4]);
    for (let i = 0; i < 6; i++) {
      connect(screens[56], "AdminUser" + i + "-CLICK", screens[56]);
      connect(screens[56], "ViewUser" + i + "-CLICK", screens[56]);
      connect(screens[56], "EditUser" + i + "-CLICK", screens[56]);
    }
    connect(screens[56], "NavTab0-CLICK", screens[3]);
    connect(screens[56], "NavTab1-CLICK", screens[5]);
    connect(screens[56], "NavTab2-CLICK", screens[12]);
    connect(screens[56], "NavTab3-CLICK", screens[13]);
    connect(screens[56], "NavTab4-CLICK", screens[14]);
    connect(screens[56], "CartIcon-CLICK", screens[8]);
    
    // Admin Restaurants (57)
    connect(screens[57], "BackToAdminDash2-CLICK", screens[55]);
    for (let i = 0; i < 4; i++) {
      connect(screens[57], "AdminRestTab" + i + "-CLICK", screens[57]);
    }
    connect(screens[57], "AddRestaurant-CLICK", screens[44]);
    for (let i = 0; i < 6; i++) {
      connect(screens[57], "AdminRest" + i + "-CLICK", screens[45]);
      connect(screens[57], "ViewRest" + i + "-CLICK", screens[45]);
      connect(screens[57], "EditRest" + i + "-CLICK", screens[45]);
      connect(screens[57], "SuspendRest" + i + "-CLICK", screens[57]);
    }
    connect(screens[57], "NavTab0-CLICK", screens[3]);
    connect(screens[57], "NavTab1-CLICK", screens[5]);
    connect(screens[57], "NavTab2-CLICK", screens[12]);
    connect(screens[57], "NavTab3-CLICK", screens[13]);
    connect(screens[57], "NavTab4-CLICK", screens[14]);
    connect(screens[57], "CartIcon-CLICK", screens[8]);
    
    // Admin Orders (58)
    connect(screens[58], "BackToAdminDash3-CLICK", screens[55]);
    for (let i = 0; i < 5; i++) {
      connect(screens[58], "AdminOrderTab" + i + "-CLICK", screens[58]);
    }
    connect(screens[58], "RefreshOrders-CLICK", screens[58]);
    for (let i = 0; i < 7; i++) {
      connect(screens[58], "AdminOrder" + i + "-CLICK", screens[27]);
      connect(screens[58], "ViewAdminOrder" + i + "-CLICK", screens[27]);
      connect(screens[58], "TrackAdminOrder" + i + "-CLICK", screens[11]);
    }
    connect(screens[58], "NavTab0-CLICK", screens[3]);
    connect(screens[58], "NavTab1-CLICK", screens[5]);
    connect(screens[58], "NavTab2-CLICK", screens[12]);
    connect(screens[58], "NavTab3-CLICK", screens[13]);
    connect(screens[58], "NavTab4-CLICK", screens[14]);
    connect(screens[58], "CartIcon-CLICK", screens[8]);
    
    // Admin Drivers (59)
    connect(screens[59], "BackToAdminDash4-CLICK", screens[55]);
    for (let i = 0; i < 4; i++) {
      connect(screens[59], "AdminDriverTab" + i + "-CLICK", screens[59]);
    }
    connect(screens[59], "AddDriver-CLICK", screens[59]);
    for (let i = 0; i < 6; i++) {
      connect(screens[59], "AdminDriver" + i + "-CLICK", screens[59]);
      connect(screens[59], "ViewDriver" + i + "-CLICK", screens[59]);
      connect(screens[59], "TrackDriver" + i + "-CLICK", screens[11]);
      connect(screens[59], "ContactDriver" + i + "-CLICK", screens[59]);
    }
    connect(screens[59], "NavTab0-CLICK", screens[3]);
    connect(screens[59], "NavTab1-CLICK", screens[5]);
    connect(screens[59], "NavTab2-CLICK", screens[12]);
    connect(screens[59], "NavTab3-CLICK", screens[13]);
    connect(screens[59], "NavTab4-CLICK", screens[14]);
    connect(screens[59], "CartIcon-CLICK", screens[8]);
    
    // Admin Reports (60)
    connect(screens[60], "BackToAdminDash5-CLICK", screens[55]);
    for (let i = 0; i < 5; i++) {
      connect(screens[60], "AdminReportTab" + i + "-CLICK", screens[60]);
    }
    connect(screens[60], "DownloadAdminReport-CLICK", screens[40]);
    connect(screens[60], "NavTab0-CLICK", screens[3]);
    connect(screens[60], "NavTab1-CLICK", screens[5]);
    connect(screens[60], "NavTab2-CLICK", screens[12]);
    connect(screens[60], "NavTab3-CLICK", screens[13]);
    connect(screens[60], "NavTab4-CLICK", screens[14]);
    connect(screens[60], "CartIcon-CLICK", screens[8]);
    
    // Admin Permissions (61)
    connect(screens[61], "BackToAdminDash6-CLICK", screens[55]);
    connect(screens[61], "AddAdmin-CLICK", screens[61]);
    for (let i = 0; i < 5; i++) {
      connect(screens[61], "EditAdminPerm" + i + "-CLICK", screens[61]);
      connect(screens[61], "ViewLogs" + i + "-CLICK", screens[61]);
    }
    connect(screens[61], "NavTab0-CLICK", screens[3]);
    connect(screens[61], "NavTab1-CLICK", screens[5]);
    connect(screens[61], "NavTab2-CLICK", screens[12]);
    connect(screens[61], "NavTab3-CLICK", screens[13]);
    connect(screens[61], "NavTab4-CLICK", screens[14]);
    connect(screens[61], "CartIcon-CLICK", screens[8]);
    
    // Admin Settings (62)
    connect(screens[62], "BackToAdminDash7-CLICK", screens[55]);
    for (let i = 0; i < 5; i++) {
      connect(screens[62], "EditSetting" + i + "-CLICK", screens[62]);
    }
    connect(screens[62], "SavePlatformSettings-CLICK", screens[40]);
    connect(screens[62], "ViewSystemLogs-CLICK", screens[62]);
    connect(screens[62], "NavTab0-CLICK", screens[3]);
    connect(screens[62], "NavTab1-CLICK", screens[5]);
    connect(screens[62], "NavTab2-CLICK", screens[12]);
    connect(screens[62], "NavTab3-CLICK", screens[13]);
    connect(screens[62], "NavTab4-CLICK", screens[14]);
    connect(screens[62], "CartIcon-CLICK", screens[8]);
    
    // Admin Notifications (63)
    connect(screens[63], "BackToAdminDash8-CLICK", screens[55]);
    connect(screens[63], "MarkAllReadAdmin-CLICK", screens[63]);
    for (let i = 0; i < 5; i++) {
      connect(screens[63], "AdminNotif" + i + "-CLICK", screens[63]);
      connect(screens[63], "ViewNotifDetail" + i + "-CLICK", screens[63]);
      connect(screens[63], "DismissNotif" + i + "-CLICK", screens[63]);
    }
    connect(screens[63], "NavTab0-CLICK", screens[3]);
    connect(screens[63], "NavTab1-CLICK", screens[5]);
    connect(screens[63], "NavTab2-CLICK", screens[12]);
    connect(screens[63], "NavTab3-CLICK", screens[13]);
    connect(screens[63], "NavTab4-CLICK", screens[14]);
    connect(screens[63], "CartIcon-CLICK", screens[8]);
    
    figma.notify('🎉 Complete! 64 screens with full prototyping generated!');
    figma.closePlugin();
  }
};

figma.ui.postMessage({ type: 'ready' });

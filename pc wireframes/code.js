// ===== COMPLETE LOW-FIDELITY WEB WIREFRAMES =====
// Total: 43 Customer + 11 Restaurant + 10 Admin = 64 screens

figma.showUI(__html__, { width: 400, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    
    const targetPage = figma.root.children.find(p => p.name === 'Web_HF') || figma.currentPage;
    const screens = [];
    const W = 1440;
    const H = 900;
    let x = 0;
    let y = 4600; // START BELOW MOBILE WIREFRAMES
    const G = 150;
    const ROWGAP = 300;
    
    // ===== WIREFRAME HELPER FUNCTIONS =====
    
    function btnWire(parent, name, xPos, yPos, w, h) {
      const b = figma.createRectangle();
      b.name = name; // ✅ EXACT SAME NAME
      b.resize(w, h);
      b.x = xPos;
      b.y = yPos;
      b.cornerRadius = 12;
      b.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      b.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      b.strokeWeight = 2;
      parent.appendChild(b);
      
      const label = figma.createText();
      label.fontName = { family: "Inter", style: "Regular" };
      label.characters = "Button";
      label.fontSize = 14;
      label.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      label.x = xPos + w/2 - 25;
      label.y = yPos + h/2 - 7;
      parent.appendChild(label);
      
      return b;
    }
    
    function txtWire(parent, xPos, yPos, size) {
      const t = figma.createText();
      t.fontName = { family: "Inter", style: "Regular" };
      t.characters = "Text";
      t.fontSize = size;
      t.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      t.x = xPos;
      t.y = yPos;
      parent.appendChild(t);
      return t;
    }
    
    function cardWire(parent, xPos, yPos, w, h) {
      const c = figma.createRectangle();
      c.resize(w, h);
      c.x = xPos;
      c.y = yPos;
      c.cornerRadius = 16;
      c.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
      c.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
      c.strokeWeight = 1;
      parent.appendChild(c);
      return c;
    }
    
    function imgWire(parent, xPos, yPos, w, h) {
      const box = figma.createRectangle();
      box.resize(w, h);
      box.x = xPos;
      box.y = yPos;
      box.cornerRadius = 16;
      box.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
      box.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
      box.strokeWeight = 2;
      parent.appendChild(box);
      
      const line1 = figma.createLine();
      line1.resize(Math.sqrt(w*w + h*h), 0);
      line1.x = xPos;
      line1.y = yPos;
      line1.rotation = Math.atan2(h, w) * (180 / Math.PI);
      line1.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
      line1.strokeWeight = 2;
      parent.appendChild(line1);
      
      const line2 = figma.createLine();
      line2.resize(Math.sqrt(w*w + h*h), 0);
      line2.x = xPos + w;
      line2.y = yPos;
      line2.rotation = 180 - (Math.atan2(h, w) * (180 / Math.PI));
      line2.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
      line2.strokeWeight = 2;
      parent.appendChild(line2);
      
      return box;
    }
    
    function navBarWire(parent) {
      const header = figma.createRectangle();
      header.resize(W, 80);
      header.x = 0;
      header.y = 0;
      header.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
      header.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      header.strokeWeight = 2;
      parent.appendChild(header);
      
      txtWire(parent, 60, 30, 24);
      
      for (let i = 0; i < 5; i++) {
        const tab = cardWire(parent, 600 + (i * 150), 25, 130, 35);
        tab.name = "NavTab" + i + "-CLICK"; // ✅ EXACT SAME NAME
        txtWire(parent, 620 + (i * 150), 32, 14);
      }
      
      const cart = figma.createEllipse();
      cart.name = "CartIcon-CLICK"; // ✅ EXACT SAME NAME
      cart.resize(45, 45);
      cart.x = W - 100;
      cart.y = 18;
      cart.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
      cart.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      cart.strokeWeight = 2;
      parent.appendChild(cart);
    }
    
    figma.notify('🚀 Generating CHUNK 1: Customer Screens 1-10');
    
    // ===== ROW 1: CUSTOMER SCREENS (43 total) =====
    
    // S1: WebSplash
    const s1 = figma.createFrame();
    s1.name = "WebSplash"; // ✅ EXACT NAME
    s1.resize(W, H);
    s1.x = x;
    s1.y = y;
    s1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s1.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s1.strokeWeight = 2;
    targetPage.appendChild(s1);
    screens.push(s1);
    txtWire(s1, W/2 - 100, H/2 - 50, 48);
    btnWire(s1, "GetStarted-CLICK", W/2 - 120, H/2 + 60, 240, 60); // ✅
    x += W + G;
    
    // S2: WebLogin
    const s2 = figma.createFrame();
    s2.name = "WebLogin"; // ✅ EXACT NAME
    s2.resize(W, H);
    s2.x = x;
    s2.y = y;
    s2.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s2.strokeWeight = 2;
    targetPage.appendChild(s2);
    screens.push(s2);
    navBarWire(s2);
    cardWire(s2, W/2 - 280, 180, 560, 520);
    txtWire(s2, W/2 - 150, 240, 28);
    cardWire(s2, W/2 - 240, 350, 480, 55).name = "EmailInput"; // ✅
    cardWire(s2, W/2 - 240, 430, 480, 55).name = "PasswordInput"; // ✅
    btnWire(s2, "ForgotPassword-CLICK", W/2 + 100, 505, 140, 30); // ✅
    btnWire(s2, "Login-CLICK", W/2 - 120, 560, 240, 58); // ✅
    btnWire(s2, "SignupLink-CLICK", W/2 + 50, 635, 70, 25); // ✅
    x += W + G;
    
    // S3: WebForgotPassword
    const s3 = figma.createFrame();
    s3.name = "WebForgotPassword"; // ✅
    s3.resize(W, H);
    s3.x = x;
    s3.y = y;
    s3.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s3.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s3.strokeWeight = 2;
    targetPage.appendChild(s3);
    screens.push(s3);
    navBarWire(s3);
    cardWire(s3, W/2 - 280, 200, 560, 450);
    txtWire(s3, W/2 - 150, 260, 28);
    cardWire(s3, W/2 - 240, 380, 480, 55).name = "ResetEmailInput"; // ✅
    btnWire(s3, "SendResetLink-CLICK", W/2 - 120, 470, 240, 58); // ✅
    btnWire(s3, "BackToLogin-CLICK", W/2 - 80, 560, 160, 40); // ✅
    x += W + G;
    
    // S4: WebHome
    const s4 = figma.createFrame();
    s4.name = "WebHome"; // ✅
    s4.resize(W, H);
    s4.x = x;
    s4.y = y;
    s4.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s4.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s4.strokeWeight = 2;
    targetPage.appendChild(s4);
    screens.push(s4);
    navBarWire(s4);
    cardWire(s4, 60, 120, W - 120, 200);
    txtWire(s4, 100, 180, 32);
    btnWire(s4, "OrderNow-CLICK", 100, 260, 200, 50); // ✅
    imgWire(s4, W - 380, 140, 280, 150);
    const searchBar = cardWire(s4, 60, 360, W - 120, 60);
    searchBar.name = "SearchBar-CLICK"; // ✅
    txtWire(s4, 60, 460, 20);
    for (let i = 0; i < 6; i++) {
      const catBtn = cardWire(s4, 60 + (i * 210), 510, 200, 55);
      catBtn.name = "Category" + i + "-CLICK"; // ✅
      txtWire(s4, 80 + (i * 210), 527, 14);
    }
    txtWire(s4, 60, 610, 20);
    for (let i = 0; i < 3; i++) {
      const restCard = cardWire(s4, 60 + (i * 440), 660, 420, 180);
      restCard.name = "Restaurant" + i + "-CLICK"; // ✅
      imgWire(s4, 70 + (i * 440), 670, 400, 110);
      txtWire(s4, 80 + (i * 440), 795, 16);
    }
    x += W + G;
    
    // S5: WebSignup
    const s5 = figma.createFrame();
    s5.name = "WebSignup"; // ✅
    s5.resize(W, H);
    s5.x = x;
    s5.y = y;
    s5.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s5.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s5.strokeWeight = 2;
    targetPage.appendChild(s5);
    screens.push(s5);
    navBarWire(s5);
    cardWire(s5, W/2 - 280, 140, 560, 620);
    txtWire(s5, W/2 - 150, 200, 28);
    cardWire(s5, W/2 - 240, 300, 480, 55).name = "FullNameInput"; // ✅
    cardWire(s5, W/2 - 240, 375, 480, 55).name = "EmailSignupInput"; // ✅
    cardWire(s5, W/2 - 240, 450, 480, 55).name = "PhoneInput"; // ✅
    cardWire(s5, W/2 - 240, 525, 480, 55).name = "PasswordSignupInput"; // ✅
    cardWire(s5, W/2 - 240, 600, 480, 55).name = "ConfirmPasswordInput"; // ✅
    btnWire(s5, "Signup-CLICK", W/2 - 120, 680, 240, 58); // ✅
    btnWire(s5, "LoginLink-CLICK", W/2 + 60, 755, 60, 25); // ✅
    x += W + G;
    
    // S6: WebRestaurants
    const s6 = figma.createFrame();
    s6.name = "WebRestaurants"; // ✅
    s6.resize(W, H);
    s6.x = x;
    s6.y = y;
    s6.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s6.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s6.strokeWeight = 2;
    targetPage.appendChild(s6);
    screens.push(s6);
    navBarWire(s6);
    txtWire(s6, 60, 120, 28);
    cardWire(s6, 60, 170, W - 120, 60);
    btnWire(s6, "FilterCuisine-CLICK", 80, 185, 150, 30); // ✅
    btnWire(s6, "FilterRating-CLICK", 250, 185, 150, 30); // ✅
    btnWire(s6, "FilterDelivery-CLICK", 420, 185, 180, 30); // ✅
    btnWire(s6, "FilterPrice-CLICK", 620, 185, 150, 30); // ✅
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const restCard = cardWire(s6, 60 + (col * 660), 270 + (row * 190), 640, 170);
      restCard.name = "RestaurantDetail" + i + "-CLICK"; // ✅
      imgWire(s6, 75 + (col * 660), 285 + (row * 190), 200, 140);
      txtWire(s6, 295 + (col * 660), 295 + (row * 190), 22);
      btnWire(s6, "ViewMenu" + i + "-CLICK", 295 + (col * 660), 395 + (row * 190), 140, 40); // ✅
      btnWire(s6, "AddToFav" + i + "-CLICK", 650 + (col * 660), 295 + (row * 190), 35, 35); // ✅
    }
    x += W + G;
    
    // S7: WebRestaurantDetail
    const s7 = figma.createFrame();
    s7.name = "WebRestaurantDetail"; // ✅
    s7.resize(W, H);
    s7.x = x;
    s7.y = y;
    s7.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s7.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s7.strokeWeight = 2;
    targetPage.appendChild(s7);
    screens.push(s7);
    navBarWire(s7);
    imgWire(s7, 60, 120, W - 120, 250);
    txtWire(s7, 60, 400, 32);
    txtWire(s7, 60, 445, 16);
    btnWire(s7, "FavoriteRest-CLICK", W - 200, 405, 140, 45); // ✅
    cardWire(s7, 60, 490, W - 120, 80);
    txtWire(s7, 60, 600, 24);
    for (let i = 0; i < 6; i++) {
      const catBtn = cardWire(s7, 60 + (i * 210), 645, 200, 45);
      catBtn.name = "MenuCat" + i + "-CLICK"; // ✅
      txtWire(s7, 80 + (i * 210), 659, 16);
    }
    txtWire(s7, 60, 720, 20);
    for (let i = 0; i < 3; i++) {
      const itemCard = cardWire(s7, 60 + (i * 440), 760, 420, 120);
      itemCard.name = "MenuItem" + i + "-CLICK"; // ✅
      imgWire(s7, 75 + (i * 440), 770, 100, 100);
      txtWire(s7, 190 + (i * 440), 775, 18);
      btnWire(s7, "AddItem" + i + "-CLICK", 190 + (i * 440), 835, 120, 35); // ✅
    }
    x += W + G;
    
    // S8: WebItemDetail
    const s8 = figma.createFrame();
    s8.name = "WebItemDetail"; // ✅
    s8.resize(W, H);
    s8.x = x;
    s8.y = y;
    s8.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s8.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s8.strokeWeight = 2;
    targetPage.appendChild(s8);
    screens.push(s8);
    navBarWire(s8);
    btnWire(s8, "BackToMenu-CLICK", 60, 120, 100, 40); // ✅
    cardWire(s8, W/2 - 400, 180, 800, 600);
    imgWire(s8, W/2 - 380, 200, 360, 300);
    txtWire(s8, W/2 + 20, 220, 28);
    txtWire(s8, W/2 + 20, 410, 18);
    btnWire(s8, "SizeSmall-CLICK", W/2 + 20, 440, 100, 40); // ✅
    btnWire(s8, "SizeMedium-CLICK", W/2 + 140, 440, 100, 40); // ✅
    btnWire(s8, "SizeLarge-CLICK", W/2 + 260, 440, 100, 40); // ✅
    txtWire(s8, W/2 + 20, 500, 18);
    for (let i = 0; i < 3; i++) {
      const addon = cardWire(s8, W/2 + 20 + (i * 180), 530, 160, 40);
      addon.name = "Addon" + i + "-CLICK"; // ✅
    }
    btnWire(s8, "QtyMinus-CLICK", W/2 + 20, 620, 50, 50); // ✅
    btnWire(s8, "QtyPlus-CLICK", W/2 + 170, 620, 50, 50); // ✅
    btnWire(s8, "AddToCart-CLICK", W/2 + 20, 700, 340, 55); // ✅
    x += W + G;
    
    // S9: WebCart
    const s9 = figma.createFrame();
    s9.name = "WebCart"; // ✅
    s9.resize(W, H);
    s9.x = x;
    s9.y = y;
    s9.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s9.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s9.strokeWeight = 2;
    targetPage.appendChild(s9);
    screens.push(s9);
    navBarWire(s9);
    txtWire(s9, 60, 120, 28);
    for (let i = 0; i < 3; i++) {
      cardWire(s9, 60, 210 + (i * 130), 840, 110);
      imgWire(s9, 80, 225 + (i * 130), 80, 80);
      txtWire(s9, 180, 235 + (i * 130), 18);
      btnWire(s9, "CartQtyMinus" + i + "-CLICK", 700, 245 + (i * 130), 35, 35); // ✅
      btnWire(s9, "CartQtyPlus" + i + "-CLICK", 780, 245 + (i * 130), 35, 35); // ✅
      btnWire(s9, "RemoveItem" + i + "-CLICK", 840, 245 + (i * 130), 40, 40); // ✅
    }
    cardWire(s9, 960, 210, 420, 350);
    txtWire(s9, 995, 235, 20);
    btnWire(s9, "Checkout-CLICK", 980, 480, 380, 60); // ✅
    x += W + G;
    
    // S10: WebCheckout
    const s10 = figma.createFrame();
    s10.name = "WebCheckout"; // ✅
    s10.resize(W, H);
    s10.x = x;
    s10.y = y;
    s10.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s10.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s10.strokeWeight = 2;
    targetPage.appendChild(s10);
    screens.push(s10);
    navBarWire(s10);
    txtWire(s10, 60, 120, 28);
    cardWire(s10, 60, 180, 840, 620);
    cardWire(s10, 90, 250, 780, 70).name = "AddressInput"; // ✅
    btnWire(s10, "ChangeAddress-CLICK", 710, 265, 140, 40); // ✅
    cardWire(s10, 90, 390, 780, 60).name = "PhoneInput"; // ✅
    cardWire(s10, 90, 520, 780, 100).name = "InstructionsInput"; // ✅
    btnWire(s10, "PaymentCard-CLICK", 90, 690, 250, 50); // ✅
    btnWire(s10, "PaymentCash-CLICK", 360, 690, 250, 50); // ✅
    btnWire(s10, "PaymentWallet-CLICK", 630, 690, 250, 50); // ✅
    cardWire(s10, 960, 180, 420, 420);
    btnWire(s10, "PlaceOrder-CLICK", 980, 470, 380, 60); // ✅
    x += W + G;
    
    figma.notify('✅ Chunk 1 Complete: Screens 1-10 (Wireframe)');
    figma.notify('Say "next" for Screens 11-20!');
// ===== CHUNK 2: CUSTOMER SCREENS 11-20 (WIREFRAME) =====

// S11: WebOrderConfirmation
const s11 = figma.createFrame();
s11.name = "WebOrderConfirmation"; // ✅
s11.resize(W, H);
s11.x = x;
s11.y = y;
s11.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s11.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s11.strokeWeight = 2;
targetPage.appendChild(s11);
screens.push(s11);
navBarWire(s11);
const successCircle = figma.createEllipse();
successCircle.resize(150, 150);
successCircle.x = W/2 - 75;
successCircle.y = 200;
successCircle.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.95, b: 0.85}}];
successCircle.strokes = [{type: 'SOLID', color: {r: 0.5, g: 0.8, b: 0.5}}];
successCircle.strokeWeight = 3;
s11.appendChild(successCircle);
txtWire(s11, W/2 - 120, 380, 32);
txtWire(s11, W/2 - 150, 430, 16);
cardWire(s11, W/2 - 300, 490, 600, 240);
txtWire(s11, W/2 - 260, 530, 20);
txtWire(s11, W/2 - 260, 570, 16);
txtWire(s11, W/2 - 260, 610, 16);
txtWire(s11, W/2 - 260, 650, 16);
btnWire(s11, "TrackOrder-CLICK", W/2 - 150, 760, 300, 58); // ✅
x += W + G;

// S12: WebOrderTracking
const s12 = figma.createFrame();
s12.name = "WebOrderTracking"; // ✅
s12.resize(W, H);
s12.x = x;
s12.y = y;
s12.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s12.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s12.strokeWeight = 2;
targetPage.appendChild(s12);
screens.push(s12);
navBarWire(s12);
txtWire(s12, 60, 120, 28);
imgWire(s12, 60, 180, 640, 600);
cardWire(s12, 740, 180, 640, 600);
txtWire(s12, 780, 220, 22);
cardWire(s12, 780, 280, 560, 100);
txtWire(s12, 820, 300, 18);
txtWire(s12, 820, 335, 14);
btnWire(s12, "CallRider-CLICK", 1180, 305, 100, 45); // ✅
btnWire(s12, "ChatRider-CLICK", 1180, 355, 100, 45); // ✅
txtWire(s12, 780, 420, 18);
let timelineY = 470;
for (let i = 0; i < 4; i++) {
  const dot = figma.createEllipse();
  dot.resize(20, 20);
  dot.x = 795;
  dot.y = timelineY;
  dot.fills = [{type: 'SOLID', color: i < 2 ? {r: 0.3, g: 0.7, b: 0.3} : {r: 0.8, g: 0.8, b: 0.8}}];
  s12.appendChild(dot);
  txtWire(s12, 835, timelineY + 2, 14);
  if (i < 3) {
    const line = figma.createRectangle();
    line.resize(3, 50);
    line.x = 803;
    line.y = timelineY + 20;
    line.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
    s12.appendChild(line);
  }
  timelineY += 70;
}
x += W + G;

// S13: WebDeals
const s13 = figma.createFrame();
s13.name = "WebDeals"; // ✅
s13.resize(W, H);
s13.x = x;
s13.y = y;
s13.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s13.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s13.strokeWeight = 2;
targetPage.appendChild(s13);
screens.push(s13);
navBarWire(s13);
txtWire(s13, 60, 120, 28);
for (let i = 0; i < 3; i++) {
  const filterBtn = cardWire(s13, 60 + (i * 220), 180, 200, 45);
  filterBtn.name = "DealFilter" + i + "-CLICK"; // ✅
  txtWire(s13, 80 + (i * 220), 195, 14);
}
for (let i = 0; i < 6; i++) {
  const row = Math.floor(i / 3);
  const col = i % 3;
  const dealCard = cardWire(s13, 60 + (col * 440), 270 + (row * 280), 420, 260);
  dealCard.name = "Deal" + i + "-CLICK"; // ✅
  imgWire(s13, 75 + (col * 440), 285 + (row * 280), 390, 160);
  txtWire(s13, 85 + (col * 440), 460 + (row * 280), 18);
  txtWire(s13, 85 + (col * 440), 490 + (row * 280), 14);
  btnWire(s13, "ViewDeal" + i + "-CLICK", 300 + (col * 440), 485 + (row * 280), 140, 35); // ✅
}
x += W + G;

// S14: WebOrders
const s14 = figma.createFrame();
s14.name = "WebOrders"; // ✅
s14.resize(W, H);
s14.x = x;
s14.y = y;
s14.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s14.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s14.strokeWeight = 2;
targetPage.appendChild(s14);
screens.push(s14);
navBarWire(s14);
txtWire(s14, 60, 120, 28);
for (let i = 0; i < 3; i++) {
  const tabBtn = cardWire(s14, 60 + (i * 240), 180, 220, 45);
  tabBtn.name = "OrderTab" + i + "-CLICK"; // ✅
  txtWire(s14, 80 + (i * 240), 195, 14);
}
for (let i = 0; i < 5; i++) {
  const orderCard = cardWire(s14, 60, 270 + (i * 120), W - 120, 100);
  orderCard.name = "OrderItem" + i + "-CLICK"; // ✅
  imgWire(s14, 80, 285 + (i * 120), 80, 70);
  txtWire(s14, 180, 295 + (i * 120), 18);
  txtWire(s14, 180, 330 + (i * 120), 14);
  txtWire(s14, W - 320, 305 + (i * 120), 16);
  btnWire(s14, "TrackOrder" + i + "-CLICK", W - 280, 295 + (i * 120), 150, 40); // ✅
  btnWire(s14, "Reorder" + i + "-CLICK", W - 280, 340 + (i * 120), 150, 20); // ✅
}
x += W + G;

// S15: WebProfile
const s15 = figma.createFrame();
s15.name = "WebProfile"; // ✅
s15.resize(W, H);
s15.x = x;
s15.y = y;
s15.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s15.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s15.strokeWeight = 2;
targetPage.appendChild(s15);
screens.push(s15);
navBarWire(s15);
txtWire(s15, 60, 120, 28);
cardWire(s15, 60, 180, W - 120, 180);
const profileAvatar = figma.createEllipse();
profileAvatar.resize(120, 120);
profileAvatar.x = 100;
profileAvatar.y = 210;
profileAvatar.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
s15.appendChild(profileAvatar);
txtWire(s15, 250, 230, 24);
txtWire(s15, 250, 270, 14);
txtWire(s15, 250, 300, 14);
btnWire(s15, "EditProfile-CLICK", W - 240, 260, 150, 45); // ✅
txtWire(s15, 60, 400, 20);
const sections = [
  "MyOrders-CLICK",
  "SavedAddresses-CLICK",
  "PaymentMethods-CLICK",
  "Favorites-CLICK",
  "Notifications-CLICK",
  "Settings-CLICK"
];
let sectionY = 450;
for (const section of sections) {
  const sectionCard = cardWire(s15, 60, sectionY, W - 120, 60);
  sectionCard.name = section; // ✅
  txtWire(s15, 100, sectionY + 22, 16);
  sectionY += 75;
}
x += W + G;

// S16: WebEditProfile
const s16 = figma.createFrame();
s16.name = "WebEditProfile"; // ✅
s16.resize(W, H);
s16.x = x;
s16.y = y;
s16.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s16.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s16.strokeWeight = 2;
targetPage.appendChild(s16);
screens.push(s16);
navBarWire(s16);
btnWire(s16, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s16, 220, 130, 24);
cardWire(s16, W/2 - 300, 200, 600, 550);
const editAvatar = figma.createEllipse();
editAvatar.resize(120, 120);
editAvatar.x = W/2 - 60;
editAvatar.y = 230;
editAvatar.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
s16.appendChild(editAvatar);
btnWire(s16, "ChangePhoto-CLICK", W/2 - 60, 365, 120, 30); // ✅
cardWire(s16, W/2 - 260, 420, 520, 55).name = "FullNameEdit"; // ✅
cardWire(s16, W/2 - 260, 495, 520, 55).name = "EmailEdit"; // ✅
cardWire(s16, W/2 - 260, 570, 520, 55).name = "PhoneEdit"; // ✅
btnWire(s16, "SaveProfile-CLICK", W/2 - 120, 670, 240, 58); // ✅
x += W + G;

// S17: WebAddresses
const s17 = figma.createFrame();
s17.name = "WebAddresses"; // ✅
s17.resize(W, H);
s17.x = x;
s17.y = y;
s17.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s17.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s17.strokeWeight = 2;
targetPage.appendChild(s17);
screens.push(s17);
navBarWire(s17);
btnWire(s17, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s17, 220, 130, 24);
btnWire(s17, "AddNewAddress-CLICK", W - 240, 125, 180, 45); // ✅
for (let i = 0; i < 4; i++) {
  const addressCard = cardWire(s17, 60, 200 + (i * 130), W - 120, 110);
  addressCard.name = "Address" + i + "-CLICK"; // ✅
  txtWire(s17, 100, 230 + (i * 130), 18);
  txtWire(s17, 100, 265 + (i * 130), 14);
  btnWire(s17, "EditAddress" + i + "-CLICK", W - 340, 235 + (i * 130), 120, 40); // ✅
  btnWire(s17, "DeleteAddress" + i + "-CLICK", W - 200, 235 + (i * 130), 120, 40); // ✅
}
x += W + G;

// S18: WebAddAddress
const s18 = figma.createFrame();
s18.name = "WebAddAddress"; // ✅
s18.resize(W, H);
s18.x = x;
s18.y = y;
s18.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s18.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s18.strokeWeight = 2;
targetPage.appendChild(s18);
screens.push(s18);
navBarWire(s18);
btnWire(s18, "BackToAddresses-CLICK", 60, 120, 140, 40); // ✅
txtWire(s18, 220, 130, 24);
cardWire(s18, W/2 - 320, 200, 640, 570);
txtWire(s18, W/2 - 280, 240, 18);
cardWire(s18, W/2 - 280, 280, 560, 55).name = "AddressLine1"; // ✅
cardWire(s18, W/2 - 280, 355, 560, 55).name = "AddressLine2"; // ✅
cardWire(s18, W/2 - 280, 430, 260, 55).name = "City"; // ✅
cardWire(s18, W/2 + 0, 430, 260, 55).name = "PostalCode"; // ✅
cardWire(s18, W/2 - 280, 505, 560, 55).name = "PhoneNumber"; // ✅
txtWire(s18, W/2 - 280, 580, 16);
btnWire(s18, "AddressTypeHome-CLICK", W/2 - 280, 610, 150, 45); // ✅
btnWire(s18, "AddressTypeWork-CLICK", W/2 - 110, 610, 150, 45); // ✅
btnWire(s18, "AddressTypeOther-CLICK", W/2 + 60, 610, 150, 45); // ✅
btnWire(s18, "SaveAddress-CLICK", W/2 - 120, 700, 240, 58); // ✅
x += W + G;

// S19: WebPayments
const s19 = figma.createFrame();
s19.name = "WebPayments"; // ✅
s19.resize(W, H);
s19.x = x;
s19.y = y;
s19.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s19.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s19.strokeWeight = 2;
targetPage.appendChild(s19);
screens.push(s19);
navBarWire(s19);
btnWire(s19, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s19, 220, 130, 24);
btnWire(s19, "AddPaymentMethod-CLICK", W - 280, 125, 220, 45); // ✅
for (let i = 0; i < 3; i++) {
  const paymentCard = cardWire(s19, 60, 200 + (i * 130), W - 120, 110);
  paymentCard.name = "PaymentCard" + i + "-CLICK"; // ✅
  cardWire(s19, 100, 230 + (i * 130), 80, 50);
  txtWire(s19, 200, 235 + (i * 130), 18);
  txtWire(s19, 200, 265 + (i * 130), 14);
  btnWire(s19, "EditCard" + i + "-CLICK", W - 340, 235 + (i * 130), 120, 40); // ✅
  btnWire(s19, "DeleteCard" + i + "-CLICK", W - 200, 235 + (i * 130), 120, 40); // ✅
}
x += W + G;

// S20: WebAddPayment
const s20 = figma.createFrame();
s20.name = "WebAddPayment"; // ✅
s20.resize(W, H);
s20.x = x;
s20.y = y;
s20.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s20.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s20.strokeWeight = 2;
targetPage.appendChild(s20);
screens.push(s20);
navBarWire(s20);
btnWire(s20, "BackToPayments-CLICK", 60, 120, 140, 40); // ✅
txtWire(s20, 220, 130, 24);
cardWire(s20, W/2 - 320, 200, 640, 500);
txtWire(s20, W/2 - 280, 240, 18);
cardWire(s20, W/2 - 280, 280, 560, 55).name = "CardNumber"; // ✅
cardWire(s20, W/2 - 280, 355, 560, 55).name = "CardHolderName"; // ✅
cardWire(s20, W/2 - 280, 430, 260, 55).name = "ExpiryDate"; // ✅
cardWire(s20, W/2 + 0, 430, 260, 55).name = "CVV"; // ✅
txtWire(s20, W/2 - 280, 510, 16);
btnWire(s20, "CardTypeVisa-CLICK", W/2 - 280, 540, 120, 50); // ✅
btnWire(s20, "CardTypeMaster-CLICK", W/2 - 140, 540, 120, 50); // ✅
btnWire(s20, "CardTypeAmex-CLICK", W/2, 540, 120, 50); // ✅
btnWire(s20, "SaveCard-CLICK", W/2 - 120, 630, 240, 58); // ✅
x += W + G;

figma.notify('✅ Chunk 2 Complete: Screens 11-20 (Wireframe)');
figma.notify('Say "next" for Screens 21-30!');
// ===== CHUNK 3: CUSTOMER SCREENS 21-30 (WIREFRAME) =====

// S21: WebRewards
const s21 = figma.createFrame();
s21.name = "WebRewards"; // ✅
s21.resize(W, H);
s21.x = x;
s21.y = y;
s21.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s21.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];

s21.strokeWeight = 2;
targetPage.appendChild(s21);
screens.push(s21);
navBarWire(s21);
btnWire(s21, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s21, 220, 130, 24);
cardWire(s21, 60, 200, W - 120, 160);
txtWire(s21, 100, 240, 32);
txtWire(s21, 100, 290, 18);
btnWire(s21, "RedeemPoints-CLICK", W - 260, 240, 180, 50); // ✅
txtWire(s21, 60, 400, 20);
for (let i = 0; i < 4; i++) {
  const rewardCard = cardWire(s21, 60 + (i % 2) * 680, 450 + Math.floor(i / 2) * 180, 640, 160);
  rewardCard.name = "Reward" + i + "-CLICK"; // ✅
  imgWire(s21, 80 + (i % 2) * 680, 470 + Math.floor(i / 2) * 180, 120, 120);
  txtWire(s21, 220 + (i % 2) * 680, 480 + Math.floor(i / 2) * 180, 18);
  txtWire(s21, 220 + (i % 2) * 680, 520 + Math.floor(i / 2) * 180, 14);
  btnWire(s21, "ClaimReward" + i + "-CLICK", 500 + (i % 2) * 680, 500 + Math.floor(i / 2) * 180, 140, 45); // ✅
}
x += W + G;

// S22: WebNotifications
const s22 = figma.createFrame();
s22.name = "WebNotifications"; // ✅
s22.resize(W, H);
s22.x = x;
s22.y = y;
s22.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s22.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s22.strokeWeight = 2;
targetPage.appendChild(s22);
screens.push(s22);
navBarWire(s22);
btnWire(s22, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s22, 220, 130, 24);
btnWire(s22, "MarkAllRead-CLICK", W - 220, 125, 160, 45); // ✅
for (let i = 0; i < 3; i++) {
  const filterBtn = cardWire(s22, 60 + (i * 240), 190, 220, 45);
  filterBtn.name = "NotifFilter" + i + "-CLICK"; // ✅
  txtWire(s22, 80 + (i * 240), 205, 14);
}
for (let i = 0; i < 6; i++) {
  const notifCard = cardWire(s22, 60, 270 + (i * 100), W - 120, 90);
  notifCard.name = "Notification" + i + "-CLICK"; // ✅
  const notifIcon = figma.createEllipse();
  notifIcon.resize(50, 50);
  notifIcon.x = 90;
  notifIcon.y = 290 + (i * 100);
  notifIcon.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  s22.appendChild(notifIcon);
  txtWire(s22, 160, 295 + (i * 100), 16);
  txtWire(s22, 160, 325 + (i * 100), 13);
  txtWire(s22, W - 220, 305 + (i * 100), 12);
}
x += W + G;

// S23: WebSettings
const s23 = figma.createFrame();
s23.name = "WebSettings"; // ✅
s23.resize(W, H);
s23.x = x;
s23.y = y;
s23.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s23.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s23.strokeWeight = 2;
targetPage.appendChild(s23);
screens.push(s23);
navBarWire(s23);
btnWire(s23, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s23, 220, 130, 24);
const settingsSections = [
  "AccountSettings-CLICK",
  "NotificationPreferences-CLICK",
  "PrivacySecurity-CLICK",
  "LanguageRegion-CLICK",
  "PaymentSettings-CLICK",
  "HelpSupport-CLICK",
  "TermsConditions-CLICK",
  "AboutUs-CLICK"
];
let settingsY = 200;
for (const settingName of settingsSections) {
  const settingCard = cardWire(s23, 60, settingsY, W - 120, 70);
  settingCard.name = settingName; // ✅
  txtWire(s23, 100, settingsY + 27, 16);
  settingsY += 85;
}
btnWire(s23, "Logout-CLICK", 60, 800, W - 120, 55); // ✅
x += W + G;

// S24: WebHelp
const s24 = figma.createFrame();
s24.name = "WebHelp"; // ✅
s24.resize(W, H);
s24.x = x;
s24.y = y;
s24.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s24.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s24.strokeWeight = 2;
targetPage.appendChild(s24);
screens.push(s24);
navBarWire(s24);
btnWire(s24, "BackToSettings-CLICK", 60, 120, 140, 40); // ✅
txtWire(s24, 220, 130, 24);
cardWire(s24, 60, 200, W - 120, 60).name = "SearchHelp-CLICK"; // ✅
txtWire(s24, 60, 290, 20);
const helpTopics = [
  "OrderIssues-CLICK",
  "PaymentRefunds-CLICK",
  "AccountHelp-CLICK",
  "DeliveryTracking-CLICK",
  "RestaurantPartners-CLICK",
  "TechnicalSupport-CLICK"
];
let helpY = 330;
for (const helpTopic of helpTopics) {
  const helpCard = cardWire(s24, 60, helpY, W - 120, 70);
  helpCard.name = helpTopic; // ✅
  txtWire(s24, 100, helpY + 27, 16);
  helpY += 85;
}
btnWire(s24, "ContactSupport-CLICK", 60, 780, W - 120, 60); // ✅
x += W + G;

// S25: WebSearchResults
const s25 = figma.createFrame();
s25.name = "WebSearchResults"; // ✅
s25.resize(W, H);
s25.x = x;
s25.y = y;
s25.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s25.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s25.strokeWeight = 2;
targetPage.appendChild(s25);
screens.push(s25);
navBarWire(s25);
cardWire(s25, 60, 120, W - 120, 60).name = "SearchInput"; // ✅
btnWire(s25, "FilterResults-CLICK", W - 200, 135, 140, 30); // ✅
txtWire(s25, 60, 210, 20);
for (let i = 0; i < 8; i++) {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const resultCard = cardWire(s25, 60 + (col * 660), 260 + (row * 150), 640, 130);
  resultCard.name = "SearchResult" + i + "-CLICK"; // ✅
  imgWire(s25, 80 + (col * 660), 275 + (row * 150), 100, 100);
  txtWire(s25, 200 + (col * 660), 285 + (row * 150), 18);
  txtWire(s25, 200 + (col * 660), 320 + (row * 150), 14);
  btnWire(s25, "ViewItem" + i + "-CLICK", 500 + (col * 660), 305 + (row * 150), 140, 40); // ✅
}
x += W + G;

// S26: WebFilters
const s26 = figma.createFrame();
s26.name = "WebFilters"; // ✅
s26.resize(W, H);
s26.x = x;
s26.y = y;
s26.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s26.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s26.strokeWeight = 2;
targetPage.appendChild(s26);
screens.push(s26);
cardWire(s26, W/2 - 350, 100, 700, 700);
txtWire(s26, W/2 - 300, 140, 24);
btnWire(s26, "CloseFilters-CLICK", W/2 + 260, 145, 60, 40); // ✅
txtWire(s26, W/2 - 300, 220, 18);
for (let i = 0; i < 5; i++) {
  const catFilter = cardWire(s26, W/2 - 300 + (i % 3) * 200, 260 + Math.floor(i / 3) * 60, 180, 50);
  catFilter.name = "FilterCat" + i + "-CLICK"; // ✅
  txtWire(s26, W/2 - 280 + (i % 3) * 200, 277, 14);
}
txtWire(s26, W/2 - 300, 390, 18);
btnWire(s26, "FilterPrice1-CLICK", W/2 - 300, 430, 140, 45); // ✅
btnWire(s26, "FilterPrice2-CLICK", W/2 - 140, 430, 140, 45); // ✅
btnWire(s26, "FilterPrice3-CLICK", W/2 + 20, 430, 140, 45); // ✅
txtWire(s26, W/2 - 300, 510, 18);
btnWire(s26, "FilterRating4Plus-CLICK", W/2 - 300, 550, 140, 45); // ✅
btnWire(s26, "FilterRating3Plus-CLICK", W/2 - 140, 550, 140, 45); // ✅
txtWire(s26, W/2 - 300, 630, 18);
btnWire(s26, "FilterDeliveryFast-CLICK", W/2 - 300, 670, 180, 45); // ✅
btnWire(s26, "FilterDeliveryFree-CLICK", W/2 - 100, 670, 180, 45); // ✅
btnWire(s26, "ApplyFilters-CLICK", W/2 - 150, 750, 300, 55); // ✅
x += W + G;

// S27: WebReviewOrder
const s27 = figma.createFrame();
s27.name = "WebReviewOrder"; // ✅
s27.resize(W, H);
s27.x = x;
s27.y = y;
s27.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s27.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s27.strokeWeight = 2;
targetPage.appendChild(s27);
screens.push(s27);
navBarWire(s27);
txtWire(s27, W/2 - 150, 120, 28);
cardWire(s27, W/2 - 400, 200, 800, 600);
txtWire(s27, W/2 - 360, 240, 22);
for (let i = 0; i < 5; i++) {
  const starBtn = figma.createPolygon();
  starBtn.name = "Star" + (i + 1) + "-CLICK"; // ✅
  starBtn.resize(50, 50);
  starBtn.x = W/2 - 150 + (i * 70);
  starBtn.y = 300;
  starBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
  starBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  starBtn.strokeWeight = 2;
  s27.appendChild(starBtn);
}
txtWire(s27, W/2 - 360, 400, 18);
cardWire(s27, W/2 - 360, 440, 720, 150).name = "ReviewText"; // ✅
txtWire(s27, W/2 - 360, 620, 18);
for (let i = 0; i < 3; i++) {
  const photoBox = cardWire(s27, W/2 - 360 + (i * 250), 660, 230, 100);
  photoBox.name = "UploadPhoto" + i + "-CLICK"; // ✅
}
btnWire(s27, "SubmitReview-CLICK", W/2 - 150, 780, 300, 58); // ✅
x += W + G;

// S28: WebFavorites
const s28 = figma.createFrame();
s28.name = "WebFavorites"; // ✅
s28.resize(W, H);
s28.x = x;
s28.y = y;
s28.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s28.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s28.strokeWeight = 2;
targetPage.appendChild(s28);
screens.push(s28);
navBarWire(s28);
btnWire(s28, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s28, 220, 130, 24);
for (let i = 0; i < 2; i++) {
  const tabBtn = cardWire(s28, 60 + (i * 240), 190, 220, 45);
  tabBtn.name = "FavTab" + i + "-CLICK"; // ✅
  txtWire(s28, 80 + (i * 240), 205, 14);
}
for (let i = 0; i < 6; i++) {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const favCard = cardWire(s28, 60 + (col * 660), 270 + (row * 200), 640, 180);
  favCard.name = "FavItem" + i + "-CLICK"; // ✅
  imgWire(s28, 80 + (col * 660), 290 + (row * 200), 140, 140);
  txtWire(s28, 240 + (col * 660), 300 + (row * 200), 18);
  txtWire(s28, 240 + (col * 660), 340 + (row * 200), 14);
  btnWire(s28, "RemoveFav" + i + "-CLICK", 570 + (col * 660), 310 + (row * 200), 100, 40); // ✅
  btnWire(s28, "OrderAgain" + i + "-CLICK", 240 + (col * 660), 395 + (row * 200), 150, 45); // ✅
}
x += W + G;

// S29: WebPromoCode
const s29 = figma.createFrame();
s29.name = "WebPromoCode"; // ✅
s29.resize(W, H);
s29.x = x;
s29.y = y;
s29.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s29.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s29.strokeWeight = 2;
targetPage.appendChild(s29);
screens.push(s29);
navBarWire(s29);
btnWire(s29, "BackToCheckout-CLICK", 60, 120, 140, 40); // ✅
txtWire(s29, 220, 130, 24);
cardWire(s29, 60, 200, W - 120, 60);
cardWire(s29, 80, 215, W - 280, 30).name = "PromoInput"; // ✅
btnWire(s29, "ApplyPromo-CLICK", W - 180, 215, 120, 30); // ✅
txtWire(s29, 60, 300, 20);
for (let i = 0; i < 5; i++) {
  const promoCard = cardWire(s29, 60, 350 + (i * 110), W - 120, 90);
  promoCard.name = "Promo" + i + "-CLICK"; // ✅
  txtWire(s29, 100, 375 + (i * 110), 20);
  txtWire(s29, 100, 410 + (i * 110), 14);
  btnWire(s29, "UsePromo" + i + "-CLICK", W - 220, 375 + (i * 110), 140, 40); // ✅
}
x += W + G;

// S30: WebFAQDetail
const s30 = figma.createFrame();
s30.name = "WebFAQDetail"; // ✅
s30.resize(W, H);
s30.x = x;
s30.y = y;
s30.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s30.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s30.strokeWeight = 2;
targetPage.appendChild(s30);
screens.push(s30);
navBarWire(s30);
btnWire(s30, "BackToHelp-CLICK", 60, 120, 140, 40); // ✅
txtWire(s30, 220, 130, 24);
cardWire(s30, W/2 - 400, 200, 800, 600);
txtWire(s30, W/2 - 360, 240, 22);
for (let i = 0; i < 6; i++) {
  const faqCard = cardWire(s30, W/2 - 360, 300 + (i * 90), 720, 80);
  faqCard.name = "FAQ" + i + "-CLICK"; // ✅
  txtWire(s30, W/2 - 320, 325 + (i * 90), 16);
}
btnWire(s30, "ContactSupport-CLICK", W/2 - 150, 840, 300, 50); // ✅
x += W + G;

figma.notify('✅ Chunk 3 Complete: Screens 21-30 (Wireframe)');
figma.notify('Say "next" for Screens 31-40!');
// ===== CHUNK 4: CUSTOMER SCREENS 31-40 (WIREFRAME) =====

// S31: WebChatSupport
const s31 = figma.createFrame();
s31.name = "WebChatSupport"; // ✅
s31.resize(W, H);
s31.x = x;
s31.y = y;
s31.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s31.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s31.strokeWeight = 2;
targetPage.appendChild(s31);
screens.push(s31);
navBarWire(s31);
btnWire(s31, "BackToHelp-CLICK", 60, 120, 140, 40); // ✅
txtWire(s31, 220, 130, 24);
cardWire(s31, W/2 - 400, 200, 800, 600);
txtWire(s31, W/2 - 360, 240, 18);
let chatY = 290;
const chatHeights = [60, 50, 80, 45, 70, 55];
for (let i = 0; i < 6; i++) {
  const bubble = cardWire(s31, i % 2 === 0 ? W/2 - 340 : W/2 + 80, chatY, i % 2 === 0 ? 400 : 360, chatHeights[i]);
  bubble.fills = [{type: 'SOLID', color: i % 2 === 0 ? {r: 0.95, g: 0.95, b: 0.95} : {r: 0.88, g: 0.92, b: 0.98}}];
  txtWire(s31, (i % 2 === 0 ? W/2 - 320 : W/2 + 100), chatY + 15, 14);
  chatY += chatHeights[i] + 15;
}
cardWire(s31, W/2 - 360, 730, 660, 50).name = "ChatInput"; // ✅
btnWire(s31, "SendMessage-CLICK", W/2 + 250, 735, 80, 40); // ✅
x += W + G;

// S32: WebLiveTracking
const s32 = figma.createFrame();
s32.name = "WebLiveTracking"; // ✅
s32.resize(W, H);
s32.x = x;
s32.y = y;
s32.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s32.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s32.strokeWeight = 2;
targetPage.appendChild(s32);
screens.push(s32);
navBarWire(s32);
txtWire(s32, 60, 120, 28);
imgWire(s32, 60, 180, W - 120, 420);
const riderMarker = figma.createEllipse();
riderMarker.resize(50, 50);
riderMarker.x = W/2 - 25;
riderMarker.y = 370;
riderMarker.fills = [{type: 'SOLID', color: {r: 0.3, g: 0.7, b: 0.3}}];
s32.appendChild(riderMarker);
cardWire(s32, 60, 630, W - 120, 180);
txtWire(s32, 100, 670, 20);
txtWire(s32, 100, 710, 16);
btnWire(s32, "CallRider-CLICK", W - 340, 680, 120, 45); // ✅
btnWire(s32, "ChatRider-CLICK", W - 200, 680, 120, 45); // ✅
btnWire(s32, "ShareLiveLocation-CLICK", 100, 760, 240, 40); // ✅
x += W + G;

// S33: WebReferral
const s33 = figma.createFrame();
s33.name = "WebReferral"; // ✅
s33.resize(W, H);
s33.x = x;
s33.y = y;
s33.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s33.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s33.strokeWeight = 2;
targetPage.appendChild(s33);
screens.push(s33);
navBarWire(s33);
btnWire(s33, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s33, 220, 130, 24);
cardWire(s33, W/2 - 400, 200, 800, 600);
txtWire(s33, W/2 - 360, 250, 28);
txtWire(s33, W/2 - 360, 310, 16);
cardWire(s33, W/2 - 360, 360, 720, 80);
txtWire(s33, W/2 - 320, 390, 24);
btnWire(s33, "CopyReferralCode-CLICK", W/2 + 200, 390, 120, 40); // ✅
txtWire(s33, W/2 - 360, 470, 18);
let socialX = W/2 - 360;
for (let i = 0; i < 4; i++) {
  const socialBtn = figma.createEllipse();
  socialBtn.name = "ShareSocial" + i + "-CLICK"; // ✅
  socialBtn.resize(70, 70);
  socialBtn.x = socialX;
  socialBtn.y = 520;
  socialBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
  socialBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  socialBtn.strokeWeight = 2;
  s33.appendChild(socialBtn);
  socialX += 100;
}
txtWire(s33, W/2 - 360, 630, 18);
for (let i = 0; i < 2; i++) {
  cardWire(s33, W/2 - 360, 670 + (i * 70), 720, 60);
  txtWire(s33, W/2 - 320, 690 + (i * 70), 16);
}
x += W + G;

// S34: WebWallet
const s34 = figma.createFrame();
s34.name = "WebWallet"; // ✅
s34.resize(W, H);
s34.x = x;
s34.y = y;
s34.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s34.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s34.strokeWeight = 2;
targetPage.appendChild(s34);
screens.push(s34);
navBarWire(s34);
btnWire(s34, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s34, 220, 130, 24);
cardWire(s34, 60, 200, W - 120, 180);
txtWire(s34, 100, 250, 18);
txtWire(s34, 100, 290, 48);
btnWire(s34, "AddMoney-CLICK", W - 260, 270, 180, 50); // ✅
txtWire(s34, 60, 420, 20);
for (let i = 0; i < 5; i++) {
  const txnCard = cardWire(s34, 60, 470 + (i * 90), W - 120, 75);
  txnCard.name = "Transaction" + i + "-CLICK"; // ✅
  txtWire(s34, 100, 490 + (i * 90), 16);
  txtWire(s34, 100, 520 + (i * 90), 13);
  txtWire(s34, W - 220, 500 + (i * 90), 18);
}
x += W + G;

// S35: WebSubscription
const s35 = figma.createFrame();
s35.name = "WebSubscription"; // ✅
s35.resize(W, H);
s35.x = x;
s35.y = y;
s35.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s35.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s35.strokeWeight = 2;
targetPage.appendChild(s35);
screens.push(s35);
navBarWire(s35);
btnWire(s35, "BackToProfile-CLICK", 60, 120, 140, 40); // ✅
txtWire(s35, 220, 130, 24);
for (let i = 0; i < 3; i++) {
  const planCard = cardWire(s35, 60 + (i * 440), 200, 420, 550);
  planCard.name = "Plan" + i + "-CLICK"; // ✅
  txtWire(s35, 100 + (i * 440), 240, 24);
  txtWire(s35, 100 + (i * 440), 290, 36);
  txtWire(s35, 100 + (i * 440), 340, 14);
  let benefitY = 380;
  for (let j = 0; j < 6; j++) {
    txtWire(s35, 100 + (i * 440), benefitY, 14);
    benefitY += 35;
  }
  btnWire(s35, "Subscribe" + i + "-CLICK", 100 + (i * 440), 670, 340, 58); // ✅
}
x += W + G;

// S36: WebOrderDetails
const s36 = figma.createFrame();
s36.name = "WebOrderDetails"; // ✅
s36.resize(W, H);
s36.x = x;
s36.y = y;
s36.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s36.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s36.strokeWeight = 2;
targetPage.appendChild(s36);
screens.push(s36);
navBarWire(s36);
btnWire(s36, "BackToOrders-CLICK", 60, 120, 140, 40); // ✅
txtWire(s36, 220, 130, 24);
cardWire(s36, 60, 200, 840, 600);
txtWire(s36, 100, 240, 20);
cardWire(s36, 100, 280, 780, 80);
txtWire(s36, 120, 300, 16);
txtWire(s36, 120, 330, 14);
txtWire(s36, 100, 390, 18);
for (let i = 0; i < 3; i++) {
  cardWire(s36, 100, 430 + (i * 90), 780, 75);
  imgWire(s36, 120, 445 + (i * 90), 60, 45);
  txtWire(s36, 200, 455 + (i * 90), 16);
}
txtWire(s36, 100, 720, 18);
txtWire(s36, 120, 760, 14);
cardWire(s36, 960, 200, 420, 400);
txtWire(s36, 995, 240, 20);
txtWire(s36, 995, 300, 16);
btnWire(s36, "TrackOrder-CLICK", 980, 520, 380, 58); // ✅
x += W + G;

// S37: WebCancelOrder
const s37 = figma.createFrame();
s37.name = "WebCancelOrder"; // ✅
s37.resize(W, H);
s37.x = x;
s37.y = y;
s37.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s37.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s37.strokeWeight = 2;
targetPage.appendChild(s37);
screens.push(s37);
cardWire(s37, W/2 - 400, 150, 800, 600);
btnWire(s37, "CloseModal-CLICK", W/2 + 340, 180, 40, 40); // ✅
txtWire(s37, W/2 - 360, 220, 24);
txtWire(s37, W/2 - 360, 280, 16);
const reasons = ["WrongItem", "LateDelivery", "ChangedMind", "Other"];
let reasonY = 330;
for (const reason of reasons) {
  const reasonCard = cardWire(s37, W/2 - 360, reasonY, 720, 60);
  reasonCard.name = "CancelReason-" + reason + "-CLICK"; // ✅
  txtWire(s37, W/2 - 320, reasonY + 23, 16);
  reasonY += 75;
}
cardWire(s37, W/2 - 360, 640, 720, 80).name = "CancelComments"; // ✅
btnWire(s37, "ConfirmCancel-CLICK", W/2 - 150, 750, 300, 58); // ✅
x += W + G;

// S38: WebRefundStatus
const s38 = figma.createFrame();
s38.name = "WebRefundStatus"; // ✅
s38.resize(W, H);
s38.x = x;
s38.y = y;
s38.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s38.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s38.strokeWeight = 2;
targetPage.appendChild(s38);
screens.push(s38);
navBarWire(s38);
btnWire(s38, "BackToOrderDetails-CLICK", 60, 120, 180, 40); // ✅
txtWire(s38, 260, 130, 24);
cardWire(s38, W/2 - 400, 200, 800, 600);
txtWire(s38, W/2 - 360, 250, 22);
cardWire(s38, W/2 - 360, 310, 720, 100);
txtWire(s38, W/2 - 320, 340, 18);
txtWire(s38, W/2 - 320, 375, 14);
txtWire(s38, W/2 - 360, 440, 18);
let refundY = 490;
for (let i = 0; i < 4; i++) {
  const dot = figma.createEllipse();
  dot.resize(20, 20);
  dot.x = W/2 - 345;
  dot.y = refundY;
  dot.fills = [{type: 'SOLID', color: i < 2 ? {r: 0.3, g: 0.7, b: 0.3} : {r: 0.8, g: 0.8, b: 0.8}}];
  s38.appendChild(dot);
  txtWire(s38, W/2 - 305, refundY + 2, 14);
  if (i < 3) {
    const line = figma.createRectangle();
    line.resize(3, 50);
    line.x = W/2 - 337;
    line.y = refundY + 20;
    line.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
    s38.appendChild(line);
  }
  refundY += 70;
}
x += W + G;

// S39: WebRatings
const s39 = figma.createFrame();
s39.name = "WebRatings"; // ✅
s39.resize(W, H);
s39.x = x;
s39.y = y;
s39.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s39.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s39.strokeWeight = 2;
targetPage.appendChild(s39);
screens.push(s39);
navBarWire(s39);
btnWire(s39, "BackToRestaurant-CLICK", 60, 120, 180, 40); // ✅
txtWire(s39, 260, 130, 24);
cardWire(s39, 60, 200, W - 120, 140);
txtWire(s39, 100, 240, 48);
txtWire(s39, 100, 300, 16);
for (let i = 0; i < 3; i++) {
  const filterBtn = cardWire(s39, 60 + (i * 240), 370, 220, 45);
  filterBtn.name = "RatingFilter" + i + "-CLICK"; // ✅
  txtWire(s39, 80 + (i * 240), 385, 14);
}
for (let i = 0; i < 4; i++) {
  const reviewCard = cardWire(s39, 60, 450 + (i * 120), W - 120, 110);
  reviewCard.name = "Review" + i + "-CLICK"; // ✅
  const avatar = figma.createEllipse();
  avatar.resize(60, 60);
  avatar.x = 90;
  avatar.y = 475 + (i * 120);
  avatar.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  s39.appendChild(avatar);
  txtWire(s39, 170, 485 + (i * 120), 16);
  txtWire(s39, 170, 515 + (i * 120), 14);
}
x += W + G;

// S40: WebAbout
const s40 = figma.createFrame();
s40.name = "WebAbout"; // ✅
s40.resize(W, H);
s40.x = x;
s40.y = y;
s40.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s40.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s40.strokeWeight = 2;
targetPage.appendChild(s40);
screens.push(s40);
navBarWire(s40);
btnWire(s40, "BackToSettings-CLICK", 60, 120, 140, 40); // ✅
txtWire(s40, 220, 130, 24);
cardWire(s40, W/2 - 400, 200, 800, 600);
imgWire(s40, W/2 - 100, 240, 200, 80);
txtWire(s40, W/2 - 360, 360, 18);
txtWire(s40, W/2 - 360, 410, 14);
txtWire(s40, W/2 - 360, 500, 18);
const aboutSections = ["TermsOfService-CLICK", "PrivacyPolicy-CLICK", "Licenses-CLICK", "Credits-CLICK"];
let aboutY = 550;
for (const aboutSection of aboutSections) {
  const aboutCard = cardWire(s40, W/2 - 360, aboutY, 720, 60);
  aboutCard.name = aboutSection; // ✅
  txtWire(s40, W/2 - 320, aboutY + 23, 16);
  aboutY += 75;
}
x += W + G;

figma.notify('✅ Chunk 4 Complete: Screens 31-40 (Wireframe)');
figma.notify('Say "next" for Screens 41-43 + Restaurant Screens!');
// ===== CHUNK 5: CUSTOMER 41-43 + ROW 2 RESTAURANT SCREENS 1-7 (WIREFRAME) =====

// S41: WebLanguage
const s41 = figma.createFrame();
s41.name = "WebLanguage"; // ✅
s41.resize(W, H);
s41.x = x;
s41.y = y;
s41.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s41.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s41.strokeWeight = 2;
targetPage.appendChild(s41);
screens.push(s41);
navBarWire(s41);
btnWire(s41, "BackToSettings-CLICK", 60, 120, 140, 40); // ✅
txtWire(s41, 220, 130, 24);
cardWire(s41, W/2 - 400, 200, 800, 600);
txtWire(s41, W/2 - 360, 250, 20);
const languages = ["English", "Urdu", "Arabic", "Spanish", "French", "German", "Chinese", "Japanese"];
let langY = 310;
for (const lang of languages) {
  const langCard = cardWire(s41, W/2 - 360, langY, 720, 60);
  langCard.name = "Language-" + lang + "-CLICK"; // ✅
  txtWire(s41, W/2 - 320, langY + 23, 16);
  langY += 75;
}
x += W + G;

// S42: WebPrivacySettings
const s42 = figma.createFrame();
s42.name = "WebPrivacySettings"; // ✅
s42.resize(W, H);
s42.x = x;
s42.y = y;
s42.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s42.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s42.strokeWeight = 2;
targetPage.appendChild(s42);
screens.push(s42);
navBarWire(s42);
btnWire(s42, "BackToSettings-CLICK", 60, 120, 140, 40); // ✅
txtWire(s42, 220, 130, 24);
const privacyOptions = [
  "DataSharing-TOGGLE",
  "LocationTracking-TOGGLE",
  "PersonalizedAds-TOGGLE",
  "CookieConsent-TOGGLE",
  "ActivityTracking-TOGGLE",
  "ThirdPartySharing-TOGGLE"
];
let privacyY = 200;
for (const option of privacyOptions) {
  const privacyCard = cardWire(s42, 60, privacyY, W - 120, 80);
  privacyCard.name = option; // ✅
  txtWire(s42, 100, privacyY + 25, 18);
  txtWire(s42, 100, privacyY + 50, 13);
  const toggle = cardWire(s42, W - 240, privacyY + 20, 80, 40);
  toggle.cornerRadius = 20;
  toggle.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  privacyY += 100;
}
btnWire(s42, "SavePrivacySettings-CLICK", 60, 820, W - 120, 55); // ✅
x += W + G;

// S43: WebTermsConditions (Last Customer Screen!)
const s43 = figma.createFrame();
s43.name = "WebTermsConditions"; // ✅
s43.resize(W, H);
s43.x = x;
s43.y = y;
s43.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s43.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s43.strokeWeight = 2;
targetPage.appendChild(s43);
screens.push(s43);
navBarWire(s43);
btnWire(s43, "BackToAbout-CLICK", 60, 120, 140, 40); // ✅
txtWire(s43, 220, 130, 24);
cardWire(s43, 60, 200, W - 120, 660);
txtWire(s43, 100, 240, 22);
txtWire(s43, 100, 290, 14);
for (let i = 0; i < 12; i++) {
  txtWire(s43, 100, 330 + (i * 35), 13);
}
btnWire(s43, "AcceptTerms-CLICK", 60, 880, W - 120, 55); // ✅

x = 0; // Reset to left for Row 2
y += H + ROWGAP; // Move down to Row 2

figma.notify('✅ Customer Complete! Starting ROW 2: RESTAURANT SCREENS');

// ===== ROW 2: RESTAURANT MANAGEMENT SCREENS (11 screens) =====

// Sidebar helper for restaurant screens
function restaurantSidebar(parent) {
  const sidebar = figma.createRectangle();
  sidebar.resize(280, H);
  sidebar.x = 0;
  sidebar.y = 0;
  sidebar.fills = [{type: 'SOLID', color: {r: 0.92, g: 0.92, b: 0.92}}];
  sidebar.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  sidebar.strokeWeight = 2;
  parent.appendChild(sidebar);
  
  txtWire(parent, 40, 40, 20);
  
  const menuItems = [
    "RestDashboard-CLICK",
    "RestOrders-CLICK",
    "RestMenu-CLICK",
    "RestAnalytics-CLICK",
    "RestReviews-CLICK",
    "RestSettings-CLICK"
  ];
  
  let menuY = 140;
  for (const menuItem of menuItems) {
    const menuCard = cardWire(parent, 20, menuY, 240, 55);
    menuCard.name = menuItem; // ✅
    txtWire(parent, 50, menuY + 20, 14);
    menuY += 70;
  }
}

// R1: RestaurantLogin
const r1 = figma.createFrame();
r1.name = "RestaurantLogin"; // ✅
r1.resize(W, H);
r1.x = x;
r1.y = y;
r1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r1.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r1.strokeWeight = 2;
targetPage.appendChild(r1);
screens.push(r1);
txtWire(r1, W/2 - 150, 150, 32);
txtWire(r1, W/2 - 200, 200, 16);
cardWire(r1, W/2 - 300, 280, 600, 450);
txtWire(r1, W/2 - 100, 330, 24);
cardWire(r1, W/2 - 240, 400, 480, 55).name = "RestaurantEmailInput"; // ✅
cardWire(r1, W/2 - 240, 480, 480, 55).name = "RestaurantPasswordInput"; // ✅
btnWire(r1, "RestaurantLogin-CLICK", W/2 - 120, 570, 240, 58); // ✅
btnWire(r1, "RestaurantForgotPassword-CLICK", W/2 - 100, 650, 200, 30); // ✅
x += W + G;

// R2: RestaurantDashboard
const r2 = figma.createFrame();
r2.name = "RestaurantDashboard"; // ✅
r2.resize(W, H);
r2.x = x;
r2.y = y;
r2.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r2.strokeWeight = 2;
targetPage.appendChild(r2);
screens.push(r2);
restaurantSidebar(r2);
txtWire(r2, 320, 40, 28);
for (let i = 0; i < 4; i++) {
  const statCard = cardWire(r2, 320 + (i * 290), 120, 270, 140);
  txtWire(r2, 340 + (i * 290), 160, 36);
  txtWire(r2, 340 + (i * 290), 215, 16);
}
txtWire(r2, 320, 300, 20);
for (let i = 0; i < 3; i++) {
  const orderCard = cardWire(r2, 320, 350 + (i * 150), 1080, 130);
  orderCard.name = "RestaurantOrder" + i + "-CLICK"; // ✅
  txtWire(r2, 360, 380 + (i * 150), 16);
  txtWire(r2, 360, 415 + (i * 150), 14);
  btnWire(r2, "AcceptOrder" + i + "-CLICK", 1020, 385 + (i * 150), 120, 45); // ✅
  btnWire(r2, "RejectOrder" + i + "-CLICK", 1160, 385 + (i * 150), 120, 45); // ✅
}
x += W + G;

// R3: RestaurantOrders
const r3 = figma.createFrame();
r3.name = "RestaurantOrders"; // ✅
r3.resize(W, H);
r3.x = x;
r3.y = y;
r3.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r3.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r3.strokeWeight = 2;
targetPage.appendChild(r3);
screens.push(r3);
restaurantSidebar(r3);
txtWire(r3, 320, 40, 28);
for (let i = 0; i < 4; i++) {
  const filterBtn = cardWire(r3, 320 + (i * 270), 100, 250, 50);
  filterBtn.name = "OrderStatus" + i + "-CLICK"; // ✅
  txtWire(r3, 340 + (i * 270), 117, 14);
}
for (let i = 0; i < 4; i++) {
  const orderCard = cardWire(r3, 320, 180 + (i * 160), 1080, 140);
  orderCard.name = "ManageOrder" + i + "-CLICK"; // ✅
  txtWire(r3, 360, 210 + (i * 160), 18);
  txtWire(r3, 360, 245 + (i * 160), 14);
  btnWire(r3, "UpdateStatus" + i + "-CLICK", 1020, 225 + (i * 160), 150, 45); // ✅
  btnWire(r3, "ViewDetails" + i + "-CLICK", 1190, 225 + (i * 160), 150, 45); // ✅
}
x += W + G;

// R4: RestaurantMenu
const r4 = figma.createFrame();
r4.name = "RestaurantMenu"; // ✅
r4.resize(W, H);
r4.x = x;
r4.y = y;
r4.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r4.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r4.strokeWeight = 2;
targetPage.appendChild(r4);
screens.push(r4);
restaurantSidebar(r4);
txtWire(r4, 320, 40, 28);
btnWire(r4, "AddNewItem-CLICK", 1200, 35, 200, 50); // ✅
for (let i = 0; i < 5; i++) {
  const catBtn = cardWire(r4, 320 + (i * 220), 110, 200, 45);
  catBtn.name = "MenuCategory" + i + "-CLICK"; // ✅
  txtWire(r4, 340 + (i * 220), 125, 14);
}
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 3; j++) {
    const menuCard = cardWire(r4, 320 + (j * 360), 190 + (i * 310), 340, 290);
    menuCard.name = "EditMenuItem" + (i * 3 + j) + "-CLICK"; // ✅
    imgWire(r4, 330 + (j * 360), 200 + (i * 310), 320, 180);
    txtWire(r4, 340 + (j * 360), 395 + (i * 310), 16);
    btnWire(r4, "Edit" + (i * 3 + j) + "-CLICK", 340 + (j * 360), 455 + (i * 310), 140, 35); // ✅
    btnWire(r4, "Delete" + (i * 3 + j) + "-CLICK", 500 + (j * 360), 455 + (i * 310), 140, 35); // ✅
  }
}
x += W + G;

// R5: RestaurantAnalytics
const r5 = figma.createFrame();
r5.name = "RestaurantAnalytics"; // ✅
r5.resize(W, H);
r5.x = x;
r5.y = y;
r5.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r5.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r5.strokeWeight = 2;
targetPage.appendChild(r5);
screens.push(r5);
restaurantSidebar(r5);
txtWire(r5, 320, 40, 28);
for (let i = 0; i < 4; i++) {
  const timeBtn = cardWire(r5, 320 + (i * 270), 100, 250, 45);
  timeBtn.name = "TimeFilter" + i + "-CLICK"; // ✅
  txtWire(r5, 340 + (i * 270), 115, 14);
}
const chartBox1 = cardWire(r5, 320, 180, 530, 300);
txtWire(r5, 360, 220, 18);
imgWire(r5, 360, 260, 490, 200);
const chartBox2 = cardWire(r5, 870, 180, 530, 300);
txtWire(r5, 910, 220, 18);
imgWire(r5, 910, 260, 490, 200);
for (let i = 0; i < 3; i++) {
  const summaryCard = cardWire(r5, 320 + (i * 360), 510, 340, 120);
  txtWire(r5, 360 + (i * 360), 550, 32);
  txtWire(r5, 360 + (i * 360), 595, 16);
}
x += W + G;

// R6: RestaurantReviews
const r6 = figma.createFrame();
r6.name = "RestaurantReviews"; // ✅
r6.resize(W, H);
r6.x = x;
r6.y = y;
r6.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r6.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r6.strokeWeight = 2;
targetPage.appendChild(r6);
screens.push(r6);
restaurantSidebar(r6);
txtWire(r6, 320, 40, 28);
const ratingCard = cardWire(r6, 320, 100, 1080, 120);
txtWire(r6, 560, 140, 48);
txtWire(r6, 820, 160, 16);
for (let i = 0; i < 5; i++) {
  const ratingBtn = cardWire(r6, 320 + (i * 220), 250, 200, 45);
  ratingBtn.name = "RatingFilter" + i + "-CLICK"; // ✅
  txtWire(r6, 340 + (i * 220), 265, 14);
}
for (let i = 0; i < 4; i++) {
  const reviewCard = cardWire(r6, 320, 330 + (i * 140), 1080, 120);
  reviewCard.name = "Review" + i + "-CLICK"; // ✅
  const avatar = figma.createEllipse();
  avatar.resize(60, 60);
  avatar.x = 360;
  avatar.y = 360 + (i * 140);
  avatar.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  r6.appendChild(avatar);
  txtWire(r6, 440, 365 + (i * 140), 16);
  txtWire(r6, 440, 395 + (i * 140), 14);
  btnWire(r6, "ReplyReview" + i + "-CLICK", 1200, 375 + (i * 140), 120, 40); // ✅
}
x += W + G;

// R7: RestaurantSettings
const r7 = figma.createFrame();
r7.name = "RestaurantSettings"; // ✅
r7.resize(W, H);
r7.x = x;
r7.y = y;
r7.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r7.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r7.strokeWeight = 2;
targetPage.appendChild(r7);
screens.push(r7);
restaurantSidebar(r7);
txtWire(r7, 320, 40, 28);
const restaurantSettings = [
  "RestaurantInfo-CLICK",
  "BusinessHours-CLICK",
  "DeliverySettings-CLICK",
  "PaymentSettings-CLICK",
  "NotificationSettings-CLICK",
  "TeamManagement-CLICK"
];
let settingsY2 = 120;
for (const setting of restaurantSettings) {
  const settingCard = cardWire(r7, 320, settingsY2, 1080, 100);
  settingCard.name = setting; // ✅
  txtWire(r7, 360, settingsY2 + 35, 18);
  btnWire(r7, "Edit-" + setting, 1200, settingsY2 + 30, 120, 45); // ✅
  settingsY2 += 120;
}
x += W + G;

figma.notify('✅ Chunk 5 Complete: Customer + Restaurant 1-7!');
figma.notify('Say "next" for Restaurant 8-11 + Admin Screens!');
// ===== FINAL CHUNK 6: RESTAURANT 8-11 + ROW 3 ADMIN 1-10 + CLOSE (WIREFRAME) =====

// R8: RestaurantAddItem
const r8 = figma.createFrame();
r8.name = "RestaurantAddItem"; // ✅
r8.resize(W, H);
r8.x = x;
r8.y = y;
r8.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r8.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r8.strokeWeight = 2;
targetPage.appendChild(r8);
screens.push(r8);
restaurantSidebar(r8);
btnWire(r8, "BackToMenu-CLICK", 320, 40, 140, 40); // ✅
txtWire(r8, 480, 50, 24);
cardWire(r8, 320, 120, 1080, 720);
cardWire(r8, 360, 160, 240, 55).name = "ItemName"; // ✅
cardWire(r8, 360, 235, 240, 55).name = "ItemPrice"; // ✅
cardWire(r8, 360, 310, 500, 120).name = "ItemDescription"; // ✅
txtWire(r8, 360, 450, 16);
for (let i = 0; i < 3; i++) {
  const catBtn = cardWire(r8, 360 + (i * 180), 490, 160, 45);
  catBtn.name = "SelectCat" + i + "-CLICK"; // ✅
}
imgWire(r8, 900, 160, 460, 300);
btnWire(r8, "UploadImage-CLICK", 1050, 480, 160, 45); // ✅
btnWire(r8, "AddMenuItem-CLICK", 360, 780, 1000, 55); // ✅
x += W + G;

// R9: RestaurantProfile
const r9 = figma.createFrame();
r9.name = "RestaurantProfile"; // ✅
r9.resize(W, H);
r9.x = x;
r9.y = y;
r9.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r9.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r9.strokeWeight = 2;
targetPage.appendChild(r9);
screens.push(r9);
restaurantSidebar(r9);
txtWire(r9, 320, 40, 28);
cardWire(r9, 320, 120, 1080, 200);
imgWire(r9, 360, 140, 150, 150);
txtWire(r9, 540, 160, 24);
txtWire(r9, 540, 200, 16);
btnWire(r9, "EditRestProfile-CLICK", 1200, 180, 160, 50); // ✅
txtWire(r9, 320, 360, 20);
cardWire(r9, 320, 410, 1080, 380);
txtWire(r9, 360, 450, 18);
cardWire(r9, 360, 490, 1000, 280).name = "AboutRestaurant"; // ✅
btnWire(r9, "SaveChanges-CLICK", 320, 820, 1080, 55); // ✅
x += W + G;

// R10: RestaurantNotifications
const r10 = figma.createFrame();
r10.name = "RestaurantNotifications"; // ✅
r10.resize(W, H);
r10.x = x;
r10.y = y;
r10.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r10.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r10.strokeWeight = 2;
targetPage.appendChild(r10);
screens.push(r10);
restaurantSidebar(r10);
txtWire(r10, 320, 40, 28);
btnWire(r10, "MarkAllRead-CLICK", 1220, 45, 160, 40); // ✅
for (let i = 0; i < 6; i++) {
  const notifCard = cardWire(r10, 320, 120 + (i * 120), 1080, 100);
  notifCard.name = "RestNotif" + i + "-CLICK"; // ✅
  const icon = figma.createEllipse();
  icon.resize(50, 50);
  icon.x = 360;
  icon.y = 145 + (i * 120);
  icon.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  r10.appendChild(icon);
  txtWire(r10, 430, 150 + (i * 120), 16);
  txtWire(r10, 430, 180 + (i * 120), 13);
}
x += W + G;

// R11: RestaurantReports (Last Restaurant Screen!)
const r11 = figma.createFrame();
r11.name = "RestaurantReports"; // ✅
r11.resize(W, H);
r11.x = x;
r11.y = y;
r11.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r11.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r11.strokeWeight = 2;
targetPage.appendChild(r11);
screens.push(r11);
restaurantSidebar(r11);
txtWire(r11, 320, 40, 28);
btnWire(r11, "ExportReport-CLICK", 1220, 45, 160, 40); // ✅
for (let i = 0; i < 4; i++) {
  const reportBtn = cardWire(r11, 320 + (i * 270), 120, 250, 50);
  reportBtn.name = "ReportType" + i + "-CLICK"; // ✅
}
const reportCard = cardWire(r11, 320, 200, 1080, 640);
txtWire(r11, 360, 240, 20);
imgWire(r11, 360, 290, 1000, 520);

x = 0; // Reset to left for Row 3
y += H + ROWGAP; // Move down to Row 3

figma.notify('✅ Restaurant Complete! Starting ROW 3: ADMIN SCREENS');

// ===== ROW 3: ADMIN CONTROL SCREENS (10 screens) =====

// Admin sidebar helper
function adminSidebar(parent) {
  const sidebar = figma.createRectangle();
  sidebar.resize(280, H);
  sidebar.x = 0;
  sidebar.y = 0;
  sidebar.fills = [{type: 'SOLID', color: {r: 0.88, g: 0.88, b: 0.88}}];
  sidebar.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  sidebar.strokeWeight = 2;
  parent.appendChild(sidebar);
  
  txtWire(parent, 40, 40, 20);
  
  const menuItems = [
    "AdminDashboard-CLICK",
    "AdminUsers-CLICK",
    "AdminRestaurants-CLICK",
    "AdminOrders-CLICK",
    "AdminTransactions-CLICK",
    "AdminReports-CLICK"
  ];
  
  let menuY = 140;
  for (const menuItem of menuItems) {
    const menuCard = cardWire(parent, 20, menuY, 240, 55);
    menuCard.name = menuItem; // ✅
    txtWire(parent, 50, menuY + 20, 14);
    menuY += 70;
  }
}

// A1: AdminLogin
const a1 = figma.createFrame();
a1.name = "AdminLogin"; // ✅
a1.resize(W, H);
a1.x = x;
a1.y = y;
a1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a1.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a1.strokeWeight = 2;
targetPage.appendChild(a1);
screens.push(a1);
txtWire(a1, W/2 - 150, 150, 32);
txtWire(a1, W/2 - 200, 200, 16);
cardWire(a1, W/2 - 300, 280, 600, 450);
txtWire(a1, W/2 - 100, 330, 24);
cardWire(a1, W/2 - 240, 400, 480, 55).name = "AdminEmailInput"; // ✅
cardWire(a1, W/2 - 240, 480, 480, 55).name = "AdminPasswordInput"; // ✅
btnWire(a1, "AdminLogin-CLICK", W/2 - 120, 570, 240, 58); // ✅
x += W + G;

// A2: AdminDashboard
const a2 = figma.createFrame();
a2.name = "AdminDashboard"; // ✅
a2.resize(W, H);
a2.x = x;
a2.y = y;
a2.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a2.strokeWeight = 2;
targetPage.appendChild(a2);
screens.push(a2);
adminSidebar(a2);
txtWire(a2, 320, 40, 28);
for (let i = 0; i < 5; i++) {
  const statCard7 = cardWire(a2, 320 + (i * 230), 120, 210, 140);
  txtWire(a2, 340 + (i * 230), 160, 36);
  txtWire(a2, 340 + (i * 230), 215, 16);
}
const chartBox17 = cardWire(a2, 320, 300, 530, 280);
imgWire(a2, 360, 340, 490, 220);
const chartBox27 = cardWire(a2, 870, 300, 530, 280);
imgWire(a2, 910, 340, 490, 220);
txtWire(a2, 320, 620, 18);
for (let i = 0; i < 2; i++) {
  cardWire(a2, 320, 660 + (i * 110), 1080, 90);
  txtWire(a2, 360, 690 + (i * 110), 14);
}
x += W + G;

// A3: AdminUsers
const a3 = figma.createFrame();
a3.name = "AdminUsers"; // ✅
a3.resize(W, H);
a3.x = x;
a3.y = y;
a3.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a3.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a3.strokeWeight = 2;
targetPage.appendChild(a3);
screens.push(a3);
adminSidebar(a3);
txtWire(a3, 320, 40, 28);
cardWire(a3, 320, 100, 680, 55).name = "AdminSearchUsers-CLICK"; // ✅
btnWire(a3, "AddNewUser-CLICK", 1220, 105, 180, 50); // ✅
for (let i = 0; i < 3; i++) {
  const typeBtn = cardWire(a3, 320 + (i * 360), 185, 340, 45);
  typeBtn.name = "UserType" + i + "-CLICK"; // ✅
}
const tableHeader = cardWire(a3, 320, 260, 1080, 50);
tableHeader.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
for (let i = 0; i < 6; i++) {
  const userRow = cardWire(a3, 320, 320 + (i * 90), 1080, 80);
  userRow.name = "User" + i + "-CLICK"; // ✅
  const avatar = figma.createEllipse();
  avatar.resize(50, 50);
  avatar.x = 360;
  avatar.y = 335 + (i * 90);
  avatar.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  a3.appendChild(avatar);
  txtWire(a3, 430, 350 + (i * 90), 14);
  btnWire(a3, "EditUser" + i + "-CLICK", 1200, 340 + (i * 90), 80, 35); // ✅
  btnWire(a3, "BlockUser" + i + "-CLICK", 1290, 340 + (i * 90), 80, 35); // ✅
}
x += W + G;

// A4: AdminRestaurants
const a4 = figma.createFrame();
a4.name = "AdminRestaurants"; // ✅
a4.resize(W, H);
a4.x = x;
a4.y = y;
a4.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a4.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a4.strokeWeight = 2;
targetPage.appendChild(a4);
screens.push(a4);
adminSidebar(a4);
txtWire(a4, 320, 40, 28);
cardWire(a4, 320, 100, 680, 55).name = "AdminSearchRestaurants-CLICK"; // ✅
btnWire(a4, "ApproveRestaurant-CLICK", 1150, 105, 250, 50); // ✅
for (let i = 0; i < 3; i++) {
  const statusBtn = cardWire(a4, 320 + (i * 360), 185, 340, 45);
  statusBtn.name = "RestaurantStatus" + i + "-CLICK"; // ✅
}
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 3; j++) {
    const restCard = cardWire(a4, 320 + (j * 360), 260 + (i * 290), 340, 270);
    restCard.name = "AdminRestaurant" + (i * 3 + j) + "-CLICK"; // ✅
    imgWire(a4, 330 + (j * 360), 270 + (i * 290), 320, 160);
    txtWire(a4, 340 + (j * 360), 445 + (i * 290), 16);
    btnWire(a4, "ViewRestaurant" + (i * 3 + j) + "-CLICK", 340 + (j * 360), 500 + (i * 290), 150, 35); // ✅
  }
}
x += W + G;

// A5: AdminOrders
const a5 = figma.createFrame();
a5.name = "AdminOrders"; // ✅
a5.resize(W, H);
a5.x = x;
a5.y = y;
a5.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a5.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a5.strokeWeight = 2;
targetPage.appendChild(a5);
screens.push(a5);
adminSidebar(a5);
txtWire(a5, 320, 40, 28);
for (let i = 0; i < 4; i++) {
  const filterBtn = cardWire(a5, 320 + (i * 270), 100, 250, 50);
  filterBtn.name = "AdminOrderFilter" + i + "-CLICK"; // ✅
}
const orderTableHeader = cardWire(a5, 320, 180, 1080, 50);
orderTableHeader.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
for (let i = 0; i < 7; i++) {
  const orderRow = cardWire(a5, 320, 240 + (i * 85), 1080, 75);
  orderRow.name = "AdminOrder" + i + "-CLICK"; // ✅
  txtWire(a5, 360, 265 + (i * 85), 14);
  txtWire(a5, 1200, 265 + (i * 85), 16);
}
x += W + G;

// A6: AdminTransactions
const a6 = figma.createFrame();
a6.name = "AdminTransactions"; // ✅
a6.resize(W, H);
a6.x = x;
a6.y = y;
a6.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a6.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a6.strokeWeight = 2;
targetPage.appendChild(a6);
screens.push(a6);
adminSidebar(a6);
txtWire(a6, 320, 40, 28);
for (let i = 0; i < 4; i++) {
  const txnStatCard = cardWire(a6, 320 + (i * 275), 100, 255, 120);
  txtWire(a6, 340 + (i * 275), 140, 32);
}
const txnTableHeader = cardWire(a6, 320, 260, 1080, 50);
txnTableHeader.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
for (let i = 0; i < 7; i++) {
  const txnRow = cardWire(a6, 320, 320 + (i * 80), 1080, 70);
  txnRow.name = "Transaction" + i + "-CLICK"; // ✅
  txtWire(a6, 360, 345 + (i * 80), 14);
  txtWire(a6, 960, 345 + (i * 80), 16);
}
btnWire(a6, "ExportTransactions-CLICK", 1200, 800, 200, 50); // ✅
x += W + G;

// A7: AdminReports
const a7 = figma.createFrame();
a7.name = "AdminReports"; // ✅
a7.resize(W, H);
a7.x = x;
a7.y = y;
a7.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a7.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a7.strokeWeight = 2;
targetPage.appendChild(a7);
screens.push(a7);
adminSidebar(a7);
txtWire(a7, 320, 40, 28);
btnWire(a7, "GenerateReport-CLICK", 1200, 45, 200, 50); // ✅
for (let i = 0; i < 4; i++) {
  const reportBtn = cardWire(a7, 320 + (i * 270), 120, 250, 50);
  reportBtn.name = "AdminReportType" + i + "-CLICK"; // ✅
}
const reportArea = cardWire(a7, 320, 200, 1080, 640);
imgWire(a7, 360, 240, 1000, 560);
x += W + G;

// A8: AdminSettings
const a8 = figma.createFrame();
a8.name = "AdminSettings"; // ✅
a8.resize(W, H);
a8.x = x;
a8.y = y;
a8.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a8.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a8.strokeWeight = 2;
targetPage.appendChild(a8);
screens.push(a8);
adminSidebar(a8);
txtWire(a8, 320, 40, 28);
const adminSettings = [
  "PlatformSettings-CLICK",
  "CommissionRates-CLICK",
  "PaymentGateway-CLICK",
  "SecuritySettings-CLICK",
  "EmailTemplates-CLICK",
  "SystemMaintenance-CLICK"
];
let adminSettingsY = 120;
for (const setting of adminSettings) {
  const settingCard = cardWire(a8, 320, adminSettingsY, 1080, 100);
  settingCard.name = setting; // ✅
  txtWire(a8, 360, adminSettingsY + 35, 18);
  btnWire(a8, "ConfigSetting-" + setting, 1200, adminSettingsY + 30, 120, 45); // ✅
  adminSettingsY += 120;
}
x += W + G;

// A9: AdminAnalytics
const a9 = figma.createFrame();
a9.name = "AdminAnalytics"; // ✅
a9.resize(W, H);
a9.x = x;
a9.y = y;
a9.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a9.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a9.strokeWeight = 2;
targetPage.appendChild(a9);
screens.push(a9);
adminSidebar(a9);
txtWire(a9, 320, 40, 28);
for (let i = 0; i < 4; i++) {
  const periodBtn = cardWire(a9, 320 + (i * 270), 100, 250, 45);
  periodBtn.name = "AnalyticsPeriod" + i + "-CLICK"; // ✅
}
for (let i = 0; i < 2; i++) {
  const analyticsChart = cardWire(a9, 320 + (i * 540), 180, 520, 300);
  imgWire(a9, 340 + (i * 540), 220, 480, 240);
}
for (let i = 0; i < 4; i++) {
  const metricCard = cardWire(a9, 320 + (i * 270), 520, 250, 140);
  txtWire(a9, 340 + (i * 270), 560, 36);
  txtWire(a9, 340 + (i * 270), 615, 16);
}
x += W + G;

// A10: AdminSupport (Last Admin Screen!)
const a10 = figma.createFrame();
a10.name = "AdminSupport"; // ✅
a10.resize(W, H);
a10.x = x;
a10.y = y;
a10.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a10.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a10.strokeWeight = 2;
targetPage.appendChild(a10);
screens.push(a10);
adminSidebar(a10);
txtWire(a10, 320, 40, 28);
for (let i = 0; i < 3; i++) {
  const ticketBtn = cardWire(a10, 320 + (i * 360), 100, 340, 50);
  ticketBtn.name = "TicketFilter" + i + "-CLICK"; // ✅
}
for (let i = 0; i < 5; i++) {
  const ticketCard = cardWire(a10, 320, 180 + (i * 130), 1080, 110);
  ticketCard.name = "SupportTicket" + i + "-CLICK"; // ✅
  txtWire(a10, 360, 210 + (i * 130), 18);
  txtWire(a10, 360, 245 + (i * 130), 14);
  btnWire(a10, "ViewTicket" + i + "-CLICK", 1200, 220 + (i * 130), 140, 45); // ✅
}
x += W + G;

// ===== FINALIZE =====
figma.notify(`🎉 ALL COMPLETE! Generated ${screens.length} web wireframe screens!`);
figma.notify('43 Customer + 11 Restaurant + 10 Admin = 64 TOTAL SCREENS! 🚀');
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

figma.showUI(__html__, { width: 400, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    
    const targetPage = figma.root.children.find(p => p.name === 'test') || figma.currentPage;
    const screens = [];
    const W = 375;
    const H = 812;
    let x = 0;
    let y = 15 * (H + 150);  // Row 15 positioning
    const G = 100;
    
    // ===== COLOR SCHEME =====
    const C = {
      teal: {r: 0.24, g: 0.61, b: 0.61},
      darkTeal: {r: 0.17, g: 0.37, b: 0.37},
      yellow: {r: 0.96, g: 0.72, b: 0.26},
      red: {r: 0.91, g: 0.29, b: 0.24},
      white: {r: 1, g: 1, b: 1},
      text: {r: 0.2, g: 0.2, b: 0.2},
      lightBg: {r: 0.95, g: 0.95, b: 0.95},
      gray: {r: 0.7, g: 0.7, b: 0.7},
      green: {r: 0.2, g: 0.7, b: 0.3}
    };
    
    // ===== HELPER FUNCTIONS =====
    
    function btn(parent, name, xPos, yPos, w, h, color, text, fontSize) {
      const b = figma.createRectangle();
      b.name = name;
      b.resize(w, h);
      b.x = xPos;
      b.y = yPos;
      b.cornerRadius = h / 2;
      b.fills = [{type: 'SOLID', color: color}];
      parent.appendChild(b);
      
      if (text) {
        const t = figma.createText();
        t.fontName = { family: "Inter", style: "Bold" };
        t.characters = text;
        t.fontSize = fontSize;
        t.fills = [{type: 'SOLID', color: C.white}];
        t.textAlignHorizontal = "CENTER";
        t.x = xPos + w/2 - (text.length * fontSize * 0.3);
        t.y = yPos + h/2 - fontSize/2;
        parent.appendChild(t);
      }
      return b;
    }
    
    function txt(parent, text, xPos, yPos, size, color, style) {
      const t = figma.createText();
      t.fontName = { family: "Inter", style: style || "Regular" };
      t.characters = text;
      t.fontSize = size;
      t.fills = [{type: 'SOLID', color: color}];
      t.x = xPos;
      t.y = yPos;
      parent.appendChild(t);
      return t;
    }
    
    function inputField(parent, xPos, yPos, w, h, placeholder) {
      const box = figma.createRectangle();
      box.resize(w, h);
      box.x = xPos;
      box.y = yPos;
      box.cornerRadius = 12;
      box.fills = [{type: 'SOLID', color: C.lightBg}];
      box.strokes = [{type: 'SOLID', color: C.gray}];
      box.strokeWeight = 1;
      parent.appendChild(box);
      
      if (placeholder) {
        txt(parent, placeholder, xPos + 15, yPos + h/2 - 7, 14, C.gray, "Regular");
      }
      return box;
    }
    
    // iPhone X Transparent Notification Bar
    function notificationBar(parent) {
      const bar = figma.createRectangle();
      bar.name = "NotificationBar";
      bar.resize(W, 44);
      bar.x = 0;
      bar.y = 0;
      bar.fills = [{type: 'SOLID', color: C.white, opacity: 0.95}];
      parent.appendChild(bar);
      
      // Time on left
      txt(parent, "9:41", 16, 14, 14, C.text, "Bold");
      
      // Status icons on right (battery, signal, wifi)
      txt(parent, "📶", 300, 12, 12, C.text, "Regular");
      txt(parent, "📡", 325, 12, 12, C.text, "Regular");
      txt(parent, "🔋", 345, 12, 12, C.text, "Regular");
    }
    
    figma.notify('🚀 Chunk 1/4 - Creating screens 1-10...');
    
    // ====================
    // SCREEN 1: Pickup-Takeaway-Selection
    // ====================
    const s1 = figma.createFrame();
    s1.name = "106-Pickup-Takeaway-Selection";
    s1.resize(W, H);
    s1.x = x;
    s1.y = y;
    s1.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s1);
    
    // Header
    const header1 = figma.createRectangle();
    header1.resize(W, 60);
    header1.x = 0;
    header1.y = 44;
    header1.fills = [{type: 'SOLID', color: C.teal}];
    s1.appendChild(header1);
    txt(s1, "←", 15, 62, 24, C.white, "Bold");
    txt(s1, "Pickup / Takeaway", 55, 69, 18, C.white, "Bold");
    
    // Restaurant Info Card
    const infoCard = figma.createRectangle();
    infoCard.resize(315, 90);
    infoCard.x = 30;
    infoCard.y = 124;
    infoCard.cornerRadius = 12;
    infoCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s1.appendChild(infoCard);
    
    txt(s1, "🍕 Pizza Palace", 45, 139, 16, C.text, "Bold");
    txt(s1, "📍 123 Main Street, Gulberg", 45, 162, 12, C.gray, "Regular");
    txt(s1, "📞 0300-1234567", 45, 182, 12, C.teal, "Bold");
    
    // Time Selection
    txt(s1, "Pickup Time", 30, 234, 16, C.text, "Bold");
    
    const radio1 = figma.createEllipse();
    radio1.resize(20, 20);
    radio1.x = 40;
    radio1.y = 264;
    radio1.fills = [{type: 'SOLID', color: C.teal}];
    s1.appendChild(radio1);
    txt(s1, "ASAP (25 mins)", 70, 266, 14, C.text, "Regular");
    
    const radio2 = figma.createEllipse();
    radio2.resize(20, 20);
    radio2.x = 40;
    radio2.y = 304;
    radio2.fills = [{type: 'SOLID', color: C.white}];
    radio2.strokes = [{type: 'SOLID', color: C.gray}];
    radio2.strokeWeight = 2;
    s1.appendChild(radio2);
    txt(s1, "Schedule Pickup", 70, 306, 14, C.text, "Regular");
    
    // Preparation Time
    const timeCard = figma.createRectangle();
    timeCard.resize(315, 70);
    timeCard.x = 30;
    timeCard.y = 354;
    timeCard.cornerRadius = 12;
    timeCard.fills = [{type: 'SOLID', color: {r: 0.96, g: 0.96, b: 1}}];
    s1.appendChild(timeCard);
    
    txt(s1, "⏰", 45, 372, 24, C.text, "Regular");
    txt(s1, "Estimated: 20-25 minutes", 85, 381, 16, C.text, "Bold");
    
    // Pickup Instructions Card
    const instrCard = figma.createRectangle();
    instrCard.resize(315, 110);
    instrCard.x = 30;
    instrCard.y = 444;
    instrCard.cornerRadius = 12;
    instrCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s1.appendChild(instrCard);
    
    txt(s1, "Pickup Instructions", 45, 459, 14, C.text, "Bold");
    txt(s1, "• Come to counter #3", 45, 484, 12, C.gray, "Regular");
    txt(s1, "• Show order ID", 45, 504, 12, C.gray, "Regular");
    txt(s1, "• Parking available in front", 45, 524, 12, C.gray, "Regular");
    
    // Bottom Buttons
    btn(s1, "CancelPickup-CLICK", 30, 694, 150, 50, C.gray, "Cancel", 16);
    btn(s1, "ConfirmPickup-CLICK", 195, 694, 150, 50, C.green, "Confirm", 16);
    
    targetPage.appendChild(s1);
    screens.push(s1);
    x += W + G;
    
    // ====================
    // SCREEN 2: Pickup-Order-Ready-Notification
    // ====================
    const s2 = figma.createFrame();
    s2.name = "107-Pickup-Order-Ready-Notification";
    s2.resize(W, H);
    s2.x = x;
    s2.y = y;
    s2.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s2);
    
    // Large checkmark
    const checkCircle = figma.createEllipse();
    checkCircle.resize(120, 120);
    checkCircle.x = (W - 120) / 2;
    checkCircle.y = 140;
    checkCircle.fills = [{type: 'SOLID', color: C.green}];
    s2.appendChild(checkCircle);
    txt(s2, "✓", 175, 170, 60, C.white, "Bold");
    
    txt(s2, "Order Ready!", 130, 280, 24, C.text, "Bold");
    txt(s2, "Your order is ready for pickup", 85, 315, 14, C.gray, "Regular");
    
    // Order Details Card
    const orderCard2 = figma.createRectangle();
    orderCard2.resize(315, 140);
    orderCard2.x = 30;
    orderCard2.y = 360;
    orderCard2.cornerRadius = 12;
    orderCard2.fills = [{type: 'SOLID', color: C.lightBg}];
    s2.appendChild(orderCard2);
    
    txt(s2, "Order #1234567", 115, 380, 18, C.teal, "Bold");
    txt(s2, "🍕 Pizza Palace", 45, 415, 14, C.text, "Bold");
    txt(s2, "Counter: #3", 45, 440, 14, C.text, "Regular");
    txt(s2, "📍 123 Main St • 2.3 km", 45, 465, 12, C.gray, "Regular");
    
    // Urgency Timer
    const urgencyBox = figma.createRectangle();
    urgencyBox.resize(315, 40);
    urgencyBox.x = 30;
    urgencyBox.y = 520;
    urgencyBox.cornerRadius = 10;
    urgencyBox.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.95}}];
    s2.appendChild(urgencyBox);
    txt(s2, "⏰ Please pickup within 10 minutes", 60, 531, 13, C.red, "Bold");
    
    // Action Buttons
    btn(s2, "GetDirections-CLICK", 30, 590, 315, 50, C.teal, "Get Directions", 16);
    btn(s2, "CallRestaurant-CLICK", 30, 655, 315, 50, C.yellow, "Call Restaurant", 16);
    btn(s2, "ViewOrderDetails-CLICK", 30, 720, 315, 50, C.lightBg, "View Order", 16);
    
    targetPage.appendChild(s2);
    screens.push(s2);
    x += W + G;
    
    // ====================
    // SCREEN 3: Delivery-Type-Selection
    // ====================
    const s3 = figma.createFrame();
    s3.name = "108-Delivery-Type-Selection";
    s3.resize(W, H);
    s3.x = x;
    s3.y = y;
    s3.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s3);
    
    const header3 = figma.createRectangle();
    header3.resize(W, 60);
    header3.x = 0;
    header3.y = 44;
    header3.fills = [{type: 'SOLID', color: C.teal}];
    s3.appendChild(header3);
    txt(s3, "←", 15, 62, 24, C.white, "Bold");
    txt(s3, "Choose Delivery Type", 55, 69, 18, C.white, "Bold");
    
    const deliveryOptions = [
      {icon: "🚴", title: "Standard Delivery", price: "Free", time: "35-45 mins", desc: "Hand to hand delivery", selected: true},
      {icon: "⚡", title: "Express Delivery", price: "+Rs 50", time: "20-25 mins", desc: "Priority rider assignment", selected: false},
      {icon: "🚪", title: "Contactless", price: "Free", time: "35-45 mins", desc: "Leave at door", selected: false},
      {icon: "🚗", title: "Curbside Pickup", price: "Free", time: "Call on arrival", desc: "We bring to your car", selected: false}
    ];
    
    let cardY = 124;
    for (const option of deliveryOptions) {
      const card = figma.createRectangle();
      card.resize(315, 100);
      card.x = 30;
      card.y = cardY;
      card.cornerRadius = 12;
      card.fills = [{type: 'SOLID', color: option.selected ? {r: 0.9, g: 0.98, b: 0.98} : C.lightBg}];
      card.strokes = option.selected ? [{type: 'SOLID', color: C.teal}] : [];
      card.strokeWeight = option.selected ? 2 : 0;
      s3.appendChild(card);
      
      const radioBtn = figma.createEllipse();
      radioBtn.resize(20, 20);
      radioBtn.x = 45;
      radioBtn.y = cardY + 15;
      radioBtn.fills = option.selected ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.white}];
      radioBtn.strokes = [{type: 'SOLID', color: option.selected ? C.teal : C.gray}];
      radioBtn.strokeWeight = 2;
      s3.appendChild(radioBtn);
      
      txt(s3, option.icon, 75, cardY + 20, 24, C.text, "Regular");
      txt(s3, option.title, 110, cardY + 20, 14, C.text, "Bold");
      txt(s3, `${option.price} • ${option.time}`, 110, cardY + 43, 11, C.gray, "Regular");
      txt(s3, option.desc, 110, cardY + 63, 11, C.gray, "Regular");
      
      cardY += 115;
    }
    
    // Bottom Buttons
    btn(s3, "Cancel-CLICK", 30, 714, 150, 50, C.gray, "Cancel", 16);
    btn(s3, "ConfirmSelection-CLICK", 195, 714, 150, 50, C.teal, "Confirm", 16);
    
    targetPage.appendChild(s3);
    screens.push(s3);
    x += W + G;
    
    // ====================
    // SCREEN 4: Start-Group-Order
    // ====================
    const s4 = figma.createFrame();
    s4.name = "109-Start-Group-Order";
    s4.resize(W, H);
    s4.x = x;
    s4.y = y;
    s4.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s4);
    
    const header4 = figma.createRectangle();
    header4.resize(W, 60);
    header4.x = 0;
    header4.y = 44;
    header4.fills = [{type: 'SOLID', color: C.teal}];
    s4.appendChild(header4);
    txt(s4, "←", 15, 62, 24, C.white, "Bold");
    txt(s4, "Start Group Order", 55, 69, 18, C.white, "Bold");
    
    // Hero Section
    txt(s4, "👥", 160, 130, 48, C.text, "Regular");
    txt(s4, "Group Order", 125, 195, 24, C.text, "Bold");
    txt(s4, "Order together with friends!", 95, 225, 14, C.gray, "Regular");
    
    // Restaurant Info
    const restInfo = figma.createRectangle();
    restInfo.resize(315, 70);
    restInfo.x = 30;
    restInfo.y = 260;
    restInfo.cornerRadius = 12;
    restInfo.fills = [{type: 'SOLID', color: C.lightBg}];
    s4.appendChild(restInfo);
    
    txt(s4, "🍕 Pizza Palace", 45, 278, 14, C.text, "Bold");
    txt(s4, "📍 Delivery to: Gulberg III", 45, 300, 12, C.gray, "Regular");
    
    // Link Sharing Card
    const linkCard = figma.createRectangle();
    linkCard.resize(315, 90);
    linkCard.x = 30;
    linkCard.y = 350;
    linkCard.cornerRadius = 12;
    linkCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s4.appendChild(linkCard);
    
    txt(s4, "Share this link:", 45, 365, 13, C.text, "Bold");
    
    const linkBox = figma.createRectangle();
    linkBox.resize(275, 35);
    linkBox.x = 50;
    linkBox.y = 390;
    linkBox.cornerRadius = 8;
    linkBox.fills = [{type: 'SOLID', color: C.white}];
    s4.appendChild(linkBox);
    txt(s4, "foodapp.com/group/ABC123", 60, 400, 11, C.gray, "Regular");
    
    // Share Buttons
    txt(s4, "📱", 215, 393, 20, C.text, "Regular");
    txt(s4, "🔗", 250, 393, 20, C.teal, "Regular");
    txt(s4, "📧", 285, 393, 20, C.text, "Regular");
    
    // Code Sharing Card
    const codeCard = figma.createRectangle();
    codeCard.resize(315, 70);
    codeCard.x = 30;
    codeCard.y = 460;
    codeCard.cornerRadius = 12;
    codeCard.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.95}}];
    s4.appendChild(codeCard);
    
    txt(s4, "Or share code:", 45, 475, 13, C.text, "Bold");
    txt(s4, "ABC123", 150, 498, 20, C.teal, "Bold");
    
    // Settings
    txt(s4, "ℹ️ Max 10 participants • Deadline: 30 mins", 50, 555, 12, C.gray, "Regular");
    
    // Bottom Buttons
    btn(s4, "Cancel-CLICK", 30, 704, 150, 50, C.gray, "Cancel", 16);
    btn(s4, "StartOrdering-CLICK", 195, 704, 150, 50, C.green, "Start Ordering", 14);
    
    targetPage.appendChild(s4);
    screens.push(s4);
    x += W + G;
    
    // ====================
    // SCREEN 5: Group-Order-Lobby
    // ====================
    const s5 = figma.createFrame();
    s5.name = "110-Group-Order-Lobby";
    s5.resize(W, H);
    s5.x = x;
    s5.y = y;
    s5.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s5);
    
    const header5 = figma.createRectangle();
    header5.resize(W, 60);
    header5.x = 0;
    header5.y = 44;
    header5.fills = [{type: 'SOLID', color: C.teal}];
    s5.appendChild(header5);
    txt(s5, "←", 15, 62, 24, C.white, "Bold");
    txt(s5, "Group Order - ABC123", 55, 69, 16, C.white, "Bold");
    
    // Timer Badge
    const timerBadge = figma.createRectangle();
    timerBadge.resize(120, 28);
    timerBadge.x = 240;
    timerBadge.y = 62;
    timerBadge.cornerRadius = 14;
    timerBadge.fills = [{type: 'SOLID', color: C.yellow}];
    s5.appendChild(timerBadge);
    txt(s5, "⏱️ 25 mins left", 253, 69, 11, C.white, "Bold");
    
    // Host Card
    const hostCard = figma.createRectangle();
    hostCard.resize(315, 70);
    hostCard.x = 30;
    hostCard.y = 124;
    hostCard.cornerRadius = 12;
    hostCard.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    s5.appendChild(hostCard);
    
    txt(s5, "👤", 45, 139, 24, C.text, "Regular");
    txt(s5, "Ahmed (Host) ⭐", 80, 142, 14, C.text, "Bold");
    txt(s5, "2 items • Rs 890", 80, 162, 12, C.gray, "Regular");
    btn(s5, "ViewItems1-CLICK", 250, 144, 80, 30, C.teal, "View", 12);
    
    // Member Cards
    const memberCard1 = figma.createRectangle();
    memberCard1.resize(315, 70);
    memberCard1.x = 30;
    memberCard1.y = 209;
    memberCard1.cornerRadius = 12;
    memberCard1.fills = [{type: 'SOLID', color: C.lightBg}];
    s5.appendChild(memberCard1);
    
    txt(s5, "👤", 45, 224, 24, C.text, "Regular");
    txt(s5, "Sara", 80, 227, 14, C.text, "Bold");
    txt(s5, "1 item • Rs 450", 80, 247, 12, C.gray, "Regular");
    btn(s5, "ViewItems2-CLICK", 250, 229, 80, 30, C.teal, "View", 12);
    
    // Waiting Card
    const waitCard = figma.createRectangle();
    waitCard.resize(315, 60);
    waitCard.x = 30;
    waitCard.y = 294;
    waitCard.cornerRadius = 12;
    waitCard.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 0.98}}];
    waitCard.strokes = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    waitCard.strokeWeight = 2;
    waitCard.dashPattern = [5, 3];
    s5.appendChild(waitCard);
    
    txt(s5, "➕", 45, 308, 24, C.gray, "Regular");
    txt(s5, "Waiting for others...", 80, 312, 13, C.gray, "Regular");
    
    // Order Summary Card (Sticky Bottom)
    const summaryCard = figma.createRectangle();
    summaryCard.resize(315, 180);
    summaryCard.x = 30;
    summaryCard.y = 490;
    summaryCard.cornerRadius = 12;
    summaryCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s5.appendChild(summaryCard);
    
    txt(s5, "Order Summary", 45, 505, 16, C.text, "Bold");
    
    const divider1 = figma.createRectangle();
    divider1.resize(285, 1);
    divider1.x = 45;
    divider1.y = 535;
    divider1.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s5.appendChild(divider1);
    
    txt(s5, "Total Items:", 45, 545, 13, C.gray, "Regular");
    txt(s5, "6", 305, 545, 13, C.text, "Bold");
    
    txt(s5, "Subtotal:", 45, 568, 13, C.gray, "Regular");
    txt(s5, "Rs 2,540", 265, 568, 13, C.text, "Regular");
    
    txt(s5, "Delivery:", 45, 591, 13, C.gray, "Regular");
    txt(s5, "Free", 288, 591, 13, C.green, "Bold");
    
    const divider2 = figma.createRectangle();
    divider2.resize(285, 2);
    divider2.x = 45;
    divider2.y = 615;
    divider2.fills = [{type: 'SOLID', color: C.gray, opacity: 0.4}];
    s5.appendChild(divider2);
    
    txt(s5, "TOTAL:", 45, 627, 16, C.text, "Bold");
    txt(s5, "Rs 2,540", 255, 627, 16, C.teal, "Bold");
    txt(s5, "Per Person: Rs 846 (avg)", 45, 650, 11, C.gray, "Regular");
    
    // Bottom Buttons
    btn(s5, "AddMyItems-CLICK", 30, 690, 150, 50, C.lightBg, "Add Items", 14);
    btn(s5, "FinalizeOrder-CLICK", 195, 690, 150, 50, C.green, "Finalize", 14);
    
    targetPage.appendChild(s5);
    screens.push(s5);
    x += W + G;
    
    // ====================
    // SCREEN 6: Group-Order-Finalize
    // ====================
    const s6 = figma.createFrame();
    s6.name = "111-Group-Order-Finalize";
    s6.resize(W, H);
    s6.x = x;
    s6.y = y;
    s6.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s6);
    
    const header6 = figma.createRectangle();
    header6.resize(W, 60);
    header6.x = 0;
    header6.y = 44;
    header6.fills = [{type: 'SOLID', color: C.teal}];
    s6.appendChild(header6);
    txt(s6, "←", 15, 62, 24, C.white, "Bold");
    txt(s6, "Review Group Order", 55, 69, 18, C.white, "Bold");
    
    // Ahmed's Order Section
    const ahmed = figma.createRectangle();
    ahmed.resize(315, 110);
    ahmed.x = 30;
    ahmed.y = 124;
    ahmed.cornerRadius = 12;
    ahmed.fills = [{type: 'SOLID', color: C.lightBg}];
    s6.appendChild(ahmed);
    
    txt(s6, "📦 Ahmed's Order", 45, 139, 14, C.text, "Bold");
    txt(s6, "• Large Pizza - Rs 650", 45, 162, 12, C.gray, "Regular");
    txt(s6, "• Garlic Bread - Rs 240", 45, 180, 12, C.gray, "Regular");
    
    const divA = figma.createRectangle();
    divA.resize(285, 1);
    divA.x = 45;
    divA.y = 202;
    divA.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s6.appendChild(divA);
    
    txt(s6, "Subtotal: Rs 890", 45, 210, 12, C.text, "Bold");
    
    // Sara's Order Section
    const sara = figma.createRectangle();
    sara.resize(315, 80);
    sara.x = 30;
    sara.y = 249;
    sara.cornerRadius = 12;
    sara.fills = [{type: 'SOLID', color: C.lightBg}];
    s6.appendChild(sara);
    
    txt(s6, "📦 Sara's Order", 45, 264, 14, C.text, "Bold");
    txt(s6, "• Pasta - Rs 450", 45, 287, 12, C.gray, "Regular");
    
    const divS = figma.createRectangle();
    divS.resize(285, 1);
    divS.x = 45;
    divS.y = 305;
    divS.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s6.appendChild(divS);
    
    txt(s6, "Subtotal: Rs 450", 45, 313, 12, C.text, "Bold");
    
    // Total Summary Card
    const totalCard = figma.createRectangle();
    totalCard.resize(315, 160);
    totalCard.x = 30;
    totalCard.y = 349;
    totalCard.cornerRadius = 12;
    totalCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s6.appendChild(totalCard);
    
    txt(s6, "Total Summary", 45, 364, 15, C.text, "Bold");
    
    txt(s6, "Total Items:", 45, 390, 13, C.gray, "Regular");
    txt(s6, "6", 305, 390, 13, C.text, "Regular");
    
    txt(s6, "Food Total:", 45, 413, 13, C.gray, "Regular");
    txt(s6, "Rs 2,540", 260, 413, 13, C.text, "Regular");
    
    txt(s6, "Delivery:", 45, 436, 13, C.gray, "Regular");
    txt(s6, "Free", 288, 436, 13, C.green, "Bold");
    
    txt(s6, "Tax:", 45, 459, 13, C.gray, "Regular");
    txt(s6, "Rs 254", 272, 459, 13, C.text, "Regular");
    
    const divT = figma.createRectangle();
    divT.resize(285, 2);
    divT.x = 45;
    divT.y = 480;
    divT.fills = [{type: 'SOLID', color: C.teal}];
    s6.appendChild(divT);
    
    txt(s6, "GRAND TOTAL:", 45, 490, 16, C.text, "Bold");
    txt(s6, "Rs 2,794", 245, 490, 18, C.teal, "Bold");
    
    txt(s6, "Per Person Average: Rs 931", 45, 525, 11, C.gray, "Regular");
    
    // Bottom Buttons
    btn(s6, "EditGroup-CLICK", 30, 694, 150, 50, C.lightBg, "✏️ Edit", 14);
    btn(s6, "ProceedPayment-CLICK", 195, 694, 150, 50, C.green, "Proceed", 14);
    
    targetPage.appendChild(s6);
    screens.push(s6);
    x += W + G;
    
    // ====================
    // SCREEN 7: Split-Payment-Setup
    // ====================
    const s7 = figma.createFrame();
    s7.name = "112-Split-Payment-Setup";
    s7.resize(W, H);
    s7.x = x;
    s7.y = y;
    s7.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s7);
    
    const header7 = figma.createRectangle();
    header7.resize(W, 60);
    header7.x = 0;
    header7.y = 44;
    header7.fills = [{type: 'SOLID', color: C.teal}];
    s7.appendChild(header7);
    txt(s7, "←", 15, 62, 24, C.white, "Bold");
    txt(s7, "Split Payment", 55, 69, 18, C.white, "Bold");
    
    // Order Total
    txt(s7, "Rs 2,794", 140, 130, 28, C.teal, "Bold");
    txt(s7, "Total Amount", 145, 165, 13, C.gray, "Regular");
    
    // Split Type Selection
    txt(s7, "Split Type", 30, 195, 15, C.text, "Bold");
    
    const splitOptions = [
      {label: "Split Equally", sub: "Rs 931 per person (3 people)", selected: false},
      {label: "Split by Items", sub: "Each pays for their own items", selected: true},
      {label: "Custom Split", sub: "Manually enter amounts", selected: false}
    ];
    
    let splitY = 225;
    for (const opt of splitOptions) {
      const radioSplit = figma.createEllipse();
      radioSplit.resize(18, 18);
      radioSplit.x = 40;
      radioSplit.y = splitY;
      radioSplit.fills = opt.selected ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.white}];
      radioSplit.strokes = [{type: 'SOLID', color: C.teal}];
      radioSplit.strokeWeight = 2;
      s7.appendChild(radioSplit);
      
      txt(s7, opt.label, 70, splitY + 1, 14, C.text, "Regular");
      txt(s7, opt.sub, 70, splitY + 21, 11, C.gray, "Regular");
      
      splitY += 60;
    }
    
    // Payers List
    txt(s7, "Payers", 30, 395, 15, C.text, "Bold");
    
    const payer1 = figma.createRectangle();
    payer1.resize(315, 100);
    payer1.x = 30;
    payer1.y = 425;
    payer1.cornerRadius = 12;
    payer1.fills = [{type: 'SOLID', color: C.lightBg}];
    s7.appendChild(payer1);
    
    txt(s7, "1", 45, 442, 16, C.text, "Bold");
    txt(s7, "Ahmed", 80, 442, 14, C.text, "Bold");
    txt(s7, "Rs 890", 280, 442, 14, C.teal, "Bold");
    txt(s7, "💳 Select Payment Method", 80, 468, 12, C.gray, "Regular");
    
    const pendingBadge1 = figma.createRectangle();
    pendingBadge1.resize(80, 22);
    pendingBadge1.x = 80;
    pendingBadge1.y = 492;
    pendingBadge1.cornerRadius = 11;
    pendingBadge1.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s7.appendChild(pendingBadge1);
    txt(s7, "⏳ Pending", 90, 496, 11, C.yellow, "Bold");
    
    const payer2 = figma.createRectangle();
    payer2.resize(315, 100);
    payer2.x = 30;
    payer2.y = 540;
    payer2.cornerRadius = 12;
    payer2.fills = [{type: 'SOLID', color: C.lightBg}];
    s7.appendChild(payer2);
    
    txt(s7, "2", 45, 557, 16, C.text, "Bold");
    txt(s7, "Sara", 80, 557, 14, C.text, "Bold");
    txt(s7, "Rs 450", 280, 557, 14, C.teal, "Bold");
    txt(s7, "💳 Select Payment Method", 80, 583, 12, C.gray, "Regular");
    
    const pendingBadge2 = figma.createRectangle();
    pendingBadge2.resize(80, 22);
    pendingBadge2.x = 80;
    pendingBadge2.y = 607;
    pendingBadge2.cornerRadius = 11;
    pendingBadge2.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s7.appendChild(pendingBadge2);
    txt(s7, "⏳ Pending", 90, 611, 11, C.yellow, "Bold");
    
    // Bottom Button
    btn(s7, "SendPaymentRequests-CLICK", 30, 730, 315, 50, C.teal, "Send Requests", 16);
    
    targetPage.appendChild(s7);
    screens.push(s7);
    x += W + G;
    
    // ====================
    // SCREEN 8: Split-Payment-Status
    // ====================
    const s8 = figma.createFrame();
    s8.name = "113-Split-Payment-Status";
    s8.resize(W, H);
    s8.x = x;
    s8.y = y;
    s8.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s8);
    
    const header8 = figma.createRectangle();
    header8.resize(W, 60);
    header8.x = 0;
    header8.y = 44;
    header8.fills = [{type: 'SOLID', color: C.teal}];
    s8.appendChild(header8);
    txt(s8, "←", 15, 62, 24, C.white, "Bold");
    txt(s8, "Payment Status", 55, 69, 18, C.white, "Bold");
    
    // Progress Bar
    const progressBg = figma.createRectangle();
    progressBg.resize(315, 12);
    progressBg.x = 30;
    progressBg.y = 124;
    progressBg.cornerRadius = 6;
    progressBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s8.appendChild(progressBg);
    
    const progressFill = figma.createRectangle();
    progressFill.resize(151, 12);
    progressFill.x = 30;
    progressFill.y = 124;
    progressFill.cornerRadius = 6;
    progressFill.fills = [{type: 'SOLID', color: C.green}];
    s8.appendChild(progressFill);
    
    txt(s8, "Rs 1,340 / Rs 2,794", 120, 145, 13, C.gray, "Regular");
    txt(s8, "48% Complete", 145, 163, 12, C.green, "Bold");
    
    // Payment Tracking List
    txt(s8, "Payment Tracking", 30, 195, 15, C.text, "Bold");
    
    // Paid Card 1
    const paid1 = figma.createRectangle();
    paid1.resize(315, 85);
    paid1.x = 30;
    paid1.y = 225;
    paid1.cornerRadius = 12;
    paid1.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s8.appendChild(paid1);
    
    txt(s8, "✅", 45, 239, 24, C.green, "Regular");
    txt(s8, "Ahmed - Rs 890", 80, 242, 14, C.text, "Bold");
    txt(s8, "Paid via Card •••• 1234", 80, 263, 12, C.gray, "Regular");
    txt(s8, "Paid at 2:15 PM", 80, 283, 11, C.green, "Regular");
    
    // Paid Card 2
    const paid2 = figma.createRectangle();
    paid2.resize(315, 85);
    paid2.x = 30;
    paid2.y = 325;
    paid2.cornerRadius = 12;
    paid2.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s8.appendChild(paid2);
    
    txt(s8, "✅", 45, 339, 24, C.green, "Regular");
    txt(s8, "Sara - Rs 450", 80, 342, 14, C.text, "Bold");
    txt(s8, "Paid via Wallet", 80, 363, 12, C.gray, "Regular");
    txt(s8, "Paid at 2:16 PM", 80, 383, 11, C.green, "Regular");
    
    // Pending Card
    const pending = figma.createRectangle();
    pending.resize(315, 100);
    pending.x = 30;
    pending.y = 425;
    pending.cornerRadius = 12;
    pending.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.95}}];
    s8.appendChild(pending);
    
    txt(s8, "⏳", 45, 444, 24, C.yellow, "Regular");
    txt(s8, "Bilal - Rs 1,454", 80, 447, 14, C.text, "Bold");
    txt(s8, "Payment pending", 80, 468, 12, C.gray, "Regular");
    btn(s8, "Remind-CLICK", 80, 490, 90, 26, C.lightBg, "Remind", 11);
    btn(s8, "IllPay-CLICK", 180, 490, 90, 26, C.yellow, "I'll Pay", 11);
    
    // Remaining Amount
    const remainBox = figma.createRectangle();
    remainBox.resize(315, 60);
    remainBox.x = 30;
    remainBox.y = 545;
    remainBox.cornerRadius = 12;
    remainBox.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.95}}];
    s8.appendChild(remainBox);
    
    txt(s8, "REMAINING AMOUNT", 45, 558, 12, C.red, "Bold");
    txt(s8, "Rs 1,454", 260, 573, 20, C.red, "Bold");
    
    // Warning Message
    const warning = figma.createRectangle();
    warning.resize(315, 50);
    warning.x = 30;
    warning.y = 620;
    warning.cornerRadius = 12;
    warning.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.95}}];
    s8.appendChild(warning);
    
    txt(s8, "⚠️", 45, 636, 18, C.yellow, "Regular");
    txt(s8, "Order will not process until full payment", 75, 638, 11, C.gray, "Regular");
    
    // Bottom Buttons
    btn(s8, "CoverRemainder-CLICK", 30, 700, 315, 50, C.teal, "I'll Cover Remainder", 14);
    
    targetPage.appendChild(s8);
    screens.push(s8);
    x += W + G;
    
    // ====================
    // SCREEN 9: Multi-Restaurant-Cart
    // ====================
    const s9 = figma.createFrame();
    s9.name = "114-Multi-Restaurant-Cart";
    s9.resize(W, H);
    s9.x = x;
    s9.y = y;
    s9.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s9);
    
    const header9 = figma.createRectangle();
    header9.resize(W, 60);
    header9.x = 0;
    header9.y = 44;
    header9.fills = [{type: 'SOLID', color: C.teal}];
    s9.appendChild(header9);
    txt(s9, "←", 15, 62, 24, C.white, "Bold");
    txt(s9, "Your Cart (2 Restaurants)", 55, 69, 16, C.white, "Bold");
    
    // Restaurant 1 Section
    txt(s9, "🍕 Pizza Palace", 30, 124, 16, C.text, "Bold");
    
    const divR1 = figma.createRectangle();
    divR1.resize(315, 1);
    divR1.x = 30;
    divR1.y = 150;
    divR1.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s9.appendChild(divR1);
    
    txt(s9, "• Large Pizza - Rs 650 x1", 40, 162, 12, C.text, "Regular");
    txt(s9, "✏️", 280, 160, 14, C.teal, "Regular");
    txt(s9, "🗑️", 310, 160, 14, C.red, "Regular");
    
    txt(s9, "• Garlic Bread - Rs 240 x1", 40, 185, 12, C.text, "Regular");
    txt(s9, "✏️", 280, 183, 14, C.teal, "Regular");
    txt(s9, "🗑️", 310, 183, 14, C.red, "Regular");
    
    const rest1Total = figma.createRectangle();
    rest1Total.resize(315, 100);
    rest1Total.x = 30;
    rest1Total.y = 210;
    rest1Total.cornerRadius = 10;
    rest1Total.fills = [{type: 'SOLID', color: C.lightBg}];
    s9.appendChild(rest1Total);
    
    txt(s9, "Subtotal: Rs 890", 45, 225, 12, C.gray, "Regular");
    txt(s9, "Delivery: Rs 50", 45, 245, 12, C.gray, "Regular");
    txt(s9, "Tax: Rs 89", 45, 265, 12, C.gray, "Regular");
    txt(s9, "Total: Rs 1,029", 45, 285, 14, C.text, "Bold");
    txt(s9, "Est. Time: 30-40 mins", 220, 288, 10, C.gray, "Regular");
    
    // Restaurant 2 Section
    txt(s9, "🍔 Burger House", 30, 330, 16, C.text, "Bold");
    
    const divR2 = figma.createRectangle();
    divR2.resize(315, 1);
    divR2.x = 30;
    divR2.y = 356;
    divR2.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s9.appendChild(divR2);
    
    txt(s9, "• Beef Burger - Rs 400 x2", 40, 368, 12, C.text, "Regular");
    txt(s9, "✏️", 280, 366, 14, C.teal, "Regular");
    txt(s9, "🗑️", 310, 366, 14, C.red, "Regular");
    
    txt(s9, "• Fries - Rs 200 x1", 40, 391, 12, C.text, "Regular");
    txt(s9, "✏️", 280, 389, 14, C.teal, "Regular");
    txt(s9, "🗑️", 310, 389, 14, C.red, "Regular");
    
    const rest2Total = figma.createRectangle();
    rest2Total.resize(315, 110);
    rest2Total.x = 30;
    rest2Total.y = 416;
    rest2Total.cornerRadius = 10;
    rest2Total.fills = [{type: 'SOLID', color: C.lightBg}];
    s9.appendChild(rest2Total);
    
    txt(s9, "Subtotal: Rs 1,000", 45, 431, 12, C.gray, "Regular");
    txt(s9, "Delivery: Rs 50", 45, 451, 12, C.gray, "Regular");
    txt(s9, "Tax: Rs 100", 45, 471, 12, C.gray, "Regular");
    txt(s9, "Total: Rs 1,150", 45, 491, 14, C.text, "Bold");
    
    const warnBadge = figma.createRectangle();
    warnBadge.resize(200, 20);
    warnBadge.x = 45;
    warnBadge.y = 508;
    warnBadge.cornerRadius = 10;
    warnBadge.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s9.appendChild(warnBadge);
    txt(s9, "⚠️ Delivered separately", 55, 511, 10, C.yellow, "Bold");
    
    // Combined Total (Sticky Bottom)
    const grandTotal = figma.createRectangle();
    grandTotal.resize(315, 100);
    grandTotal.x = 30;
    grandTotal.y = 606;
    grandTotal.cornerRadius = 12;
    grandTotal.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s9.appendChild(grandTotal);
    
    txt(s9, "Food Total: Rs 1,890", 45, 621, 12, C.gray, "Regular");
    txt(s9, "Delivery Total: Rs 100", 45, 641, 12, C.gray, "Regular");
    txt(s9, "Tax Total: Rs 189", 45, 661, 12, C.gray, "Regular");
    txt(s9, "GRAND TOTAL: Rs 2,179", 45, 681, 16, C.teal, "Bold");
    
    // Bottom Button
    btn(s9, "Checkout-CLICK", 30, 730, 315, 50, C.green, "Checkout", 16);
    
    targetPage.appendChild(s9);
    screens.push(s9);
    x += W + G;
    
    // ====================
    // SCREEN 10: Allergen-Info-Modal
    // ====================
    const s10 = figma.createFrame();
    s10.name = "125-Allergen-Info-Modal";
    s10.resize(W, H);
    s10.x = x;
    s10.y = y;
    s10.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0.5}];

    
    notificationBar(s10);
    
    // Modal Overlay
    const modal = figma.createRectangle();
    modal.resize(330, 480);
    modal.x = 22;
    modal.y = 166;
    modal.cornerRadius = 16;
    modal.fills = [{type: 'SOLID', color: C.white}];
    s10.appendChild(modal);
    
    // Close button
    txt(s10, "✕", 320, 180, 20, C.gray, "Bold");
    
    txt(s10, "Allergen Information", 90, 190, 18, C.text, "Bold");
    
    const divM = figma.createRectangle();
    divM.resize(290, 1);
    divM.x = 42;
    divM.y = 220;
    divM.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s10.appendChild(divM);
    
    txt(s10, "Large Pizza", 42, 235, 16, C.text, "Bold");
    
    txt(s10, "Food Tags:", 42, 265, 13, C.text, "Bold");
    
    const tag1 = figma.createRectangle();
    tag1.resize(80, 24);
    tag1.x = 42;
    tag1.y = 285;
    tag1.cornerRadius = 12;
    tag1.fills = [{type: 'SOLID', color: C.red, opacity: 0.2}];
    s10.appendChild(tag1);
    txt(s10, "🌶️ Spicy", 52, 290, 11, C.red, "Bold");
    
    const tag2 = figma.createRectangle();
    tag2.resize(90, 24);
    tag2.x = 132;
    tag2.y = 285;
    tag2.cornerRadius = 12;
    tag2.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s10.appendChild(tag2);
    txt(s10, "🥬 Vegetarian", 142, 290, 11, C.green, "Bold");
    
    txt(s10, "⚠️ Allergen Warnings:", 42, 325, 14, C.red, "Bold");
    txt(s10, "• Contains Dairy (Cheese)", 42, 350, 12, C.text, "Regular");
    txt(s10, "• Contains Gluten (Wheat dough)", 42, 370, 12, C.text, "Regular");
    txt(s10, "• May contain traces of Nuts", 42, 390, 12, C.text, "Regular");
    
    txt(s10, "Nutritional Info (Expandable)", 42, 420, 13, C.text, "Bold");
    txt(s10, "Calories: 850 kcal", 42, 445, 11, C.gray, "Regular");
    txt(s10, "Protein: 35g | Carbs: 90g | Fat: 42g", 42, 465, 11, C.gray, "Regular");
    
    txt(s10, "View Full Details →", 42, 495, 12, C.teal, "Bold");
    
    // Pre-Checkout Warning Modal (Second Modal State)
    const modal2 = figma.createRectangle();
    modal2.resize(330, 380);
    modal2.x = 22;
    modal2.y = 680;
    modal2.cornerRadius = 16;
    modal2.fills = [{type: 'SOLID', color: C.white}];
    modal2.opacity = 0.3;  // Indicates it's alternative state
    s10.appendChild(modal2);
    
    txt(s10, "⚠️ Allergen Alert", 100, 710, 18, C.red, "Bold");
    txt(s10, "(Alternative Modal State)", 100, 735, 10, C.gray, "Regular");
    
    targetPage.appendChild(s10);
    screens.push(s10);
    x += W + G;
    
    figma.notify('✅ Chunk 1/4 Complete - 10 screens created');
    
    // Close plugin
       // ====================
    // SCREEN 11: Rider-Profile-Detail
    // ====================
    const s11 = figma.createFrame();
    s11.name = "126-Rider-Profile-Detail";
    s11.resize(W, H);
    s11.x = x;
    s11.y = y;
    s11.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s11);
    
    const header11 = figma.createRectangle();
    header11.resize(W, 60);
    header11.x = 0;
    header11.y = 44;
    header11.fills = [{type: 'SOLID', color: C.teal}];
    s11.appendChild(header11);
    txt(s11, "←", 15, 62, 24, C.white, "Bold");
    txt(s11, "Rider Details", 55, 69, 18, C.white, "Bold");
    
    // Rider Profile Card
    const riderCard = figma.createRectangle();
    riderCard.resize(315, 140);
    riderCard.x = 30;
    riderCard.y = 124;
    riderCard.cornerRadius = 12;
    riderCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s11.appendChild(riderCard);
    
    // Profile photo placeholder
    const photo = figma.createEllipse();
    photo.resize(70, 70);
    photo.x = 152;
    photo.y = 139;
    photo.fills = [{type: 'SOLID', color: C.teal}];
    s11.appendChild(photo);
    txt(s11, "👤", 172, 155, 30, C.white, "Regular");
    
    txt(s11, "Ahmed Khan", 145, 220, 16, C.text, "Bold");
    txt(s11, "⭐ 4.8 (1,234 deliveries)", 125, 240, 12, C.gray, "Regular");
    txt(s11, "🚴 Bike • ABC-123", 140, 256, 11, C.gray, "Regular");
    txt(s11, "📍 Currently 2.3 km away", 130, 272, 11, C.gray, "Regular");
    
    // Tab Navigation
    const tabBg = figma.createRectangle();
    tabBg.resize(315, 45);
    tabBg.x = 30;
    tabBg.y = 284;
    tabBg.cornerRadius = 10;
    tabBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s11.appendChild(tabBg);
    
    const tab1 = figma.createRectangle();
    tab1.resize(100, 35);
    tab1.x = 35;
    tab1.y = 289;
    tab1.cornerRadius = 8;
    tab1.fills = [{type: 'SOLID', color: C.teal}];
    s11.appendChild(tab1);
    txt(s11, "Info", 67, 300, 13, C.white, "Bold");
    
    txt(s11, "Communication", 147, 300, 12, C.gray, "Regular");
    txt(s11, "Timestamps", 255, 300, 12, C.gray, "Regular");
    
    // Info Tab Content
    txt(s11, "Rider Information", 30, 350, 15, C.text, "Bold");
    
    const infoCard11 = figma.createRectangle();
    infoCard11.resize(315, 200);
    infoCard11.x = 30;
    infoCard11.y = 380;
    infoCard11.cornerRadius = 12;
    infoCard11.fills = [{type: 'SOLID', color: C.lightBg}];
    s11.appendChild(infoCard11);
    
    txt(s11, "Total Deliveries:", 45, 395, 13, C.gray, "Regular");
    txt(s11, "1,234", 275, 395, 13, C.text, "Bold");
    
    txt(s11, "Success Rate:", 45, 420, 13, C.gray, "Regular");
    txt(s11, "98.5%", 270, 420, 13, C.green, "Bold");
    
    txt(s11, "Average Rating:", 45, 445, 13, C.gray, "Regular");
    txt(s11, "4.8/5.0", 265, 445, 13, C.text, "Bold");
    
    txt(s11, "Member Since:", 45, 470, 13, C.gray, "Regular");
    txt(s11, "Jan 2023", 260, 470, 13, C.text, "Bold");
    
    const divRider = figma.createRectangle();
    divRider.resize(285, 1);
    divRider.x = 45;
    divRider.y = 495;
    divRider.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s11.appendChild(divRider);
    
    txt(s11, "Badges:", 45, 510, 13, C.text, "Bold");
    
    const badge1 = figma.createRectangle();
    badge1.resize(130, 24);
    badge1.x = 45;
    badge1.y = 535;
    badge1.cornerRadius = 12;
    badge1.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s11.appendChild(badge1);
    txt(s11, "🏆 Top Performer", 55, 540, 10, C.yellow, "Bold");
    
    const badge2 = figma.createRectangle();
    badge2.resize(150, 24);
    badge2.x = 185;
    badge2.y = 535;
    badge2.cornerRadius = 12;
    badge2.fills = [{type: 'SOLID', color: C.teal, opacity: 0.2}];
    s11.appendChild(badge2);
    txt(s11, "⚡ Fast Delivery Specialist", 195, 540, 9, C.teal, "Bold");
    
    // Communication Log (shown as inactive tab preview)
    txt(s11, "Recent Communication:", 30, 600, 12, C.gray, "Regular");
    txt(s11, "📞 Call - 2:15 PM (45 sec)", 45, 625, 11, C.gray, "Regular");
    txt(s11, "💬 Chat - 2:10 PM", 45, 645, 11, C.gray, "Regular");
    
    // Bottom Buttons
    btn(s11, "CallRider-CLICK", 30, 720, 150, 50, C.teal, "📞 Call", 14);
    btn(s11, "ChatRider-CLICK", 195, 720, 150, 50, C.yellow, "💬 Chat", 14);
    
    targetPage.appendChild(s11);
    screens.push(s11);
    x += W + G;
    
    // ====================
    // SCREEN 12: Voice-Order
    // ====================
    const s12 = figma.createFrame();
    s12.name = "127-Voice-Order";
    s12.resize(W, H);
    s12.x = x;
    s12.y = y;
    s12.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s12);
    
    const header12 = figma.createRectangle();
    header12.resize(W, 60);
    header12.x = 0;
    header12.y = 44;
    header12.fills = [{type: 'SOLID', color: C.teal}];
    s12.appendChild(header12);
    txt(s12, "←", 15, 62, 24, C.white, "Bold");
    txt(s12, "Voice Order", 55, 69, 18, C.white, "Bold");
    
    // STATE 1 - Listening
    const micCircle = figma.createEllipse();
    micCircle.resize(150, 150);
    micCircle.x = (W - 150) / 2;
    micCircle.y = 180;
    micCircle.fills = [{type: 'SOLID', color: C.teal, opacity: 0.2}];
    s12.appendChild(micCircle);
    
    const micInner = figma.createEllipse();
    micInner.resize(100, 100);
    micInner.x = (W - 100) / 2;
    micInner.y = 205;
    micInner.fills = [{type: 'SOLID', color: C.teal}];
    s12.appendChild(micInner);
    
    txt(s12, "🎤", 172, 235, 40, C.white, "Regular");
    
    // Animated waveform (simplified)
    for (let i = 0; i < 5; i++) {
      const bar = figma.createRectangle();
      bar.resize(8, 30 + Math.random() * 30);
      bar.x = 140 + (i * 20);
      bar.y = 370;
      bar.cornerRadius = 4;
      bar.fills = [{type: 'SOLID', color: C.teal, opacity: 0.6}];
      s12.appendChild(bar);
    }
    
    txt(s12, "Listening... Speak now", 115, 425, 16, C.text, "Bold");
    
    // Transcript preview
    const transcriptBox = figma.createRectangle();
    transcriptBox.resize(315, 70);
    transcriptBox.x = 30;
    transcriptBox.y = 465;
    transcriptBox.cornerRadius = 12;
    transcriptBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s12.appendChild(transcriptBox);
    
    txt(s12, "Transcript appears here...", 45, 492, 13, C.gray, "Regular");
    
    // Stop button
    const stopBtn = figma.createEllipse();
    stopBtn.name = "StopRecording-CLICK";
    stopBtn.resize(60, 60);
    stopBtn.x = (W - 60) / 2;
    stopBtn.y = 570;
    stopBtn.fills = [{type: 'SOLID', color: C.red}];
    s12.appendChild(stopBtn);
    txt(s12, "⏹", 178, 587, 26, C.white, "Bold");
    
    txt(s12, "Cancel", 168, 650, 14, C.gray, "Regular");
    
    // STATE 2 - Preview (shown below)
    txt(s12, "--- Preview State ---", 125, 690, 12, C.gray, "Regular");
    
    targetPage.appendChild(s12);
    screens.push(s12);
    x += W + G;
    
    // ====================
    // SCREEN 13: Donation-Hub
    // ====================
    const s13 = figma.createFrame();
    s13.name = "137-Donation-Hub";
    s13.resize(W, H);
    s13.x = x;
    s13.y = y;
    s13.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s13);
    
    const header13 = figma.createRectangle();
    header13.resize(W, 60);
    header13.x = 0;
    header13.y = 44;
    header13.fills = [{type: 'SOLID', color: C.green}];
    s13.appendChild(header13);
    txt(s13, "←", 15, 62, 24, C.white, "Bold");
    txt(s13, "Community Food Share 🤝", 55, 69, 16, C.white, "Bold");
    
    // Hero Section
    txt(s13, "🤝", 160, 124, 48, C.green, "Regular");
    txt(s13, "Together Against Hunger", 100, 185, 18, C.text, "Bold");
    txt(s13, "Donate leftover food or surplus meals", 70, 210, 12, C.gray, "Regular");
    txt(s13, "to those in need.", 135, 227, 12, C.gray, "Regular");
    
    // Impact Stats Card
    const impactCard = figma.createRectangle();
    impactCard.resize(315, 140);
    impactCard.x = 30;
    impactCard.y = 260;
    impactCard.cornerRadius = 12;
    impactCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s13.appendChild(impactCard);
    
    txt(s13, "Community Impact", 45, 275, 15, C.green, "Bold");
    
    txt(s13, "🍲 12,345 Meals Donated", 45, 305, 13, C.text, "Regular");
    txt(s13, "👨‍👩‍👧‍👦 3,456 Families Helped", 45, 330, 13, C.text, "Regular");
    txt(s13, "🌍 25 Tons Food Waste Prevented", 45, 355, 13, C.text, "Regular");
    
    const yourDiv = figma.createRectangle();
    yourDiv.resize(285, 1);
    yourDiv.x = 45;
    yourDiv.y = 375;
    yourDiv.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s13.appendChild(yourDiv);
    
    txt(s13, "Your Contribution:", 45, 383, 12, C.green, "Bold");
    txt(s13, "✓ 8 meals donated • 3 families helped", 45, 400, 11, C.gray, "Regular");
    
    // Action Buttons
    const actionCard1 = figma.createRectangle();
    actionCard1.resize(315, 70);
    actionCard1.x = 30;
    actionCard1.y = 420;
    actionCard1.cornerRadius = 12;
    actionCard1.fills = [{type: 'SOLID', color: C.lightBg}];
    s13.appendChild(actionCard1);
    
    txt(s13, "🍽️", 45, 438, 24, C.text, "Regular");
    txt(s13, "Donate Your Food", 80, 440, 14, C.text, "Bold");
    txt(s13, "Have leftover food from an order?", 80, 462, 11, C.gray, "Regular");
    
    const actionCard2 = figma.createRectangle();
    actionCard2.resize(315, 70);
    actionCard2.x = 30;
    actionCard2.y = 505;
    actionCard2.cornerRadius = 12;
    actionCard2.fills = [{type: 'SOLID', color: C.lightBg}];
    s13.appendChild(actionCard2);
    
    txt(s13, "🏪", 45, 523, 24, C.text, "Regular");
    txt(s13, "Restaurant Surplus", 80, 525, 14, C.text, "Bold");
    txt(s13, "(For restaurant partners only)", 80, 547, 11, C.gray, "Regular");
    
    const actionCard3 = figma.createRectangle();
    actionCard3.resize(315, 70);
    actionCard3.x = 30;
    actionCard3.y = 590;
    actionCard3.cornerRadius = 12;
    actionCard3.fills = [{type: 'SOLID', color: C.lightBg}];
    s13.appendChild(actionCard3);
    
    txt(s13, "📜", 45, 608, 24, C.text, "Regular");
    txt(s13, "View Donation History", 80, 610, 14, C.text, "Bold");
    txt(s13, "See your past donations", 80, 632, 11, C.gray, "Regular");
    
    // Partner Charities
    txt(s13, "✓ Verified Organizations", 30, 680, 13, C.green, "Bold");
    txt(s13, "🏢 Edhi Foundation ✓", 40, 705, 11, C.text, "Regular");
    txt(s13, "🏢 Al-Khidmat Foundation ✓", 40, 725, 11, C.text, "Regular");
    
    targetPage.appendChild(s13);
    screens.push(s13);
    x += W + G;
    
    // ====================
    // SCREEN 14: Donate-Food-Flow
    // ====================
    const s14 = figma.createFrame();
    s14.name = "138-Donate-Food-Flow";
    s14.resize(W, H);
    s14.x = x;
    s14.y = y;
    s14.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s14);
    
    const header14 = figma.createRectangle();
    header14.resize(W, 60);
    header14.x = 0;
    header14.y = 44;
    header14.fills = [{type: 'SOLID', color: C.green}];
    s14.appendChild(header14);
    txt(s14, "←", 15, 62, 24, C.white, "Bold");
    txt(s14, "Donate Your Food", 55, 69, 16, C.white, "Bold");
    
    // Progress Indicator
    const progBar = figma.createRectangle();
    progBar.resize(315, 6);
    progBar.x = 30;
    progBar.y = 114;
    progBar.cornerRadius = 3;
    progBar.fills = [{type: 'SOLID', color: C.lightBg}];
    s14.appendChild(progBar);
    
    const progFill = figma.createRectangle();
    progFill.resize(79, 6);
    progFill.x = 30;
    progFill.y = 114;
    progFill.cornerRadius = 3;
    progFill.fills = [{type: 'SOLID', color: C.green}];
    s14.appendChild(progFill);
    
    txt(s14, "Step 1 of 4", 155, 130, 12, C.gray, "Regular");
    
    // STEP 1 - Select Items
    txt(s14, "Your Recent Order", 30, 160, 16, C.text, "Bold");
    txt(s14, "Order #1234567", 30, 183, 12, C.gray, "Regular");
    txt(s14, "What would you like to donate?", 30, 203, 13, C.text, "Regular");
    
    // Item 1 - Selected
    const item1 = figma.createRectangle();
    item1.resize(315, 60);
    item1.x = 30;
    item1.y = 235;
    item1.cornerRadius = 12;
    item1.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    item1.strokes = [{type: 'SOLID', color: C.green}];
    item1.strokeWeight = 2;
    s14.appendChild(item1);
    
    const check1 = figma.createRectangle();
    check1.resize(20, 20);
    check1.x = 45;
    check1.y = 255;
    check1.cornerRadius = 4;
    check1.fills = [{type: 'SOLID', color: C.green}];
    s14.appendChild(check1);
    txt(s14, "✓", 49, 257, 14, C.white, "Bold");
    
    txt(s14, "Large Pizza (2 slices left)", 75, 247, 13, C.text, "Bold");
    txt(s14, "Good condition", 75, 268, 11, C.green, "Regular");
    
    // Item 2 - Selected
    const item2 = figma.createRectangle();
    item2.resize(315, 60);
    item2.x = 30;
    item2.y = 310;
    item2.cornerRadius = 12;
    item2.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    item2.strokes = [{type: 'SOLID', color: C.green}];
    item2.strokeWeight = 2;
    s14.appendChild(item2);
    
    const check2 = figma.createRectangle();
    check2.resize(20, 20);
    check2.x = 45;
    check2.y = 330;
    check2.cornerRadius = 4;
    check2.fills = [{type: 'SOLID', color: C.green}];
    s14.appendChild(check2);
    txt(s14, "✓", 49, 332, 14, C.white, "Bold");
    
    txt(s14, "Garlic Bread (unopened)", 75, 322, 13, C.text, "Bold");
    txt(s14, "Sealed package", 75, 343, 11, C.green, "Regular");
    
    // Item 3 - Cannot donate
    const item3 = figma.createRectangle();
    item3.resize(315, 60);
    item3.x = 30;
    item3.y = 385;
    item3.cornerRadius = 12;
    item3.fills = [{type: 'SOLID', color: C.lightBg, opacity: 0.5}];
    item3.strokes = [{type: 'SOLID', color: C.gray}];
    item3.strokeWeight = 1;
    s14.appendChild(item3);
    
    const check3 = figma.createRectangle();
    check3.resize(20, 20);
    check3.x = 45;
    check3.y = 405;
    check3.cornerRadius = 4;
    check3.fills = [{type: 'SOLID', color: C.white}];
    check3.strokes = [{type: 'SOLID', color: C.gray}];
    check3.strokeWeight = 2;
    s14.appendChild(check3);
    
    txt(s14, "Coke (half consumed)", 75, 397, 13, C.gray, "Regular");
    txt(s14, "⚠️ Cannot donate opened drinks", 75, 418, 10, C.red, "Regular");
    
    // Estimated Meals Counter
    const mealCounter = figma.createRectangle();
    mealCounter.resize(315, 50);
    mealCounter.x = 30;
    mealCounter.y = 465;
    mealCounter.cornerRadius = 12;
    mealCounter.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    s14.appendChild(mealCounter);
    
    txt(s14, "Estimated Meals:", 45, 480, 14, C.text, "Bold");
    txt(s14, "2", 315, 480, 20, C.green, "Bold");
    
    // Bottom Buttons
    btn(s14, "Back-CLICK", 30, 720, 150, 50, C.lightBg, "Back", 14);
    btn(s14, "Continue-CLICK", 195, 720, 150, 50, C.green, "Continue", 14);
    
    targetPage.appendChild(s14);
    screens.push(s14);
    x += W + G;
    
    // ====================
    // SCREEN 15: Rate-Order
    // ====================
    const s15 = figma.createFrame();
    s15.name = "115-Rate-Order";
    s15.resize(W, H);
    s15.x = x;
    s15.y = y;
    s15.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s15);
    
    const header15 = figma.createRectangle();
    header15.resize(W, 60);
    header15.x = 0;
    header15.y = 44;
    header15.fills = [{type: 'SOLID', color: C.teal}];
    s15.appendChild(header15);
    txt(s15, "←", 15, 62, 24, C.white, "Bold");
    txt(s15, "Rate Your Order", 55, 69, 18, C.white, "Bold");
    
    // Order Info Card
    const orderInfo = figma.createRectangle();
    orderInfo.resize(315, 70);
    orderInfo.x = 30;
    orderInfo.y = 124;
    orderInfo.cornerRadius = 12;
    orderInfo.fills = [{type: 'SOLID', color: C.lightBg}];
    s15.appendChild(orderInfo);
    
    txt(s15, "Order #1234567", 45, 139, 14, C.text, "Bold");
    txt(s15, "🍕 Pizza Palace", 45, 159, 12, C.gray, "Regular");
    txt(s15, "Delivered on Nov 29, 2:30 PM", 45, 177, 11, C.gray, "Regular");
    
    // Rate Restaurant Section
    txt(s15, "How was your experience?", 30, 215, 15, C.text, "Bold");
    
    // Star Rating
    for (let i = 0; i < 5; i++) {
      txt(s15, "⭐", 75 + (i * 45), 245, 32, C.yellow, "Regular");
    }
    
    txt(s15, "5 / 5", 165, 290, 13, C.gray, "Regular");
    
    // Review Text Area
    txt(s15, "Write a review (optional):", 30, 320, 13, C.text, "Bold");
    
    const reviewBox = figma.createRectangle();
    reviewBox.resize(315, 100);
    reviewBox.x = 30;
    reviewBox.y = 345;
    reviewBox.cornerRadius = 12;
    reviewBox.fills = [{type: 'SOLID', color: C.lightBg}];
    reviewBox.strokes = [{type: 'SOLID', color: C.gray}];
    reviewBox.strokeWeight = 1;
    s15.appendChild(reviewBox);
    
    txt(s15, "Share your thoughts...", 45, 387, 13, C.gray, "Regular");
    txt(s15, "0 / 500 characters", 240, 427, 10, C.gray, "Regular");
    
    // Rate Individual Items
    txt(s15, "Rate Individual Items", 30, 465, 15, C.text, "Bold");
    
    const itemRate1 = figma.createRectangle();
    itemRate1.resize(315, 60);
    itemRate1.x = 30;
    itemRate1.y = 495;
    itemRate1.cornerRadius = 12;
    itemRate1.fills = [{type: 'SOLID', color: C.lightBg}];
    s15.appendChild(itemRate1);
    
    txt(s15, "🍕", 45, 510, 24, C.text, "Regular");
    txt(s15, "Large Pizza", 80, 515, 13, C.text, "Bold");
    
    for (let i = 0; i < 5; i++) {
      txt(s15, "⭐", 190 + (i * 22), 515, 16, C.yellow, "Regular");
    }
    
    // Photo Upload
    const photoBtn = figma.createRectangle();
    photoBtn.resize(315, 50);
    photoBtn.x = 30;
    photoBtn.y = 575;
    photoBtn.cornerRadius = 12;
    photoBtn.fills = [{type: 'SOLID', color: C.lightBg}];
    photoBtn.strokes = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    photoBtn.strokeWeight = 2;
    photoBtn.dashPattern = [5, 3];
    s15.appendChild(photoBtn);
    
    txt(s15, "📷 Add Photos", 140, 592, 14, C.teal, "Bold");
    
    // Bottom Buttons
    txt(s15, "Skip", 170, 650, 13, C.gray, "Regular");
    btn(s15, "SubmitReview-CLICK", 30, 710, 315, 50, C.green, "Submit Review", 16);
    
    targetPage.appendChild(s15);
    screens.push(s15);
    x += W + G;
    
    // ====================
    // SCREEN 16: Restaurant-Reviews
    // ====================
    const s16 = figma.createFrame();
    s16.name = "116-Restaurant-Reviews";
    s16.resize(W, H);
    s16.x = x;
    s16.y = y;
    s16.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s16);
    
    const header16 = figma.createRectangle();
    header16.resize(W, 60);
    header16.x = 0;
    header16.y = 44;
    header16.fills = [{type: 'SOLID', color: C.teal}];
    s16.appendChild(header16);
    txt(s16, "←", 15, 62, 24, C.white, "Bold");
    txt(s16, "Reviews", 55, 69, 18, C.white, "Bold");
    
    // Overall Rating Card
    const ratingCard = figma.createRectangle();
    ratingCard.resize(315, 140);
    ratingCard.x = 30;
    ratingCard.y = 124;
    ratingCard.cornerRadius = 12;
    ratingCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s16.appendChild(ratingCard);
    
    txt(s16, "⭐ 4.5 / 5.0", 125, 145, 24, C.text, "Bold");
    txt(s16, "Based on 1,234 reviews", 115, 175, 12, C.gray, "Regular");
    
    // Rating Breakdown
    const ratings = [
      {stars: "5⭐", width: 200, percent: "85%"},
      {stars: "4⭐", width: 40, percent: "10%"},
      {stars: "3⭐", width: 25, percent: "5%"}
    ];
    
    let ratingY = 200;
    for (const r of ratings) {
      txt(s16, r.stars, 45, ratingY, 11, C.text, "Regular");
      
      const barBg = figma.createRectangle();
      barBg.resize(200, 8);
      barBg.x = 85;
      barBg.y = ratingY + 2;
      barBg.cornerRadius = 4;
      barBg.fills = [{type: 'SOLID', color: C.lightBg}];
      s16.appendChild(barBg);
      
      const barFill = figma.createRectangle();
      barFill.resize(r.width, 8);
      barFill.x = 85;
      barFill.y = ratingY + 2;
      barFill.cornerRadius = 4;
      barFill.fills = [{type: 'SOLID', color: C.yellow}];
      s16.appendChild(barFill);
      
      txt(s16, r.percent, 295, ratingY, 11, C.gray, "Regular");
      
      ratingY += 20;
    }
    
    // Filter Chips
    const filterChips = ["All", "With Photos", "5★", "4★", "3★ & below"];
    let chipX = 30;
    for (let i = 0; i < filterChips.length; i++) {
      const chip = figma.createRectangle();
      const chipWidth = filterChips[i].length * 10 + 20;
      chip.resize(chipWidth, 30);
      chip.x = chipX;
      chip.y = 284;
      chip.cornerRadius = 15;
      chip.fills = i === 0 ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.lightBg}];
      s16.appendChild(chip);
      
      txt(s16, filterChips[i], chipX + 10, 292, 11, i === 0 ? C.white : C.gray, "Bold");
      chipX += chipWidth + 8;
    }
    
    // Review Card 1
    const review1 = figma.createRectangle();
    review1.resize(315, 130);
    review1.x = 30;
    review1.y = 334;
    review1.cornerRadius = 12;
    review1.fills = [{type: 'SOLID', color: C.lightBg}];
    s16.appendChild(review1);
    
    txt(s16, "👤", 45, 349, 24, C.text, "Regular");
    txt(s16, "Ahmed Khan", 80, 352, 14, C.text, "Bold");
    txt(s16, "2 days ago", 250, 352, 11, C.gray, "Regular");
    
    for (let i = 0; i < 5; i++) {
      txt(s16, "⭐", 80 + (i * 18), 370, 12, C.yellow, "Regular");
    }
    
    txt(s16, "Amazing pizza! Fresh ingredients,", 45, 395, 12, C.text, "Regular");
    txt(s16, "quick delivery. Highly recommended!", 45, 411, 12, C.text, "Regular");
    
    txt(s16, "📷 📷 View 2 photos", 45, 433, 11, C.teal, "Bold");
    txt(s16, "👍 Helpful (45)", 200, 433, 11, C.gray, "Regular");
    txt(s16, "💬 Reply", 285, 433, 11, C.teal, "Bold");
    
    // Restaurant Response
    txt(s16, "🏪 Restaurant Response:", 45, 451, 10, C.gray, "Bold");
    
    // Review Card 2 (partial)
    const review2 = figma.createRectangle();
    review2.resize(315, 100);
    review2.x = 30;
    review2.y = 484;
    review2.cornerRadius = 12;
    review2.fills = [{type: 'SOLID', color: C.lightBg}];
    s16.appendChild(review2);
    
    txt(s16, "👤", 45, 499, 24, C.text, "Regular");
    txt(s16, "Sara Ali", 80, 502, 14, C.text, "Bold");
    
    for (let i = 0; i < 4; i++) {
      txt(s16, "⭐", 80 + (i * 18), 520, 12, C.yellow, "Regular");
    }
    
    txt(s16, "Good food but delivery was slow...", 45, 545, 12, C.text, "Regular");
    
    // Load More Button
    btn(s16, "LoadMore-CLICK", 30, 730, 315, 40, C.lightBg, "Load More Reviews", 13);
    
    targetPage.appendChild(s16);
    screens.push(s16);
    x += W + G;
    
    // ====================
    // SCREEN 17: Photo-Review-Upload
    // ====================
    const s17 = figma.createFrame();
    s17.name = "117-Photo-Review-Upload";
    s17.resize(W, H);
    s17.x = x;
    s17.y = y;
    s17.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s17);
    
    const header17 = figma.createRectangle();
    header17.resize(W, 60);
    header17.x = 0;
    header17.y = 44;
    header17.fills = [{type: 'SOLID', color: C.teal}];
    s17.appendChild(header17);
    txt(s17, "←", 15, 62, 24, C.white, "Bold");
    txt(s17, "Add Photos to Review", 55, 69, 16, C.white, "Bold");
    
    txt(s17, "Add photos of your food", 90, 130, 16, C.text, "Bold");
    txt(s17, "(Max 5 photos, 5MB each)", 105, 155, 12, C.gray, "Regular");
    
    // Photo Upload Slots (Grid)
    const slotSize = 90;
    const slotGap = 15;
    let slotIndex = 0;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        if (slotIndex < 5) {
          const slot = figma.createRectangle();
          slot.resize(slotSize, slotSize);
          slot.x = 30 + (col * (slotSize + slotGap));
          slot.y = 190 + (row * (slotSize + slotGap));
          slot.cornerRadius = 12;
          slot.fills = [{type: 'SOLID', color: C.lightBg}];
          slot.strokes = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
          slot.strokeWeight = 2;
          slot.dashPattern = [5, 3];
          s17.appendChild(slot);
          
          if (slotIndex === 0) {
            txt(s17, "📷", 58, 220, 24, C.gray, "Regular");
            txt(s17, "Add", 57, 245, 11, C.gray, "Regular");
          } else {
            txt(s17, "+", 60 + (col * (slotSize + slotGap)), 220 + (row * (slotSize + slotGap)), 24, C.gray, "Bold");
          }
          
          slotIndex++;
        }
      }
    }
    
    // Action Buttons
    btn(s17, "TakePhoto-CLICK", 30, 410, 150, 50, C.teal, "📷 Take Photo", 13);
    btn(s17, "Gallery-CLICK", 195, 410, 150, 50, C.yellow, "🖼️ Gallery", 13);
    
    // Guidelines Section
    txt(s17, "Photo Guidelines", 30, 485, 15, C.text, "Bold");
    
    const guideBox = figma.createRectangle();
    guideBox.resize(315, 120);
    guideBox.x = 30;
    guideBox.y = 515;
    guideBox.cornerRadius = 12;
    guideBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s17.appendChild(guideBox);
    
    txt(s17, "• Show your food clearly", 45, 530, 12, C.gray, "Regular");
    txt(s17, "• No prohibited content", 45, 553, 12, C.gray, "Regular");
    txt(s17, "• Good lighting preferred", 45, 576, 12, C.gray, "Regular");
    txt(s17, "• Focus on the dish", 45, 599, 12, C.gray, "Regular");
    
    // Info Message
    const infoMsg = figma.createRectangle();
    infoMsg.resize(315, 45);
    infoMsg.x = 30;
    infoMsg.y = 655;
    infoMsg.cornerRadius = 12;
    infoMsg.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s17.appendChild(infoMsg);
    
    txt(s17, "ℹ️", 45, 670, 18, C.teal, "Regular");
    txt(s17, "Photos will be reviewed before publishing", 70, 673, 11, C.gray, "Regular");
    
    // Bottom Buttons
    btn(s17, "Back-CLICK", 30, 730, 150, 50, C.lightBg, "Back", 14);
    btn(s17, "ContinueReview-CLICK", 195, 730, 150, 50, C.teal, "Continue", 14);
    
    targetPage.appendChild(s17);
    screens.push(s17);
    x += W + G;
    
    // ====================
    // SCREEN 18: Photo-Review-Gallery
    // ====================
    const s18 = figma.createFrame();
    s18.name = "118-Photo-Review-Gallery";
    s18.resize(W, H);
    s18.x = x;
    s18.y = y;
    s18.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s18);
    
    const header18 = figma.createRectangle();
    header18.resize(W, 60);
    header18.x = 0;
    header18.y = 44;
    header18.fills = [{type: 'SOLID', color: C.teal}];
    s18.appendChild(header18);
    txt(s18, "←", 15, 62, 24, C.white, "Bold");
    txt(s18, "Food Photos", 55, 69, 18, C.white, "Bold");
    
    txt(s18, "124 photos from customers", 30, 124, 13, C.gray, "Regular");
    
    // Filter Tabs
    const photoTabs = ["All Photos", "Recent", "Top Rated", "My Reviews"];
    let tabX = 30;
    for (let i = 0; i < photoTabs.length; i++) {
      const tab = figma.createRectangle();
      const tabWidth = photoTabs[i].length * 9 + 16;
      tab.resize(tabWidth, 32);
      tab.x = tabX;
      tab.y = 154;
      tab.cornerRadius = 16;
      tab.fills = i === 0 ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.lightBg}];
      s18.appendChild(tab);
      
      txt(s18, photoTabs[i], tabX + 8, 164, 11, i === 0 ? C.white : C.gray, "Bold");
      tabX += tabWidth + 8;
    }
    
    // Photo Grid (3 columns)
    const photoSize = 95;
    const photoGap = 10;
    let photoIndex = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        const photo = figma.createRectangle();
        photo.resize(photoSize, photoSize);
        photo.x = 30 + (col * (photoSize + photoGap));
        photo.y = 206 + (row * (photoSize + photoGap));
        photo.cornerRadius = 8;
        photo.fills = [{type: 'SOLID', color: C.lightBg}];
        s18.appendChild(photo);
        
        // Emoji placeholders for different food types
        const emojis = ["🍕", "🍔", "🍝", "🍰", "🌮", "🍱", "🥗", "🍜", "🍛"];
        txt(s18, emojis[photoIndex % emojis.length], 
            52 + (col * (photoSize + photoGap)), 
            238 + (row * (photoSize + photoGap)), 
            32, C.gray, "Regular");
        
        photoIndex++;
      }
    }
    
    targetPage.appendChild(s18);
    screens.push(s18);
    x += W + G;
    
    // ====================
    // SCREEN 19: Favorites-List
    // ====================
    const s19 = figma.createFrame();
    s19.name = "119-Favorites-List";
    s19.resize(W, H);
    s19.x = x;
    s19.y = y;
    s19.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s19);
    
    const header19 = figma.createRectangle();
    header19.resize(W, 60);
    header19.x = 0;
    header19.y = 44;
    header19.fills = [{type: 'SOLID', color: C.teal}];
    s19.appendChild(header19);
    txt(s19, "←", 15, 62, 24, C.white, "Bold");
    txt(s19, "My Favorites", 55, 69, 18, C.white, "Bold");
    
    // Tab Navigation
    const tabBg19 = figma.createRectangle();
    tabBg19.resize(315, 45);
    tabBg19.x = 30;
    tabBg19.y = 124;
    tabBg19.cornerRadius = 10;
    tabBg19.fills = [{type: 'SOLID', color: C.lightBg}];
    s19.appendChild(tabBg19);
    
    const tab19_1 = figma.createRectangle();
    tab19_1.resize(150, 35);
    tab19_1.x = 35;
    tab19_1.y = 129;
    tab19_1.cornerRadius = 8;
    tab19_1.fills = [{type: 'SOLID', color: C.teal}];
    s19.appendChild(tab19_1);
    txt(s19, "Restaurants", 68, 140, 13, C.white, "Bold");
    
    txt(s19, "Dishes", 240, 140, 13, C.gray, "Regular");
    
    // Favorite Restaurant Card 1
    const favCard1 = figma.createRectangle();
    favCard1.resize(315, 100);
    favCard1.x = 30;
    favCard1.y = 194;
    favCard1.cornerRadius = 12;
    favCard1.fills = [{type: 'SOLID', color: C.lightBg}];
    s19.appendChild(favCard1);
    
    txt(s19, "🍕", 45, 217, 32, C.text, "Regular");
    txt(s19, "❤️", 305, 207, 20, C.red, "Regular");
    
    txt(s19, "Pizza Palace", 90, 210, 15, C.text, "Bold");
    txt(s19, "Fast Food • Rs 300", 90, 232, 12, C.gray, "Regular");
    txt(s19, "⭐ 4.5", 90, 252, 11, C.text, "Regular");
    txt(s19, "25-35 mins • 2.3 km", 135, 252, 11, C.gray, "Regular");
    
    btn(s19, "OrderNow1-CLICK", 220, 258, 90, 28, C.teal, "Order Now", 11);
    
    // Favorite Restaurant Card 2
    const favCard2 = figma.createRectangle();
    favCard2.resize(315, 100);
    favCard2.x = 30;
    favCard2.y = 309;
    favCard2.cornerRadius = 12;
    favCard2.fills = [{type: 'SOLID', color: C.lightBg}];
    s19.appendChild(favCard2);
    
    txt(s19, "🍔", 45, 332, 32, C.text, "Regular");
    txt(s19, "❤️", 305, 322, 20, C.red, "Regular");
    
    txt(s19, "Burger House", 90, 325, 15, C.text, "Bold");
    txt(s19, "Burgers • Rs 400", 90, 347, 12, C.gray, "Regular");
    txt(s19, "⭐ 4.7", 90, 367, 11, C.text, "Regular");
    txt(s19, "20-30 mins • 1.8 km", 135, 367, 11, C.gray, "Regular");
    
    btn(s19, "OrderNow2-CLICK", 220, 373, 90, 28, C.teal, "Order Now", 11);
    
    // Favorite Restaurant Card 3
    const favCard3 = figma.createRectangle();
    favCard3.resize(315, 100);
    favCard3.x = 30;
    favCard3.y = 424;
    favCard3.cornerRadius = 12;
    favCard3.fills = [{type: 'SOLID', color: C.lightBg}];
    s19.appendChild(favCard3);
    
    txt(s19, "🍝", 45, 447, 32, C.text, "Regular");
    txt(s19, "❤️", 305, 437, 20, C.red, "Regular");
    
    txt(s19, "Pasta Corner", 90, 440, 15, C.text, "Bold");
    txt(s19, "Italian • Rs 500", 90, 462, 12, C.gray, "Regular");
    txt(s19, "⭐ 4.6", 90, 482, 11, C.text, "Regular");
    txt(s19, "30-40 mins • 3.1 km", 135, 482, 11, C.gray, "Regular");
    
    btn(s19, "OrderNow3-CLICK", 220, 488, 90, 28, C.teal, "Order Now", 11);
    
    // Empty State (shown as alternative)
    txt(s19, "--- Empty State ---", 120, 550, 12, C.gray, "Regular");
    txt(s19, "💔", 170, 580, 32, C.gray, "Regular");
    txt(s19, "No favorites yet!", 135, 625, 14, C.gray, "Bold");
    txt(s19, "Tap ❤️ on restaurants to add", 105, 645, 12, C.gray, "Regular");
    
    btn(s19, "Explore-CLICK", 90, 680, 195, 45, C.teal, "Explore Restaurants", 14);
    
    targetPage.appendChild(s19);
    screens.push(s19);
    x += W + G;
    
    // ====================
    // SCREEN 20: Analytics-Dashboard
    // ====================
    const s20 = figma.createFrame();
    s20.name = "120-Analytics-Dashboard";
    s20.resize(W, H);
    s20.x = x;
    s20.y = y;
    s20.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s20);
    
    const header20 = figma.createRectangle();
    header20.resize(W, 60);
    header20.x = 0;
    header20.y = 44;
    header20.fills = [{type: 'SOLID', color: C.teal}];
    s20.appendChild(header20);
    txt(s20, "←", 15, 62, 24, C.white, "Bold");
    txt(s20, "Analytics Dashboard", 55, 69, 16, C.white, "Bold");
    
    txt(s20, "🔄 Last updated: 2:00 PM", 30, 124, 11, C.gray, "Regular");
    
    // Date Filter Chips
    const dateFilters = ["Today", "This Week", "This Month", "Custom"];
    let dateX = 30;
    for (let i = 0; i < dateFilters.length; i++) {
      const dateChip = figma.createRectangle();
      const dateWidth = dateFilters[i].length * 9 + 16;
      dateChip.resize(dateWidth, 28);
      dateChip.x = dateX;
      dateChip.y = 150;
      dateChip.cornerRadius = 14;
      dateChip.fills = i === 2 ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.lightBg}];
      s20.appendChild(dateChip);
      
      txt(s20, dateFilters[i], dateX + 8, 158, 11, i === 2 ? C.white : C.gray, "Bold");
      dateX += dateWidth + 8;
    }
    
    // Key Metrics Grid (2x2)
    const metrics = [
      {icon: "📊", label: "Total Orders", value: "1,234", trend: "↑ 15%", color: C.green},
      {icon: "💰", label: "Total Revenue", value: "Rs 345K", trend: "↑ 12%", color: C.green},
      {icon: "❌", label: "Cancellations", value: "45 (3.6%)", trend: "↓ 2%", color: C.green},
      {icon: "⭐", label: "Avg Rating", value: "4.5/5.0", trend: "→ 0%", color: C.gray}
    ];
    
    let metricIndex = 0;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const metric = metrics[metricIndex];
        const metricCard = figma.createRectangle();
        metricCard.resize(150, 100);
        metricCard.x = 30 + (col * 165);
        metricCard.y = 198 + (row * 115);
        metricCard.cornerRadius = 12;
        metricCard.fills = [{type: 'SOLID', color: C.lightBg}];
        s20.appendChild(metricCard);
        
        txt(s20, metric.icon, 45 + (col * 165), 213 + (row * 115), 24, C.text, "Regular");
        txt(s20, metric.label, 45 + (col * 165), 248 + (row * 115), 11, C.gray, "Regular");
        txt(s20, metric.value, 45 + (col * 165), 265 + (row * 115), 14, C.text, "Bold");
        txt(s20, metric.trend, 145 + (col * 165), 210 + (row * 115), 10, metric.color, "Bold");
        
        metricIndex++;
      }
    }
    
    // Charts Section
    txt(s20, "Orders Over Time", 30, 438, 14, C.text, "Bold");
    
    const chartBg = figma.createRectangle();
    chartBg.resize(315, 120);
    chartBg.x = 30;
    chartBg.y = 463;
    chartBg.cornerRadius = 12;
    chartBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s20.appendChild(chartBg);
    
    // Simple line chart representation
    for (let i = 0; i < 7; i++) {
      const bar = figma.createRectangle();
      bar.resize(30, 30 + Math.random() * 60);
      bar.x = 45 + (i * 40);
      bar.y = 553 - (30 + Math.random() * 60);
      bar.cornerRadius = 4;
      bar.fills = [{type: 'SOLID', color: C.teal, opacity: 0.7}];
      s20.appendChild(bar);
    }
    
    txt(s20, "Mon Tue Wed Thu Fri Sat Sun", 50, 565, 9, C.gray, "Regular");
    
    // Top Performers
    txt(s20, "Top Restaurants", 30, 603, 14, C.text, "Bold");
    
    const topCard = figma.createRectangle();
    topCard.resize(315, 110);
    topCard.x = 30;
    topCard.y = 628;
    topCard.cornerRadius = 12;
    topCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s20.appendChild(topCard);
    
    txt(s20, "1. Pizza Palace", 45, 643, 12, C.text, "Regular");
    txt(s20, "Rs 45,000", 265, 643, 12, C.teal, "Bold");
    
    txt(s20, "2. Burger House", 45, 668, 12, C.text, "Regular");
    txt(s20, "Rs 38,500", 265, 668, 12, C.teal, "Bold");
    
    txt(s20, "3. Pasta Corner", 45, 693, 12, C.text, "Regular");
    txt(s20, "Rs 32,100", 265, 693, 12, C.teal, "Bold");
    
    // Export Buttons
    txt(s20, "📄", 40, 755, 16, C.gray, "Regular");
    txt(s20, "CSV", 63, 757, 11, C.gray, "Regular");
    
    txt(s20, "📄", 110, 755, 16, C.gray, "Regular");
    txt(s20, "PDF", 133, 757, 11, C.gray, "Regular");
    
    txt(s20, "📥", 180, 755, 16, C.gray, "Regular");
    txt(s20, "Download Report", 203, 757, 11, C.gray, "Regular");
    
    targetPage.appendChild(s20);
    screens.push(s20);
    x += W + G;
    
    figma.notify('✅ Chunk 2/4 Complete - 10 more screens created (Total: 20)');
    // ====================
    // SCREEN 21: Business-Account-Registration
    // ====================
    const s21 = figma.createFrame();
    s21.name = "121-Business-Account-Registration";
    s21.resize(W, H);
    s21.x = x;
    s21.y = y;
    s21.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s21);
    
    const header21 = figma.createRectangle();
    header21.resize(W, 60);
    header21.x = 0;
    header21.y = 44;
    header21.fills = [{type: 'SOLID', color: C.teal}];
    s21.appendChild(header21);
    txt(s21, "←", 15, 62, 24, C.white, "Bold");
    txt(s21, "Business Account", 55, 69, 18, C.white, "Bold");
    
    // Progress Indicator
    const progBar21 = figma.createRectangle();
    progBar21.resize(315, 6);
    progBar21.x = 30;
    progBar21.y = 114;
    progBar21.cornerRadius = 3;
    progBar21.fills = [{type: 'SOLID', color: C.lightBg}];
    s21.appendChild(progBar21);
    
    const progFill21 = figma.createRectangle();
    progFill21.resize(79, 6);
    progFill21.x = 30;
    progFill21.y = 114;
    progFill21.cornerRadius = 3;
    progFill21.fills = [{type: 'SOLID', color: C.teal}];
    s21.appendChild(progFill21);
    
    txt(s21, "Step 1 of 4: Company Info", 120, 130, 12, C.gray, "Regular");
    
    // Company Information Section
    txt(s21, "Company Information", 30, 160, 16, C.text, "Bold");
    
    txt(s21, "Company Name", 30, 195, 13, C.text, "Semi Bold");
    inputField(s21, 30, 215, 315, 45, "Enter company name");
    
    txt(s21, "Business Type", 30, 275, 13, C.text, "Semi Bold");
    const bizType = figma.createRectangle();
    bizType.resize(315, 45);
    bizType.x = 30;
    bizType.y = 295;
    bizType.cornerRadius = 12;
    bizType.fills = [{type: 'SOLID', color: C.lightBg}];
    bizType.strokes = [{type: 'SOLID', color: C.gray}];
    bizType.strokeWeight = 1;
    s21.appendChild(bizType);
    txt(s21, "Select type ▼", 45, 310, 14, C.gray, "Regular");
    
    txt(s21, "Tax ID / Registration Number", 30, 355, 13, C.text, "Semi Bold");
    inputField(s21, 30, 375, 315, 45, "Enter registration number");
    
    txt(s21, "Business Address", 30, 435, 13, C.text, "Semi Bold");
    inputField(s21, 30, 455, 315, 45, "Enter business address");
    
    txt(s21, "Contact Person", 30, 515, 13, C.text, "Semi Bold");
    inputField(s21, 30, 535, 315, 45, "Full name");
    
    txt(s21, "Business Phone", 30, 595, 13, C.text, "Semi Bold");
    inputField(s21, 30, 615, 150, 45, "+92 300");
    
    txt(s21, "Business Email", 195, 595, 13, C.text, "Semi Bold");
    inputField(s21, 195, 615, 150, 45, "email@company.com");
    
    // Bottom Buttons
    btn(s21, "SaveDraft-CLICK", 30, 720, 150, 50, C.lightBg, "Save Draft", 14);
    btn(s21, "Continue-CLICK", 195, 720, 150, 50, C.teal, "Continue", 14);
    
    targetPage.appendChild(s21);
    screens.push(s21);
    x += W + G;
    
    // ====================
    // SCREEN 22: Business-Account-Dashboard
    // ====================
    const s22 = figma.createFrame();
    s22.name = "122-Business-Account-Dashboard";
    s22.resize(W, H);
    s22.x = x;
    s22.y = y;
    s22.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s22);
    
    const header22 = figma.createRectangle();
    header22.resize(W, 60);
    header22.x = 0;
    header22.y = 44;
    header22.fills = [{type: 'SOLID', color: C.teal}];
    s22.appendChild(header22);
    txt(s22, "←", 15, 62, 24, C.white, "Bold");
    txt(s22, "Business Account", 55, 69, 18, C.white, "Bold");
    
    // Toggle Switch
    const toggleBg = figma.createRectangle();
    toggleBg.resize(100, 30);
    toggleBg.x = 260;
    toggleBg.y = 62;
    toggleBg.cornerRadius = 15;
    toggleBg.fills = [{type: 'SOLID', color: C.yellow}];
    s22.appendChild(toggleBg);
    txt(s22, "🏢 Business", 270, 68, 11, C.white, "Bold");
    
    // Quick Stats Card
    const statsCard = figma.createRectangle();
    statsCard.resize(315, 90);
    statsCard.x = 30;
    statsCard.y = 124;
    statsCard.cornerRadius = 12;
    statsCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s22.appendChild(statsCard);
    
    txt(s22, "This Month", 45, 139, 14, C.teal, "Bold");
    txt(s22, "Orders: 145 | Spent: Rs 125,000", 45, 161, 13, C.text, "Regular");
    txt(s22, "Active Users: 23", 45, 181, 12, C.gray, "Regular");
    txt(s22, "Budget Remaining: Rs 75,000", 45, 197, 12, C.green, "Regular");
    
    // Team Members Section
    txt(s22, "Team Members (23)", 30, 234, 15, C.text, "Bold");
    btn(s22, "AddMember-CLICK", 235, 229, 110, 30, C.teal, "+ Add Member", 11);
    
    // Member Card 1
    const member1 = figma.createRectangle();
    member1.resize(315, 60);
    member1.x = 30;
    member1.y = 274;
    member1.cornerRadius = 12;
    member1.fills = [{type: 'SOLID', color: C.lightBg}];
    s22.appendChild(member1);
    
    txt(s22, "👤", 45, 289, 24, C.text, "Regular");
    txt(s22, "Ahmed Khan (Admin)", 80, 287, 13, C.text, "Bold");
    txt(s22, "Orders: 12 • Rs 15,000", 80, 307, 11, C.gray, "Regular");
    txt(s22, "⚙️", 310, 292, 18, C.gray, "Regular");
    
    // Member Card 2
    const member2 = figma.createRectangle();
    member2.resize(315, 60);
    member2.x = 30;
    member2.y = 349;
    member2.cornerRadius = 12;
    member2.fills = [{type: 'SOLID', color: C.lightBg}];
    s22.appendChild(member2);
    
    txt(s22, "👤", 45, 364, 24, C.text, "Regular");
    txt(s22, "Sara Ali (Member)", 80, 362, 13, C.text, "Bold");
    txt(s22, "Orders: 8 • Rs 9,500", 80, 382, 11, C.gray, "Regular");
    txt(s22, "⚙️", 310, 367, 18, C.gray, "Regular");
    
    // Billing Section
    txt(s22, "Billing & Invoices", 30, 434, 15, C.text, "Bold");
    
    const billCard = figma.createRectangle();
    billCard.resize(315, 120);
    billCard.x = 30;
    billCard.y = 464;
    billCard.cornerRadius = 12;
    billCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s22.appendChild(billCard);
    
    txt(s22, "Next Invoice: Dec 1, 2025", 45, 479, 13, C.text, "Bold");
    txt(s22, "Invoice Frequency: Monthly", 45, 502, 12, C.gray, "Regular");
    txt(s22, "Payment Terms: Net 30 days", 45, 522, 12, C.gray, "Regular");
    txt(s22, "Amount Due: Rs 0", 45, 542, 12, C.green, "Regular");
    
    btn(s22, "ViewInvoices-CLICK", 45, 553, 120, 26, C.teal, "View Invoices", 11);
    
    // Recent Activity
    txt(s22, "Recent Activity", 30, 604, 15, C.text, "Bold");
    
    const activity = figma.createRectangle();
    activity.resize(315, 100);
    activity.x = 30;
    activity.y = 634;
    activity.cornerRadius = 12;
    activity.fills = [{type: 'SOLID', color: C.lightBg}];
    s22.appendChild(activity);
    
    txt(s22, "• Ahmed ordered from Pizza Palace", 45, 649, 11, C.text, "Regular");
    txt(s22, "  2 hours ago • Rs 890", 50, 666, 10, C.gray, "Regular");
    
    txt(s22, "• Sara ordered from Burger House", 45, 689, 11, C.text, "Regular");
    txt(s22, "  5 hours ago • Rs 650", 50, 706, 10, C.gray, "Regular");
    
    targetPage.appendChild(s22);
    screens.push(s22);
    x += W + G;
    
    // ====================
    // SCREEN 23: New-User-Onboarding-Offer
    // ====================
    const s23 = figma.createFrame();
    s23.name = "123-New-User-Onboarding-Offer";
    s23.resize(W, H);
    s23.x = x;
    s23.y = y;
    s23.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s23);
    
    // Celebration Background
    for (let i = 0; i < 15; i++) {
      const confetti = figma.createRectangle();
      confetti.resize(6, 6);
      confetti.x = Math.random() * W;
      confetti.y = Math.random() * 300;
      confetti.cornerRadius = 2;
      const colors = [C.yellow, C.teal, C.red, C.green];
      confetti.fills = [{type: 'SOLID', color: colors[Math.floor(Math.random() * colors.length)]}];
      confetti.rotation = Math.random() * 360;
      s23.appendChild(confetti);
    }
    
    const header23 = figma.createRectangle();
    header23.resize(W, 60);
    header23.x = 0;
    header23.y = 44;
    header23.fills = [{type: 'SOLID', color: C.teal}];
    s23.appendChild(header23);
    txt(s23, "✕", 330, 62, 24, C.white, "Bold");
    
    // Hero Section
    txt(s23, "🎉", 160, 130, 64, C.text, "Regular");
    txt(s23, "Welcome Offer!", 120, 215, 24, C.text, "Bold");
    txt(s23, "New user special discount", 110, 245, 14, C.gray, "Regular");
    
    // Offer Card
    const offerCard = figma.createRectangle();
    offerCard.resize(315, 180);
    offerCard.x = 30;
    offerCard.y = 285;
    offerCard.cornerRadius = 16;
    offerCard.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    s23.appendChild(offerCard);
    
    txt(s23, "GET 50% OFF", 115, 310, 22, C.yellow, "Bold");
    txt(s23, "On Your First Order", 115, 340, 14, C.text, "Regular");
    
    const codeBg = figma.createRectangle();
    codeBg.resize(200, 45);
    codeBg.x = 87;
    codeBg.y = 370;
    codeBg.cornerRadius = 10;
    codeBg.fills = [{type: 'SOLID', color: C.white}];
    codeBg.strokes = [{type: 'SOLID', color: C.yellow}];
    codeBg.strokeWeight = 2;
    codeBg.dashPattern = [5, 3];
    s23.appendChild(codeBg);
    
    txt(s23, "WELCOME50", 125, 385, 16, C.teal, "Bold");
    
    txt(s23, "Max discount: Rs 500", 120, 430, 12, C.gray, "Regular");
    txt(s23, "Valid for 7 days", 135, 448, 12, C.gray, "Regular");
    
    // Benefits List
    const benefitsBox = figma.createRectangle();
    benefitsBox.resize(315, 120);
    benefitsBox.x = 30;
    benefitsBox.y = 485;
    benefitsBox.cornerRadius = 12;
    benefitsBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s23.appendChild(benefitsBox);
    
    txt(s23, "What you get:", 45, 500, 14, C.text, "Bold");
    txt(s23, "✓ 50% off on first order (max Rs 500)", 45, 525, 12, C.text, "Regular");
    txt(s23, "✓ Free delivery on all orders", 45, 547, 12, C.text, "Regular");
    txt(s23, "✓ Priority customer support", 45, 569, 12, C.text, "Regular");
    
    // Action Buttons
    btn(s23, "ClaimOffer-CLICK", 30, 635, 315, 55, C.yellow, "Claim Offer Now", 16);
    
    txt(s23, "Terms & Conditions apply", 115, 705, 11, C.gray, "Regular");
    txt(s23, "Skip for now →", 145, 730, 12, C.gray, "Regular");
    
    targetPage.appendChild(s23);
    screens.push(s23);
    x += W + G;
    
    // ====================
    // SCREEN 24: Surplus-Food-Browse
    // ====================
    const s24 = figma.createFrame();
    s24.name = "130-Surplus-Food-Browse";
    s24.resize(W, H);
    s24.x = x;
    s24.y = y;
    s24.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s24);
    
    const header24 = figma.createRectangle();
    header24.resize(W, 60);
    header24.x = 0;
    header24.y = 44;
    header24.fills = [{type: 'SOLID', color: C.green}];
    s24.appendChild(header24);
    txt(s24, "←", 15, 62, 24, C.white, "Bold");
    txt(s24, "Surplus Food Deals", 55, 69, 18, C.white, "Bold");
    
    // Info Banner
    const infoBanner = figma.createRectangle();
    infoBanner.resize(315, 60);
    infoBanner.x = 30;
    infoBanner.y = 124;
    infoBanner.cornerRadius = 12;
    infoBanner.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s24.appendChild(infoBanner);
    
    txt(s24, "🌍 Fight Food Waste!", 45, 139, 14, C.green, "Bold");
    txt(s24, "Get fresh food at discounted prices", 45, 160, 12, C.gray, "Regular");
    
    // Filter Chips
    const surplusFilters = ["All", "Breakfast", "Lunch", "Dinner", "Bakery"];
    let surplusX = 30;
    for (let i = 0; i < surplusFilters.length; i++) {
      const chip = figma.createRectangle();
      const chipW = surplusFilters[i].length * 9 + 16;
      chip.resize(chipW, 30);
      chip.x = surplusX;
      chip.y = 204;
      chip.cornerRadius = 15;
      chip.fills = i === 0 ? [{type: 'SOLID', color: C.green}] : [{type: 'SOLID', color: C.lightBg}];
      s24.appendChild(chip);
      
      txt(s24, surplusFilters[i], surplusX + 8, 212, 11, i === 0 ? C.white : C.gray, "Bold");
      surplusX += chipW + 8;
    }
    
    // Surplus Food Card 1
    const surplus1 = figma.createRectangle();
    surplus1.resize(315, 130);
    surplus1.x = 30;
    surplus1.y = 254;
    surplus1.cornerRadius = 12;
    surplus1.fills = [{type: 'SOLID', color: C.lightBg}];
    s24.appendChild(surplus1);
    
    const discount1 = figma.createRectangle();
    discount1.resize(60, 28);
    discount1.x = 40;
    discount1.y = 264;
    discount1.cornerRadius = 6;
    discount1.fills = [{type: 'SOLID', color: C.red}];
    s24.appendChild(discount1);
    txt(s24, "60% OFF", 46, 270, 11, C.white, "Bold");
    
    txt(s24, "🍕", 45, 304, 32, C.text, "Regular");
    txt(s24, "Pizza Palace - Surprise Box", 90, 306, 14, C.text, "Bold");
    txt(s24, "Mixed items • Available now", 90, 328, 11, C.gray, "Regular");
    
    txt(s24, "Rs 400", 90, 352, 12, C.gray, "Regular");
    const strike1 = figma.createRectangle();
    strike1.resize(35, 1);
    strike1.x = 90;
    strike1.y = 358;
    strike1.fills = [{type: 'SOLID', color: C.gray}];
    s24.appendChild(strike1);
    
    txt(s24, "Rs 160", 135, 350, 16, C.green, "Bold");
    
    const timer1 = figma.createRectangle();
    timer1.resize(80, 22);
    timer1.x = 250;
    timer1.y = 354;
    timer1.cornerRadius = 11;
    timer1.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s24.appendChild(timer1);
    txt(s24, "⏰ 2h left", 260, 358, 10, C.yellow, "Bold");
    
    // Surplus Food Card 2
    const surplus2 = figma.createRectangle();
    surplus2.resize(315, 130);
    surplus2.x = 30;
    surplus2.y = 399;
    surplus2.cornerRadius = 12;
    surplus2.fills = [{type: 'SOLID', color: C.lightBg}];
    s24.appendChild(surplus2);
    
    const discount2 = figma.createRectangle();
    discount2.resize(60, 28);
    discount2.x = 40;
    discount2.y = 409;
    discount2.cornerRadius = 6;
    discount2.fills = [{type: 'SOLID', color: C.red}];
    s24.appendChild(discount2);
    txt(s24, "70% OFF", 46, 415, 11, C.white, "Bold");
    
    txt(s24, "🥐", 45, 449, 32, C.text, "Regular");
    txt(s24, "Bakery Bliss - Fresh Goods", 90, 451, 14, C.text, "Bold");
    txt(s24, "Pastries & Bread • Available now", 90, 473, 11, C.gray, "Regular");
    
    txt(s24, "Rs 300", 90, 497, 12, C.gray, "Regular");
    const strike2 = figma.createRectangle();
    strike2.resize(35, 1);
    strike2.x = 90;
    strike2.y = 503;
    strike2.fills = [{type: 'SOLID', color: C.gray}];
    s24.appendChild(strike2);
    
    txt(s24, "Rs 90", 135, 495, 16, C.green, "Bold");
    
    const timer2 = figma.createRectangle();
    timer2.resize(80, 22);
    timer2.x = 250;
    timer2.y = 499;
    timer2.cornerRadius = 11;
    timer2.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s24.appendChild(timer2);
    txt(s24, "⏰ 1h left", 260, 503, 10, C.yellow, "Bold");
    
    // Surplus Food Card 3
    const surplus3 = figma.createRectangle();
    surplus3.resize(315, 130);
    surplus3.x = 30;
    surplus3.y = 544;
    surplus3.cornerRadius = 12;
    surplus3.fills = [{type: 'SOLID', color: C.lightBg}];
    s24.appendChild(surplus3);
    
    const discount3 = figma.createRectangle();
    discount3.resize(60, 28);
    discount3.x = 40;
    discount3.y = 554;
    discount3.cornerRadius = 6;
    discount3.fills = [{type: 'SOLID', color: C.red}];
    s24.appendChild(discount3);
    txt(s24, "55% OFF", 46, 560, 11, C.white, "Bold");
    
    txt(s24, "🍱", 45, 594, 32, C.text, "Regular");
    txt(s24, "Desi Diner - Lunch Special", 90, 596, 14, C.text, "Bold");
    txt(s24, "Full meal • Available now", 90, 618, 11, C.gray, "Regular");
    
    txt(s24, "Rs 500", 90, 642, 12, C.gray, "Regular");
    const strike3 = figma.createRectangle();
    strike3.resize(35, 1);
    strike3.x = 90;
    strike3.y = 648;
    strike3.fills = [{type: 'SOLID', color: C.gray}];
    s24.appendChild(strike3);
    
    txt(s24, "Rs 225", 135, 640, 16, C.green, "Bold");
    
    const timer3 = figma.createRectangle();
    timer3.resize(80, 22);
    timer3.x = 250;
    timer3.y = 644;
    timer3.cornerRadius = 11;
    timer3.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s24.appendChild(timer3);
    txt(s24, "⏰ 3h left", 260, 648, 10, C.yellow, "Bold");
    
    // Info text at bottom
    txt(s24, "ℹ️ Orders must be picked up before expiry", 65, 695, 11, C.gray, "Regular");
    
    targetPage.appendChild(s24);
    screens.push(s24);
    x += W + G;
    
    // ====================
    // SCREEN 25: Home-Chef-Registration
    // ====================
    const s25 = figma.createFrame();
    s25.name = "131-Home-Chef-Registration";
    s25.resize(W, H);
    s25.x = x;
    s25.y = y;
    s25.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s25);
    
    const header25 = figma.createRectangle();
    header25.resize(W, 60);
    header25.x = 0;
    header25.y = 44;
    header25.fills = [{type: 'SOLID', color: C.yellow}];
    s25.appendChild(header25);
    txt(s25, "←", 15, 62, 24, C.white, "Bold");
    txt(s25, "Become a Home Chef", 55, 69, 16, C.white, "Bold");
    
    // Hero Section
    txt(s25, "👨‍🍳", 160, 124, 48, C.text, "Regular");
    txt(s25, "Share Your Cooking!", 110, 185, 18, C.text, "Bold");
    txt(s25, "Turn your passion into income", 100, 210, 12, C.gray, "Regular");
    
    // Benefits Card
    const benefitCard = figma.createRectangle();
    benefitCard.resize(315, 140);
    benefitCard.x = 30;
    benefitCard.y = 245;
    benefitCard.cornerRadius = 12;
    benefitCard.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    s25.appendChild(benefitCard);
    
    txt(s25, "Why Join?", 45, 260, 14, C.text, "Bold");
    txt(s25, "✓ Work from home", 45, 285, 12, C.text, "Regular");
    txt(s25, "✓ Set your own hours", 45, 307, 12, C.text, "Regular");
    txt(s25, "✓ Earn extra income", 45, 329, 12, C.text, "Regular");
    txt(s25, "✓ Share your cuisine with locals", 45, 351, 12, C.text, "Regular");
    
    // Registration Form
    txt(s25, "Chef Information", 30, 405, 15, C.text, "Bold");
    
    txt(s25, "Full Name", 30, 435, 13, C.text, "Semi Bold");
    inputField(s25, 30, 455, 315, 45, "Enter your name");
    
    txt(s25, "Phone Number", 30, 515, 13, C.text, "Semi Bold");
    inputField(s25, 30, 535, 315, 45, "+92 300 1234567");
    
    txt(s25, "Speciality / Cuisine Type", 30, 595, 13, C.text, "Semi Bold");
    const cuisineSelect = figma.createRectangle();
    cuisineSelect.resize(315, 45);
    cuisineSelect.x = 30;
    cuisineSelect.y = 615;
    cuisineSelect.cornerRadius = 12;
    cuisineSelect.fills = [{type: 'SOLID', color: C.lightBg}];
    cuisineSelect.strokes = [{type: 'SOLID', color: C.gray}];
    cuisineSelect.strokeWeight = 1;
    s25.appendChild(cuisineSelect);
    txt(s25, "Select cuisine ▼", 45, 630, 14, C.gray, "Regular");
    
    // Info Banner
    const infoBox = figma.createRectangle();
    infoBox.resize(315, 50);
    infoBox.x = 30;
    infoBox.y = 680;
    infoBox.cornerRadius = 12;
    infoBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s25.appendChild(infoBox);
    
    txt(s25, "ℹ️", 45, 696, 18, C.teal, "Regular");
    txt(s25, "Verification & documents required next", 70, 698, 11, C.gray, "Regular");
    
    // Bottom Button
    btn(s25, "Continue-CLICK", 30, 750, 315, 50, C.yellow, "Continue Application", 16);
    
    targetPage.appendChild(s25);
    screens.push(s25);
    x += W + G;
    
    // ====================
    // SCREEN 26: Home-Chef-Dashboard
    // ====================
    const s26 = figma.createFrame();
    s26.name = "132-Home-Chef-Dashboard";
    s26.resize(W, H);
    s26.x = x;
    s26.y = y;
    s26.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s26);
    
    const header26 = figma.createRectangle();
    header26.resize(W, 60);
    header26.x = 0;
    header26.y = 44;
    header26.fills = [{type: 'SOLID', color: C.yellow}];
    s26.appendChild(header26);
    txt(s26, "☰", 15, 62, 24, C.white, "Bold");
    txt(s26, "Chef Dashboard", 55, 69, 18, C.white, "Bold");
    txt(s26, "🔔", 330, 62, 24, C.white, "Regular");
    
    // Status Badge
    const statusBadge = figma.createRectangle();
    statusBadge.resize(100, 28);
    statusBadge.x = 30;
    statusBadge.y = 124;
    statusBadge.cornerRadius = 14;
    statusBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s26.appendChild(statusBadge);
    txt(s26, "✓ Active", 52, 130, 12, C.green, "Bold");
    
    // Earnings Card
    const earningsCard = figma.createRectangle();
    earningsCard.resize(315, 100);
    earningsCard.x = 30;
    earningsCard.y = 167;
    earningsCard.cornerRadius = 12;
    earningsCard.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    s26.appendChild(earningsCard);
    
    txt(s26, "Today's Earnings", 45, 182, 14, C.text, "Bold");
    txt(s26, "Rs 4,500", 45, 210, 28, C.yellow, "Bold");
    txt(s26, "12 orders completed", 45, 245, 12, C.gray, "Regular");
    
    btn(s26, "Withdraw-CLICK", 220, 227, 100, 30, C.yellow, "Withdraw", 12);
    
    // Quick Stats
    const stats26 = [
      {label: "Total Orders", value: "245", icon: "📊"},
      {label: "Rating", value: "4.8⭐", icon: "⭐"},
      {label: "Revenue", value: "Rs 95K", icon: "💰"}
    ];
    
    let statsX26 = 30;
    for (const stat of stats26) {
      const statCard = figma.createRectangle();
      statCard.resize(95, 80);
      statCard.x = statsX26;
      statCard.y = 287;
      statCard.cornerRadius = 12;
      statCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s26.appendChild(statCard);
      
      txt(s26, stat.icon, statsX26 + 15, 302, 24, C.text, "Regular");
      txt(s26, stat.label, statsX26 + 10, 335, 10, C.gray, "Regular");
      txt(s26, stat.value, statsX26 + 15, 348, 12, C.text, "Bold");
      
      statsX26 += 105;
    }
    
    // Active Orders
    txt(s26, "Active Orders (3)", 30, 387, 15, C.text, "Bold");
    
    const order1 = figma.createRectangle();
    order1.resize(315, 70);
    order1.x = 30;
    order1.y = 417;
    order1.cornerRadius = 12;
    order1.fills = [{type: 'SOLID', color: C.lightBg}];
    s26.appendChild(order1);
    
    txt(s26, "#1234", 45, 432, 13, C.text, "Bold");
    txt(s26, "Biryani x2 • Rs 800", 45, 452, 12, C.gray, "Regular");
    
    const prepBadge = figma.createRectangle();
    prepBadge.resize(90, 24);
    prepBadge.x = 240;
    prepBadge.y = 440;
    prepBadge.cornerRadius = 12;
    prepBadge.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s26.appendChild(prepBadge);
    txt(s26, "Preparing", 253, 445, 11, C.yellow, "Bold");
    
    // Menu Management
    txt(s26, "My Menu", 30, 507, 15, C.text, "Bold");
    btn(s26, "AddDish-CLICK", 250, 502, 95, 30, C.teal, "+ Add Dish", 11);
    
    const menuItem1 = figma.createRectangle();
    menuItem1.resize(315, 60);
    menuItem1.x = 30;
    menuItem1.y = 547;
    menuItem1.cornerRadius = 12;
    menuItem1.fills = [{type: 'SOLID', color: C.lightBg}];
    s26.appendChild(menuItem1);
    
    txt(s26, "🍛", 45, 562, 24, C.text, "Regular");
    txt(s26, "Chicken Biryani", 80, 560, 13, C.text, "Bold");
    txt(s26, "Rs 400 • Available", 80, 580, 11, C.green, "Regular");
    txt(s26, "✏️", 290, 565, 18, C.teal, "Regular");
    txt(s26, "🗑️", 315, 565, 18, C.red, "Regular");
    
    // Availability Toggle
    txt(s26, "Chef Status", 30, 627, 15, C.text, "Bold");
    
    const availCard = figma.createRectangle();
    availCard.resize(315, 60);
    availCard.x = 30;
    availCard.y = 657;
    availCard.cornerRadius = 12;
    availCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s26.appendChild(availCard);
    
    txt(s26, "Currently Accepting Orders", 45, 672, 13, C.green, "Bold");
    
    const toggleSwitch = figma.createRectangle();
    toggleSwitch.resize(50, 28);
    toggleSwitch.x = 280;
    toggleSwitch.y = 673;
    toggleSwitch.cornerRadius = 14;
    toggleSwitch.fills = [{type: 'SOLID', color: C.green}];
    s26.appendChild(toggleSwitch);
    
    const toggleKnob = figma.createEllipse();
    toggleKnob.resize(22, 22);
    toggleKnob.x = 305;
    toggleKnob.y = 676;
    toggleKnob.fills = [{type: 'SOLID', color: C.white}];
    s26.appendChild(toggleKnob);
    
    targetPage.appendChild(s26);
    screens.push(s26);
    x += W + G;
    
    // ====================
    // SCREEN 27: Dine-In-Vouchers-Hub
    // ====================
    const s27 = figma.createFrame();
    s27.name = "133-Dine-In-Vouchers-Hub";
    s27.resize(W, H);
    s27.x = x;
    s27.y = y;
    s27.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s27);
    
    const header27 = figma.createRectangle();
    header27.resize(W, 60);
    header27.x = 0;
    header27.y = 44;
    header27.fills = [{type: 'SOLID', color: C.teal}];
    s27.appendChild(header27);
    txt(s27, "←", 15, 62, 24, C.white, "Bold");
    txt(s27, "Dine-In Vouchers", 55, 69, 18, C.white, "Bold");
    
    // Hero Banner
    const heroBanner = figma.createRectangle();
    heroBanner.resize(315, 80);
    heroBanner.x = 30;
    heroBanner.y = 124;
    heroBanner.cornerRadius = 12;
    heroBanner.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s27.appendChild(heroBanner);
    
    txt(s27, "🎟️", 45, 142, 32, C.teal, "Regular");
    txt(s27, "Dine-In Exclusive Offers", 90, 145, 16, C.text, "Bold");
    txt(s27, "Save when you eat at restaurants", 90, 168, 12, C.gray, "Regular");
    
    // Tab Filter
    const voucherTabs = ["All", "Near Me", "Top Rated", "Expiring Soon"];
    let voucherX = 30;
    for (let i = 0; i < voucherTabs.length; i++) {
      const vtab = figma.createRectangle();
      const vtabW = voucherTabs[i].length * 9 + 16;
      vtab.resize(vtabW, 30);
      vtab.x = voucherX;
      vtab.y = 224;
      vtab.cornerRadius = 15;
      vtab.fills = i === 0 ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.lightBg}];
      s27.appendChild(vtab);
      
      txt(s27, voucherTabs[i], voucherX + 8, 232, 11, i === 0 ? C.white : C.gray, "Bold");
      voucherX += vtabW + 8;
    }
    
    // Voucher Card 1
    const voucher1 = figma.createRectangle();
    voucher1.resize(315, 140);
    voucher1.x = 30;
    voucher1.y = 274;
    voucher1.cornerRadius = 12;
    voucher1.fills = [{type: 'SOLID', color: C.lightBg}];
    s27.appendChild(voucher1);
    
    const vBadge1 = figma.createRectangle();
    vBadge1.resize(70, 28);
    vBadge1.x = 40;
    vBadge1.y = 284;
    vBadge1.cornerRadius = 6;
    vBadge1.fills = [{type: 'SOLID', color: C.red}];
    s27.appendChild(vBadge1);
    txt(s27, "30% OFF", 48, 290, 11, C.white, "Bold");
    
    txt(s27, "🍕 Pizza Palace", 45, 324, 15, C.text, "Bold");
    txt(s27, "Valid for dine-in only", 45, 346, 11, C.gray, "Regular");
    txt(s27, "⭐ 4.5 • 2.3 km away", 45, 366, 11, C.gray, "Regular");
    
    txt(s27, "Max discount: Rs 500", 45, 386, 11, C.gray, "Regular");
    
    const vExpiry1 = figma.createRectangle();
    vExpiry1.resize(100, 22);
    vExpiry1.x = 230;
    vExpiry1.y = 382;
    vExpiry1.cornerRadius = 11;
    vExpiry1.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s27.appendChild(vExpiry1);
    txt(s27, "⏰ 5 days left", 240, 386, 10, C.yellow, "Bold");
    
    btn(s27, "ViewVoucher1-CLICK", 235, 348, 90, 28, C.teal, "View Details", 10);
    
    // Voucher Card 2
    const voucher2 = figma.createRectangle();
    voucher2.resize(315, 140);
    voucher2.x = 30;
    voucher2.y = 429;
    voucher2.cornerRadius = 12;
    voucher2.fills = [{type: 'SOLID', color: C.lightBg}];
    s27.appendChild(voucher2);
    
    const vBadge2 = figma.createRectangle();
    vBadge2.resize(70, 28);
    vBadge2.x = 40;
    vBadge2.y = 439;
    vBadge2.cornerRadius = 6;
    vBadge2.fills = [{type: 'SOLID', color: C.red}];
    s27.appendChild(vBadge2);
    txt(s27, "25% OFF", 48, 445, 11, C.white, "Bold");
    
    txt(s27, "🍔 Burger House", 45, 479, 15, C.text, "Bold");
    txt(s27, "Valid for dine-in only", 45, 501, 11, C.gray, "Regular");
    txt(s27, "⭐ 4.7 • 1.8 km away", 45, 521, 11, C.gray, "Regular");
    
    txt(s27, "Max discount: Rs 300", 45, 541, 11, C.gray, "Regular");
    
    const vExpiry2 = figma.createRectangle();
    vExpiry2.resize(100, 22);
    vExpiry2.x = 230;
    vExpiry2.y = 537;
    vExpiry2.cornerRadius = 11;
    vExpiry2.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s27.appendChild(vExpiry2);
    txt(s27, "⏰ 12 days left", 238, 541, 10, C.green, "Bold");
    
    btn(s27, "ViewVoucher2-CLICK", 235, 503, 90, 28, C.teal, "View Details", 10);
    
    // How to Use Section
    txt(s27, "How to Use Vouchers", 30, 589, 15, C.text, "Bold");
    
    const howToCard = figma.createRectangle();
    howToCard.resize(315, 130);
    howToCard.x = 30;
    howToCard.y = 619;
    howToCard.cornerRadius = 12;
    howToCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s27.appendChild(howToCard);
    
    txt(s27, "1. Select a voucher", 45, 634, 12, C.text, "Regular");
    txt(s27, "2. Visit the restaurant", 45, 656, 12, C.text, "Regular");
    txt(s27, "3. Show QR code before ordering", 45, 678, 12, C.text, "Regular");
    txt(s27, "4. Enjoy your discount!", 45, 700, 12, C.text, "Regular");
    
    targetPage.appendChild(s27);
    screens.push(s27);
    x += W + G;
    
    // ====================
    // SCREEN 28: Voucher-QR-Redeem
    // ====================
    const s28 = figma.createFrame();
    s28.name = "134-Voucher-QR-Redeem";
    s28.resize(W, H);
    s28.x = x;
    s28.y = y;
    s28.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s28);
    
    const header28 = figma.createRectangle();
    header28.resize(W, 60);
    header28.x = 0;
    header28.y = 44;
    header28.fills = [{type: 'SOLID', color: C.teal}];
    s28.appendChild(header28);
    txt(s28, "←", 15, 62, 24, C.white, "Bold");
    txt(s28, "Redeem Voucher", 55, 69, 18, C.white, "Bold");
    
    // Voucher Info Card
    const voucherInfoCard = figma.createRectangle();
    voucherInfoCard.resize(315, 100);
    voucherInfoCard.x = 30;
    voucherInfoCard.y = 124;
    voucherInfoCard.cornerRadius = 12;
    voucherInfoCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s28.appendChild(voucherInfoCard);
    
    txt(s28, "🍕 Pizza Palace", 45, 139, 16, C.text, "Bold");
    txt(s28, "30% OFF Dine-In", 45, 161, 14, C.teal, "Bold");
    txt(s28, "Max discount: Rs 500", 45, 183, 12, C.gray, "Regular");
    txt(s28, "Valid until: Dec 5, 2025", 45, 200, 11, C.gray, "Regular");
    
    // QR Code
    txt(s28, "Show this QR code to staff", 95, 244, 14, C.text, "Bold");
    
    const qrBg = figma.createRectangle();
    qrBg.resize(240, 240);
    qrBg.x = 67;
    qrBg.y = 274;
    qrBg.cornerRadius = 12;
    qrBg.fills = [{type: 'SOLID', color: C.white}];
    qrBg.strokes = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    qrBg.strokeWeight = 2;
    s28.appendChild(qrBg);
    
    // QR Code pattern (simplified)
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 12; col++) {
        if (Math.random() > 0.5) {
          const pixel = figma.createRectangle();
          pixel.resize(15, 15);
          pixel.x = 82 + (col * 17);
          pixel.y = 289 + (row * 17);
          pixel.fills = [{type: 'SOLID', color: C.text}];
          s28.appendChild(pixel);
        }
      }
    }
    
    txt(s28, "QR Code", 165, 380, 16, C.gray, "Regular");
    
    // Voucher Code
    txt(s28, "Or use code:", 145, 534, 13, C.text, "Bold");
    
    const codeBox = figma.createRectangle();
    codeBox.resize(200, 50);
    codeBox.x = 87;
    codeBox.y = 559;
    codeBox.cornerRadius = 10;
    codeBox.fills = [{type: 'SOLID', color: C.lightBg}];
    codeBox.strokes = [{type: 'SOLID', color: C.teal}];
    codeBox.strokeWeight = 2;
    codeBox.dashPattern = [5, 3];
    s28.appendChild(codeBox);
    
    txt(s28, "PIZZA30OFF", 125, 577, 16, C.teal, "Bold");
    
    // Instructions
    const instrBox = figma.createRectangle();
    instrBox.resize(315, 100);
    instrBox.x = 30;
    instrBox.y = 629;
    instrBox.cornerRadius = 12;
    instrBox.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.95}}];
    s28.appendChild(instrBox);
    
    txt(s28, "⚠️ Important:", 45, 644, 13, C.yellow, "Bold");
    txt(s28, "• Show QR before placing order", 45, 667, 11, C.text, "Regular");
    txt(s28, "• Valid for dine-in only", 45, 687, 11, C.text, "Regular");
    txt(s28, "• Cannot be combined with other offers", 45, 707, 11, C.text, "Regular");
    
    // Bottom Button
    btn(s28, "Done-CLICK", 30, 750, 315, 50, C.teal, "Done", 16);
    
    targetPage.appendChild(s28);
    screens.push(s28);
    x += W + G;
    
    // ====================
    // SCREEN 29: Corporate-Discount-Manager
    // ====================
    const s29 = figma.createFrame();
    s29.name = "135-Corporate-Discount-Manager";
    s29.resize(W, H);
    s29.x = x;
    s29.y = y;
    s29.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s29);
    
    const header29 = figma.createRectangle();
    header29.resize(W, 60);
    header29.x = 0;
    header29.y = 44;
    header29.fills = [{type: 'SOLID', color: C.teal}];
    s29.appendChild(header29);
    txt(s29, "←", 15, 62, 24, C.white, "Bold");
    txt(s29, "Corporate Discounts", 55, 69, 16, C.white, "Bold");
    
    // Employee Info Card
    const empCard = figma.createRectangle();
    empCard.resize(315, 80);
    empCard.x = 30;
    empCard.y = 124;
    empCard.cornerRadius = 12;
    empCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s29.appendChild(empCard);
    
    txt(s29, "🏢", 45, 141, 32, C.teal, "Regular");
    txt(s29, "TechCorp Pakistan", 90, 145, 15, C.text, "Bold");
    txt(s29, "Employee ID: EMP-12345", 90, 166, 12, C.gray, "Regular");
    txt(s29, "Status: ✓ Verified", 90, 183, 11, C.green, "Regular");
    
    // Active Discounts
    txt(s29, "Active Discounts (5)", 30, 224, 15, C.text, "Bold");
    
    const disc1 = figma.createRectangle();
    disc1.resize(315, 100);
    disc1.x = 30;
    disc1.y = 254;
    disc1.cornerRadius = 12;
    disc1.fills = [{type: 'SOLID', color: C.lightBg}];
    s29.appendChild(disc1);
    
    const discBadge1 = figma.createRectangle();
    discBadge1.resize(70, 26);
    discBadge1.x = 40;
    discBadge1.y = 264;
    discBadge1.cornerRadius = 6;
    discBadge1.fills = [{type: 'SOLID', color: C.green}];
    s29.appendChild(discBadge1);
    txt(s29, "20% OFF", 48, 269, 11, C.white, "Bold");
    
    txt(s29, "All Restaurants", 45, 302, 14, C.text, "Bold");
    txt(s29, "Corporate partnership discount", 45, 322, 11, C.gray, "Regular");
    txt(s29, "Valid: Permanent", 45, 339, 11, C.green, "Regular");
    
    btn(s29, "UseDiscount1-CLICK", 240, 310, 85, 28, C.teal, "Use Now", 11);
    
    const disc2 = figma.createRectangle();
    disc2.resize(315, 100);
    disc2.x = 30;
    disc2.y = 369;
    disc2.cornerRadius = 12;
    disc2.fills = [{type: 'SOLID', color: C.lightBg}];
    s29.appendChild(disc2);
    
    const discBadge2 = figma.createRectangle();
    discBadge2.resize(90, 26);
    discBadge2.x = 40;
    discBadge2.y = 379;
    discBadge2.cornerRadius = 6;
    discBadge2.fills = [{type: 'SOLID', color: C.yellow}];
    s29.appendChild(discBadge2);
    txt(s29, "Free Delivery", 48, 384, 11, C.white, "Bold");
    
    txt(s29, "Lunch Orders", 45, 417, 14, C.text, "Bold");
    txt(s29, "Mon-Fri, 12 PM - 2 PM", 45, 437, 11, C.gray, "Regular");
    txt(s29, "Valid: Weekdays only", 45, 454, 11, C.yellow, "Regular");
    
    btn(s29, "UseDiscount2-CLICK", 240, 425, 85, 28, C.yellow, "Use Now", 11);
    
    // Usage Stats
    txt(s29, "This Month's Usage", 30, 489, 15, C.text, "Bold");
    
    const usageCard = figma.createRectangle();
    usageCard.resize(315, 100);
    usageCard.x = 30;
    usageCard.y = 519;
    usageCard.cornerRadius = 12;
    usageCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s29.appendChild(usageCard);
    
    txt(s29, "Orders with discount:", 45, 534, 12, C.gray, "Regular");
    txt(s29, "18", 295, 534, 14, C.text, "Bold");
    
    txt(s29, "Total saved:", 45, 559, 12, C.gray, "Regular");
    txt(s29, "Rs 3,450", 250, 557, 14, C.green, "Bold");
    
    txt(s29, "Average discount:", 45, 584, 12, C.gray, "Regular");
    txt(s29, "Rs 192", 268, 584, 12, C.text, "Bold");
    
    // Share with Colleagues
    txt(s29, "Share with Colleagues", 30, 639, 15, C.text, "Bold");
    
    const shareCard = figma.createRectangle();
    shareCard.resize(315, 80);
    shareCard.x = 30;
    shareCard.y = 669;
    shareCard.cornerRadius = 12;
    shareCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s29.appendChild(shareCard);
    
    txt(s29, "Invite colleagues to join", 45, 684, 13, C.text, "Regular");
    txt(s29, "and unlock more benefits!", 45, 704, 13, C.text, "Regular");
    
    btn(s29, "ShareInvite-CLICK", 210, 686, 110, 35, C.teal, "📤 Share", 12);
    
    targetPage.appendChild(s29);
    screens.push(s29);
    x += W + G;
    
    // ====================
    // SCREEN 30: Refund-Status-Tracker
    // ====================
    const s30 = figma.createFrame();
    s30.name = "128-Refund-Status-Tracker";
    s30.resize(W, H);
    s30.x = x;
    s30.y = y;
    s30.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s30);
    
    const header30 = figma.createRectangle();
    header30.resize(W, 60);
    header30.x = 0;
    header30.y = 44;
    header30.fills = [{type: 'SOLID', color: C.teal}];
    s30.appendChild(header30);
    txt(s30, "←", 15, 62, 24, C.white, "Bold");
    txt(s30, "Refund Status", 55, 69, 18, C.white, "Bold");
    
    // Refund Summary Card
    const refundCard = figma.createRectangle();
    refundCard.resize(315, 120);
    refundCard.x = 30;
    refundCard.y = 124;
    refundCard.cornerRadius = 12;
    refundCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s30.appendChild(refundCard);
    
    txt(s30, "Refund Amount", 45, 139, 13, C.gray, "Regular");
    txt(s30, "Rs 1,450", 45, 160, 28, C.green, "Bold");
    
    const statusBadge30 = figma.createRectangle();
    statusBadge30.resize(100, 28);
    statusBadge30.x = 230;
    statusBadge30.y = 145;
    statusBadge30.cornerRadius = 14;
    statusBadge30.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.2}];
    s30.appendChild(statusBadge30);
    txt(s30, "⏳ Processing", 243, 151, 11, C.yellow, "Bold");
    
    txt(s30, "Order #1234567", 45, 203, 12, C.gray, "Regular");
    txt(s30, "Refund ID: REF-98765", 45, 220, 11, C.gray, "Regular");
    
    // Timeline
    txt(s30, "Refund Timeline", 30, 264, 15, C.text, "Bold");
    
    const timeline = [
      {step: "Refund Requested", status: "✓", date: "Nov 28, 2:00 PM", completed: true},
      {step: "Under Review", status: "✓", date: "Nov 28, 3:15 PM", completed: true},
      {step: "Approved", status: "⏳", date: "Processing...", completed: false},
      {step: "Amount Credited", status: "○", date: "Pending", completed: false}
    ];
    
    let timelineY = 299;
    for (let i = 0; i < timeline.length; i++) {
      const step = timeline[i];
      
      // Timeline dot
      const dot = figma.createEllipse();
      dot.resize(24, 24);
      dot.x = 40;
      dot.y = timelineY;
      dot.fills = step.completed ? [{type: 'SOLID', color: C.green}] : [{type: 'SOLID', color: C.lightBg}];
      dot.strokes = [{type: 'SOLID', color: step.completed ? C.green : C.gray}];
      dot.strokeWeight = 2;
      s30.appendChild(dot);
      
      txt(s30, step.status, 46, timelineY + 4, 14, step.completed ? C.white : C.gray, "Bold");
      
      // Timeline line
      if (i < timeline.length - 1) {
        const line = figma.createRectangle();
        line.resize(2, 50);
        line.x = 51;
        line.y = timelineY + 24;
        line.fills = step.completed ? [{type: 'SOLID', color: C.green}] : [{type: 'SOLID', color: C.gray, opacity: 0.3}];
        s30.appendChild(line);
      }
      
      // Timeline text
      txt(s30, step.step, 75, timelineY + 2, 13, C.text, "Bold");
      txt(s30, step.date, 75, timelineY + 21, 11, C.gray, "Regular");
      
      timelineY += 74;
    }
    
    // Expected Date
    const expectedCard = figma.createRectangle();
    expectedCard.resize(315, 60);
    expectedCard.x = 30;
    expectedCard.y = 595;
    expectedCard.cornerRadius = 12;
    expectedCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s30.appendChild(expectedCard);
    
    txt(s30, "ℹ️", 45, 612, 24, C.teal, "Regular");
    txt(s30, "Expected credit date:", 80, 610, 12, C.gray, "Regular");
    txt(s30, "Dec 2, 2025 (3-5 business days)", 80, 628, 11, C.teal, "Bold");
    
    // Payment Method Info
    txt(s30, "Refund Method", 30, 675, 15, C.text, "Bold");
    
    const methodCard = figma.createRectangle();
    methodCard.resize(315, 60);
    methodCard.x = 30;
    methodCard.y = 705;
    methodCard.cornerRadius = 12;
    methodCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s30.appendChild(methodCard);
    
    txt(s30, "💳", 45, 722, 24, C.text, "Regular");
    txt(s30, "Original Payment Method", 80, 720, 13, C.text, "Bold");
    txt(s30, "Card ending in •••• 1234", 80, 740, 11, C.gray, "Regular");
    
    targetPage.appendChild(s30);
    screens.push(s30);
    x += W + G;
    
    figma.notify('✅ Chunk 3/4 Complete - 10 more screens created (Total: 30)');
    // ====================
    // SCREEN 31: Reservations-Hub
    // ====================
    const s31 = figma.createFrame();
    s31.name = "129-Reservations-Hub";
    s31.resize(W, H);
    s31.x = x;
    s31.y = y;
    s31.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s31);
    
    const header31 = figma.createRectangle();
    header31.resize(W, 60);
    header31.x = 0;
    header31.y = 44;
    header31.fills = [{type: 'SOLID', color: C.teal}];
    s31.appendChild(header31);
    txt(s31, "←", 15, 62, 24, C.white, "Bold");
    txt(s31, "Table Reservations", 55, 69, 18, C.white, "Bold");
    
    // Tab Navigation
    const tabBg31 = figma.createRectangle();
    tabBg31.resize(315, 45);
    tabBg31.x = 30;
    tabBg31.y = 124;
    tabBg31.cornerRadius = 10;
    tabBg31.fills = [{type: 'SOLID', color: C.lightBg}];
    s31.appendChild(tabBg31);
    
    const tab31_1 = figma.createRectangle();
    tab31_1.resize(100, 35);
    tab31_1.x = 35;
    tab31_1.y = 129;
    tab31_1.cornerRadius = 8;
    tab31_1.fills = [{type: 'SOLID', color: C.teal}];
    s31.appendChild(tab31_1);
    txt(s31, "Make", 62, 140, 13, C.white, "Bold");
    
    txt(s31, "My Reservations", 145, 140, 12, C.gray, "Regular");
    txt(s31, "History", 270, 140, 12, C.gray, "Regular");
    
    // Make Reservation Tab Content
    txt(s31, "Restaurant", 30, 189, 14, C.text, "Bold");
    
    const restSelect = figma.createRectangle();
    restSelect.resize(315, 50);
    restSelect.x = 30;
    restSelect.y = 213;
    restSelect.cornerRadius = 12;
    restSelect.fills = [{type: 'SOLID', color: C.lightBg}];
    s31.appendChild(restSelect);
    
    txt(s31, "🍕 Pizza Palace", 45, 230, 14, C.text, "Bold");
    btn(s31, "ChangeRestaurant-CLICK", 235, 225, 90, 30, C.teal, "Change", 11);
    
    // Date Picker
    txt(s31, "Date:", 30, 283, 13, C.text, "Bold");
    const datePicker = figma.createRectangle();
    datePicker.resize(315, 45);
    datePicker.x = 30;
    datePicker.y = 303;
    datePicker.cornerRadius = 12;
    datePicker.fills = [{type: 'SOLID', color: C.lightBg}];
    datePicker.strokes = [{type: 'SOLID', color: C.gray}];
    datePicker.strokeWeight = 1;
    s31.appendChild(datePicker);
    txt(s31, "📅 Nov 30, 2025", 45, 318, 14, C.text, "Regular");
    
    // Time Picker
    txt(s31, "Time:", 30, 363, 13, C.text, "Bold");
    const timePicker = figma.createRectangle();
    timePicker.resize(150, 45);
    timePicker.x = 30;
    timePicker.y = 383;
    timePicker.cornerRadius = 12;
    timePicker.fills = [{type: 'SOLID', color: C.lightBg}];
    timePicker.strokes = [{type: 'SOLID', color: C.gray}];
    timePicker.strokeWeight = 1;
    s31.appendChild(timePicker);
    txt(s31, "🕐 7:00 PM", 45, 398, 14, C.text, "Regular");
    
    // Party Size
    txt(s31, "Party Size:", 195, 363, 13, C.text, "Bold");
    const partySize = figma.createRectangle();
    partySize.resize(150, 45);
    partySize.x = 195;
    partySize.y = 383;
    partySize.cornerRadius = 12;
    partySize.fills = [{type: 'SOLID', color: C.lightBg}];
    s31.appendChild(partySize);
    txt(s31, "-", 210, 397, 18, C.teal, "Bold");
    txt(s31, "👥 4 people", 235, 398, 12, C.text, "Regular");
    txt(s31, "+", 320, 397, 18, C.teal, "Bold");
    
    // Special Requests
    txt(s31, "Special Requests (optional):", 30, 443, 13, C.text, "Bold");
    const requestBox = figma.createRectangle();
    requestBox.resize(315, 70);
    requestBox.x = 30;
    requestBox.y = 463;
    requestBox.cornerRadius = 12;
    requestBox.fills = [{type: 'SOLID', color: C.lightBg}];
    requestBox.strokes = [{type: 'SOLID', color: C.gray}];
    requestBox.strokeWeight = 1;
    s31.appendChild(requestBox);
    txt(s31, "Window seat preferred", 45, 492, 13, C.gray, "Regular");
    
    // Availability Check
    const availCheck = figma.createRectangle();
    availCheck.resize(315, 45);
    availCheck.x = 30;
    availCheck.y = 553;
    availCheck.cornerRadius = 12;
    availCheck.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s31.appendChild(availCheck);
    
    txt(s31, "✓", 45, 566, 20, C.green, "Bold");
    txt(s31, "Available tables for this time", 75, 570, 13, C.green, "Bold");
    
    // Bottom Button
    btn(s31, "ConfirmReservation-CLICK", 30, 720, 315, 50, C.green, "Confirm Reservation", 16);
    
    targetPage.appendChild(s31);
    screens.push(s31);
    x += W + G;
    
    // ====================
    // SCREEN 32: Delivery-Guarantee-Compensation
    // ====================
    const s32 = figma.createFrame();
    s32.name = "136-Delivery-Guarantee-Compensation";
    s32.resize(W, H);
    s32.x = x;
    s32.y = y;
    s32.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0.5}];


    
    notificationBar(s32);
    
    // Modal Overlay
    const compModal = figma.createRectangle();
    compModal.resize(330, 580);
    compModal.x = 22;
    compModal.y = 116;
    compModal.cornerRadius = 16;
    compModal.fills = [{type: 'SOLID', color: C.white}];
    s32.appendChild(compModal);
    
    // Header
    txt(s32, "⚠️", 170, 140, 40, C.yellow, "Regular");
    txt(s32, "Delivery Time Guarantee Missed", 55, 195, 16, C.text, "Bold");
    txt(s32, "Your order arrived later than promised", 65, 218, 12, C.gray, "Regular");
    
    // Order Summary Card
    const orderSum = figma.createRectangle();
    orderSum.resize(290, 110);
    orderSum.x = 42;
    orderSum.y = 245;
    orderSum.cornerRadius = 12;
    orderSum.fills = [{type: 'SOLID', color: C.lightBg}];
    s32.appendChild(orderSum);
    
    txt(s32, "Order #1234567", 57, 260, 13, C.text, "Bold");
    txt(s32, "🍕 Pizza Palace", 57, 280, 12, C.gray, "Regular");
    txt(s32, "Promised by: 8:00 PM", 57, 300, 11, C.gray, "Regular");
    txt(s32, "Delivered at: 8:18 PM (+18 mins)", 57, 318, 11, C.red, "Bold");
    txt(s32, "🛣️ Heavy traffic in your area", 57, 336, 11, C.gray, "Regular");
    
    // Compensation Details
    const compCard = figma.createRectangle();
    compCard.resize(290, 100);
    compCard.x = 42;
    compCard.y = 370;
    compCard.cornerRadius = 12;
    compCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s32.appendChild(compCard);
    
    txt(s32, "Compensation Applied:", 57, 385, 13, C.green, "Bold");
    txt(s32, "Delivery Guarantee Credit: Rs 200", 57, 408, 11, C.text, "Regular");
    txt(s32, "Applied to: Wallet balance", 57, 426, 11, C.gray, "Regular");
    txt(s32, "Available for next order", 57, 444, 11, C.gray, "Regular");
    
    // Reason
    txt(s32, "What happened?", 42, 485, 13, C.text, "Bold");
    txt(s32, "• Unusual traffic congestion", 57, 508, 11, C.gray, "Regular");
    txt(s32, "• High order volume from restaurant", 57, 526, 11, C.gray, "Regular");
    txt(s32, "View ETA history →", 57, 547, 11, C.teal, "Bold");
    
    // Bottom Buttons
    btn(s32, "OkayGotIt-CLICK", 42, 580, 290, 45, C.green, "Okay, Got It", 14);
    btn(s32, "ViewOrderDetails-CLICK", 42, 635, 290, 40, C.lightBg, "View Order Details", 12);
    
    targetPage.appendChild(s32);
    screens.push(s32);
    x += W + G;
    
    // ====================
    // SCREEN 33: Map-Search-&-Cuisine-Filters
    // ====================
    const s33 = figma.createFrame();
    s33.name = "139-Map-Search-Cuisine-Filters";
    s33.resize(W, H);
    s33.x = x;
    s33.y = y;
    s33.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s33);
    
    // Top Bar with Search
    const searchBar33 = figma.createRectangle();
    searchBar33.resize(270, 45);
    searchBar33.x = 30;
    searchBar33.y = 54;
    searchBar33.cornerRadius = 22;
    searchBar33.fills = [{type: 'SOLID', color: C.lightBg}];
    s33.appendChild(searchBar33);
    txt(s33, "🔍 Search for restaurants...", 50, 69, 13, C.gray, "Regular");
    
    const filterBtn33 = figma.createRectangle();
    filterBtn33.resize(50, 45);
    filterBtn33.x = 305;
    filterBtn33.y = 54;
    filterBtn33.cornerRadius = 22;
    filterBtn33.fills = [{type: 'SOLID', color: C.teal}];
    s33.appendChild(filterBtn33);
    txt(s33, "⚙️", 320, 62, 20, C.white, "Regular");
    
    // Cuisine Filter Chips
    const cuisineChips = ["All", "Pakistani", "Chinese", "Italian", "Fast Food"];
    let chipX33 = 30;
    for (let i = 0; i < cuisineChips.length; i++) {
      const chip = figma.createRectangle();
      const chipW = cuisineChips[i].length * 9 + 16;
      chip.resize(chipW, 28);
      chip.x = chipX33;
      chip.y = 114;
      chip.cornerRadius = 14;
      chip.fills = i === 0 ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.lightBg}];
      s33.appendChild(chip);
      
      txt(s33, cuisineChips[i], chipX33 + 8, 121, 11, i === 0 ? C.white : C.gray, "Bold");
      chipX33 += chipW + 8;
    }
    
    txt(s33, "Active: Pakistani, Fast Food, 4.0+ ⭐", 30, 152, 10, C.gray, "Regular");
    txt(s33, "Clear All", 290, 152, 10, C.teal, "Bold");
    
    // Map Area
    const mapArea = figma.createRectangle();
    mapArea.resize(315, 280);
    mapArea.x = 30;
    mapArea.y = 172;
    mapArea.cornerRadius = 12;
    mapArea.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 0.9}}];
    s33.appendChild(mapArea);
    
    txt(s33, "🗺️ Interactive Map", 135, 295, 14, C.gray, "Regular");
    txt(s33, "Zoom: + -", 160, 320, 12, C.gray, "Regular");
    
    // Location Marker
    txt(s33, "🔵", 180, 270, 20, C.teal, "Regular");
    txt(s33, "You", 185, 295, 10, C.text, "Bold");
    
    // Restaurant Markers
    txt(s33, "🍴", 140, 230, 20, C.red, "Regular");
    txt(s33, "🏭", 220, 310, 20, C.yellow, "Regular");
    txt(s33, "Delivery Only", 195, 335, 8, C.yellow, "Bold");
    
    // Map Info Card (Floating)
    const mapCard = figma.createRectangle();
    mapCard.resize(200, 90);
    mapCard.x = 120;
    mapCard.y = 180;
    mapCard.cornerRadius = 10;
    mapCard.fills = [{type: 'SOLID', color: C.white}];
    s33.appendChild(mapCard);
    
    txt(s33, "Pizza Palace", 130, 193, 12, C.text, "Bold");
    txt(s33, "1.8 km • 25-30 mins", 130, 210, 10, C.gray, "Regular");
    txt(s33, "🟢 Low congestion", 130, 227, 10, C.green, "Regular");
    txt(s33, "🚴 5 riders nearby", 130, 243, 10, C.gray, "Regular");
    btn(s33, "ViewMenu-CLICK", 130, 252, 80, 22, C.teal, "View Menu", 9);
    
    // Restaurant List (Below Map)
    txt(s33, "Restaurants in this area", 30, 467, 14, C.text, "Bold");
    
    const restList1 = figma.createRectangle();
    restList1.resize(315, 80);
    restList1.x = 30;
    restList1.y = 497;
    restList1.cornerRadius = 12;
    restList1.fills = [{type: 'SOLID', color: C.lightBg}];
    s33.appendChild(restList1);
    
    txt(s33, "🍕", 45, 515, 24, C.text, "Regular");
    txt(s33, "Pizza Palace", 80, 510, 14, C.text, "Bold");
    txt(s33, "1.8 km • 25-30 mins", 80, 530, 11, C.gray, "Regular");
    txt(s33, "🟢 Low congestion", 80, 548, 10, C.green, "Regular");
    txt(s33, "Italian • Fast Food", 80, 563, 10, C.gray, "Regular");
    
    const restList2 = figma.createRectangle();
    restList2.resize(315, 80);
    restList2.x = 30;
    restList2.y = 592;
    restList2.cornerRadius = 12;
    restList2.fills = [{type: 'SOLID', color: C.lightBg}];
    s33.appendChild(restList2);
    
    txt(s33, "🏭", 45, 610, 24, C.yellow, "Regular");
    txt(s33, "Cloud Kitchen Express", 80, 605, 13, C.text, "Bold");
    txt(s33, "2.1 km • 30-35 mins", 80, 625, 11, C.gray, "Regular");
    txt(s33, "🏭 Delivery-Only Kitchen", 80, 643, 10, C.yellow, "Bold");
    txt(s33, "⚠️ Some items disabled", 80, 658, 10, C.red, "Regular");
    
    targetPage.appendChild(s33);
    screens.push(s33);
    x += W + G;
    
    // ====================
    // SCREEN 34: Order-History-&-Reorder
    // ====================
    const s34 = figma.createFrame();
    s34.name = "140-Order-History-Reorder";
    s34.resize(W, H);
    s34.x = x;
    s34.y = y;
    s34.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s34);
    
    const header34 = figma.createRectangle();
    header34.resize(W, 60);
    header34.x = 0;
    header34.y = 44;
    header34.fills = [{type: 'SOLID', color: C.teal}];
    s34.appendChild(header34);
    txt(s34, "←", 15, 62, 24, C.white, "Bold");
    txt(s34, "Order History", 55, 69, 18, C.white, "Bold");
    
    // Filter Row
    const statusFilter = figma.createRectangle();
    statusFilter.resize(100, 35);
    statusFilter.x = 30;
    statusFilter.y = 124;
    statusFilter.cornerRadius = 8;
    statusFilter.fills = [{type: 'SOLID', color: C.lightBg}];
    s34.appendChild(statusFilter);
    txt(s34, "All Statuses ▼", 40, 134, 11, C.gray, "Regular");
    
    const dateFilter = figma.createRectangle();
    dateFilter.resize(100, 35);
    dateFilter.x = 140;
    dateFilter.y = 124;
    dateFilter.cornerRadius = 8;
    dateFilter.fills = [{type: 'SOLID', color: C.lightBg}];
    s34.appendChild(dateFilter);
    txt(s34, "This Month ▼", 150, 134, 11, C.gray, "Regular");
    
    const searchBox34 = figma.createRectangle();
    searchBox34.resize(95, 35);

    searchBox34.x = 250;
    searchBox34.y = 124;
    searchBox34.cornerRadius = 8;
    searchBox34.fills = [{type: 'SOLID', color: C.lightBg}];
    s34.appendChild(searchBox34);
    txt(s34, "🔍 Search", 260, 134, 11, C.gray, "Regular");
    
    // Order Card 1 - Completed
    const order34_1 = figma.createRectangle();
    order34_1.resize(315, 130);
    order34_1.x = 30;
    order34_1.y = 179;
    order34_1.cornerRadius = 12;
    order34_1.fills = [{type: 'SOLID', color: C.lightBg}];
    s34.appendChild(order34_1);
    
    txt(s34, "Order #1234567", 45, 194, 13, C.text, "Bold");
    
    const completedBadge = figma.createRectangle();
    completedBadge.resize(80, 22);
    completedBadge.x = 250;
    completedBadge.y = 192;
    completedBadge.cornerRadius = 11;
    completedBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s34.appendChild(completedBadge);
    txt(s34, "✓ Completed", 260, 196, 10, C.green, "Bold");
    
    txt(s34, "🍕 Pizza Palace", 45, 221, 12, C.text, "Regular");
    txt(s34, "Delivered on Nov 29, 2:30 PM", 45, 239, 11, C.gray, "Regular");
    txt(s34, "3 items • Rs 1,450 • Card •••• 1234", 45, 257, 10, C.gray, "Regular");
    txt(s34, "🚴 Delivery", 45, 275, 10, C.gray, "Regular");
    
    btn(s34, "ViewDetails1-CLICK", 45, 285, 80, 22, C.lightBg, "View Details", 9);
    btn(s34, "Reorder1-CLICK", 135, 285, 70, 22, C.teal, "Reorder", 9);
    btn(s34, "RateOrder1-CLICK", 215, 285, 90, 22, C.yellow, "⭐ Rate Order", 9);
    
    // Order Card 2 - Cancelled
    const order34_2 = figma.createRectangle();
    order34_2.resize(315, 110);
    order34_2.x = 30;
    order34_2.y = 324;
    order34_2.cornerRadius = 12;
    order34_2.fills = [{type: 'SOLID', color: C.lightBg}];
    s34.appendChild(order34_2);
    
    txt(s34, "Order #1234566", 45, 339, 13, C.text, "Bold");
    
    const cancelledBadge = figma.createRectangle();
    cancelledBadge.resize(80, 22);
    cancelledBadge.x = 250;
    cancelledBadge.y = 337;
    cancelledBadge.cornerRadius = 11;
    cancelledBadge.fills = [{type: 'SOLID', color: C.red, opacity: 0.2}];
    s34.appendChild(cancelledBadge);
    txt(s34, "✕ Cancelled", 262, 341, 10, C.red, "Bold");
    
    txt(s34, "🍔 Burger House", 45, 366, 12, C.text, "Regular");
    txt(s34, "Nov 28, 1:00 PM", 45, 384, 11, C.gray, "Regular");
    txt(s34, "2 items • Rs 800", 45, 402, 10, C.gray, "Regular");
    
    btn(s34, "ViewDetails2-CLICK", 45, 410, 80, 22, C.lightBg, "View Details", 9);
    
    // Order Card 3 - Restaurant Closed (Reorder Unavailable)
    const order34_3 = figma.createRectangle();
    order34_3.resize(315, 120);
    order34_3.x = 30;
    order34_3.y = 449;
    order34_3.cornerRadius = 12;
    order34_3.fills = [{type: 'SOLID', color: C.lightBg}];
    s34.appendChild(order34_3);
    
    txt(s34, "Order #1234565", 45, 464, 13, C.text, "Bold");
    
    const completedBadge2 = figma.createRectangle();
    completedBadge2.resize(80, 22);
    completedBadge2.x = 250;
    completedBadge2.y = 462;
    completedBadge2.cornerRadius = 11;
    completedBadge2.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s34.appendChild(completedBadge2);
    txt(s34, "✓ Completed", 260, 466, 10, C.green, "Bold");
    
    txt(s34, "🍝 Pasta Corner", 45, 491, 12, C.text, "Regular");
    txt(s34, "Nov 27, 8:00 PM", 45, 509, 11, C.gray, "Regular");
    txt(s34, "1 item • Rs 500", 45, 527, 10, C.gray, "Regular");
    
    btn(s34, "ViewDetails3-CLICK", 45, 540, 80, 22, C.lightBg, "View Details", 9);
    
    const reorderDisabled = figma.createRectangle();
    reorderDisabled.resize(100, 22);
    reorderDisabled.x = 135;
    reorderDisabled.y = 540;
    reorderDisabled.cornerRadius = 11;
    reorderDisabled.fills = [{type: 'SOLID', color: C.gray, opacity: 0.2}];
    s34.appendChild(reorderDisabled);
    txt(s34, "Reorder Unavailable", 140, 544, 8, C.gray, "Regular");
    
    // Info Footer
    const infoFooter = figma.createRectangle();
    infoFooter.resize(315, 50);
    infoFooter.x = 30;
    infoFooter.y = 589;
    infoFooter.cornerRadius = 12;
    infoFooter.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s34.appendChild(infoFooter);
    
    txt(s34, "ℹ️", 45, 607, 18, C.teal, "Regular");
    txt(s34, "You can only rate orders placed on this account", 70, 609, 10, C.gray, "Regular");
    
    targetPage.appendChild(s34);
    screens.push(s34);
    x += W + G;
    
    // ====================
    // SCREEN 35: Recommendations-Feed
    // ====================
    const s35 = figma.createFrame();
    s35.name = "141-Recommendations-Feed";
    s35.resize(W, H);
    s35.x = x;
    s35.y = y;
    s35.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s35);
    
    const header35 = figma.createRectangle();
    header35.resize(W, 60);
    header35.x = 0;
    header35.y = 44;
    header35.fills = [{type: 'SOLID', color: C.teal}];
    s35.appendChild(header35);
    txt(s35, "←", 15, 62, 24, C.white, "Bold");
    txt(s35, "Recommended For You", 55, 69, 16, C.white, "Bold");
    
    // Hero Banner
    txt(s35, "Handpicked for You", 105, 130, 18, C.text, "Bold");
    txt(s35, "Based on what you've ordered and liked", 80, 155, 12, C.gray, "Regular");
    
    // Filter Chips
    const recChips = ["All", "Because you ordered...", "Similar", "Popular"];
    let recX = 30;
    for (let i = 0; i < recChips.length; i++) {
      const chip = figma.createRectangle();
      const chipW = recChips[i].length * 8 + 16;
      chip.resize(chipW, 28);
      chip.x = recX;
      chip.y = 185;
      chip.cornerRadius = 14;
      chip.fills = i === 0 ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.lightBg}];
      s35.appendChild(chip);
      
      txt(s35, recChips[i], recX + 8, 193, 10, i === 0 ? C.white : C.gray, "Bold");
      recX += chipW + 8;
    }
    
    // Recommendation Card
    const recCard = figma.createRectangle();
    recCard.resize(315, 280);
    recCard.x = 30;
    recCard.y = 233;
    recCard.cornerRadius = 12;
    recCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s35.appendChild(recCard);
    
    // Banner Image Area
    const recBanner = figma.createRectangle();
    recBanner.resize(315, 100);
    recBanner.x = 30;
    recBanner.y = 233;
    recBanner.cornerRadius = 12;
    recBanner.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s35.appendChild(recBanner);
    txt(s35, "🍔", 172, 265, 32, C.text, "Regular");
    
    txt(s35, "Burger House", 45, 348, 16, C.text, "Bold");
    txt(s35, "Because you ordered burgers from Pizza Palace", 45, 371, 11, C.gray, "Regular");
    
    txt(s35, "💡 We think you'll like this because:", 45, 395, 11, C.text, "Bold");
    txt(s35, "• Similar cuisine: Fast Food, Burgers", 50, 415, 10, C.gray, "Regular");
    txt(s35, "• Highly rated in your area (4.7★)", 50, 432, 10, C.gray, "Regular");
    txt(s35, "• Customers who liked Pizza Palace also", 50, 449, 10, C.gray, "Regular");
    txt(s35, "  order here", 54, 463, 10, C.gray, "Regular");
    
    txt(s35, "⭐ 4.7 (1,234) • 25-30 mins • Rs 400-800", 45, 483, 10, C.gray, "Regular");
    
    btn(s35, "ViewMenu35-CLICK", 45, 495, 100, 26, C.teal, "View Menu", 11);
    txt(s35, "Hide similar suggestions", 160, 501, 9, C.gray, "Regular");
    
    // Dish-Level Recommendations
    txt(s35, "Because you ordered: Large Pepperoni Pizza", 30, 533, 13, C.text, "Bold");
    
    const dishCard1 = figma.createRectangle();
    dishCard1.resize(140, 120);
    dishCard1.x = 30;
    dishCard1.y = 563;
    dishCard1.cornerRadius = 12;
    dishCard1.fills = [{type: 'SOLID', color: C.lightBg}];
    s35.appendChild(dishCard1);
    
    txt(s35, "🍕", 82, 583, 32, C.text, "Regular");
    txt(s35, "BBQ Chicken Pizza", 40, 625, 11, C.text, "Bold");
    txt(s35, "Pizza Palace", 40, 642, 9, C.gray, "Regular");
    txt(s35, "🌶️ Spicy • Popular", 40, 657, 9, C.red, "Regular");
    btn(s35, "AddToCart1-CLICK", 40, 667, 90, 20, C.teal, "+ Add", 9);
    
    const dishCard2 = figma.createRectangle();
    dishCard2.resize(140, 120);
    dishCard2.x = 185;
    dishCard2.y = 563;
    dishCard2.cornerRadius = 12;
    dishCard2.fills = [{type: 'SOLID', color: C.lightBg}];
    s35.appendChild(dishCard2);
    
    txt(s35, "🍕", 237, 583, 32, C.text, "Regular");
    txt(s35, "Veggie Supreme", 195, 625, 11, C.text, "Bold");
    txt(s35, "Pizza Palace", 195, 642, 9, C.gray, "Regular");
    txt(s35, "🥬 Vegetarian", 195, 657, 9, C.green, "Regular");
    btn(s35, "AddToCart2-CLICK", 195, 667, 90, 20, C.teal, "+ Add", 9);
    
    // Why This Suggestion Link
    txt(s35, "Why am I seeing this? →", 110, 703, 11, C.teal, "Bold");
    
    targetPage.appendChild(s35);
    screens.push(s35);
    x += W + G;
    
    // ====================
    // SCREEN 36: Membership-&-Subscription-Hub
    // ====================
    const s36 = figma.createFrame();
    s36.name = "142-Membership-Subscription-Hub";
    s36.resize(W, H);
    s36.x = x;
    s36.y = y;
    s36.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s36);
    
    const header36 = figma.createRectangle();
    header36.resize(W, 60);
    header36.x = 0;
    header36.y = 44;
    header36.fills = [{type: 'SOLID', color: C.yellow}];
    s36.appendChild(header36);
    txt(s36, "←", 15, 62, 24, C.white, "Bold");
    txt(s36, "Membership & Subscription", 55, 69, 15, C.white, "Bold");
    
    // Current Status Banner
    const statusBanner = figma.createRectangle();
    statusBanner.resize(315, 60);
    statusBanner.x = 30;
    statusBanner.y = 124;
    statusBanner.cornerRadius = 12;
    statusBanner.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    s36.appendChild(statusBanner);
    
    txt(s36, "Active Plan: Gold Member", 45, 139, 14, C.text, "Bold");
    txt(s36, "Auto-renews on: Dec 31, 2025", 45, 159, 12, C.gray, "Regular");
    btn(s36, "ManageSub-CLICK", 235, 142, 90, 30, C.yellow, "Manage", 11);
    
    // Plans Section
    txt(s36, "Available Plans", 30, 204, 15, C.text, "Bold");
    
    // Silver Plan
    const silverPlan = figma.createRectangle();
    silverPlan.resize(315, 140);
    silverPlan.x = 30;
    silverPlan.y = 234;
    silverPlan.cornerRadius = 12;
    silverPlan.fills = [{type: 'SOLID', color: C.lightBg}];
    s36.appendChild(silverPlan);
    
    txt(s36, "Silver", 45, 249, 16, C.text, "Bold");
    txt(s36, "Rs 499 / month", 45, 271, 14, C.gray, "Regular");
    txt(s36, "Benefits:", 45, 296, 12, C.text, "Bold");
    txt(s36, "• Free delivery on orders above Rs 800", 50, 316, 11, C.gray, "Regular");
    txt(s36, "• 5% off on all restaurants", 50, 333, 11, C.gray, "Regular");
    btn(s36, "ChooseSilver-CLICK", 45, 350, 120, 28, C.teal, "Choose Silver", 11);
    
    // Gold Plan (Recommended)
    const goldPlan = figma.createRectangle();
    goldPlan.resize(315, 160);
    goldPlan.x = 30;
    goldPlan.y = 389;
    goldPlan.cornerRadius = 12;
    goldPlan.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    goldPlan.strokes = [{type: 'SOLID', color: C.yellow}];
    goldPlan.strokeWeight = 2;
    s36.appendChild(goldPlan);
    
    const recBadge = figma.createRectangle();
    recBadge.resize(100, 22);
    recBadge.x = 230;
    recBadge.y = 394;
    recBadge.cornerRadius = 11;
    recBadge.fills = [{type: 'SOLID', color: C.yellow}];
    s36.appendChild(recBadge);
    txt(s36, "⭐ Recommended", 238, 398, 9, C.white, "Bold");
    
    txt(s36, "Gold", 45, 409, 16, C.text, "Bold");
    txt(s36, "Rs 999 / month", 45, 431, 14, C.gray, "Regular");
    txt(s36, "Benefits:", 45, 456, 12, C.text, "Bold");
    txt(s36, "• Unlimited free delivery", 50, 476, 11, C.text, "Regular");
    txt(s36, "• 10% off all restaurants", 50, 493, 11, C.text, "Regular");
    txt(s36, "• Priority support", 50, 510, 11, C.text, "Regular");
    btn(s36, "ChooseGold-CLICK", 45, 520, 120, 28, C.yellow, "Choose Gold", 11);
    
    // Active Subscription Management
    txt(s36, "Subscription Settings", 30, 569, 15, C.text, "Bold");
    
    const subSettings = figma.createRectangle();
    subSettings.resize(315, 140);
    subSettings.x = 30;
    subSettings.y = 599;
    subSettings.cornerRadius = 12;
    subSettings.fills = [{type: 'SOLID', color: C.lightBg}];
    s36.appendChild(subSettings);
    
    txt(s36, "Gold Member • Rs 999 / month", 45, 614, 13, C.text, "Bold");
    txt(s36, "Next charge: Dec 31, 2025", 45, 634, 11, C.gray, "Regular");
    txt(s36, "10% discount auto-applied at checkout", 45, 654, 11, C.green, "Regular");
    txt(s36, "Free delivery on all orders", 45, 671, 11, C.green, "Regular");
    
    btn(s36, "ChangePlan-CLICK", 45, 694, 100, 28, C.teal, "Change Plan", 10);
    btn(s36, "CancelSub-CLICK", 155, 694, 120, 28, C.red, "Cancel Subscription", 9);
    
    targetPage.appendChild(s36);
    screens.push(s36);
    x += W + G;
    
    // ====================
    // SCREEN 37: Web-App-Info-Landing
    // ====================
    const s37 = figma.createFrame();
    s37.name = "143-Web-App-Info-Landing";
    s37.resize(W, H);
    s37.x = x;
    s37.y = y;
    s37.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s37);
    
    // Header Nav
    const webHeader = figma.createRectangle();
    webHeader.resize(W, 70);
    webHeader.x = 0;
    webHeader.y = 44;
    webHeader.fills = [{type: 'SOLID', color: C.white}];
    webHeader.strokes = [{type: 'SOLID', color: C.lightBg}];
    webHeader.strokeWeight = 1;
    s37.appendChild(webHeader);
    
    txt(s37, "BasKhao", 30, 72, 20, C.teal, "Bold");
    txt(s37, "How It Works", 200, 77, 12, C.gray, "Regular");
    txt(s37, "Help", 300, 77, 12, C.gray, "Regular");
    
    // Hero Section
    txt(s37, "Order the best food", 95, 140, 18, C.text, "Bold");
    txt(s37, "from your city", 125, 163, 18, C.text, "Bold");
    txt(s37, "Download the mobile app to start ordering", 75, 193, 12, C.gray, "Regular");
    
    // Store Badges
    const playStore = figma.createRectangle();
    playStore.resize(140, 45);
    playStore.x = 30;
    playStore.y = 230;
    playStore.cornerRadius = 8;
    playStore.fills = [{type: 'SOLID', color: C.text}];
    s37.appendChild(playStore);
    txt(s37, "▶ Google Play", 50, 245, 12, C.white, "Bold");
    
    const appStore = figma.createRectangle();
    appStore.resize(140, 45);
    appStore.x = 185;
    appStore.y = 230;
    appStore.cornerRadius = 8;
    appStore.fills = [{type: 'SOLID', color: C.text}];
    s37.appendChild(appStore);
    txt(s37, " App Store", 215, 245, 12, C.white, "Bold");
    
    // Device Mockup
    const mockup = figma.createRectangle();
    mockup.resize(200, 280);
    mockup.x = 87;
    mockup.y = 295;
    mockup.cornerRadius = 16;
    mockup.fills = [{type: 'SOLID', color: C.lightBg}];
    s37.appendChild(mockup);
    
    txt(s37, "📱", 170, 415, 40, C.gray, "Regular");
    txt(s37, "App UI Preview", 145, 480, 12, C.gray, "Regular");
    
    // Feature Grid
    txt(s37, "Features", 150, 595, 14, C.text, "Bold");
    
    txt(s37, "⚡ Fast Delivery", 30, 625, 12, C.text, "Regular");
    txt(s37, "👥 Group Orders", 200, 625, 12, C.text, "Regular");
    txt(s37, "🤝 Food Donations", 30, 650, 12, C.text, "Regular");
    txt(s37, "💳 Split Payments", 200, 650, 12, C.text, "Regular");
    
    // Restricted Action Modal Overlay
    const webModal = figma.createRectangle();
    webModal.resize(280, 200);
    webModal.x = 47;
    webModal.y = 690;
    webModal.cornerRadius = 12;
    webModal.fills = [{type: 'SOLID', color: C.white}];
    s37.appendChild(webModal);
    
    txt(s37, "📱", 165, 710, 32, C.teal, "Regular");
    txt(s37, "Available on Mobile App Only", 75, 755, 13, C.text, "Bold");
    txt(s37, "Ordering, payments, and tracking", 82, 775, 10, C.gray, "Regular");
    txt(s37, "are available only in our mobile app", 78, 790, 10, C.gray, "Regular");
    
    btn(s37, "GetApp-CLICK", 97, 810, 140, 35, C.teal, "Download App", 12);
    
    targetPage.appendChild(s37);
    screens.push(s37);
    x += W + G;
    
    // ====================
    // SCREEN 38: Merchant-Delivery-Type-Settings
    // ====================
    const s38 = figma.createFrame();
    s38.name = "144-Merchant-Delivery-Type-Settings";
    s38.resize(W, H);
    s38.x = x;
    s38.y = y;
    s38.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s38);
    
    const header38 = figma.createRectangle();
    header38.resize(W, 60);
    header38.x = 0;
    header38.y = 44;
    header38.fills = [{type: 'SOLID', color: C.teal}];
    s38.appendChild(header38);
    txt(s38, "←", 15, 62, 24, C.white, "Bold");
    txt(s38, "Delivery Settings", 55, 69, 18, C.white, "Bold");
    txt(s38, "Merchant", 280, 72, 11, C.white, "Regular");
    
    txt(s38, "Delivery Types", 30, 124, 15, C.text, "Bold");
    
    // Toggle List
    const deliveryTypes = [
      {name: "Standard Delivery", desc: "Default delivery option", enabled: true},
      {name: "Express Delivery", desc: "Priority rider assignment", enabled: false},
      {name: "Contactless Delivery", desc: "Rider leaves at door", enabled: true},
      {name: "Curbside Pickup", desc: "Bring order to customer's car", enabled: true}
    ];
    
    let toggleY = 159;
    for (const type of deliveryTypes) {
      const typeCard = figma.createRectangle();
      typeCard.resize(315, 70);
      typeCard.x = 30;
      typeCard.y = toggleY;
      typeCard.cornerRadius = 12;
      typeCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s38.appendChild(typeCard);
      
      txt(s38, type.name, 45, toggleY + 18, 13, C.text, "Bold");
      txt(s38, type.desc, 45, toggleY + 38, 11, C.gray, "Regular");
      
      // Toggle Switch
      const toggleBg = figma.createRectangle();
      toggleBg.resize(50, 28);
      toggleBg.x = 280;
      toggleBg.y = toggleY + 21;
      toggleBg.cornerRadius = 14;
      toggleBg.fills = type.enabled ? [{type: 'SOLID', color: C.green}] : [{type: 'SOLID', color: C.gray}];
      s38.appendChild(toggleBg);
      
      const toggleKnob = figma.createEllipse();
      toggleKnob.resize(22, 22);
      toggleKnob.x = type.enabled ? 305 : 283;
      toggleKnob.y = toggleY + 24;
      toggleKnob.fills = [{type: 'SOLID', color: C.white}];
      s38.appendChild(toggleKnob);
      
      toggleY += 85;
    }
    
    // Pickup Settings
    txt(s38, "Pickup Settings", 30, 499, 15, C.text, "Bold");
    
    const pickupCard = figma.createRectangle();
    pickupCard.resize(315, 100);
    pickupCard.x = 30;
    pickupCard.y = 529;
    pickupCard.cornerRadius = 12;
    pickupCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s38.appendChild(pickupCard);
    
    txt(s38, "Allow Pickup Orders", 45, 544, 13, C.text, "Bold");
    
    const pickupToggle = figma.createRectangle();
    pickupToggle.resize(50, 28);
    pickupToggle.x = 280;
    pickupToggle.y = 541;
    pickupToggle.cornerRadius = 14;
    pickupToggle.fills = [{type: 'SOLID', color: C.green}];
    s38.appendChild(pickupToggle);
    
    const pickupKnob = figma.createEllipse();
    pickupKnob.resize(22, 22);
    pickupKnob.x = 305;
    pickupKnob.y = 544;
    pickupKnob.fills = [{type: 'SOLID', color: C.white}];
    s38.appendChild(pickupKnob);
    
    txt(s38, "Average prep time: 20-25 mins", 45, 578, 11, C.gray, "Regular");
    txt(s38, "Pickup instructions:", 45, 598, 11, C.gray, "Regular");
    txt(s38, "✏️ Edit", 290, 598, 11, C.teal, "Bold");
    
    // Advanced Rules
    txt(s38, "Advanced Rules", 30, 649, 15, C.text, "Bold");
    
    const rulesCard = figma.createRectangle();
    rulesCard.resize(315, 80);
    rulesCard.x = 30;
    rulesCard.y = 679;
    rulesCard.cornerRadius = 12;
    rulesCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s38.appendChild(rulesCard);
    
    txt(s38, "Disable Express when congestion high", 45, 694, 11, C.text, "Regular");
    
    const ruleToggle = figma.createRectangle();
    ruleToggle.resize(50, 28);
    ruleToggle.x = 280;
    ruleToggle.y = 706;
    ruleToggle.cornerRadius = 14;
    ruleToggle.fills = [{type: 'SOLID', color: C.green}];
    s38.appendChild(ruleToggle);
    
    const ruleKnob = figma.createEllipse();
    ruleKnob.resize(22, 22);
    ruleKnob.x = 305;
    ruleKnob.y = 709;
    ruleKnob.fills = [{type: 'SOLID', color: C.white}];
    s38.appendChild(ruleKnob);
    
    txt(s38, "Rules apply by time of day or busy hours", 45, 732, 10, C.gray, "Regular");
    
    // Save Button
    btn(s38, "SaveSettings-CLICK", 30, 770, 315, 50, C.teal, "Save Changes", 16);
    
    targetPage.appendChild(s38);
    screens.push(s38);
    x += W + G;
    
    // ====================
    // SCREEN 39: Pickup-Order-Details-&-Reschedule
    // ====================
    const s39 = figma.createFrame();
    s39.name = "145-Pickup-Order-Details-Reschedule";
    s39.resize(W, H);
    s39.x = x;
    s39.y = y;
    s39.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s39);
    
    const header39 = figma.createRectangle();
    header39.resize(W, 60);
    header39.x = 0;
    header39.y = 44;
    header39.fills = [{type: 'SOLID', color: C.teal}];
    s39.appendChild(header39);
    txt(s39, "←", 15, 62, 24, C.white, "Bold");
    txt(s39, "Pickup Order Details", 55, 69, 17, C.white, "Bold");
    
    // Order Header
    const orderHeader = figma.createRectangle();
    orderHeader.resize(315, 70);
    orderHeader.x = 30;
    orderHeader.y = 124;
    orderHeader.cornerRadius = 12;
    orderHeader.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.9}}];
    s39.appendChild(orderHeader);
    
    txt(s39, "Order #1234567", 45, 139, 15, C.text, "Bold");
    
    const pickupBadge = figma.createRectangle();
    pickupBadge.resize(110, 24);
    pickupBadge.x = 220;
    pickupBadge.y = 142;
    pickupBadge.cornerRadius = 12;
    pickupBadge.fills = [{type: 'SOLID', color: C.yellow}];
    s39.appendChild(pickupBadge);
    txt(s39, "Pickup Scheduled", 228, 147, 10, C.white, "Bold");
    
    txt(s39, "🍕 Pizza Palace", 45, 168, 13, C.text, "Regular");
    
    // Pickup Info Card
    const pickupInfo = figma.createRectangle();
    pickupInfo.resize(315, 160);
    pickupInfo.x = 30;
    pickupInfo.y = 214;
    pickupInfo.cornerRadius = 12;
    pickupInfo.fills = [{type: 'SOLID', color: C.lightBg}];
    s39.appendChild(pickupInfo);
    
    txt(s39, "Pickup Information", 45, 229, 14, C.text, "Bold");
    
    txt(s39, "Pickup Type:", 45, 254, 12, C.gray, "Regular");
    txt(s39, "Takeaway", 250, 254, 12, C.text, "Bold");
    
    txt(s39, "Scheduled Time:", 45, 276, 12, C.gray, "Regular");
    txt(s39, "Today at 7:30 PM", 210, 276, 12, C.teal, "Bold");
    
    txt(s39, "Prep Time:", 45, 298, 12, C.gray, "Regular");
    txt(s39, "20-25 mins", 240, 298, 12, C.text, "Regular");
    
    txt(s39, "Location:", 45, 320, 12, C.gray, "Regular");
    txt(s39, "Main Street Branch", 215, 320, 12, C.text, "Regular");
    
    txt(s39, "Instructions:", 45, 342, 12, C.gray, "Regular");
    txt(s39, "• Come to counter #3", 45, 357, 11, C.gray, "Regular");
    
    // Actions
    btn(s39, "ReschedulePickup-CLICK", 30, 394, 150, 50, C.teal, "Reschedule", 14);
    btn(s39, "CancelPickup-CLICK", 195, 394, 150, 50, C.red, "Cancel Pickup", 13);
    
    // Reschedule Bottom Sheet Preview
    txt(s39, "--- Reschedule Bottom Sheet ---", 90, 464, 11, C.gray, "Regular");
    
    const reschedSheet = figma.createRectangle();
    reschedSheet.resize(315, 280);
    reschedSheet.x = 30;
    reschedSheet.y = 489;
    reschedSheet.cornerRadius = 12;
    reschedSheet.fills = [{type: 'SOLID', color: C.white}];
    reschedSheet.strokes = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    reschedSheet.strokeWeight = 2;
    s39.appendChild(reschedSheet);
    
    txt(s39, "Reschedule Pickup", 45, 504, 15, C.text, "Bold");
    txt(s39, "You can reschedule up to 30 mins before", 45, 529, 10, C.gray, "Regular");
    txt(s39, "pickup time.", 45, 543, 10, C.gray, "Regular");
    
    txt(s39, "Select Date:", 45, 568, 12, C.text, "Bold");
    const dateBox39 = figma.createRectangle();
    dateBox39.resize(280, 40);
    dateBox39.x = 47;
    dateBox39.y = 588;
    dateBox39.cornerRadius = 10;
    dateBox39.fills = [{type: 'SOLID', color: C.lightBg}];
    s39.appendChild(dateBox39);
    txt(s39, "📅 Select Date", 62, 603, 13, C.gray, "Regular");
    
    txt(s39, "Select Time:", 45, 643, 12, C.text, "Bold");
    const timeBox39 = figma.createRectangle();
    timeBox39.resize(280, 40);
    timeBox39.x = 47;
    timeBox39.y = 663;
    timeBox39.cornerRadius = 10;
    timeBox39.fills = [{type: 'SOLID', color: C.lightBg}];
    s39.appendChild(timeBox39);
    txt(s39, "🕒 Select Time Slot", 62, 678, 13, C.gray, "Regular");
    
    btn(s39, "ConfirmNewTime-CLICK", 47, 718, 280, 40, C.teal, "Confirm New Time", 13);
    
    targetPage.appendChild(s39);
    screens.push(s39);
    x += W + G;
    
    // ====================
    // SCREEN 40: Order-Notes-&-Limits
    // ====================
    const s40 = figma.createFrame();
    s40.name = "146-Order-Notes-Limits";
    s40.resize(W, H);
    s40.x = x;
    s40.y = y;
    s40.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s40);
    
    const header40 = figma.createRectangle();
    header40.resize(W, 60);
    header40.x = 0;
    header40.y = 44;
    header40.fills = [{type: 'SOLID', color: C.teal}];
    s40.appendChild(header40);
    txt(s40, "←", 15, 62, 24, C.white, "Bold");
    txt(s40, "Checkout", 55, 69, 18, C.white, "Bold");
    
    txt(s40, "Notes for Restaurant & Rider", 30, 130, 16, C.text, "Bold");
    
    // Restaurant Notes Card
    txt(s40, "Add a note for the restaurant (optional):", 30, 165, 13, C.text, "Bold");
    
    const notesBox = figma.createRectangle();
    notesBox.resize(315, 100);
    notesBox.x = 30;
    notesBox.y = 190;
    notesBox.cornerRadius = 12;
    notesBox.fills = [{type: 'SOLID', color: C.lightBg}];
    notesBox.strokes = [{type: 'SOLID', color: C.teal}];
    notesBox.strokeWeight = 2;
    s40.appendChild(notesBox);
    
    txt(s40, "No onions, please. Doorbell not", 45, 212, 12, C.text, "Regular");
    txt(s40, "working, please call on arrival.", 45, 229, 12, C.text, "Regular");
    
    txt(s40, "45 / 200 characters", 225, 271, 11, C.gray, "Regular");
    
    // Validation Example - Over Limit
    const errorNote = figma.createRectangle();
    errorNote.resize(315, 50);
    errorNote.x = 30;
    errorNote.y = 310;
    errorNote.cornerRadius = 12;
    errorNote.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.95}}];
    s40.appendChild(errorNote);
    
    txt(s40, "⚠️ Note too long. Max 200 characters.", 45, 328, 11, C.red, "Regular");
    
    // Rider Instructions
    txt(s40, "Delivery instructions (optional):", 30, 385, 13, C.text, "Bold");
    
    const riderBox = figma.createRectangle();
    riderBox.resize(315, 80);
    riderBox.x = 30;
    riderBox.y = 410;
    riderBox.cornerRadius = 12;
    riderBox.fills = [{type: 'SOLID', color: C.lightBg}];
    riderBox.strokes = [{type: 'SOLID', color: C.gray}];
    riderBox.strokeWeight = 1;
    s40.appendChild(riderBox);
    
    txt(s40, "Call on arrival, gate code #1234...", 45, 442, 12, C.gray, "Regular");
    txt(s40, "0 / 150 characters", 230, 471, 11, C.gray, "Regular");
    
    // Order Summary Preview
    txt(s40, "Order Summary", 30, 515, 15, C.text, "Bold");
    
    const summaryBox = figma.createRectangle();
    summaryBox.resize(315, 120);
    summaryBox.x = 30;
    summaryBox.y = 545;
    summaryBox.cornerRadius = 12;
    summaryBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s40.appendChild(summaryBox);
    
    txt(s40, "🍕 Pizza Palace", 45, 560, 13, C.text, "Bold");
    txt(s40, "• Large Pizza x1 - Rs 650", 50, 583, 11, C.gray, "Regular");
    txt(s40, "• Garlic Bread x1 - Rs 240", 50, 600, 11, C.gray, "Regular");
    
    txt(s40, "Subtotal:", 45, 625, 11, C.gray, "Regular");
    txt(s40, "Rs 890", 280, 625, 11, C.text, "Bold");
    
    txt(s40, "Delivery:", 45, 643, 11, C.gray, "Regular");
    txt(s40, "Rs 50", 282, 643, 11, C.text, "Bold");
    
    // Checkout Button (Disabled Example)
    const checkoutDisabled = figma.createRectangle();
    checkoutDisabled.resize(315, 55);
    checkoutDisabled.x = 30;
    checkoutDisabled.y = 695;
    checkoutDisabled.cornerRadius = 28;
    checkoutDisabled.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s40.appendChild(checkoutDisabled);
    txt(s40, "Checkout (Fix note to continue)", 95, 713, 14, C.gray, "Regular");
    
    targetPage.appendChild(s40);
    screens.push(s40);
    x += W + G;
    
    // ====================
    // SCREEN 41: Photo-Enhancement-Preview
    // ====================
    const s41 = figma.createFrame();
    s41.name = "147-Photo-Enhancement-Preview";
    s41.resize(W, H);
    s41.x = x;
    s41.y = y;
    s41.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s41);
    
    const header41 = figma.createRectangle();
    header41.resize(W, 60);
    header41.x = 0;
    header41.y = 44;
    header41.fills = [{type: 'SOLID', color: C.teal}];
    s41.appendChild(header41);
    txt(s41, "←", 15, 62, 24, C.white, "Bold");
    txt(s41, "Photo Preview", 55, 69, 18, C.white, "Bold");
    
    // Photo Preview Area
    const photoPreview = figma.createRectangle();
    photoPreview.resize(315, 280);
    photoPreview.x = 30;
    photoPreview.y = 124;
    photoPreview.cornerRadius = 12;
    photoPreview.fills = [{type: 'SOLID', color: C.lightBg}];
    s41.appendChild(photoPreview);
    
    txt(s41, "🖼️", 170, 245, 48, C.gray, "Regular");
    txt(s41, "Photo Preview", 145, 310, 13, C.gray, "Regular");
    
    // Before/After Slider Indicator
    const sliderLine = figma.createRectangle();
    sliderLine.resize(4, 280);
    sliderLine.x = 185;
    sliderLine.y = 124;
    sliderLine.fills = [{type: 'SOLID', color: C.white}];
    s41.appendChild(sliderLine);
    
    txt(s41, "Original", 60, 380, 11, C.gray, "Regular");
    txt(s41, "Enhanced", 250, 380, 11, C.teal, "Bold");
    
    // Enhancement Toggle
    txt(s41, "Enhance photo:", 30, 424, 14, C.text, "Bold");
    
    const enhanceToggle = figma.createRectangle();
    enhanceToggle.resize(50, 28);
    enhanceToggle.x = 280;
    enhanceToggle.y = 420;
    enhanceToggle.cornerRadius = 14;
    enhanceToggle.fills = [{type: 'SOLID', color: C.green}];
    s41.appendChild(enhanceToggle);
    
    const enhanceKnob = figma.createEllipse();
    enhanceKnob.resize(22, 22);
    enhanceKnob.x = 305;
    enhanceKnob.y = 423;
    enhanceKnob.fills = [{type: 'SOLID', color: C.white}];
    s41.appendChild(enhanceKnob);
    
    txt(s41, "Brightness and sharpness improved.", 30, 465, 11, C.gray, "Regular");
    txt(s41, "Food color unchanged.", 30, 482, 11, C.gray, "Regular");
    
    // Backup Status Row
    const backupCard = figma.createRectangle();
    backupCard.resize(315, 60);
    backupCard.x = 30;
    backupCard.y = 512;
    backupCard.cornerRadius = 12;
    backupCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.98, b: 1}}];
    s41.appendChild(backupCard);
    
    txt(s41, "☁️", 45, 528, 20, C.teal, "Regular");
    txt(s41, "Photo backed up securely", 75, 527, 12, C.green, "Bold");
    txt(s41, "Stored with your review and can be", 75, 544, 10, C.gray, "Regular");
    txt(s41, "removed from Settings", 75, 557, 10, C.gray, "Regular");
    
    // Info Note
    const infoNote = figma.createRectangle();
    infoNote.resize(315, 80);
    infoNote.x = 30;
    infoNote.y = 592;
    infoNote.cornerRadius = 12;
    infoNote.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.95}}];
    s41.appendChild(infoNote);
    
    txt(s41, "ℹ️", 45, 610, 18, C.yellow, "Regular");
    txt(s41, "We may lightly enhance your photo", 70, 608, 11, C.text, "Regular");
    txt(s41, "(brightness, contrast) but will never alter", 70, 623, 11, C.text, "Regular");
    txt(s41, "the actual food content.", 70, 638, 11, C.text, "Regular");
    
    // Action Buttons
    btn(s41, "UseThisPhoto-CLICK", 30, 702, 150, 50, C.teal, "Use This Photo", 13);
    btn(s41, "PickAnother-CLICK", 195, 702, 150, 50, C.lightBg, "Pick Another", 13);
    
    targetPage.appendChild(s41);
    screens.push(s41);
    x += W + G;
    
    // ====================
    // SCREEN 42: Currency-&-Exchange-Settings
    // ====================
    const s42 = figma.createFrame();
    s42.name = "148-Currency-Exchange-Settings";
    s42.resize(W, H);
    s42.x = x;
    s42.y = y;
    s42.fills = [{type: 'SOLID', color: C.white}];
    
    notificationBar(s42);
    
    const header42 = figma.createRectangle();
    header42.resize(W, 60);
    header42.x = 0;
    header42.y = 44;
    header42.fills = [{type: 'SOLID', color: C.teal}];
    s42.appendChild(header42);
    txt(s42, "←", 15, 62, 24, C.white, "Bold");
    txt(s42, "Currency & Pricing", 55, 69, 18, C.white, "Bold");
    
    // Primary Currency Card
    txt(s42, "Base currency for your account:", 30, 130, 13, C.text, "Bold");
    
    const currencyBox = figma.createRectangle();
    currencyBox.resize(315, 50);
    currencyBox.x = 30;
    currencyBox.y = 155;
    currencyBox.cornerRadius = 12;
    currencyBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s42.appendChild(currencyBox);
    
    txt(s42, "PKR - Pakistani Rupee", 45, 173, 13, C.text, "Bold");
    txt(s42, "(Fixed)", 280, 173, 11, C.gray, "Regular");
    
    txt(s42, "All orders are charged in PKR. You can view", 30, 220, 11, C.gray, "Regular");
    txt(s42, "approximate prices in other currencies.", 30, 235, 11, C.gray, "Regular");
    
    // Secondary Display Currency
    txt(s42, "Show prices in:", 30, 270, 13, C.text, "Bold");
    
    const displayOptions = [
      {label: "PKR only", selected: false},
      {label: "PKR + USD (approx.)", selected: true},
      {label: "PKR + SAR (approx.)", selected: false}
    ];
    
    let displayY = 295;
    for (const opt of displayOptions) {
      const radio = figma.createEllipse();
      radio.resize(18, 18);
      radio.x = 40;
      radio.y = displayY;
      radio.fills = opt.selected ? [{type: 'SOLID', color: C.teal}] : [{type: 'SOLID', color: C.white}];
      radio.strokes = [{type: 'SOLID', color: C.teal}];
      radio.strokeWeight = 2;
      s42.appendChild(radio);
      
      txt(s42, opt.label, 70, displayY + 1, 13, C.text, "Regular");
      displayY += 35;
    }
    
    // Example
    const exampleBox = figma.createRectangle();
    exampleBox.resize(315, 50);
    exampleBox.x = 30;
    exampleBox.y = 420;
    exampleBox.cornerRadius = 12;
    exampleBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 1, b: 0.95}}];
    s42.appendChild(exampleBox);
    
    txt(s42, "Example:", 45, 435, 12, C.green, "Bold");
    txt(s42, "Large Pizza — Rs 650 (~$2.10)", 115, 435, 12, C.text, "Regular");
    
    // Exchange Rate Info
    txt(s42, "Latest exchange rate", 30, 495, 14, C.text, "Bold");
    
    const rateCard = figma.createRectangle();
    rateCard.resize(315, 100);
    rateCard.x = 30;
    rateCard.y = 525;
    rateCard.cornerRadius = 12;
    rateCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s42.appendChild(rateCard);
    
    txt(s42, "1 USD ≈ Rs 309.50", 45, 543, 14, C.text, "Bold");
    txt(s42, "Updated just now", 45, 566, 11, C.gray, "Regular");
    
    txt(s42, "Exchange rates are indicative only.", 45, 590, 11, C.gray, "Regular");
    txt(s42, "Final charges are always in PKR.", 45, 605, 11, C.gray, "Regular");
    
    txt(s42, "View recent exchange rate changes →", 30, 645, 11, C.teal, "Bold");
    
    // Footer Info
    const footerInfo = figma.createRectangle();
    footerInfo.resize(315, 70);
    footerInfo.x = 30;
    footerInfo.y = 675;
    footerInfo.cornerRadius = 12;
    footerInfo.fills = [{type: 'SOLID', color: {r: 1, g: 0.98, b: 0.95}}];
    s42.appendChild(footerInfo);
    
    txt(s42, "ℹ️", 45, 693, 18, C.yellow, "Regular");
    txt(s42, "Your bank or card provider may use a", 70, 691, 11, C.text, "Regular");
    txt(s42, "different rate and may charge additional fees.", 70, 706, 11, C.text, "Regular");
    
    targetPage.appendChild(s42);
    screens.push(s42);
    x += W + G;
    
    figma.notify('✅ ALL SCREENS COMPLETE! Total: 42 screens created successfully! 🎉');
    
    // Close plugin
    figma.closePlugin();
  }
};


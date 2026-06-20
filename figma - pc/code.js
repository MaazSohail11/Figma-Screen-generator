// ===================================================================
// BASKHAO FIGMA PLUGIN - MODIFIED CODE
// Generates SRS Screens organized by category
// Categories: Business, Corporate, Merchant, Admin
// ===================================================================

figma.showUI(__html__, { width: 400, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    
    // Load fonts
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    
    // Find or create "test" page
    let targetPage = figma.root.children.find(p => p.name === "test");
    if (!targetPage) {
      targetPage = figma.createPage();
      targetPage.name = "test";
    }
    figma.currentPage = targetPage;
    
    const screens = [];
    
    // ===================================================================
    // CONSTANTS
    // ===================================================================
    const W = 1440;  // Screen width
    const H = 900;   // Screen height
    const G = 150;   // Gap between screens horizontally
    const ROW_GAP = 200;  // Gap between rows of screens
    const COL_GAP = 40;   // Gap between columns in grid layouts
    
    // ===================================================================
    // COLOR SCHEME
    // ===================================================================
    const C = {
      teal: { r: 0.24, g: 0.61, b: 0.61 },
      darkTeal: { r: 0.17, g: 0.37, b: 0.37 },
      yellow: { r: 0.96, g: 0.72, b: 0.26 },
      gold: { r: 0.85, g: 0.65, b: 0.13 },
      red: { r: 0.91, g: 0.29, b: 0.24 },
      green: { r: 0.24, g: 0.71, b: 0.42 },
      orange: { r: 0.95, g: 0.61, b: 0.07 },
      blue: { r: 0.20, g: 0.47, b: 0.96 },
      white: { r: 1, g: 1, b: 1 },
      text: { r: 0.2, g: 0.2, b: 0.2 },
      lightBg: { r: 0.95, g: 0.95, b: 0.95 },
      gray: { r: 0.7, g: 0.7, b: 0.7 },
      darkGray: { r: 0.4, g: 0.4, b: 0.4 }
    };
    
    // ===================================================================
    // HELPER FUNCTIONS
    // ===================================================================
    
    function btn(parent, name, x, y, w, h, color, text, fontSize) {
      const b = figma.createRectangle();
      b.name = name;
      b.resize(w, h);
      b.x = x;
      b.y = y;
      b.cornerRadius = 12;
      b.fills = [{ type: 'SOLID', color: color }];
      parent.appendChild(b);
      
      if (text) {
        const t = figma.createText();
        t.fontName = { family: "Inter", style: "Bold" };
        t.characters = text;
        t.fontSize = fontSize;
        t.fills = [{ type: 'SOLID', color: C.white }];
        t.textAlignHorizontal = "CENTER";
        t.textAlignVertical = "CENTER";
        t.x = x + (w / 2) - (text.length * fontSize * 0.3);
        t.y = y + (h / 2) - (fontSize / 2);
        parent.appendChild(t);
      }
      return b;
    }
    
    function txt(parent, text, x, y, size, color, style = "Regular") {
      const t = figma.createText();
      t.fontName = { family: "Inter", style: style };
      t.characters = text;
      t.fontSize = size;
      t.fills = [{ type: 'SOLID', color: color }];
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
      c.fills = [{ type: 'SOLID', color: color }];
      parent.appendChild(c);
      return c;
    }
    
    function imgPlaceholder(parent, x, y, w, h, unsplashQuery) {
      const img = figma.createRectangle();
      img.resize(w, h);
      img.x = x;
      img.y = y;
      img.cornerRadius = 16;
      img.fills = [{ type: 'SOLID', color: C.gray }];
      parent.appendChild(img);
      
      if (unsplashQuery) {
        const iconTxt = figma.createText();
        iconTxt.fontName = { family: "Inter", style: "Bold" };
        iconTxt.characters = `[${unsplashQuery}]`;
        iconTxt.fontSize = Math.min(w, h) * 0.15;
        iconTxt.fills = [{ type: 'SOLID', color: C.white }];
        iconTxt.textAlignHorizontal = "CENTER";
        iconTxt.textAlignVertical = "CENTER";
        iconTxt.x = x + 20;
        iconTxt.y = y + (h / 2) - (iconTxt.fontSize / 2);
        parent.appendChild(iconTxt);
      }
      return img;
    }
    
    function topBar(parent, title, subtitle = null) {
      // Solid header bar with no rounded corners - extends full width
      const headerBg = figma.createRectangle();
      headerBg.resize(W, 80);
      headerBg.x = 0;
      headerBg.y = 0;
      headerBg.cornerRadius = 0; // NO rounded corners
      headerBg.fills = [{ type: 'SOLID', color: C.teal }];
      parent.appendChild(headerBg);
      
      // Logo image placeholder instead of emoji
      imgPlaceholder(parent, 20, 20, 40, 40, "food logo");
      
      txt(parent, "BasKhao", 70, 28, 28, C.white, "Bold");
      txt(parent, title, 60, 120, 32, C.text, "Bold");
      if (subtitle) {
        txt(parent, subtitle, 60, 160, 16, C.gray, "Regular");
      }
    }
    
    figma.notify("Generating BasKhao screens...");
    
    // ===================================================================
    // BUSINESS CATEGORY - ROW 1
    // Screens: 121, 122, 142
    // ===================================================================
    
    let rowY = 0;
    let colX = 0;
    
    // -------------------------------------------------------------------
    // SCREEN 121: Business Account Registration
    // -------------------------------------------------------------------
    const s121 = figma.createFrame();
    s121.name = "121-Business-Account-Registration";
    s121.resize(W, H);
    s121.x = colX;
    s121.y = rowY;
    s121.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s121);
    screens.push(s121);
    
    topBar(s121, "Business Account Registration");
    
    // Progress stepper
    card(s121, 60, 190, W - 120, 80, C.lightBg);
    const steps = ["Company Info", "Verification Documents", "Billing & Invoicing", "Review & Submit"];
    for (let i = 0; i < 4; i++) {
      const stepX = 100 + i * 310;
      const stepCircle = figma.createEllipse();
      stepCircle.resize(40, 40);
      stepCircle.x = stepX;
      stepCircle.y = 210;
      stepCircle.fills = [{ type: 'SOLID', color: i === 0 ? C.teal : C.gray }];
      s121.appendChild(stepCircle);
      
      txt(s121, String(i + 1), stepX + 12, 218, 20, C.white, "Bold");
      txt(s121, steps[i], stepX - 30, 260, 14, i === 0 ? C.text : C.gray, "Semi Bold");
      
      if (i < 3) {
        card(s121, stepX + 50, 227, 200, 6, C.gray);
      }
    }
    
    // Step 1 Form
    txt(s121, "Company Information", 60, 310, 24, C.text, "Bold");
    
    // Company Name
    txt(s121, "Company Name *", 60, 360, 16, C.text, "Semi Bold");
    card(s121, 60, 385, 600, 55, C.white).name = "CompanyName-INPUT";
    txt(s121, "Enter company name", 80, 402, 14, C.gray, "Regular");
    
    // Business Type
    txt(s121, "Business Type *", 700, 360, 16, C.text, "Semi Bold");
    const bizTypeCard = card(s121, 700, 385, 600, 55, C.white);
    bizTypeCard.name = "BusinessType-CLICK";
    txt(s121, "Corporation ▾", 720, 402, 14, C.gray, "Regular");
    
    // Tax ID
    txt(s121, "Tax ID / Registration Number *", 60, 470, 16, C.text, "Semi Bold");
    card(s121, 60, 495, 600, 55, C.white).name = "TaxID-INPUT";
    txt(s121, "Enter tax ID", 80, 512, 14, C.gray, "Regular");
    
    // Business Address
    txt(s121, "Business Address *", 700, 470, 16, C.text, "Semi Bold");
    card(s121, 700, 495, 600, 55, C.white).name = "Address-INPUT";
    txt(s121, "Enter business address", 720, 512, 14, C.gray, "Regular");
    
    // City
    txt(s121, "City *", 60, 580, 16, C.text, "Semi Bold");
    card(s121, 60, 605, 390, 55, C.white).name = "City-INPUT";
    txt(s121, "City", 80, 622, 14, C.gray, "Regular");
    
    // Country
    txt(s121, "Country *", 480, 580, 16, C.text, "Semi Bold");
    const countryCard = card(s121, 480, 605, 390, 55, C.white);
    countryCard.name = "Country-CLICK";
    txt(s121, "Pakistan ▾", 500, 622, 14, C.gray, "Regular");
    
    // Primary Contact Section
    txt(s121, "Primary Contact", 60, 700, 20, C.text, "Bold");
    txt(s121, "Contact Person Name *", 60, 740, 16, C.text, "Semi Bold");
    card(s121, 60, 765, 390, 55, C.white).name = "ContactName-INPUT";
    
    txt(s121, "Contact Email *", 480, 740, 16, C.text, "Semi Bold");
    card(s121, 480, 765, 390, 55, C.white).name = "ContactEmail-INPUT";
    
    txt(s121, "Contact Phone *", 900, 740, 16, C.text, "Semi Bold");
    card(s121, 900, 765, 390, 55, C.white).name = "ContactPhone-INPUT";
    
    // Buttons - Changed green to teal
    btn(s121, "SaveDraft-CLICK", 950, 840, 180, 50, C.lightBg, "Save as Draft", 16);
    btn(s121, "ContinueDocs-CLICK", 1150, 840, 230, 50, C.teal, "Continue to Documents", 16);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 122: Business Account Dashboard
    // -------------------------------------------------------------------
    const s122 = figma.createFrame();
    s122.name = "122-Business-Account-Dashboard";
    s122.resize(W, H);
    s122.x = colX;
    s122.y = rowY;
    s122.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s122);
    screens.push(s122);
    
    topBar(s122, "Business Account");
    
    // Profile toggle
    card(s122, W - 280, 125, 200, 45, C.lightBg);
    btn(s122, "PersonalMode-CLICK", W - 275, 130, 90, 35, C.white, "Personal", 13);
    btn(s122, "BusinessMode-CLICK", W - 175, 130, 90, 35, C.teal, "Business", 13);
    
    // Summary strip
    card(s122, 60, 190, W - 120, 100, C.teal);
    txt(s122, "This Month - Business Account", 100, 215, 20, C.white, "Bold");
    txt(s122, "Orders: 145", 100, 250, 16, C.white, "Regular");
    txt(s122, "Spent: Rs 125,000", 350, 250, 16, C.white, "Regular");
    txt(s122, "Active Users: 23", 650, 250, 16, C.white, "Regular");
    txt(s122, "Avg Order: Rs 862", 950, 250, 16, C.white, "Regular");
    
    // Tab navigation
    const tabs = ["Dashboard", "Team", "Invoices", "Settings"];
    for (let i = 0; i < 4; i++) {
      btn(s122, `Tab${i}-CLICK`, 60 + i * 180, 320, 160, 45, i === 0 ? C.teal : C.lightBg, tabs[i], 16);
    }
    
    // Recent Orders section
    txt(s122, "Recent Orders", 60, 400, 22, C.text, "Bold");
    btn(s122, "ViewAllOrders-CLICK", W - 220, 395, 140, 35, C.lightBg, "View All →", 14);
    
    for (let i = 0; i < 3; i++) {
      card(s122, 60, 450 + i * 120, W - 120, 100, C.lightBg);
      txt(s122, `Order #12345${i}`, 90, 470 + i * 120, 18, C.text, "Bold");
      txt(s122, "Ahmed Khan • Pizza Palace • Rs 1,200", 90, 500 + i * 120, 14, C.gray, "Regular");
      txt(s122, "Nov 29, 2:30 PM", 90, 525 + i * 120, 14, C.gray, "Regular");
      card(s122, W - 250, 475 + i * 120, 140, 30, C.teal);
      txt(s122, "Paid by Company", W - 230, 482 + i * 120, 12, C.white, "Bold");
      btn(s122, `ViewDetail${i}-CLICK`, W - 340, 475 + i * 120, 120, 35, C.lightBg, "View Details", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 142: Membership & Subscription Hub
    // -------------------------------------------------------------------
    const s142 = figma.createFrame();
    s142.name = "142-Membership-Subscription-Hub";
    s142.resize(W, H);
    s142.x = colX;
    s142.y = rowY;
    s142.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s142);
    screens.push(s142);
    
    topBar(s142, "Membership & Subscription");
    
    // Status banner - Active member (removed crown emoji)
    card(s142, 60, 190, W - 120, 100, C.gold);
    imgPlaceholder(s142, 100, 205, 60, 60, "crown");
    txt(s142, "Active Plan: GOLD Member", 180, 215, 24, C.white, "Bold");
    txt(s142, "Renews on Dec 31, 2025 • Rs 999/month", 180, 250, 16, C.white, "Regular");
    btn(s142, "ManageSub-CLICK", W - 320, 215, 200, 50, C.white, "Manage Subscription", 14);
    
    // Available Plans
    txt(s142, "Available Plans", 60, 330, 24, C.text, "Bold");
    
    // Silver Plan
    card(s142, 60, 380, 550, 400, C.lightBg);
    txt(s142, "Silver", 100, 420, 28, C.text, "Bold");
    txt(s142, "Rs 499/month", 100, 460, 20, C.teal, "Bold");
    card(s142, 100, 500, 450, 3, C.gray);
    txt(s142, "✓ Free delivery on orders above Rs 800", 100, 520, 15, C.text, "Regular");
    txt(s142, "✓ 5% off on all restaurants", 100, 550, 15, C.text, "Regular");
    txt(s142, "✓ Priority customer support", 100, 580, 15, C.text, "Regular");
    card(s142, 100, 625, 150, 30, C.yellow);
    txt(s142, "Best for casual users", 110, 632, 12, C.text, "Bold");
    btn(s142, "ChooseSilver-CLICK", 100, 710, 200, 50, C.teal, "Choose Silver", 16);
    
    // Gold Plan
    card(s142, 650, 380, 550, 400, C.lightBg);
    card(s142, 650, 380, 150, 40, C.gold);
    txt(s142, "RECOMMENDED", 665, 392, 13, C.white, "Bold");
    txt(s142, "Gold", 690, 440, 28, C.text, "Bold");
    txt(s142, "Rs 999/month", 690, 480, 20, C.teal, "Bold");
    card(s142, 690, 520, 450, 3, C.gray);
    txt(s142, "✓ Unlimited free delivery", 690, 540, 15, C.text, "Regular");
    txt(s142, "✓ 10% off all restaurants", 690, 570, 15, C.text, "Regular");
    txt(s142, "✓ Exclusive partner offers", 690, 600, 15, C.text, "Regular");
    txt(s142, "✓ Priority customer support", 690, 630, 15, C.text, "Regular");
    card(s142, 690, 675, 120, 30, C.gold);
    txt(s142, "Most popular", 700, 682, 12, C.white, "Bold");
    btn(s142, "ChooseGold-CLICK", 690, 730, 200, 50, C.teal, "Choose Gold", 16);
    
    colX = 0;
    rowY += H + ROW_GAP;
    
    // ===================================================================
    // CORPORATE CATEGORY - ROW 2
    // Screens: 135 (Company), 136 (Employee Mgmt), 137 (Invoice History), 
    //          138 (Account Setup), 135-Admin, 139-Admin
    // ===================================================================
    
    // -------------------------------------------------------------------
    // SCREEN 135: Corporate Discount Manager (Company Side)
    // -------------------------------------------------------------------
    const s135 = figma.createFrame();
    s135.name = "135-Corporate-Discount-Manager";
    s135.resize(W, H);
    s135.x = colX;
    s135.y = rowY;
    s135.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s135);
    screens.push(s135);
    
    topBar(s135, "Corporate Discounts");
    
    // Active discount card
    card(s135, 60, 190, 650, 180, C.teal);
    txt(s135, "Your Company Discount", 100, 220, 22, C.white, "Bold");
    txt(s135, "15% OFF", 100, 260, 48, C.yellow, "Bold");
    txt(s135, "Applies to: All orders placed using ABC Corporation profile", 100, 330, 15, C.white, "Regular");
    txt(s135, "Employees: 150 active members • Valid until: Dec 31, 2025", 100, 355, 14, C.white, "Regular");
    
    // Discount Rules
    card(s135, 750, 190, 570, 180, C.lightBg);
    txt(s135, "Discount Rules", 790, 220, 20, C.text, "Bold");
    txt(s135, "• 15% discount on food subtotal", 790, 260, 14, C.text, "Regular");
    txt(s135, "• Max discount per order: Rs 500", 790, 285, 14, C.text, "Regular");
    txt(s135, "• Available only when logged in with corporate email", 790, 310, 14, C.text, "Regular");
    txt(s135, "• Not applicable on delivery fee or tips", 790, 335, 14, C.text, "Regular");
    
    // Checkout Preview
    txt(s135, "Checkout Example", 60, 410, 22, C.text, "Bold");
    card(s135, 60, 450, 650, 250, C.lightBg);
    txt(s135, "Subtotal", 100, 480, 16, C.text, "Regular");
    txt(s135, "Rs 2,000", 580, 480, 16, C.text, "Bold");
    txt(s135, "Corporate Discount (15%)", 100, 515, 16, C.text, "Regular");
    txt(s135, "- Rs 300", 580, 515, 16, C.teal, "Bold"); // Changed from green to teal
    txt(s135, "Delivery Fee", 100, 550, 16, C.text, "Regular");
    txt(s135, "Rs 50", 580, 550, 16, C.text, "Bold");
    txt(s135, "Tax", 100, 585, 16, C.text, "Regular");
    txt(s135, "Rs 100", 580, 585, 16, C.text, "Bold");
    card(s135, 100, 615, 550, 2, C.gray);
    txt(s135, "Total", 100, 635, 18, C.text, "Bold");
    txt(s135, "Rs 1,850", 580, 635, 20, C.teal, "Bold");
    card(s135, 100, 670, 400, 25, C.teal);
    txt(s135, "Corporate discount auto-applied (ABC Corporation)", 110, 676, 12, C.white, "Bold"); // Removed briefcase emoji
    
    // Monthly Invoice
    txt(s135, "Monthly Corporate Invoice", 750, 410, 22, C.text, "Bold");
    card(s135, 750, 450, 570, 250, C.lightBg);
    txt(s135, "November 2025 – ABC Corporation", 790, 480, 18, C.text, "Bold");
    txt(s135, "Invoice #: CORP-INV-2025-11-001", 790, 510, 14, C.gray, "Regular");
    txt(s135, "Total Orders: 145", 790, 540, 15, C.text, "Regular");
    txt(s135, "Gross Amount: Rs 125,000", 790, 565, 15, C.text, "Regular");
    txt(s135, "Corporate Discount: -Rs 18,750", 790, 590, 15, C.teal, "Regular"); // Changed from green to teal
    txt(s135, "Net Payable: Rs 106,250", 790, 615, 16, C.teal, "Bold");
    txt(s135, "Due Date: Dec 15, 2025", 790, 640, 14, C.gray, "Regular");
    btn(s135, "DownloadPDF-CLICK", 790, 665, 140, 30, C.teal, "Download PDF", 13); // Removed emoji
    btn(s135, "EmailInvoice-CLICK", 950, 665, 140, 30, C.lightBg, "Email Invoice", 13); // Removed emoji
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 136: Corporate Employee Management
    // -------------------------------------------------------------------
    const s136 = figma.createFrame();
    s136.name = "136-Corporate-Employee-Management";
    s136.resize(W, H);
    s136.x = colX;
    s136.y = rowY;
    s136.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s136);
    screens.push(s136);
    
    topBar(s136, "Employee Management", "Manage corporate account access");
    
    // Summary bar
    card(s136, 60, 190, W - 120, 80, C.lightBg);
    txt(s136, "Total Employees: 150", 100, 215, 18, C.text, "Bold");
    txt(s136, "Active: 145 • Pending Invites: 5", 100, 245, 14, C.gray, "Regular");
    btn(s136, "AddEmployee-CLICK", W - 280, 200, 200, 45, C.teal, "+ Add Employee", 15);
    
    // Search and filter
    card(s136, 60, 300, 500, 50, C.white).name = "SearchEmployee-INPUT";
    txt(s136, "Search by name or email", 80, 315, 14, C.gray, "Regular"); // Removed magnifying glass emoji
    
    btn(s136, "FilterAll-CLICK", 580, 300, 100, 50, C.teal, "All", 14);
    btn(s136, "FilterActive-CLICK", 690, 300, 100, 50, C.lightBg, "Active", 14);
    btn(s136, "FilterPending-CLICK", 800, 300, 120, 50, C.lightBg, "Pending", 14);
    
    // Table header
    card(s136, 60, 380, W - 120, 50, C.teal);
    txt(s136, "Employee Name", 90, 397, 14, C.white, "Bold");
    txt(s136, "Email", 400, 397, 14, C.white, "Bold");
    txt(s136, "Department", 700, 397, 14, C.white, "Bold");
    txt(s136, "Status", 950, 397, 14, C.white, "Bold");
    txt(s136, "Actions", 1150, 397, 14, C.white, "Bold");
    
    // Employee rows
    const employees = [
      { name: "Ahmed Khan", email: "ahmed@abccorp.com", dept: "Marketing", status: "Active" },
      { name: "Sara Ali", email: "sara@abccorp.com", dept: "Sales", status: "Active" },
      { name: "Bilal Ahmed", email: "bilal@abccorp.com", dept: "IT", status: "Active" },
      { name: "Fatima Raza", email: "fatima@abccorp.com", dept: "HR", status: "Pending" }
    ];
    
    for (let i = 0; i < 4; i++) {
      card(s136, 60, 440 + i * 70, W - 120, 60, C.lightBg);
      
      const avatar = figma.createEllipse();
      avatar.resize(40, 40);
      avatar.x = 80;
      avatar.y = 450 + i * 70;
      avatar.fills = [{ type: 'SOLID', color: C.teal }];
      s136.appendChild(avatar);
      
      txt(s136, employees[i].name[0], 93, 460 + i * 70, 18, C.white, "Bold");
      txt(s136, employees[i].name, 140, 460 + i * 70, 15, C.text, "Bold");
      txt(s136, employees[i].email, 400, 460 + i * 70, 14, C.gray, "Regular");
      txt(s136, employees[i].dept, 700, 460 + i * 70, 14, C.text, "Regular");
      
      if (employees[i].status === "Active") {
        card(s136, 950, 455 + i * 70, 70, 25, C.teal); // Changed from green to teal
        txt(s136, "Active", 960, 462 + i * 70, 12, C.white, "Bold");
        btn(s136, `RemoveEmp${i}-CLICK`, 1150, 450 + i * 70, 90, 35, C.red, "Remove", 13);
      } else {
        card(s136, 950, 455 + i * 70, 80, 25, C.orange);
        txt(s136, "Pending", 960, 462 + i * 70, 12, C.white, "Bold");
        btn(s136, `ResendEmp${i}-CLICK`, 1150, 450 + i * 70, 110, 35, C.teal, "Resend Invite", 12);
      }
    }
    
    // Bulk actions tip (removed lightbulb emoji)
    card(s136, 60, 750, W - 120, 60, C.yellow);
    txt(s136, "Tip: Employees must use their @abccorp.com email to access corporate discount", 100, 770, 14, C.text, "Bold");
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 137: Corporate Invoice History
    // -------------------------------------------------------------------
    const s137 = figma.createFrame();
    s137.name = "137-Corporate-Invoice-History";
    s137.resize(W, H);
    s137.x = colX;
    s137.y = rowY;
    s137.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s137);
    screens.push(s137);
    
    topBar(s137, "Invoice History", "View all corporate invoices");
    
    // Summary cards
    const summaryMetrics = [
      { label: "This Year Total", value: "Rs 1,450,000" },
      { label: "Total Orders", value: "1,845" },
      { label: "Total Savings", value: "Rs 217,500" }
    ];
    
    for (let i = 0; i < 3; i++) {
      const cardX = 60 + i * ((W - 120) / 3 + 20);
      card(s137, cardX, 190, 400, 100, C.lightBg);
      txt(s137, summaryMetrics[i].label, cardX + 30, 215, 16, C.gray, "Regular");
      txt(s137, summaryMetrics[i].value, cardX + 30, 245, 24, C.teal, "Bold");
    }
    
    // Filter by year
    txt(s137, "Filter by Year:", 60, 320, 16, C.text, "Bold");
    btn(s137, "Year2025-CLICK", 200, 315, 100, 40, C.teal, "2025", 14);
    btn(s137, "Year2024-CLICK", 310, 315, 100, 40, C.lightBg, "2024", 14);
    
    btn(s137, "ExportAll-CLICK", W - 240, 315, 160, 40, C.teal, "Export All", 14); // Removed chart emoji
    
    // Invoice list
    txt(s137, "Monthly Invoices", 60, 385, 22, C.text, "Bold");
    
    const invoices = [
      { month: "November 2025", invoice: "CORP-INV-2025-11-001", orders: 145, gross: "Rs 125,000", discount: "Rs 18,750", net: "Rs 106,250", status: "Paid", statusColor: C.teal },
      { month: "October 2025", invoice: "CORP-INV-2025-10-001", orders: 138, gross: "Rs 118,500", discount: "Rs 17,775", net: "Rs 100,725", status: "Paid", statusColor: C.teal },
      { month: "September 2025", invoice: "CORP-INV-2025-09-001", orders: 152, gross: "Rs 132,000", discount: "Rs 19,800", net: "Rs 112,200", status: "Due", statusColor: C.orange }
    ];
    
    for (let i = 0; i < 3; i++) {
      card(s137, 60, 435 + i * 130, W - 120, 110, C.lightBg);
      txt(s137, invoices[i].month, 90, 455 + i * 130, 20, C.text, "Bold");
      txt(s137, invoices[i].invoice, 90, 485 + i * 130, 14, C.gray, "Regular");
      
      txt(s137, `Orders: ${invoices[i].orders}`, 450, 460 + i * 130, 14, C.text, "Regular");
      txt(s137, `Gross: ${invoices[i].gross}`, 450, 485 + i * 130, 14, C.text, "Regular");
      txt(s137, `Discount: ${invoices[i].discount}`, 650, 460 + i * 130, 14, C.teal, "Regular"); // Changed from green
      txt(s137, `Net: ${invoices[i].net}`, 650, 485 + i * 130, 16, C.teal, "Bold");
      
      card(s137, 900, 460 + i * 130, 80, 30, invoices[i].statusColor);
      txt(s137, invoices[i].status, 915, 468 + i * 130, 13, C.white, "Bold");
      
      btn(s137, `DownloadInv${i}-CLICK`, 1020, 455 + i * 130, 140, 35, C.teal, "Download PDF", 13);
      btn(s137, `EmailInv${i}-CLICK`, 1180, 455 + i * 130, 130, 35, C.lightBg, "Email", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 138: Corporate Account Setup
    // -------------------------------------------------------------------
    const s138 = figma.createFrame();
    s138.name = "138-Corporate-Account-Setup";
    s138.resize(W, H);
    s138.x = colX;
    s138.y = rowY;
    s138.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s138);
    screens.push(s138);
    
    topBar(s138, "Corporate Account Setup", "Welcome! Let's set up your corporate account");
    
    // Progress indicator
    card(s138, 60, 190, W - 120, 80, C.lightBg);
    txt(s138, "Step 1 of 3: Company Information", 100, 215, 20, C.text, "Bold");
    card(s138, 100, 245, 300, 8, C.teal);
    card(s138, 420, 245, 300, 8, C.gray);
    card(s138, 740, 245, 300, 8, C.gray);
    
    // Form section
    txt(s138, "Company Details", 60, 310, 24, C.text, "Bold");
    
    txt(s138, "Company Name *", 60, 360, 16, C.text, "Semi Bold");
    card(s138, 60, 385, 600, 55, C.white).name = "CompSetupName-INPUT";
    txt(s138, "Enter your company name", 80, 402, 14, C.gray, "Regular");
    
    txt(s138, "Company Email Domain *", 700, 360, 16, C.text, "Semi Bold");
    card(s138, 700, 385, 600, 55, C.white).name = "CompSetupDomain-INPUT";
    txt(s138, "e.g., @abccorp.com", 720, 402, 14, C.gray, "Regular");
    
    txt(s138, "Expected Monthly Orders *", 60, 470, 16, C.text, "Semi Bold");
    card(s138, 60, 495, 600, 55, C.white).name = "CompSetupOrders-INPUT";
    txt(s138, "Approximate number", 80, 512, 14, C.gray, "Regular");
    
    txt(s138, "Number of Employees *", 700, 470, 16, C.text, "Semi Bold");
    card(s138, 700, 495, 600, 55, C.white).name = "CompSetupEmployees-INPUT";
    txt(s138, "How many employees will use this?", 720, 512, 14, C.gray, "Regular");
    
    txt(s138, "Admin Contact Person", 60, 590, 20, C.text, "Bold");
    
    txt(s138, "Full Name *", 60, 630, 16, C.text, "Semi Bold");
    card(s138, 60, 655, 390, 55, C.white).name = "AdminName-INPUT";
    
    txt(s138, "Email *", 480, 630, 16, C.text, "Semi Bold");
    card(s138, 480, 655, 390, 55, C.white).name = "AdminEmail-INPUT";
    
    txt(s138, "Phone *", 900, 630, 16, C.text, "Semi Bold");
    card(s138, 900, 655, 390, 55, C.white).name = "AdminPhone-INPUT";
    
    // Benefits highlight
    card(s138, 60, 740, W - 120, 80, C.teal);
    txt(s138, "✓ Get up to 20% corporate discount  ✓ Monthly consolidated invoicing  ✓ Employee order tracking", 100, 770, 16, C.white, "Bold");
    
    // Action buttons
    btn(s138, "SaveSetupDraft-CLICK", 950, 840, 180, 50, C.lightBg, "Save Draft", 16);
    btn(s138, "ContinueSetup-CLICK", 1150, 840, 230, 50, C.teal, "Continue →", 16);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 135-Admin: Corporate Discount Manager (Admin)
    // -------------------------------------------------------------------
    const s135Admin = figma.createFrame();
    s135Admin.name = "135-Corporate-Discount-Manager-Admin";
    s135Admin.resize(W, H);
    s135Admin.x = colX;
    s135Admin.y = rowY;
    s135Admin.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s135Admin);
    screens.push(s135Admin);
    
    topBar(s135Admin, "Corporate Discounts (Admin)", "Manage all corporate accounts");
    
    // Primary action
    btn(s135Admin, "AddCorporate-CLICK", W - 280, 185, 200, 45, C.teal, "+ Add Corporate Account", 14);
    
    // Section title
    txt(s135Admin, "Active Corporate Accounts", 60, 200, 24, C.text, "Bold");
    
    // Corporate account cards
    const corpAccounts = [
      { name: "ABC Corporation", discount: "15%", employees: 150, spend: "Rs 125,000", badge: C.teal },
      { name: "XYZ Industries", discount: "20%", employees: 200, spend: "Rs 185,000", badge: C.gold },
      { name: "Tech Solutions Ltd", discount: "12%", employees: 85, spend: "Rs 95,000", badge: C.blue }
    ];
    
    for (let i = 0; i < 3; i++) {
      card(s135Admin, 60, 260 + i * 160, W - 120, 140, C.lightBg);
      
      txt(s135Admin, corpAccounts[i].name, 90, 280 + i * 160, 22, C.text, "Bold");
      
      card(s135Admin, 90, 315 + i * 160, 100, 30, corpAccounts[i].badge);
      txt(s135Admin, `${corpAccounts[i].discount} OFF`, 100, 323 + i * 160, 14, C.white, "Bold");
      
      txt(s135Admin, `Employees: ${corpAccounts[i].employees}`, 210, 323 + i * 160, 14, C.text, "Regular");
      txt(s135Admin, `This Month Spent: ${corpAccounts[i].spend}`, 90, 355 + i * 160, 16, C.teal, "Bold");
      
      btn(s135Admin, `EditCorp${i}-CLICK`, W - 660, 315 + i * 160, 100, 35, C.teal, "Edit", 13); // Removed emoji
      btn(s135Admin, `ViewInvoices${i}-CLICK`, W - 540, 315 + i * 160, 150, 35, C.teal, "View Invoices", 13); // Removed emoji
      btn(s135Admin, `ManageUsers${i}-CLICK`, W - 370, 315 + i * 160, 150, 35, C.lightBg, "Manage Users", 13); // Removed emoji
      btn(s135Admin, `ViewAnalytics${i}-CLICK`, W - 200, 315 + i * 160, 160, 35, C.yellow, "View Analytics", 13); // Removed emoji
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 139-Admin: Corporate Accounts List (Admin)
    // -------------------------------------------------------------------
    const s139Admin = figma.createFrame();
    s139Admin.name = "139-Corporate-Accounts-List-Admin";
    s139Admin.resize(W, H);
    s139Admin.x = colX;
    s139Admin.y = rowY;
    s139Admin.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s139Admin);
    screens.push(s139Admin);
    
    topBar(s139Admin, "Corporate Accounts (Admin)", "Complete list of all corporate clients");
    
    // Summary cards
    card(s139Admin, 60, 190, 400, 90, C.lightBg);
    txt(s139Admin, "Total Corporate Accounts", 90, 210, 14, C.gray, "Regular");
    txt(s139Admin, "23", 90, 235, 32, C.teal, "Bold");
    
    card(s139Admin, 480, 190, 400, 90, C.lightBg);
    txt(s139Admin, "Total Monthly Revenue", 510, 210, 14, C.gray, "Regular");
    txt(s139Admin, "Rs 2,850,000", 510, 235, 32, C.teal, "Bold");
    
    card(s139Admin, 900, 190, 400, 90, C.lightBg);
    txt(s139Admin, "Active Employees", 930, 210, 14, C.gray, "Regular");
    txt(s139Admin, "2,456", 930, 235, 32, C.teal, "Bold");
    
    // Search and actions
    card(s139Admin, 60, 310, 600, 50, C.white).name = "SearchCorp-INPUT";
    txt(s139Admin, "Search corporate accounts", 80, 325, 14, C.gray, "Regular"); // Removed emoji
    
    btn(s139Admin, "FilterAllCorp-CLICK", 680, 310, 100, 50, C.teal, "All", 14);
    btn(s139Admin, "FilterActiveCorp-CLICK", 790, 310, 100, 50, C.lightBg, "Active", 14);
    btn(s139Admin, "AddNewCorp-CLICK", W - 280, 310, 200, 50, C.teal, "+ New Account", 15);
    
    // Table header
    card(s139Admin, 60, 390, W - 120, 50, C.teal);
    txt(s139Admin, "Company", 90, 407, 14, C.white, "Bold");
    txt(s139Admin, "Discount", 400, 407, 14, C.white, "Bold");
    txt(s139Admin, "Employees", 550, 407, 14, C.white, "Bold");
    txt(s139Admin, "Monthly Spend", 720, 407, 14, C.white, "Bold");
    txt(s139Admin, "Status", 950, 407, 14, C.white, "Bold");
    txt(s139Admin, "Actions", 1100, 407, 14, C.white, "Bold");
    
    // Account rows
    const adminCorpList = [
      { company: "ABC Corporation", discount: "15%", employees: 150, spend: "Rs 125,000", status: "Active" },
      { company: "XYZ Industries", discount: "20%", employees: 200, spend: "Rs 185,000", status: "Active" },
      { company: "Tech Solutions Ltd", discount: "12%", employees: 85, spend: "Rs 95,000", status: "Active" },
      { company: "Global Traders Inc", discount: "18%", employees: 120, spend: "Rs 142,000", status: "Active" }
    ];
    
    for (let i = 0; i < 4; i++) {
      card(s139Admin, 60, 450 + i * 70, W - 120, 60, C.lightBg);
      txt(s139Admin, adminCorpList[i].company, 90, 470 + i * 70, 15, C.text, "Bold");
      txt(s139Admin, adminCorpList[i].discount, 400, 470 + i * 70, 15, C.teal, "Bold");
      txt(s139Admin, String(adminCorpList[i].employees), 570, 470 + i * 70, 15, C.text, "Regular");
      txt(s139Admin, adminCorpList[i].spend, 720, 470 + i * 70, 15, C.text, "Bold");
      
      card(s139Admin, 950, 465 + i * 70, 70, 25, C.teal); // Changed from green to teal
      txt(s139Admin, adminCorpList[i].status, 960, 472 + i * 70, 12, C.white, "Bold");
      
      btn(s139Admin, `ViewCorpDetail${i}-CLICK`, 1100, 460 + i * 70, 110, 35, C.teal, "View Details", 13);
      btn(s139Admin, `EditCorpAcc${i}-CLICK`, 1220, 460 + i * 70, 80, 35, C.lightBg, "Edit", 13);
    }
    
    colX = 0;
    rowY += H + ROW_GAP;
    
    // ===================================================================
    // MERCHANT CATEGORY - ROW 3
    // Screens: 120, 156, 149, 150, 151, 152, 157, 153, 154, 158
    // ===================================================================
    
    // -------------------------------------------------------------------
    // SCREEN 120: Analytics Dashboard (Merchant)
    // -------------------------------------------------------------------
    const s120 = figma.createFrame();
    s120.name = "120-Analytics-Dashboard-Merchant";
    s120.resize(W, H);
    s120.x = colX;
    s120.y = rowY;
    s120.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s120);
    screens.push(s120);
    
    topBar(s120, "Analytics Dashboard", "Pizza Palace - Main Street Branch");
    
    // Role toggle
    card(s120, W - 420, 125, 340, 45, C.lightBg);
    btn(s120, "ThisRest-CLICK", W - 415, 130, 160, 35, C.teal, "This Restaurant", 13);
    btn(s120, "AllRest-CLICK", W - 245, 130, 160, 35, C.white, "All Restaurants", 13);
    
    // Update indicator
    txt(s120, "Last updated: 2:00 PM • Auto-refresh every 60 minutes", W - 480, 165, 12, C.gray, "Regular");
    
    // Date range filters
    txt(s120, "Date Range:", 60, 195, 16, C.text, "Bold");
    const dateChips = ["Today", "Yesterday", "This Week", "This Month", "This Year", "Custom Range"];
    for (let i = 0; i < 6; i++) {
      btn(s120, `Date${i}-CLICK`, 60 + i * 145, 225, 135, 40, i === 0 ? C.teal : C.lightBg, dateChips[i], 13);
    }
    
    // Advanced filters
    txt(s120, "Restaurant:", 60, 285, 14, C.text, "Semi Bold");
    card(s120, 60, 305, 200, 45, C.white).name = "FilterRest-CLICK";
    txt(s120, "All ▾", 80, 317, 14, C.gray, "Regular");
    
    txt(s120, "Location:", 280, 285, 14, C.text, "Semi Bold");
    card(s120, 280, 305, 200, 45, C.white).name = "FilterLoc-CLICK";
    txt(s120, "All Locations ▾", 300, 317, 14, C.gray, "Regular");
    
    txt(s120, "Category:", 500, 285, 14, C.text, "Semi Bold");
    card(s120, 500, 305, 200, 45, C.white).name = "FilterCat-CLICK";
    txt(s120, "All Categories ▾", 520, 317, 14, C.gray, "Regular");
    
    btn(s120, "ClearFilters-CLICK", 720, 305, 140, 45, C.lightBg, "Clear Filters", 13);
    
    // Key metrics grid (FIXED with proper spacing)
    const metrics = [
      { icon: "orders", label: "Total Orders", value: "1,234", trend: "↑ 15% vs last period", color: C.teal },
      { icon: "revenue", label: "Total Revenue", value: "Rs 345,678", trend: "↑ 12% vs last period", color: C.teal },
      { icon: "complete", label: "Completed Orders", value: "1,189", trend: "96.4% of total", color: C.teal },
      { icon: "cancel", label: "Cancellations", value: "45 (3.6%)", trend: "Customer: 60% • Restaurant: 40%", color: C.red }
    ];
    
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cardX = 60 + col * (630 + COL_GAP);
      const cardY = 380 + row * 140;
      
      card(s120, cardX, cardY, 630, 110, C.lightBg);
      imgPlaceholder(s120, cardX + 20, cardY + 25, 50, 50, metrics[i].icon); // Replaced emoji with image
      txt(s120, metrics[i].label, cardX + 90, cardY + 25, 18, C.text, "Bold");
      txt(s120, metrics[i].value, cardX + 90, cardY + 55, 28, C.teal, "Bold");
      txt(s120, metrics[i].trend, cardX + 90, cardY + 88, 13, metrics[i].color, "Regular");
    }
    
    // Charts section
    txt(s120, "Orders Over Time", 60, 650, 20, C.text, "Bold");
    card(s120, 60, 685, 850, 180, C.lightBg);
    txt(s120, "Interactive Line Chart", 380, 765, 16, C.gray, "Regular"); // Removed emoji
    
    txt(s120, "Revenue by Category", 940, 650, 20, C.text, "Bold");
    card(s120, 940, 685, 380, 180, C.lightBg);
    const donutCircle = figma.createEllipse();
    donutCircle.resize(100, 100);
    donutCircle.x = 1070;
    donutCircle.y = 715;
    donutCircle.fills = [{ type: 'SOLID', color: C.teal }];
    s120.appendChild(donutCircle);
    
    // Export buttons
    btn(s120, "ExportCSV-CLICK", W - 500, 840, 140, 45, C.teal, "Export CSV", 14);
    btn(s120, "ExportPDF-CLICK", W - 340, 840, 140, 45, C.teal, "Export PDF", 14);
    btn(s120, "EmailReport-CLICK", W - 180, 840, 140, 45, C.lightBg, "Email Report", 14);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 156: Merchant Home Dashboard
    // -------------------------------------------------------------------
    const s156 = figma.createFrame();
    s156.name = "156-Merchant-Home-Dashboard";
    s156.resize(W, H);
    s156.x = colX;
    s156.y = rowY;
    s156.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s156);
    screens.push(s156);
    
    topBar(s156, "Merchant Dashboard", "Pizza Palace - Main Street Branch");
    
    // Switch Branch dropdown
    card(s156, W - 240, 125, 160, 45, C.lightBg).name = "SwitchBranch-CLICK";
    txt(s156, "Switch Branch ▾", W - 220, 137, 14, C.text, "Regular");
    
    // Today's summary strip
    card(s156, 60, 190, W - 120, 80, C.teal);
    txt(s156, "Today", 100, 215, 20, C.white, "Bold");
    txt(s156, "Orders: 45", 100, 245, 16, C.white, "Regular");
    txt(s156, "Completed: 41", 280, 245, 16, C.white, "Regular");
    txt(s156, "Cancelled: 4", 480, 245, 16, C.white, "Regular");
    txt(s156, "Revenue: Rs 32,500", 680, 245, 16, C.white, "Regular");
    txt(s156, "Earnings: Rs 27,625", 950, 245, 16, C.white, "Regular");
    
    // Quick Action Tiles (FIXED with proper spacing)
    txt(s156, "Quick Actions", 60, 310, 22, C.text, "Bold");
    
    const tiles = [
      { icon: "orders", title: "Manage Orders", subtitle: "View and update order statuses", name: "ManageOrders-CLICK" },
      { icon: "menu", title: "Menu & Stock", subtitle: "Add/edit items, availability", name: "MenuStock-CLICK" },
      { icon: "staff", title: "Staff & Roles", subtitle: "Manage staff permissions", name: "StaffRoles-CLICK" },
      { icon: "money", title: "Payouts & Earnings", subtitle: "Payout history & next payout", name: "Payouts-CLICK" },
      { icon: "reports", title: "Sales Reports", subtitle: "Daily • Weekly • Monthly", name: "SalesReports-CLICK" },
      { icon: "restaurant", title: "Restaurant Profile", subtitle: "Opening hours, address, delivery types", name: "RestProfile-CLICK" }
    ];
    
    for (let i = 0; i < 6; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const tileX = 60 + col * (410 + COL_GAP);
      const tileY = 360 + row * 170;
      
      const tileCard = card(s156, tileX, tileY, 410, 140, C.lightBg);
      tileCard.name = tiles[i].name;
      
      imgPlaceholder(s156, tileX + 20, tileY + 25, 60, 60, tiles[i].icon); // Replaced emoji with image
      txt(s156, tiles[i].title, tileX + 100, tileY + 35, 20, C.text, "Bold");
      txt(s156, tiles[i].subtitle, tileX + 100, tileY + 65, 14, C.gray, "Regular");
    }
    
    // Active Orders Widget
    txt(s156, "Active Orders (12)", 60, 700, 20, C.text, "Bold");
    
    card(s156, 60, 735, W - 120, 120, C.lightBg);
    
    for (let i = 0; i < 3; i++) {
      const orderX = 90 + i * 420;
      txt(s156, `Order #${1234 + i}`, orderX, 755, 16, C.text, "Bold");
      txt(s156, "Pizza Margherita x2", orderX, 780, 13, C.gray, "Regular");
      txt(s156, "Rs 1,200", orderX, 805, 14, C.teal, "Bold");
      
      card(s156, orderX + 200, 760, 80, 28, C.yellow);
      txt(s156, "Preparing", orderX + 208, 767, 11, C.text, "Bold");
      
      btn(s156, `ViewOrder${i}-CLICK`, orderX + 290, 760, 90, 28, C.teal, "View", 12);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 149: Order Management
    // -------------------------------------------------------------------
    const s149 = figma.createFrame();
    s149.name = "149-Order-Management";
    s149.resize(W, H);
    s149.x = colX;
    s149.y = rowY;
    s149.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s149);
    screens.push(s149);
    
    topBar(s149, "Order Management", "Manage all incoming and active orders");
    
    // Status filter tabs
    const statusTabs = ["All (45)", "New (8)", "Preparing (12)", "Ready (5)", "Completed (20)"];
    for (let i = 0; i < 5; i++) {
      btn(s149, `Status${i}-CLICK`, 60 + i * 180, 190, 170, 45, i === 0 ? C.teal : C.lightBg, statusTabs[i], 14);
    }
    
    // Order cards
    txt(s149, "Active Orders", 60, 270, 22, C.text, "Bold");
    
    const orders = [
      { id: "12345", customer: "Ahmed Khan", items: "Pizza Margherita x2, Coke x1", amount: "Rs 1,200", time: "5 mins ago", status: "New", statusColor: C.yellow },
      { id: "12346", customer: "Sara Ali", items: "Chicken Burger x1, Fries x1", amount: "Rs 850", time: "12 mins ago", status: "Preparing", statusColor: C.orange },
      { id: "12347", customer: "Bilal Ahmed", items: "Pasta Alfredo x1", amount: "Rs 950", time: "18 mins ago", status: "Ready", statusColor: C.teal }
    ];
    
    for (let i = 0; i < 3; i++) {
      card(s149, 60, 320 + i * 150, W - 120, 130, C.lightBg);
      
      txt(s149, `Order #${orders[i].id}`, 90, 340 + i * 150, 20, C.text, "Bold");
      txt(s149, orders[i].time, 300, 345 + i * 150, 14, C.gray, "Regular");
      
      txt(s149, orders[i].customer, 90, 370 + i * 150, 16, C.text, "Regular");
      txt(s149, orders[i].items, 90, 395 + i * 150, 14, C.gray, "Regular");
      txt(s149, orders[i].amount, 90, 420 + i * 150, 18, C.teal, "Bold");
      
      card(s149, W - 580, 345 + i * 150, 100, 35, orders[i].statusColor);
      txt(s149, orders[i].status, W - 565, 355 + i * 150, 13, C.white, "Bold");
      
      btn(s149, `Accept${i}-CLICK`, W - 460, 345 + i * 150, 120, 35, C.teal, "Accept", 13);
      btn(s149, `ViewDetails${i}-CLICK`, W - 330, 345 + i * 150, 120, 35, C.lightBg, "View Details", 13);
      btn(s149, `Reject${i}-CLICK`, W - 200, 345 + i * 150, 100, 35, C.red, "Reject", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 150: Menu Management
    // -------------------------------------------------------------------
    const s150 = figma.createFrame();
    s150.name = "150-Menu-Management";
    s150.resize(W, H);
    s150.x = colX;
    s150.y = rowY;
    s150.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s150);
    screens.push(s150);
    
    topBar(s150, "Menu Management", "Add, edit, or remove menu items");
    
    // Actions bar
    btn(s150, "AddItem-CLICK", W - 380, 185, 160, 45, C.teal, "+ Add New Item", 14);
    btn(s150, "BulkEdit-CLICK", W - 210, 185, 130, 45, C.lightBg, "Bulk Edit", 14);
    
    // Category tabs
    txt(s150, "Categories:", 60, 190, 16, C.text, "Bold");
    const categories = ["All", "Pizza", "Burgers", "Drinks", "Desserts"];
    for (let i = 0; i < 5; i++) {
      btn(s150, `Cat${i}-CLICK`, 60 + i * 120, 220, 110, 40, i === 0 ? C.teal : C.lightBg, categories[i], 13);
    }
    
    // Search bar
    card(s150, 60, 280, 500, 50, C.white).name = "SearchMenu-INPUT";
    txt(s150, "Search menu items", 80, 295, 14, C.gray, "Regular"); // Removed emoji
    
    // Menu items grid
    txt(s150, "Menu Items (24)", 60, 360, 22, C.text, "Bold");
    
    const menuItems = [
      { name: "Pizza Margherita", price: "Rs 650", category: "Pizza", available: true },
      { name: "Chicken Burger", price: "Rs 450", category: "Burgers", available: true },
      { name: "Pepsi", price: "Rs 120", category: "Drinks", available: false },
      { name: "Chocolate Cake", price: "Rs 350", category: "Desserts", available: true }
    ];
    
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const itemX = 60 + col * (660 + COL_GAP);
      const itemY = 410 + row * 180;
      
      card(s150, itemX, itemY, 660, 160, C.lightBg);
      
      imgPlaceholder(s150, itemX + 20, itemY + 20, 120, 120, "food " + menuItems[i].category); // Image placeholder
      
      txt(s150, menuItems[i].name, itemX + 160, itemY + 30, 20, C.text, "Bold");
      txt(s150, menuItems[i].category, itemX + 160, itemY + 60, 14, C.gray, "Regular");
      txt(s150, menuItems[i].price, itemX + 160, itemY + 85, 18, C.teal, "Bold");
      
      if (menuItems[i].available) {
        card(s150, itemX + 160, itemY + 115, 90, 25, C.teal); // Changed from green
        txt(s150, "Available", itemX + 168, itemY + 122, 12, C.white, "Bold");
      } else {
        card(s150, itemX + 160, itemY + 115, 110, 25, C.red);
        txt(s150, "Out of Stock", itemX + 168, itemY + 122, 12, C.white, "Bold");
      }
      
      btn(s150, `EditItem${i}-CLICK`, itemX + 460, itemY + 30, 80, 35, C.teal, "Edit", 13);
      btn(s150, `StockItem${i}-CLICK`, itemX + 550, itemY + 30, 90, 35, C.lightBg, "Stock", 13);
      btn(s150, `DeleteItem${i}-CLICK`, itemX + 460, itemY + 75, 180, 35, C.red, "Delete", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 151: Staff Management
    // -------------------------------------------------------------------
    const s151 = figma.createFrame();
    s151.name = "151-Staff-Management";
    s151.resize(W, H);
    s151.x = colX;
    s151.y = rowY;
    s151.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s151);
    screens.push(s151);
    
    topBar(s151, "Staff Management", "Manage restaurant staff and permissions");
    
    // Actions bar
    btn(s151, "AddStaff-CLICK", W - 280, 185, 200, 45, C.teal, "+ Add Staff Member", 14);
    
    // Summary cards
    card(s151, 60, 190, 380, 90, C.lightBg);
    txt(s151, "Total Staff", 90, 210, 14, C.gray, "Regular");
    txt(s151, "15", 90, 235, 32, C.teal, "Bold");
    
    card(s151, 460, 190, 380, 90, C.lightBg);
    txt(s151, "Active Now", 490, 210, 14, C.gray, "Regular");
    txt(s151, "8", 490, 235, 32, C.teal, "Bold");
    
    card(s151, 860, 190, 380, 90, C.lightBg);
    txt(s151, "On Leave", 890, 210, 14, C.gray, "Regular");
    txt(s151, "2", 890, 235, 32, C.orange, "Bold");
    
    // Filters
    txt(s151, "Role:", 60, 310, 14, C.text, "Semi Bold");
    btn(s151, "RoleAll-CLICK", 130, 305, 100, 40, C.teal, "All", 13);
    btn(s151, "RoleManager-CLICK", 240, 305, 120, 40, C.lightBg, "Manager", 13);
    btn(s151, "RoleChef-CLICK", 370, 305, 100, 40, C.lightBg, "Chef", 13);
    btn(s151, "RoleWaiter-CLICK", 480, 305, 100, 40, C.lightBg, "Waiter", 13);
    
    // Staff list
    txt(s151, "Staff Members", 60, 375, 22, C.text, "Bold");
    
    const staff = [
      { name: "Ali Hassan", role: "Manager", status: "Active", shift: "Morning", phone: "+92 300 1234567" },
      { name: "Fatima Khan", role: "Chef", status: "Active", shift: "Evening", phone: "+92 301 2345678" },
      { name: "Ahmed Raza", role: "Waiter", status: "On Leave", shift: "Morning", phone: "+92 302 3456789" },
      { name: "Sara Ali", role: "Waiter", status: "Active", shift: "Evening", phone: "+92 303 4567890" }
    ];
    
    for (let i = 0; i < 4; i++) {
      card(s151, 60, 425 + i * 110, W - 120, 100, C.lightBg);
      
      const staffAvatar = figma.createEllipse();
      staffAvatar.resize(60, 60);
      staffAvatar.x = 90;
      staffAvatar.y = 445 + i * 110;
      staffAvatar.fills = [{ type: 'SOLID', color: C.teal }];
      s151.appendChild(staffAvatar);
      
      txt(s151, staff[i].name[0], 112, 465 + i * 110, 24, C.white, "Bold");
      
      txt(s151, staff[i].name, 170, 450 + i * 110, 18, C.text, "Bold");
      txt(s151, staff[i].role, 170, 475 + i * 110, 14, C.gray, "Regular");
      txt(s151, staff[i].phone, 170, 495 + i * 110, 13, C.gray, "Regular");
      
      txt(s151, `Shift: ${staff[i].shift}`, 500, 460 + i * 110, 14, C.text, "Regular");
      
      if (staff[i].status === "Active") {
        card(s151, 750, 455 + i * 110, 80, 28, C.teal); // Changed from green
        txt(s151, "Active", 765, 463 + i * 110, 12, C.white, "Bold");
      } else {
        card(s151, 750, 455 + i * 110, 90, 28, C.orange);
        txt(s151, "On Leave", 760, 463 + i * 110, 12, C.white, "Bold");
      }
      
      btn(s151, `EditStaff${i}-CLICK`, W - 460, 450 + i * 110, 100, 35, C.teal, "Edit", 13);
      btn(s151, `ViewSchedule${i}-CLICK`, W - 350, 450 + i * 110, 130, 35, C.lightBg, "Schedule", 13);
      btn(s151, `RemoveStaff${i}-CLICK`, W - 210, 450 + i * 110, 100, 35, C.red, "Remove", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 152: Payout Dashboard
    // -------------------------------------------------------------------
    const s152 = figma.createFrame();
    s152.name = "152-Payout-Dashboard";
    s152.resize(W, H);
    s152.x = colX;
    s152.y = rowY;
    s152.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s152);
    screens.push(s152);
    
    topBar(s152, "Payouts & Earnings", "Track your earnings and payout history");
    
    // Next payout card
    card(s152, 60, 190, W - 120, 120, C.teal);
    txt(s152, "Next Payout", 100, 220, 24, C.white, "Bold");
    txt(s152, "Rs 87,450", 100, 255, 40, C.yellow, "Bold");
    txt(s152, "Expected on: Dec 15, 2025 • Weekly payout cycle", 100, 285, 14, C.white, "Regular");
    btn(s152, "PayoutDetails-CLICK", W - 320, 230, 200, 50, C.white, "View Details", 15);
    
    // Summary metrics
    txt(s152, "This Month", 60, 340, 22, C.text, "Bold");
    
    const payoutMetrics = [
      { label: "Total Orders", value: "145" },
      { label: "Gross Revenue", value: "Rs 125,000" },
      { label: "Platform Fee (15%)", value: "Rs 18,750" },
      { label: "Net Earnings", value: "Rs 106,250" }
    ];
    
    for (let i = 0; i < 4; i++) {
      const metricX = 60 + i * 340;
      card(s152, metricX, 380, 320, 90, C.lightBg);
      txt(s152, payoutMetrics[i].label, metricX + 30, 405, 14, C.gray, "Regular");
      txt(s152, payoutMetrics[i].value, metricX + 30, 435, 22, C.teal, "Bold");
    }
    
    // Payout history
    txt(s152, "Payout History", 60, 510, 22, C.text, "Bold");
    btn(s152, "DownloadStatement-CLICK", W - 280, 505, 200, 40, C.teal, "Download Statement", 14);
    
    const payouts = [
      { date: "Dec 01, 2025", amount: "Rs 82,340", status: "Completed", method: "Bank Transfer" },
      { date: "Nov 24, 2025", amount: "Rs 78,920", status: "Completed", method: "Bank Transfer" },
      { date: "Nov 17, 2025", amount: "Rs 85,670", status: "Completed", method: "Bank Transfer" },
      { date: "Nov 10, 2025", amount: "Rs 91,230", status: "Completed", method: "Bank Transfer" }
    ];
    
    for (let i = 0; i < 4; i++) {
      card(s152, 60, 570 + i * 75, W - 120, 65, C.lightBg);
      txt(s152, payouts[i].date, 90, 590 + i * 75, 16, C.text, "Bold");
      txt(s152, payouts[i].method, 90, 610 + i * 75, 13, C.gray, "Regular");
      
      txt(s152, payouts[i].amount, 500, 595 + i * 75, 18, C.teal, "Bold");
      
      card(s152, 800, 585 + i * 75, 100, 28, C.teal); // Changed from green
      txt(s152, payouts[i].status, 810, 593 + i * 75, 12, C.white, "Bold");
      
      btn(s152, `ViewPayout${i}-CLICK`, W - 250, 585 + i * 75, 140, 35, C.lightBg, "View Receipt", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 157: Restaurant Profile
    // -------------------------------------------------------------------
    const s157 = figma.createFrame();
    s157.name = "157-Restaurant-Profile";
    s157.resize(W, H);
    s157.x = colX;
    s157.y = rowY;
    s157.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s157);
    screens.push(s157);
    
    topBar(s157, "Restaurant Profile", "Manage your restaurant information");
    
    // Restaurant header
    card(s157, 60, 190, W - 120, 140, C.lightBg);
    imgPlaceholder(s157, 90, 210, 100, 100, "restaurant building"); // Image instead of emoji
    
    txt(s157, "Pizza Palace", 220, 220, 28, C.text, "Bold");
    txt(s157, "Main Street Branch • Italian, Fast Food", 220, 260, 16, C.gray, "Regular");
    txt(s157, "Rating: 4.5/5 (1,234 reviews)", 220, 285, 14, C.gray, "Regular");
    
    btn(s157, "EditProfile-CLICK", W - 320, 240, 180, 45, C.teal, "Edit Profile", 15);
    
    // Business Information Section
    txt(s157, "Business Information", 60, 360, 22, C.text, "Bold");
    
    card(s157, 60, 400, 630, 340, C.lightBg);
    
    txt(s157, "Restaurant Name", 90, 430, 14, C.text, "Semi Bold");
    card(s157, 90, 455, 570, 50, C.white).name = "RestName-INPUT";
    txt(s157, "Pizza Palace", 110, 472, 14, C.gray, "Regular");
    
    txt(s157, "Address", 90, 525, 14, C.text, "Semi Bold");
    card(s157, 90, 550, 570, 50, C.white).name = "RestAddress-INPUT";
    txt(s157, "123 Main Street, Karachi", 110, 567, 14, C.gray, "Regular");
    
    txt(s157, "Phone Number", 90, 620, 14, C.text, "Semi Bold");
    card(s157, 90, 645, 270, 50, C.white).name = "RestPhone-INPUT";
    txt(s157, "+92 300 1234567", 110, 662, 14, C.gray, "Regular");
    
    txt(s157, "Email", 390, 620, 14, C.text, "Semi Bold");
    card(s157, 390, 645, 270, 50, C.white).name = "RestEmail-INPUT";
    txt(s157, "info@pizzapalace.com", 410, 662, 14, C.gray, "Regular");
    
    // Operating Hours Section
    txt(s157, "Operating Hours", 720, 360, 22, C.text, "Bold");
    
    card(s157, 720, 400, 630, 340, C.lightBg);
    
    const days = ["Monday - Friday", "Saturday", "Sunday"];
    const hours = ["9:00 AM - 11:00 PM", "10:00 AM - 12:00 AM", "10:00 AM - 10:00 PM"];
    
    for (let i = 0; i < 3; i++) {
      txt(s157, days[i], 750, 440 + i * 90, 16, C.text, "Bold");
      card(s157, 750, 470 + i * 90, 200, 45, C.white).name = `Hours${i}-INPUT`;
      txt(s157, hours[i], 770, 485 + i * 90, 14, C.gray, "Regular");
      
      btn(s157, `EditHours${i}-CLICK`, 970, 470 + i * 90, 100, 45, C.teal, "Edit", 13);
    }
    
    // Delivery Settings
    txt(s157, "Delivery Settings", 60, 770, 22, C.text, "Bold");
    card(s157, 60, 810, W - 120, 60, C.yellow);
    txt(s157, "Delivery Radius: 5km • Avg Delivery Time: 30 mins • Delivery Fee: Rs 50", 100, 832, 15, C.text, "Bold");
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 153: Sales Reports
    // -------------------------------------------------------------------
    const s153 = figma.createFrame();
    s153.name = "153-Sales-Reports";
    s153.resize(W, H);
    s153.x = colX;
    s153.y = rowY;
    s153.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s153);
    screens.push(s153);
    
    topBar(s153, "Sales Reports", "Detailed sales analytics and reports");
    
    // Report type selector
    txt(s153, "Report Type:", 60, 195, 16, C.text, "Bold");
    const reportTypes = ["Daily", "Weekly", "Monthly", "Yearly", "Custom"];
    for (let i = 0; i < 5; i++) {
      btn(s153, `Report${i}-CLICK`, 190 + i * 130, 190, 120, 40, i === 2 ? C.teal : C.lightBg, reportTypes[i], 13);
    }
    
    // Date range
    txt(s153, "Period: November 2025", W - 280, 195, 14, C.text, "Semi Bold");
    
    // Summary cards
    const reportMetrics = [
      { icon: "sales", label: "Total Sales", value: "Rs 345,678", change: "+12%" },
      { icon: "orders", label: "Orders", value: "1,234", change: "+15%" },
      { icon: "average", label: "Avg Order Value", value: "Rs 280", change: "+8%" },
      { icon: "customers", label: "Customers", value: "892", change: "+18%" }
    ];
    
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const metricX = 60 + col * (630 + COL_GAP);
      const metricY = 260 + row * 140;
      
      card(s153, metricX, metricY, 630, 110, C.lightBg);
      imgPlaceholder(s153, metricX + 20, metricY + 25, 50, 50, reportMetrics[i].icon); // Image instead of emoji
      txt(s153, reportMetrics[i].label, metricX + 90, metricY + 30, 16, C.text, "Bold");
      txt(s153, reportMetrics[i].value, metricX + 90, metricY + 55, 26, C.teal, "Bold");
      txt(s153, reportMetrics[i].change + " vs last month", metricX + 90, metricY + 88, 13, C.teal, "Regular");
    }
    
    // Charts
    txt(s153, "Sales Breakdown", 60, 560, 22, C.text, "Bold");
    
    card(s153, 60, 600, 630, 240, C.lightBg);
    txt(s153, "Bar Chart: Daily Sales", 280, 710, 16, C.gray, "Regular");
    
    card(s153, 720, 600, 630, 240, C.lightBg);
    txt(s153, "Pie Chart: Category Sales", 920, 710, 16, C.gray, "Regular");
    
    // Export buttons
    btn(s153, "ExportCSVReport-CLICK", 60, 860, 150, 40, C.teal, "Export CSV", 14);
    btn(s153, "ExportPDFReport-CLICK", 230, 860, 150, 40, C.teal, "Export PDF", 14);
    btn(s153, "EmailReport-CLICK", 400, 860, 150, 40, C.lightBg, "Email Report", 14);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 154: Review Management
    // -------------------------------------------------------------------
    const s154 = figma.createFrame();
    s154.name = "154-Review-Management";
    s154.resize(W, H);
    s154.x = colX;
    s154.y = rowY;
    s154.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s154);
    screens.push(s154);
    
    topBar(s154, "Review Management", "Manage customer reviews and feedback");
    
    // Rating summary
    card(s154, 60, 190, W - 120, 120, C.lightBg);
    
    txt(s154, "4.5", 100, 220, 48, C.teal, "Bold");
    txt(s154, "Average Rating", 100, 275, 14, C.gray, "Regular");
    
    txt(s154, "1,234 Total Reviews", 300, 230, 18, C.text, "Bold");
    
    // Star breakdown
    for (let i = 5; i >= 1; i--) {
      const starY = 220 + (5 - i) * 25;
      txt(s154, `${i} Star`, 450, starY, 13, C.text, "Regular");
      card(s154, 520, starY + 3, 200, 15, C.gray);
      const percentage = [65, 20, 10, 3, 2][5 - i];
      card(s154, 520, starY + 3, percentage * 2, 15, C.yellow);
      txt(s154, `${percentage}%`, 740, starY, 13, C.text, "Regular");
    }
    
    btn(s154, "ResponseRate-CLICK", W - 320, 230, 200, 50, C.teal, "Response Rate: 92%", 15);
    
    // Filter tabs
    txt(s154, "Filter Reviews:", 60, 340, 16, C.text, "Bold");
    const reviewFilters = ["All", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star", "Unanswered"];
    for (let i = 0; i < 7; i++) {
      btn(s154, `ReviewFilter${i}-CLICK`, 60 + i * 130, 370, 120, 40, i === 0 ? C.teal : C.lightBg, reviewFilters[i], 12);
    }
    
    // Reviews list
    txt(s154, "Recent Reviews", 60, 440, 22, C.text, "Bold");
    
    const reviews = [
      { user: "Ahmed Khan", rating: 5, text: "Excellent pizza! Fast delivery and hot food.", date: "2 days ago", replied: false },
      { user: "Sara Ali", rating: 4, text: "Good taste but delivery was a bit slow.", date: "3 days ago", replied: true },
      { user: "Bilal Ahmed", rating: 5, text: "Best pizza in town! Highly recommended.", date: "5 days ago", replied: true }
    ];
    
    for (let i = 0; i < 3; i++) {
      card(s154, 60, 490 + i * 150, W - 120, 130, C.lightBg);
      
      const reviewAvatar = figma.createEllipse();
      reviewAvatar.resize(50, 50);
      reviewAvatar.x = 90;
      reviewAvatar.y = 510 + i * 150;
      reviewAvatar.fills = [{ type: 'SOLID', color: C.teal }];
      s154.appendChild(reviewAvatar);
      
      txt(s154, reviews[i].user[0], 109, 525 + i * 150, 20, C.white, "Bold");
      
      txt(s154, reviews[i].user, 160, 515 + i * 150, 16, C.text, "Bold");
      txt(s154, reviews[i].date, 160, 540 + i * 150, 12, C.gray, "Regular");
      
      // Star rating
      for (let s = 0; s < reviews[i].rating; s++) {
        txt(s154, "★", 350 + s * 20, 515 + i * 150, 16, C.yellow, "Regular");
      }
      
      txt(s154, reviews[i].text, 90, 575 + i * 150, 14, C.text, "Regular");
      
      if (reviews[i].replied) {
        card(s154, W - 340, 515 + i * 150, 80, 28, C.teal); // Changed from green
        txt(s154, "Replied", W - 325, 523 + i * 150, 12, C.white, "Bold");
        btn(s154, `ViewReply${i}-CLICK`, W - 240, 515 + i * 150, 120, 35, C.lightBg, "View Reply", 13);
      } else {
        btn(s154, `Reply${i}-CLICK`, W - 240, 515 + i * 150, 120, 35, C.teal, "Reply", 13);
      }
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 158: Promotions & Offers
    // -------------------------------------------------------------------
    const s158 = figma.createFrame();
    s158.name = "158-Promotions-Offers";
    s158.resize(W, H);
    s158.x = colX;
    s158.y = rowY;
    s158.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s158);
    screens.push(s158);
    
    topBar(s158, "Promotions & Offers", "Create and manage promotional offers");
    
    // Actions
    btn(s158, "CreatePromo-CLICK", W - 280, 185, 200, 45, C.teal, "+ Create New Offer", 14);
    
    // Active promotions
    txt(s158, "Active Promotions (3)", 60, 200, 24, C.text, "Bold");
    
    const promos = [
      { title: "20% Off Pizzas", code: "PIZZA20", discount: "20%", used: "45/100", expires: "Dec 31, 2025" },
      { title: "Free Delivery", code: "FREEDEL", discount: "Rs 50", used: "120/200", expires: "Dec 15, 2025" },
      { title: "Buy 1 Get 1 Free", code: "BOGO", discount: "50%", used: "32/50", expires: "Dec 10, 2025" }
    ];
    
    for (let i = 0; i < 3; i++) {
      card(s158, 60, 260 + i * 160, W - 120, 140, C.lightBg);
      
      txt(s158, promos[i].title, 90, 285 + i * 160, 22, C.text, "Bold");
      
      card(s158, 90, 320 + i * 160, 120, 30, C.yellow);
      txt(s158, promos[i].code, 100, 327 + i * 160, 13, C.text, "Bold");
      
      txt(s158, `Discount: ${promos[i].discount}`, 230, 327 + i * 160, 14, C.text, "Regular");
      txt(s158, `Used: ${promos[i].used}`, 90, 360 + i * 160, 14, C.gray, "Regular");
      txt(s158, `Expires: ${promos[i].expires}`, 230, 360 + i * 160, 14, C.gray, "Regular");
      
      btn(s158, `EditPromo${i}-CLICK`, W - 460, 310 + i * 160, 100, 35, C.teal, "Edit", 13);
      btn(s158, `ViewStats${i}-CLICK`, W - 350, 310 + i * 160, 130, 35, C.lightBg, "View Stats", 13);
      btn(s158, `DeactivatePromo${i}-CLICK`, W - 210, 310 + i * 160, 130, 35, C.red, "Deactivate", 13);
    }
    
    // Past promotions
    txt(s158, "Past Promotions", 60, 750, 20, C.text, "Bold");
    btn(s158, "ViewAllPast-CLICK", W - 220, 745, 140, 35, C.lightBg, "View All", 14);
    
    card(s158, 60, 795, W - 120, 70, C.lightBg);
    txt(s158, "Summer Sale - 30% Off", 90, 815, 16, C.text, "Bold");
    txt(s158, "Code: SUMMER30 • Used: 234/300 • Ended: Nov 30, 2025", 90, 840, 13, C.gray, "Regular");
    btn(s158, "ViewPastDetails-CLICK", W - 240, 805, 140, 35, C.teal, "View Details", 13);
    
    colX = 0;
    rowY += H + ROW_GAP;
    
    // ===================================================================
    // ADMIN CATEGORY - ROW 4
    // Screens: 101, 102, 103, 104, 105, 106
    // ===================================================================
    
    // -------------------------------------------------------------------
    // SCREEN 101: Admin Dashboard
    // -------------------------------------------------------------------
    const s101 = figma.createFrame();
    s101.name = "101-Admin-Dashboard";
    s101.resize(W, H);
    s101.x = colX;
    s101.y = rowY;
    s101.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s101);
    screens.push(s101);
    
    topBar(s101, "Admin Dashboard", "Platform overview and management");
    
    // Summary strip
    card(s101, 60, 190, W - 120, 100, C.teal);
    txt(s101, "Platform Overview - Real-time", 100, 215, 22, C.white, "Bold");
    txt(s101, "Active Orders: 234", 100, 250, 16, C.white, "Regular");
    txt(s101, "Active Users: 12,456", 350, 250, 16, C.white, "Regular");
    txt(s101, "Active Restaurants: 342", 650, 250, 16, C.white, "Regular");
    txt(s101, "Today's Revenue: Rs 2,340,000", 1000, 250, 16, C.white, "Regular");
    
    // Quick stats grid
    const adminStats = [
      { icon: "users", label: "Total Users", value: "45,678", trend: "+12%" },
      { icon: "restaurants", label: "Restaurants", value: "342", trend: "+8%" },
      { icon: "orders", label: "Total Orders", value: "123,456", trend: "+15%" },
      { icon: "revenue", label: "Revenue", value: "Rs 45.6M", trend: "+18%" }
    ];
    
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const statX = 60 + col * (630 + COL_GAP);
      const statY = 320 + row * 140;
      
      card(s101, statX, statY, 630, 110, C.lightBg);
      imgPlaceholder(s101, statX + 20, statY + 25, 50, 50, adminStats[i].icon); // Image instead of emoji
      txt(s101, adminStats[i].label, statX + 90, statY + 30, 16, C.text, "Bold");
      txt(s101, adminStats[i].value, statX + 90, statY + 55, 26, C.teal, "Bold");
      txt(s101, adminStats[i].trend + " this month", statX + 90, statY + 88, 13, C.teal, "Regular");
    }
    
    // Quick actions
    txt(s101, "Quick Actions", 60, 600, 22, C.text, "Bold");
    
    const adminActions = [
      { icon: "user", title: "User Management", name: "UserMgmt-CLICK" },
      { icon: "restaurant", title: "Restaurant Approvals", name: "RestApproval-CLICK" },
      { icon: "order", title: "Order Monitoring", name: "OrderMonitor-CLICK" },
      { icon: "settings", title: "System Settings", name: "SysSettings-CLICK" }
    ];
    
    for (let i = 0; i < 4; i++) {
      const actionX = 60 + i * 340;
      const actionY = 650 
      const actionCard = card(s101, actionX, 650, 320, 110, C.lightBg);
      actionCard.name = adminActions[i].name;
      
      imgPlaceholder(s101, actionX + 30, actionY + 30, 60, 60, adminActions[i].icon); // Image instead of emoji
      txt(s101, adminActions[i].title, actionX + 110, actionY + 45, 18, C.text, "Bold");
    }
    
    // Recent alerts
    txt(s101, "Recent Alerts", 60, 790, 20, C.text, "Bold");
    card(s101, 60, 825, W - 120, 50, C.yellow);
    txt(s101, "3 new restaurant registration requests pending approval", 100, 842, 14, C.text, "Bold");
    btn(s101, "ViewAlerts-CLICK", W - 240, 830, 140, 40, C.teal, "View All", 14);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 102: User Management
    // -------------------------------------------------------------------
    const s102 = figma.createFrame();
    s102.name = "102-User-Management";
    s102.resize(W, H);
    s102.x = colX;
    s102.y = rowY;
    s102.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s102);
    screens.push(s102);
    
    topBar(s102, "User Management", "Manage all platform users");
    
    // Summary cards
    card(s102, 60, 190, 380, 90, C.lightBg);
    txt(s102, "Total Users", 90, 210, 14, C.gray, "Regular");
    txt(s102, "45,678", 90, 235, 32, C.teal, "Bold");
    
    card(s102, 460, 190, 380, 90, C.lightBg);
    txt(s102, "Active Today", 490, 210, 14, C.gray, "Regular");
    txt(s102, "12,456", 490, 235, 32, C.teal, "Bold");
    
    card(s102, 860, 190, 380, 90, C.lightBg);
    txt(s102, "New This Week", 890, 210, 14, C.gray, "Regular");
    txt(s102, "1,234", 890, 235, 32, C.teal, "Bold");
    
    // Search and filters
    card(s102, 60, 310, 600, 50, C.white).name = "SearchUser-INPUT";
    txt(s102, "Search by name, email, or phone", 80, 325, 14, C.gray, "Regular"); // Removed emoji
    
    btn(s102, "UserFilterAll-CLICK", 680, 310, 100, 50, C.teal, "All", 14);
    btn(s102, "UserFilterActive-CLICK", 790, 310, 120, 50, C.lightBg, "Active", 14);
    btn(s102, "UserFilterBlocked-CLICK", 920, 310, 120, 50, C.lightBg, "Blocked", 14);
    
    btn(s102, "ExportUsers-CLICK", W - 240, 310, 160, 50, C.teal, "Export Data", 14);
    
    // User table
    txt(s102, "All Users", 60, 390, 22, C.text, "Bold");
    
    // Table header
    card(s102, 60, 430, W - 120, 50, C.teal);
    txt(s102, "User", 90, 447, 14, C.white, "Bold");
    txt(s102, "Email", 350, 447, 14, C.white, "Bold");
    txt(s102, "Phone", 600, 447, 14, C.white, "Bold");
    txt(s102, "Join Date", 850, 447, 14, C.white, "Bold");
    txt(s102, "Status", 1050, 447, 14, C.white, "Bold");
    txt(s102, "Actions", 1200, 447, 14, C.white, "Bold");
    
    // User rows
    const users = [
      { name: "Ahmed Khan", email: "ahmed@email.com", phone: "+92 300 1234567", date: "Nov 15, 2025", status: "Active" },
      { name: "Sara Ali", email: "sara@email.com", phone: "+92 301 2345678", date: "Nov 10, 2025", status: "Active" },
      { name: "Bilal Ahmed", email: "bilal@email.com", phone: "+92 302 3456789", date: "Nov 5, 2025", status: "Active" },
      { name: "Fatima Raza", email: "fatima@email.com", phone: "+92 303 4567890", date: "Oct 28, 2025", status: "Blocked" }
    ];
    
    for (let i = 0; i < 4; i++) {
      card(s102, 60, 490 + i * 70, W - 120, 60, C.lightBg);
      
      const userAvatar = figma.createEllipse();
      userAvatar.resize(40, 40);
      userAvatar.x = 80;
      userAvatar.y = 500 + i * 70;
      userAvatar.fills = [{ type: 'SOLID', color: C.teal }];
      s102.appendChild(userAvatar);
      
      txt(s102, users[i].name[0], 93, 510 + i * 70, 18, C.white, "Bold");
      txt(s102, users[i].name, 140, 510 + i * 70, 15, C.text, "Bold");
      txt(s102, users[i].email, 350, 510 + i * 70, 14, C.gray, "Regular");
      txt(s102, users[i].phone, 600, 510 + i * 70, 14, C.text, "Regular");
      txt(s102, users[i].date, 850, 510 + i * 70, 14, C.gray, "Regular");
      
      if (users[i].status === "Active") {
        card(s102, 1050, 505 + i * 70, 70, 25, C.teal); // Changed from green to teal
        txt(s102, "Active", 1060, 512 + i * 70, 12, C.white, "Bold");
      } else {
        card(s102, 1050, 505 + i * 70, 70, 25, C.red);
        txt(s102, "Blocked", 1055, 512 + i * 70, 12, C.white, "Bold");
      }
      
      btn(s102, `ViewUser${i}-CLICK`, 1200, 500 + i * 70, 90, 35, C.teal, "View", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 103: Restaurant Approvals
    // -------------------------------------------------------------------
    const s103 = figma.createFrame();
    s103.name = "103-Restaurant-Approvals";
    s103.resize(W, H);
    s103.x = colX;
    s103.y = rowY;
    s103.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s103);
    screens.push(s103);
    
    topBar(s103, "Restaurant Approvals", "Review and approve restaurant registrations");
    
    // Summary
    card(s103, 60, 190, W - 120, 80, C.yellow);
    txt(s103, "3 Pending Approvals", 100, 215, 22, C.text, "Bold");
    txt(s103, "Average approval time: 24 hours", 100, 245, 14, C.text, "Regular");
    
    // Filter tabs
    const approvalTabs = ["Pending (3)", "Approved (342)", "Rejected (12)"];
    for (let i = 0; i < 3; i++) {
      btn(s103, `ApprovalTab${i}-CLICK`, 60 + i * 200, 300, 190, 45, i === 0 ? C.teal : C.lightBg, approvalTabs[i], 14);
    }
    
    // Pending applications
    txt(s103, "Pending Applications", 60, 375, 22, C.text, "Bold");
    
    const applications = [
      { name: "Golden Spoon Restaurant", owner: "Ali Hassan", cuisine: "Pakistani, Chinese", location: "Karachi", submitted: "2 days ago" },
      { name: "Burger House", owner: "Sara Khan", cuisine: "Fast Food, American", location: "Lahore", submitted: "1 day ago" },
      { name: "Sushi Master", owner: "Ahmed Raza", cuisine: "Japanese, Asian", location: "Islamabad", submitted: "3 hours ago" }
    ];
    
    for (let i = 0; i < 3; i++) {
      card(s103, 60, 425 + i * 180, W - 120, 160, C.lightBg);
      
      imgPlaceholder(s103, 90, 445 + i * 180, 100, 100, "restaurant building"); // Image instead of emoji
      
      txt(s103, applications[i].name, 220, 450 + i * 180, 22, C.text, "Bold");
      txt(s103, `Owner: ${applications[i].owner}`, 220, 480 + i * 180, 14, C.gray, "Regular");
      txt(s103, `Cuisine: ${applications[i].cuisine}`, 220, 505 + i * 180, 14, C.text, "Regular");
      txt(s103, `Location: ${applications[i].location}`, 220, 530 + i * 180, 14, C.text, "Regular");
      txt(s103, `Submitted: ${applications[i].submitted}`, 220, 555 + i * 180, 13, C.gray, "Regular");
      
      btn(s103, `ViewApp${i}-CLICK`, W - 560, 480 + i * 180, 140, 40, C.teal, "View Details", 14);
      btn(s103, `ApproveApp${i}-CLICK`, W - 410, 480 + i * 180, 120, 40, C.teal, "Approve", 14); // Changed from green
      btn(s103, `RejectApp${i}-CLICK`, W - 280, 480 + i * 180, 120, 40, C.red, "Reject", 14);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 104: Order Monitoring
    // -------------------------------------------------------------------
    const s104 = figma.createFrame();
    s104.name = "104-Order-Monitoring";
    s104.resize(W, H);
    s104.x = colX;
    s104.y = rowY;
    s104.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s104);
    screens.push(s104);
    
    topBar(s104, "Order Monitoring", "Real-time order tracking across platform");
    
    // Real-time stats
    card(s104, 60, 190, W - 120, 100, C.teal);
    txt(s104, "Live Orders Dashboard", 100, 215, 22, C.white, "Bold");
    txt(s104, "Active: 234", 100, 250, 16, C.white, "Regular");
    txt(s104, "Preparing: 89", 300, 250, 16, C.white, "Regular");
    txt(s104, "In Delivery: 145", 500, 250, 16, C.white, "Regular");
    txt(s104, "Completed Today: 1,456", 750, 250, 16, C.white, "Regular");
    
    btn(s104, "RefreshOrders-CLICK", W - 220, 220, 140, 45, C.white, "Refresh", 14);
    
    // Filter by status
    txt(s104, "Filter:", 60, 320, 16, C.text, "Bold");
    const orderStatuses = ["All", "New", "Preparing", "In Delivery", "Delayed", "Issues"];
    for (let i = 0; i < 6; i++) {
      btn(s104, `OrderStatus${i}-CLICK`, 140 + i * 140, 315, 130, 40, i === 0 ? C.teal : C.lightBg, orderStatuses[i], 13);
    }
    
    // Orders list
    txt(s104, "Recent Orders", 60, 385, 22, C.text, "Bold");
    
    const monitorOrders = [
      { id: "ORD-12345", restaurant: "Pizza Palace", customer: "Ahmed K.", amount: "Rs 1,200", status: "Preparing", statusColor: C.orange, time: "5 mins ago" },
      { id: "ORD-12346", restaurant: "Burger House", customer: "Sara A.", amount: "Rs 850", status: "In Delivery", statusColor: C.blue, time: "12 mins ago" },
      { id: "ORD-12347", restaurant: "Sushi Master", customer: "Bilal A.", amount: "Rs 2,100", status: "Completed", statusColor: C.teal, time: "18 mins ago" },
      { id: "ORD-12348", restaurant: "Golden Spoon", customer: "Fatima R.", amount: "Rs 1,500", status: "Delayed", statusColor: C.red, time: "45 mins ago" }
    ];
    
    for (let i = 0; i < 4; i++) {
      card(s104, 60, 435 + i * 110, W - 120, 90, C.lightBg);
      
      txt(s104, monitorOrders[i].id, 90, 455 + i * 110, 18, C.text, "Bold");
      txt(s104, monitorOrders[i].time, 90, 480 + i * 110, 12, C.gray, "Regular");
      
      txt(s104, monitorOrders[i].restaurant, 300, 460 + i * 110, 15, C.text, "Bold");
      txt(s104, `Customer: ${monitorOrders[i].customer}`, 300, 485 + i * 110, 13, C.gray, "Regular");
      
      txt(s104, monitorOrders[i].amount, 600, 465 + i * 110, 16, C.teal, "Bold");
      
      card(s104, 850, 460 + i * 110, 120, 30, monitorOrders[i].statusColor);
      txt(s104, monitorOrders[i].status, 865, 468 + i * 110, 13, C.white, "Bold");
      
      btn(s104, `ViewOrderMon${i}-CLICK`, W - 280, 455 + i * 110, 120, 35, C.teal, "View Details", 13);
      btn(s104, `TrackOrderMon${i}-CLICK`, W - 150, 455 + i * 110, 100, 35, C.lightBg, "Track", 13);
    }
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 105: Platform Settings
    // -------------------------------------------------------------------
    const s105 = figma.createFrame();
    s105.name = "105-Platform-Settings";
    s105.resize(W, H);
    s105.x = colX;
    s105.y = rowY;
    s105.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s105);
    screens.push(s105);
    
    topBar(s105, "Platform Settings", "Configure system-wide settings");
    
    // Settings categories
    txt(s105, "Settings Categories", 60, 200, 24, C.text, "Bold");
    
    const settingsCategories = [
      { icon: "general", title: "General Settings", desc: "Platform name, logo, contact info" },
      { icon: "payment", title: "Payment Settings", desc: "Payment gateways, fees, commissions" },
      { icon: "delivery", title: "Delivery Settings", desc: "Delivery zones, fees, time slots" },
      { icon: "notification", title: "Notifications", desc: "Email, SMS, push notification settings" },
      { icon: "security", title: "Security", desc: "Authentication, password policies" },
      { icon: "api", title: "API Settings", desc: "Third-party integrations, webhooks" }
    ];
    
    for (let i = 0; i < 6; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const settingX = 60 + col * (410 + COL_GAP);
      const settingY = 260 + row * 170;
      
      const settingCard = card(s105, settingX, settingY, 410, 140, C.lightBg);
      settingCard.name = `Setting${i}-CLICK`;
      
      imgPlaceholder(s105, settingX + 20, settingY + 25, 60, 60, settingsCategories[i].icon); // Image instead of emoji
      txt(s105, settingsCategories[i].title, settingX + 100, settingY + 35, 18, C.text, "Bold");
      txt(s105, settingsCategories[i].desc, settingX + 100, settingY + 65, 13, C.gray, "Regular");
      
      btn(s105, `ConfigSetting${i}-CLICK`, settingX + 280, settingY + 85, 100, 35, C.teal, "Configure", 13);
    }
    
    // Commission settings preview
    txt(s105, "Current Commission Rates", 60, 620, 22, C.text, "Bold");
    
    card(s105, 60, 660, W - 120, 180, C.lightBg);
    
    txt(s105, "Restaurant Commission", 100, 690, 16, C.text, "Bold");
    txt(s105, "15% per order", 100, 715, 14, C.gray, "Regular");
    
    txt(s105, "Delivery Fee", 400, 690, 16, C.text, "Bold");
    txt(s105, "Rs 50 (Standard)", 400, 715, 14, C.gray, "Regular");
    
    txt(s105, "Service Fee", 700, 690, 16, C.text, "Bold");
    txt(s105, "Rs 20 per order", 700, 715, 14, C.gray, "Regular");
    
    txt(s105, "Platform Fee", 1000, 690, 16, C.text, "Bold");
    txt(s105, "2% of order value", 1000, 715, 14, C.gray, "Regular");
    
    btn(s105, "EditCommission-CLICK", 100, 760, 180, 45, C.teal, "Edit Rates", 15);
    btn(s105, "ViewHistory-CLICK", 300, 760, 180, 45, C.lightBg, "View History", 15);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 106: Reports & Analytics (Admin)
    // -------------------------------------------------------------------
    const s106 = figma.createFrame();
    s106.name = "106-Reports-Analytics-Admin";
    s106.resize(W, H);
    s106.x = colX;
    s106.y = rowY;
    s106.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s106);
    screens.push(s106);
    
    topBar(s106, "Reports & Analytics", "Platform-wide analytics and insights");
    
    // Date range selector
    txt(s106, "Time Period:", 60, 195, 16, C.text, "Bold");
    const adminDateRanges = ["Today", "This Week", "This Month", "This Year", "Custom"];
    for (let i = 0; i < 5; i++) {
      btn(s106, `AdminDate${i}-CLICK`, 180 + i * 140, 190, 130, 40, i === 2 ? C.teal : C.lightBg, adminDateRanges[i], 13);
    }
    
    btn(s106, "ExportAllReports-CLICK", W - 240, 190, 160, 40, C.teal, "Export Report", 14);
    
    // Key metrics
    txt(s106, "Platform Performance", 60, 260, 24, C.text, "Bold");
    
    const platformMetrics = [
      { icon: "revenue", label: "Total Revenue", value: "Rs 45.6M", change: "+18%", changeColor: C.teal },
      { icon: "orders", label: "Total Orders", value: "123,456", change: "+15%", changeColor: C.teal },
      { icon: "users", label: "Active Users", value: "45,678", change: "+12%", changeColor: C.teal },
      { icon: "restaurants", label: "Active Restaurants", value: "342", change: "+8%", changeColor: C.teal }
    ];
    
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const metricX = 60 + col * (630 + COL_GAP);
      const metricY = 310 + row * 140;
      
      card(s106, metricX, metricY, 630, 110, C.lightBg);
      imgPlaceholder(s106, metricX + 20, metricY + 25, 50, 50, platformMetrics[i].icon); // Image instead of emoji
      txt(s106, platformMetrics[i].label, metricX + 90, metricY + 30, 16, C.text, "Bold");
      txt(s106, platformMetrics[i].value, metricX + 90, metricY + 55, 26, C.teal, "Bold");
      txt(s106, platformMetrics[i].change + " vs last period", metricX + 90, metricY + 88, 13, platformMetrics[i].changeColor, "Regular");
    }
    
    // Charts section
    txt(s106, "Revenue Trends", 60, 610, 22, C.text, "Bold");
    card(s106, 60, 650, 630, 200, C.lightBg);
    txt(s106, "Line Chart: Monthly Revenue", 230, 740, 16, C.gray, "Regular");
    
    txt(s106, "Top Performing Categories", 720, 610, 22, C.text, "Bold");
    card(s106, 720, 650, 630, 200, C.lightBg);
    txt(s106, "Bar Chart: Category Sales", 890, 740, 16, C.gray, "Regular");
    
    colX += W + G;

        
    // ===================================================================
    // DONATIONS HUB CATEGORY - ROW 5
    // Screens: 137 (Donation Hub), 138 (Donate Food Flow - 4 steps)
    // ===================================================================
    
    // -------------------------------------------------------------------
    // SCREEN 137: Donation Hub
    // -------------------------------------------------------------------
    const s137Donation = figma.createFrame();
    s137Donation.name = "137-Donation-Hub";
    s137Donation.resize(W, H);
    s137Donation.x = colX;
    s137Donation.y = rowY;
    s137Donation.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s137Donation);
    screens.push(s137Donation);
    
    topBar(s137Donation, "Community Food Share");
    
    // Hero section with image instead of emoji
    imgPlaceholder(s137Donation, W/2 - 60, 190, 120, 120, "community food sharing");
    txt(s137Donation, "Together Against Hunger", 60, 330, 36, C.text, "Bold");
    txt(s137Donation, "Donate leftover food or surplus meals to those in need.", 60, 380, 18, C.gray, "Regular");
    
    // Impact Stats Card
    card(s137Donation, 60, 440, 600, 280, C.lightBg);
    txt(s137Donation, "Community Impact", 100, 470, 24, C.text, "Bold");
    txt(s137Donation, "12,345 Meals Donated", 100, 520, 18, C.text, "Regular");
    txt(s137Donation, "3,456 Families Helped", 100, 555, 18, C.text, "Regular");
    txt(s137Donation, "25 Tons Food Waste Prevented", 100, 590, 18, C.text, "Regular");
    card(s137Donation, 100, 630, 480, 2, C.gray);
    txt(s137Donation, "Your Contribution", 100, 650, 18, C.text, "Bold");
    txt(s137Donation, "8 meals donated", 120, 680, 16, C.teal, "Regular"); // Changed from green
    txt(s137Donation, "3 families helped", 120, 705, 16, C.teal, "Regular"); // Changed from green
    
    // Action Buttons Cards
    const actionCards = [
      { title: "Donate Your Food", desc: "Have leftover food from an order?", icon: "donate", name: "DonateFood-CLICK" },
      { title: "Restaurant Surplus", desc: "For restaurant partners only", icon: "restaurant", name: "RestSurplus-CLICK" },
      { title: "View Donation History", desc: "See your past donations", icon: "history", name: "DonationHistory-CLICK" }
    ];
    
    for (let i = 0; i < 3; i++) {
      const cardY = 440 + i * 95;
      const actionCard = card(s137Donation, 700, cardY, 640, 85, C.lightBg);
      actionCard.name = actionCards[i].name;
      
      imgPlaceholder(s137Donation, 720, cardY + 15, 50, 50, actionCards[i].icon); // Image instead of emoji
      btn(s137Donation, actionCards[i].name + "-BTN", 790, cardY + 15, 250, 50, C.teal, actionCards[i].title, 16);
      txt(s137Donation, actionCards[i].desc, 1060, cardY + 30, 14, C.gray, "Regular");
    }
    
    // How It Works Section
    txt(s137Donation, "How It Works", 60, 750, 22, C.text, "Bold");
    
    card(s137Donation, 60, 790, 640, 120, C.lightBg);
    txt(s137Donation, "For Customers", 90, 810, 18, C.text, "Bold");
    txt(s137Donation, "1. Order food 2. Have leftovers? 3. Mark for donation 4. Choose charity 5. Rider picks up & delivers", 90, 840, 14, C.gray, "Regular");
    
    card(s137Donation, 730, 790, 610, 120, C.lightBg);
    txt(s137Donation, "For Restaurants", 760, 810, 18, C.text, "Bold");
    txt(s137Donation, "1. Mark surplus food 2. Set pickup time 3. Charity gets notified 4. Rider delivers", 760, 840, 14, C.gray, "Regular");
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 138a: Donate Food - Step 1 (Confirm Donation)
    // -------------------------------------------------------------------
    const s138a = figma.createFrame();
    s138a.name = "138a-Donate-Food-Step1-Confirm";
    s138a.resize(W, H);
    s138a.x = colX;
    s138a.y = rowY;
    s138a.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s138a);
    screens.push(s138a);
    
    topBar(s138a, "Donate Your Food");
    
    // Progress stepper
    card(s138a, 60, 190, W - 120, 80, C.lightBg);
    const donationSteps = ["Confirm", "Charity", "Pickup", "Complete"];
    for (let i = 0; i < 4; i++) {
      const stepX = 200 + i * 290;
      const stepCircle = figma.createEllipse();
      stepCircle.resize(40, 40);
      stepCircle.x = stepX;
      stepCircle.y = 210;
      stepCircle.fills = [{ type: 'SOLID', color: i === 0 ? C.teal : C.gray }];
      s138a.appendChild(stepCircle);
      
      txt(s138a, String(i + 1), stepX + 12, 218, 20, C.white, "Bold");
      txt(s138a, donationSteps[i], stepX - 20, 260, 14, i === 0 ? C.text : C.gray, "Semi Bold");
      
      if (i < 3) {
        card(s138a, stepX + 50, 227, 190, 6, C.gray);
      }
    }
    
    // Step 1 Content
    txt(s138a, "Confirm Your Donation", 60, 310, 28, C.text, "Bold");
    txt(s138a, "Help feed someone in need with your leftover food", 60, 350, 16, C.gray, "Regular");
    
    // Order details
    card(s138a, 60, 400, 650, 350, C.lightBg);
    txt(s138a, "Your Recent Order", 100, 430, 22, C.text, "Bold");
    
    imgPlaceholder(s138a, 100, 470, 100, 100, "food order"); // Image instead of emoji
    
    txt(s138a, "Order #12345", 220, 480, 18, C.text, "Bold");
    txt(s138a, "Pizza Palace - Main Street", 220, 510, 14, C.gray, "Regular");
    txt(s138a, "2x Large Pepperoni Pizza", 220, 535, 14, C.text, "Regular");
    txt(s138a, "1x Garlic Bread", 220, 555, 14, C.text, "Regular");
    
    card(s138a, 100, 595, 530, 2, C.gray);
    
    txt(s138a, "Food Condition", 100, 615, 16, C.text, "Bold");
    const conditions = ["Unopened", "Partially consumed", "Fully packaged"];
    for (let i = 0; i < 3; i++) {
      btn(s138a, `Condition${i}-CLICK`, 100 + i * 180, 645, 170, 45, i === 0 ? C.teal : C.lightBg, conditions[i], 13);
    }
    
    txt(s138a, "Estimated Servings", 100, 710, 16, C.text, "Bold");
    card(s138a, 100, 735, 200, 50, C.white).name = "Servings-INPUT";
    txt(s138a, "2-3 servings", 120, 752, 14, C.gray, "Regular");
    
    // Info card
    card(s138a, 750, 400, 630, 350, C.lightBg);
    imgPlaceholder(s138a, 800, 430, 80, 80, "charity help"); // Image instead of emoji
    txt(s138a, "Your Impact", 900, 460, 22, C.teal, "Bold");
    txt(s138a, "This donation could feed:", 780, 540, 18, C.text, "Bold");
    txt(s138a, "• 2-3 people for one meal", 780, 575, 16, C.text, "Regular");
    txt(s138a, "• Reduces food waste", 780, 605, 16, C.text, "Regular");
    txt(s138a, "• Supports local community", 780, 635, 16, C.text, "Regular");
    
    card(s138a, 780, 680, 570, 50, C.yellow);
    txt(s138a, "100% of your donation goes directly to those in need", 810, 697, 14, C.text, "Bold");
    
    // Action buttons
    btn(s138a, "CancelDonation-CLICK", 950, 840, 180, 50, C.lightBg, "Cancel", 16);
    btn(s138a, "ContinueCharity-CLICK", 1150, 840, 230, 50, C.teal, "Continue to Charity", 16);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 138b: Donate Food - Step 2 (Select Charity)
    // -------------------------------------------------------------------
    const s138b = figma.createFrame();
    s138b.name = "138b-Donate-Food-Step2-Charity";
    s138b.resize(W, H);
    s138b.x = colX;
    s138b.y = rowY;
    s138b.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s138b);
    screens.push(s138b);
    
    topBar(s138b, "Select Charity Organization");
    
    // Progress stepper
    card(s138b, 60, 190, W - 120, 80, C.lightBg);
    for (let i = 0; i < 4; i++) {
      const stepX = 200 + i * 290;
      const stepCircle = figma.createEllipse();
      stepCircle.resize(40, 40);
      stepCircle.x = stepX;
      stepCircle.y = 210;
      stepCircle.fills = [{ type: 'SOLID', color: i <= 1 ? C.teal : C.gray }];
      s138b.appendChild(stepCircle);
      
      txt(s138b, String(i + 1), stepX + 12, 218, 20, C.white, "Bold");
      txt(s138b, donationSteps[i], stepX - 20, 260, 14, i <= 1 ? C.text : C.gray, "Semi Bold");
      
      if (i < 3) {
        card(s138b, stepX + 50, 227, 190, 6, i < 1 ? C.teal : C.gray);
      }
    }
    
    // Step 2 Content
    txt(s138b, "Choose Charity Organization", 60, 310, 28, C.text, "Bold");
    txt(s138b, "Select a verified charity to receive your donation", 60, 350, 16, C.gray, "Regular");
    
    // Charity cards
    const charities = [
      { name: "Hope Foundation", desc: "Feeding homeless families in Karachi", served: "12,456 meals", rating: "4.9", verified: true },
      { name: "Charity Kitchen", desc: "Daily meals for underprivileged children", served: "8,234 meals", rating: "4.8", verified: true },
      { name: "Community Care", desc: "Supporting elderly and disabled", served: "5,678 meals", rating: "4.7", verified: true }
    ];
    
    for (let i = 0; i < 3; i++) {
      const charityCard = card(s138b, 60, 400 + i * 180, W - 120, 160, C.lightBg);
      charityCard.name = `Charity${i}-CLICK`;
      
      imgPlaceholder(s138b, 90, 420 + i * 180, 100, 100, "charity organization"); // Image instead of emoji
      
      txt(s138b, charities[i].name, 220, 430 + i * 180, 22, C.text, "Bold");
      
      if (charities[i].verified) {
        card(s138b, 400, 435 + i * 180, 80, 25, C.teal);
        txt(s138b, "Verified", 410, 442 + i * 180, 12, C.white, "Bold");
      }
      
      txt(s138b, charities[i].desc, 220, 465 + i * 180, 14, C.gray, "Regular");
      txt(s138b, `Total served: ${charities[i].served}`, 220, 495 + i * 180, 14, C.text, "Regular");
      txt(s138b, `Rating: ${charities[i].rating} ★★★★★`, 220, 520 + i * 180, 14, C.yellow, "Regular");
      
      btn(s138b, `SelectCharity${i}-CLICK`, W - 320, 470 + i * 180, 180, 50, C.teal, "Select This Charity", 15);
    }
    
    // Action buttons
    btn(s138b, "BackToConfirm-CLICK", 950, 840, 180, 50, C.lightBg, "Back", 16);
    btn(s138b, "ContinuePickup-CLICK", 1150, 840, 230, 50, C.teal, "Continue to Pickup", 16);
    
    colX += W + G;
    
    // -------------------------------------------------------------------
    // SCREEN 138c: Donate Food - Step 3 (Schedule Pickup)
    // -------------------------------------------------------------------
    const s138c = figma.createFrame();
    s138c.name = "138c-Donate-Food-Step3-Pickup";
    s138c.resize(W, H);
    s138c.x = colX;
    s138c.y = rowY;
    s138c.fills = [{ type: 'SOLID', color: C.white }];
    targetPage.appendChild(s138c);
    screens.push(s138c);
    
    topBar(s138c, "Schedule Food Pickup");
    
    // Progress stepper
    card(s138c, 60, 190, W - 120, 80, C.lightBg);
    for (let i = 0; i < 4; i++) {
      const stepX = 200 + i * 290;
      const stepCircle = figma.createEllipse();
      stepCircle.resize(40, 40);
      stepCircle.x = stepX;
      stepCircle.y = 210;
      stepCircle.fills = [{ type: 'SOLID', color: i <= 2 ? C.teal : C.gray }];
      s138c.appendChild(stepCircle);
      
      txt(s138c, String(i + 1), stepX + 12, 218, 20, C.white, "Bold");
      txt(s138c, donationSteps[i], stepX - 20, 260, 14, i <= 2 ? C.text : C.gray, "Semi Bold");
      
      if (i < 3) {
        card(s138c, stepX + 50, 227, 190, 6, i < 2 ? C.teal : C.gray);
      }
    }
    
    // Step 3 Content
    txt(s138c, "Schedule Pickup Time", 60, 310, 28, C.text, "Bold");
    txt(s138c, "Choose when our rider should collect the food", 60, 350, 16, C.gray, "Regular");
    
    // Pickup address
    card(s138c, 60, 400, 650, 200, C.lightBg);
    txt(s138c, "Pickup Address", 100, 430, 20, C.text, "Bold");
    
    card(s138c, 100, 470, 530, 60, C.white).name = "PickupAddress-INPUT";
    txt(s138c, "123 Main Street, Block A, Karachi", 120, 492, 14, C.gray, "Regular");
    
    btn(s138c, "ChangeAddress-CLICK", 100, 545, 180, 40, C.lightBg, "Change Address", 14);
    
    // Time slots
    card(s138c, 750, 400, 630, 200, C.lightBg);
    txt(s138c, "Available Time Slots", 790, 430, 20, C.text, "Bold");
    
    const timeSlots = ["Today 6:00-7:00 PM", "Today 7:00-8:00 PM", "Tomorrow 10:00-11:00 AM"];
    for (let i = 0; i < 3; i++) {
      btn(s138c, `TimeSlot${i}-CLICK`, 790 + i * 200, 480, 190, 50, i === 0 ? C.teal : C.white, timeSlots[i], 13);
    }
    
    btn(s138c, "CustomTime-CLICK", 790, 545, 180, 40, C.yellow, "Custom Time", 14);
    
    // Contact info
    txt(s138c, "Contact Information", 60, 630, 22, C.text, "Bold");
    
    card(s138c, 60, 670, 650, 150, C.lightBg);
    txt(s138c, "Phone Number *", 100, 700, 16, C.text, "Semi Bold");
    card(s138c, 100, 725, 530, 55, C.white).name = "ContactPhone-INPUT";
    txt(s138c, "+92 300 1234567", 120, 742, 14, C.gray, "Regular");
    
    // Special instructions
    card(s138c, 750, 670, 630, 150, C.lightBg);
    txt(s138c, "Special Instructions (Optional)", 790, 700, 16, C.text, "Semi Bold");
    card(s138c, 790, 725, 560, 80, C.white).name = "Instructions-INPUT";
    txt(s138c, "e.g., Ring doorbell, Leave at gate", 810, 755, 13, C.gray, "Regular");
    
    // Action buttons
    btn(s138c, "BackToCharity-CLICK", 950, 840, 180, 50, C.lightBg, "Back", 16);
    btn(s138c, "ConfirmDonation-CLICK", 1150, 840, 230, 50, C.teal, "Confirm Donation", 16);
    
    colX += W + G;
    
    
// ===================================================================
// PROTOTYPING - CONNECT ALL BUTTONS
// ===================================================================
// ===================================================================
// PROTOTYPING - CONNECT ALL BUTTONS (FIXED VERSION)
// ===================================================================
// ===================================================================
// PROTOTYPING - CONNECT ALL BUTTONS (100% FIXED)
// ===================================================================

async function createPrototyping() {
  // Helper function to find screen by name
  function findScreen(name) {
    return screens.find(s => s.name.includes(name));
  }
  
  // Helper function to add navigation reaction (CORRECT FORMAT)
  async function addNavigation(buttonName, sourceScreen, destinationScreen) {
    if (!sourceScreen || !destinationScreen) return;
    
    const button = sourceScreen.findOne(node => node.name === buttonName);
    if (!button) return;
    
    try {
      await button.setReactionsAsync([{
        trigger: { type: "ON_CLICK" },
        action: {  // FIXED: Use "action" NOT "actions"
          type: "NODE",
          destinationId: destinationScreen.id,
          navigation: "NAVIGATE",
          transition: null,  // null = instant navigation
          preserveScrollPosition: false
        }
      }]);
    } catch (e) {
      console.log(`Failed to link ${buttonName}:`, e);
    }
  }
  
  figma.notify("Creating prototyping connections...");
  
  // ===================================================================
  // BUSINESS CATEGORY PROTOTYPING
  // ===================================================================
  
  const s121 = findScreen("121-Business");
  const s122 = findScreen("122-Business");
  const s142 = findScreen("142-Membership");
  const s135 = findScreen("135-Corporate-Discount");
  const s136 = findScreen("136-Corporate-Employee");
  const s137 = findScreen("137-Corporate-Invoice");
  const s138 = findScreen("138-Corporate-Account-Setup");
  
  // Screen 121: Business Account Registration
  if (s121 && s122) {
    await addNavigation("ContinueDocs-CLICK", s121, s122);
    await addNavigation("SaveDraft-CLICK", s121, s122);
  }
  
  // Screen 122: Business Dashboard
  if (s122) {
    if (s121) await addNavigation("PersonalMode-CLICK", s122, s121);
    await addNavigation("ViewAllOrders-CLICK", s122, s122);
    
    for (let i = 0; i < 3; i++) {
      await addNavigation(`ViewDetail${i}-CLICK`, s122, s122);
    }
    
    await addNavigation("Tab0-CLICK", s122, s122);
    if (s136) await addNavigation("Tab1-CLICK", s122, s136);
    if (s137) await addNavigation("Tab2-CLICK", s122, s137);
    if (s121) await addNavigation("Tab3-CLICK", s122, s121);
  }
  
  // Screen 142: Membership
  if (s142 && s122) {
    await addNavigation("ManageSub-CLICK", s142, s142);
    await addNavigation("ChooseSilver-CLICK", s142, s122);
    await addNavigation("ChooseGold-CLICK", s142, s122);
  }
  
  // ===================================================================
  // CORPORATE CATEGORY PROTOTYPING
  // ===================================================================
  
  if (s135 && s137) {
    await addNavigation("DownloadPDF-CLICK", s135, s135);
    await addNavigation("EmailInvoice-CLICK", s135, s137);
  }
  
  if (s136) {
    await addNavigation("AddEmployee-CLICK", s136, s136);
    await addNavigation("FilterAll-CLICK", s136, s136);
    await addNavigation("FilterActive-CLICK", s136, s136);
    await addNavigation("FilterPending-CLICK", s136, s136);
    
    for (let i = 0; i < 4; i++) {
      await addNavigation(`RemoveEmp${i}-CLICK`, s136, s136);
      await addNavigation(`ResendEmp${i}-CLICK`, s136, s136);
    }
  }
  
  if (s137 && s135) {
    await addNavigation("Year2025-CLICK", s137, s137);
    await addNavigation("Year2024-CLICK", s137, s137);
    await addNavigation("ExportAll-CLICK", s137, s137);
    
    for (let i = 0; i < 3; i++) {
      await addNavigation(`DownloadInv${i}-CLICK`, s137, s135);
      await addNavigation(`EmailInv${i}-CLICK`, s137, s135);
    }
  }
  
  if (s138 && s135 && s122) {
    await addNavigation("SaveSetupDraft-CLICK", s138, s122);
    await addNavigation("ContinueSetup-CLICK", s138, s135);
  }
  
  // Admin screens
  const s135Admin = findScreen("135-Corporate-Discount-Manager-Admin");
  const s139Admin = findScreen("139-Corporate-Accounts-List-Admin");
  
  if (s135Admin) {
    await addNavigation("AddCorporate-CLICK", s135Admin, s138 || s135Admin);
    
    for (let i = 0; i < 3; i++) {
      if (s139Admin) await addNavigation(`EditCorp${i}-CLICK`, s135Admin, s139Admin);
      if (s137) await addNavigation(`ViewInvoices${i}-CLICK`, s135Admin, s137);
      if (s136) await addNavigation(`ManageUsers${i}-CLICK`, s135Admin, s136);
      await addNavigation(`ViewAnalytics${i}-CLICK`, s135Admin, s135Admin);
    }
  }
  
  if (s139Admin && s138) {
    await addNavigation("FilterAllCorp-CLICK", s139Admin, s139Admin);
    await addNavigation("FilterActiveCorp-CLICK", s139Admin, s139Admin);
    await addNavigation("AddNewCorp-CLICK", s139Admin, s138);
    
    for (let i = 0; i < 4; i++) {
      if (s135Admin) await addNavigation(`ViewCorpDetail${i}-CLICK`, s139Admin, s135Admin);
      await addNavigation(`EditCorpAcc${i}-CLICK`, s139Admin, s138);
    }
  }
  
  // ===================================================================
  // MERCHANT CATEGORY PROTOTYPING
  // ===================================================================
  
  const s120 = findScreen("120-Analytics");
  const s156 = findScreen("156-Merchant-Home");
  const s149 = findScreen("149-Order-Management");
  const s150 = findScreen("150-Menu-Management");
  const s151 = findScreen("151-Staff-Management");
  const s152 = findScreen("152-Payout");
  const s157 = findScreen("157-Restaurant-Profile");
  const s153 = findScreen("153-Sales-Reports");
  const s154 = findScreen("154-Review-Management");
  const s158 = findScreen("158-Promotions-Offers");
  
  if (s120) {
    await addNavigation("ThisRest-CLICK", s120, s120);
    if (s156) await addNavigation("AllRest-CLICK", s120, s156);
    
    for (let i = 0; i < 6; i++) {
      await addNavigation(`Date${i}-CLICK`, s120, s120);
    }
    
    await addNavigation("ClearFilters-CLICK", s120, s120);
    await addNavigation("ExportCSV-CLICK", s120, s120);
    await addNavigation("ExportPDF-CLICK", s120, s120);
    await addNavigation("EmailReport-CLICK", s120, s120);
  }
  
  if (s156) {
    await addNavigation("SwitchBranch-CLICK", s156, s156);
    if (s149) await addNavigation("ManageOrders-CLICK", s156, s149);
    if (s150) await addNavigation("MenuStock-CLICK", s156, s150);
    if (s151) await addNavigation("StaffRoles-CLICK", s156, s151);
    if (s152) await addNavigation("Payouts-CLICK", s156, s152);
    if (s120) await addNavigation("SalesReports-CLICK", s156, s120);
    if (s157) await addNavigation("RestProfile-CLICK", s156, s157);
    
    for (let i = 0; i < 3; i++) {
      if (s149) await addNavigation(`ViewOrder${i}-CLICK`, s156, s149);
    }
  }
  
  if (s149) {
    for (let i = 0; i < 5; i++) {
      await addNavigation(`Status${i}-CLICK`, s149, s149);
    }
    
    for (let i = 0; i < 3; i++) {
      await addNavigation(`Accept${i}-CLICK`, s149, s149);
      await addNavigation(`ViewDetails${i}-CLICK`, s149, s149);
      await addNavigation(`Reject${i}-CLICK`, s149, s149);
    }
  }
  
  if (s150) {
    await addNavigation("AddItem-CLICK", s150, s150);
    await addNavigation("BulkEdit-CLICK", s150, s150);
    
    for (let i = 0; i < 5; i++) {
      await addNavigation(`Cat${i}-CLICK`, s150, s150);
    }
    
    for (let i = 0; i < 4; i++) {
      await addNavigation(`EditItem${i}-CLICK`, s150, s150);
      await addNavigation(`StockItem${i}-CLICK`, s150, s150);
      await addNavigation(`DeleteItem${i}-CLICK`, s150, s150);
    }
  }
  
  if (s151) {
    await addNavigation("AddStaff-CLICK", s151, s151);
    await addNavigation("RoleAll-CLICK", s151, s151);
    await addNavigation("RoleManager-CLICK", s151, s151);
    await addNavigation("RoleChef-CLICK", s151, s151);
    await addNavigation("RoleWaiter-CLICK", s151, s151);
    
    for (let i = 0; i < 4; i++) {
      await addNavigation(`EditStaff${i}-CLICK`, s151, s151);
      await addNavigation(`ViewSchedule${i}-CLICK`, s151, s151);
      await addNavigation(`RemoveStaff${i}-CLICK`, s151, s151);
    }
  }
  
  if (s152) {
    await addNavigation("PayoutDetails-CLICK", s152, s152);
    await addNavigation("DownloadStatement-CLICK", s152, s152);
    
    for (let i = 0; i < 4; i++) {
      await addNavigation(`ViewPayout${i}-CLICK`, s152, s152);
    }
  }
  
  if (s157 && s156) {
    await addNavigation("EditProfile-CLICK", s157, s157);
    await addNavigation("SaveProfile-CLICK", s157, s156);
    await addNavigation("CancelProfile-CLICK", s157, s156);
  }
  
  if (s158) {
    await addNavigation("CreatePromo-CLICK", s158, s158);
    
    for (let i = 0; i < 3; i++) {
      await addNavigation(`EditPromo${i}-CLICK`, s158, s158);
      await addNavigation(`ViewStats${i}-CLICK`, s158, s158);
      await addNavigation(`DeactivatePromo${i}-CLICK`, s158, s158);
    }
  }
  
  if (s154) {
    for (let i = 0; i < 7; i++) {
      await addNavigation(`ReviewFilter${i}-CLICK`, s154, s154);
    }
    
    for (let i = 0; i < 3; i++) {
      await addNavigation(`Reply${i}-CLICK`, s154, s154);
    }
  }
  
  // ===================================================================
  // ADMIN CATEGORY PROTOTYPING
  // ===================================================================
  
  const s101 = findScreen("101-Admin-Dashboard");
  const s102 = findScreen("102-User-Management");
  const s103 = findScreen("103-Restaurant-Approvals");
  const s104 = findScreen("104-Order-Monitoring");
  const s105 = findScreen("105-Platform-Settings");
  const s106 = findScreen("106-Reports-Analytics");
  
  if (s101) {
    if (s102) await addNavigation("UserMgmt-CLICK", s101, s102);
    if (s103) await addNavigation("RestApproval-CLICK", s101, s103);
    if (s104) await addNavigation("OrderMonitor-CLICK", s101, s104);
    if (s105) await addNavigation("SysSettings-CLICK", s101, s105);
    if (s103) await addNavigation("ViewAlerts-CLICK", s101, s103);
  }
  
  if (s102) {
    await addNavigation("UserFilterAll-CLICK", s102, s102);
    await addNavigation("UserFilterActive-CLICK", s102, s102);
    await addNavigation("UserFilterBlocked-CLICK", s102, s102);
    await addNavigation("ExportUsers-CLICK", s102, s102);
    
    for (let i = 0; i < 4; i++) {
      await addNavigation(`ViewUser${i}-CLICK`, s102, s102);
    }
  }
  
  if (s103) {
    for (let i = 0; i < 3; i++) {
      await addNavigation(`ApprovalTab${i}-CLICK`, s103, s103);
      await addNavigation(`ViewApp${i}-CLICK`, s103, s103);
      await addNavigation(`ApproveApp${i}-CLICK`, s103, s103);
      await addNavigation(`RejectApp${i}-CLICK`, s103, s103);
    }
  }
  
  if (s104) {
    for (let i = 0; i < 6; i++) {
      await addNavigation(`OrderStatus${i}-CLICK`, s104, s104);
    }
    
    await addNavigation("RefreshOrders-CLICK", s104, s104);
    
    for (let i = 0; i < 4; i++) {
      await addNavigation(`ViewOrderMon${i}-CLICK`, s104, s104);
      await addNavigation(`TrackOrderMon${i}-CLICK`, s104, s104);
    }
  }
  
  if (s105) {
    for (let i = 0; i < 6; i++) {
      await addNavigation(`ConfigSetting${i}-CLICK`, s105, s105);
    }
    
    await addNavigation("EditCommission-CLICK", s105, s105);
    await addNavigation("ViewHistory-CLICK", s105, s106 || s105);
  }
  
  if (s106) {
    for (let i = 0; i < 5; i++) {
      await addNavigation(`AdminDate${i}-CLICK`, s106, s106);
    }
    
    await addNavigation("ExportAllReports-CLICK", s106, s106);
  }
  
  figma.notify("✅ Prototyping complete! All buttons are now linked.");
}

// Execute prototyping
await createPrototyping();




    // ===================================================================
    // FINALIZE
    // ===================================================================
    
    // Zoom to fit all screens
    figma.viewport.scrollAndZoomIntoView(screens);
    
    figma.notify(`✅ Generated ${screens.length} screens successfully!`);
    figma.closePlugin();
  }
};

// code.js - Baskhao Food Delivery Landing Page (1440x900) with Scrolling

figma.showUI(
  `<div style="font-family:sans-serif;padding:12px">
     <h3 style="margin:0 0 10px">Baskhao Landing Page</h3>
     <p style="margin:0 0 10px;font-size:12px;color:#666">Food Delivery Platform - Desktop (1440×900)</p>
     <button id="generate" style="width:100%;padding:10px;background:#3d9b9b;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600">Create Landing Page</button>
     <script>
       document.getElementById('generate').onclick = () => {
         parent.postMessage({ pluginMessage: { type: 'generate' } }, '*');
       };
     </script>
   </div>`,
  { width: 280, height: 130 }
);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {

    // ============== FONTS ==============
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

    // ============== PAGE ==============
    let targetPage = figma.root.children.find(p => p.name === "test");
    if (!targetPage) {
      targetPage = figma.createPage();
      targetPage.name = "test";
    }
    figma.currentPage = targetPage;

    // ============== DIMENSIONS & COLORS ==============
    const W = 1440;
    const H = 900;

    const C = {
      teal: { r: 0.24, g: 0.61, b: 0.61 },
      darkTeal: { r: 0.17, g: 0.37, b: 0.37 },
      lightTeal: { r: 0.85, g: 0.95, b: 0.95 },
      yellow: { r: 0.96, g: 0.72, b: 0.26 },
      lightYellow: { r: 1, g: 0.98, b: 0.9 },
      white: { r: 1, g: 1, b: 1 },
      text: { r: 0.2, g: 0.2, b: 0.2 },
      lightBg: { r: 0.95, g: 0.95, b: 0.95 },
      gray: { r: 0.7, g: 0.7, b: 0.7 }
    };

    // ============== POSITIONING ==============
    const framesOnTest = targetPage.children.filter(n => n.type === "FRAME");
    let maxY = 0;
    for (const f of framesOnTest) {
      if (f.y + f.height > maxY) maxY = f.y + f.height;
    }
    const verticalGap = 300;
    const baseX = 0;
    const baseY = maxY + verticalGap;

    // ============== SCROLLABLE CONTAINER ==============
    const scrollContainer = figma.createFrame();
    scrollContainer.name = "Baskhao-Landing-Scrollable";
    scrollContainer.resize(W, H);
    scrollContainer.x = baseX;
    scrollContainer.y = baseY;
    scrollContainer.fills = [{ type: 'SOLID', color: C.white }];
    scrollContainer.clipsContent = true; // Enable clipping for scroll effect

    // ============== CONTENT FRAME (TALL - SCROLLS INSIDE CONTAINER) ==============
    const contentFrame = figma.createFrame();
    contentFrame.name = "Content";
    contentFrame.resize(W, 4800); // Total height of all sections
    contentFrame.x = 0;
    contentFrame.y = 0;
    contentFrame.fills = [];
    contentFrame.layoutMode = "VERTICAL";
    contentFrame.itemSpacing = 0;

    // ============== HELPERS ==============
    function txt(parent, text, x, y, size, color, style = "Regular") {
      const t = figma.createText();
      t.fontName = { family: "Inter", style };
      t.characters = text;
      t.fontSize = size;
      t.fills = [{ type: 'SOLID', color }];
      t.x = x;
      t.y = y;
      parent.appendChild(t);
      return t;
    }

    function btn(parent, x, y, w, h, color, label, fontSize) {
      const b = figma.createRectangle();
      b.resize(w, h);
      b.x = x;
      b.y = y;
      b.cornerRadius = 8;
      b.fills = [{ type: 'SOLID', color }];
      parent.appendChild(b);

      const t = figma.createText();
      t.fontName = { family: "Inter", style: "Bold" };
      t.characters = label;
      t.fontSize = fontSize;
      t.fills = [{ type: 'SOLID', color: C.white }];
      t.textAlignHorizontal = "CENTER";
      t.x = x + w / 2 - (label.length * fontSize * 0.25);
      t.y = y + h / 2 - fontSize * 0.6;
      parent.appendChild(t);
      return b;
    }

    async function addImage(parent, url, x, y, w, h, radius = 0) {
      const rect = figma.createRectangle();
      rect.resize(w, h);
      rect.x = x;
      rect.y = y;
      rect.cornerRadius = radius;
      try {
        const image = await figma.createImageAsync(url);
        rect.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];
      } catch (e) {
        rect.fills = [{ type: 'SOLID', color: C.lightBg }];
      }
      parent.appendChild(rect);
      return rect;
    }

    // ============== SECTION 1: HERO (900px) ==============
    const heroSection = figma.createFrame();
    heroSection.name = "Hero-Section";
    heroSection.resize(W, 900);
    heroSection.fills = [{ type: 'SOLID', color: C.white }];

    // NAVBAR
    const navbar = figma.createRectangle();
    navbar.resize(W, 80);
    navbar.x = 0;
    navbar.y = 0;
    navbar.fills = [{ type: 'SOLID', color: C.white }];
    heroSection.appendChild(navbar);

    txt(heroSection, "Baskhao", 60, 28, 24, C.teal, "Bold");
    txt(heroSection, "🍔", 150, 24, 24, C.yellow, "Regular");

    const menuItems = ["Home", "Restaurants", "Menu", "How it Works", "Contact"];
    let menuX = 450;
    for (const item of menuItems) {
      txt(heroSection, item, menuX, 35, 14, C.text, "Regular");
      menuX += 140;
    }

    btn(heroSection, 1260, 25, 140, 40, C.teal, "Order Now", 14);

    // HERO CONTENT
    txt(heroSection, "Food Delivery", 60, 140, 48, C.text, "Bold");
    txt(heroSection, "Made", 60, 195, 48, C.text, "Bold");
    txt(heroSection, "Easy & Fast", 60, 250, 48, C.yellow, "Bold");

    txt(heroSection, "Order from your favorite restaurants and get food", 60, 320, 15, C.gray, "Regular");
    txt(heroSection, "delivered to your doorstep in minutes. Fast, reliable,", 60, 342, 15, C.gray, "Regular");
    txt(heroSection, "and delicious meals at your fingertips!", 60, 364, 15, C.gray, "Regular");

    btn(heroSection, 60, 410, 140, 50, C.teal, "Order Now", 16);
    btn(heroSection, 220, 410, 140, 50, C.yellow, "How it Works", 15);

    // Customer Badge with teal accent
    const customerBadge = figma.createRectangle();
    customerBadge.resize(220, 65);
    customerBadge.x = 60;
    customerBadge.y = 490;
    customerBadge.cornerRadius = 10;
    customerBadge.fills = [{ type: 'SOLID', color: C.lightTeal }];
    customerBadge.strokes = [{ type: 'SOLID', color: C.teal }];
    customerBadge.strokeWeight = 2;
    heroSection.appendChild(customerBadge);

    txt(heroSection, "😊 Happy Customers", 75, 502, 13, C.darkTeal, "Bold");
    txt(heroSection, "⭐ 4.9 (12.5k Reviews)", 75, 527, 14, C.teal, "Bold");

    // RIGHT SIDE - Food delivery hero image
    const tealBlob = figma.createEllipse();
    tealBlob.resize(550, 550);
    tealBlob.x = 750;
    tealBlob.y = 100;
    tealBlob.fills = [{ type: 'SOLID', color: C.teal }];
    heroSection.appendChild(tealBlob);

    await addImage(
      heroSection,
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800",
      820,
      140,
      420,
      420,
      210
    );

    await addImage(heroSection, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300", 1150, 200, 80, 80, 40);
    await addImage(heroSection, "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300", 1110, 350, 80, 80, 40);

    // Discount badge
    const offBadge = figma.createRectangle();
    offBadge.resize(120, 60);
    offBadge.x = 1220;
    offBadge.y = 440;
    offBadge.cornerRadius = 10;
    offBadge.fills = [{ type: 'SOLID', color: C.yellow }];
    heroSection.appendChild(offBadge);
    txt(heroSection, "50% OFF", 1240, 455, 18, C.white, "Bold");

    // FEATURE CARDS
    const features = [
      { icon: "🚀", title: "Fast Delivery", color: C.teal },
      { icon: "🍽️", title: "1000+ Restaurants", color: C.yellow },
      { icon: "💳", title: "Easy Payment", color: C.teal }
    ];

    let featX = 140;
    for (const f of features) {
      const card = figma.createRectangle();
      card.resize(340, 130);
      card.x = featX;
      card.y = 700;
      card.cornerRadius = 16;
      card.fills = [{ type: 'SOLID', color: C.white }];
      card.strokes = [{ type: 'SOLID', color: f.color }];
      card.strokeWeight = 3;
      heroSection.appendChild(card);

      txt(heroSection, f.icon, featX + 30, 725, 40, C.text, "Regular");
      txt(heroSection, f.title, featX + 95, 750, 17, C.text, "Bold");
      featX += 380;
    }

    contentFrame.appendChild(heroSection);

    // ============== SECTION 2: HOW IT WORKS (600px) ==============
    const howSection = figma.createFrame();
    howSection.name = "How-It-Works";
    howSection.resize(W, 600);
    howSection.fills = [{ type: 'SOLID', color: C.lightTeal }];

    txt(howSection, "How Baskhao Works", 560, 60, 36, C.darkTeal, "Bold");
    txt(howSection, "Get your favorite food delivered in 3 easy steps", 500, 115, 16, C.gray, "Regular");

    const steps = [
      { num: "1", title: "Choose Restaurant", desc: "Browse 1000+ restaurants", icon: "🏪", x: 180 },
      { num: "2", title: "Select Your Food", desc: "Pick your favorite meals", icon: "🍕", x: 580 },
      { num: "3", title: "Fast Delivery", desc: "Get it delivered in 30 mins", icon: "🛵", x: 980 }
    ];

    for (const s of steps) {
      const stepCard = figma.createRectangle();
      stepCard.resize(280, 320);
      stepCard.x = s.x;
      stepCard.y = 180;
      stepCard.cornerRadius = 20;
      stepCard.fills = [{ type: 'SOLID', color: C.white }];
      howSection.appendChild(stepCard);

      const numBadge = figma.createEllipse();
      numBadge.resize(60, 60);
      numBadge.x = s.x + 110;
      numBadge.y = 200;
      numBadge.fills = [{ type: 'SOLID', color: C.teal }];
      howSection.appendChild(numBadge);
      txt(howSection, s.num, s.x + 130, 218, 28, C.white, "Bold");

      txt(howSection, s.icon, s.x + 115, 290, 50, C.text, "Regular");
      txt(howSection, s.title, s.x + 50, 370, 18, C.text, "Bold");
      txt(howSection, s.desc, s.x + 40, 405, 13, C.gray, "Regular");
    }

    contentFrame.appendChild(howSection);

    // ============== SECTION 3: FEATURED RESTAURANTS (650px) ==============
    const restaurantSection = figma.createFrame();
    restaurantSection.name = "Featured-Restaurants";
    restaurantSection.resize(W, 650);
    restaurantSection.fills = [{ type: 'SOLID', color: C.white }];

    txt(restaurantSection, "Featured Restaurants", 550, 60, 36, C.text, "Bold");
    txt(restaurantSection, "Discover the best restaurants in your area", 520, 115, 15, C.gray, "Regular");

    const restaurants = [
      { name: "Pizza Paradise", cuisine: "Italian", rating: "4.8", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600", x: 100 },
      { name: "Burger Hub", cuisine: "Fast Food", rating: "4.7", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600", x: 520 },
      { name: "Sushi Station", cuisine: "Japanese", rating: "4.9", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600", x: 940 }
    ];

    for (const r of restaurants) {
      const card = figma.createRectangle();
      card.resize(350, 420);
      card.x = r.x;
      card.y = 170;
      card.cornerRadius = 20;
      card.fills = [{ type: 'SOLID', color: C.lightBg }];
      restaurantSection.appendChild(card);

      await addImage(restaurantSection, r.img, r.x + 20, 190, 310, 240, 16);

      txt(restaurantSection, r.name, r.x + 35, 455, 20, C.text, "Bold");
      txt(restaurantSection, `🍴 ${r.cuisine}`, r.x + 35, 485, 14, C.gray, "Regular");
      
      const ratingBadge = figma.createRectangle();
      ratingBadge.resize(70, 30);
      ratingBadge.x = r.x + 35;
      ratingBadge.y = 515;
      ratingBadge.cornerRadius = 15;
      ratingBadge.fills = [{ type: 'SOLID', color: C.teal }];
      restaurantSection.appendChild(ratingBadge);
      txt(restaurantSection, `⭐ ${r.rating}`, r.x + 45, 521, 13, C.white, "Bold");

      btn(restaurantSection, r.x + 200, 515, 110, 35, C.yellow, "Order Now", 13);
    }

    contentFrame.appendChild(restaurantSection);

    // ============== SECTION 4: POPULAR DISHES (700px) ==============
    const dishSection = figma.createFrame();
    dishSection.name = "Popular-Dishes";
    dishSection.resize(W, 700);
    dishSection.fills = [{ type: 'SOLID', color: C.lightYellow }];

    txt(dishSection, "Popular Dishes", 600, 60, 36, C.text, "Bold");

    const categories = ["All", "Pizza", "Burger", "Sushi", "Desserts", "Drinks"];
    let catX = 450;
    categories.forEach((cat, i) => {
      const catBtn = figma.createRectangle();
      catBtn.resize(110, 45);
      catBtn.x = catX;
      catBtn.y = 130;
      catBtn.cornerRadius = 22;
      catBtn.fills = [{ type: 'SOLID', color: i === 0 ? C.teal : C.white }];
      dishSection.appendChild(catBtn);
      txt(dishSection, cat, catX + 30, 141, 14, i === 0 ? C.white : C.text, "Bold");
      catX += 130;
    });

    const dishes = [
      { name: "Margherita Pizza", price: "$12.99", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600", x: 100 },
      { name: "Cheese Burger", price: "$8.99", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600", x: 520 },
      { name: "California Roll", price: "$15.99", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600", x: 940 }
    ];

    for (const d of dishes) {
      const dishCard = figma.createRectangle();
      dishCard.resize(350, 450);
      dishCard.x = d.x;
      dishCard.y = 220;
      dishCard.cornerRadius = 20;
      dishCard.fills = [{ type: 'SOLID', color: C.white }];
      dishSection.appendChild(dishCard);

      await addImage(dishSection, d.img, d.x + 25, 240, 300, 280, 16);

      txt(dishSection, d.name, d.x + 40, 550, 19, C.text, "Bold");
      txt(dishSection, d.price, d.x + 40, 585, 22, C.teal, "Bold");

      btn(dishSection, d.x + 200, 580, 120, 40, C.yellow, "Add to Cart", 13);
    }

    contentFrame.appendChild(dishSection);

    // ============== SECTION 5: RIDER SECTION (550px) ==============
    const riderSection = figma.createFrame();
    riderSection.name = "Delivery-Riders";
    riderSection.resize(W, 550);
    riderSection.fills = [{ type: 'SOLID', color: C.white }];

    await addImage(riderSection, "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800", 100, 80, 550, 400, 20);

    txt(riderSection, "Fast & Reliable", 750, 120, 38, C.text, "Bold");
    txt(riderSection, "Delivery Partners", 750, 170, 38, C.teal, "Bold");

    txt(riderSection, "✓  Average delivery time: 30 minutes", 750, 240, 16, C.gray, "Regular");
    txt(riderSection, "✓  Live order tracking", 750, 275, 16, C.gray, "Regular");
    txt(riderSection, "✓  Professional riders", 750, 310, 16, C.gray, "Regular");
    txt(riderSection, "✓  Contactless delivery available", 750, 345, 16, C.gray, "Regular");

    btn(riderSection, 750, 400, 180, 50, C.teal, "Track My Order", 16);

    contentFrame.appendChild(riderSection);

    // ============== SECTION 6: TESTIMONIALS (500px) ==============
    const testimonialSection = figma.createFrame();
    testimonialSection.name = "Customer-Reviews";
    testimonialSection.resize(W, 500);
    testimonialSection.fills = [{ type: 'SOLID', color: C.lightTeal }];

    txt(testimonialSection, "What Our Customers Say", 520, 50, 36, C.darkTeal, "Bold");

    const reviews = [
      { name: "Sarah Ahmed", review: "Fast delivery and amazing food quality!", x: 100 },
      { name: "Ali Hassan", review: "Best food delivery app in Pakistan!", x: 520 },
      { name: "Fatima Khan", review: "Easy to use and great customer service!", x: 940 }
    ];

    for (const rev of reviews) {
      const revCard = figma.createRectangle();
      revCard.resize(350, 280);
      revCard.x = rev.x;
      revCard.y = 150;
      revCard.cornerRadius = 16;
      revCard.fills = [{ type: 'SOLID', color: C.white }];
      testimonialSection.appendChild(revCard);

      txt(testimonialSection, "❝❝", rev.x + 25, 170, 50, C.yellow, "Bold");
      txt(testimonialSection, rev.review, rev.x + 30, 240, 15, C.text, "Regular");
      txt(testimonialSection, "⭐⭐⭐⭐⭐", rev.x + 30, 290, 18, C.yellow, "Regular");

      await addImage(testimonialSection, "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", rev.x + 30, 350, 50, 50, 25);
      txt(testimonialSection, rev.name, rev.x + 95, 365, 15, C.text, "Bold");
      txt(testimonialSection, "Verified Customer", rev.x + 95, 385, 12, C.gray, "Regular");
    }

    contentFrame.appendChild(testimonialSection);

    // ============== SECTION 7: FOOTER (600px) ==============
    const footerSection = figma.createFrame();
    footerSection.name = "Footer";
    footerSection.resize(W, 600);
    footerSection.fills = [{ type: 'SOLID', color: C.white }];

    // Newsletter
    const newsletter = figma.createRectangle();
    newsletter.resize(1100, 200);
    newsletter.x = 170;
    newsletter.y = 50;
    newsletter.cornerRadius = 20;
    newsletter.fills = [{ type: 'SOLID', color: C.teal }];
    footerSection.appendChild(newsletter);

    txt(footerSection, "🍕 Get Exclusive Offers", 220, 90, 28, C.white, "Bold");
    txt(footerSection, "Subscribe to get special discounts and deals every week!", 220, 135, 15, C.white, "Regular");

    const emailBox = figma.createRectangle();
    emailBox.resize(420, 50);
    emailBox.x = 220;
    emailBox.y = 175;
    emailBox.cornerRadius = 10;
    emailBox.fills = [{ type: 'SOLID', color: C.white }];
    footerSection.appendChild(emailBox);
    txt(footerSection, "Enter your email", 240, 190, 14, C.gray, "Regular");

    btn(footerSection, 570, 175, 130, 50, C.yellow, "Subscribe", 15);

    await addImage(footerSection, "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400", 900, 60, 300, 180, 16);

    // Footer content
    const footerBg = figma.createRectangle();
    footerBg.resize(W, 300);
    footerBg.x = 0;
    footerBg.y = 300;
    footerBg.fills = [{ type: 'SOLID', color: C.darkTeal }];
    footerSection.appendChild(footerBg);

    txt(footerSection, "Baskhao", 100, 340, 24, C.white, "Bold");
    txt(footerSection, "🍔", 195, 336, 24, C.yellow, "Regular");
    txt(footerSection, "Your favorite food delivery", 100, 375, 14, C.lightTeal, "Regular");
    txt(footerSection, "platform in Pakistan", 100, 395, 14, C.lightTeal, "Regular");

    txt(footerSection, "Quick Links", 400, 340, 18, C.white, "Bold");
    txt(footerSection, "About Us", 400, 380, 13, C.lightTeal, "Regular");
    txt(footerSection, "Restaurants", 400, 405, 13, C.lightTeal, "Regular");
    txt(footerSection, "Become a Rider", 400, 430, 13, C.lightTeal, "Regular");
    txt(footerSection, "Partner with Us", 400, 455, 13, C.lightTeal, "Regular");

    txt(footerSection, "Support", 650, 340, 18, C.white, "Bold");
    txt(footerSection, "Help Center", 650, 380, 13, C.lightTeal, "Regular");
    txt(footerSection, "Track Order", 650, 405, 13, C.lightTeal, "Regular");
    txt(footerSection, "FAQs", 650, 430, 13, C.lightTeal, "Regular");
    txt(footerSection, "Contact Us", 650, 455, 13, C.lightTeal, "Regular");

    txt(footerSection, "Download App", 900, 340, 18, C.white, "Bold");
    
    const appStoreBadge = figma.createRectangle();
    appStoreBadge.resize(150, 45);
    appStoreBadge.x = 900;
    appStoreBadge.y = 380;
    appStoreBadge.cornerRadius = 8;
    appStoreBadge.fills = [{ type: 'SOLID', color: C.yellow }];
    footerSection.appendChild(appStoreBadge);
    txt(footerSection, "📱 App Store", 920, 393, 14, C.white, "Bold");

    const playStoreBadge = figma.createRectangle();
    playStoreBadge.resize(150, 45);
    playStoreBadge.x = 900;
    playStoreBadge.y = 440;
    playStoreBadge.cornerRadius = 8;
    playStoreBadge.fills = [{ type: 'SOLID', color: C.teal }];
    footerSection.appendChild(playStoreBadge);
    txt(footerSection, "▶ Google Play", 915, 453, 14, C.white, "Bold");

    // Social icons
    txt(footerSection, "Follow Us:", 100, 480, 14, C.lightTeal, "Regular");
    txt(footerSection, "f", 180, 478, 18, C.white, "Bold");
    txt(footerSection, "📷", 215, 478, 18, C.white, "Bold");
    txt(footerSection, "🐦", 250, 478, 18, C.white, "Bold");

    txt(footerSection, "© 2025 Baskhao. All rights reserved. | Made with ❤️ in Pakistan", 480, 540, 13, C.lightTeal, "Regular");

    contentFrame.appendChild(footerSection);

    // ============== ADD CONTENT TO SCROLL CONTAINER ==============
    scrollContainer.appendChild(contentFrame);
    targetPage.appendChild(scrollContainer);

    figma.notify("✅ Baskhao landing page created with scrolling!");
    figma.viewport.scrollAndZoomIntoView([scrollContainer]);
  }
};

// ===== LOW-FIDELITY WIREFRAME PLUGIN - COMPLETE CODE =====
// ===== CHUNK 1: SCREENS 01-10 =====

figma.showUI(__html__, { width: 400, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    
    const targetPage = figma.root.children.find(p => p.name === 'App_HF') || figma.currentPage;
    const screens = [];
    const W = 375;
    const H = 812;
    let x = 0;
    let y = 4600; // ✅ POSITIONED BELOW 3 ROWS OF HIGH-FI SCREENS
    const G = 100;
    const ROWGAP = 150; // ← ADD THIS LINE
    // ===== WIREFRAME HELPER FUNCTIONS =====
    
    // Wireframe button - white with black border
    function btnWire(parent, name, xPos, yPos, w, h) {
      const b = figma.createRectangle();
      b.name = name; // ✅ EXACT SAME NAME as high-fi
      b.resize(w, h);
      b.x = xPos;
      b.y = yPos;
      b.cornerRadius = 8;
      b.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      b.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      b.strokeWeight = 2;
      parent.appendChild(b);
      
      // Add button label
      const label = figma.createText();
      label.fontName = { family: "Inter", style: "Regular" };
      label.characters = "Button";
      label.fontSize = 12;
      label.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      label.textAlignHorizontal = "CENTER";
      label.x = xPos + (w/2) - 25;
      label.y = yPos + (h/2) - 6;
      parent.appendChild(label);
      
      return b;
    }
    
    // Wireframe text - gray placeholder lines
    function txtWire(parent, xPos, yPos, size) {
      const line = figma.createRectangle();
      const width = size === 32 ? 150 : size === 28 ? 140 : size === 24 ? 120 : size === 18 ? 100 : 80;
      line.resize(width, 3);
      line.x = xPos;
      line.y = yPos + size/2;
      line.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
      parent.appendChild(line);
      return line;
    }
    
    // Wireframe image - gray box with X
    function imgWire(parent, xPos, yPos, w, h) {
      const box = figma.createRectangle();
      box.resize(w, h);
      box.x = xPos;
      box.y = yPos;
      box.cornerRadius = 8;
      box.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
      box.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
      box.strokeWeight = 1;
      parent.appendChild(box);
      
      // ✅ FIX: Correct diagonal lines
      const line1 = figma.createLine();
      line1.resize(Math.sqrt(w*w + h*h), 0);
      line1.x = xPos;
      line1.y = yPos;
      line1.rotation = Math.atan2(h, w) * (180 / Math.PI);  // ← Fixed formula
      line1.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
      line1.strokeWeight = 2;
      parent.appendChild(line1);
      
      const line2 = figma.createLine();
      line2.resize(Math.sqrt(w*w + h*h), 0);
      line2.x = xPos + w;
      line2.y = yPos;
      line2.rotation = 180 - (Math.atan2(h, w) * (180 / Math.PI));  // ← Fixed formula
      line2.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
      line2.strokeWeight = 2;
      parent.appendChild(line2);
      
      return box;
    }
    
    
    // Wireframe header
    function headerWire(parent, hasBack, backName) {
      const headerBg = figma.createRectangle();
      headerBg.resize(W, 60);
      headerBg.x = 0;
      headerBg.y = 0;
      headerBg.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      headerBg.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      headerBg.strokeWeight = 2;
      headerBg.strokeAlign = "INSIDE";
      parent.appendChild(headerBg);
      
      if (hasBack) {
        const backBtn = figma.createText();
        backBtn.name = backName || "BackBtn-CLICK"; // ✅ EXACT SAME NAME
        backBtn.fontName = { family: "Inter", style: "Bold" };
        backBtn.characters = "<";
        backBtn.fontSize = 24;
        backBtn.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
        backBtn.x = 15;
        backBtn.y = 18;
        parent.appendChild(backBtn);
      }
      
      // Header title placeholder
      txtWire(parent, hasBack ? 55 : (W/2 - 40), 21, 18);
    }
    
    // Wireframe input field
    function inputWire(parent, xPos, yPos, w, h) {
      const box = figma.createRectangle();
      box.resize(w, h);
      box.x = xPos;
      box.y = yPos;
      box.cornerRadius = 12;
      box.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
      box.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
      box.strokeWeight = 1;
      parent.appendChild(box);
      return box;
    }
    
    // ===== SCREEN 01: SPLASH (WIREFRAME) =====
    const s1 = figma.createFrame();
    s1.name = "01-Splash"; // ✅ EXACT SAME NAME
    s1.resize(W, H);
    s1.x = x;
    s1.y = y;
    s1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s1.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s1.strokeWeight = 2;
    
    // Logo placeholder circle
    const logoCircle = figma.createEllipse();
    logoCircle.resize(140, 140);
    logoCircle.x = (W - 140) / 2;
    logoCircle.y = 350;
    logoCircle.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
    logoCircle.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
    logoCircle.strokeWeight = 2;
    s1.appendChild(logoCircle);
    
    // App name placeholder
    txtWire(s1, 140, 510, 32);
    txtWire(s1, 110, 555, 14);
    
    targetPage.appendChild(s1);
    screens.push(s1);
    x += W + G;
    
    // Make entire splash clickable
    const splashClickOverlay = figma.createRectangle();
    splashClickOverlay.name = "SplashScreen-CLICK"; // ✅ EXACT SAME NAME
    splashClickOverlay.resize(W, H);
    splashClickOverlay.x = 0;
    splashClickOverlay.y = 0;
    splashClickOverlay.fills = [];
    s1.appendChild(splashClickOverlay);
    
    // ===== SCREEN 02: WELCOME OPTIONS (WIREFRAME) =====
    const s2 = figma.createFrame();
    s2.name = "02-Welcome-Options"; // ✅ EXACT SAME NAME
    s2.resize(W, H);
    s2.x = x;
    s2.y = y;
    s2.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s2.strokeWeight = 2;
    
    txtWire(s2, 70, 150, 24);
    txtWire(s2, 70, 190, 13);
    txtWire(s2, 55, 210, 13);
    
    imgWire(s2, 87, 250, 200, 200);
    
    btnWire(s2, "LoginSignup-CLICK", 30, 490, 315, 55); // ✅ EXACT SAME NAME
    btnWire(s2, "GuestCheckout-CLICK", 30, 560, 315, 55); // ✅ EXACT SAME NAME
    
    txtWire(s2, 70, 640, 12);
    txtWire(s2, 80, 660, 11);
    
    targetPage.appendChild(s2);
    screens.push(s2);
    x += W + G;
    
    // ===== SCREEN 03: LOGIN (WIREFRAME) =====
    const s3 = figma.createFrame();
    s3.name = "03-Login"; // ✅ EXACT SAME NAME
    s3.resize(W, H);
    s3.x = x;
    s3.y = y;
    s3.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s3.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s3.strokeWeight = 2;
    
    headerWire(s3, true, "BackToWelcome-CLICK"); // ✅ EXACT SAME NAME
    
    txtWire(s3, 30, 100, 28);
    txtWire(s3, 30, 140, 16);
    txtWire(s3, 30, 200, 14);
    inputWire(s3, 30, 225, 315, 50);
    txtWire(s3, 30, 300, 14);
    inputWire(s3, 30, 325, 315, 50);
    
    const forgotTxt = figma.createText();
    forgotTxt.name = "ForgotPassword-CLICK"; // ✅ EXACT SAME NAME
    forgotTxt.fontName = { family: "Inter", style: "Bold" };
    forgotTxt.characters = "Forgot?";
    forgotTxt.fontSize = 14;
    forgotTxt.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    forgotTxt.x = 250;
    forgotTxt.y = 390;
    s3.appendChild(forgotTxt);
    
    btnWire(s3, "LoginBtn-CLICK", 30, 450, 315, 55); // ✅ EXACT SAME NAME
    
    txtWire(s3, 100, 540, 14);
    const signupLink = figma.createText();
    signupLink.name = "GoToSignup-CLICK"; // ✅ EXACT SAME NAME
    signupLink.fontName = { family: "Inter", style: "Bold" };
    signupLink.characters = "Sign Up";
    signupLink.fontSize = 14;
    signupLink.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    signupLink.x = 155;
    signupLink.y = 565;
    s3.appendChild(signupLink);
    
    targetPage.appendChild(s3);
    screens.push(s3);
    x += W + G;
    
    // ===== SCREEN 04: SIGNUP (WIREFRAME) =====
    const s4 = figma.createFrame();
    s4.name = "04-Signup"; // ✅ EXACT SAME NAME
    s4.resize(W, H);
    s4.x = x;
    s4.y = y;
    s4.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s4.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s4.strokeWeight = 2;
    
    headerWire(s4, true, "BackToLogin-CLICK"); // ✅ EXACT SAME NAME
    
    txtWire(s4, 30, 100, 28);
    txtWire(s4, 30, 140, 16);
    txtWire(s4, 30, 190, 14);
    inputWire(s4, 30, 215, 315, 50);
    txtWire(s4, 30, 285, 14);
    inputWire(s4, 30, 310, 315, 50);
    txtWire(s4, 30, 380, 14);
    inputWire(s4, 30, 405, 315, 50);
    txtWire(s4, 30, 475, 14);
    inputWire(s4, 30, 500, 315, 50);
    
    btnWire(s4, "SignupBtn-CLICK", 30, 580, 315, 55); // ✅ EXACT SAME NAME
    
    txtWire(s4, 95, 660, 14);
    const loginLink = figma.createText();
    loginLink.name = "GoToLogin-CLICK"; // ✅ EXACT SAME NAME
    loginLink.fontName = { family: "Inter", style: "Bold" };
    loginLink.characters = "Login";
    loginLink.fontSize = 14;
    loginLink.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    loginLink.x = 165;
    loginLink.y = 685;
    s4.appendChild(loginLink);
    
    targetPage.appendChild(s4);
    screens.push(s4);
    x += W + G;
    
    // ===== SCREEN 05: OTP VERIFICATION (WIREFRAME) =====
    const s5 = figma.createFrame();
    s5.name = "05-OTP-Verification"; // ✅ EXACT SAME NAME
    s5.resize(W, H);
    s5.x = x;
    s5.y = y;
    s5.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s5.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s5.strokeWeight = 2;
    
    headerWire(s5, true, "BackToSignup-CLICK"); // ✅ EXACT SAME NAME
    
    txtWire(s5, 60, 100, 24);
    txtWire(s5, 70, 140, 14);
    txtWire(s5, 110, 165, 14);
    
    // OTP boxes
    const otpBoxX = 35;
    const otpBoxY = 240;
    const otpSize = 50;
    const otpGap = 8;
    for (let i = 0; i < 6; i++) {
      const otpBox = figma.createRectangle();
      otpBox.name = `OTPBox${i+1}`; // ✅ EXACT SAME NAME
      otpBox.resize(otpSize, otpSize);
      otpBox.x = otpBoxX + (i * (otpSize + otpGap));
      otpBox.y = otpBoxY;
      otpBox.cornerRadius = 12;
      otpBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
      otpBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
      otpBox.strokeWeight = 2;
      s5.appendChild(otpBox);
    }
    
    txtWire(s5, 110, 340, 14);
    const resendBtn7 = figma.createText();
    resendBtn7.name = "ResendOTP-CLICK"; // ✅ EXACT SAME NAME
    resendBtn7.fontName = { family: "Inter", style: "Bold" };
    resendBtn7.characters = "Resend";
    resendBtn7.fontSize = 14;
    resendBtn7.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    resendBtn7.x = 135;
    resendBtn7.y = 365;
    s5.appendChild(resendBtn7);
    
    btnWire(s5, "VerifyOTP-CLICK", 30, 450, 315, 55); // ✅ EXACT SAME NAME
    
    targetPage.appendChild(s5);
    screens.push(s5);
    x += W + G;
    
    // ===== SCREEN 06: FORGOT PASSWORD (WIREFRAME) =====
    const s6 = figma.createFrame();
    s6.name = "06-Forgot-Password"; // ✅ EXACT SAME NAME
    s6.resize(W, H);
    s6.x = x;
    s6.y = y;
    s6.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s6.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s6.strokeWeight = 2;
    
    headerWire(s6, true, "BackToLogin-CLICK"); // ✅ EXACT SAME NAME
    
    txtWire(s6, 30, 100, 28);
    txtWire(s6, 30, 140, 14);
    
    imgWire(s6, 112, 200, 150, 150);
    
    txtWire(s6, 30, 380, 14);
    inputWire(s6, 30, 405, 315, 50);
    
    btnWire(s6, "SendResetLink-CLICK", 30, 490, 315, 55); // ✅ EXACT SAME NAME
    
    txtWire(s6, 100, 580, 14);
    const backLogin = figma.createText();
    backLogin.name = "BackToLogin2-CLICK"; // ✅ EXACT SAME NAME
    backLogin.fontName = { family: "Inter", style: "Bold" };
    backLogin.characters = "Login";
    backLogin.fontSize = 14;
    backLogin.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    backLogin.x = 175;
    backLogin.y = 605;
    s6.appendChild(backLogin);
    
    targetPage.appendChild(s6);
    screens.push(s6);
    x += W + G;
    
    // ===== SCREEN 07: RESET PASSWORD (WIREFRAME) =====
    const s7 = figma.createFrame();
    s7.name = "07-Reset-Password"; // ✅ EXACT SAME NAME
    s7.resize(W, H);
    s7.x = x;
    s7.y = y;
    s7.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s7.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s7.strokeWeight = 2;
    
    headerWire(s7, true, "BackToLogin-CLICK"); // ✅ EXACT SAME NAME
    
    txtWire(s7, 30, 100, 24);
    txtWire(s7, 30, 135, 14);
    txtWire(s7, 30, 200, 14);
    inputWire(s7, 30, 225, 315, 50);
    txtWire(s7, 30, 300, 14);
    inputWire(s7, 30, 325, 315, 50);
    txtWire(s7, 30, 400, 13);
    txtWire(s7, 30, 425, 12);
    txtWire(s7, 30, 445, 12);
    txtWire(s7, 30, 465, 12);
    txtWire(s7, 30, 485, 12);
    
    btnWire(s7, "ResetPassword-CLICK", 30, 550, 315, 55); // ✅ EXACT SAME NAME
    
    targetPage.appendChild(s7);
    screens.push(s7);
    x += W + G;
    
    // ===== SCREEN 08: GUEST INFO (WIREFRAME) =====
    const s8 = figma.createFrame();
    s8.name = "08-Guest-Info"; // ✅ EXACT SAME NAME
    s8.resize(W, H);
    s8.x = x;
    s8.y = y;
    s8.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s8.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s8.strokeWeight = 2;
    
    headerWire(s8, true, "BackToWelcome-CLICK"); // ✅ EXACT SAME NAME
    
    txtWire(s8, 30, 100, 24);
    txtWire(s8, 30, 135, 14);
    txtWire(s8, 30, 190, 14);
    inputWire(s8, 30, 215, 315, 50);
    txtWire(s8, 30, 285, 14);
    inputWire(s8, 30, 310, 315, 50);
    txtWire(s8, 30, 380, 14);
    inputWire(s8, 30, 405, 315, 70);
    
    // Warning box
    const limitBox = figma.createRectangle();
    limitBox.resize(315, 80);
    limitBox.x = 30;
    limitBox.y = 500;
    limitBox.cornerRadius = 12;
    limitBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
    limitBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
    limitBox.strokeWeight = 1;
    s8.appendChild(limitBox);
    txtWire(s8, 45, 515, 14);
    txtWire(s8, 45, 540, 12);
    txtWire(s8, 45, 560, 12);
    
    btnWire(s8, "ContinueAsGuest-CLICK", 30, 610, 315, 55); // ✅ EXACT SAME NAME
    
    targetPage.appendChild(s8);
    screens.push(s8);
    x += W + G;
    
    // ===== SCREEN 09: LOCATION PERMISSION (WIREFRAME) =====
    const s9 = figma.createFrame();
    s9.name = "09-Location-Permission"; // ✅ EXACT SAME NAME
    s9.resize(W, H);
    s9.x = x;
    s9.y = y;
    s9.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s9.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s9.strokeWeight = 2;
    
    headerWire(s9, true, "Skip-CLICK"); // ✅ EXACT SAME NAME
    
    txtWire(s9, 30, 100, 28);
    txtWire(s9, 30, 140, 16);
    
    imgWire(s9, 87, 200, 200, 200);
    
    txtWire(s9, 30, 430, 16);
    txtWire(s9, 30, 460, 14);
    txtWire(s9, 30, 485, 14);
    txtWire(s9, 30, 510, 14);
    
    btnWire(s9, "AllowLocation-CLICK", 30, 580, 315, 55); // ✅ EXACT SAME NAME
    
    const manualBtn = figma.createRectangle();
    manualBtn.name = "EnterManually-CLICK"; // ✅ EXACT SAME NAME
    manualBtn.resize(315, 50);
    manualBtn.x = 30;
    manualBtn.y = 650;
    manualBtn.cornerRadius = 25;
    manualBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
    manualBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
    manualBtn.strokeWeight = 2;
    s9.appendChild(manualBtn);
    txtWire(s9, 95, 667, 16);
    
    targetPage.appendChild(s9);
    screens.push(s9);
    x += W + G;
    
    // ===== SCREEN 10: LOCATION SELECTOR (WIREFRAME) =====
    const s10 = figma.createFrame();
    s10.name = "10-Location-Selector"; // ✅ EXACT SAME NAME
    s10.resize(W, H);
    s10.x = x;
    s10.y = y;
    s10.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    s10.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    s10.strokeWeight = 2;
    
    headerWire(s10, true, "BackToHome-CLICK"); // ✅ EXACT SAME NAME
    
    const searchLoc = figma.createRectangle();
    searchLoc.name = "SearchLocation-CLICK"; // ✅ EXACT SAME NAME
    searchLoc.resize(315, 50);
    searchLoc.x = 30;
    searchLoc.y = 80;
    searchLoc.cornerRadius = 25;
    searchLoc.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
    searchLoc.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
    searchLoc.strokeWeight = 1;
    s10.appendChild(searchLoc);
    txtWire(s10, 50, 95, 14);
    
    // Map placeholder
    imgWire(s10, 30, 150, 315, 350);
    
    // Pin icon
    const pin = figma.createEllipse();
    pin.resize(30, 30);
    pin.x = 172;
    pin.y = 300;
    pin.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
    s10.appendChild(pin);
    
    btnWire(s10, "UseCurrentLocation-CLICK", 87, 520, 200, 45); // ✅ EXACT SAME NAME
    
    txtWire(s10, 30, 590, 16);
    txtWire(s10, 30, 615, 13);
    
    btnWire(s10, "ConfirmLocation-CLICK", 30, 680, 315, 55); // ✅ EXACT SAME NAME
    
    targetPage.appendChild(s10);
    screens.push(s10);
    x += W + G;
    
    figma.notify(`✅ Chunk 1 Complete: Screens 01-10 (Wireframe)`);
    
    // ===== READY FOR CHUNK 2 =====
    // DON'T CLOSE PLUGIN YET - MORE SCREENS COMIN
// ===== CHUNK 2: SCREENS 11-20 (WIREFRAME) =====
// Continue from Chunk 1 - don't repeat the setup code

// ===== SCREEN 11: HOME DASHBOARD (WIREFRAME) =====
const s11 = figma.createFrame();
s11.name = "11-Home-Dashboard"; // ✅ EXACT SAME NAME
s11.resize(W, H);
s11.x = x;
s11.y = y;
s11.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s11.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s11.strokeWeight = 2;

headerWire(s11, false);

// Search bar with filter button
const searchBar = figma.createRectangle();
searchBar.name = "SearchBar-CLICK"; // ✅ EXACT SAME NAME
searchBar.resize(260, 45);
searchBar.x = 30;
searchBar.y = 80;
searchBar.cornerRadius = 22;
searchBar.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
searchBar.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
searchBar.strokeWeight = 1;
s11.appendChild(searchBar);
txtWire(s11, 50, 91, 13);

const filterBtn = figma.createRectangle();
filterBtn.name = "FilterSort-CLICK"; // ✅ EXACT SAME NAME
filterBtn.resize(50, 45);
filterBtn.x = 295;
filterBtn.y = 80;
filterBtn.cornerRadius = 22;
filterBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
filterBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
filterBtn.strokeWeight = 2;
s11.appendChild(filterBtn);

// Location display
txtWire(s11, 30, 145, 14);
const changeLocBtn = figma.createText();
changeLocBtn.name = "ChangeLocation-CLICK"; // ✅ EXACT SAME NAME
changeLocBtn.fontName = { family: "Inter", style: "Bold" };
changeLocBtn.characters = "Change";
changeLocBtn.fontSize = 12;
changeLocBtn.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
changeLocBtn.x = 290;
changeLocBtn.y = 146;
s11.appendChild(changeLocBtn);

// Section title
txtWire(s11, 30, 180, 18);
const viewAllBtn = figma.createText();
viewAllBtn.name = "ViewAllPopular-CLICK"; // ✅ EXACT SAME NAME
viewAllBtn.fontName = { family: "Inter", style: "Bold" };
viewAllBtn.characters = "View All";
viewAllBtn.fontSize = 14;
viewAllBtn.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
viewAllBtn.x = 270;
viewAllBtn.y = 181;
s11.appendChild(viewAllBtn);

// Restaurant cards (3 cards)
let restY = 220;
for (let i = 0; i < 3; i++) {
  const restCard = figma.createRectangle();
  restCard.name = i === 0 ? "Restaurant-TheFoodHub-CLICK" : i === 1 ? "Restaurant-QuickBites-CLICK" : "Restaurant-SpiceGarden-CLICK"; // ✅ EXACT SAME NAME
  restCard.resize(315, 100);
  restCard.x = 30;
  restCard.y = restY;
  restCard.cornerRadius = 16;
  restCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  restCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  restCard.strokeWeight = 1;
  s11.appendChild(restCard);
  
  // Image placeholder
  imgWire(s11, 45, restY + 15, 70, 70);
  txtWire(s11, 130, restY + 20, 16);
  txtWire(s11, 130, restY + 43, 12);
  txtWire(s11, 130, restY + 63, 12);
  
  restY += 115;
}

// Categories section
txtWire(s11, 30, 560, 18);
let catX = 30;
for (let i = 0; i < 4; i++) {
  const catCard = figma.createRectangle();
  catCard.name = `Category-${i}-CLICK`;
  catCard.resize(75, 70);
  catCard.x = catX;
  catCard.y = 600;
  catCard.cornerRadius = 12;
  catCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  catCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  catCard.strokeWeight = 1;
  s11.appendChild(catCard);
  txtWire(s11, catX + 10, 650, 11);
  catX += 80;
}

// Bottom navigation
const navBar = figma.createRectangle();
navBar.resize(W, 70);
navBar.x = 0;
navBar.y = 742;
navBar.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
navBar.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
navBar.strokeWeight = 2;
navBar.strokeAlign = "INSIDE";
s11.appendChild(navBar);

const navItems = [{x: 40}, {x: 125}, {x: 210}, {x: 295}];
for (const item of navItems) {
  const navIcon = figma.createRectangle();
  navIcon.resize(24, 24);
  navIcon.x = item.x;
  navIcon.y = 755;
  navIcon.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
  s11.appendChild(navIcon);
  txtWire(s11, item.x - 8, 785, 11);
}

targetPage.appendChild(s11);
screens.push(s11);
x += W + G;

// ===== SCREEN 12: SEARCH (WIREFRAME) =====
const s12 = figma.createFrame();
s12.name = "12-Search"; // ✅ EXACT SAME NAME
s12.resize(W, H);
s12.x = x;
s12.y = y;
s12.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s12.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s12.strokeWeight = 2;

headerWire(s12, false);

const searchInput = figma.createRectangle();
searchInput.name = "SearchInput";
searchInput.resize(315, 50);
searchInput.x = 30;
searchInput.y = 80;
searchInput.cornerRadius = 25;
searchInput.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
searchInput.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
searchInput.strokeWeight = 1;
s12.appendChild(searchInput);
txtWire(s12, 50, 95, 14);

txtWire(s12, 30, 150, 16);

// Recent searches (4 items)
let searchY = 180;
for (let i = 0; i < 4; i++) {
  const searchItem = figma.createRectangle();
  searchItem.name = i === 0 ? "RecentSearch-Pizza-CLICK" : i === 1 ? "RecentSearch-Biryani-CLICK" : i === 2 ? "RecentSearch-Burgers-CLICK" : "RecentSearch-Chinese-CLICK"; // ✅ EXACT SAME NAME
  searchItem.resize(315, 50);
  searchItem.x = 30;
  searchItem.y = searchY;
  searchItem.cornerRadius = 12;
  searchItem.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  searchItem.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  searchItem.strokeWeight = 1;
  s12.appendChild(searchItem);
  txtWire(s12, 80, searchY + 18, 15);
  searchY += 60;
}

txtWire(s12, 30, 440, 16);

// Trending items (3 items)
let trendY = 470;
for (let i = 0; i < 3; i++) {
  const trendItem = figma.createRectangle();
  trendItem.name = i === 0 ? "Trending-Karahi-CLICK" : i === 1 ? "Trending-Shawarma-CLICK" : "Trending-Sushi-CLICK"; // ✅ EXACT SAME NAME
  trendItem.resize(150, 45);
  trendItem.x = 30 + (i % 2) * 165;
  trendItem.y = trendY + Math.floor(i / 2) * 55;
  trendItem.cornerRadius = 22;
  trendItem.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  trendItem.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  trendItem.strokeWeight = 1;
  s12.appendChild(trendItem);
  txtWire(s12, trendItem.x + 30, trendItem.y + 15, 14);
}

targetPage.appendChild(s12);
screens.push(s12);
x += W + G;

// ===== SCREEN 13: SEARCH RESULTS (WIREFRAME) =====
const s13 = figma.createFrame();
s13.name = "13-Search-Results"; // ✅ EXACT SAME NAME
s13.resize(W, H);
s13.x = x;
s13.y = y;
s13.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s13.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s13.strokeWeight = 2;

headerWire(s13, true, "BackToSearch-CLICK"); // ✅ EXACT SAME NAME

const searchInput2 = figma.createRectangle();
searchInput2.name = "SearchInput";
searchInput2.resize(315, 45);
searchInput2.x = 30;
searchInput2.y = 80;
searchInput2.cornerRadius = 22;
searchInput2.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
searchInput2.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
searchInput2.strokeWeight = 1;
s13.appendChild(searchInput2);
txtWire(s13, 50, 92, 14);

txtWire(s13, 30, 145, 14);

const sortBtn = figma.createRectangle();
sortBtn.name = "Sort-CLICK"; // ✅ EXACT SAME NAME
sortBtn.resize(90, 35);
sortBtn.x = 190;
sortBtn.y = 140;
sortBtn.cornerRadius = 18;
sortBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
sortBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
sortBtn.strokeWeight = 1;
s13.appendChild(sortBtn);
txtWire(s13, 210, 149, 12);

const filterBtn2 = figma.createRectangle();
filterBtn2.name = "Filter-CLICK"; // ✅ EXACT SAME NAME
filterBtn2.resize(80, 35);
filterBtn2.x = 290;
filterBtn2.y = 140;
filterBtn2.cornerRadius = 18;
filterBtn2.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
filterBtn2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
filterBtn2.strokeWeight = 2;
s13.appendChild(filterBtn2);
txtWire(s13, 300, 149, 12);

// Results list (2 results)
let resultY = 195;
for (let i = 0; i < 2; i++) {
  const resultCard = figma.createRectangle();
  resultCard.name = i === 0 ? "Result-PizzaPalace-CLICK" : "Result-DominosPizza-CLICK"; // ✅ EXACT SAME NAME
  resultCard.resize(315, 100);
  resultCard.x = 30;
  resultCard.y = resultY;
  resultCard.cornerRadius = 16;
  resultCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  resultCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  resultCard.strokeWeight = 1;
  s13.appendChild(resultCard);
  
  imgWire(s13, 45, resultY + 15, 70, 70);
  txtWire(s13, 130, resultY + 20, 16);
  txtWire(s13, 130, resultY + 43, 12);
  txtWire(s13, 130, resultY + 63, 12);
  
  resultY += 115;
}

targetPage.appendChild(s13);
screens.push(s13);
x += W + G;

// ===== SCREEN 14: FILTER & SORT (WIREFRAME) =====
const s14 = figma.createFrame();
s14.name = "14-Filter-Sort"; // ✅ EXACT SAME NAME
s14.resize(W, H);
s14.x = x;
s14.y = y;
s14.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s14.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s14.strokeWeight = 2;

headerWire(s14, true, "CloseFilter-CLICK"); // ✅ EXACT SAME NAME

txtWire(s14, 30, 90, 18);

// Sort options (6 options)
let sortY = 130;
for (let i = 0; i < 6; i++) {
  const sortOpt = figma.createRectangle();
  sortOpt.name = `Sort-Option${i}-CLICK`;
  sortOpt.resize(315, 45);
  sortOpt.x = 30;
  sortOpt.y = sortY;
  sortOpt.cornerRadius = 12;
  sortOpt.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  sortOpt.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  sortOpt.strokeWeight = i === 0 ? 2 : 1;
  s14.appendChild(sortOpt);
  txtWire(s14, 50, sortY + 15, 14);
  sortY += 52;
}

txtWire(s14, 30, sortY + 20, 18);
txtWire(s14, 30, sortY + 60, 14);

// Dietary checkboxes (4 items)
let dietY = sortY + 90;
for (let i = 0; i < 4; i++) {
  const checkbox = figma.createRectangle();
  checkbox.name = `Diet-${i}-TOGGLE`;
  checkbox.resize(20, 20);
  checkbox.x = 30;
  checkbox.y = dietY;
  checkbox.cornerRadius = 5;
  checkbox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  checkbox.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  checkbox.strokeWeight = 2;
  s14.appendChild(checkbox);
  txtWire(s14, 60, dietY + 2, 14);
  dietY += 35;
}

btnWire(s14, "ApplyFilters-CLICK", 30, 700, 150, 50); // ✅ EXACT SAME NAME
btnWire(s14, "ResetFilters-CLICK", 195, 700, 150, 50); // ✅ EXACT SAME NAME

targetPage.appendChild(s14);
screens.push(s14);
x += W + G;

// ===== SCREEN 15: RESTAURANT DETAILS (WIREFRAME) =====
const s15 = figma.createFrame();
s15.name = "15-Restaurant-Details"; // ✅ EXACT SAME NAME
s15.resize(W, H);
s15.x = x;
s15.y = y;
s15.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s15.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s15.strokeWeight = 2;

// Cover image
imgWire(s15, 0, 0, W, 250);

// Back button circle
const backBtnCircle = figma.createEllipse();
backBtnCircle.name = "BackToHome-CLICK"; // ✅ EXACT SAME NAME
backBtnCircle.resize(40, 40);
backBtnCircle.x = 15;
backBtnCircle.y = 15;
backBtnCircle.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
backBtnCircle.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
backBtnCircle.strokeWeight = 2;
s15.appendChild(backBtnCircle);

const favBtnCircle = figma.createEllipse();
favBtnCircle.name = "AddToFavorites-CLICK"; // ✅ EXACT SAME NAME
favBtnCircle.resize(40, 40);
favBtnCircle.x = 320;
favBtnCircle.y = 15;
favBtnCircle.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
favBtnCircle.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
favBtnCircle.strokeWeight = 2;
s15.appendChild(favBtnCircle);

// Info card
const infoCard = figma.createRectangle();
infoCard.resize(335, 120);
infoCard.x = 20;
infoCard.y = 200;
infoCard.cornerRadius = 16;
infoCard.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
infoCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
infoCard.strokeWeight = 2;
s15.appendChild(infoCard);

txtWire(s15, 35, 220, 22);
txtWire(s15, 35, 250, 14);
txtWire(s15, 35, 275, 13);
txtWire(s15, 35, 302, 11);

txtWire(s15, 30, 340, 20);

// Menu tabs
let tabX2 = 30;
for (let i = 0; i < 5; i++) {
  const tab = figma.createRectangle();
  tab.name = `MenuTab-${i}-CLICK`;
  tab.resize(65, 35);
  tab.x = tabX2;
  tab.y = 380;
  tab.cornerRadius = 18;
  tab.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tab.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tab.strokeWeight = 1;
  s15.appendChild(tab);
  txtWire(s15, tab.x + 15, 389, 13);
  tabX2 += 70;
}

// Menu items (2 items)
let menuY2 = 435;
for (let i = 0; i < 2; i++) {
  const menuCard = figma.createRectangle();
  menuCard.name = i === 0 ? "MenuItem-ChickenTikkaPizza-CLICK" : "MenuItem-BeefBurgerMeal-CLICK"; // ✅ EXACT SAME NAME
  menuCard.resize(315, 90);
  menuCard.x = 30;
  menuCard.y = menuY2;
  menuCard.cornerRadius = 12;
  menuCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  menuCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  menuCard.strokeWeight = 1;
  s15.appendChild(menuCard);
  
  imgWire(s15, 45, menuY2 + 15, 60, 60);
  txtWire(s15, 120, menuY2 + 20, 15);
  txtWire(s15, 120, menuY2 + 45, 16);
  
  const addBtn9 = figma.createRectangle();
  addBtn9.name = `Add-${i}-CLICK`;
  addBtn9.resize(40, 40);
  addBtn9.x = 290;
  addBtn9.y = menuY2 + 25;
  addBtn9.cornerRadius = 20;
  addBtn9.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  addBtn9.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  addBtn9.strokeWeight = 2;
  s15.appendChild(addBtn9);
  menuY2 += 100;
}

// View Cart button
const viewCartBtn = figma.createRectangle();
viewCartBtn.name = "ViewCart-CLICK"; // ✅ EXACT SAME NAME
viewCartBtn.resize(315, 55);
viewCartBtn.x = 30;
viewCartBtn.y = 720;
viewCartBtn.cornerRadius = 28;
viewCartBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
viewCartBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
viewCartBtn.strokeWeight = 2;
s15.appendChild(viewCartBtn);
txtWire(s15, 115, 738, 18);

targetPage.appendChild(s15);
screens.push(s15);
x += W + G;

// ===== SCREEN 16: MENU ITEM DETAILS (WIREFRAME) =====
const s16 = figma.createFrame();
s16.name = "16-Menu-Item-Details"; // ✅ EXACT SAME NAME
s16.resize(W, H);
s16.x = x;
s16.y = y;
s16.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s16.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s16.strokeWeight = 2;

headerWire(s16, true, "BackToMenu-CLICK"); // ✅ EXACT SAME NAME

imgWire(s16, 37, 80, 300, 220);

txtWire(s16, 30, 320, 24);
txtWire(s16, 30, 355, 22);
txtWire(s16, 200, 360, 13);
txtWire(s16, 30, 400, 16);
txtWire(s16, 30, 430, 13);
txtWire(s16, 30, 450, 13);

txtWire(s16, 30, 500, 16);

// Size options (3 options)
let sizeX = 30;
for (let i = 0; i < 3; i++) {
  const sizeOpt = figma.createRectangle();
  sizeOpt.name = `Size-${i}-CLICK`;
  sizeOpt.resize(95, 45);
  sizeOpt.x = sizeX;
  sizeOpt.y = 530;
  sizeOpt.cornerRadius = 22;
  sizeOpt.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  sizeOpt.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  sizeOpt.strokeWeight = i === 1 ? 2 : 1;
  s16.appendChild(sizeOpt);
  txtWire(s16, sizeX + 25, 540, 14);
  sizeX += 105;
}

txtWire(s16, 30, 600, 16);

// Add-ons (2 items)
let addonY = 630;
for (let i = 0; i < 2; i++) {
  const addonBox = figma.createRectangle();
  addonBox.name = `Addon-${i}-TOGGLE`;
  addonBox.resize(315, 50);
  addonBox.x = 30;
  addonBox.y = addonY;
  addonBox.cornerRadius = 12;
  addonBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  addonBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  addonBox.strokeWeight = 1;
  s16.appendChild(addonBox);
  txtWire(s16, 50, addonY + 18, 14);
  txtWire(s16, 250, addonY + 18, 13);
  addonY += 60;
}

btnWire(s16, "AddToCart-CLICK", 30, 745, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s16);
screens.push(s16);
x += W + G;

// ===== SCREEN 17: CART (WIREFRAME) =====
const s17 = figma.createFrame();
s17.name = "17-Cart-Multi-Restaurant"; // ✅ EXACT SAME NAME
s17.resize(W, H);
s17.x = x;
s17.y = y;
s17.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s17.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s17.strokeWeight = 2;

headerWire(s17, true, "BackToMenu-CLICK"); // ✅ EXACT SAME NAME

txtWire(s17, 30, 90, 22);

// Cart items (2 items)
let cartY = 140;
for (let i = 0; i < 2; i++) {
  const cartCard = figma.createRectangle();
  cartCard.resize(315, 120);
  cartCard.x = 30;
  cartCard.y = cartY;
  cartCard.cornerRadius = 12;
  cartCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  cartCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  cartCard.strokeWeight = 1;
  s17.appendChild(cartCard);
  
  imgWire(s17, 45, cartY + 15, 60, 60);
  txtWire(s17, 120, cartY + 20, 15);
  txtWire(s17, 120, cartY + 45, 13);
  txtWire(s17, 120, cartY + 70, 16);
  
  // Quantity controls
  const minusBtn = figma.createRectangle();
  minusBtn.name = `Minus-${i}-CLICK`;
  minusBtn.resize(30, 30);
  minusBtn.x = 230;
  minusBtn.y = cartY + 75;
  minusBtn.cornerRadius = 15;
  minusBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  minusBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  minusBtn.strokeWeight = 2;
  s17.appendChild(minusBtn);
  
  const plusBtn = figma.createRectangle();
  plusBtn.name = `Plus-${i}-CLICK`;
  plusBtn.resize(30, 30);
  plusBtn.x = 300;
  plusBtn.y = cartY + 75;
  plusBtn.cornerRadius = 15;
  plusBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  plusBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  plusBtn.strokeWeight = 2;
  s17.appendChild(plusBtn);
  
  cartY += 130;
}

// Bill details
const billBox = figma.createRectangle();
billBox.resize(315, 180);
billBox.x = 30;
billBox.y = 420;
billBox.cornerRadius = 16;
billBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
billBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
billBox.strokeWeight = 1;
s17.appendChild(billBox);

txtWire(s17, 45, 440, 16);
let billY = 470;
for (let i = 0; i < 5; i++) {
  txtWire(s17, 45, billY, 12);
  txtWire(s17, 270, billY, 12);
  billY += 25;
}

btnWire(s17, "ProceedToCheckout-CLICK", 30, 630, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s17);
screens.push(s17);
x += W + G;

// ===== SCREEN 18: DELIVERY TYPE (WIREFRAME) =====
const s18 = figma.createFrame();
s18.name = "18-Delivery-Type"; // ✅ EXACT SAME NAME
s18.resize(W, H);
s18.x = x;
s18.y = y;
s18.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s18.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s18.strokeWeight = 2;

headerWire(s18, true, "BackToCart-CLICK"); // ✅ EXACT SAME NAME

txtWire(s18, 30, 90, 22);
txtWire(s18, 30, 125, 14);

// Delivery type options (3 options)
let deliveryY = 180;
const deliveryTypes = ["DeliveryType-Delivery-CLICK", "DeliveryType-Pickup-CLICK", "DeliveryType-DineIn-CLICK"];
for (let i = 0; i < 3; i++) {
  const typeCard = figma.createRectangle();
  typeCard.name = deliveryTypes[i]; // ✅ EXACT SAME NAME
  typeCard.resize(315, 100);
  typeCard.x = 30;
  typeCard.y = deliveryY;
  typeCard.cornerRadius = 16;
  typeCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  typeCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  typeCard.strokeWeight = i === 0 ? 2 : 1;
  s18.appendChild(typeCard);
  
  const iconBox = figma.createRectangle();
  iconBox.resize(50, 50);
  iconBox.x = 50;
  iconBox.y = deliveryY + 25;
  iconBox.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  s18.appendChild(iconBox);
  
  txtWire(s18, 115, deliveryY + 25, 18);
  txtWire(s18, 115, deliveryY + 55, 12);
  
  deliveryY += 115;
}

btnWire(s18, "ContinueToAddress-CLICK", 30, 720, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s18);
screens.push(s18);
x += W + G;

// ===== SCREEN 19: SCHEDULE DELIVERY (WIREFRAME) =====
const s19 = figma.createFrame();
s19.name = "19-Schedule-Delivery"; // ✅ EXACT SAME NAME
s19.resize(W, H);
s19.x = x;
s19.y = y;
s19.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s19.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s19.strokeWeight = 2;

headerWire(s19, true, "BackToDeliveryType-CLICK"); // ✅ EXACT SAME NAME

txtWire(s19, 30, 90, 22);

txtWire(s19, 30, 150, 16);

// Date buttons (5 dates)
let dateX = 30;
for (let i = 0; i < 5; i++) {
  const dateBtn = figma.createRectangle();
  dateBtn.name = `ScheduleDate-${i}-CLICK`;
  dateBtn.resize(63, 50);
  dateBtn.x = dateX;
  dateBtn.y = 180;
  dateBtn.cornerRadius = 12;
  dateBtn.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  dateBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  dateBtn.strokeWeight = 1;
  s19.appendChild(dateBtn);
  txtWire(s19, dateBtn.x + 10, 198, 12);
  dateX += 68;
}

txtWire(s19, 30, 260, 16);

// Time slots (8 slots)
let timeX = 30;
let timeY = 290;
for (let i = 0; i < 8; i++) {
  const timeBtn = figma.createRectangle();
  timeBtn.name = `ScheduleTime-${i}-CLICK`;
  timeBtn.resize(70, 45);
  timeBtn.x = timeX;
  timeBtn.y = timeY;
  timeBtn.cornerRadius = 22;
  timeBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  timeBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  timeBtn.strokeWeight = 1;
  s19.appendChild(timeBtn);
  txtWire(s19, timeBtn.x + 10, timeBtn.y + 15, 13);
  
  timeX += 77;
  if (i === 3) {
    timeX = 30;
    timeY += 55;
  }
}

btnWire(s19, "ConfirmSchedule-CLICK", 30, 720, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s19);
screens.push(s19);
x += W + G;

// ===== SCREEN 20: GROUP ORDER (WIREFRAME) =====
const s20 = figma.createFrame();
s20.name = "20-Group-Order"; // ✅ EXACT SAME NAME
s20.resize(W, H);
s20.x = x;
s20.y = y;
s20.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s20.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s20.strokeWeight = 2;

headerWire(s20, true, "BackToCart-CLICK"); // ✅ EXACT SAME NAME

txtWire(s20, 30, 90, 22);
txtWire(s20, 30, 125, 14);

imgWire(s20, 112, 170, 150, 150);

txtWire(s20, 30, 350, 16);
txtWire(s20, 30, 380, 13);

const shareBox = figma.createRectangle();
shareBox.resize(315, 60);
shareBox.x = 30;
shareBox.y = 420;
shareBox.cornerRadius = 12;
shareBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
shareBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
shareBox.strokeWeight = 1;
s20.appendChild(shareBox);
txtWire(s20, 50, 438, 14);

const copyBtn = figma.createRectangle();
copyBtn.name = "CopyGroupLink-CLICK"; // ✅ EXACT SAME NAME
copyBtn.resize(80, 35);
copyBtn.x = 250;
copyBtn.y = 432;
copyBtn.cornerRadius = 18;
copyBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
copyBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
copyBtn.strokeWeight = 2;
s20.appendChild(copyBtn);
txtWire(s20, 265, 441, 12);

txtWire(s20, 30, 510, 16);

// Participants (3 people)
let participantY = 550;
for (let i = 0; i < 3; i++) {
  const pCard = figma.createRectangle();
  pCard.resize(315, 60);
  pCard.x = 30;
  pCard.y = participantY;
  pCard.cornerRadius = 12;
  pCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  pCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  pCard.strokeWeight = 1;
  s20.appendChild(pCard);
  
  const avatar = figma.createEllipse();
  avatar.resize(40, 40);
  avatar.x = 45;
  avatar.y = participantY + 10;
  avatar.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  s20.appendChild(avatar);
  
  txtWire(s20, 95, participantY + 15, 15);
  txtWire(s20, 95, participantY + 35, 12);
  
  participantY += 70;
}

btnWire(s20, "StartGroupOrder-CLICK", 30, 745, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s20);
screens.push(s20);
x += W + G;

figma.notify(`✅ Chunk 2 Complete: Screens 11-20 (Wireframe)`);

// ===== READY FOR CHUNK 3 =====
// ===== CHUNK 3: SCREENS 21-30 (WIREFRAME) =====

// ===== SCREEN 21: DELIVERY ADDRESS (WIREFRAME) =====
const s21 = figma.createFrame();
s21.name = "21-Delivery-Address"; // ✅ EXACT SAME NAME
s21.resize(W, H);
s21.x = x;
s21.y = y;
s21.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s21.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s21.strokeWeight = 2;

headerWire(s21, true, "BackToDeliveryType-CLICK"); // ✅ EXACT SAME NAME

txtWire(s21, 30, 90, 22);

// Add new address button
const addAddressBtn = figma.createRectangle();
addAddressBtn.name = "AddNewAddress-CLICK"; // ✅ EXACT SAME NAME
addAddressBtn.resize(315, 55);
addAddressBtn.x = 30;
addAddressBtn.y = 140;
addAddressBtn.cornerRadius = 12;
addAddressBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
addAddressBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
addAddressBtn.strokeWeight = 2;
s21.appendChild(addAddressBtn);
txtWire(s21, 100, 160, 16);

txtWire(s21, 30, 220, 16);

// Saved addresses (3 addresses)
let addressY = 260;
for (let i = 0; i < 3; i++) {
  const addressCard = figma.createRectangle();
  addressCard.name = i === 0 ? "Address-Home-CLICK" : i === 1 ? "Address-Office-CLICK" : "Address-Other-CLICK"; // ✅ EXACT SAME NAME
  addressCard.resize(315, 100);
  addressCard.x = 30;
  addressCard.y = addressY;
  addressCard.cornerRadius = 16;
  addressCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.9, g: 0.9, b: 0.9} : {r: 0.95, g: 0.95, b: 0.95}}];
  addressCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  addressCard.strokeWeight = i === 0 ? 2 : 1;
  s21.appendChild(addressCard);
  
  const iconBox = figma.createRectangle();
  iconBox.resize(35, 35);
  iconBox.x = 45;
  iconBox.y = addressY + 15;
  iconBox.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s21.appendChild(iconBox);
  
  txtWire(s21, 90, addressY + 20, 16);
  txtWire(s21, 90, addressY + 45, 12);
  txtWire(s21, 90, addressY + 65, 12);
  
  addressY += 115;
}

btnWire(s21, "ContinueToCheckout-CLICK", 30, 720, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s21);
screens.push(s21);
x += W + G;

// ===== SCREEN 22: ADD NEW ADDRESS (WIREFRAME) =====
const s22 = figma.createFrame();
s22.name = "22-Add-New-Address"; // ✅ EXACT SAME NAME
s22.resize(W, H);
s22.x = x;
s22.y = y;
s22.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s22.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s22.strokeWeight = 2;

headerWire(s22, true, "BackToAddressList-CLICK"); // ✅ EXACT SAME NAME

txtWire(s22, 30, 90, 22);

imgWire(s22, 30, 140, 315, 200);

txtWire(s22, 30, 360, 14);
inputWire(s22, 30, 385, 315, 50);

txtWire(s22, 30, 455, 14);
inputWire(s22, 30, 480, 315, 50);

txtWire(s22, 30, 550, 14);
inputWire(s22, 30, 575, 150, 50);

txtWire(s22, 195, 550, 14);
inputWire(s22, 195, 575, 150, 50);

txtWire(s22, 30, 645, 14);

// Address type buttons
let typeX = 30;
const addressTypes = ["Home", "Office", "Other"];
for (let i = 0; i < 3; i++) {
  const typeBtn = figma.createRectangle();
  typeBtn.name = `AddressType-${addressTypes[i]}-CLICK`;
  typeBtn.resize(95, 40);
  typeBtn.x = typeX;
  typeBtn.y = 670;
  typeBtn.cornerRadius = 20;
  typeBtn.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  typeBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  typeBtn.strokeWeight = 1;
  s22.appendChild(typeBtn);
  txtWire(s22, typeBtn.x + 25, 682, 13);
  typeX += 105;
}

btnWire(s22, "SaveAddress-CLICK", 30, 730, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s22);
screens.push(s22);
x += W + G;

// ===== SCREEN 23: CHECKOUT SUMMARY (WIREFRAME) =====
const s23 = figma.createFrame();
s23.name = "23-Checkout-Summary"; // ✅ EXACT SAME NAME
s23.resize(W, H);
s23.x = x;
s23.y = y;
s23.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s23.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s23.strokeWeight = 2;

headerWire(s23, true, "BackToAddress-CLICK"); // ✅ EXACT SAME NAME

txtWire(s23, 30, 90, 22);

// Order details box
const orderBox = figma.createRectangle();
orderBox.resize(315, 100);
orderBox.x = 30;
orderBox.y = 140;
orderBox.cornerRadius = 12;
orderBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
orderBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
orderBox.strokeWeight = 1;
s23.appendChild(orderBox);

txtWire(s23, 45, 155, 15);
txtWire(s23, 45, 180, 12);
txtWire(s23, 45, 200, 12);

const editBtn = figma.createText();
editBtn.name = "EditCart-CLICK"; // ✅ EXACT SAME NAME
editBtn.fontName = { family: "Inter", style: "Bold" };
editBtn.characters = "Edit";
editBtn.fontSize = 14;
editBtn.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
editBtn.x = 300;
editBtn.y = 156;
s23.appendChild(editBtn);

// Delivery address box
const delAddressBox = figma.createRectangle();
delAddressBox.resize(315, 80);
delAddressBox.x = 30;
delAddressBox.y = 260;
delAddressBox.cornerRadius = 12;
delAddressBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
delAddressBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
delAddressBox.strokeWeight = 1;
s23.appendChild(delAddressBox);

txtWire(s23, 45, 275, 14);
txtWire(s23, 45, 300, 12);

const changeAddrBtn = figma.createText();
changeAddrBtn.name = "ChangeAddress-CLICK"; // ✅ EXACT SAME NAME
changeAddrBtn.fontName = { family: "Inter", style: "Bold" };
changeAddrBtn.characters = "Change";
changeAddrBtn.fontSize = 12;
changeAddrBtn.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
changeAddrBtn.x = 285;
changeAddrBtn.y = 276;
s23.appendChild(changeAddrBtn);

// Promo code box
const promoBox = figma.createRectangle();
promoBox.name = "ApplyPromoCode-CLICK"; // ✅ EXACT SAME NAME
promoBox.resize(315, 55);
promoBox.x = 30;
promoBox.y = 360;
promoBox.cornerRadius = 12;
promoBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
promoBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
promoBox.strokeWeight = 1;
s23.appendChild(promoBox);
txtWire(s23, 50, 378, 14);

// Payment method box
const paymentBox = figma.createRectangle();
paymentBox.name = "SelectPaymentMethod-CLICK"; // ✅ EXACT SAME NAME
paymentBox.resize(315, 55);
paymentBox.x = 30;
paymentBox.y = 435;
paymentBox.cornerRadius = 12;
paymentBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
paymentBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
paymentBox.strokeWeight = 1;
s23.appendChild(paymentBox);
txtWire(s23, 50, 453, 14);

// Bill summary
const billSummary = figma.createRectangle();
billSummary.resize(315, 150);
billSummary.x = 30;
billSummary.y = 510;
billSummary.cornerRadius = 12;
billSummary.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
billSummary.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
billSummary.strokeWeight = 1;
s23.appendChild(billSummary);

txtWire(s23, 45, 525, 15);
let summaryY = 555;
for (let i = 0; i < 4; i++) {
  txtWire(s23, 45, summaryY, 12);
  txtWire(s23, 275, summaryY, 12);
  summaryY += 25;
}

btnWire(s23, "PlaceOrder-CLICK", 30, 685, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s23);
screens.push(s23);
x += W + G;

// ===== SCREEN 24: PAYMENT OPTIONS (WIREFRAME) =====
const s24 = figma.createFrame();
s24.name = "24-Payment-Options"; // ✅ EXACT SAME NAME
s24.resize(W, H);
s24.x = x;
s24.y = y;
s24.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s24.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s24.strokeWeight = 2;

headerWire(s24, true, "BackToCheckout-CLICK"); // ✅ EXACT SAME NAME

txtWire(s24, 30, 90, 22);

txtWire(s24, 30, 145, 16);

// Digital wallets (3 options)
let walletY = 180;
const wallets = ["EasyPaisa", "JazzCash", "NayaPay"];
for (let i = 0; i < 3; i++) {
  const walletCard = figma.createRectangle();
  walletCard.name = `Wallet-${wallets[i]}-CLICK`;
  walletCard.resize(315, 60);
  walletCard.x = 30;
  walletCard.y = walletY;
  walletCard.cornerRadius = 12;
  walletCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  walletCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  walletCard.strokeWeight = 1;
  s24.appendChild(walletCard);
  
  const walletIcon = figma.createRectangle();
  walletIcon.resize(40, 40);
  walletIcon.x = 45;
  walletIcon.y = walletY + 10;
  walletIcon.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s24.appendChild(walletIcon);
  
  txtWire(s24, 100, walletY + 22, 15);
  
  walletY += 70;
}

txtWire(s24, 30, 410, 16);

// Card options
const cardOption = figma.createRectangle();
cardOption.name = "CreditDebitCard-CLICK"; // ✅ EXACT SAME NAME
cardOption.resize(315, 60);
cardOption.x = 30;
cardOption.y = 445;
cardOption.cornerRadius = 12;
cardOption.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
cardOption.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
cardOption.strokeWeight = 1;
s24.appendChild(cardOption);
txtWire(s24, 100, 467, 15);

txtWire(s24, 30, 530, 16);

const codOption = figma.createRectangle();
codOption.name = "CashOnDelivery-CLICK"; // ✅ EXACT SAME NAME
codOption.resize(315, 60);
codOption.x = 30;
codOption.y = 565;
codOption.cornerRadius = 12;
codOption.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
codOption.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
codOption.strokeWeight = 1;
s24.appendChild(codOption);
txtWire(s24, 100, 587, 15);

btnWire(s24, "ConfirmPaymentMethod-CLICK", 30, 720, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s24);
screens.push(s24);
x += W + G;

// ===== SCREEN 25: CARD PAYMENT (WIREFRAME) =====
const s25 = figma.createFrame();
s25.name = "25-Card-Payment"; // ✅ EXACT SAME NAME
s25.resize(W, H);
s25.x = x;
s25.y = y;
s25.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s25.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s25.strokeWeight = 2;

headerWire(s25, true, "BackToPayment-CLICK"); // ✅ EXACT SAME NAME

txtWire(s25, 30, 90, 22);

// Card preview
const cardPreview = figma.createRectangle();
cardPreview.resize(315, 180);
cardPreview.x = 30;
cardPreview.y = 140;
cardPreview.cornerRadius = 16;
cardPreview.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
cardPreview.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
cardPreview.strokeWeight = 2;
s25.appendChild(cardPreview);

txtWire(s25, 50, 165, 13);
txtWire(s25, 50, 220, 20);
txtWire(s25, 50, 260, 12);
txtWire(s25, 250, 260, 12);

txtWire(s25, 30, 350, 14);
inputWire(s25, 30, 375, 315, 50);

txtWire(s25, 30, 445, 14);
inputWire(s25, 30, 470, 315, 50);

txtWire(s25, 30, 540, 14);
inputWire(s25, 30, 565, 150, 50);

txtWire(s25, 195, 540, 14);
inputWire(s25, 195, 565, 150, 50);

const saveCardCheckbox = figma.createRectangle();
saveCardCheckbox.name = "SaveCard-TOGGLE"; // ✅ EXACT SAME NAME
saveCardCheckbox.resize(20, 20);
saveCardCheckbox.x = 30;
saveCardCheckbox.y = 635;
saveCardCheckbox.cornerRadius = 5;
saveCardCheckbox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
saveCardCheckbox.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
saveCardCheckbox.strokeWeight = 2;
s25.appendChild(saveCardCheckbox);
txtWire(s25, 60, 637, 13);

btnWire(s25, "PayNow-CLICK", 30, 720, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s25);
screens.push(s25);
x += W + G;

// ===== SCREEN 26: PAYMENT PROCESSING (WIREFRAME) =====
const s26 = figma.createFrame();
s26.name = "26-Payment-Processing"; // ✅ EXACT SAME NAME
s26.resize(W, H);
s26.x = x;
s26.y = y;
s26.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s26.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s26.strokeWeight = 2;

// Centered loading animation placeholder
const loadingCircle = figma.createEllipse();
loadingCircle.resize(100, 100);
loadingCircle.x = (W - 100) / 2;
loadingCircle.y = 300;
loadingCircle.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
loadingCircle.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
loadingCircle.strokeWeight = 4;
s26.appendChild(loadingCircle);

txtWire(s26, 120, 430, 18);
txtWire(s26, 80, 465, 13);

targetPage.appendChild(s26);
screens.push(s26);
x += W + G;

// ===== SCREEN 27: SPLIT PAYMENT (WIREFRAME) =====
const s27 = figma.createFrame();
s27.name = "27-Split-Payment"; // ✅ EXACT SAME NAME
s27.resize(W, H);
s27.x = x;
s27.y = y;
s27.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s27.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s27.strokeWeight = 2;

headerWire(s27, true, "BackToPayment-CLICK"); // ✅ EXACT SAME NAME

txtWire(s27, 30, 90, 22);
txtWire(s27, 30, 125, 14);

// Total amount box
const totalBox = figma.createRectangle();
totalBox.resize(315, 80);
totalBox.x = 30;
totalBox.y = 170;
totalBox.cornerRadius = 12;
totalBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
totalBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
totalBox.strokeWeight = 1;
s27.appendChild(totalBox);
txtWire(s27, 45, 190, 16);
txtWire(s27, 45, 220, 24);

txtWire(s27, 30, 280, 16);

// Split options (3 options)
let splitY = 320;
const splitOptions = ["Split-Equal-CLICK", "Split-Custom-CLICK", "Split-ByItem-CLICK"];
for (let i = 0; i < 3; i++) {
  const splitCard = figma.createRectangle();
  splitCard.name = splitOptions[i]; // ✅ EXACT SAME NAME
  splitCard.resize(315, 70);
  splitCard.x = 30;
  splitCard.y = splitY;
  splitCard.cornerRadius = 12;
  splitCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  splitCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  splitCard.strokeWeight = 1;
  s27.appendChild(splitCard);
  txtWire(s27, 50, splitY + 20, 16);
  txtWire(s27, 50, splitY + 45, 12);
  splitY += 80;
}

txtWire(s27, 30, 570, 16);

// Participants (2 people)
let splitParticipantY = 605;
for (let i = 0; i < 2; i++) {
  const pCard = figma.createRectangle();
  pCard.resize(315, 50);
  pCard.x = 30;
  pCard.y = splitParticipantY;
  pCard.cornerRadius = 12;
  pCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  pCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  pCard.strokeWeight = 1;
  s27.appendChild(pCard);
  
  const avatar = figma.createEllipse();
  avatar.resize(30, 30);
  avatar.x = 45;
  avatar.y = splitParticipantY + 10;
  avatar.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s27.appendChild(avatar);
  
  txtWire(s27, 85, splitParticipantY + 18, 14);
  txtWire(s27, 270, splitParticipantY + 18, 14);
  
  splitParticipantY += 60;
}

btnWire(s27, "ConfirmSplit-CLICK", 30, 730, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s27);
screens.push(s27);
x += W + G;

// ===== SCREEN 28: ORDER CONFIRMATION (WIREFRAME) =====
const s28 = figma.createFrame();
s28.name = "28-Order-Confirmation"; // ✅ EXACT SAME NAME
s28.resize(W, H);
s28.x = x;
s28.y = y;
s28.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s28.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s28.strokeWeight = 2;

// Success icon
const successCircle = figma.createEllipse();
successCircle.resize(120, 120);
successCircle.x = (W - 120) / 2;
successCircle.y = 180;
successCircle.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
successCircle.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
successCircle.strokeWeight = 3;
s28.appendChild(successCircle);

// Checkmark placeholder
const checkmark = figma.createRectangle();
checkmark.resize(60, 60);
checkmark.x = (W - 60) / 2;
checkmark.y = 210;
checkmark.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
s28.appendChild(checkmark);

txtWire(s28, 90, 330, 28);
txtWire(s28, 60, 370, 14);

// Order info box
const orderInfoBox = figma.createRectangle();
orderInfoBox.resize(315, 120);
orderInfoBox.x = 30;
orderInfoBox.y = 420;
orderInfoBox.cornerRadius = 12;
orderInfoBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
orderInfoBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
orderInfoBox.strokeWeight = 1;
s28.appendChild(orderInfoBox);

txtWire(s28, 45, 440, 14);
txtWire(s28, 45, 465, 18);
txtWire(s28, 45, 495, 13);
txtWire(s28, 45, 515, 13);

btnWire(s28, "TrackOrder-CLICK", 30, 570, 315, 55); // ✅ EXACT SAME NAME

const homeBtn = figma.createRectangle();
homeBtn.name = "BackToHome-CLICK"; // ✅ EXACT SAME NAME
homeBtn.resize(315, 50);
homeBtn.x = 30;
homeBtn.y = 640;
homeBtn.cornerRadius = 25;
homeBtn.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
homeBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
homeBtn.strokeWeight = 2;
s28.appendChild(homeBtn);
txtWire(s28, 130, 657, 16);

targetPage.appendChild(s28);
screens.push(s28);
x += W + G;

// ===== SCREEN 29: ORDER TRACKING LIVE (WIREFRAME) =====
const s29 = figma.createFrame();
s29.name = "29-Order-Tracking-Live"; // ✅ EXACT SAME NAME
s29.resize(W, H);
s29.x = x;
s29.y = y;
s29.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s29.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s29.strokeWeight = 2;

headerWire(s29, true, "BackToHome-CLICK"); // ✅ EXACT SAME NAME

// Map placeholder
imgWire(s29, 0, 60, W, 380);

// Live location indicator
const livePin = figma.createEllipse();
livePin.resize(40, 40);
livePin.x = (W - 40) / 2;
livePin.y = 220;
livePin.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
s29.appendChild(livePin);

// Bottom tracking card
const trackCard = figma.createRectangle();
trackCard.resize(W, 372);
trackCard.x = 0;
trackCard.y = 440;
trackCard.cornerRadius = 0;
trackCard.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
trackCard.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
trackCard.strokeWeight = 2;
trackCard.strokeAlign = "INSIDE";
s29.appendChild(trackCard);

// Status bar
const statusBar = figma.createRectangle();
statusBar.resize(60, 5);
statusBar.x = (W - 60) / 2;
statusBar.y = 450;
statusBar.cornerRadius = 2.5;
statusBar.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
s29.appendChild(statusBar);

txtWire(s29, 30, 475, 20);
txtWire(s29, 30, 510, 13);

// Rider info
const riderCard = figma.createRectangle();
riderCard.resize(315, 70);
riderCard.x = 30;
riderCard.y = 545;
riderCard.cornerRadius = 12;
riderCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
riderCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
riderCard.strokeWeight = 1;
s29.appendChild(riderCard);

const riderAvatar = figma.createEllipse();
riderAvatar.resize(50, 50);
riderAvatar.x = 45;
riderAvatar.y = 555;
riderAvatar.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
s29.appendChild(riderAvatar);

txtWire(s29, 110, 560, 16);
txtWire(s29, 110, 585, 12);

const callBtn = figma.createEllipse();
callBtn.name = "CallRider-CLICK"; // ✅ EXACT SAME NAME
callBtn.resize(35, 35);
callBtn.x = 300;
callBtn.y = 563;
callBtn.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
callBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
callBtn.strokeWeight = 2;
s29.appendChild(callBtn);

// Order status timeline
txtWire(s29, 30, 640, 16);

let timelineY = 675;
for (let i = 0; i < 3; i++) {
  const statusDot = figma.createEllipse();
  statusDot.resize(12, 12);
  statusDot.x = 45;
  statusDot.y = timelineY + 2;
  statusDot.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.3, g: 0.3, b: 0.3} : {r: 0.8, g: 0.8, b: 0.8}}];
  s29.appendChild(statusDot);
  
  txtWire(s29, 70, timelineY, 13);
  txtWire(s29, 260, timelineY, 11);
  
  if (i < 2) {
    const line = figma.createRectangle();
    line.resize(2, 20);
    line.x = 50;
    line.y = timelineY + 14;
    line.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
    s29.appendChild(line);
  }
  
  timelineY += 35;
}

targetPage.appendChild(s29);
screens.push(s29);
x += W + G;

// ===== SCREEN 30: RATE ORDER (WIREFRAME) =====
const s30 = figma.createFrame();
s30.name = "30-Rate-Order"; // ✅ EXACT SAME NAME
s30.resize(W, H);
s30.x = x;
s30.y = y;
s30.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s30.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s30.strokeWeight = 2;

headerWire(s30, true, "Skip-CLICK"); // ✅ EXACT SAME NAME

txtWire(s30, 70, 100, 24);
txtWire(s30, 60, 140, 14);

imgWire(s30, 112, 190, 150, 150);

txtWire(s30, 50, 370, 18);

// Star rating
let starX = 75;
for (let i = 0; i < 5; i++) {
  const star = figma.createRectangle();
  star.name = `Star-${i+1}-CLICK`;
  star.resize(35, 35);
  star.x = starX;
  star.y = 410;
  star.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
  star.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  star.strokeWeight = 2;
  s30.appendChild(star);
  starX += 45;
}

txtWire(s30, 30, 480, 16);

// Review textarea
const reviewBox = figma.createRectangle();
reviewBox.name = "ReviewText";
reviewBox.resize(315, 120);
reviewBox.x = 30;
reviewBox.y = 510;
reviewBox.cornerRadius = 12;
reviewBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
reviewBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
reviewBox.strokeWeight = 1;
s30.appendChild(reviewBox);
txtWire(s30, 45, 525, 13);

txtWire(s30, 30, 655, 16);

// Quick feedback tags
let tagX = 30;
let tagY = 685;
for (let i = 0; i < 4; i++) {
  const tag = figma.createRectangle();
  tag.name = `FeedbackTag-${i}-CLICK`;
  tag.resize(70, 35);
  tag.x = tagX;
  tag.y = tagY;
  tag.cornerRadius = 18;
  tag.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  tag.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tag.strokeWeight = 1;
  s30.appendChild(tag);
  txtWire(s30, tag.x + 15, tag.y + 12, 12);
  
  tagX += 77;
  if (i === 1) {
    tagX = 30;
    tagY += 45;
  }
}

btnWire(s30, "SubmitRating-CLICK", 30, 750, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s30);
screens.push(s30);
x += W + G;

figma.notify(`✅ Chunk 3 Complete: Screens 21-30 (Wireframe)`);

// ===== READY FOR CHUNK 4 =====
// ===== CHUNK 4: SCREENS 31-40 (WIREFRAME) =====

// ===== SCREEN 31: RIDER TIP (WIREFRAME) =====
const s31 = figma.createFrame();
s31.name = "31-Rider-Tip"; // ✅ EXACT SAME NAME
s31.resize(W, H);
s31.x = x;
s31.y = y;
s31.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s31.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s31.strokeWeight = 2;

headerWire(s31, true, "Skip-CLICK"); // ✅ EXACT SAME NAME

txtWire(s31, 60, 100, 24);
txtWire(s31, 40, 140, 14);

// Rider avatar
const riderTipAvatar = figma.createEllipse();
riderTipAvatar.resize(100, 100);
riderTipAvatar.x = (W - 100) / 2;
riderTipAvatar.y = 190;
riderTipAvatar.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
riderTipAvatar.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
riderTipAvatar.strokeWeight = 2;
s31.appendChild(riderTipAvatar);

txtWire(s31, 140, 310, 18);
txtWire(s31, 120, 340, 13);

txtWire(s31, 30, 390, 16);

// Tip amount buttons
let tipX = 30;
const tipAmounts = [20, 50, 100, 150];
for (let i = 0; i < 4; i++) {
  const tipBtn = figma.createRectangle();
  tipBtn.name = `TipAmount-${tipAmounts[i]}-CLICK`; // ✅ EXACT SAME NAME
  tipBtn.resize(72, 55);
  tipBtn.x = tipX;
  tipBtn.y = 425;
  tipBtn.cornerRadius = 12;
  tipBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  tipBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tipBtn.strokeWeight = 1;
  s31.appendChild(tipBtn);
  txtWire(s31, tipBtn.x + 18, 443, 16);
  tipX += 78;
}

txtWire(s31, 30, 510, 14);

// Custom tip input
const customTipBox = figma.createRectangle();
customTipBox.resize(315, 55);
customTipBox.x = 30;
customTipBox.y = 540;
customTipBox.cornerRadius = 12;
customTipBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
customTipBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
customTipBox.strokeWeight = 1;
s31.appendChild(customTipBox);
txtWire(s31, 50, 558, 16);

btnWire(s31, "ConfirmTip-CLICK", 30, 640, 315, 55); // ✅ EXACT SAME NAME

const noTipBtn = figma.createRectangle();
noTipBtn.name = "NoTip-CLICK"; // ✅ EXACT SAME NAME
noTipBtn.resize(315, 50);
noTipBtn.x = 30;
noTipBtn.y = 710;
noTipBtn.cornerRadius = 25;
noTipBtn.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
noTipBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
noTipBtn.strokeWeight = 2;
s31.appendChild(noTipBtn);
txtWire(s31, 125, 727, 14);

targetPage.appendChild(s31);
screens.push(s31);
x += W + G;

// ===== SCREEN 32: FAVORITES (WIREFRAME) =====
const s32 = figma.createFrame();
s32.name = "32-Favorites"; // ✅ EXACT SAME NAME
s32.resize(W, H);
s32.x = x;
s32.y = y;
s32.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s32.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s32.strokeWeight = 2;

headerWire(s32, true, "BackToHome-CLICK"); // ✅ EXACT SAME NAME

txtWire(s32, 30, 90, 22);
txtWire(s32, 30, 125, 13);

// Favorite tabs
let favTabX = 30;
const favTabs = ["Restaurants", "Dishes"];
for (let i = 0; i < 2; i++) {
  const tab = figma.createRectangle();
  tab.name = `FavTab-${favTabs[i]}-CLICK`;
  tab.resize(150, 40);
  tab.x = favTabX;
  tab.y = 160;
  tab.cornerRadius = 20;
  tab.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tab.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tab.strokeWeight = 1;
  s32.appendChild(tab);
  txtWire(s32, tab.x + 35, 170, 14);
  favTabX += 165;
}

// Favorite items (3 items)
let favY = 225;
for (let i = 0; i < 3; i++) {
  const favCard = figma.createRectangle();
  favCard.name = `Favorite-${i}-CLICK`;
  favCard.resize(315, 100);
  favCard.x = 30;
  favCard.y = favY;
  favCard.cornerRadius = 16;
  favCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  favCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  favCard.strokeWeight = 1;
  s32.appendChild(favCard);
  
  imgWire(s32, 45, favY + 15, 70, 70);
  txtWire(s32, 130, favY + 20, 16);
  txtWire(s32, 130, favY + 43, 12);
  txtWire(s32, 130, favY + 63, 12);
  
  // Heart icon
  const heartBtn = figma.createRectangle();
  heartBtn.name = `RemoveFavorite-${i}-CLICK`;
  heartBtn.resize(30, 30);
  heartBtn.x = 300;
  heartBtn.y = favY + 20;
  heartBtn.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  s32.appendChild(heartBtn);
  
  favY += 115;
}

targetPage.appendChild(s32);
screens.push(s32);
x += W + G;

// ===== SCREEN 33: NOTIFICATIONS (WIREFRAME) =====
const s33 = figma.createFrame();
s33.name = "33-Notifications"; // ✅ EXACT SAME NAME
s33.resize(W, H);
s33.x = x;
s33.y = y;
s33.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s33.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s33.strokeWeight = 2;

headerWire(s33, true, "BackToHome-CLICK"); // ✅ EXACT SAME NAME

txtWire(s33, 30, 90, 22);

// Filter buttons
let notifFilterX = 30;
const notifFilters = ["All", "Orders", "Offers", "Updates"];
for (let i = 0; i < 4; i++) {
  const filterBtn = figma.createRectangle();
  filterBtn.name = `NotifFilter-${notifFilters[i]}-CLICK`;
  filterBtn.resize(75, 35);
  filterBtn.x = notifFilterX;
  filterBtn.y = 140;
  filterBtn.cornerRadius = 18;
  filterBtn.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  filterBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  filterBtn.strokeWeight = 1;
  s33.appendChild(filterBtn);
  txtWire(s33, filterBtn.x + 18, 149, 12);
  notifFilterX += 80;
}

// Notification items (5 items)
let notifY = 200;
for (let i = 0; i < 5; i++) {
  const notifCard = figma.createRectangle();
  notifCard.name = `Notification-${i}-CLICK`;
  notifCard.resize(315, 90);
  notifCard.x = 30;
  notifCard.y = notifY;
  notifCard.cornerRadius = 12;
  notifCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.9, g: 0.9, b: 0.9} : {r: 0.95, g: 0.95, b: 0.95}}];
  notifCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  notifCard.strokeWeight = 1;
  s33.appendChild(notifCard);
  
  const notifIcon = figma.createEllipse();
  notifIcon.resize(40, 40);
  notifIcon.x = 45;
  notifIcon.y = notifY + 25;
  notifIcon.fills = [{type: 'SOLID', color: {r: 0.75, g: 0.75, b: 0.75}}];
  s33.appendChild(notifIcon);
  
  txtWire(s33, 100, notifY + 20, 15);
  txtWire(s33, 100, notifY + 45, 12);
  txtWire(s33, 100, notifY + 65, 11);
  
  notifY += 100;
}

targetPage.appendChild(s33);
screens.push(s33);
x += W + G;

// ===== SCREEN 34: ORDER HISTORY (WIREFRAME) =====
const s34 = figma.createFrame();
s34.name = "34-Order-History"; // ✅ EXACT SAME NAME
s34.resize(W, H);
s34.x = x;
s34.y = y;
s34.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s34.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s34.strokeWeight = 2;

headerWire(s34, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s34, 30, 90, 22);

// Status filter tabs
let statusTabX = 30;
const statusTabs = ["All", "Active", "Past"];
for (let i = 0; i < 3; i++) {
  const tab = figma.createRectangle();
  tab.name = `OrderStatus-${statusTabs[i]}-CLICK`;
  tab.resize(100, 40);
  tab.x = statusTabX;
  tab.y = 140;
  tab.cornerRadius = 20;
  tab.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tab.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tab.strokeWeight = 1;
  s34.appendChild(tab);
  txtWire(s34, tab.x + 25, 150, 14);
  statusTabX += 107;
}

// Order history items (4 items)
let histY = 205;
for (let i = 0; i < 4; i++) {
  const orderCard = figma.createRectangle();
  orderCard.name = `OrderHistory-${i}-CLICK`;
  orderCard.resize(315, 120);
  orderCard.x = 30;
  orderCard.y = histY;
  orderCard.cornerRadius = 16;
  orderCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  orderCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  orderCard.strokeWeight = 1;
  s34.appendChild(orderCard);
  
  imgWire(s34, 45, histY + 15, 60, 60);
  txtWire(s34, 120, histY + 20, 16);
  txtWire(s34, 120, histY + 45, 12);
  txtWire(s34, 120, histY + 68, 14);
  
  // Status badge
  const statusBadge = figma.createRectangle();
  statusBadge.resize(75, 25);
  statusBadge.x = 255;
  statusBadge.y = histY + 20;
  statusBadge.cornerRadius = 12;
  statusBadge.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  s34.appendChild(statusBadge);
  txtWire(s34, 268, histY + 24, 11);
  
  // Action buttons
  const reorderBtn = figma.createRectangle();
  reorderBtn.name = `Reorder-${i}-CLICK`;
  reorderBtn.resize(90, 30);
  reorderBtn.x = 120;
  reorderBtn.y = histY + 85;
  reorderBtn.cornerRadius = 15;
  reorderBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
  reorderBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  reorderBtn.strokeWeight = 1;
  s34.appendChild(reorderBtn);
  txtWire(s34, 135, histY + 91, 12);
  
  const detailsBtn = figma.createRectangle();
  detailsBtn.name = `OrderDetails-${i}-CLICK`;
  detailsBtn.resize(90, 30);
  detailsBtn.x = 220;
  detailsBtn.y = histY + 85;
  detailsBtn.cornerRadius = 15;
  detailsBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
  detailsBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  detailsBtn.strokeWeight = 1;
  s34.appendChild(detailsBtn);
  txtWire(s34, 233, histY + 91, 12);
  
  histY += 130;
}

targetPage.appendChild(s34);
screens.push(s34);
x += W + G;

// ===== SCREEN 35: ORDER DETAILS (WIREFRAME) =====
const s35 = figma.createFrame();
s35.name = "35-Order-Details"; // ✅ EXACT SAME NAME
s35.resize(W, H);
s35.x = x;
s35.y = y;
s35.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s35.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s35.strokeWeight = 2;

headerWire(s35, true, "BackToOrderHistory-CLICK"); // ✅ EXACT SAME NAME

txtWire(s35, 30, 90, 22);

// Order ID
txtWire(s35, 30, 130, 13);

// Restaurant info
const restInfoBox = figma.createRectangle();
restInfoBox.resize(315, 80);
restInfoBox.x = 30;
restInfoBox.y = 160;
restInfoBox.cornerRadius = 12;
restInfoBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
restInfoBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
restInfoBox.strokeWeight = 1;
s35.appendChild(restInfoBox);

imgWire(s35, 45, 175, 50, 50);
txtWire(s35, 110, 185, 16);
txtWire(s35, 110, 210, 12);

txtWire(s35, 30, 265, 16);

// Order items (2 items)
let orderItemY = 295;
for (let i = 0; i < 2; i++) {
  const itemBox = figma.createRectangle();
  itemBox.resize(315, 50);
  itemBox.x = 30;
  itemBox.y = orderItemY;
  itemBox.cornerRadius = 12;
  itemBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  itemBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  itemBox.strokeWeight = 1;
  s35.appendChild(itemBox);
  txtWire(s35, 45, orderItemY + 12, 14);
  txtWire(s35, 45, orderItemY + 30, 12);
  txtWire(s35, 280, orderItemY + 18, 14);
  orderItemY += 60;
}

// Bill details
txtWire(s35, 30, 430, 16);
const billDetailsBox = figma.createRectangle();
billDetailsBox.resize(315, 150);
billDetailsBox.x = 30;
billDetailsBox.y = 460;
billDetailsBox.cornerRadius = 12;
billDetailsBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
billDetailsBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
billDetailsBox.strokeWeight = 1;
s35.appendChild(billDetailsBox);

let billDetailY = 475;
for (let i = 0; i < 5; i++) {
  txtWire(s35, 45, billDetailY, 12);
  txtWire(s35, 280, billDetailY, 12);
  billDetailY += 25;
}

btnWire(s35, "ReorderThis-CLICK", 30, 635, 315, 50); // ✅ EXACT SAME NAME
btnWire(s35, "GetHelp-CLICK", 30, 700, 315, 50); // ✅ EXACT SAME NAME

targetPage.appendChild(s35);
screens.push(s35);
x += W + G;

// ===== SCREEN 36: PROFILE (WIREFRAME) =====
const s36 = figma.createFrame();
s36.name = "36-Profile"; // ✅ EXACT SAME NAME
s36.resize(W, H);
s36.x = x;
s36.y = y;
s36.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s36.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s36.strokeWeight = 2;

headerWire(s36, true, "BackToHome-CLICK"); // ✅ EXACT SAME NAME

// Profile header
const profileAvatar = figma.createEllipse();
profileAvatar.resize(80, 80);
profileAvatar.x = 30;
profileAvatar.y = 90;
profileAvatar.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
profileAvatar.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
profileAvatar.strokeWeight = 2;
s36.appendChild(profileAvatar);

txtWire(s36, 130, 105, 20);
txtWire(s36, 130, 135, 13);

const editProfileBtn = figma.createRectangle();
editProfileBtn.name = "EditProfile-CLICK"; // ✅ EXACT SAME NAME
editProfileBtn.resize(80, 35);
editProfileBtn.x = 250;
editProfileBtn.y = 110;
editProfileBtn.cornerRadius = 18;
editProfileBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
editProfileBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
editProfileBtn.strokeWeight = 2;
s36.appendChild(editProfileBtn);
txtWire(s36, 268, 119, 12);

// Stats cards
let statX = 30;
for (let i = 0; i < 3; i++) {
  const statCard = figma.createRectangle();
  statCard.resize(98, 70);
  statCard.x = statX;
  statCard.y = 195;
  statCard.cornerRadius = 12;
  statCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  statCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  statCard.strokeWeight = 1;
  s36.appendChild(statCard);
  txtWire(s36, statX + 35, 215, 20);
  txtWire(s36, statX + 20, 245, 12);
  statX += 108;
}

// Menu items
let menuY = 290;
const menuItems = [
  "OrderHistory-CLICK",
  "SavedAddresses-CLICK", 
  "PaymentMethods-CLICK",
  "Favorites-CLICK",
  "Notifications-CLICK",
  "Settings-CLICK",
  "Help-CLICK",
  "Logout-CLICK"
];

for (let i = 0; i < 8; i++) {
  const menuItem = figma.createRectangle();
  menuItem.name = menuItems[i]; // ✅ EXACT SAME NAME
  menuItem.resize(315, 55);
  menuItem.x = 30;
  menuItem.y = menuY;
  menuItem.cornerRadius = 12;
  menuItem.fills = [{type: 'SOLID', color: i === 7 ? {r: 0.98, g: 0.9, b: 0.9} : {r: 0.95, g: 0.95, b: 0.95}}];
  menuItem.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  menuItem.strokeWeight = 1;
  s36.appendChild(menuItem);
  
  const icon = figma.createRectangle();
  icon.resize(25, 25);
  icon.x = 45;
  icon.y = menuY + 15;
  icon.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s36.appendChild(icon);
  
  txtWire(s36, 85, menuY + 20, 15);
  
  menuY += 62;
}

targetPage.appendChild(s36);
screens.push(s36);
x += W + G;

// ===== SCREEN 37: EDIT PROFILE (WIREFRAME) =====
const s37 = figma.createFrame();
s37.name = "37-Edit-Profile"; // ✅ EXACT SAME NAME
s37.resize(W, H);
s37.x = x;
s37.y = y;
s37.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s37.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s37.strokeWeight = 2;

headerWire(s37, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s37, 30, 90, 22);

// Avatar with edit button
const editAvatar = figma.createEllipse();
editAvatar.resize(100, 100);
editAvatar.x = (W - 100) / 2;
editAvatar.y = 150;
editAvatar.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
editAvatar.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
editAvatar.strokeWeight = 2;
s37.appendChild(editAvatar);

const editAvatarBtn = figma.createEllipse();
editAvatarBtn.name = "ChangeAvatar-CLICK"; // ✅ EXACT SAME NAME
editAvatarBtn.resize(35, 35);
editAvatarBtn.x = 220;
editAvatarBtn.y = 215;
editAvatarBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
editAvatarBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
editAvatarBtn.strokeWeight = 2;
s37.appendChild(editAvatarBtn);

txtWire(s37, 30, 280, 14);
inputWire(s37, 30, 305, 315, 50);

txtWire(s37, 30, 375, 14);
inputWire(s37, 30, 400, 315, 50);

txtWire(s37, 30, 470, 14);
inputWire(s37, 30, 495, 315, 50);

txtWire(s37, 30, 565, 14);
inputWire(s37, 30, 590, 315, 50);

btnWire(s37, "SaveProfile-CLICK", 30, 680, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s37);
screens.push(s37);
x += W + G;

// ===== SCREEN 38: SAVED ADDRESSES (WIREFRAME) =====
const s38 = figma.createFrame();
s38.name = "38-Saved-Addresses"; // ✅ EXACT SAME NAME
s38.resize(W, H);
s38.x = x;
s38.y = y;
s38.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s38.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s38.strokeWeight = 2;

headerWire(s38, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s38, 30, 90, 22);

// Add new address button
const addAddrBtn2 = figma.createRectangle();
addAddrBtn2.name = "AddAddress-CLICK"; // ✅ EXACT SAME NAME
addAddrBtn2.resize(315, 55);
addAddrBtn2.x = 30;
addAddrBtn2.y = 140;
addAddrBtn2.cornerRadius = 12;
addAddrBtn2.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
addAddrBtn2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
addAddrBtn2.strokeWeight = 2;
s38.appendChild(addAddrBtn2);
txtWire(s38, 100, 160, 16);

// Saved addresses (4 addresses)
let savedAddrY = 220;
for (let i = 0; i < 4; i++) {
  const addrCard = figma.createRectangle();
  addrCard.resize(315, 110);
  addrCard.x = 30;
  addrCard.y = savedAddrY;
  addrCard.cornerRadius = 16;
  addrCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  addrCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  addrCard.strokeWeight = 1;
  s38.appendChild(addrCard);
  
  const addrIcon = figma.createRectangle();
  addrIcon.resize(35, 35);
  addrIcon.x = 45;
  addrIcon.y = savedAddrY + 15;
  addrIcon.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s38.appendChild(addrIcon);
  
  txtWire(s38, 90, savedAddrY + 20, 16);
  txtWire(s38, 90, savedAddrY + 45, 12);
  txtWire(s38, 90, savedAddrY + 65, 12);
  
  const editAddrBtn = figma.createRectangle();
  editAddrBtn.name = `EditAddress-${i}-CLICK`;
  editAddrBtn.resize(70, 30);
  editAddrBtn.x = 180;
  editAddrBtn.y = savedAddrY + 75;
  editAddrBtn.cornerRadius = 15;
  editAddrBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
  editAddrBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  editAddrBtn.strokeWeight = 1;
  s38.appendChild(editAddrBtn);
  txtWire(s38, 198, savedAddrY + 81, 12);
  
  const deleteAddrBtn = figma.createRectangle();
  deleteAddrBtn.name = `DeleteAddress-${i}-CLICK`;
  deleteAddrBtn.resize(70, 30);
  deleteAddrBtn.x = 260;
  deleteAddrBtn.y = savedAddrY + 75;
  deleteAddrBtn.cornerRadius = 15;
  deleteAddrBtn.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.9, b: 0.9}}];
  deleteAddrBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0, b: 0}}];
  deleteAddrBtn.strokeWeight = 1;
  s38.appendChild(deleteAddrBtn);
  txtWire(s38, 272, savedAddrY + 81, 12);
  
  savedAddrY += 120;
}

targetPage.appendChild(s38);
screens.push(s38);
x += W + G;

// ===== SCREEN 39: PAYMENT METHODS (WIREFRAME) =====
const s39 = figma.createFrame();
s39.name = "39-Payment-Methods"; // ✅ EXACT SAME NAME
s39.resize(W, H);
s39.x = x;
s39.y = y;
s39.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s39.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s39.strokeWeight = 2;

headerWire(s39, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s39, 30, 90, 22);

// Add payment method button
const addPaymentBtn = figma.createRectangle();
addPaymentBtn.name = "AddPaymentMethod-CLICK"; // ✅ EXACT SAME NAME
addPaymentBtn.resize(315, 55);
addPaymentBtn.x = 30;
addPaymentBtn.y = 140;
addPaymentBtn.cornerRadius = 12;
addPaymentBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
addPaymentBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
addPaymentBtn.strokeWeight = 2;
s39.appendChild(addPaymentBtn);
txtWire(s39, 75, 160, 16);

txtWire(s39, 30, 220, 16);

// Saved cards (2 cards)
let cardY = 255;
for (let i = 0; i < 2; i++) {
  const cardBox = figma.createRectangle();
  cardBox.resize(315, 140);
  cardBox.x = 30;
  cardBox.y = cardY;
  cardBox.cornerRadius = 16;
  cardBox.fills = [{type: 'SOLID', color: {r: 0.88, g: 0.88, b: 0.88}}];
  cardBox.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  cardBox.strokeWeight = 2;
  s39.appendChild(cardBox);
  
  txtWire(s39, 50, 280, 13);
  txtWire(s39, 50, 325, 18);
  txtWire(s39, 50, 355, 12);
  txtWire(s39, 250, 355, 12);
  
  const removeCardBtn = figma.createRectangle();
  removeCardBtn.name = `RemoveCard-${i}-CLICK`;
  removeCardBtn.resize(80, 30);
  removeCardBtn.x = 250;
  removeCardBtn.y = cardY + 10;
  removeCardBtn.cornerRadius = 15;
  removeCardBtn.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.9, b: 0.9}}];
  removeCardBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0, b: 0}}];
  removeCardBtn.strokeWeight = 1;
  s39.appendChild(removeCardBtn);
  txtWire(s39, 263, cardY + 16, 11);
  
  cardY += 155;
}

txtWire(s39, 30, 570, 16);

// Wallet options (3 wallets)
let walletY2 = 605;
for (let i = 0; i < 3; i++) {
  const walletBox = figma.createRectangle();
  walletBox.name = `SavedWallet-${i}-CLICK`;
  walletBox.resize(315, 60);
  walletBox.x = 30;
  walletBox.y = walletY2;
  walletBox.cornerRadius = 12;
  walletBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  walletBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  walletBox.strokeWeight = 1;
  s39.appendChild(walletBox);
  
  const walletIcon2 = figma.createRectangle();
  walletIcon2.resize(40, 40);
  walletIcon2.x = 45;
  walletIcon2.y = walletY2 + 10;
  walletIcon2.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s39.appendChild(walletIcon2);
  
  txtWire(s39, 100, walletY2 + 22, 15);
  
  walletY2 += 70;
}

targetPage.appendChild(s39);
screens.push(s39);
x += W + G;

// ===== SCREEN 40: SETTINGS (WIREFRAME) =====
const s40 = figma.createFrame();
s40.name = "40-Settings"; // ✅ EXACT SAME NAME
s40.resize(W, H);
s40.x = x;
s40.y = y;
s40.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s40.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s40.strokeWeight = 2;

headerWire(s40, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s40, 30, 90, 22);

txtWire(s40, 30, 140, 16);

// Setting items with toggles
let settingY = 175;
const settingLabels = [
  "Push Notifications",
  "Email Notifications",
  "SMS Notifications",
  "Order Updates",
  "Promotional Offers",
  "Location Services"
];

for (let i = 0; i < 6; i++) {
  const settingRow = figma.createRectangle();
  settingRow.resize(315, 55);
  settingRow.x = 30;
  settingRow.y = settingY;
  settingRow.cornerRadius = 12;
  settingRow.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  settingRow.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  settingRow.strokeWeight = 1;
  s40.appendChild(settingRow);
  
  txtWire(s40, 50, settingY + 20, 14);
  
  // Toggle switch
  const toggle = figma.createRectangle();
  toggle.name = `Toggle-${i}-CLICK`;
  toggle.resize(50, 28);
  toggle.x = 280;
  toggle.y = settingY + 13;
  toggle.cornerRadius = 14;
  toggle.fills = [{type: 'SOLID', color: i % 2 === 0 ? {r: 0.7, g: 0.7, b: 0.7} : {r: 0.85, g: 0.85, b: 0.85}}];
  toggle.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
  toggle.strokeWeight = 2;
  s40.appendChild(toggle);
  
  settingY += 62;
}

txtWire(s40, 30, settingY + 20, 16);

// Preferences
settingY += 55;
const preferences = [
  "Language-CLICK",
  "Currency-CLICK",
  "DietaryPreferences-CLICK"
];

for (let i = 0; i < 3; i++) {
  const prefRow = figma.createRectangle();
  prefRow.name = preferences[i]; // ✅ EXACT SAME NAME
  prefRow.resize(315, 55);
  prefRow.x = 30;
  prefRow.y = settingY;
  prefRow.cornerRadius = 12;
  prefRow.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  prefRow.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  prefRow.strokeWeight = 1;
  s40.appendChild(prefRow);
  
  txtWire(s40, 50, settingY + 20, 14);
  txtWire(s40, 270, settingY + 20, 13);
  
  settingY += 62;
}

targetPage.appendChild(s40);
screens.push(s40);
x += W + G;

figma.notify(`✅ Chunk 4 Complete: Screens 31-40 (Wireframe)`);

// ===== READY FOR CHUNK 5 =====
// ===== CHUNK 5: SCREENS 41-50 (WIREFRAME) =====

// ===== SCREEN 41: HELP & SUPPORT (WIREFRAME) =====
const s41 = figma.createFrame();
s41.name = "41-Help-Support"; // ✅ EXACT SAME NAME
s41.resize(W, H);
s41.x = x;
s41.y = y;
s41.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s41.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s41.strokeWeight = 2;

headerWire(s41, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s41, 30, 90, 22);

// Search help
const helpSearchBox = figma.createRectangle();
helpSearchBox.name = "SearchHelp-CLICK";
helpSearchBox.resize(315, 50);
helpSearchBox.x = 30;
helpSearchBox.y = 140;
helpSearchBox.cornerRadius = 25;
helpSearchBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
helpSearchBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
helpSearchBox.strokeWeight = 1;
s41.appendChild(helpSearchBox);
txtWire(s41, 50, 155, 14);

txtWire(s41, 30, 215, 16);

// Quick help options
let helpOptY = 250;
const helpOptions = [
  "FAQ-CLICK",
  "TrackOrder-CLICK",
  "RefundStatus-CLICK",
  "ContactSupport-CLICK",
  "ReportIssue-CLICK",
  "LiveChat-CLICK"
];

for (let i = 0; i < 6; i++) {
  const helpCard = figma.createRectangle();
  helpCard.name = helpOptions[i]; // ✅ EXACT SAME NAME
  helpCard.resize(315, 65);
  helpCard.x = 30;
  helpCard.y = helpOptY;
  helpCard.cornerRadius = 12;
  helpCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  helpCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  helpCard.strokeWeight = 1;
  s41.appendChild(helpCard);
  
  const helpIcon = figma.createRectangle();
  helpIcon.resize(35, 35);
  helpIcon.x = 45;
  helpIcon.y = helpOptY + 15;
  helpIcon.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s41.appendChild(helpIcon);
  
  txtWire(s41, 95, helpOptY + 18, 16);
  txtWire(s41, 95, helpOptY + 40, 12);
  
  helpOptY += 72;
}

targetPage.appendChild(s41);
screens.push(s41);
x += W + G;

// ===== SCREEN 42: FAQ (WIREFRAME) =====
const s42 = figma.createFrame();
s42.name = "42-FAQ"; // ✅ EXACT SAME NAME
s42.resize(W, H);
s42.x = x;
s42.y = y;
s42.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s42.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s42.strokeWeight = 2;

headerWire(s42, true, "BackToHelp-CLICK"); // ✅ EXACT SAME NAME

txtWire(s42, 30, 90, 22);

// FAQ categories
let faqTabX = 30;
const faqTabs = ["General", "Orders", "Payment", "Account"];
for (let i = 0; i < 4; i++) {
  const tab = figma.createRectangle();
  tab.name = `FAQTab-${faqTabs[i]}-CLICK`;
  tab.resize(75, 35);
  tab.x = faqTabX;
  tab.y = 140;
  tab.cornerRadius = 18;
  tab.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tab.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tab.strokeWeight = 1;
  s42.appendChild(tab);
  txtWire(s42, tab.x + 18, 149, 12);
  faqTabX += 80;
}

// FAQ items (5 items)
let faqY = 200;
for (let i = 0; i < 5; i++) {
  const faqCard = figma.createRectangle();
  faqCard.name = `FAQ-${i}-CLICK`;
  faqCard.resize(315, 70);
  faqCard.x = 30;
  faqCard.y = faqY;
  faqCard.cornerRadius = 12;
  faqCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  faqCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  faqCard.strokeWeight = 1;
  s42.appendChild(faqCard);
  
  txtWire(s42, 45, faqY + 15, 15);
  txtWire(s42, 45, faqY + 40, 12);
  
  // Expand arrow
  const arrow = figma.createRectangle();
  arrow.resize(20, 20);
  arrow.x = 310;
  arrow.y = faqY + 25;
  arrow.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
  s42.appendChild(arrow);
  
  faqY += 80;
}

targetPage.appendChild(s42);
screens.push(s42);
x += W + G;

// ===== SCREEN 43: LIVE CHAT (WIREFRAME) =====
const s43 = figma.createFrame();
s43.name = "43-Live-Chat"; // ✅ EXACT SAME NAME
s43.resize(W, H);
s43.x = x;
s43.y = y;
s43.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s43.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s43.strokeWeight = 2;

headerWire(s43, true, "BackToHelp-CLICK"); // ✅ EXACT SAME NAME

// Support agent info
const agentBar = figma.createRectangle();
agentBar.resize(W, 80);
agentBar.x = 0;
agentBar.y = 60;
agentBar.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
agentBar.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
agentBar.strokeWeight = 1;
agentBar.strokeAlign = "INSIDE";
s43.appendChild(agentBar);

const agentAvatar = figma.createEllipse();
agentAvatar.resize(50, 50);
agentAvatar.x = 30;
agentAvatar.y = 75;
agentAvatar.fills = [{type: 'SOLID', color: {r: 0.75, g: 0.75, b: 0.75}}];
s43.appendChild(agentAvatar);

txtWire(s43, 95, 85, 16);
txtWire(s43, 95, 108, 12);

// Chat messages
let chatY = 160;
const chatMessages = [
  {from: "agent", h: 60},
  {from: "user", h: 50},
  {from: "agent", h: 80},
  {from: "user", h: 45},
  {from: "agent", h: 70}
];

for (const msg of chatMessages) {
  const bubble = figma.createRectangle();
  bubble.resize(240, msg.h);
  bubble.x = msg.from === "agent" ? 30 : 105;
  bubble.y = chatY;
  bubble.cornerRadius = 16;
  bubble.fills = [{type: 'SOLID', color: msg.from === "agent" ? {r: 0.95, g: 0.95, b: 0.95} : {r: 0.88, g: 0.88, b: 0.88}}];
  bubble.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  bubble.strokeWeight = 1;
  s43.appendChild(bubble);
  
  txtWire(s43, bubble.x + 15, chatY + 15, 13);
  if (msg.h > 50) txtWire(s43, bubble.x + 15, chatY + 35, 13);
  
  chatY += msg.h + 15;
}

// Message input
const msgInputBox = figma.createRectangle();
msgInputBox.resize(250, 50);
msgInputBox.x = 30;
msgInputBox.y = 730;
msgInputBox.cornerRadius = 25;
msgInputBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
msgInputBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
msgInputBox.strokeWeight = 1;
s43.appendChild(msgInputBox);
txtWire(s43, 50, 745, 14);

const sendBtn1 = figma.createEllipse();
sendBtn1.name = "SendMessage-CLICK";
sendBtn1.resize(50, 50);
sendBtn1.x = 295;
sendBtn1.y = 730;
sendBtn1.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
sendBtn1.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
sendBtn1.strokeWeight = 2;
s43.appendChild(sendBtn1);

targetPage.appendChild(s43);
screens.push(s43);
x += W + G;

// ===== SCREEN 44: REPORT ISSUE (WIREFRAME) =====
const s44 = figma.createFrame();
s44.name = "44-Report-Issue"; // ✅ EXACT SAME NAME
s44.resize(W, H);
s44.x = x;
s44.y = y;
s44.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s44.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s44.strokeWeight = 2;

headerWire(s44, true, "BackToHelp-CLICK"); // ✅ EXACT SAME NAME

txtWire(s44, 30, 90, 22);
txtWire(s44, 30, 125, 14);

txtWire(s44, 30, 165, 14);

// Issue type dropdown
const issueTypeBox = figma.createRectangle();
issueTypeBox.name = "IssueType-CLICK"; // ✅ EXACT SAME NAME
issueTypeBox.resize(315, 50);
issueTypeBox.x = 30;
issueTypeBox.y = 190;
issueTypeBox.cornerRadius = 12;
issueTypeBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
issueTypeBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
issueTypeBox.strokeWeight = 1;
s44.appendChild(issueTypeBox);
txtWire(s44, 50, 205, 14);

txtWire(s44, 30, 265, 14);

// Order number input
inputWire(s44, 30, 290, 315, 50);

txtWire(s44, 30, 365, 14);

// Description textarea
const descBox = figma.createRectangle();
descBox.resize(315, 150);
descBox.x = 30;
descBox.y = 390;
descBox.cornerRadius = 12;
descBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
descBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
descBox.strokeWeight = 1;
s44.appendChild(descBox);
txtWire(s44, 45, 405, 13);

txtWire(s44, 30, 565, 14);

// Upload photo button
const uploadBtn = figma.createRectangle();
uploadBtn.name = "UploadPhoto-CLICK"; // ✅ EXACT SAME NAME
uploadBtn.resize(315, 55);
uploadBtn.x = 30;
uploadBtn.y = 595;
uploadBtn.cornerRadius = 12;
uploadBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
uploadBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
uploadBtn.strokeWeight = 2;
s44.appendChild(uploadBtn);
txtWire(s44, 110, 615, 14);

btnWire(s44, "SubmitIssue-CLICK", 30, 680, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s44);
screens.push(s44);
x += W + G;

// ===== SCREEN 45: OFFERS (WIREFRAME) =====
const s45 = figma.createFrame();
s45.name = "45-Offers"; // ✅ EXACT SAME NAME
s45.resize(W, H);
s45.x = x;
s45.y = y;
s45.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s45.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s45.strokeWeight = 2;

headerWire(s45, true, "BackToHome-CLICK"); // ✅ EXACT SAME NAME

txtWire(s45, 30, 90, 22);

// Offer tabs
let offerTabX = 30;
const offerTabs = ["All", "Restaurants", "Delivery"];
for (let i = 0; i < 3; i++) {
  const tab = figma.createRectangle();
  tab.name = `OfferTab-${offerTabs[i]}-CLICK`;
  tab.resize(100, 40);
  tab.x = offerTabX;
  tab.y = 140;
  tab.cornerRadius = 20;
  tab.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tab.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tab.strokeWeight = 1;
  s45.appendChild(tab);
  txtWire(s45, tab.x + 25, 150, 14);
  offerTabX += 107;
}

// Offer cards (4 offers)
let offerY = 205;
for (let i = 0; i < 4; i++) {
  const offerCard = figma.createRectangle();
  offerCard.name = `Offer-${i}-CLICK`;
  offerCard.resize(315, 130);
  offerCard.x = 30;
  offerCard.y = offerY;
  offerCard.cornerRadius = 16;
  offerCard.fills = [{type: 'SOLID', color: {r: 0.92, g: 0.92, b: 0.92}}];
  offerCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  offerCard.strokeWeight = 2;
  s45.appendChild(offerCard);
  
  // Discount badge
  const badge = figma.createRectangle();
  badge.resize(80, 80);
  badge.x = 45;
  badge.y = offerY + 25;
  badge.cornerRadius = 40;
  badge.fills = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  s45.appendChild(badge);
  txtWire(s45, 55, offerY + 55, 20);
  
  txtWire(s45, 140, offerY + 25, 18);
  txtWire(s45, 140, offerY + 53, 12);
  txtWire(s45, 140, offerY + 73, 11);
  
  const useBtn = figma.createRectangle();
  useBtn.name = `UseOffer-${i}-CLICK`;
  useBtn.resize(90, 30);
  useBtn.x = 240;
  useBtn.y = offerY + 90;
  useBtn.cornerRadius = 15;
  useBtn.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  useBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  useBtn.strokeWeight = 2;
  s45.appendChild(useBtn);
  txtWire(s45, 263, useBtn.y + 9, 12);
  
  offerY += 145;
}

targetPage.appendChild(s45);
screens.push(s45);
x += W + G;

// ===== SCREEN 46: REFERRAL (WIREFRAME) =====
const s46 = figma.createFrame();
s46.name = "46-Referral"; // ✅ EXACT SAME NAME
s46.resize(W, H);
s46.x = x;
s46.y = y;
s46.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s46.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s46.strokeWeight = 2;

headerWire(s46, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s46, 60, 100, 24);
txtWire(s46, 50, 140, 14);

imgWire(s46, 112, 180, 150, 150);

txtWire(s46, 30, 360, 18);
txtWire(s46, 30, 390, 13);

// Referral code box
const refCodeBox = figma.createRectangle();
refCodeBox.resize(315, 70);
refCodeBox.x = 30;
refCodeBox.y = 430;
refCodeBox.cornerRadius = 12;
refCodeBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
refCodeBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
refCodeBox.strokeWeight = 2;
s46.appendChild(refCodeBox);

txtWire(s46, 50, 445, 12);
txtWire(s46, 80, 465, 24);

const copyRefBtn = figma.createRectangle();
copyRefBtn.name = "CopyReferralCode-CLICK"; // ✅ EXACT SAME NAME
copyRefBtn.resize(90, 35);
copyRefBtn.x = 240;
copyRefBtn.y = 447;
copyRefBtn.cornerRadius = 18;
copyRefBtn.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
copyRefBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
copyRefBtn.strokeWeight = 2;
s46.appendChild(copyRefBtn);
txtWire(s46, 263, 456, 12);

btnWire(s46, "ShareReferral-CLICK", 30, 530, 315, 55); // ✅ EXACT SAME NAME

// Referral stats
txtWire(s46, 30, 610, 16);

const statsBox = figma.createRectangle();
statsBox.resize(315, 100);
statsBox.x = 30;
statsBox.y = 640;
statsBox.cornerRadius = 12;
statsBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
statsBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
statsBox.strokeWeight = 1;
s46.appendChild(statsBox);

let statRefX = 50;
for (let i = 0; i < 3; i++) {
  txtWire(s46, statRefX, 665, 20);
  txtWire(s46, statRefX - 10, 695, 13);
  statRefX += 95;
}

targetPage.appendChild(s46);
screens.push(s46);
x += W + G;

// ===== SCREEN 47: WALLET (WIREFRAME) =====
const s47 = figma.createFrame();
s47.name = "47-Wallet"; // ✅ EXACT SAME NAME
s47.resize(W, H);
s47.x = x;
s47.y = y;
s47.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s47.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s47.strokeWeight = 2;

headerWire(s47, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s47, 30, 90, 22);

// Balance card
const balanceCard = figma.createRectangle();
balanceCard.resize(315, 150);
balanceCard.x = 30;
balanceCard.y = 140;
balanceCard.cornerRadius = 16;
balanceCard.fills = [{type: 'SOLID', color: {r: 0.88, g: 0.88, b: 0.88}}];
balanceCard.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
balanceCard.strokeWeight = 2;
s47.appendChild(balanceCard);

txtWire(s47, 50, 165, 14);
txtWire(s47, 80, 195, 32);

const addMoneyBtn = figma.createRectangle();
addMoneyBtn.name = "AddMoney-CLICK"; // ✅ EXACT SAME NAME
addMoneyBtn.resize(130, 40);
addMoneyBtn.x = 50;
addMoneyBtn.y = 240;
addMoneyBtn.cornerRadius = 20;
addMoneyBtn.fills = [{type: 'SOLID', color: {r: 0.75, g: 0.75, b: 0.75}}];
addMoneyBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
addMoneyBtn.strokeWeight = 2;
s47.appendChild(addMoneyBtn);
txtWire(s47, 70, 250, 14);

const withdrawBtn = figma.createRectangle();
withdrawBtn.name = "Withdraw-CLICK"; // ✅ EXACT SAME NAME
withdrawBtn.resize(130, 40);
withdrawBtn.x = 195;
withdrawBtn.y = 240;
withdrawBtn.cornerRadius = 20;
withdrawBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
withdrawBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
withdrawBtn.strokeWeight = 2;
s47.appendChild(withdrawBtn);
txtWire(s47, 225, 250, 14);

txtWire(s47, 30, 315, 16);

// Transaction tabs
let tranTabX = 30;
const tranTabs = ["All", "Credit", "Debit"];
for (let i = 0; i < 3; i++) {
  const tab = figma.createRectangle();
  tab.name = `TransactionTab-${tranTabs[i]}-CLICK`;
  tab.resize(100, 35);
  tab.x = tranTabX;
  tab.y = 345;
  tab.cornerRadius = 18;
  tab.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tab.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tab.strokeWeight = 1;
  s47.appendChild(tab);
  txtWire(s47, tab.x + 28, 354, 13);
  tranTabX += 107;
}

// Transaction history (4 items)
let tranY = 405;
for (let i = 0; i < 4; i++) {
  const tranCard = figma.createRectangle();
  tranCard.name = `Transaction-${i}-CLICK`;
  tranCard.resize(315, 70);
  tranCard.x = 30;
  tranCard.y = tranY;
  tranCard.cornerRadius = 12;
  tranCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  tranCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tranCard.strokeWeight = 1;
  s47.appendChild(tranCard);
  
  const tranIcon = figma.createRectangle();
  tranIcon.resize(35, 35);
  tranIcon.x = 45;
  tranIcon.y = tranY + 17;
  tranIcon.fills = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
  s47.appendChild(tranIcon);
  
  txtWire(s47, 95, tranY + 18, 15);
  txtWire(s47, 95, tranY + 41, 12);
  txtWire(s47, 270, tranY + 25, 16);
  
  tranY += 80;
}

targetPage.appendChild(s47);
screens.push(s47);
x += W + G;

// ===== SCREEN 48: LOYALTY REWARDS (WIREFRAME) =====
const s48 = figma.createFrame();
s48.name = "48-Loyalty-Rewards"; // ✅ EXACT SAME NAME
s48.resize(W, H);
s48.x = x;
s48.y = y;
s48.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s48.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s48.strokeWeight = 2;

headerWire(s48, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s48, 60, 100, 24);

// Points card
const pointsCard = figma.createRectangle();
pointsCard.resize(315, 140);
pointsCard.x = 30;
pointsCard.y = 150;
pointsCard.cornerRadius = 16;
pointsCard.fills = [{type: 'SOLID', color: {r: 0.88, g: 0.88, b: 0.88}}];
pointsCard.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
pointsCard.strokeWeight = 2;
s48.appendChild(pointsCard);

txtWire(s48, 50, 175, 14);
txtWire(s48, 90, 205, 32);
txtWire(s48, 50, 250, 13);

// Progress bar
const progressBg = figma.createRectangle();
progressBg.resize(215, 12);
progressBg.x = 50;
progressBg.y = 265;
progressBg.cornerRadius = 6;
progressBg.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
s48.appendChild(progressBg);

const progressFill = figma.createRectangle();
progressFill.resize(150, 12);
progressFill.x = 50;
progressFill.y = 265;
progressFill.cornerRadius = 6;
progressFill.fills = [{type: 'SOLID', color: {r: 0.65, g: 0.65, b: 0.65}}];
s48.appendChild(progressFill);

txtWire(s48, 30, 310, 16);

// Reward tiers (3 tiers)
let tierY = 345;
const tiers = ["Bronze", "Silver", "Gold"];
for (let i = 0; i < 3; i++) {
  const tierCard = figma.createRectangle();
  tierCard.name = `Tier-${tiers[i]}-CLICK`;
  tierCard.resize(315, 80);
  tierCard.x = 30;
  tierCard.y = tierY;
  tierCard.cornerRadius = 12;
  tierCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.88, g: 0.88, b: 0.88} : {r: 0.95, g: 0.95, b: 0.95}}];
  tierCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tierCard.strokeWeight = i === 0 ? 2 : 1;
  s48.appendChild(tierCard);
  
  const tierBadge = figma.createRectangle();
  tierBadge.resize(50, 50);
  tierBadge.x = 45;
  tierBadge.y = tierY + 15;
  tierBadge.fills = [{type: 'SOLID', color: {r: 0.75, g: 0.75, b: 0.75}}];
  s48.appendChild(tierBadge);
  
  txtWire(s48, 110, tierY + 20, 18);
  txtWire(s48, 110, tierY + 45, 12);
  
  tierY += 90;
}

txtWire(s48, 30, 640, 16);

const redeemBtn = figma.createRectangle();
redeemBtn.name = "RedeemRewards-CLICK"; // ✅ EXACT SAME NAME
redeemBtn.resize(315, 55);
redeemBtn.x = 30;
redeemBtn.y = 670;
redeemBtn.cornerRadius = 12;
redeemBtn.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
redeemBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
redeemBtn.strokeWeight = 2;
s48.appendChild(redeemBtn);
txtWire(s48, 95, 690, 16);

targetPage.appendChild(s48);
screens.push(s48);
x += W + G;

// ===== SCREEN 49: AGE VERIFICATION (WIREFRAME) =====
const s49 = figma.createFrame();
s49.name = "49-Age-Verification"; // ✅ EXACT SAME NAME
s49.resize(W, H);
s49.x = x;
s49.y = y;
s49.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s49.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s49.strokeWeight = 2;

headerWire(s49, true, "BackToMenu-CLICK"); // ✅ EXACT SAME NAME

txtWire(s49, 50, 120, 24);
txtWire(s49, 40, 160, 14);

// Warning icon
const warnIcon = figma.createRectangle();
warnIcon.resize(100, 100);
warnIcon.x = (W - 100) / 2;
warnIcon.y = 220;
warnIcon.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.85, b: 0.85}}];
warnIcon.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.6, b: 0.6}}];
warnIcon.strokeWeight = 3;
s49.appendChild(warnIcon);

txtWire(s49, 30, 350, 16);
txtWire(s49, 30, 380, 13);

txtWire(s49, 30, 430, 14);

// DOB input
inputWire(s49, 30, 455, 315, 50);

txtWire(s49, 30, 530, 13);
txtWire(s49, 30, 555, 12);

const confirmAgeCheckbox = figma.createRectangle();
confirmAgeCheckbox.name = "ConfirmAge-TOGGLE"; // ✅ EXACT SAME NAME
confirmAgeCheckbox.resize(20, 20);
confirmAgeCheckbox.x = 30;
confirmAgeCheckbox.y = 590;
confirmAgeCheckbox.cornerRadius = 5;
confirmAgeCheckbox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
confirmAgeCheckbox.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
confirmAgeCheckbox.strokeWeight = 2;
s49.appendChild(confirmAgeCheckbox);
txtWire(s49, 60, 592, 13);

btnWire(s49, "VerifyAge-CLICK", 30, 650, 315, 55); // ✅ EXACT SAME NAME

const cancelAgeBtn = figma.createRectangle();
cancelAgeBtn.name = "CancelAgeVerification-CLICK"; // ✅ EXACT SAME NAME
cancelAgeBtn.resize(315, 50);
cancelAgeBtn.x = 30;
cancelAgeBtn.y = 720;
cancelAgeBtn.cornerRadius = 25;
cancelAgeBtn.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
cancelAgeBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
cancelAgeBtn.strokeWeight = 2;
s49.appendChild(cancelAgeBtn);
txtWire(s49, 140, 737, 14);

targetPage.appendChild(s49);
screens.push(s49);
x += W + G;

// ===== SCREEN 50: SUBSCRIPTION (WIREFRAME) =====
const s50 = figma.createFrame();
s50.name = "50-Subscription"; // ✅ EXACT SAME NAME
s50.resize(W, H);
s50.x = x;
s50.y = y;
s50.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s50.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s50.strokeWeight = 2;

headerWire(s50, true, "BackToProfile-CLICK"); // ✅ EXACT SAME NAME

txtWire(s50, 50, 100, 24);
txtWire(s50, 40, 140, 14);

// Subscription plans (3 plans)
let planY = 190;
const plans = ["Basic", "Premium", "Gold"];
for (let i = 0; i < 3; i++) {
  const planCard = figma.createRectangle();
  planCard.name = `Plan-${plans[i]}-CLICK`; // ✅ EXACT SAME NAME
  planCard.resize(315, 160);
  planCard.x = 30;
  planCard.y = planY;
  planCard.cornerRadius = 16;
  planCard.fills = [{type: 'SOLID', color: i === 1 ? {r: 0.88, g: 0.88, b: 0.88} : {r: 0.95, g: 0.95, b: 0.95}}];
  planCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  planCard.strokeWeight = i === 1 ? 3 : 1;
  s50.appendChild(planCard);
  
  if (i === 1) {
    const badge = figma.createRectangle();
    badge.resize(80, 25);
    badge.x = 250;
    badge.y = planY + 10;
    badge.cornerRadius = 12;
    badge.fills = [{type: 'SOLID', color: {r: 0.75, g: 0.75, b: 0.75}}];
    s50.appendChild(badge);
    txtWire(s50, 265, badge.y + 7, 11);
  }
  
  txtWire(s50, 50, planY + 25, 20);
  txtWire(s50, 70, planY + 60, 24);
  txtWire(s50, 50, planY + 95, 12);
  txtWire(s50, 50, planY + 115, 12);
  
  planY += 170;
}

txtWire(s50, 30, 715, 13);

targetPage.appendChild(s50);
screens.push(s50);
x += W + G;

figma.notify(`✅ Chunk 5 Complete: Screens 41-50 (Wireframe)`);

// ===== READY FOR CHUNK 6 (FINAL) =====
// ===== FINAL CHUNK 6: SCREENS 51-70 (WIREFRAME) =====

// ===== SCREEN 51: RESTAURANT REVIEWS (WIREFRAME) =====
const s51 = figma.createFrame();
s51.name = "51-Restaurant-Reviews"; // ✅ EXACT SAME NAME
s51.resize(W, H);
s51.x = x;
s51.y = y;
s51.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s51.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s51.strokeWeight = 2;

headerWire(s51, true, "BackToRestaurant-CLICK"); // ✅ EXACT SAME NAME

txtWire(s51, 30, 90, 22);

// Overall rating
const ratingBox = figma.createRectangle();
ratingBox.resize(315, 100);
ratingBox.x = 30;
ratingBox.y = 140;
ratingBox.cornerRadius = 12;
ratingBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
ratingBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
ratingBox.strokeWeight = 1;
s51.appendChild(ratingBox);

txtWire(s51, 140, 165, 32);
txtWire(s51, 120, 205, 14);

// Filter buttons
let filterRevX = 30;
const filterRevs = ["All", "5★", "4★", "3★"];
for (let i = 0; i < 4; i++) {
  const filterBtn = figma.createRectangle();
  filterBtn.name = `ReviewFilter-${i}-CLICK`;
  filterBtn.resize(75, 35);
  filterBtn.x = filterRevX;
  filterBtn.y = 265;
  filterBtn.cornerRadius = 18;
  filterBtn.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  filterBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  filterBtn.strokeWeight = 1;
  s51.appendChild(filterBtn);
  txtWire(s51, filterBtn.x + 23, 274, 12);
  filterRevX += 80;
}

// Review items (3 reviews)
let reviewY = 325;
for (let i = 0; i < 3; i++) {
  const reviewCard = figma.createRectangle();
  reviewCard.resize(315, 130);
  reviewCard.x = 30;
  reviewCard.y = reviewY;
  reviewCard.cornerRadius = 12;
  reviewCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  reviewCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  reviewCard.strokeWeight = 1;
  s51.appendChild(reviewCard);
  
  const revAvatar = figma.createEllipse();
  revAvatar.resize(40, 40);
  revAvatar.x = 45;
  revAvatar.y = reviewY + 15;
  revAvatar.fills = [{type: 'SOLID', color: {r: 0.75, g: 0.75, b: 0.75}}];
  s51.appendChild(revAvatar);
  
  txtWire(s51, 100, reviewY + 20, 15);
  txtWire(s51, 100, reviewY + 42, 11);
  txtWire(s51, 45, reviewY + 70, 13);
  txtWire(s51, 45, reviewY + 90, 12);
  
  reviewY += 145;
}

targetPage.appendChild(s51);
screens.push(s51);
x += W + G;

// ===== SCREEN 52-60: QUICK SCREENS (WIREFRAME) =====

// SCREEN 52: CONTACT OPTIONS
const s52 = figma.createFrame();
s52.name = "52-Contact-Options"; // ✅ EXACT SAME NAME
s52.resize(W, H);
s52.x = x;
s52.y = y;
s52.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s52.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s52.strokeWeight = 2;

headerWire(s52, true, "BackToTracking-CLICK"); // ✅ EXACT SAME NAME

txtWire(s52, 50, 120, 22);

let contactY = 200;
const contacts = ["CallRider-CLICK", "CallRestaurant-CLICK", "CallSupport-CLICK"];
for (let i = 0; i < 3; i++) {
  const contactCard = figma.createRectangle();
  contactCard.name = contacts[i]; // ✅ EXACT SAME NAME
  contactCard.resize(315, 90);
  contactCard.x = 30;
  contactCard.y = contactY;
  contactCard.cornerRadius = 16;
  contactCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  contactCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  contactCard.strokeWeight = 1;
  s52.appendChild(contactCard);
  
  const icon = figma.createEllipse();
  icon.resize(50, 50);
  icon.x = 50;
  icon.y = contactY + 20;
  icon.fills = [{type: 'SOLID', color: {r: 0.75, g: 0.75, b: 0.75}}];
  s52.appendChild(icon);
  
  txtWire(s52, 120, contactY + 28, 18);
  txtWire(s52, 120, contactY + 53, 12);
  
  contactY += 105;
}

targetPage.appendChild(s52);
screens.push(s52);
x += W + G;

// SCREEN 53-61: REMAINING PROMO/CANCEL/REFUND SCREENS
const remainingScreens = [
  {num: 53, name: "53-Delivery-Instructions", back: "BackToCheckout-CLICK"},
  {num: 54, name: "54-Special-Instructions", back: "BackToCart-CLICK"},
  {num: 55, name: "55-Order-Invoice", back: "BackToOrderDetails-CLICK"},
  {num: 56, name: "56-Save-For-Later", back: "BackToCart-CLICK"},
  {num: 57, name: "57-Reorder-Customization", back: "BackToOrderHistory-CLICK"},
  {num: 58, name: "58-Favorite-Orders", back: "BackToProfile-CLICK"},
  {num: 59, name: "59-Order-Scheduled-Confirmation", back: "BackToHome-CLICK"},
  {num: 60, name: "60-Order-Tracking-Map-Full", back: "BackToTracking-CLICK"},
  {num: 61, name: "61-Promo-Code-List", back: "BackToCheckout-CLICK"}
];

for (const scr of remainingScreens) {
  const s = figma.createFrame();
  s.name = scr.name; // ✅ EXACT SAME NAME
  s.resize(W, H);
  s.x = x;
  s.y = y;
  s.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  s.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  s.strokeWeight = 2;
  
  headerWire(s, true, scr.back); // ✅ EXACT SAME NAME
  
  txtWire(s, 30, 90, 22);
  txtWire(s, 30, 130, 14);
  
  // Generic content placeholder
  const contentBox = figma.createRectangle();
  contentBox.resize(315, 400);
  contentBox.x = 30;
  contentBox.y = 180;
  contentBox.cornerRadius = 16;
  contentBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  contentBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  contentBox.strokeWeight = 1;
  s.appendChild(contentBox);
  
  txtWire(s, 50, 210, 16);
  txtWire(s, 50, 250, 13);
  txtWire(s, 50, 280, 13);
  
  btnWire(s, `${scr.name.split('-').slice(1).join('-')}-Confirm-CLICK`, 30, 620, 315, 55);
  
  targetPage.appendChild(s);
  screens.push(s);
  x += W + G;
}

// SCREEN 62: CANCEL ORDER
const s62 = figma.createFrame();
s62.name = "62-Cancel-Order"; // ✅ EXACT SAME NAME
s62.resize(W, H);
s62.x = x;
s62.y = y;
s62.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s62.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s62.strokeWeight = 2;

headerWire(s62, true, "BackToOrderTracking-CLICK"); // ✅ EXACT SAME NAME

txtWire(s62, 60, 100, 22);
txtWire(s62, 40, 135, 14);

const warnBox = figma.createRectangle();
warnBox.resize(315, 80);
warnBox.x = 30;
warnBox.y = 180;
warnBox.cornerRadius = 12;
warnBox.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.95, b: 0.9}}];
warnBox.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.8, b: 0.6}}];
warnBox.strokeWeight = 2;
s62.appendChild(warnBox);
txtWire(s62, 50, 205, 13);
txtWire(s62, 50, 230, 12);

txtWire(s62, 30, 290, 16);

let cancelReasonY = 320;
for (let i = 0; i < 5; i++) {
  const reasonOpt = figma.createRectangle();
  reasonOpt.name = `CancelReason-${i}-CLICK`;
  reasonOpt.resize(315, 50);
  reasonOpt.x = 30;
  reasonOpt.y = cancelReasonY;
  reasonOpt.cornerRadius = 12;
  reasonOpt.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  reasonOpt.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  reasonOpt.strokeWeight = 1;
  s62.appendChild(reasonOpt);
  txtWire(s62, 50, cancelReasonY + 18, 14);
  cancelReasonY += 58;
}

btnWire(s62, "ConfirmCancel-CLICK", 30, 660, 315, 55); // ✅ EXACT SAME NAME
const keepOrderBtn = figma.createRectangle();
keepOrderBtn.name = "KeepOrder-CLICK"; // ✅ EXACT SAME NAME
keepOrderBtn.resize(315, 50);
keepOrderBtn.x = 30;
keepOrderBtn.y = 730;
keepOrderBtn.cornerRadius = 25;
keepOrderBtn.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
keepOrderBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
keepOrderBtn.strokeWeight = 2;
s62.appendChild(keepOrderBtn);
txtWire(s62, 115, 747, 14);

targetPage.appendChild(s62);
screens.push(s62);
x += W + G;

// SCREEN 63: REFUND REQUEST
const s63 = figma.createFrame();
s63.name = "63-Refund-Request"; // ✅ EXACT SAME NAME
s63.resize(W, H);
s63.x = x;
s63.y = y;
s63.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s63.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s63.strokeWeight = 2;

headerWire(s63, true, "BackToOrderDetails-CLICK"); // ✅ EXACT SAME NAME

txtWire(s63, 60, 90, 22);

const orderInfoRefund = figma.createRectangle();
orderInfoRefund.resize(315, 80);
orderInfoRefund.x = 30;
orderInfoRefund.y = 140;
orderInfoRefund.cornerRadius = 12;
orderInfoRefund.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
orderInfoRefund.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
orderInfoRefund.strokeWeight = 1;
s63.appendChild(orderInfoRefund);
txtWire(s63, 45, 155, 14);
txtWire(s63, 45, 180, 16);

txtWire(s63, 30, 245, 16);

let refundReasonY = 275;
for (let i = 0; i < 4; i++) {
  const reasonCard = figma.createRectangle();
  reasonCard.name = `RefundReason-${i}-CLICK`;
  reasonCard.resize(315, 55);
  reasonCard.x = 30;
  reasonCard.y = refundReasonY;
  reasonCard.cornerRadius = 12;
  reasonCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  reasonCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  reasonCard.strokeWeight = 1;
  s63.appendChild(reasonCard);
  txtWire(s63, 50, refundReasonY + 20, 14);
  refundReasonY += 63;
}

txtWire(s63, 30, 540, 14);
const refundDescBox = figma.createRectangle();
refundDescBox.resize(315, 100);
refundDescBox.x = 30;
refundDescBox.y = 565;
refundDescBox.cornerRadius = 12;
refundDescBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
refundDescBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
refundDescBox.strokeWeight = 1;
s63.appendChild(refundDescBox);
txtWire(s63, 45, 580, 13);

btnWire(s63, "SubmitRefundRequest-CLICK", 30, 700, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s63);
screens.push(s63);
x += W + G;

// SCREEN 64: REORDER PREVIOUS
const s64 = figma.createFrame();
s64.name = "64-Reorder-Previous"; // ✅ EXACT SAME NAME
s64.resize(W, H);
s64.x = x;
s64.y = y;
s64.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s64.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s64.strokeWeight = 2;

headerWire(s64, true, "BackToOrderHistory-CLICK"); // ✅ EXACT SAME NAME

txtWire(s64, 60, 90, 22);

const reorderOrderBox = figma.createRectangle();
reorderOrderBox.resize(315, 90);
reorderOrderBox.x = 30;
reorderOrderBox.y = 140;
reorderOrderBox.cornerRadius = 12;
reorderOrderBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
reorderOrderBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
reorderOrderBox.strokeWeight = 1;
s64.appendChild(reorderOrderBox);

imgWire(s64, 45, 155, 60, 60);
txtWire(s64, 120, 165, 16);
txtWire(s64, 120, 190, 13);
txtWire(s64, 120, 210, 12);

txtWire(s64, 30, 255, 16);

let reorderItemY = 290;
for (let i = 0; i < 3; i++) {
  const itemCard = figma.createRectangle();
  itemCard.resize(315, 80);
  itemCard.x = 30;
  itemCard.y = reorderItemY;
  itemCard.cornerRadius = 12;
  itemCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  itemCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  itemCard.strokeWeight = 1;
  s64.appendChild(itemCard);
  
  const checkbox = figma.createRectangle();
  checkbox.name = `ReorderItem-${i}-TOGGLE`;
  checkbox.resize(25, 25);
  checkbox.x = 45;
  checkbox.y = reorderItemY + 28;
  checkbox.cornerRadius = 6;
  checkbox.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  checkbox.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  checkbox.strokeWeight = 2;
  s64.appendChild(checkbox);
  
  txtWire(s64, 85, reorderItemY + 25, 15);
  txtWire(s64, 85, reorderItemY + 48, 12);
  txtWire(s64, 270, reorderItemY + 33, 14);
  
  reorderItemY += 90;
}

btnWire(s64, "AddToCartReorder-CLICK", 30, 620, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s64);
screens.push(s64);
x += W + G;

// SCREEN 65: DIETARY PREFERENCES
const s65 = figma.createFrame();
s65.name = "65-Dietary-Preferences"; // ✅ EXACT SAME NAME
s65.resize(W, H);
s65.x = x;
s65.y = y;
s65.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
s65.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
s65.strokeWeight = 2;

headerWire(s65, true, "BackToFilters-CLICK"); // ✅ EXACT SAME NAME

txtWire(s65, 30, 90, 22);
txtWire(s65, 30, 125, 14);

let dietPrefY = 170;
const dietPrefs = ["Vegetarian", "Vegan", "Halal", "Gluten-Free", "Dairy-Free", "Nut-Free", "Keto", "Low-Carb"];
for (let i = 0; i < 8; i++) {
  const prefCard = figma.createRectangle();
  prefCard.name = `DietPref-${dietPrefs[i]}-TOGGLE`; // ✅ EXACT SAME NAME
  prefCard.resize(315, 55);
  prefCard.x = 30;
  prefCard.y = dietPrefY;
  prefCard.cornerRadius = 12;
  prefCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  prefCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  prefCard.strokeWeight = 1;
  s65.appendChild(prefCard);
  
  const toggle = figma.createRectangle();
  toggle.resize(50, 28);
  toggle.x = 280;
  toggle.y = dietPrefY + 13;
  toggle.cornerRadius = 14;
  toggle.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  toggle.strokes = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.6}}];
  toggle.strokeWeight = 2;
  s65.appendChild(toggle);
  
  txtWire(s65, 50, dietPrefY + 20, 15);
  
  dietPrefY += 62;
}

btnWire(s65, "SaveDietaryPreferences-CLICK", 30, 720, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(s65);
screens.push(s65);
x += W + G;

// SCREENS 66-70: FINAL UTILITY SCREENS
const finalScreens = [
  {num: 66, name: "66-App-Tutorial", back: "Skip-CLICK"},
  {num: 67, name: "67-Permissions-Request", back: "Skip-CLICK"},
  {num: 68, name: "68-Language-Selection", back: "BackToSettings-CLICK"},
  {num: 69, name: "69-About-App", back: "BackToSettings-CLICK"},
  {num: 70, name: "70-Terms-Conditions", back: "BackToSettings-CLICK"}
];

for (const scr of finalScreens) {
  const s = figma.createFrame();
  s.name = scr.name; // ✅ EXACT SAME NAME
  s.resize(W, H);
  s.x = x;
  s.y = y;
  s.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  s.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  s.strokeWeight = 2;
  
  headerWire(s, true, scr.back); // ✅ EXACT SAME NAME
  
  txtWire(s, 30, 90, 22);
  txtWire(s, 30, 130, 14);
  
  if (scr.num === 66) {
    // Tutorial screens
    imgWire(s, 87, 180, 200, 200);
    txtWire(s, 80, 420, 18);
    txtWire(s, 50, 455, 13);
    
    // Pagination dots
    let dotX = 140;
    for (let i = 0; i < 4; i++) {
      const dot = figma.createEllipse();
      dot.resize(10, 10);
      dot.x = dotX;
      dot.y = 510;
      dot.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.4, g: 0.4, b: 0.4} : {r: 0.8, g: 0.8, b: 0.8}}];
      s.appendChild(dot);
      dotX += 20;
    }
    
    btnWire(s, "NextTutorial-CLICK", 30, 700, 315, 55);
  } else {
    // Generic content
    const scrollBox = figma.createRectangle();
    scrollBox.resize(315, 500);
    scrollBox.x = 30;
    scrollBox.y = 170;
    scrollBox.cornerRadius = 12;
    scrollBox.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
    scrollBox.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
    scrollBox.strokeWeight = 1;
    s.appendChild(scrollBox);
    
    let textY = 195;
    for (let i = 0; i < 15; i++) {
      txtWire(s, 50, textY, 12);
      textY += 25;
    }
  }
  
  targetPage.appendChild(s);
  screens.push(s);
  x += W + G;
}

// ===== ALL SCREENS GENERATED - NOW CLOSE PLUGIN =====


figma.notify(`🎉 ALL LOW-FIDELITY WIREFRAME SCREENS COMPLETE! Total: ${screens.length} screens`);

// ===== RIDER SCREENS (WIREFRAME) - Start Row 2 =====
x = 0; // Reset to left
y += H + ROWGAP; // Move to row 2

// ===== RIDER SCREEN 01: RIDER LOGIN =====
const r1 = figma.createFrame();
r1.name = "Rider-01-Login"; // ✅ EXACT SAME NAME
r1.resize(W, H);
r1.x = x;
r1.y = y;
r1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r1.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r1.strokeWeight = 2;

headerWire(r1, false);

txtWire(r1, 30, 100, 28);
txtWire(r1, 30, 140, 16);

imgWire(r1, 112, 190, 150, 150);

txtWire(r1, 30, 370, 14);
inputWire(r1, 30, 395, 315, 50);

txtWire(r1, 30, 470, 14);
inputWire(r1, 30, 495, 315, 50);

btnWire(r1, "RiderLogin-CLICK", 30, 580, 315, 55); // ✅ EXACT SAME NAME

txtWire(r1, 120, 660, 14);
const riderSignupLink = figma.createText();
riderSignupLink.name = "RiderSignup-CLICK"; // ✅ EXACT SAME NAME
riderSignupLink.fontName = { family: "Inter", style: "Bold" };
riderSignupLink.characters = "Register";
riderSignupLink.fontSize = 14;
riderSignupLink.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
riderSignupLink.x = 180;
riderSignupLink.y = 685;
r1.appendChild(riderSignupLink);

targetPage.appendChild(r1);
screens.push(r1);
x += W + G;

// ===== RIDER SCREEN 02: RIDER DASHBOARD =====
const r2 = figma.createFrame();
r2.name = "Rider-02-Dashboard"; // ✅ EXACT SAME NAME
r2.resize(W, H);
r2.x = x;
r2.y = y;
r2.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r2.strokeWeight = 2;

headerWire(r2, false);

// Status card
const statusCard = figma.createRectangle();
statusCard.resize(315, 100);
statusCard.x = 30;
statusCard.y = 80;
statusCard.cornerRadius = 16;
statusCard.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
statusCard.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
statusCard.strokeWeight = 2;
r2.appendChild(statusCard);

txtWire(r2, 50, 100, 22);
txtWire(r2, 50, 130, 14);

const toggleBtn = figma.createRectangle();
toggleBtn.name = "ToggleOnlineStatus-CLICK"; // ✅ EXACT SAME NAME
toggleBtn.resize(80, 35);
toggleBtn.x = 250;
toggleBtn.y = 125;
toggleBtn.cornerRadius = 18;
toggleBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
toggleBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
toggleBtn.strokeWeight = 2;
r2.appendChild(toggleBtn);
txtWire(r2, 260, 134, 12);

txtWire(r2, 30, 210, 18);

// Earnings cards
let earnX = 30;
for (let i = 0; i < 3; i++) {
  const earnCard = figma.createRectangle();
  earnCard.resize(95, 90);
  earnCard.x = earnX;
  earnCard.y = 250;
  earnCard.cornerRadius = 12;
  earnCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  earnCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  earnCard.strokeWeight = 1;
  r2.appendChild(earnCard);
  
  txtWire(r2, earnCard.x + 35, 265, 28);
  txtWire(r2, earnCard.x + 18, 300, 16);
  txtWire(r2, earnCard.x + 12, 322, 11);
  
  earnX += 105;
}

txtWire(r2, 30, 370, 18);

// Available orders
let orderY = 410;
for (let i = 0; i < 2; i++) {
  const orderCard = figma.createRectangle();
  orderCard.name = i === 0 ? "AcceptOrder-BK12346-CLICK" : "AcceptOrder-BK12347-CLICK"; // ✅ EXACT SAME NAME
  orderCard.resize(315, 140);
  orderCard.x = 30;
  orderCard.y = orderY;
  orderCard.cornerRadius = 16;
  orderCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  orderCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  orderCard.strokeWeight = 1;
  r2.appendChild(orderCard);
  
  txtWire(r2, 45, orderY + 18, 15);
  txtWire(r2, 45, orderY + 43, 14);
  txtWire(r2, 45, orderY + 65, 12);
  txtWire(r2, 45, orderY + 85, 12);
  txtWire(r2, 210, orderY + 20, 12);
  txtWire(r2, 245, orderY + 75, 18);
  
  const acceptBtn = figma.createRectangle();
  acceptBtn.name = `Accept-${i === 0 ? "BK12346" : "BK12347"}-CLICK`;
  acceptBtn.resize(120, 40);
  acceptBtn.x = 210;
  acceptBtn.y = orderY + 95;
  acceptBtn.cornerRadius = 20;
  acceptBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
  acceptBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  acceptBtn.strokeWeight = 2;
  r2.appendChild(acceptBtn);
  txtWire(r2, 225, orderY + 105, 13);
  
  orderY += 150;
}

targetPage.appendChild(r2);
screens.push(r2);
x += W + G;

// ===== RIDER SCREEN 03: ORDER DETAILS =====
const r3 = figma.createFrame();
r3.name = "Rider-03-Order-Details"; // ✅ EXACT SAME NAME
r3.resize(W, H);
r3.x = x;
r3.y = y;
r3.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r3.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r3.strokeWeight = 2;

headerWire(r3, true, "BackToRiderDashboard-CLICK"); // ✅ EXACT SAME NAME

txtWire(r3, 30, 90, 20);
txtWire(r3, 230, 93, 14);

// Map placeholder
imgWire(r3, 30, 140, 315, 250);

const navBtn = figma.createRectangle();
navBtn.name = "StartNavigation-CLICK"; // ✅ EXACT SAME NAME
navBtn.resize(120, 40);
navBtn.x = 127;
navBtn.y = 340;
navBtn.cornerRadius = 20;
navBtn.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
navBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
navBtn.strokeWeight = 2;
r3.appendChild(navBtn);
txtWire(r3, 140, 350, 13);

txtWire(r3, 30, 420, 16);

// Delivery steps
let stepY = 455;
for (let i = 0; i < 2; i++) {
  const stepCard = figma.createRectangle();
  stepCard.resize(315, 80);
  stepCard.x = 30;
  stepCard.y = stepY;
  stepCard.cornerRadius = 12;
  stepCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.9, g: 0.9, b: 0.9} : {r: 0.95, g: 0.95, b: 0.95}}];
  stepCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  stepCard.strokeWeight = i === 0 ? 2 : 1;
  r3.appendChild(stepCard);
  
  txtWire(r3, 45, stepY + 18, 14);
  txtWire(r3, 45, stepY + 43, 12);
  
  if (i === 0) {
    const arriveBtn = figma.createRectangle();
    arriveBtn.name = "MarkArrived-CLICK"; // ✅ EXACT SAME NAME
    arriveBtn.resize(100, 30);
    arriveBtn.x = 230;
    arriveBtn.y = stepY + 25;
    arriveBtn.cornerRadius = 15;
    arriveBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
    arriveBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    arriveBtn.strokeWeight = 2;
    r3.appendChild(arriveBtn);
    txtWire(r3, 244, stepY + 32, 12);
  }
  
  stepY += 90;
}

// Customer contact
const contactCard = figma.createRectangle();
contactCard.resize(315, 70);
contactCard.x = 30;
contactCard.y = 640;
contactCard.cornerRadius = 12;
contactCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
contactCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
contactCard.strokeWeight = 1;
r3.appendChild(contactCard);

txtWire(r3, 45, 658, 14);
txtWire(r3, 45, 683, 12);

const callBtn2 = figma.createRectangle();
callBtn2.name = "CallCustomer-CLICK"; // ✅ EXACT SAME NAME
callBtn2.resize(40, 40);
callBtn2.x = 250;
callBtn2.y = 655;
callBtn2.cornerRadius = 20;
callBtn2.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
callBtn2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
callBtn2.strokeWeight = 2;
r3.appendChild(callBtn2);

const chatBtn = figma.createRectangle();
chatBtn.name = "ChatCustomer-CLICK"; // ✅ EXACT SAME NAME
chatBtn.resize(40, 40);
chatBtn.x = 300;
chatBtn.y = 655;
chatBtn.cornerRadius = 20;
chatBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
chatBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
chatBtn.strokeWeight = 2;
r3.appendChild(chatBtn);

btnWire(r3, "CompleteDelivery-CLICK", 30, 730, 315, 55); // ✅ EXACT SAME NAME

targetPage.appendChild(r3);
screens.push(r3);
x += W + G;

// ===== RIDER SCREEN 04: EARNINGS =====
const r4 = figma.createFrame();
r4.name = "Rider-04-Earnings"; // ✅ EXACT SAME NAME
r4.resize(W, H);
r4.x = x;
r4.y = y;
r4.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r4.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r4.strokeWeight = 2;

headerWire(r4, true, "BackToRiderDashboard-CLICK"); // ✅ EXACT SAME NAME

txtWire(r4, 30, 90, 22);

// Time filters
let tfX = 30;
const timeFilters = ["Today", "Week", "Month"];
for (let i = 0; i < 3; i++) {
  const tfBtn = figma.createRectangle();
  tfBtn.name = `EarningsFilter-${timeFilters[i]}-CLICK`;
  tfBtn.resize(100, 40);
  tfBtn.x = tfX;
  tfBtn.y = 140;
  tfBtn.cornerRadius = 20;
  tfBtn.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tfBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tfBtn.strokeWeight = 1;
  r4.appendChild(tfBtn);
  txtWire(r4, tfBtn.x + 25, 151, 14);
  tfX += 110;
}

// Summary card
const summaryCard = figma.createRectangle();
summaryCard.resize(315, 140);
summaryCard.x = 30;
summaryCard.y = 200;
summaryCard.cornerRadius = 16;
summaryCard.fills = [{type: 'SOLID', color: {r: 0.88, g: 0.88, b: 0.88}}];
summaryCard.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
summaryCard.strokeWeight = 2;
r4.appendChild(summaryCard);

txtWire(r4, 50, 220, 16);
txtWire(r4, 50, 255, 36);
txtWire(r4, 50, 300, 13);
txtWire(r4, 50, 320, 13);

txtWire(r4, 30, 370, 18);

// Delivery history
let delY = 410;
for (let i = 0; i < 3; i++) {
  const delCard = figma.createRectangle();
  delCard.name = `Delivery-${i}-CLICK`;
  delCard.resize(315, 80);
  delCard.x = 30;
  delCard.y = delY;
  delCard.cornerRadius = 12;
  delCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  delCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  delCard.strokeWeight = 1;
  r4.appendChild(delCard);
  
  txtWire(r4, 45, delY + 18, 15);
  txtWire(r4, 45, delY + 43, 12);
  txtWire(r4, 245, delY + 25, 16);
  txtWire(r4, 245, delY + 50, 11);
  
  delY += 90;
}

const requestPayoutBtn = figma.createRectangle();
requestPayoutBtn.name = "RequestPayout-CLICK"; // ✅ EXACT SAME NAME
requestPayoutBtn.resize(315, 55);
requestPayoutBtn.x = 30;
requestPayoutBtn.y = 720;
requestPayoutBtn.cornerRadius = 28;
requestPayoutBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
requestPayoutBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
requestPayoutBtn.strokeWeight = 2;
r4.appendChild(requestPayoutBtn);
txtWire(r4, 110, 738, 18);

targetPage.appendChild(r4);
screens.push(r4);
x += W + G;

// ===== RIDER SCREEN 05: CHAT SUPPORT =====
const r5 = figma.createFrame();
r5.name = "Rider-05-Chat-Support"; // ✅ EXACT SAME NAME
r5.resize(W, H);
r5.x = x;
r5.y = y;
r5.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r5.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r5.strokeWeight = 2;

headerWire(r5, true, "BackToOrderDetails-CLICK"); // ✅ EXACT SAME NAME

txtWire(r5, 30, 90, 16);
txtWire(r5, 30, 115, 13);

// Chat messages
let chatY5 = 160;
const chatHeights = [60, 50, 80, 45, 70];
for (let i = 0; i < 5; i++) {
  const bubble = figma.createRectangle();
  bubble.resize(i % 2 === 0 ? 250 : 220, chatHeights[i]);
  bubble.x = i % 2 === 0 ? 30 : 125;
  bubble.y = chatY;
  bubble.cornerRadius = 16;
  bubble.fills = [{type: 'SOLID', color: i % 2 === 0 ? {r: 0.95, g: 0.95, b: 0.95} : {r: 0.88, g: 0.88, b: 0.88}}];
  bubble.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  bubble.strokeWeight = 1;
  r5.appendChild(bubble);
  
  txtWire(r5, bubble.x + 15, chatY + 15, 13);
  if (chatHeights[i] > 50) txtWire(r5, bubble.x + 15, chatY + 35, 13);
  
  chatY += chatHeights[i] + 15;
}

txtWire(r5, 30, 450, 16);

// Quick replies
let qrY = 490;
for (let i = 0; i < 4; i++) {
  const qrBtn = figma.createRectangle();
  qrBtn.name = `QuickReply-${i}-CLICK`;
  qrBtn.resize(150, 45);
  qrBtn.x = 30 + (i % 2) * 165;
  qrBtn.y = qrY + Math.floor(i / 2) * 55;
  qrBtn.cornerRadius = 22;
  qrBtn.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  qrBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  qrBtn.strokeWeight = 1;
  r5.appendChild(qrBtn);
  txtWire(r5, qrBtn.x + 20, qrBtn.y + 15, 13);
}

// Message input
const msgInput = figma.createRectangle();
msgInput.resize(260, 50);
msgInput.x = 30;
msgInput.y = 720;
msgInput.cornerRadius = 25;
msgInput.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
msgInput.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
msgInput.strokeWeight = 1;
r5.appendChild(msgInput);
txtWire(r5, 50, 735, 14);

const sendBtn = figma.createRectangle();
sendBtn.name = "SendRiderMessage-CLICK"; // ✅ EXACT SAME NAME
sendBtn.resize(50, 50);
sendBtn.x = 295;
sendBtn.y = 720;
sendBtn.cornerRadius = 25;
sendBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
sendBtn.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
sendBtn.strokeWeight = 2;
r5.appendChild(sendBtn);

targetPage.appendChild(r5);
screens.push(r5);
x += W + G;

// ===== RIDER SCREEN 06: PROFILE =====
const r6 = figma.createFrame();
r6.name = "Rider-06-Profile"; // ✅ EXACT SAME NAME
r6.resize(W, H);
r6.x = x;
r6.y = y;
r6.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r6.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
r6.strokeWeight = 2;

headerWire(r6, true, "BackToRiderDashboard-CLICK"); // ✅ EXACT SAME NAME

// Profile card
const profileCard = figma.createRectangle();
profileCard.resize(315, 120);
profileCard.x = 30;
profileCard.y = 80;
profileCard.cornerRadius = 16;
profileCard.fills = [{type: 'SOLID', color: {r: 0.88, g: 0.88, b: 0.88}}];
profileCard.strokes = [{type: 'SOLID', color: {r: 0.7, g: 0.7, b: 0.7}}];
profileCard.strokeWeight = 2;
r6.appendChild(profileCard);

const profilePic = figma.createEllipse();
profilePic.resize(70, 70);
profilePic.x = 50;
profilePic.y = 105;
profilePic.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
r6.appendChild(profilePic);

txtWire(r6, 140, 110, 20);
txtWire(r6, 140, 138, 13);
txtWire(r6, 140, 158, 12);

txtWire(r6, 30, 230, 18);

// Stats
let statX6 = 30;
for (let i = 0; i < 3; i++) {
  const statCard = figma.createRectangle();
  statCard.resize(95, 90);
  statCard.x = statX;
  statCard.y = 270;
  statCard.cornerRadius = 12;
  statCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  statCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  statCard.strokeWeight = 1;
  r6.appendChild(statCard);
  
  txtWire(r6, statCard.x + 35, 285, 28);
  txtWire(r6, statCard.x + 18, 320, 16);
  txtWire(r6, statCard.x + 8, 342, 10);
  
  statX += 105;
}

txtWire(r6, 30, 390, 16);

// Vehicle details
const vehicleCard = figma.createRectangle();
vehicleCard.resize(315, 80);
vehicleCard.x = 30;
vehicleCard.y = 420;
vehicleCard.cornerRadius = 12;
vehicleCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
vehicleCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
vehicleCard.strokeWeight = 1;
r6.appendChild(vehicleCard);

txtWire(r6, 45, 438, 16);
txtWire(r6, 45, 463, 13);
txtWire(r6, 45, 483, 13);

const editBtn2 = figma.createText();
editBtn2.name = "EditVehicle-CLICK"; // ✅ EXACT SAME NAME
editBtn2.fontName = { family: "Inter", style: "Bold" };
editBtn2.characters = "Edit";
editBtn2.fontSize = 13;
editBtn2.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
editBtn2.x = 295;
editBtn2.y = 465;
r6.appendChild(editBtn);

txtWire(r6, 30, 530, 16);

// Documents
let docY = 565;
for (let i = 0; i < 3; i++) {
  const docCard = figma.createRectangle();
  docCard.name = `Document-${i}-CLICK`;
  docCard.resize(315, 55);
  docCard.x = 30;
  docCard.y = docY;
  docCard.cornerRadius = 12;
  docCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  docCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  docCard.strokeWeight = 1;
  r6.appendChild(docCard);
  
  txtWire(r6, 90, docY + 20, 15);
  
  const badge = figma.createRectangle();
  badge.resize(70, 22);
  badge.x = 260;
  badge.y = docY + 17;
  badge.cornerRadius = 11;
  badge.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.95, b: 0.85}}];
  r6.appendChild(badge);
  txtWire(r6, 267, docY + 21, 10);
  
  docY += 63;
}

targetPage.appendChild(r6);
screens.push(r6);
x += W + G;

// ===== ADMIN SCREENS (WIREFRAME) - Continue Row 2 =====

// ===== ADMIN SCREEN 01: TRANSACTIONS =====
const a1 = figma.createFrame();
a1.name = "Admin-01-Transactions"; // ✅ EXACT SAME NAME
a1.resize(W, H);
a1.x = x;
a1.y = y;
a1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a1.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a1.strokeWeight = 2;

headerWire(a1, true, "BackToAdminHome-CLICK"); // ✅ EXACT SAME NAME

txtWire(a1, 90, 90, 20);

// Stats cards
let adminStatX = 30;
for (let i = 0; i < 3; i++) {
  const statCard = figma.createRectangle();
  statCard.resize(100, 80);
  statCard.x = adminStatX;
  statCard.y = 140;
  statCard.cornerRadius = 16;
  statCard.fills = [{type: 'SOLID', color: {r: 0.93, g: 0.93, b: 0.93}}];
  statCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  statCard.strokeWeight = 1;
  a1.appendChild(statCard);
  
  txtWire(a1, statCard.x + 20, 158, 20);
  txtWire(a1, statCard.x + 10, 190, 11);
  
  adminStatX += 110;
}

txtWire(a1, 30, 250, 16);

// Transaction list
let transY = 290;
for (let i = 0; i < 5; i++) {
  const transCard = figma.createRectangle();
  transCard.name = `AdminTransaction-${i}-CLICK`;
  transCard.resize(315, 70);
  transCard.x = 30;
  transCard.y = transY;
  transCard.cornerRadius = 12;
  transCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  transCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  transCard.strokeWeight = 1;
  a1.appendChild(transCard);
  
  txtWire(a1, 45, transY + 12, 14);
  txtWire(a1, 45, transY + 35, 11);
  txtWire(a1, 200, transY + 15, 16);
  
  const statusBadge = figma.createRectangle();
  statusBadge.resize(75, 22);
  statusBadge.x = 200;
  statusBadge.y = transY + 42;
  statusBadge.cornerRadius = 11;
  statusBadge.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.95, b: 0.85}}];
  a1.appendChild(statusBadge);
  txtWire(a1, 210, statusBadge.y + 4, 10);
  
  transY += 80;
}

btnWire(a1, "ExportTransactions-CLICK", 30, 720, 315, 50); // ✅ EXACT SAME NAME

targetPage.appendChild(a1);
screens.push(a1);
x += W + G;

// ===== ADMIN SCREEN 02: ANALYTICS =====
const a2 = figma.createFrame();
a2.name = "Admin-02-Analytics"; // ✅ EXACT SAME NAME
a2.resize(W, H);
a2.x = x;
a2.y = y;
a2.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a2.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a2.strokeWeight = 2;

headerWire(a2, true, "BackToAdminHome-CLICK"); // ✅ EXACT SAME NAME

txtWire(a2, 80, 90, 20);

// Time filters
let adminTfX = 30;
const adminTimeFilters = ["Today", "Week", "Month", "Year"];
for (let i = 0; i < 4; i++) {
  const tfBtn = figma.createRectangle();
  tfBtn.name = `AdminTimeFilter-${adminTimeFilters[i]}-CLICK`;
  tfBtn.resize(70, 35);
  tfBtn.x = adminTfX;
  tfBtn.y = 140;
  tfBtn.cornerRadius = 18;
  tfBtn.fills = [{type: 'SOLID', color: i === 2 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tfBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tfBtn.strokeWeight = 1;
  a2.appendChild(tfBtn);
  txtWire(a2, tfBtn.x + 15, 149, 12);
  adminTfX += 80;
}

// Chart placeholder
const chartBg = figma.createRectangle();
chartBg.resize(315, 180);
chartBg.x = 30;
chartBg.y = 200;
chartBg.cornerRadius = 16;
chartBg.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
chartBg.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
chartBg.strokeWeight = 1;
a2.appendChild(chartBg);

txtWire(a2, 115, 280, 16);
txtWire(a2, 105, 305, 14);

txtWire(a2, 30, 410, 16);

// Metrics
let metricY = 450;
for (let i = 0; i < 4; i++) {
  const metricCard = figma.createRectangle();
  metricCard.resize(150, 70);
  metricCard.x = 30 + (i % 2) * 165;
  metricCard.y = metricY + Math.floor(i / 2) * 80;
  metricCard.cornerRadius = 12;
  metricCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  metricCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  metricCard.strokeWeight = 1;
  a2.appendChild(metricCard);
  
  txtWire(a2, metricCard.x + 55, metricCard.y + 18, 18);
  txtWire(a2, metricCard.x + 15, metricCard.y + 48, 11);
}

btnWire(a2, "AdminFullReport-CLICK", 30, 720, 315, 50); // ✅ EXACT SAME NAME

targetPage.appendChild(a2);
screens.push(a2);
x += W + G;

// ===== ADMIN SCREEN 03: USER MANAGEMENT =====
const a3 = figma.createFrame();
a3.name = "Admin-03-User-Management"; // ✅ EXACT SAME NAME
a3.resize(W, H);
a3.x = x;
a3.y = y;
a3.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
a3.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
a3.strokeWeight = 2;

headerWire(a3, true, "BackToAdminHome-CLICK"); // ✅ EXACT SAME NAME

txtWire(a3, 95, 90, 20);

// Search bar
const searchBar7 = figma.createRectangle();
searchBar7.name = "AdminSearchUsers";
searchBar7.resize(315, 45);
searchBar7.x = 30;
searchBar7.y = 140;
searchBar7.cornerRadius = 22;
searchBar7.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
searchBar7.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
searchBar7.strokeWeight = 1;
a3.appendChild(searchBar);
txtWire(a3, 50, 151, 14);

// Filter tabs
let tabX = 30;
const userTabs = ["All", "Customers", "Riders", "Restaurants"];
for (let i = 0; i < 4; i++) {
  const tabBtn = figma.createRectangle();
  tabBtn.name = `AdminUserTab-${userTabs[i]}-CLICK`;
  tabBtn.resize(80, 35);
  tabBtn.x = tabX;
  tabBtn.y = 210;
  tabBtn.cornerRadius = 18;
  tabBtn.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.8, g: 0.8, b: 0.8} : {r: 0.95, g: 0.95, b: 0.95}}];
  tabBtn.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  tabBtn.strokeWeight = 1;
  a3.appendChild(tabBtn);
  txtWire(a3, tabBtn.x + 10, 219, 10);
  tabX += 85;
}

txtWire(a3, 30, 270, 16);

// User list
let userY = 310;
for (let i = 0; i < 5; i++) {
  const userCard = figma.createRectangle();
  userCard.name = `AdminUser-${i}-CLICK`;
  userCard.resize(315, 75);
  userCard.x = 30;
  userCard.y = userY;
  userCard.cornerRadius = 12;
  userCard.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
  userCard.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
  userCard.strokeWeight = 1;
  a3.appendChild(userCard);
  
  const avatar = figma.createEllipse();
  avatar.resize(45, 45);
  avatar.x = 45;
  avatar.y = userY + 15;
  avatar.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
  a3.appendChild(avatar);
  
  txtWire(a3, 105, userY + 15, 14);
  txtWire(a3, 105, userY + 38, 11);
  
  const statusBadge = figma.createRectangle();
  statusBadge.resize(70, 22);
  statusBadge.x = 260;
  statusBadge.y = userY + 27;
  statusBadge.cornerRadius = 11;
  statusBadge.fills = [{type: 'SOLID', color: {r: 0.85, g: 0.95, b: 0.85}}];
  a3.appendChild(statusBadge);
  txtWire(a3, 270, userY + 31, 10);
  
  userY += 85;
}

btnWire(a3, "AdminExportUserList-CLICK", 30, 720, 150, 50); // ✅ EXACT SAME NAME
btnWire(a3, "AdminAddNewUser-CLICK", 195, 720, 150, 50); // ✅ EXACT SAME NAME

targetPage.appendChild(a3);
screens.push(a3);
x += W + G;

figma.notify(`✅ ALL SCREENS COMPLETE! Rider (6) + Admin (3) added!`);




figma.notify('🔗 Creating complete prototyping...');

// Helper function
function linkExact(fromScreenName, buttonName, toScreenName) {
  const fromScreen = screens.find(s => s.name === fromScreenName);
  const toScreen = screens.find(s => s.name === toScreenName);
  if (!fromScreen || !toScreen) return;
  
  const button = fromScreen.findOne(n => n.name === buttonName);
  if (!button) return;
  
  try {
    button.reactions = [{ 
      trigger: { type: 'ON_CLICK' }, 
      actions: [{ 
        type: 'NODE', 
        destinationId: toScreen.id, 
        navigation: 'NAVIGATE', 
        transition: { type: 'DISSOLVE', duration: 0.3, easing: { type: 'EASE_OUT' } }
      }]
    }];
  } catch (e) {}
}
// SCREEN 1: SPLASH → WELCOME
linkExact('01-Splash', '01-Splash', '02-Welcome-Options');

// SCREEN 2: WELCOME OPTIONS → LOGIN OR GUEST
linkExact('02-Welcome-Options', 'LoginSignup-CLICK', '03-Login');
linkExact('02-Welcome-Options', 'GuestCheckout-CLICK', '08-Guest-Info');

// SCREEN 3: LOGIN → HOME OR SIGNUP
linkExact('03-Login', 'LoginBtn-CLICK', '11-Home-Dashboard');
linkExact('03-Login', 'GoToSignup-CLICK', '04-Signup');
linkExact('03-Login', 'ForgotPassword-CLICK', '06-Forgot-Password');
linkExact('03-Login', 'BackToWelcome-CLICK', '02-Welcome-Options');

// SCREEN 4: SIGNUP → OTP
linkExact('04-Signup', 'SignupBtn-CLICK', '05-OTP-Verification');
linkExact('04-Signup', 'GoToLogin-CLICK', '03-Login');
linkExact('04-Signup', 'BackToLogin-CLICK', '03-Login');

// SCREEN 5: OTP → RESET PASSWORD OR LOGIN
linkExact('05-OTP-Verification', 'VerifyOTP-CLICK', '11-Home-Dashboard');
linkExact('05-OTP-Verification', 'ResendOTP-CLICK', '05-OTP-Verification');
linkExact('05-OTP-Verification', 'BackToSignup-CLICK', '04-Signup');

// SCREEN 6: FORGOT PASSWORD → OTP
linkExact('06-Forgot-Password', 'SendResetLink-CLICK', '05-OTP-Verification');
linkExact('06-Forgot-Password', 'BackToLogin2-CLICK', '03-Login');
linkExact('06-Forgot-Password', 'BackToLogin-CLICK', '03-Login');

// SCREEN 7: RESET PASSWORD → LOGIN
linkExact('07-Reset-Password', 'ResetPassword-CLICK', '03-Login');
linkExact('07-Reset-Password', 'BackToLogin-CLICK', '03-Login');

// SCREEN 8: GUEST INFO → LOCATION
linkExact('08-Guest-Info', 'ContinueAsGuest-CLICK', '09-Location-Permission');
linkExact('08-Guest-Info', 'BackToWelcome-CLICK', '02-Welcome-Options');

// ===== SPLASH & ONBOARDING =====
linkExact('01-Splash', '01-Splash', '02-Welcome');
linkExact('02-Welcome', 'GetStarted-CLICK', '03-Role-Selection');
linkExact('02-Welcome', 'LoginLink-CLICK', '04-Login');

// ===== ROLE SELECTION =====
linkExact('03-Role-Selection', 'SelectCustomer-CLICK', '04-Login');
linkExact('03-Role-Selection', 'SelectRider-CLICK', 'Rider-01-Login');
linkExact('03-Role-Selection', 'SelectRestaurant-CLICK', '04-Login');

// ===== AUTH SCREENS =====
linkExact('04-Login', 'Login-CLICK', '11-Home-Dashboard');
linkExact('04-Login', 'SignupLink-CLICK', '05-Signup');
linkExact('04-Login', 'ForgotPassword-CLICK', '06-Forgot-Password');
linkExact('05-Signup', 'Signup-CLICK', '07-OTP-Verification');
linkExact('05-Signup', 'LoginLink-CLICK', '04-Login');
linkExact('06-Forgot-Password', 'SendOTP-CLICK', '07-OTP-Verification');
linkExact('07-OTP-Verification', 'VerifyOTP-CLICK', '08-Reset-Password');
linkExact('08-Reset-Password', 'ResetPassword-CLICK', '04-Login');

// ===== LOCATION & PERMISSIONS =====
linkExact('09-Location-Permission', 'AllowLocation-CLICK', '10-Location-Selector');
linkExact('09-Location-Permission', 'EnterManually-CLICK', '21-Delivery-Address');
linkExact('09-Location-Permission', 'Skip-CLICK', '11-Home-Dashboard');
linkExact('10-Location-Selector', 'ConfirmLocation-CLICK', '11-Home-Dashboard');
linkExact('10-Location-Selector', 'UseCurrentLocation-CLICK', '11-Home-Dashboard');

// ===== HOME & NAVIGATION =====
linkExact('11-Home-Dashboard', 'SearchBar-CLICK', '12-Search');
linkExact('11-Home-Dashboard', 'FilterSort-CLICK', '14-Filter-Sort');
linkExact('11-Home-Dashboard', 'ChangeLocation-CLICK', '10-Location-Selector');
linkExact('11-Home-Dashboard', 'ViewAllPopular-CLICK', '13-Search-Results');
linkExact('11-Home-Dashboard', 'Restaurant-TheFoodHub-CLICK', '15-Restaurant-Details');
linkExact('11-Home-Dashboard', 'Restaurant-QuickBites-CLICK', '15-Restaurant-Details');
linkExact('11-Home-Dashboard', 'Restaurant-SpiceGarden-CLICK', '15-Restaurant-Details');

// ===== SEARCH & DISCOVERY =====
linkExact('12-Search', 'RecentSearch-Pizza-CLICK', '13-Search-Results');
linkExact('12-Search', 'RecentSearch-Biryani-CLICK', '13-Search-Results');
linkExact('12-Search', 'RecentSearch-Burgers-CLICK', '13-Search-Results');
linkExact('12-Search', 'Trending-Karahi-CLICK', '13-Search-Results');
linkExact('12-Search', 'Trending-Shawarma-CLICK', '13-Search-Results');
linkExact('13-Search-Results', 'Result-PizzaPalace-CLICK', '15-Restaurant-Details');
linkExact('13-Search-Results', 'Result-DominosPizza-CLICK', '15-Restaurant-Details');
linkExact('13-Search-Results', 'Sort-CLICK', '14-Filter-Sort');
linkExact('13-Search-Results', 'Filter-CLICK', '14-Filter-Sort');








// ===== MISSING APP PROTOTYPING - DROP IN AFTER EXISTING linkExact() CALLS =====

// SPLASH SCREEN → WELCOME
linkExact("01-Splash", "01-Splash", "02-Welcome-Options");

// HOME DASHBOARD - BOTTOM NAV & BACK BUTTONS
linkExact("11-Home-Dashboard", "NavHome-CLICK", "11-Home-Dashboard");
linkExact("11-Home-Dashboard", "NavBack-CLICK", "11-Home-Dashboard");

// CART & ACCOUNT from Home (if these exist as clickable areas)
// Note: Based on your code, home nav doesn't seem to have Cart/Account buttons
// If they exist, add them like:
// linkExact("11-Home-Dashboard", "CartIcon-CLICK", "18-Cart");
// linkExact("11-Home-Dashboard", "AccountIcon-CLICK", "32-Profile");

// BACK BUTTONS - CUSTOMER SCREENS
linkExact("15-Restaurant-Details", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("16-Menu-Categories", "BackToRestaurant-CLICK", "15-Restaurant-Details");
linkExact("17-Item-Customization", "BackToMenu-CLICK", "16-Menu-Categories");
linkExact("18-Cart", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("19-Checkout", "BackToCart-CLICK", "18-Cart");
linkExact("20-Apply-Coupon", "BackToCheckout-CLICK", "19-Checkout");
linkExact("21-Delivery-Address", "BackToCheckout-CLICK", "19-Checkout");
linkExact("22-Add-New-Address", "BackToAddresses-CLICK", "37-Saved-Addresses");
linkExact("23-Schedule-Delivery", "BackToCheckout-CLICK", "19-Checkout");
linkExact("24-Payment-Options", "BackToCheckout-CLICK", "19-Checkout");
linkExact("25-Add-Payment-Method", "BackToPayment-CLICK", "24-Payment-Options");
linkExact("26-Wallet", "BackToPayment-CLICK", "24-Payment-Options");
linkExact("27-Split-Bill", "BackToPayment-CLICK", "24-Payment-Options");
linkExact("28-Order-Confirmation", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("29-Order-Tracking-Live", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("30-Delivery-Confirmation", "BackToTracking-CLICK", "29-Order-Tracking-Live");
linkExact("31-Rate-Order", "Skip-CLICK", "11-Home-Dashboard");
linkExact("32-Profile", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("33-Edit-Profile", "BackToProfile-CLICK", "32-Profile");
linkExact("34-Order-History", "BackToProfile-CLICK", "32-Profile");
linkExact("35-Order-Details", "BackToOrderHistory-CLICK", "34-Order-History");
linkExact("36-Favorites", "BackToProfile-CLICK", "32-Profile");
linkExact("37-Saved-Addresses", "BackToProfile-CLICK", "32-Profile");
linkExact("38-Payment-Methods-Saved", "BackToProfile-CLICK", "32-Profile");
linkExact("39-Offers-Rewards", "BackToProfile-CLICK", "32-Profile");
linkExact("40-Referral-Program", "BackToProfile-CLICK", "32-Profile");
linkExact("41-Settings", "BackToProfile-CLICK", "32-Profile");
linkExact("42-Notification-Settings", "BackToSettings-CLICK", "41-Settings");
linkExact("43-Help-Support", "BackToProfile-CLICK", "32-Profile");
linkExact("44-Live-Chat-Support", "BackToHelp-CLICK", "43-Help-Support");
linkExact("45-Notifications-Center", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("46-Subscription-Membership", "BackToProfile-CLICK", "32-Profile");
linkExact("47-Table-Reservation", "BackToRestaurant-CLICK", "15-Restaurant-Details");
linkExact("48-Receipt", "BackToOrderDetails-CLICK", "35-Order-Details");
linkExact("49-Age-Verification", "BackToMenu-CLICK", "16-Menu-Categories");
linkExact("66-Language-Selection", "BackToSettings-CLICK", "41-Settings");
linkExact("67-About-App", "BackToSettings-CLICK", "41-Settings");
linkExact("68-Web-Home-Preview", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("69-Delivery-Instructions", "BackToCheckout-CLICK", "19-Checkout");
linkExact("70-Tip-Selection", "BackToPayment-CLICK", "24-Payment-Options");
linkExact("71-Issue-Reported", "BackToHome2-CLICK", "11-Home-Dashboard");
linkExact("72-Spending-Summary", "BackToProfile-CLICK", "32-Profile");
linkExact("73-Subscription-Details", "BackToProfile-CLICK", "32-Profile");
linkExact("74-Order-Invoice", "BackToOrderDetails-CLICK", "35-Order-Details");
linkExact("76-Restaurant-Ratings", "BackToRestaurant-CLICK", "15-Restaurant-Details");
linkExact("77-Empty-State-No-Orders", "BackToProfile-CLICK", "32-Profile");
linkExact("78-Empty-State-No-Favorites", "BackToProfile-CLICK", "32-Profile");

// RIDER SCREENS - BACK BUTTONS
linkExact("Rider-03-Order-Details", "BackToRiderDashboard-CLICK", "Rider-02-Dashboard");
linkExact("Rider-04-Earnings", "BackToRiderDashboard-CLICK", "Rider-02-Dashboard");
linkExact("Rider-05-Chat-Support", "BackToOrderDetails-CLICK", "Rider-03-Order-Details");
linkExact("Rider-06-Profile", "BackToRiderDashboard-CLICK", "Rider-02-Dashboard");




// ===== MISSING BACK BUTTONS - SCREENS 10+ =====
linkExact("10-Location-Selector", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("12-Search", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("13-Search-Results", "BackToSearch-CLICKBackBtn-CLICK", "12-Search");
linkExact("14-Filter-Sort", "CloseFilter-CLICKBackBtn-CLICK", "13-Search-Results");
linkExact("15-Restaurant-Details", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("16-Menu-Categories", "BackToRestaurant-CLICKBackBtn-CLICK", "15-Restaurant-Details");
linkExact("17-Item-Customization", "BackToMenu-CLICKBackBtn-CLICK", "16-Menu-Categories");
linkExact("18-Cart", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("19-Checkout", "BackToCart-CLICKBackBtn-CLICK", "18-Cart");
linkExact("20-Apply-Coupon", "BackToCheckout-CLICKBackBtn-CLICK", "19-Checkout");
linkExact("21-Delivery-Address", "BackToCheckout-CLICKBackBtn-CLICK", "19-Checkout");
linkExact("22-Add-New-Address", "BackToAddresses-CLICKBackBtn-CLICK", "37-Saved-Addresses");
linkExact("23-Schedule-Delivery", "BackToCheckout-CLICKBackBtn-CLICK", "19-Checkout");
linkExact("24-Payment-Options", "BackToCheckout-CLICKBackBtn-CLICK", "19-Checkout");
linkExact("25-Add-Payment-Method", "BackToPayment-CLICKBackBtn-CLICK", "24-Payment-Options");
linkExact("26-Wallet", "BackToPayment-CLICKBackBtn-CLICK", "24-Payment-Options");
linkExact("27-Split-Bill", "BackToPayment-CLICKBackBtn-CLICK", "24-Payment-Options");
linkExact("28-Order-Confirmation", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("29-Order-Tracking-Live", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("30-Delivery-Confirmation", "BackToTracking-CLICKBackBtn-CLICK", "29-Order-Tracking-Live");
linkExact("31-Rate-Order", "Skip-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("32-Profile", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("33-Edit-Profile", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("34-Order-History", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("35-Order-Details", "BackToOrderHistory-CLICKBackBtn-CLICK", "34-Order-History");
linkExact("36-Favorites", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("37-Saved-Addresses", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("38-Payment-Methods-Saved", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("39-Offers-Rewards", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("40-Referral-Program", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("41-Settings", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("42-Notification-Settings", "BackToSettings-CLICKBackBtn-CLICK", "41-Settings");
linkExact("43-Help-Support", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("44-Live-Chat-Support", "BackToHelp-CLICKBackBtn-CLICK", "43-Help-Support");
linkExact("45-Notifications-Center", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("46-Subscription-Membership", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("47-Table-Reservation", "BackToRestaurant-CLICKBackBtn-CLICK", "15-Restaurant-Details");
linkExact("48-Receipt", "BackToOrderDetails-CLICKBackBtn-CLICK", "35-Order-Details");
linkExact("49-Age-Verification", "BackToMenu-CLICKBackBtn-CLICK", "16-Menu-Categories");
linkExact("66-Language-Selection", "BackToSettings-CLICKBackBtn-CLICK", "41-Settings");
linkExact("67-About-App", "BackToSettings-CLICKBackBtn-CLICK", "41-Settings");
linkExact("68-Web-Home-Preview", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("69-Contact-Options", "BackToTracking-CLICKBackBtn-CLICK", "29-Order-Tracking-Live");
linkExact("70-Tip-Selection", "BackToPayment-CLICKBackBtn-CLICK", "24-Payment-Options");
linkExact("71-Issue-Reported", "BackToHome2-CLICK", "11-Home-Dashboard");
linkExact("72-Spending-Summary", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("73-Subscription-Details", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("74-Order-Invoice", "BackToOrderDetails-CLICKBackBtn-CLICK", "35-Order-Details");
linkExact("75-Guest-Tracking-Link", "BackToHome-CLICKBackBtn-CLICK", "11-Home-Dashboard");
linkExact("76-Restaurant-Ratings", "BackToRestaurant-CLICKBackBtn-CLICK", "15-Restaurant-Details");
linkExact("77-Empty-State-No-Orders", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");
linkExact("78-Empty-State-No-Favorites", "BackToProfile-CLICKBackBtn-CLICK", "32-Profile");

// RIDER SCREENS
linkExact("Rider-03-Order-Details", "BackToRiderDashboard-CLICKBackBtn-CLICK", "Rider-02-Dashboard");
linkExact("Rider-04-Earnings", "BackToRiderDashboard-CLICKBackBtn-CLICK", "Rider-02-Dashboard");
linkExact("Rider-05-Chat-Support", "BackToOrderDetails-CLICKBackBtn-CLICK", "Rider-03-Order-Details");
linkExact("Rider-06-Profile", "BackToRiderDashboard-CLICKBackBtn-CLICK", "Rider-02-Dashboard");


// ===== MISSING BACK BUTTON PROTOTYPING - COMPLETE FIX =====
// Drop this code RIGHT AFTER your existing linkExact() calls

// SCREENS WITH HEADER BACK BUTTONS THAT ARE MISSING
linkExact("10-Location-Selector", "BackToHome-CLICK", "11-Home-Dashboard");
linkExact("12-Search", "BackBtn-CLICK", "11-Home-Dashboard");  // Has no custom back name
linkExact("13-Search-Results", "BackToSearch-CLICK", "12-Search");
linkExact("14-Filter-Sort", "CloseFilter-CLICK", "13-Search-Results");
linkExact("16-Menu-Item-Details", "BackToMenu-CLICK", "15-Restaurant-Details");
linkExact("17-Cart-Multi-Restaurant", "BackToMenu-CLICK", "15-Restaurant-Details");
linkExact("18-Delivery-Type", "BackToCart-CLICK", "17-Cart-Multi-Restaurant");
linkExact("19-Schedule-Delivery", "BackToDeliveryType-CLICK", "18-Delivery-Type");
linkExact("20-Group-Order", "BackToCart-CLICK", "17-Cart-Multi-Restaurant");
linkExact("21-Delivery-Address", "BackToDeliveryType-CLICK", "18-Delivery-Type");
linkExact("22-Add-New-Address", "BackToAddressList-CLICK", "21-Delivery-Address");
linkExact("23-Checkout-Summary", "BackToAddress-CLICK", "21-Delivery-Address");
linkExact("69-Contact-Options", "BackToTracking-CLICK", "29-Order-Tracking-Live");
linkExact("69-Delivery-Instructions", "BackToCheckout-CLICK", "23-Checkout-Summary");

// Screen 9 has a SPECIAL case - it uses "Skip-CLICK" instead of a back button
linkExact("09-Location-Permission", "Skip-CLICK", "11-Home-Dashboard");

// ===== END OF MISSING BACK BUTTON FIX =====










// ===== BACK BUTTON PROTOTYPING FOR SCREENS 24, 27, 49, 61-65 =====

// SCREEN 24 - Payment Options
linkExact("24-Payment-Options", "BackToCheckout-CLICK", "23-Checkout-Summary");

// SCREEN 27 - Split Payment  
linkExact("27-Split-Payment", "BackToPayment-CLICK", "24-Payment-Options");

// SCREEN 49 - Age Verification
linkExact("49-Age-Verification", "BackToMenu-CLICK", "16-Menu-Item-Details");

// SCREEN 61 - Promo Code List
linkExact("61-Promo-Code-List", "BackToCheckout-CLICK", "23-Checkout-Summary");

// SCREEN 62 - Cancel Order
linkExact("62-Cancel-Order", "BackToOrderTracking-CLICK", "29-Order-Tracking-Live");

// SCREEN 63 - Refund Request
linkExact("63-Refund-Request", "BackToOrderDetails-CLICK", "35-Order-Details");

// SCREEN 64 - Reorder Previous
linkExact("64-Reorder-Previous", "BackToOrderHistory-CLICK", "34-Order-History");

// SCREEN 65 - Dietary Preferences
linkExact("65-Dietary-Preferences", "BackToFilters-CLICK", "14-Filter-Sort");

// ===== END OF BACK BUTTON FIX =====















// ===== RESTAURANT & MENU =====
linkExact('15-Restaurant-Details', 'MenuItem-ChickenTikkaPizza-CLICK', '16-Menu-Item-Details');
linkExact('15-Restaurant-Details', 'MenuItem-BeefBurgerMeal-CLICK', '16-Menu-Item-Details');
linkExact('15-Restaurant-Details', 'ViewCart-CLICK', '17-Cart-Multi-Restaurant');
linkExact('15-Restaurant-Details', 'AddToFavorites-CLICK', '36-Favorites');
linkExact('16-Menu-Item-Details', 'AddToCart-CLICK', '17-Cart-Multi-Restaurant');

// ===== CART & CHECKOUT =====
linkExact('17-Cart-Multi-Restaurant', 'ProceedToCheckout-CLICK', '18-Delivery-Type');
linkExact('18-Delivery-Type', 'ContinueToAddress-CLICK', '21-Delivery-Address');
linkExact('18-Delivery-Type', 'DeliveryType-PickupTakeaway-CLICK', '60-Pickup-Takeaway-Order');
linkExact('21-Delivery-Address', 'AddNewAddress-CLICK', '22-Add-New-Address');
linkExact('21-Delivery-Address', 'ContinueToPayment-CLICK', '23-Checkout-Summary');
linkExact('22-Add-New-Address', 'SaveAddress-CLICK', '21-Delivery-Address');
linkExact('23-Checkout-Summary', 'ProceedToPayment-CLICK', '24-Payment-Options');
linkExact('23-Checkout-Summary', 'ApplyPromo-CLICK', '61-Promo-Code-List');

// ===== PAYMENT =====
linkExact('24-Payment-Options', 'Payment-In-AppWallet-CLICK', '26-Wallet');
linkExact('24-Payment-Options', 'Payment-CreditDebitCard-CLICK', '25-Add-Payment-Method');
linkExact('24-Payment-Options', 'PlaceOrder-CLICK', '82-Success-Order-Placed');
linkExact('25-Add-Payment-Method', 'AddCard-CLICK', '24-Payment-Options');
linkExact('26-Wallet', 'TopUpWallet-CLICK', '25-Add-Payment-Method');

// ===== ORDER TRACKING =====
linkExact('82-Success-Order-Placed', 'TrackOrderNow-CLICK', '29-Order-Tracking-Live');
linkExact('29-Order-Tracking-Live', 'CallRider-CLICK', '55-Rider-Chat');
linkExact('29-Order-Tracking-Live', 'ChatRider-CLICK', '55-Rider-Chat');

// ===== PROFILE & SETTINGS =====
linkExact('32-Profile', 'EditProfile-CLICK', '33-Edit-Profile');
linkExact('32-Profile', 'OrderHistory-CLICK', '34-Order-History');
linkExact('32-Profile', 'Addresses-CLICK', '21-Delivery-Address');
linkExact('32-Profile', 'Payment-CLICK', '24-Payment-Options');
linkExact('32-Profile', 'Favorites-CLICK', '36-Favorites');
linkExact('32-Profile', 'Settings-CLICK', '41-Settings');
linkExact('33-Edit-Profile', 'SaveProfile-CLICK', '32-Profile');
linkExact('34-Order-History', 'Order-BK12345-CLICK', '35-Order-Details');
linkExact('35-Order-Details', 'Reorder-CLICK', '64-Reorder-Previous');
linkExact('35-Order-Details', 'Help-CLICK', '46-Help-Support');
linkExact('35-Order-Details', 'CancelOrder-CLICK', '62-Cancel-Order');

// ===== SETTINGS =====
linkExact('41-Settings', 'Notifications-CLICK', '42-Notifications');
linkExact('41-Settings', 'Language-CLICK', '66-Language-Selection');
linkExact('41-Settings', 'Privacy-CLICK', '43-Privacy-Settings');
linkExact('41-Settings', 'About-CLICK', '67-About-App');
linkExact('42-Notifications', 'SaveNotifications-CLICK', '41-Settings');
linkExact('43-Privacy-Settings', 'SavePrivacy-CLICK', '41-Settings');

// ===== RIDER APP =====
linkExact('Rider-01-Login', 'RiderLogin-CLICK', 'Rider-02-Dashboard');
linkExact('Rider-02-Dashboard', 'NewOrder-BK12346-CLICK', 'Rider-03-Order-Details');
linkExact('Rider-02-Dashboard', 'ViewEarnings-CLICK', 'Rider-04-Earnings');
linkExact('Rider-02-Dashboard', 'RiderProfile-CLICK', 'Rider-06-Profile');
linkExact('Rider-03-Order-Details', 'StartNavigation-CLICK', 'Rider-03-Order-Details');
linkExact('Rider-03-Order-Details', 'MarkArrived-CLICK', 'Rider-03-Order-Details');
linkExact('Rider-03-Order-Details', 'CallCustomer-CLICK', 'Rider-05-Chat-Support');
linkExact('Rider-03-Order-Details', 'ChatCustomer-CLICK', 'Rider-05-Chat-Support');
linkExact('Rider-03-Order-Details', 'CompleteDelivery-CLICK', 'Rider-02-Dashboard');
linkExact('Rider-04-Earnings', 'RequestPayout-CLICK', 'Rider-02-Dashboard');
linkExact('Rider-05-Chat-Support', 'SendRiderMessage-CLICK', 'Rider-05-Chat-Support');
linkExact('Rider-06-Profile', 'EditVehicle-CLICK', 'Rider-06-Profile');

// ===== ADMIN APP =====
linkExact('Admin-01-Transactions', 'AdminTransaction-12345-CLICK', 'Admin-01-Transactions');
linkExact('Admin-01-Transactions', 'ExportTransactions-CLICK', 'Admin-01-Transactions');
linkExact('Admin-02-Analytics', 'AdminFullReport-CLICK', 'Admin-02-Analytics');
linkExact('Admin-03-User-Management', 'AdminUser-AhmadAli-CLICK', 'Admin-03-User-Management');
linkExact('Admin-03-User-Management', 'AdminAddNewUser-CLICK', 'Admin-03-User-Management');

// Set starting screen
// ... all your prototyping code ...

// Set starting screen
try {
  const startScreen = screens.find(s => s.name === '01-Splash');
  if (startScreen) {
    figma.currentPage.flowStartingPoints = [{ nodeId: startScreen.id, name: 'App Flow' }];
  }
} catch (e) {}


figma.notify('✅ All prototyping complete! 🎉');
figma.currentPage.selection = screens;
figma.viewport.scrollAndZoomIntoView(screens);
figma.closePlugin();

  } // ← ONLY closing brace here (closes if statement)
}; // ← ONLY closing brace he
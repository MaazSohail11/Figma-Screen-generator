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
    let y = 0;  // ✅ ADD THIS - for row positioning
    const G = 100;
    const ROW_GAP = 150;  // ✅ ADD THIS - gap between rows
    
    
    // ===== ENHANCED COLOR SCHEME =====
    const C = {
      teal: {r: 0.24, g: 0.61, b: 0.61},
      darkTeal: {r: 0.17, g: 0.37, b: 0.37},
      yellow: {r: 0.96, g: 0.72, b: 0.26}, // #F5B841 - Yellow accent for CTAs
      red: {r: 0.91, g: 0.29, b: 0.24},
      white: {r: 1, g: 1, b: 1},
      text: {r: 0.2, g: 0.2, b: 0.2},
      lightBg: {r: 0.95, g: 0.95, b: 0.95},
      gray: {r: 0.7, g: 0.7, b: 0.7},
      green: {r: 0.2, g: 0.7, b: 0.3}
    };
    
    // ===== HELPER FUNCTIONS =====
    
    // Create button with proper styling
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
    
    // Create text element
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
    
    // Create image placeholder with URL reference
    // WORKING VERSION - loads real images OR shows emoji placeholder
async function img(parent, xPos, yPos, w, h, url) {
  // Check if URL is provided
  if (!url || url === '') {
    // NO URL - show emoji placeholder
    const imgRect = figma.createRectangle();
    imgRect.resize(w, h);
    imgRect.x = xPos;
    imgRect.y = yPos;
    imgRect.cornerRadius = 12;
    imgRect.fills = [{ type: 'SOLID', color: C.gray }];
    imgRect.name = `IMG_PLACEHOLDER`;
    parent.appendChild(imgRect);
    
    const urlText = figma.createText();
    urlText.fontName = { family: "Inter", style: "Regular" };
    urlText.characters = "🖼️";
    urlText.fontSize = 24;
    urlText.fills = [{type: 'SOLID', color: C.white}];
    urlText.x = xPos + w/2 - 12;
    urlText.y = yPos + h/2 - 12;
    parent.appendChild(urlText);
    
    return imgRect;
  }
  
  try {
    // HAS URL - load real image using Figma's built-in method
    const image = await figma.createImageAsync(url);
    
    const imgRect = figma.createRectangle();
    imgRect.resize(w, h);
    imgRect.x = xPos;
    imgRect.y = yPos;
    imgRect.cornerRadius = 12;
    imgRect.fills = [{
      type: 'IMAGE',
      scaleMode: 'FILL',
      imageHash: image.hash
    }];
    imgRect.name = `IMG:${url.split('/').pop()}`;
    parent.appendChild(imgRect);
    
    return imgRect;
  } catch (error) {
    // FAILED - show emoji placeholder
    const imgRect = figma.createRectangle();
    imgRect.resize(w, h);
    imgRect.x = xPos;
    imgRect.y = yPos;
    imgRect.cornerRadius = 12;
    imgRect.fills = [{ type: 'SOLID', color: C.gray }];
    imgRect.name = `IMG_FAILED:${url}`;
    parent.appendChild(imgRect);
    
    const urlText = figma.createText();
    urlText.fontName = { family: "Inter", style: "Regular" };
    urlText.characters = "🖼️";
    urlText.fontSize = 24;
    urlText.fills = [{type: 'SOLID', color: C.white}];
    urlText.x = xPos + w/2 - 12;
    urlText.y = yPos + h/2 - 12;
    parent.appendChild(urlText);
    
    console.log(`Failed to load: ${url}`);
    return imgRect;
  }
}

    
    // ENHANCED HEADER - Reduced from 100px to 60px
    function header(parent, title, hasBack, backName) {
      const headerBg = figma.createRectangle();
      headerBg.resize(W, 60); // REDUCED HEIGHT
      headerBg.x = 0;
      headerBg.y = y;
      headerBg.fills = [{type: 'SOLID', color: C.teal}];
      parent.appendChild(headerBg);
      
      if (hasBack) {
        const backBtn = figma.createText();
        backBtn.name = backName || "BackBtn-CLICK";
        backBtn.fontName = { family: "Inter", style: "Bold" };
        backBtn.characters = "←";
        backBtn.fontSize = 24;
        backBtn.fills = [{type: 'SOLID', color: C.white}];
        backBtn.x = 15;
        backBtn.y = 18; // Adjusted for 60px header
        parent.appendChild(backBtn);
      }
      
      const titleTxt = figma.createText();
      titleTxt.fontName = { family: "Inter", style: "Bold" };
      titleTxt.characters = title;
      titleTxt.fontSize = 18;
      titleTxt.fills = [{type: 'SOLID', color: C.white}];
      titleTxt.x = hasBack ? 55 : W/2 - (title.length * 5);
      titleTxt.y = 21; // Adjusted for 60px header
      parent.appendChild(titleTxt);
    }
    
    // Input field helper
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
    
    figma.notify('🚀 Starting generation with ALL enhancements...');
    
    // ==========================================
    // SCREEN 1: SPLASH SCREEN
    // ==========================================
    const s1 = figma.createFrame();
s1.name = "01-Splash";
s1.resize(W, H);
s1.x = x;
s1.y = y;

const gradient1 = figma.createRectangle();
gradient1.resize(W, H);
gradient1.x = 0;
gradient1.y = y;
gradient1.fills = [{
  type: 'GRADIENT_LINEAR',
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
  gradientStops: [
    {position: 0, color: {r: 0.24, g: 0.61, b: 0.61, a: 1}},
    {position: 0.5, color: {r: 0.17, g: 0.37, b: 0.37, a: 1}},
    {position: 1, color: {r: 0.24, g: 0.61, b: 0.61, a: 1}}
  ]
}];
s1.appendChild(gradient1);

// Decorative shapes
for (let i = 0; i < 15; i++) {
  const shape = figma.createEllipse();
  const size = 20 + Math.random() * 40;
  shape.resize(size, size);
  shape.x = Math.random() * W;
  shape.y = Math.random() * H;
  shape.fills = [{type: 'SOLID', color: C.white, opacity: 0.15}];
  s1.appendChild(shape);
}

const logoCircle = figma.createEllipse();
logoCircle.name = "LOGO_PLACEHOLDER";
logoCircle.resize(140, 140);
logoCircle.x = (W - 140) / 2;
logoCircle.y = 350;
logoCircle.fills = [{type: 'SOLID', color: C.white}];
logoCircle.strokes = [{type: 'SOLID', color: C.yellow}];
logoCircle.strokeWeight = 4;
s1.appendChild(logoCircle);

txt(s1, "🍽️", 172, 395, 48, C.teal, "Regular");

// 🔽 NEW: real delivery-style image inside the logo circle
await img(
  s1,
  (W - 120) / 2,  // x (a bit inset within the 140px circle)
  360,            // y (slightly lower than circle top)
  120,            // width
  120,            // height
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
);

txt(s1, "BasKhao", 140, 510, 32, C.white, "Bold");
txt(s1, "Food at your doorstep", 110, 555, 14, C.white, "Regular");

targetPage.appendChild(s1);
screens.push(s1);
x += W + G;

    // ==========================================
    // SCREEN 2: WELCOME OPTIONS
    // ==========================================
    const s2 = figma.createFrame();
    s2.name = "02-Welcome-Options";
    s2.resize(W, H);
    s2.x = x;
    s2.y = y;
    s2.fills = [{type: 'SOLID', color: C.white}];
    
    txt(s2, "Welcome to BasKhao!", 70, 150, 24, C.text, "Bold");
    txt(s2, "Order food from your favorite", 70, 190, 13, C.gray, "Regular");
    txt(s2, "restaurants delivered to your door", 55, 210, 13, C.gray, "Regular");
    
    img(s2, 87, 250, 200, 200, "https://images.unsplash.com/photo-1504674900247-0877df9cc836");
    
    btn(s2, "LoginSignup-CLICK", 30, 490, 315, 55, C.yellow, "Login / Sign Up", 18); // YELLOW BUTTON
    const loginText = figma.createText();
    loginText.fontName = { family: "Inter", style: "Bold" };
    loginText.characters = "Login / Sign Up";
    loginText.fontSize = 18;
    loginText.fills = [{type: 'SOLID', color: C.white}];
    loginText.textAlignHorizontal = "CENTER";
    loginText.x = 130;
    loginText.y = 508;
    s2.appendChild(loginText);
    
    const guestBtn = figma.createRectangle();
    guestBtn.name = "GuestCheckout-CLICK";
    guestBtn.resize(315, 55);
    guestBtn.x = 30;
    guestBtn.y = 560;
    guestBtn.cornerRadius = 28;
    guestBtn.fills = [{type: 'SOLID', color: C.lightBg}];
    s2.appendChild(guestBtn);
    txt(s2, "Continue as Guest", 115, 578, 18, C.text, "Regular");
    
    txt(s2, "Guest Checkout: Order without account", 70, 640, 12, C.gray, "Regular");
    txt(s2, "Limited features • No order history", 80, 660, 11, C.gray, "Regular");
    
    targetPage.appendChild(s2);
    screens.push(s2);
    x += W + G;
    
    // ==========================================
    // SCREEN 3: LOGIN
    // ==========================================
    const s3 = figma.createFrame();
    s3.name = "03-Login";
    s3.resize(W, H);
    s3.x = x;
    s3.y = y;
    s3.fills = [{type: 'SOLID', color: C.white}];
    
    header(s3, "Login", true, "BackToWelcome-CLICK");
    
    txt(s3, "Welcome Back!", 30, 100, 28, C.text, "Bold");
    txt(s3, "Sign in to continue", 30, 140, 16, C.gray, "Regular");
    
    txt(s3, "Email or Phone", 30, 200, 14, C.text, "Semi Bold");
    inputField(s3, 30, 225, 315, 50, "Enter email or phone number");
    
    txt(s3, "Password", 30, 300, 14, C.text, "Semi Bold");
    inputField(s3, 30, 325, 315, 50, "Enter your password");
    
    const forgotTxt = figma.createText();
    forgotTxt.name = "ForgotPassword-CLICK";
    forgotTxt.fontName = { family: "Inter", style: "Bold" };
    forgotTxt.characters = "Forgot Password?";
    forgotTxt.fontSize = 14;
    forgotTxt.fills = [{type: 'SOLID', color: C.teal}];
    forgotTxt.x = 220;
    forgotTxt.y = 390;
    s3.appendChild(forgotTxt);
    
    btn(s3, "LoginBtn-CLICK", 30, 450, 315, 55, C.teal, "Login", 18);
    txt(s3, "Login", 160, 468, 18, C.white, "Bold");
    
    txt(s3, "Don't have an account?", 100, 540, 14, C.gray, "Regular");
    const signupLink = figma.createText();
    signupLink.name = "GoToSignup-CLICK";
    signupLink.fontName = { family: "Inter", style: "Bold" };
    signupLink.characters = "Sign Up";
    signupLink.fontSize = 14;
    signupLink.fills = [{type: 'SOLID', color: C.teal}];
    signupLink.x = 155;
    signupLink.y = 565;
    s3.appendChild(signupLink);
    
    targetPage.appendChild(s3);
    screens.push(s3);
    x += W + G;
    
    // ==========================================
    // SCREEN 4: SIGNUP
    // ==========================================
    const s4 = figma.createFrame();
    s4.name = "04-Signup";
    s4.resize(W, H);
    s4.x = x;
    s4.y = y;
    s4.fills = [{type: 'SOLID', color: C.white}];
    
    header(s4, "Sign Up", true, "BackToLogin-CLICK");
    
    txt(s4, "Create Account", 30, 100, 28, C.text, "Bold");
    txt(s4, "Sign up to get started", 30, 140, 16, C.gray, "Regular");
    
    txt(s4, "Full Name", 30, 190, 14, C.text, "Semi Bold");
    inputField(s4, 30, 215, 315, 50, "Enter your full name");
    
    txt(s4, "Email", 30, 285, 14, C.text, "Semi Bold");
    inputField(s4, 30, 310, 315, 50, "Enter your email");
    
    txt(s4, "Phone Number", 30, 380, 14, C.text, "Semi Bold");
    inputField(s4, 30, 405, 315, 50, "+92 300 1234567");
    
    txt(s4, "Password", 30, 475, 14, C.text, "Semi Bold");
    inputField(s4, 30, 500, 315, 50, "Create password");
    
    btn(s4, "SignupBtn-CLICK", 30, 580, 315, 55, C.yellow, "Sign Up", 18); // YELLOW BUTTON
    txt(s4, "Sign Up", 152, 598, 18, C.white, "Bold");
    
    txt(s4, "Already have account?", 95, 660, 14, C.gray, "Regular");
    const loginLink = figma.createText();
    loginLink.name = "GoToLogin-CLICK";
    loginLink.fontName = { family: "Inter", style: "Bold" };
    loginLink.characters = "Login";
    loginLink.fontSize = 14;
    loginLink.fills = [{type: 'SOLID', color: C.teal}];
    loginLink.x = 165;
    loginLink.y = 685;
    s4.appendChild(loginLink);
    
    targetPage.appendChild(s4);
    screens.push(s4);
    x += W + G;
    
    // ==========================================
    // SCREEN 5: OTP VERIFICATION
    // ==========================================
    const s5 = figma.createFrame();
    s5.name = "05-OTP-Verification";
    s5.resize(W, H);
    s5.x = x;
    s5.y = y;
    s5.fills = [{type: 'SOLID', color: C.white}];
    
    header(s5, "Verify OTP", true, "BackToSignup-CLICK");
    
    txt(s5, "Enter Verification Code", 60, 100, 24, C.text, "Bold");
    txt(s5, "We sent a code to your phone", 70, 140, 14, C.gray, "Regular");
    txt(s5, "+92 300 1234567", 110, 165, 14, C.teal, "Bold");
    
    const otpBoxX = 35;
    const otpBoxY = 240;
    const otpSize = 50;
    const otpGap = 8;
    
    for (let i = 0; i < 6; i++) {
      const otpBox = figma.createRectangle();
      otpBox.name = `OTPBox${i+1}`;
      otpBox.resize(otpSize, otpSize);
      otpBox.x = otpBoxX + (i * (otpSize + otpGap));
      otpBox.y = otpBoxY;
      otpBox.cornerRadius = 12;
      otpBox.fills = [{type: 'SOLID', color: C.lightBg}];
      otpBox.strokes = [{type: 'SOLID', color: C.teal}];
      otpBox.strokeWeight = 2;
      s5.appendChild(otpBox);
    }
    
    txt(s5, "Didn't receive code?", 110, 340, 14, C.gray, "Regular");
    const resendBtn = figma.createText();
    resendBtn.name = "ResendOTP-CLICK";
    resendBtn.fontName = { family: "Inter", style: "Bold" };
    resendBtn.characters = "Resend (60s)";
    resendBtn.fontSize = 14;
    resendBtn.fills = [{type: 'SOLID', color: C.teal}];
    resendBtn.x = 135;
    resendBtn.y = 365;
    s5.appendChild(resendBtn);
    
    btn(s5, "VerifyOTP-CLICK", 30, 450, 315, 55, C.teal, "Verify & Continue", 18);
    txt(s5, "Verify & Continue", 112, 468, 18, C.white, "Bold");
    
    targetPage.appendChild(s5);
    screens.push(s5);
    x += W + G;
    
    // ==========================================
    // SCREEN 6: FORGOT PASSWORD
    // ==========================================
    const s6 = figma.createFrame();
    s6.name = "06-Forgot-Password";
    s6.resize(W, H);
    s6.x = x;
    s6.y = y;
    s6.fills = [{type: 'SOLID', color: C.white}];
    
    header(s6, "Forgot Password", true, "BackToLogin-CLICK");
    
    txt(s6, "Reset Password", 30, 100, 28, C.text, "Bold");
    txt(s6, "Enter email to reset your password", 30, 140, 14, C.gray, "Regular");
    
    await img(s6, 112, 200, 150, 150, "https://images.unsplash.com/photo-1614064641938-3bbee52942c7");
    
    txt(s6, "Email Address", 30, 380, 14, C.text, "Semi Bold");
    inputField(s6, 30, 405, 315, 50, "Enter your email");
    
    btn(s6, "SendResetLink-CLICK", 30, 490, 315, 55, C.teal, "Send Reset Link", 18);
    txt(s6, "Send Reset Link", 115, 508, 18, C.white, "Bold");
    
    txt(s6, "Remember password?", 100, 580, 14, C.gray, "Regular");
    const backLogin = figma.createText();
    backLogin.name = "BackToLogin2-CLICK";
    backLogin.fontName = { family: "Inter", style: "Bold" };
    backLogin.characters = "Login";
    backLogin.fontSize = 14;
    backLogin.fills = [{type: 'SOLID', color: C.teal}];
    backLogin.x = 175;
    backLogin.y = 605;
    s6.appendChild(backLogin);
    
    targetPage.appendChild(s6);
    screens.push(s6);
    x += W + G;
    
    // ==========================================
    // SCREEN 7: RESET PASSWORD
    // ==========================================
    const s7 = figma.createFrame();
    s7.name = "07-Reset-Password";
    s7.resize(W, H);
    s7.x = x;
    s7.y = y;
    s7.fills = [{type: 'SOLID', color: C.white}];
    
    header(s7, "Reset Password", true, "BackToLogin-CLICK");
    
    txt(s7, "Create New Password", 30, 100, 24, C.text, "Bold");
    txt(s7, "Enter a strong password", 30, 135, 14, C.gray, "Regular");
    
    txt(s7, "New Password", 30, 200, 14, C.text, "Semi Bold");
    inputField(s7, 30, 225, 315, 50, "Enter new password");
    
    txt(s7, "Confirm Password", 30, 300, 14, C.text, "Semi Bold");
    inputField(s7, 30, 325, 315, 50, "Re-enter password");
    
    txt(s7, "Password must contain:", 30, 400, 13, C.gray, "Semi Bold");
    txt(s7, "• At least 8 characters", 30, 425, 12, C.gray, "Regular");
    txt(s7, "• One uppercase letter", 30, 445, 12, C.gray, "Regular");
    txt(s7, "• One lowercase letter", 30, 465, 12, C.gray, "Regular");
    txt(s7, "• One number or special character", 30, 485, 12, C.gray, "Regular");
    
    btn(s7, "ResetPassword-CLICK", 30, 550, 315, 55, C.yellow, "Reset Password", 18); // YELLOW
    txt(s7, "Reset Password", 115, 568, 18, C.white, "Bold");
    
    targetPage.appendChild(s7);
    screens.push(s7);
    x += W + G;
    
    // ==========================================
    // SCREEN 8: GUEST INFO
    // ==========================================
    const s8 = figma.createFrame();
    s8.name = "08-Guest-Info";
    s8.resize(W, H);
    s8.x = x;
    s8.y = y;
    s8.fills = [{type: 'SOLID', color: C.white}];
    
    header(s8, "Guest Checkout", true, "BackToWelcome-CLICK");
    
    txt(s8, "Continue as Guest", 30, 100, 24, C.text, "Bold");
    txt(s8, "We need basic info for delivery", 30, 135, 14, C.gray, "Regular");
    
    txt(s8, "Full Name", 30, 190, 14, C.text, "Semi Bold");
    inputField(s8, 30, 215, 315, 50, "Enter your name");
    
    txt(s8, "Phone Number", 30, 285, 14, C.text, "Semi Bold");
    inputField(s8, 30, 310, 315, 50, "+92 300 1234567");
    
    txt(s8, "Delivery Address", 30, 380, 14, C.text, "Semi Bold");
    inputField(s8, 30, 405, 315, 70, "Enter complete address");
    
    const limitBox = figma.createRectangle();
    limitBox.resize(315, 80);
    limitBox.x = 30;
    limitBox.y = 500;
    limitBox.cornerRadius = 12;
    limitBox.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.8}}];
    s8.appendChild(limitBox);
    txt(s8, "⚠️ Guest Limitations:", 45, 515, 14, C.text, "Bold");
    txt(s8, "• No order history", 45, 540, 12, C.gray, "Regular");
    txt(s8, "• No saved addresses", 45, 560, 12, C.gray, "Regular");
    
    btn(s8, "ContinueAsGuest-CLICK", 30, 610, 315, 55, C.teal, "Continue", 18);
    txt(s8, "Continue", 148, 628, 18, C.white, "Bold");
    
    targetPage.appendChild(s8);
    screens.push(s8);
    x += W + G;
    
    // ==========================================
   // ==========================================
// SCREEN 9: LOCATION PERMISSION
// ==========================================
const s9 = figma.createFrame();
s9.name = "09-Location-Permission";
s9.resize(W, H);
s9.x = x;
s9.y = y;
s9.fills = [{type: 'SOLID', color: C.white}];
header(s9, "Location Access", true, "Skip-CLICK");

txt(s9, "Enable Location", 30, 100, 28, C.text, "Bold");
txt(s9, "Find restaurants near you", 30, 140, 16, C.gray, "Regular");

await img(s9, 87, 200, 200, 200, "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400");

txt(s9, "📍 Why we need location:", 30, 430, 16, C.text, "Bold");
txt(s9, "• Show nearby restaurants", 30, 460, 14, C.gray, "Regular");
txt(s9, "• Calculate delivery time", 30, 485, 14, C.gray, "Regular");
txt(s9, "• Accurate delivery tracking", 30, 510, 14, C.gray, "Regular");

btn(s9, "AllowLocation-CLICK", 30, 580, 315, 55, C.yellow, "Allow Location", 18);
txt(s9, "Allow Location", 120, 598, 18, C.white, "Bold");

const manualBtn = figma.createRectangle();
manualBtn.name = "EnterManually-CLICK";
manualBtn.resize(315, 50);
manualBtn.x = 30;
manualBtn.y = 650;
manualBtn.cornerRadius = 25;
manualBtn.fills = [{type: 'SOLID', color: C.lightBg}];
s9.appendChild(manualBtn);
txt(s9, "Enter Address Manually", 95, 667, 16, C.text, "Regular");

targetPage.appendChild(s9);
screens.push(s9);
x += W + G;

// ==========================================
// SCREEN 10: LOCATION SELECTOR
// ==========================================
const s10 = figma.createFrame();
s10.name = "10-Location-Selector";
s10.resize(W, H);
s10.x = x;
s10.y = y;
s10.fills = [{type: 'SOLID', color: C.white}];

header(s10, "Select Location", true, "BackToHome-CLICK");

const searchLoc = figma.createRectangle();
searchLoc.name = "SearchLocation-CLICK";
searchLoc.resize(315, 50);
searchLoc.x = 30;
searchLoc.y = 80;
searchLoc.cornerRadius = 25;
searchLoc.fills = [{type: 'SOLID', color: C.lightBg}];
s10.appendChild(searchLoc);
txt(s10, "🔍 Search location...", 50, 95, 14, C.gray, "Regular");

// Map placeholder - REPLACED WITH REAL MAP IMAGE
await img(s10, 30, 150, 315, 350, "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600");

// Pin icon
const pin = figma.createEllipse();
pin.resize(30, 30);
pin.x = 172;
pin.y = 300;
pin.fills = [{type: 'SOLID', color: C.red}];
s10.appendChild(pin);

const currentLocBtn = figma.createRectangle();
currentLocBtn.name = "UseCurrentLocation-CLICK";
currentLocBtn.resize(200, 45);
currentLocBtn.x = 87;
currentLocBtn.y = 520;
currentLocBtn.cornerRadius = 22;
currentLocBtn.fills = [{type: 'SOLID', color: C.teal}];
s10.appendChild(currentLocBtn);
txt(s10, "📍 Use Current Location", 105, 533, 14, C.white, "Bold");

txt(s10, "Gulberg III, Lahore", 30, 590, 16, C.text, "Bold");
txt(s10, "123 Main Boulevard", 30, 615, 13, C.gray, "Regular");

btn(s10, "ConfirmLocation-CLICK", 30, 680, 315, 55, C.yellow, "Confirm Location", 18);
txt(s10, "Confirm Location", 110, 698, 18, C.white, "Bold");

targetPage.appendChild(s10);
screens.push(s10);
x += W + G;

figma.notify(`✅ Chunk 1/9 Complete - 10 screens created`);

    // ==========================================
    // SCREEN 11: HOME DASHBOARD - ENHANCED
    // ==========================================
    const s11 = figma.createFrame();
s11.name = "11-Home-Dashboard";
s11.resize(W, H);
s11.x = x;
s11.y = y;
s11.fills = [{type: 'SOLID', color: C.white}];

header(s11, "BasKhao", false);

// Search bar with filter button
const searchBar = figma.createRectangle();
searchBar.name = "SearchBar-CLICK";
searchBar.resize(260, 45);
searchBar.x = 30;
searchBar.y = 80;
searchBar.cornerRadius = 22;
searchBar.fills = [{type: 'SOLID', color: C.lightBg}];
s11.appendChild(searchBar);
txt(s11, "🔍 Search restaurants, cuisine...", 50, 91, 13, C.gray, "Regular");

const filterBtn = figma.createRectangle();
filterBtn.name = "FilterSort-CLICK";
filterBtn.resize(50, 45);
filterBtn.x = 295;
filterBtn.y = 80;
filterBtn.cornerRadius = 22;
filterBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW ACCENT
s11.appendChild(filterBtn);
txt(s11, "⚙️", 310, 88, 20, C.white, "Regular");

// Location display
txt(s11, "📍 Gulberg III, Lahore", 30, 145, 14, C.gray, "Regular");
const changeLocBtn = figma.createText();
changeLocBtn.name = "ChangeLocation-CLICK";
changeLocBtn.fontName = { family: "Inter", style: "Bold" };
changeLocBtn.characters = "Change";
changeLocBtn.fontSize = 12;
changeLocBtn.fills = [{type: 'SOLID', color: C.teal}];
changeLocBtn.x = 290;
changeLocBtn.y = 146;
s11.appendChild(changeLocBtn);

// Section title
txt(s11, "Popular Near You", 30, 180, 18, C.text, "Bold");
const viewAllBtn = figma.createText();
viewAllBtn.name = "ViewAllPopular-CLICK";
viewAllBtn.fontName = { family: "Inter", style: "Bold" };
viewAllBtn.characters = "View All →";
viewAllBtn.fontSize = 14;
viewAllBtn.fills = [{type: 'SOLID', color: C.teal}];
viewAllBtn.x = 270;
viewAllBtn.y = 181;
s11.appendChild(viewAllBtn);

// Restaurant cards with real images
const restaurants = [
  {name: "The Food Hub", cuisine: "Fast Food", time: "25-30", rating: "4.5", reviews: "200+", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"},
  {name: "Quick Bites", cuisine: "Burgers", time: "20-25", rating: "4.7", reviews: "350+", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400"},
  {name: "Spice Garden", cuisine: "Desi Food", time: "30-35", rating: "4.6", reviews: "180+", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"}
];

let restY = 220;
for (let i = 0; i < 3; i++) {
  const rest = restaurants[i];
  const restCard = figma.createRectangle();
  restCard.name = `Restaurant-${rest.name.replace(/ /g,'')}-CLICK`;
  restCard.resize(315, 100);
  restCard.x = 30;
  restCard.y = restY;
  restCard.cornerRadius = 16;
  restCard.fills = [{type: 'SOLID', color: C.lightBg}];
  //restCard.effects = [{type: 'DROP_SHADOW', color: {r: 0, g: 0, b: 0, a: 0.1}, offset: {x: 0, y: 2}, radius: 8, visible: true}];
  s11.appendChild(restCard);
  
  await img(s11, 45, restY + 15, 70, 70, rest.img);
  
  txt(s11, rest.name, 130, restY + 20, 16, C.text, "Bold");
  txt(s11, `${rest.cuisine} • ${rest.time} min`, 130, restY + 43, 12, C.gray, "Regular");
  txt(s11, `⭐ ${rest.rating} (${rest.reviews})`, 130, restY + 63, 12, C.text, "Regular");
  
  const freeDelBadge = figma.createRectangle();
  freeDelBadge.resize(75, 20);
  freeDelBadge.x = 240;
  freeDelBadge.y = restY + 63;
  freeDelBadge.cornerRadius = 10;
  freeDelBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
  s11.appendChild(freeDelBadge);
  txt(s11, "Free delivery", 245, restY + 66, 10, C.green, "Bold");
  
  restY += 115;
}

// Categories section
txt(s11, "Explore Categories", 30, 560, 18, C.text, "Bold");

const categories = ["🍕 Pizza", "🍔 Burgers", "🍛 Desi", "🍰 Dessert"];
let catX = 30;
for (const cat of categories) {
  const catCard = figma.createRectangle();
  catCard.name = `Category-${cat.split(' ')[1]}-CLICK`;
  catCard.resize(75, 70);
  catCard.x = catX;
  catCard.y = 600;
  catCard.cornerRadius = 12;
  catCard.fills = [{type: 'SOLID', color: C.lightBg}];
  s11.appendChild(catCard);
  
  const icon = cat.split(' ')[0];
  const label = cat.split(' ')[1];
  txt(s11, icon, catX + 23, 615, 28, C.text, "Regular");
  txt(s11, label, catX + 10, 650, 11, C.text, "Semi Bold");
  
  catX += 80;
}

// Bottom navigation
const navBar = figma.createRectangle();
navBar.resize(W, 70);
navBar.x = 0;
navBar.y = 742;
navBar.fills = [{type: 'SOLID', color: C.white}];
//navBar.effects = [{type: 'DROP_SHADOW', color: {r: 0, g: 0, b: 0, a: 0.1}, offset: {x: 0, y: -2}, radius: 8, visible: true}];
s11.appendChild(navBar);

const navItems = [{icon: "🏠", label: "Home", x: 40}, {icon: "🔍", label: "Search", x: 125}, {icon: "🛒", label: "Cart", x: 210}, {icon: "👤", label: "Profile", x: 295}];
for (const item of navItems) {
  txt(s11, item.icon, item.x, 755, 24, item.label === "Home" ? C.teal : C.gray, "Regular");
  txt(s11, item.label, item.x - 8, 785, 11, item.label === "Home" ? C.teal : C.gray, "Semi Bold");
}

targetPage.appendChild(s11);
screens.push(s11);
x += W + G;

    // ==========================================
    // SCREEN 12: SEARCH
    // ==========================================
    const s12 = figma.createFrame();
    s12.name = "12-Search";
    s12.resize(W, H);
    s12.x = x;
    s12.y = y;
    s12.fills = [{type: 'SOLID', color: C.white}];
    
    header(s12, "Search", false);
    
    const searchInput = figma.createRectangle();
    searchInput.name = "SearchInput";
    searchInput.resize(315, 50);
    searchInput.x = 30;
    searchInput.y = 80;
    searchInput.cornerRadius = 25;
    searchInput.fills = [{type: 'SOLID', color: C.lightBg}];
    s12.appendChild(searchInput);
    txt(s12, "🔍 Pizza, Burgers, Biryani...", 50, 95, 14, C.gray, "Regular");
    
    txt(s12, "Recent Searches", 30, 150, 16, C.text, "Bold");
    
    const recentSearches = ["Pizza", "Biryani", "Burgers", "Chinese"];
    let searchY = 180;
    for (const search of recentSearches) {
      const searchItem = figma.createRectangle();
      searchItem.name = `RecentSearch-${search}-CLICK`;
      searchItem.resize(315, 50);
      searchItem.x = 30;
      searchItem.y = searchY;
      searchItem.cornerRadius = 12;
      searchItem.fills = [{type: 'SOLID', color: C.lightBg}];
      s12.appendChild(searchItem);
      
      txt(s12, "🕐", 45, searchY + 16, 18, C.gray, "Regular");
      txt(s12, search, 80, searchY + 18, 15, C.text, "Regular");
      txt(s12, "×", 320, searchY + 15, 20, C.gray, "Regular");
      
      searchY += 60;
    }
    
    txt(s12, "Trending Now", 30, 440, 16, C.text, "Bold");
    
    const trending = ["🔥 Karahi", "🔥 Shawarma", "🔥 Sushi"];
    let trendY = 470;
    for (const trend of trending) {
      const trendItem = figma.createRectangle();
      trendItem.name = `Trending-${trend.split(' ')[1]}-CLICK`;
      trendItem.resize(150, 45);
      trendItem.x = 30 + (trending.indexOf(trend) % 2) * 165;
      trendItem.y = trendY + Math.floor(trending.indexOf(trend) / 2) * 55;
      trendItem.cornerRadius = 22;
      trendItem.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.9}}];
      s12.appendChild(trendItem);
      
      txt(s12, trend, trendItem.x + 30, trendItem.y + 15, 14, C.text, "Regular");
    }
    
    targetPage.appendChild(s12);
    screens.push(s12);
    x += W + G;
    
   // ==========================================
// SCREEN 13: SEARCH RESULTS
// ==========================================
const s13 = figma.createFrame();
s13.name = "13-Search-Results";
s13.resize(W, H);
s13.x = x;
s13.y = y;
s13.fills = [{type: 'SOLID', color: C.white}];

header(s13, "Search Results", true, "BackToSearch-CLICK");

const searchInput2 = figma.createRectangle();
searchInput2.name = "SearchInput";
searchInput2.resize(315, 45);
searchInput2.x = 30;
searchInput2.y = 80;
searchInput2.cornerRadius = 22;
searchInput2.fills = [{type: 'SOLID', color: C.lightBg}];
s13.appendChild(searchInput2);
txt(s13, "🔍 Pizza", 50, 92, 14, C.text, "Bold");

txt(s13, "Found 12 results", 30, 145, 14, C.gray, "Regular");

const sortBtn = figma.createRectangle();
sortBtn.name = "Sort-CLICK";
sortBtn.resize(90, 35);
sortBtn.x = 190;
sortBtn.y = 140;
sortBtn.cornerRadius = 18;
sortBtn.fills = [{type: 'SOLID', color: C.lightBg}];
s13.appendChild(sortBtn);
txt(s13, "Sort by ▾", 210, 149, 12, C.text, "Regular");

const filterBtn2 = figma.createRectangle();
filterBtn2.name = "Filter-CLICK";
filterBtn2.resize(80,80);
filterBtn2.x = 290;
filterBtn2.y = 140;
filterBtn2.cornerRadius = 18;
filterBtn2.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
s13.appendChild(filterBtn2);
txt(s13, "⚙️ Filter", 300, 149, 12, C.white, "Bold");

// Results list
const results = [
  {name: "Pizza Palace", type: "Italian", time: "20-25", rating: "4.8", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"},
  {name: "Domino's Pizza", type: "Fast Food", time: "25-30", rating: "4.5", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"}
];

let resultY = 195;
for (const result of results) {
  const resultCard = figma.createRectangle();
  resultCard.name = `Result-${result.name.replace(/ /g,'')}-CLICK`;
  resultCard.resize(315, 100);
  resultCard.x = 30;
  resultCard.y = resultY;
  resultCard.cornerRadius = 16;
  resultCard.fills = [{type: 'SOLID', color: C.lightBg}];
  s13.appendChild(resultCard);
  
  await img(s13, 45, resultY + 15, 70, 70, result.img);
  
  txt(s13, result.name, 130, resultY + 20, 16, C.text, "Bold");
  txt(s13, `${result.type} • ${result.time} min`, 130, resultY + 43, 12, C.gray, "Regular");
  txt(s13, `⭐ ${result.rating}`, 130, resultY + 63, 12, C.text, "Regular");
  
  const offerBadge = figma.createRectangle();
  offerBadge.resize(60, 20);
  offerBadge.x = 255;
  offerBadge.y = resultY + 20;
  offerBadge.cornerRadius = 10;
  offerBadge.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.3}];
  s13.appendChild(offerBadge);
  txt(s13, "20% OFF", 262, resultY + 24, 9, C.text, "Bold");
  
  resultY += 115;
}

targetPage.appendChild(s13);
screens.push(s13);
x += W + G;

    
    // ==========================================
    // SCREEN 14: FILTER & SORT PANEL
    // ==========================================
    const s14 = figma.createFrame();
    s14.name = "14-Filter-Sort";
    s14.resize(W, H);
    s14.x = x;
    s14.y = y;
    s14.fills = [{type: 'SOLID', color: C.white}];
    
    header(s14, "Filters & Sort", true, "CloseFilter-CLICK");
    
    txt(s14, "Sort By", 30, 90, 18, C.text, "Bold");
    
    const sortOptions = ["Recommended", "Delivery Time", "Rating", "Distance", "Cost: Low to High", "Cost: High to Low"];
    let sortY = 130;
    for (let i = 0; i < sortOptions.length; i++) {
      const sortOpt = figma.createRectangle();
      sortOpt.name = `Sort-${sortOptions[i].replace(/ /g,'')}-CLICK`;
      sortOpt.resize(315, 45);
      sortOpt.x = 30;
      sortOpt.y = sortY;
      sortOpt.cornerRadius = 12;
      //sortOpt.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      s14.appendChild(sortOpt);
      
      txt(s14, sortOptions[i], 50, sortY + 15, 14, C.text, "Regular");
      if (i === 0) {
        txt(s14, "✓", 310, sortY + 13, 18, C.teal, "Bold");
      }
      
      sortY += 52;
    }
    
    txt(s14, "Filters", 30, sortY + 20, 18, C.text, "Bold");
    
    txt(s14, "Dietary Preferences", 30, sortY + 60, 14, C.text, "Semi Bold");
    
    const dietary = ["Vegetarian", "Vegan", "Halal", "Gluten-Free"];
    let dietY = sortY + 90;
    for (const diet of dietary) {
      const checkbox = figma.createRectangle();
      checkbox.name = `Diet-${diet}-TOGGLE`;
      checkbox.resize(20, 20);
      checkbox.x = 30;
      checkbox.y = dietY;
      checkbox.cornerRadius = 5;
      checkbox.fills = [{type: 'SOLID', color: C.lightBg}];
      checkbox.strokes = [{type: 'SOLID', color: C.gray}];
      checkbox.strokeWeight = 2;
      s14.appendChild(checkbox);
      
      txt(s14, diet, 60, dietY + 2, 14, C.text, "Regular");
      dietY += 35;
    }
    
    btn(s14, "ApplyFilters-CLICK", 30, 700, 150, 50, C.teal, "Apply", 16);
    txt(s14, "Apply", 82, 717, 16, C.white, "Bold");
    
    btn(s14, "ResetFilters-CLICK", 195, 700, 150, 50, C.lightBg, "Reset", 16);
    txt(s14, "Reset", 247, 717, 16, C.text, "Bold");
    
    targetPage.appendChild(s14);
    screens.push(s14);
    x += W + G;
    
    // ==========================================
    // SCREEN 15: RESTAURANT DETAILS
    // ==========================================
    const s15 = figma.createFrame();
s15.name = "15-Restaurant-Details";
s15.resize(W, H);
s15.x = x;
s15.y = y;
s15.fills = [{type: 'SOLID', color: C.white}];

// Restaurant cover image
await img(s15, 0, 0, W, 250, "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600");

const backBtnCircle = figma.createEllipse();
backBtnCircle.name = "BackToHome-CLICK";
backBtnCircle.resize(40, 40);
backBtnCircle.x = 15;
backBtnCircle.y = 15;
backBtnCircle.fills = [{type: 'SOLID', color: C.white}];
s15.appendChild(backBtnCircle);
txt(s15, "←", 25, 23, 20, C.text, "Bold");

const favBtnCircle = figma.createEllipse();
favBtnCircle.name = "AddToFavorites-CLICK";
favBtnCircle.resize(40, 40);
favBtnCircle.x = 320;
favBtnCircle.y = 15;
favBtnCircle.fills = [{type: 'SOLID', color: C.white}];
s15.appendChild(favBtnCircle);
txt(s15, "♡", 328, 20, 22, C.red, "Regular");

// Restaurant info card
const infoCard = figma.createRectangle();
infoCard.resize(335, 120);
infoCard.x = 20;
infoCard.y = 200;
infoCard.cornerRadius = 16;
infoCard.fills = [{type: 'SOLID', color: C.white}];
//infoCard.effects = [{type: 'DROP_SHADOW', color: {r: 0, g: 0, b: 0, a: 0.15}, offset: {x: 0, y: 4}, radius: 12, visible: true}];
s15.appendChild(infoCard);

txt(s15, "The Food Hub", 35, 220, 22, C.text, "Bold");
txt(s15, "Fast Food • Pakistani", 35, 250, 14, C.gray, "Regular");
txt(s15, "⭐ 4.5 (200+ ratings)", 35, 275, 13, C.text, "Regular");

const deliveryInfo = figma.createRectangle();
deliveryInfo.resize(150, 30);
deliveryInfo.x = 35;
deliveryInfo.y = 295;
deliveryInfo.cornerRadius = 15;
deliveryInfo.fills = [{type: 'SOLID', color: C.green, opacity: 0.15}];
s15.appendChild(deliveryInfo);
txt(s15, "🚴 25-30 min • Free delivery", 45, 302, 11, C.green, "Bold");

txt(s15, "Menu", 30, 340, 20, C.text, "Bold");

// Menu tabs
const menuTabs = ["All", "Popular", "Pizza", "Burgers", "Drinks"];
let tabX2 = 30;
for (let i = 0; i < menuTabs.length; i++) {
  const tab = figma.createRectangle();
  tab.name = `MenuTab-${menuTabs[i]}-CLICK`;
  tab.resize(65, 35);
  tab.x = tabX2;
  tab.y = 380;
  tab.cornerRadius = 18;
  tab.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
  s15.appendChild(tab);
  
  txt(s15, menuTabs[i], tab.x + 15, 389, 13, i === 0 ? C.white : C.text, "Semi Bold");
  tabX2 += 70;
}

// Menu items
const menuItems = [
  {name: "Chicken Tikka Pizza", price: "Rs 899", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"},
  {name: "Beef Burger Meal", price: "Rs 599", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"}
];

let menuY = 435;
for (const item of menuItems) {
  const menuCard = figma.createRectangle();
  menuCard.name = `MenuItem-${item.name.replace(/ /g,'')}-CLICK`;
  menuCard.resize(315, 90);
  menuCard.x = 30;
  menuCard.y = menuY;
  menuCard.cornerRadius = 12;
  menuCard.fills = [{type: 'SOLID', color: C.lightBg}];
  s15.appendChild(menuCard);
  
  await img(s15, 45, menuY + 15, 60, 60, item.img);
  
  txt(s15, item.name, 120, menuY + 20, 15, C.text, "Bold");
  txt(s15, item.price, 120, menuY + 45, 16, C.teal, "Bold");
  
  const addBtn = figma.createRectangle();
  addBtn.name = `Add-${item.name.replace(/ /g,'')}-CLICK`;
  addBtn.resize(40, 40);
  addBtn.x = 290;
  addBtn.y = menuY + 25;
  addBtn.cornerRadius = 20;
  addBtn.fills = [{type: 'SOLID', color: C.yellow}];
  s15.appendChild(addBtn);
  txt(s15, "+", 304, menuY + 32, 20, C.white, "Bold");
  
  menuY += 100;
}

// View cart button at bottom
const viewCartBtn = figma.createRectangle();
viewCartBtn.name = "ViewCart-CLICK";
viewCartBtn.resize(315, 55);
viewCartBtn.x = 30;
viewCartBtn.y = 720;
viewCartBtn.cornerRadius = 28;
viewCartBtn.fills = [{type: 'SOLID', color: C.teal}];
s15.appendChild(viewCartBtn);
txt(s15, "View Cart • 2 items", 115, 738, 18, C.white, "Bold");

targetPage.appendChild(s15);
screens.push(s15);
x += W + G;

    
   // ==========================================
// SCREEN 16: MENU ITEM DETAILS
// ==========================================
const s16 = figma.createFrame();
s16.name = "16-Menu-Item-Details";
s16.resize(W, H);
s16.x = x;
s16.y = y;
s16.fills = [{type: 'SOLID', color: C.white}];

header(s16, "Item Details", true, "BackToMenu-CLICK");

await img(s16, 37, 80, 300, 220, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600");

txt(s16, "Chicken Tikka Pizza", 30, 320, 24, C.text, "Bold");
txt(s16, "Rs 899", 30, 355, 22, C.teal, "Bold");
txt(s16, "⭐ 4.7 (150+ reviews)", 200, 360, 13, C.gray, "Regular");

txt(s16, "Description", 30, 400, 16, C.text, "Bold");
txt(s16, "Delicious pizza topped with chicken tikka,", 30, 430, 13, C.gray, "Regular");
txt(s16, "onions, capsicum, and special sauce.", 30, 450, 13, C.gray, "Regular");

txt(s16, "Size", 30, 490, 16, C.text, "Bold");
const sizes = ["Small", "Medium", "Large"];
let sizeX = 30;
for (let i = 0; i < sizes.length; i++) {
  const sizeBtn = figma.createRectangle();
  sizeBtn.name = `Size-${sizes[i]}-CLICK`;
  sizeBtn.resize(95, 45);
  sizeBtn.x = sizeX;
  sizeBtn.y = 520;
  sizeBtn.cornerRadius = 22;
  sizeBtn.fills = [{type: 'SOLID', color: i === 1 ? C.teal : C.lightBg}];
  s16.appendChild(sizeBtn);
  
  txt(s16, sizes[i], sizeX + 25, 530, 14, i === 1 ? C.white : C.text, "Semi Bold");
  sizeX += 105;
}

txt(s16, "Add-ons", 30, 590, 16, C.text, "Bold");
const addons = [{name: "Extra Cheese", price: "+Rs 150"}, {name: "Jalapeños", price: "+Rs 50"}];
let addonY = 620;
for (const addon of addons) {
  const addonCheckbox = figma.createRectangle();
  addonCheckbox.name = `Addon-${addon.name.replace(/ /g,'')}-TOGGLE`;
  addonCheckbox.resize(22, 22);
  addonCheckbox.x = 30;
  addonCheckbox.y = addonY;
  addonCheckbox.cornerRadius = 6;
  addonCheckbox.fills = [{type: 'SOLID', color: C.lightBg}];
  addonCheckbox.strokes = [{type: 'SOLID', color: C.gray}];
  addonCheckbox.strokeWeight = 2;
  s16.appendChild(addonCheckbox);
  
  txt(s16, addon.name, 65, addonY + 3, 14, C.text, "Regular");
  txt(s16, addon.price, 250, addonY + 3, 13, C.gray, "Regular");
  addonY += 40;
}

txt(s16, "Special Instructions", 30, 710, 14, C.text, "Semi Bold");
inputField(s16, 30, 735, 315, 50, "Any special requests?");

// Quantity and add to cart
const qtyBg = figma.createRectangle();
qtyBg.resize(100, 45);
qtyBg.x = 30;
qtyBg.y = 820;
qtyBg.cornerRadius = 22;
qtyBg.fills = [{type: 'SOLID', color: C.lightBg}];
s16.appendChild(qtyBg);

txt(s16, "-", 50, 830, 24, C.text, "Bold");
txt(s16, "1", 70, 832, 18, C.text, "Bold");
txt(s16, "+", 95, 830, 24, C.text, "Bold");

const addCartBtn = figma.createRectangle();
addCartBtn.name = "AddToCart-CLICK";
addCartBtn.resize(200, 45);
addCartBtn.x = 145;
addCartBtn.y = 820;
addCartBtn.cornerRadius = 22;
addCartBtn.fills = [{type: 'SOLID', color: C.yellow}];
s16.appendChild(addCartBtn);
txt(s16, "Add to Cart - Rs 899", 165, 830, 15, C.white, "Bold");

targetPage.appendChild(s16);
screens.push(s16);
x += W + G;

// ==========================================
// SCREEN 17: CART - MULTI RESTAURANT
// ==========================================
const s17 = figma.createFrame();
s17.name = "17-Cart-Multi-Restaurant";
s17.resize(W, H);
s17.x = x;
s17.y = y;
s17.fills = [{type: 'SOLID', color: C.white}];

header(s17, "My Cart", true, "BackToMenu-CLICK");

txt(s17, "🛒 Your Order", 30, 90, 22, C.text, "Bold");

// Restaurant 1 section
txt(s17, "The Food Hub", 30, 140, 16, C.text, "Bold");

const cartItem1 = figma.createRectangle();
cartItem1.resize(315, 80);
cartItem1.x = 30;
cartItem1.y = 170;
cartItem1.cornerRadius = 12;
cartItem1.fills = [{type: 'SOLID', color: C.lightBg}];
s17.appendChild(cartItem1);

await img(s17, 45, 185, 50, 50, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200");

txt(s17, "Chicken Tikka Pizza", 110, 185, 14, C.text, "Bold");
txt(s17, "Medium • Extra Cheese", 110, 207, 11, C.gray, "Regular");
txt(s17, "Rs 1,049", 110, 225, 14, C.teal, "Bold");

const qtyControl1 = figma.createRectangle();
qtyControl1.resize(80, 30);
qtyControl1.x = 250;
qtyControl1.y = 210;
qtyControl1.cornerRadius = 15;
qtyControl1.fills = [{type: 'SOLID', color: C.white}];
qtyControl1.strokes = [{type: 'SOLID', color: C.gray}];
qtyControl1.strokeWeight = 1;
s17.appendChild(qtyControl1);
txt(s17, "-", 260, 216, 16, C.text, "Bold");
txt(s17, "1", 285, 217, 14, C.text, "Bold");
txt(s17, "+", 307, 216, 16, C.text, "Bold");

// Restaurant 2 section (different restaurant)
txt(s17, "Quick Bites", 30, 270, 16, C.text, "Bold");

const cartItem2 = figma.createRectangle();
cartItem2.resize(315, 80);
cartItem2.x = 30;
cartItem2.y = 300;
cartItem2.cornerRadius = 12;
cartItem2.fills = [{type: 'SOLID', color: C.lightBg}];
s17.appendChild(cartItem2);

await img(s17, 45, 315, 50, 50, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200");

txt(s17, "Beef Burger Meal", 110, 315, 14, C.text, "Bold");
txt(s17, "With Fries & Drink", 110, 337, 11, C.gray, "Regular");
txt(s17, "Rs 599", 110, 355, 14, C.teal, "Bold");

const qtyControl2 = figma.createRectangle();
qtyControl2.resize(80, 30);
qtyControl2.x = 250;
qtyControl2.y = 340;
qtyControl2.cornerRadius = 15;
qtyControl2.fills = [{type: 'SOLID', color: C.white}];
qtyControl2.strokes = [{type: 'SOLID', color: C.gray}];
qtyControl2.strokeWeight = 1;
s17.appendChild(qtyControl2);
txt(s17, "-", 260, 346, 16, C.text, "Bold");
txt(s17, "2", 285, 347, 14, C.text, "Bold");
txt(s17, "+", 307, 346, 16, C.text, "Bold");

// Warning for multiple restaurants
const warningBox = figma.createRectangle();
warningBox.resize(315, 60);
warningBox.x = 30;
warningBox.y = 400;
warningBox.cornerRadius = 12;
warningBox.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.8}}];
s17.appendChild(warningBox);
txt(s17, "⚠️ Multiple Restaurants", 45, 415, 13, C.text, "Bold");
txt(s17, "Orders will be delivered separately", 45, 437, 11, C.gray, "Regular");

// Bill summary
txt(s17, "Bill Summary", 30, 480, 16, C.text, "Bold");

const billBg = figma.createRectangle();
billBg.resize(315, 150);
billBg.x = 30;
billBg.y = 510;
billBg.cornerRadius = 12;
billBg.fills = [{type: 'SOLID', color: C.lightBg}];
s17.appendChild(billBg);

txt(s17, "Item Total", 45, 525, 13, C.gray, "Regular");
txt(s17, "Rs 2,247", 260, 525, 13, C.text, "Regular");

txt(s17, "Delivery Charges", 45, 550, 13, C.gray, "Regular");
txt(s17, "Rs 150", 270, 550, 13, C.text, "Regular");

txt(s17, "Tax (5%)", 45, 575, 13, C.gray, "Regular");
txt(s17, "Rs 112", 275, 575, 13, C.text, "Regular");

const divider = figma.createLine();
divider.resize(275, 0);
divider.x = 45;
divider.y = 600;
divider.strokes = [{type: 'SOLID', color: C.gray}];
divider.strokeWeight = 1;
s17.appendChild(divider);

txt(s17, "Total Amount", 45, 615, 15, C.text, "Bold");
txt(s17, "Rs 2,509", 255, 615, 16, C.teal, "Bold");

btn(s17, "ProceedToCheckout-CLICK", 30, 690, 315, 55, C.yellow, "Proceed to Checkout", 18);
txt(s17, "Proceed to Checkout", 95, 708, 18, C.white, "Bold");

targetPage.appendChild(s17);
screens.push(s17);
x += W + G;

    
    // ==========================================
    // SCREEN 18: DELIVERY TYPE SELECTION
    // ==========================================
    const s18 = figma.createFrame();
    s18.name = "18-Delivery-Type";
    s18.resize(W, H);
    s18.x = x;
    s18.y = y;
    s18.fills = [{type: 'SOLID', color: C.white}];
    
    header(s18, "Delivery Options", true, "BackToCart-CLICK");
    
    txt(s18, "Choose Delivery Type", 30, 90, 22, C.text, "Bold");
    
    const deliveryTypes = [
      {type: "Standard Delivery", time: "25-30 min", fee: "Free", icon: "🚴"},
      {type: "Express Delivery", time: "15-20 min", fee: "Rs 100", icon: "⚡"},
      {type: "Priority Delivery", time: "10-15 min", fee: "Rs 200", icon: "🚀"},
      {type: "Pickup / Takeaway", time: "Ready in 20 min", fee: "No charges", icon: "🏪"}
    ];
    
    let delY = 150;
    for (let i = 0; i < deliveryTypes.length; i++) {
      const delCard = figma.createRectangle();
      delCard.name = `DeliveryType-${deliveryTypes[i].type.replace(/ /g,'')}-CLICK`;
      delCard.resize(315, 90);
      delCard.x = 30;
      delCard.y = delY;
      delCard.cornerRadius = 16;
      //delCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      //delCard.strokes = [{type: 'SOLID', color: i === 0 ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
      //delCard.strokeWeight = i === 0 ? 2 : 0;
      s18.appendChild(delCard);
      
      txt(s18, deliveryTypes[i].icon, 50, delY + 25, 32, C.text, "Regular");
      txt(s18, deliveryTypes[i].type, 100, delY + 20, 16, C.text, "Bold");
      txt(s18, `⏱️ ${deliveryTypes[i].time}`, 100, delY + 45, 12, C.gray, "Regular");
      txt(s18, deliveryTypes[i].fee, 260, delY + 35, 14, C.teal, "Bold");
      
      if (i === 0) {
        const checkmark = figma.createEllipse();
        checkmark.resize(24, 24);
        checkmark.x = 305;
        checkmark.y = delY + 33;
        checkmark.fills = [{type: 'SOLID', color: C.teal}];
        s18.appendChild(checkmark);
        txt(s18, "✓", 312, delY + 36, 14, C.white, "Bold");
      }
      
      delY += 100;
    }
    
    btn(s18, "ContinueToAddress-CLICK", 30, 700, 315, 55, C.teal, "Continue", 18);
    txt(s18, "Continue", 145, 718, 18, C.white, "Bold");
    
    targetPage.appendChild(s18);
    screens.push(s18);
    x += W + G;
    
    // ==========================================
    // SCREEN 19: SCHEDULE DELIVERY
    // ==========================================
    const s19 = figma.createFrame();
    s19.name = "19-Schedule-Delivery";
    s19.resize(W, H);
    s19.x = x;
    s19.y = y;
    s19.fills = [{type: 'SOLID', color: C.white}];
    
    header(s19, "Schedule Order", true, "BackToDeliveryType-CLICK");
    
    txt(s19, "Schedule for Later", 30, 90, 22, C.text, "Bold");
    txt(s19, "Choose date and time for delivery", 30, 125, 14, C.gray, "Regular");
    
    txt(s19, "Select Date", 30, 170, 16, C.text, "Semi Bold");
    
    const dates = ["Today", "Tomorrow", "Nov 16", "Nov 17"];
    let dateX = 30;
    for (let i = 0; i < dates.length; i++) {
      const dateBtn = figma.createRectangle();
      dateBtn.name = `Date-${dates[i].replace(/ /g,'')}-CLICK`;
      dateBtn.resize(75, 50);
      dateBtn.x = dateX;
      dateBtn.y = 200;
      dateBtn.cornerRadius = 12;
      dateBtn.fills = [{type: 'SOLID', color: i === 1 ? C.teal : C.lightBg}];
      s19.appendChild(dateBtn);
      
      txt(s19, dates[i], dateBtn.x + 12, 218, 14, i === 1 ? C.white : C.text, "Semi Bold");
      dateX += 82;
    }
    
    txt(s19, "Select Time Slot", 30, 280, 16, C.text, "Semi Bold");
    
    const timeSlots = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];
    let slotY = 310;
    for (let i = 0; i < 9; i++) {
      const slotBtn = figma.createRectangle();
      slotBtn.name = `TimeSlot-${timeSlots[i].replace(/ /g,'').replace(/:/g,'')}-CLICK`;
      slotBtn.resize(95, 45);
      slotBtn.x = 30 + (i % 3) * 105;
      slotBtn.y = slotY + Math.floor(i / 3) * 55;
      slotBtn.cornerRadius = 22;
      slotBtn.fills = [{type: 'SOLID', color: i === 4 ? C.teal : C.lightBg}];
      s19.appendChild(slotBtn);
      
      txt(s19, timeSlots[i], slotBtn.x + 18, slotBtn.y + 15, 13, i === 4 ? C.white : C.text, "Semi Bold");
    }
    
    const noteBox = figma.createRectangle();
    noteBox.resize(315, 70);
    noteBox.x = 30;
    noteBox.y = 490;
    noteBox.cornerRadius = 12;
    noteBox.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s19.appendChild(noteBox);
    txt(s19, "📝 Note:", 45, 505, 14, C.text, "Bold");
    txt(s19, "Restaurant will prepare your order fresh", 45, 528, 12, C.gray, "Regular");
    txt(s19, "30 minutes before scheduled time.", 45, 545, 12, C.gray, "Regular");
    
    btn(s19, "ConfirmSchedule-CLICK", 30, 700, 315, 55, C.yellow, "Confirm Schedule", 18); // YELLOW
    txt(s19, "Confirm Schedule", 105, 718, 18, C.white, "Bold");
    
    targetPage.appendChild(s19);
    screens.push(s19);
    x += W + G;
    
    // ==========================================
    // SCREEN 20: GROUP ORDER
    // ==========================================
    const s20 = figma.createFrame();
    s20.name = "20-Group-Order";
    s20.resize(W, H);
    s20.x = x;
    s20.y = y;
    s20.fills = [{type: 'SOLID', color: C.white}];
    
    header(s20, "Group Order", true, "BackToCart-CLICK");
    
    txt(s20, "👥 Order Together", 30, 90, 22, C.text, "Bold");
    txt(s20, "Invite friends to add items to cart", 30, 125, 14, C.gray, "Regular");
    
    const inviteLinkBox = figma.createRectangle();
    inviteLinkBox.resize(315, 70);
    inviteLinkBox.x = 30;
    inviteLinkBox.y = 160;
    inviteLinkBox.cornerRadius = 12;
    inviteLinkBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s20.appendChild(inviteLinkBox);
    
    txt(s20, "🔗 Share Link:", 45, 175, 14, C.text, "Bold");
    txt(s20, "baskhao.app/group/abc123xyz", 45, 197, 12, C.teal, "Regular");
    
    const copyBtn = figma.createRectangle();
    copyBtn.name = "CopyLink-CLICK";
    copyBtn.resize(80, 35);
    copyBtn.x = 250;
    copyBtn.y = 180;
    copyBtn.cornerRadius = 18;
    copyBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s20.appendChild(copyBtn);
    txt(s20, "Copy", 273, 190, 14, C.white, "Bold");
    
    txt(s20, "Participants (3)", 30, 260, 16, C.text, "Bold");
    
    const participants = [
      {name: "You (Host)", items: "2 items", amount: "Rs 1,049"},
      {name: "Ahmad Ali", items: "1 item", amount: "Rs 599"},
      {name: "Sara Khan", items: "3 items", amount: "Rs 1,299"}
    ];
    
    let partY = 295;
    for (const part of participants) {
      const partCard = figma.createRectangle();
      partCard.resize(315, 70);
      partCard.x = 30;
      partCard.y = partY;
      partCard.cornerRadius = 12;
      partCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s20.appendChild(partCard);
      
      const avatar = figma.createEllipse();
      avatar.resize(45, 45);
      avatar.x = 45;
      avatar.y = partY + 12;
      avatar.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
      s20.appendChild(avatar);
      txt(s20, part.name.charAt(0), 62, partY + 25, 18, C.teal, "Bold");
      
      txt(s20, part.name, 105, partY + 18, 14, C.text, "Bold");
      txt(s20, part.items, 105, partY + 40, 12, C.gray, "Regular");
      txt(s20, part.amount, 260, partY + 28, 14, C.teal, "Bold");
      
      partY += 80;
    }
    
    txt(s20, "Total Group Order", 30, 550, 16, C.text, "Bold");
    txt(s20, "Rs 2,947", 250, 550, 20, C.teal, "Bold");
    
    const splitPayInfo = figma.createRectangle();
    splitPayInfo.resize(315, 60);
    splitPayInfo.x = 30;
    splitPayInfo.y = 590;
    splitPayInfo.cornerRadius = 12;
    splitPayInfo.fills = [{type: 'SOLID', color: {r: 0.9, g: 1, b: 0.9}}];
    s20.appendChild(splitPayInfo);
    txt(s20, "💡 Tip:", 45, 605, 14, C.green, "Bold");
    txt(s20, "Each participant can pay individually", 45, 627, 12, C.gray, "Regular");
    
    btn(s20, "ProceedGroupOrder-CLICK", 30, 680, 315, 55, C.teal, "Proceed", 18);
    txt(s20, "Proceed", 150, 698, 18, C.white, "Bold");
    
    targetPage.appendChild(s20);
    screens.push(s20);
    x += W + G;
    
    figma.notify(`✅ Chunk 2/9 Complete - Screens 11-20 created`);
    // ==========================================
    // SCREEN 21: DELIVERY ADDRESS
    // ==========================================
    const s21 = figma.createFrame();
    s21.name = "21-Delivery-Address";
    s21.resize(W, H);
    s21.x = x;
    s21.y = y;
    s21.fills = [{type: 'SOLID', color: C.white}];
    
    header(s21, "Delivery Address", true, "BackToDeliveryType-CLICK");
    
    txt(s21, "📍 Select Address", 30, 90, 22, C.text, "Bold");
    
    const addNewAddrBtn = figma.createRectangle();
    addNewAddrBtn.name = "AddNewAddress-CLICK";
    addNewAddrBtn.resize(315, 50);
    addNewAddrBtn.x = 30;
    addNewAddrBtn.y = 140;
    addNewAddrBtn.cornerRadius = 25;
    addNewAddrBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s21.appendChild(addNewAddrBtn);
    txt(s21, "+ Add New Address", 115, 157, 16, C.white, "Bold");
    
    txt(s21, "Saved Addresses", 30, 220, 16, C.text, "Bold");
    
    const addresses = [
      {type: "Home", address: "123 Main Boulevard, Gulberg III", city: "Lahore, Pakistan", default: true},
      {type: "Work", address: "456 Business Street, DHA Phase 5", city: "Lahore, Pakistan", default: false},
      {type: "Other", address: "789 Park Avenue, Johar Town", city: "Lahore, Pakistan", default: false}
    ];
    
    let addrY = 260;
    for (let i = 0; i < addresses.length; i++) {
      const addr = addresses[i];
      const addrCard = figma.createRectangle();
      addrCard.name = `Address-${addr.type}-CLICK`;
      addrCard.resize(315, 100);
      addrCard.x = 30;
      addrCard.y = addrY;
      addrCard.cornerRadius = 12;
      //addrCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      //addrCard.strokes = [{type: 'SOLID', color: i === 0 ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
      addrCard.strokeWeight = i === 0 ? 2 : 0;
      s21.appendChild(addrCard);
      
      const icon = addr.type === "Home" ? "🏠" : addr.type === "Work" ? "💼" : "📍";
      txt(s21, icon, 45, addrY + 20, 28, C.text, "Regular");
      
      txt(s21, addr.type, 90, addrY + 18, 16, C.text, "Bold");
      if (addr.default) {
        const defaultBadge = figma.createRectangle();
        defaultBadge.resize(55, 20);
        defaultBadge.x = 150;
        defaultBadge.y = addrY + 20;
        defaultBadge.cornerRadius = 10;
        defaultBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
        s21.appendChild(defaultBadge);
        txt(s21, "Default", 158, addrY + 24, 10, C.green, "Bold");
      }
      
      txt(s21, addr.address, 90, addrY + 45, 12, C.gray, "Regular");
      txt(s21, addr.city, 90, addrY + 63, 11, C.gray, "Regular");
      
      const editBtn = figma.createText();
      editBtn.name = `EditAddress-${addr.type}-CLICK`;
      editBtn.fontName = { family: "Inter", style: "Bold" };
      editBtn.characters = "Edit";
      editBtn.fontSize = 12;
      editBtn.fills = [{type: 'SOLID', color: C.teal}];
      editBtn.x = 280;
      editBtn.y = addrY + 75;
      s21.appendChild(editBtn);
      
      if (i === 0) {
        const checkmark = figma.createEllipse();
        checkmark.resize(24, 24);
        checkmark.x = 305;
        checkmark.y = addrY + 38;
        checkmark.fills = [{type: 'SOLID', color: C.teal}];
        s21.appendChild(checkmark);
        txt(s21, "✓", 312, addrY + 41, 14, C.white, "Bold");
      }
      
      addrY += 110;
    }
    
    btn(s21, "ContinueToPayment-CLICK", 30, 700, 315, 55, C.teal, "Continue", 18);
    txt(s21, "Continue", 145, 718, 18, C.white, "Bold");
    
    targetPage.appendChild(s21);
    screens.push(s21);
    x += W + G;
    
    // ==========================================
    // SCREEN 22: ADD NEW ADDRESS
    // ==========================================
    const s22 = figma.createFrame();
    s22.name = "22-Add-New-Address";
    s22.resize(W, H);
    s22.x = x;
    s22.y = y;
    s22.fills = [{type: 'SOLID', color: C.white}];
    
    header(s22, "Add Address", true, "BackToAddressList-CLICK");
    
    txt(s22, "New Delivery Address", 30, 90, 20, C.text, "Bold");
    
    txt(s22, "Address Label", 30, 140, 14, C.text, "Semi Bold");
    const labelBtns = ["🏠 Home", "💼 Work", "📍 Other"];
    let labelX = 30;
    for (let i = 0; i < labelBtns.length; i++) {
      const labelBtn = figma.createRectangle();
      labelBtn.name = `Label-${labelBtns[i].split(' ')[1]}-CLICK`;
      labelBtn.resize(95, 45);
      labelBtn.x = labelX;
      labelBtn.y = 165;
      labelBtn.cornerRadius = 22;
      labelBtn.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s22.appendChild(labelBtn);
      
      txt(s22, labelBtns[i], labelBtn.x + 20, 177, 14, i === 0 ? C.white : C.text, "Semi Bold");
      labelX += 105;
    }
    
    txt(s22, "Complete Address", 30, 240, 14, C.text, "Semi Bold");
    inputField(s22, 30, 265, 315, 50, "House/Floor/Street");
    
    txt(s22, "Area/Locality", 30, 340, 14, C.text, "Semi Bold");
    inputField(s22, 30, 365, 315, 50, "Enter area name");
    
    txt(s22, "City", 30, 440, 14, C.text, "Semi Bold");
    inputField(s22, 30, 465, 150, 50, "Lahore");
    
    txt(s22, "Postal Code", 195, 440, 14, C.text, "Semi Bold");
    inputField(s22, 195, 465, 150, 50, "54000");
    
    txt(s22, "Phone Number", 30, 540, 14, C.text, "Semi Bold");
    inputField(s22, 30, 565, 315, 50, "+92 300 1234567");
    
    const defaultCheckbox = figma.createRectangle();
    defaultCheckbox.name = "SetAsDefault-TOGGLE";
    defaultCheckbox.resize(22, 22);
    defaultCheckbox.x = 30;
    defaultCheckbox.y = 640;
    defaultCheckbox.cornerRadius = 6;
    defaultCheckbox.fills = [{type: 'SOLID', color: C.teal}];
    s22.appendChild(defaultCheckbox);
    txt(s22, "✓", 35, 643, 14, C.white, "Bold");
    txt(s22, "Set as default address", 60, 642, 14, C.text, "Regular");
    
    btn(s22, "SaveAddress-CLICK", 30, 700, 315, 55, C.yellow, "Save Address", 18); // YELLOW
    txt(s22, "Save Address", 120, 718, 18, C.white, "Bold");
    
    targetPage.appendChild(s22);
    screens.push(s22);
    x += W + G;
    
    // ==========================================
    // SCREEN 23: CHECKOUT SUMMARY
    // ==========================================
    const s23 = figma.createFrame();
    s23.name = "23-Checkout-Summary";
    s23.resize(W, H);
    s23.x = x;
    s23.y = y;
    s23.fills = [{type: 'SOLID', color: C.white}];
    
    header(s23, "Checkout", true, "BackToAddress-CLICK");
    
    txt(s23, "Order Summary", 30, 90, 20, C.text, "Bold");
    
    // Delivery info
    const deliveryInfo2 = figma.createRectangle();
    deliveryInfo2.resize(315, 80);
    deliveryInfo2.x = 30;
    deliveryInfo2.y = 130;
    deliveryInfo2.cornerRadius = 12;
    deliveryInfo2.fills = [{type: 'SOLID', color: C.lightBg}];
    s23.appendChild(deliveryInfo2);
    
    txt(s23, "Delivering to:", 45, 145, 13, C.gray, "Regular");
    txt(s23, "Home - Gulberg III", 45, 165, 15, C.text, "Bold");
    txt(s23, "123 Main Boulevard, Lahore", 45, 185, 12, C.gray, "Regular");
    
    const changeAddrBtn = figma.createText();
    changeAddrBtn.name = "ChangeAddress-CLICK";
    changeAddrBtn.fontName = { family: "Inter", style: "Bold" };
    changeAddrBtn.characters = "Change";
    changeAddrBtn.fontSize = 12;
    changeAddrBtn.fills = [{type: 'SOLID', color: C.teal}];
    changeAddrBtn.x = 280;
    changeAddrBtn.y = 165;
    s23.appendChild(changeAddrBtn);
    
    // Items summary
    txt(s23, "Items (3)", 30, 230, 16, C.text, "Bold");
    
    const itemsList = figma.createRectangle();
    itemsList.resize(315, 90);
    itemsList.x = 30;
    itemsList.y = 260;
    itemsList.cornerRadius = 12;
    itemsList.fills = [{type: 'SOLID', color: C.lightBg}];
    s23.appendChild(itemsList);
    
    txt(s23, "Chicken Tikka Pizza × 1", 45, 275, 13, C.text, "Regular");
    txt(s23, "Rs 1,049", 250, 275, 13, C.text, "Regular");
    
    txt(s23, "Beef Burger Meal × 2", 45, 305, 13, C.text, "Regular");
    txt(s23, "Rs 1,198", 250, 305, 13, C.text, "Regular");
    
    const viewDetailsBtn = figma.createText();
    viewDetailsBtn.name = "ViewItemDetails-CLICK";
    viewDetailsBtn.fontName = { family: "Inter", style: "Bold" };
    viewDetailsBtn.characters = "View Details >";
    viewDetailsBtn.fontSize = 12;
    viewDetailsBtn.fills = [{type: 'SOLID', color: C.teal}];
    viewDetailsBtn.x = 45;
    viewDetailsBtn.y = 330;
    s23.appendChild(viewDetailsBtn);
    
    // Promo code
    txt(s23, "Apply Promo Code", 30, 375, 16, C.text, "Bold");
    
    const promoInput = figma.createRectangle();
    promoInput.name = "PromoCodeInput";
    promoInput.resize(210, 50);
    promoInput.x = 30;
    promoInput.y = 405;
    promoInput.cornerRadius = 25;
    promoInput.fills = [{type: 'SOLID', color: C.lightBg}];
    s23.appendChild(promoInput);
    txt(s23, "Enter promo code", 50, 420, 14, C.gray, "Regular");
    
    const applyPromoBtn = figma.createRectangle();
    applyPromoBtn.name = "ApplyPromo-CLICK";
    applyPromoBtn.resize(95, 50);
    applyPromoBtn.x = 250;
    applyPromoBtn.y = 405;
    applyPromoBtn.cornerRadius = 25;
    applyPromoBtn.fills = [{type: 'SOLID', color: C.teal}];
    s23.appendChild(applyPromoBtn);
    txt(s23, "Apply", 278, 420, 15, C.white, "Bold");
    
    // Bill details
    txt(s23, "Bill Details", 30, 480, 16, C.text, "Bold");
    
    const billDetails = figma.createRectangle();
    billDetails.resize(315, 160);
    billDetails.x = 30;
    billDetails.y = 510;
    billDetails.cornerRadius = 12;
    billDetails.fills = [{type: 'SOLID', color: C.lightBg}];
    s23.appendChild(billDetails);
    
    txt(s23, "Item Total", 45, 525, 13, C.gray, "Regular");
    txt(s23, "Rs 2,247", 270, 525, 13, C.text, "Regular");
    
    txt(s23, "Delivery Charges", 45, 555, 13, C.gray, "Regular");
    txt(s23, "Free", 283, 555, 13, C.green, "Bold");
    
    txt(s23, "Discount (20% OFF)", 45, 585, 13, C.gray, "Regular");
    txt(s23, "-Rs 450", 268, 585, 13, C.green, "Regular");
    
    txt(s23, "Tax (5%)", 45, 615, 13, C.gray, "Regular");
    txt(s23, "Rs 90", 280, 615, 13, C.text, "Regular");
    
    const divider2 = figma.createLine();
    divider2.resize(275, 0);
    divider2.x = 45;
    divider2.y = 640;
    divider2.strokes = [{type: 'SOLID', color: C.gray}];
    divider2.strokeWeight = 1;
    s23.appendChild(divider2);
    
    txt(s23, "Total Amount", 45, 650, 15, C.text, "Bold");
    txt(s23, "Rs 1,887", 255, 650, 16, C.teal, "Bold");
    
    btn(s23, "ProceedToPayment-CLICK", 30, 700, 315, 55, C.yellow, "Proceed to Payment", 18); // YELLOW
    txt(s23, "Proceed to Payment", 95, 718, 18, C.white, "Bold");
    
    targetPage.appendChild(s23);
    screens.push(s23);
    x += W + G;
    
    // ==========================================
    // SCREEN 24: PAYMENT OPTIONS
    // ==========================================
    const s24 = figma.createFrame();
    s24.name = "24-Payment-Options";
    s24.resize(W, H);
    s24.x = x;
    s24.y = y;
    s24.fills = [{type: 'SOLID', color: C.white}];
    
    header(s24, "Payment", true, "BackToCheckout-CLICK");
    
    txt(s24, "Select Payment Method", 30, 90, 20, C.text, "Bold");
    txt(s24, "Amount: Rs 1,887", 30, 125, 15, C.teal, "Bold");
    
    const paymentMethods = [
      {name: "In-App Wallet", balance: "Balance: Rs 2,500", icon: "💳", selected: true},
      {name: "Credit / Debit Card", balance: "Save card for faster checkout", icon: "💳", selected: false},
      {name: "Digital Wallets", balance: "JazzCash, Easypaisa, etc.", icon: "📱", selected: false},
      {name: "Cash on Delivery", balance: "Pay when you receive", icon: "💵", selected: false}
    ];
    
    let payY = 170;
    for (let i = 0; i < paymentMethods.length; i++) {
      const method = paymentMethods[i];
      const payCard = figma.createRectangle();
      payCard.name = `Payment-${method.name.replace(/ /g,'')}-CLICK`;
      payCard.resize(315, 85);
      payCard.x = 30;
      payCard.y = payY;
      payCard.cornerRadius = 12;
      //payCard.fills = [{type: 'SOLID', color: method.selected ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      //payCard.strokes = [{type: 'SOLID', color: method.selected ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
      payCard.strokeWeight = method.selected ? 2 : 0;
      s24.appendChild(payCard);
      
      txt(s24, method.icon, 50, payY + 25, 32, C.text, "Regular");
      txt(s24, method.name, 100, payY + 22, 16, C.text, "Bold");
      txt(s24, method.balance, 100, payY + 48, 12, C.gray, "Regular");
      
      if (method.selected) {
        const checkmark2 = figma.createEllipse();
        checkmark2.resize(24, 24);
        checkmark2.x = 305;
        checkmark2.y = payY + 30;
        checkmark2.fills = [{type: 'SOLID', color: C.teal}];
        s24.appendChild(checkmark2);
        txt(s24, "✓", 312, payY + 33, 14, C.white, "Bold");
      }
      
      payY += 95;
    }
    
    // Tip option
    txt(s24, "Add Tip for Rider", 30, 560, 16, C.text, "Bold");
    
    const tipAmounts = ["Rs 20", "Rs 50", "Rs 100", "Custom"];
    let tipX = 30;
    for (let i = 0; i < tipAmounts.length; i++) {
      const tipBtn = figma.createRectangle();
      tipBtn.name = `Tip-${tipAmounts[i].replace(/ /g,'')}-CLICK`;
      tipBtn.resize(70, 40);
      tipBtn.x = tipX;
      tipBtn.y = 595;
      tipBtn.cornerRadius = 20;
      tipBtn.fills = [{type: 'SOLID', color: i === 1 ? C.yellow : C.lightBg}]; // YELLOW for selected
      s24.appendChild(tipBtn);
      
      txt(s24, tipAmounts[i], tipBtn.x + 13, 607, 13, i === 1 ? C.white : C.text, "Semi Bold");
      tipX += 78;
    }
    
    // Contactless delivery option
    const contactlessBox = figma.createRectangle();
    contactlessBox.resize(315, 50);
    contactlessBox.x = 30;
    contactlessBox.y = 660;
    contactlessBox.cornerRadius = 12;
    contactlessBox.fills = [{type: 'SOLID', color: {r: 0.9, g: 1, b: 0.9}}];
    s24.appendChild(contactlessBox);
    
    const contactlessCheckbox = figma.createRectangle();
    contactlessCheckbox.name = "ContactlessDelivery-TOGGLE";
    contactlessCheckbox.resize(22,22);
    contactlessCheckbox.x = 45;
    contactlessCheckbox.y = 674;
    contactlessCheckbox.cornerRadius = 6;
    contactlessCheckbox.fills = [{type: 'SOLID', color: C.green}];
    s24.appendChild(contactlessCheckbox);
    txt(s24, "✓", 50, 677, 14, C.white, "Bold");
    txt(s24, "🛡️ Contactless Delivery", 75, 678, 14, C.text, "Bold");
    
    btn(s24, "PlaceOrder-CLICK", 30, 730, 315, 55, C.yellow, "Place Order", 18); // YELLOW
    txt(s24, "Place Order", 130, 748, 18, C.white, "Bold");
    
    targetPage.appendChild(s24);
    screens.push(s24);
    x += W + G;
    
    // ==========================================
    // SCREEN 25: ADD PAYMENT METHOD
    // ==========================================
    const s25 = figma.createFrame();
    s25.name = "25-Add-Payment-Method";
    s25.resize(W, H);
    s25.x = x;
    s25.y = y;
    s25.fills = [{type: 'SOLID', color: C.white}];
    
    header(s25, "Add Card", true, "BackToPayment-CLICK");
    
    txt(s25, "Credit / Debit Card", 30, 90, 22, C.text, "Bold");
    
    img(s25, 125, 140, 125, 80, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e");
    
    txt(s25, "Card Number", 30, 250, 14, C.text, "Semi Bold");
    inputField(s25, 30, 275, 315, 50, "1234 5678 9012 3456");
    
    txt(s25, "Card Holder Name", 30, 350, 14, C.text, "Semi Bold");
    inputField(s25, 30, 375, 315, 50, "AHMAD ALI");
    
    txt(s25, "Expiry Date", 30, 450, 14, C.text, "Semi Bold");
    inputField(s25, 30, 475, 150, 50, "MM/YY");
    
    txt(s25, "CVV", 195, 450, 14, C.text, "Semi Bold");
    inputField(s25, 195, 475, 150, 50, "123");
    
    const saveCardCheckbox = figma.createRectangle();
    saveCardCheckbox.name = "SaveCard-TOGGLE";
    saveCardCheckbox.resize(22, 22);
    saveCardCheckbox.x = 30;
    saveCardCheckbox.y = 555;
    saveCardCheckbox.cornerRadius = 6;
    saveCardCheckbox.fills = [{type: 'SOLID', color: C.teal}];
    s25.appendChild(saveCardCheckbox);
    txt(s25, "✓", 35, 558, 14, C.white, "Bold");
    txt(s25, "Save card for future payments", 60, 557, 14, C.text, "Regular");
    
    const secureNote = figma.createRectangle();
    secureNote.resize(315, 60);
    secureNote.x = 30;
    secureNote.y = 600;
    secureNote.cornerRadius = 12;
    secureNote.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s25.appendChild(secureNote);
    txt(s25, "🔒 Secure Payment", 45, 615, 14, C.text, "Bold");
    txt(s25, "Your card details are encrypted", 45, 638, 12, C.gray, "Regular");
    
    btn(s25, "AddCard-CLICK", 30, 700, 315, 55, C.yellow, "Add Card", 18); // YELLOW
    txt(s25, "Add Card", 140, 718, 18, C.white, "Bold");
    
    targetPage.appendChild(s25);
    screens.push(s25);
    x += W + G;
    
    // ==========================================
    // SCREEN 26: WALLET
    // ==========================================
    const s26 = figma.createFrame();
    s26.name = "26-Wallet";
    s26.resize(W, H);
    s26.x = x;
    s26.y = y;
    s26.fills = [{type: 'SOLID', color: C.white}];
    
    header(s26, "My Wallet", true, "BackToPayment-CLICK");
    
    // Wallet balance card
    const walletCard = figma.createRectangle();
    walletCard.resize(315, 140);
    walletCard.x = 30;
    walletCard.y = 90;
    walletCard.cornerRadius = 20;
    walletCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.24, g: 0.61, b: 0.61, a: 1}},
        {position: 1, color: {r: 0.17, g: 0.37, b: 0.37, a: 1}}
      ]
    }];
    s26.appendChild(walletCard);
    
    txt(s26, "💳 Wallet Balance", 50, 110, 16, C.white, "Bold");
    txt(s26, "Rs 2,500", 50, 145, 36, C.white, "Bold");
    txt(s26, "Cashback: Rs 350", 50, 190, 13, C.yellow, "Bold");
    txt(s26, "Loyalty Points: 1,250", 50, 210, 13, C.white, "Regular");
    
    // Top-up button
    const topUpBtn = figma.createRectangle();
    topUpBtn.name = "TopUpWallet-CLICK";
    topUpBtn.resize(100, 40);
    topUpBtn.x = 235;
    topUpBtn.y = 180;
    topUpBtn.cornerRadius = 20;
    topUpBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s26.appendChild(topUpBtn);
    txt(s26, "+ Top Up", 257, 191, 14, C.white, "Bold");
    
    txt(s26, "Recent Transactions", 30, 260, 18, C.text, "Bold");
    
    const transactions = [
      {type: "Order Payment", amount: "-Rs 1,887", date: "Nov 14, 2:45 PM", icon: "🛒"},
      {type: "Cashback Received", amount: "+Rs 150", date: "Nov 14, 1:30 PM", icon: "💰"},
      {type: "Wallet Top-up", amount: "+Rs 2,000", date: "Nov 13, 5:20 PM", icon: "⬆️"},
      {type: "Order Payment", amount: "-Rs 1,250", date: "Nov 12, 8:15 PM", icon: "🛒"}
    ];
    
    let transY = 300;
    for (const trans of transactions) {
      const transCard = figma.createRectangle();
      transCard.name = `Transaction-${trans.type.replace(/ /g,'')}-CLICK`;
      transCard.resize(315, 70);
      transCard.x = 30;
      transCard.y = transY;
      transCard.cornerRadius = 12;
      transCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s26.appendChild(transCard);
      
      txt(s26, trans.icon, 45, transY + 20, 28, C.text, "Regular");
      txt(s26, trans.type, 90, transY + 18, 14, C.text, "Bold");
      txt(s26, trans.date, 90, transY + 40, 11, C.gray, "Regular");
      
      const isCredit = trans.amount.startsWith("+");
      txt(s26, trans.amount, isCredit ? 265 : 255, transY + 25, 16, isCredit ? C.green : C.text, "Bold");
      
      transY += 80;
    }
    
    targetPage.appendChild(s26);
    screens.push(s26);
    x += W + G;
    
    // ==========================================
    // SCREEN 27: SPLIT PAYMENT
    // ==========================================
    const s27 = figma.createFrame();
    s27.name = "27-Split-Payment";
    s27.resize(W, H);
    s27.x = x;
    s27.y = y;
    s27.fills = [{type: 'SOLID', color: C.white}];
    
    header(s27, "Split Payment", true, "BackToPayment-CLICK");
    
    txt(s27, "💰 Split the Bill", 30, 90, 22, C.text, "Bold");
    txt(s27, "Total Amount: Rs 2,947", 30, 125, 16, C.teal, "Bold");
    
    txt(s27, "Split Method", 30, 170, 16, C.text, "Bold");
    
    const splitMethods = ["Equal Split", "Custom Split", "By Items"];
    let splitX = 30;
    for (let i = 0; i < splitMethods.length; i++) {
      const splitBtn = figma.createRectangle();
      splitBtn.name = `SplitMethod-${splitMethods[i].replace(/ /g,'')}-CLICK`;
      splitBtn.resize(95, 45);
      splitBtn.x = splitX;
      splitBtn.y = 200;
      splitBtn.cornerRadius = 22;
      splitBtn.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s27.appendChild(splitBtn);
      
      txt(s27, splitMethods[i], splitBtn.x + 10, 212, 12, i === 0 ? C.white : C.text, "Semi Bold");
      splitX += 105;
    }
    
    txt(s27, "Participants (3)", 30, 275, 16, C.text, "Bold");
    
    const splitParticipants = [
      {name: "You", amount: "Rs 982", paid: false},
      {name: "Ahmad Ali", amount: "Rs 982", paid: false},
      {name: "Sara Khan", amount: "Rs 983", paid: true}
    ];
    
    let splitY = 310;
    for (const participant of splitParticipants) {
      const partCard = figma.createRectangle();
      partCard.resize(315, 80);
      partCard.x = 30;
      partCard.y = splitY;
      partCard.cornerRadius = 12;
      partCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s27.appendChild(partCard);
      
      const avatar2 = figma.createEllipse();
      avatar2.resize(50, 50);
      avatar2.x = 45;
      avatar2.y = splitY + 15;
      avatar2.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
      s27.appendChild(avatar2);
      txt(s27, participant.name.charAt(0), 65, splitY + 30, 20, C.teal, "Bold");
      
      txt(s27, participant.name, 110, splitY + 22, 16, C.text, "Bold");
      txt(s27, participant.amount, 110, splitY + 47, 14, C.teal, "Bold");
      
      if (participant.paid) {
        const paidBadge = figma.createRectangle();
        paidBadge.resize(60, 25);
        paidBadge.x = 270;
        paidBadge.y = splitY + 28;
        paidBadge.cornerRadius = 12;
        paidBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
        s27.appendChild(paidBadge);
        txt(s27, "Paid ✓", 280, splitY + 33, 11, C.green, "Bold");
      } else {
        const payBtn = figma.createRectangle();
        payBtn.name = `Pay-${participant.name.replace(/ /g,'')}-CLICK`;
        payBtn.resize(60, 30);
        payBtn.x = 270;
        payBtn.y = splitY + 25;
        payBtn.cornerRadius = 15;
        payBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
        s27.appendChild(payBtn);
        txt(s27, "Pay", 287, splitY + 32, 13, C.white, "Bold");
      }
      
      splitY += 90;
    }
    
    const splitNote = figma.createRectangle();
    splitNote.resize(315, 60);
    splitNote.x = 30;
    splitNote.y = 590;
    splitNote.cornerRadius = 12;
    splitNote.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s27.appendChild(splitNote);
    txt(s27, "💡 Note:", 45, 605, 14, C.text, "Bold");
    txt(s27, "Each person pays from their own wallet", 45, 627, 12, C.gray, "Regular");
    
    btn(s27, "PayMyShare-CLICK", 30, 680, 315, 55, C.teal, "Pay My Share", 18);
    txt(s27, "Pay My Share - Rs 982", 100, 698, 18, C.white, "Bold");
    
    targetPage.appendChild(s27);
    screens.push(s27);
    x += W + G;
    
    // ==========================================
    // SCREEN 28: ORDER CONFIRMATION
    // ==========================================
    const s28 = figma.createFrame();
    s28.name = "28-Order-Confirmation";
    s28.resize(W, H);
    s28.x = x;
    s28.y = y;
    s28.fills = [{type: 'SOLID', color: C.white}];
    
    const successCircle = figma.createEllipse();
    successCircle.resize(120, 120);
    successCircle.x = (W - 120) / 2;
    successCircle.y = 150;
    successCircle.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s28.appendChild(successCircle);
    
    const checkIcon = figma.createEllipse();
    checkIcon.resize(80, 80);
    checkIcon.x = (W - 80) / 2;
    checkIcon.y = 170;
    checkIcon.fills = [{type: 'SOLID', color: C.green}];
    s28.appendChild(checkIcon);
    txt(s28, "✓", 178, 192, 48, C.white, "Bold");
    
    txt(s28, "Order Placed!", 110, 300, 28, C.text, "Bold");
    txt(s28, "Your order has been confirmed", 75, 340, 14, C.gray, "Regular");
    
    const orderIdBox = figma.createRectangle();
    orderIdBox.resize(250, 60);
    orderIdBox.x = 62;
    orderIdBox.y = 380;
    orderIdBox.cornerRadius = 12;
    orderIdBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s28.appendChild(orderIdBox);
    
    txt(s28, "Order ID: #BK12345", 105, 395, 15, C.text, "Bold");
    txt(s28, "Estimated Delivery: 25-30 min", 80, 420, 12, C.gray, "Regular");
    
    btn(s28, "TrackOrder-CLICK", 30, 480, 315, 55, C.yellow, "Track Order", 18); // YELLOW
    txt(s28, "Track Order", 130, 498, 18, C.white, "Bold");
    
    const backHomeBtn = figma.createRectangle();
    backHomeBtn.name = "BackToHome-CLICK";
    backHomeBtn.resize(315, 50);
    backHomeBtn.x = 30;
    backHomeBtn.y = 550;
    backHomeBtn.cornerRadius = 25;
    backHomeBtn.fills = [{type: 'SOLID', color: C.lightBg}];
    s28.appendChild(backHomeBtn);
    txt(s28, "Back to Home", 120, 567, 16, C.text, "Regular");
    
    txt(s28, "🎉 What's Next?", 30, 640, 18, C.text, "Bold");
    txt(s28, "• Restaurant is preparing your order", 30, 675, 13, C.gray, "Regular");
    txt(s28, "• You'll get updates via notifications", 30, 700, 13, C.gray, "Regular");
    txt(s28, "• Rider will be assigned shortly", 30, 725, 13, C.gray, "Regular");
    
    targetPage.appendChild(s28);
    screens.push(s28);
    x += W + G;
    
    // ==========================================
// SCREEN 29: ORDER TRACKING LIVE
// ==========================================
const s29 = figma.createFrame();
s29.name = "29-Order-Tracking-Live";
s29.resize(W, H);
s29.x = x;
s29.y = y;
s29.fills = [{type: 'SOLID', color: C.white}];

header(s29, "Track Order", true, "BackToHome-CLICK");

// Map area - REPLACED WITH REAL MAP IMAGE
await img(s29, 0, 60, W, 350, "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600");

// Rider location pin
const riderPin = figma.createEllipse();
riderPin.resize(40, 40);
riderPin.x = 200;
riderPin.y = 250;
riderPin.fills = [{type: 'SOLID', color: C.teal}];
s29.appendChild(riderPin);
txt(s29, "🚴", 209, 257, 20, C.white, "Regular");

// Order status
txt(s29, "Order #BK12345", 30, 430, 18, C.text, "Bold");
txt(s29, "⏱️ Arriving in 15 minutes", 220, 433, 13, C.teal, "Bold");

// Progress tracker
const progressSteps = [
  {label: "Order Placed", status: "complete", time: "2:45 PM"},
  {label: "Preparing", status: "complete", time: "2:50 PM"},
  {label: "Out for Delivery", status: "current", time: "3:10 PM"},
  {label: "Delivered", status: "pending", time: ""}
];

let stepY = 480;
for (let i = 0; i < progressSteps.length; i++) {
  const step = progressSteps[i];
  const stepCircle = figma.createEllipse();
  stepCircle.resize(30, 30);
  stepCircle.x = 45;
  stepCircle.y = stepY;
  stepCircle.fills = [{type: 'SOLID', color: step.status === "pending" ? C.lightBg : C.teal}];
  s29.appendChild(stepCircle);
  
  if (step.status === "complete") {
    txt(s29, "✓", 54, stepY + 7, 16, C.white, "Bold");
  } else if (step.status === "current") {
    const pulse = figma.createEllipse();
    pulse.resize(40, 40);
    pulse.x = 40;
    pulse.y = stepY - 5;
    pulse.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
    s29.appendChild(pulse);
    stepCircle.fills = [{type: 'SOLID', color: C.teal}];
  }
  
  txt(s29, step.label, 90, stepY + 5, 15, step.status === "pending" ? C.gray : C.text, "Bold");
  if (step.time) {
    txt(s29, step.time, 90, stepY + 25, 12, C.gray, "Regular");
  }
  
  if (i < progressSteps.length - 1) {
    const line = figma.createLine();
    line.resize(0, 25);
    line.x = 60;
    line.y = stepY + 30;
    line.strokes = [{type: 'SOLID', color: i < 2 ? C.teal : C.lightBg}];
    line.strokeWeight = 3;
    s29.appendChild(line);
  }
  
  stepY += 60;
}

// Rider card
const riderCard = figma.createRectangle();
riderCard.resize(315, 90);
riderCard.x = 30;
riderCard.y = 720;
riderCard.cornerRadius = 16;
riderCard.fills = [{type: 'SOLID', color: C.lightBg}];
s29.appendChild(riderCard);

const riderAvatar = figma.createEllipse();
riderAvatar.resize(60, 60);
riderAvatar.x = 45;
riderAvatar.y = 735;
riderAvatar.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
s29.appendChild(riderAvatar);
txt(s29, "👤", 60, 748, 28, C.teal, "Regular");

txt(s29, "Bilal (Rider)", 120, 740, 16, C.text, "Bold");
txt(s29, "⭐ 4.8 • 🏍️ ABC-123", 120, 763, 12, C.gray, "Regular");

const callBtn = figma.createRectangle();
callBtn.name = "CallRider-CLICK";
callBtn.resize(40, 40);
callBtn.x = 260;
callBtn.y = 745;
callBtn.cornerRadius = 20;
callBtn.fills = [{type: 'SOLID', color: C.teal}];
s29.appendChild(callBtn);
txt(s29, "📞", 270, 753, 20, C.white, "Regular");

const chatBtn = figma.createRectangle();
chatBtn.name = "ChatRider-CLICK";
chatBtn.resize(40, 40);
chatBtn.x = 310;
chatBtn.y = 745;
chatBtn.cornerRadius = 20;
chatBtn.fills = [{type: 'SOLID', color: C.yellow}];
s29.appendChild(chatBtn);
txt(s29, "💬", 320, 753, 20, C.white, "Regular");

targetPage.appendChild(s29);
screens.push(s29);
x += W + G;

    
    // ==========================================
    // SCREEN 30: DELIVERY CONFIRMATION
    // ==========================================
    const s30 = figma.createFrame();
    s30.name = "30-Delivery-Confirmation";
    s30.resize(W, H);
    s30.x = x;
    s30.y = y;
    s30.fills = [{type: 'SOLID', color: C.white}];
    
    header(s30, "Confirm Delivery", true, "BackToTracking-CLICK");
    
    txt(s30, "🚴 Rider Has Arrived!", 85, 100, 22, C.text, "Bold");
    txt(s30, "Please collect your order", 95, 135, 15, C.gray, "Regular");
    
    img(s30, 112, 180, 150, 150, "https://images.unsplash.com/photo-1526367790999-0150786686a2");
    
    txt(s30, "Delivery OTP", 30, 360, 18, C.text, "Bold");
    txt(s30, "Share this code with the rider", 30, 390, 14, C.gray, "Regular");
    
    const otpDisplay = figma.createRectangle();
    otpDisplay.resize(200, 70);
    otpDisplay.x = 87;
    otpDisplay.y = 420;
    otpDisplay.cornerRadius = 16;
    otpDisplay.fills = [{type: 'SOLID', color: C.lightBg}];
    s30.appendChild(otpDisplay);
    
    txt(s30, "8 4 2 7", 130, 445, 32, C.teal, "Bold");
    
    const contactlessInfo = figma.createRectangle();
    contactlessInfo.resize(315, 70);
    contactlessInfo.x = 30;
    contactlessInfo.y = 520;
    contactlessInfo.cornerRadius = 12;
    contactlessInfo.fills = [{type: 'SOLID', color: {r: 0.9, g: 1, b: 0.9}}];
    s30.appendChild(contactlessInfo);
    
    txt(s30, "🛡️ Contactless Delivery", 45, 535, 15, C.green, "Bold");
    txt(s30, "Your order will be left at your door", 45, 558, 12, C.gray, "Regular");
    txt(s30, "Take a photo for proof of delivery", 45, 575, 12, C.gray, "Regular");
    
    btn(s30, "ConfirmDelivered-CLICK", 30, 620, 315, 55, C.yellow, "Confirm Delivered", 18); // YELLOW
    txt(s30, "Confirm Delivered", 105, 638, 18, C.white, "Bold");
    
    const reportBtn = figma.createRectangle();
    reportBtn.name = "ReportIssue-CLICK";
    reportBtn.resize(315, 50);
    reportBtn.x = 30;
    reportBtn.y = 690;
    reportBtn.cornerRadius = 25;
    reportBtn.fills = [{type: 'SOLID', color: C.lightBg}];
    s30.appendChild(reportBtn);
    txt(s30, "⚠️ Report an Issue", 110, 707, 15, C.red, "Bold");
    
    targetPage.appendChild(s30);
    screens.push(s30);
    x += W + G;
    
    figma.notify(`✅ Chunk 3/9 Complete - Screens 21-30 created`);
    // ==========================================
    // SCREEN 31: RATE ORDER
    // ==========================================
    const s31 = figma.createFrame();
    s31.name = "31-Rate-Order";
    s31.resize(W, H);
    s31.x = x;
    s31.y = y;
    s31.fills = [{type: 'SOLID', color: C.white}];
    
    header(s31, "Rate Your Order", true, "Skip-CLICK");
    
    txt(s31, "How was your order?", 80, 100, 24, C.text, "Bold");
    txt(s31, "Order #BK12345", 130, 135, 14, C.gray, "Regular");
    
    img(s31, 112, 170, 150, 150, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38");
    
    txt(s31, "The Food Hub", 130, 340, 18, C.text, "Bold");
    
    txt(s31, "Rate Food Quality", 30, 390, 16, C.text, "Bold");
    const stars1 = ["⭐", "⭐", "⭐", "⭐", "⭐"];
    let starX1 = 100;
    for (let i = 0; i < 5; i++) {
      const star = figma.createText();
      star.name = `FoodStar${i+1}-CLICK`;
      star.fontName = { family: "Inter", style: "Regular" };
      star.characters = stars1[i];
      star.fontSize = 36;
      star.fills = [{type: 'SOLID', color: i < 4 ? C.yellow : C.gray}];
      star.x = starX1;
      star.y = 420;
      s31.appendChild(star);
      starX1 += 45;
    }
    
    txt(s31, "Rate Delivery", 30, 490, 16, C.text, "Bold");
    let starX2 = 100;
    for (let i = 0; i < 5; i++) {
      const star = figma.createText();
      star.name = `DeliveryStar${i+1}-CLICK`;
      star.fontName = { family: "Inter", style: "Regular" };
      star.characters = "⭐";
      star.fontSize = 36;
      star.fills = [{type: 'SOLID', color: i < 5 ? C.yellow : C.gray}];
      star.x = starX2;
      star.y = 520;
      s31.appendChild(star);
      starX2 += 45;
    }
    
    txt(s31, "Write a Review (Optional)", 30, 590, 14, C.text, "Semi Bold");
    const reviewBox = figma.createRectangle();
    reviewBox.name = "ReviewTextArea";
    reviewBox.resize(315, 100);
    reviewBox.x = 30;
    reviewBox.y = 615;
    reviewBox.cornerRadius = 12;
    reviewBox.fills = [{type: 'SOLID', color: C.lightBg}];
    reviewBox.strokes = [{type: 'SOLID', color: C.gray}];
    reviewBox.strokeWeight = 1;
    s31.appendChild(reviewBox);
    txt(s31, "Share your experience...", 45, 630, 13, C.gray, "Regular");
    
    btn(s31, "SubmitReview-CLICK", 30, 740, 315, 55, C.yellow, "Submit Review", 18); // YELLOW
    txt(s31, "Submit Review", 115, 758, 18, C.white, "Bold");
    
    targetPage.appendChild(s31);
    screens.push(s31);
    x += W + G;
    
    // ==========================================
    // SCREEN 32: PROFILE
    // ==========================================
    const s32 = figma.createFrame();
    s32.name = "32-Profile";
    s32.resize(W, H);
    s32.x = x;
    s32.y = y;
    s32.fills = [{type: 'SOLID', color: C.white}];
    
    header(s32, "Profile", false);
    
    // Profile header card
    const profileCard = figma.createRectangle();
    profileCard.resize(315, 120);
    profileCard.x = 30;
    profileCard.y = 80;
    profileCard.cornerRadius = 16;
    profileCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.24, g: 0.61, b: 0.61, a: 1}},
        {position: 1, color: {r: 0.17, g: 0.37, b: 0.37, a: 1}}
      ]
    }];
    s32.appendChild(profileCard);
    
    const profilePic = figma.createEllipse();
    profilePic.resize(70, 70);
    profilePic.x = 50;
    profilePic.y = 105;
    profilePic.fills = [{type: 'SOLID', color: C.white}];
    s32.appendChild(profilePic);
    txt(s32, "👤", 68, 123, 32, C.teal, "Regular");
    
    txt(s32, "Ahmad Ali", 140, 110, 20, C.white, "Bold");
    txt(s32, "+92 300 1234567", 140, 138, 13, C.white, "Regular");
    txt(s32, "ahmad.ali@email.com", 140, 158, 12, {r: 0.9, g: 0.9, b: 0.9}, "Regular");
    
    const editProfileBtn = figma.createRectangle();
    editProfileBtn.name = "EditProfile-CLICK";
    editProfileBtn.resize(80, 30);
    editProfileBtn.x = 255;
    editProfileBtn.y = 155;
    editProfileBtn.cornerRadius = 15;
    editProfileBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s32.appendChild(editProfileBtn);
    txt(s32, "Edit", 280, 163, 13, C.white, "Bold");
    
    // Menu options
    const menuOptions = [
      {icon: "📦", label: "Order History", nav: "OrderHistory-CLICK"},
      {icon: "❤️", label: "Favorites", nav: "Favorites-CLICK"},
      {icon: "📍", label: "Saved Addresses", nav: "SavedAddresses-CLICK"},
      {icon: "💳", label: "Payment Methods", nav: "PaymentMethods-CLICK"},
      {icon: "🎁", label: "Offers & Rewards", nav: "Offers-CLICK"},
      {icon: "👥", label: "Refer & Earn", nav: "Referral-CLICK"},
      {icon: "⚙️", label: "Settings", nav: "Settings-CLICK"},
      {icon: "❓", label: "Help & Support", nav: "Help-CLICK"}
    ];
    
    let optionY = 230;
    for (const option of menuOptions) {
      const optionCard = figma.createRectangle();
      optionCard.name = option.nav;
      optionCard.resize(315, 55);
      optionCard.x = 30;
      optionCard.y = optionY;
      optionCard.cornerRadius = 12;
      optionCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s32.appendChild(optionCard);
      
      txt(s32, option.icon, 50, optionY + 14, 24, C.text, "Regular");
      txt(s32, option.label, 90, optionY + 19, 15, C.text, "Regular");
      txt(s32, "→", 315, optionY + 17, 20, C.gray, "Regular");
      
      optionY += 63;
    }
    
    const logoutBtn = figma.createRectangle();
    logoutBtn.name = "Logout-CLICK";
    logoutBtn.resize(315, 50);
    logoutBtn.x = 30;
    logoutBtn.y = 730;
    logoutBtn.cornerRadius = 25;
    logoutBtn.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.95}}];
    s32.appendChild(logoutBtn);
    txt(s32, "🚪 Logout", 145, 747, 16, C.red, "Bold");
    
    targetPage.appendChild(s32);
    screens.push(s32);
    x += W + G;
    
    // ==========================================
    // SCREEN 33: EDIT PROFILE
    // ==========================================
    const s33 = figma.createFrame();
    s33.name = "33-Edit-Profile";
    s33.resize(W, H);
    s33.x = x;
    s33.y = y;
    s33.fills = [{type: 'SOLID', color: C.white}];
    
    header(s33, "Edit Profile", true, "BackToProfile-CLICK");
    
    const editProfilePic = figma.createEllipse();
    editProfilePic.resize(100, 100);
    editProfilePic.x = (W - 100) / 2;
    editProfilePic.y = 110;
    editProfilePic.fills = [{type: 'SOLID', color: C.lightBg}];
    s33.appendChild(editProfilePic);
    txt(s33, "👤", 158, 135, 48, C.gray, "Regular");
    
    const changePicBtn = figma.createRectangle();
    changePicBtn.name = "ChangePhoto-CLICK";
    changePicBtn.resize(120, 35);
    changePicBtn.x = 127;
    changePicBtn.y = 225;
    changePicBtn.cornerRadius = 18;
    changePicBtn.fills = [{type: 'SOLID', color: C.teal}];
    s33.appendChild(changePicBtn);
    txt(s33, "Change Photo", 145, 234, 13, C.white, "Bold");
    
    txt(s33, "Full Name", 30, 290, 14, C.text, "Semi Bold");
    inputField(s33, 30, 315, 315, 50, "Ahmad Ali");
    
    txt(s33, "Email", 30, 390, 14, C.text, "Semi Bold");
    inputField(s33, 30, 415, 315, 50, "ahmad.ali@email.com");
    
    txt(s33, "Phone Number", 30, 490, 14, C.text, "Semi Bold");
    inputField(s33, 30, 515, 315, 50, "+92 300 1234567");
    
    txt(s33, "Date of Birth", 30, 590, 14, C.text, "Semi Bold");
    inputField(s33, 30, 615, 315, 50, "01/01/1995");
    
    btn(s33, "SaveProfile-CLICK", 30, 700, 315, 55, C.yellow, "Save Changes", 18); // YELLOW
    txt(s33, "Save Changes", 115, 718, 18, C.white, "Bold");
    
    targetPage.appendChild(s33);
    screens.push(s33);
    x += W + G;
    
    // ==========================================
    // SCREEN 34: ORDER HISTORY
    // ==========================================
    const s34 = figma.createFrame();
    s34.name = "34-Order-History";
    s34.resize(W, H);
    s34.x = x;
    s34.y = y;
    s34.fills = [{type: 'SOLID', color: C.white}];
    
    header(s34, "Order History", true, "BackToProfile-CLICK");
    
    txt(s34, "📦 Your Orders", 30, 90, 22, C.text, "Bold");
    
    const filterTabs = ["All", "Completed", "Cancelled"];
    let tabX3 = 30;
    for (let i = 0; i < filterTabs.length; i++) {
      const tab = figma.createRectangle();
      tab.name = `Filter-${filterTabs[i]}-CLICK`;
      tab.resize(100, 40);
      tab.x = tabX3;
      tab.y = 140;
      tab.cornerRadius = 20;
      tab.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s34.appendChild(tab);
      
      txt(s34, filterTabs[i], tab.x + 25, 151, 14, i === 0 ? C.white : C.text, "Semi Bold");
      tabX3 += 110;
    }
    
    const orders = [
      {id: "#BK12345", restaurant: "The Food Hub", items: "3 items", amount: "Rs 1,887", date: "Nov 14, 2:45 PM", status: "Delivered"},
      {id: "#BK12344", restaurant: "Quick Bites", items: "2 items", amount: "Rs 1,250", date: "Nov 12, 8:15 PM", status: "Delivered"},
      {id: "#BK12343", restaurant: "Spice Garden", items: "4 items", amount: "Rs 2,340", date: "Nov 10, 6:30 PM", status: "Delivered"}
    ];
    
    let orderY = 200;
    for (const order of orders) {
      const orderCard = figma.createRectangle();
      orderCard.name = `Order-${order.id}-CLICK`;
      orderCard.resize(315, 120);
      orderCard.x = 30;
      orderCard.y = orderY;
      orderCard.cornerRadius = 16;
      orderCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s34.appendChild(orderCard);
      
      txt(s34, order.id, 45, orderY + 18, 15, C.text, "Bold");
      
      const statusBadge = figma.createRectangle();
      statusBadge.resize(75, 22);
      statusBadge.x = 260;
      statusBadge.y = orderY + 18;
      statusBadge.cornerRadius = 11;
      statusBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
      s34.appendChild(statusBadge);
      txt(s34, order.status, 268, orderY + 22, 10, C.green, "Bold");
      
      txt(s34, order.restaurant, 45, orderY + 48, 14, C.text, "Regular");
      txt(s34, `${order.items} • ${order.amount}`, 45, orderY + 70, 13, C.gray, "Regular");
      txt(s34, order.date, 45, orderY + 90, 12, C.gray, "Regular");
      
      const reorderBtn = figma.createRectangle();
      reorderBtn.name = `Reorder-${order.id}-CLICK`;
      reorderBtn.resize(90, 35);
      reorderBtn.x = 240;
      reorderBtn.y = orderY + 70;
      reorderBtn.cornerRadius = 18;
      reorderBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
      s34.appendChild(reorderBtn);
      txt(s34, "Reorder", 258, orderY + 79, 13, C.white, "Bold");
      
      orderY += 130;
    }
    
    targetPage.appendChild(s34);
    screens.push(s34);
    x += W + G;
    
    // ==========================================
    // SCREEN 35: ORDER DETAILS
    // ==========================================
    const s35 = figma.createFrame();
    s35.name = "35-Order-Details";
    s35.resize(W, H);
    s35.x = x;
    s35.y = y;
    s35.fills = [{type: 'SOLID', color: C.white}];
    
    header(s35, "Order Details", true, "BackToOrderHistory-CLICK");
    
    txt(s35, "Order #BK12345", 30, 90, 20, C.text, "Bold");
    txt(s35, "Nov 14, 2:45 PM", 230, 93, 13, C.gray, "Regular");
    
    const statusBadge2 = figma.createRectangle();
    statusBadge2.resize(85, 28);
    statusBadge2.x = 30;
    statusBadge2.y = 125;
    statusBadge2.cornerRadius = 14;
    statusBadge2.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s35.appendChild(statusBadge2);
    txt(s35, "✓ Delivered", 43, 131, 13, C.green, "Bold");
    
    txt(s35, "Items Ordered", 30, 180, 16, C.text, "Bold");
    
    const orderItems = [
      {name: "Chicken Tikka Pizza", qty: "1x", price: "Rs 1,049"},
      {name: "Beef Burger Meal", qty: "2x", price: "Rs 1,198"}
    ];
    
    let itemY = 215;
    for (const item of orderItems) {
      const itemCard = figma.createRectangle();
      itemCard.resize(315, 60);
      itemCard.x = 30;
      itemCard.y = itemY;
      itemCard.cornerRadius = 12;
      itemCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s35.appendChild(itemCard);
      
      txt(s35, item.name, 45, itemY + 15, 14, C.text, "Regular");
      txt(s35, `Qty: ${item.qty}`, 45, itemY + 35, 12, C.gray, "Regular");
      txt(s35, item.price, 260, itemY + 23, 14, C.text, "Bold");
      
      itemY += 70;
    }
    
    txt(s35, "Delivery Address", 30, 365, 16, C.text, "Bold");
    const addressBox = figma.createRectangle();
    addressBox.resize(315, 70);
    addressBox.x = 30;
    addressBox.y = 395;
    addressBox.cornerRadius = 12;
    addressBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s35.appendChild(addressBox);
    txt(s35, "🏠 Home", 45, 410, 14, C.text, "Bold");
    txt(s35, "123 Main Boulevard, Gulberg III", 45, 432, 12, C.gray, "Regular");
    txt(s35, "Lahore, Pakistan", 45, 448, 12, C.gray, "Regular");
    
    txt(s35, "Bill Summary", 30, 490, 16, C.text, "Bold");
    const billSummary = figma.createRectangle();
    billSummary.resize(315, 140);
    billSummary.x = 30;
    billSummary.y = 520;
    billSummary.cornerRadius = 12;
    billSummary.fills = [{type: 'SOLID', color: C.lightBg}];
    s35.appendChild(billSummary);
    
    txt(s35, "Item Total", 45, 535, 13, C.gray, "Regular");
    txt(s35, "Rs 2,247", 270, 535, 13, C.text, "Regular");
    txt(s35, "Delivery", 45, 560, 13, C.gray, "Regular");
    txt(s35, "Free", 283, 560, 13, C.green, "Bold");
    txt(s35, "Discount", 45, 585, 13, C.gray, "Regular");
    txt(s35, "-Rs 450", 268, 585, 13, C.green, "Regular");
    txt(s35, "Tax", 45, 610, 13, C.gray, "Regular");
    txt(s35, "Rs 90", 280, 610, 13, C.text, "Regular");
    
    const divider3 = figma.createLine();
    divider3.resize(275, 0);
    divider3.x = 45;
    divider3.y = 635;
    divider3.strokes = [{type: 'SOLID', color: C.gray}];
    divider3.strokeWeight = 1;
    s35.appendChild(divider3);
    
    txt(s35, "Total Paid", 45, 645, 15, C.text, "Bold");
    txt(s35, "Rs 1,887", 255, 645, 16, C.teal, "Bold");
    
    btn(s35, "ReorderThis-CLICK", 30, 690, 150, 50, C.teal, "Reorder", 16);
    txt(s35, "Reorder", 78, 707, 16, C.white, "Bold");
    
    btn(s35, "GetReceipt-CLICK", 195, 690, 150, 50, C.lightBg, "Receipt", 16);
    txt(s35, "Receipt", 240, 707, 16, C.text, "Bold");
    
    targetPage.appendChild(s35);
    screens.push(s35);
    x += W + G;
    
    // ==========================================
    // SCREEN 36: FAVORITES
    // ==========================================
    const s36 = figma.createFrame();
    s36.name = "36-Favorites";
    s36.resize(W, H);
    s36.x = x;
    s36.y = y;
    s36.fills = [{type: 'SOLID', color: C.white}];
    
    header(s36, "Favorites", true, "BackToProfile-CLICK");
    
    txt(s36, "❤️ Your Favorites", 30, 90, 22, C.text, "Bold");
    
    const favTabs = ["Restaurants", "Dishes"];
    let favTabX = 30;
    for (let i = 0; i < favTabs.length; i++) {
      const tab = figma.createRectangle();
      tab.name = `FavTab-${favTabs[i]}-CLICK`;
      tab.resize(150, 40);
      tab.x = favTabX;
      tab.y = 140;
      tab.cornerRadius = 20;
      tab.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s36.appendChild(tab);
      
      txt(s36, favTabs[i], tab.x + 35, 151, 14, i === 0 ? C.white : C.text, "Semi Bold");
      favTabX += 160;
    }
    
    const favorites = [
      {name: "The Food Hub", type: "Fast Food", rating: "4.5", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"},
      {name: "Spice Garden", type: "Desi Food", rating: "4.6", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"},
      {name: "Pizza Palace", type: "Italian", rating: "4.8", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"}
    ];
    
    let favY = 200;
    for (const fav of favorites) {
      const favCard = figma.createRectangle();
      favCard.name = `Favorite-${fav.name.replace(/ /g,'')}-CLICK`;
      favCard.resize(315, 100);
      favCard.x = 30;
      favCard.y = favY;
      favCard.cornerRadius = 16;
      favCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s36.appendChild(favCard);
      
      img(s36, 45, favY + 15, 70, 70, fav.img);
      
      txt(s36, fav.name, 130, favY + 20, 16, C.text, "Bold");
      txt(s36, `${fav.type}`, 130, favY + 43, 12, C.gray, "Regular");
      txt(s36, `⭐ ${fav.rating}`, 130, favY + 63, 12, C.text, "Regular");
      
      const heartBtn = figma.createEllipse();
      heartBtn.name = `RemoveFav-${fav.name.replace(/ /g,'')}-CLICK`;
      heartBtn.resize(35, 35);
      heartBtn.x = 295;
      heartBtn.y = favY + 32;
      heartBtn.fills = [{type: 'SOLID', color: C.red, opacity: 0.2}];
      s36.appendChild(heartBtn);
      txt(s36, "❤️", 304, favY + 38, 18, C.red, "Regular");
      
      favY += 110;
    }
    
    targetPage.appendChild(s36);
    screens.push(s36);
    x += W + G;
    
    // ==========================================
    // SCREEN 37: SAVED ADDRESSES
    // ==========================================
    const s37 = figma.createFrame();
    s37.name = "37-Saved-Addresses";
    s37.resize(W, H);
    s37.x = x;
    s37.y = y;
    s37.fills = [{type: 'SOLID', color: C.white}];
    
    header(s37, "Saved Addresses", true, "BackToProfile-CLICK");
    
    txt(s37, "📍 Your Addresses", 30, 90, 22, C.text, "Bold");
    
    const addAddrBtn = figma.createRectangle();
    addAddrBtn.name = "AddAddress-CLICK";
    addAddrBtn.resize(315, 55);
    addAddrBtn.x = 30;
    addAddrBtn.y = 140;
    addAddrBtn.cornerRadius = 28;
    addAddrBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s37.appendChild(addAddrBtn);
    txt(s37, "+ Add New Address", 110, 158, 17, C.white, "Bold");
    
    const savedAddresses = [
      {type: "Home", address: "123 Main Boulevard, Gulberg III", city: "Lahore", default: true},
      {type: "Work", address: "456 Business Street, DHA Phase 5", city: "Lahore", default: false},
      {type: "Other", address: "789 Park Avenue, Johar Town", city: "Lahore", default: false}
    ];
    
    let addrY2 = 215;
    for (const addr of savedAddresses) {
      const addrCard = figma.createRectangle();
      addrCard.name = `SavedAddress-${addr.type}-CLICK`;
      addrCard.resize(315, 100);
      addrCard.x = 30;
      addrCard.y = addrY2;
      addrCard.cornerRadius = 12;
      addrCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s37.appendChild(addrCard);
      
      const addrIcon = addr.type === "Home" ? "🏠" : addr.type === "Work" ? "💼" : "📍";
      txt(s37, addrIcon, 45, addrY2 + 20, 28, C.text, "Regular");
      
      txt(s37, addr.type, 90, addrY2 + 18, 16, C.text, "Bold");
      
      if (addr.default) {
        const defBadge = figma.createRectangle();
        defBadge.resize(55, 20);
        defBadge.x = 150;
        defBadge.y = addrY2 + 20;
        defBadge.cornerRadius = 10;
        defBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
        s37.appendChild(defBadge);
        txt(s37, "Default", 158, addrY2 + 24, 10, C.green, "Bold");
      }
      
      txt(s37, addr.address, 90, addrY2 + 45, 12, C.gray, "Regular");
      txt(s37, addr.city, 90, addrY2 + 63, 11, C.gray, "Regular");
      
      const editAddrBtn = figma.createText();
      editAddrBtn.name = `EditAddr-${addr.type}-CLICK`;
      editAddrBtn.fontName = { family: "Inter", style: "Bold" };
      editAddrBtn.characters = "Edit";
      editAddrBtn.fontSize = 12;
      editAddrBtn.fills = [{type: 'SOLID', color: C.teal}];
      editAddrBtn.x = 260;
      editAddrBtn.y = addrY2 + 75;
      s37.appendChild(editAddrBtn);
      
      const deleteAddrBtn = figma.createText();
      deleteAddrBtn.name = `DeleteAddr-${addr.type}-CLICK`;
      deleteAddrBtn.fontName = { family: "Inter", style: "Bold" };
      deleteAddrBtn.characters = "Delete";
      deleteAddrBtn.fontSize = 12;
      deleteAddrBtn.fills = [{type: 'SOLID', color: C.red}];
      deleteAddrBtn.x = 300;
      deleteAddrBtn.y = addrY2 + 75;
      s37.appendChild(deleteAddrBtn);
      
      addrY2 += 110;
    }
    
    targetPage.appendChild(s37);
    screens.push(s37);
    x += W + G;
    
    // ==========================================
    // SCREEN 38: PAYMENT METHODS (SAVED)
    // ==========================================
    const s38 = figma.createFrame();
    s38.name = "38-Payment-Methods-Saved";
    s38.resize(W, H);
    s38.x = x;
    s38.y = y;
    s38.fills = [{type: 'SOLID', color: C.white}];
    
    header(s38, "Payment Methods", true, "BackToProfile-CLICK");
    
    txt(s38, "💳 Saved Cards", 30, 90, 22, C.text, "Bold");
    
    const addCardBtn = figma.createRectangle();
    addCardBtn.name = "AddNewCard-CLICK";
    addCardBtn.resize(315, 55);
    addCardBtn.x = 30;
    addCardBtn.y = 140;
    addCardBtn.cornerRadius = 28;
    addCardBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s38.appendChild(addCardBtn);
    txt(s38, "+ Add New Card", 115, 158, 17, C.white, "Bold");
    
    const savedCards = [
      {type: "Visa", last4: "4532", expiry: "12/25", default: true},
      {type: "Mastercard", last4: "8765", expiry: "08/26", default: false}
    ];
    
    let cardY = 215;
    for (const card of savedCards) {
      const cardCard = figma.createRectangle();
      cardCard.name = `Card-${card.last4}-CLICK`;
      cardCard.resize(315, 100);
      cardCard.x = 30;
      cardCard.y = cardY;
      cardCard.cornerRadius = 16;
      cardCard.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          {position: 0, color: {r: 0.24, g: 0.61, b: 0.61, a: 1}},
          {position: 1, color: {r: 0.17, g: 0.37, b: 0.37, a: 1}}
        ]
      }];
      s38.appendChild(cardCard);
      
      txt(s38, card.type, 50, cardY + 20, 16, C.white, "Bold");
      
      if (card.default) {
        const defBadge2 = figma.createRectangle();
        defBadge2.resize(55, 20);
        defBadge2.x = 270;
        defBadge2.y = cardY + 20;
        defBadge2.cornerRadius = 10;
        defBadge2.fills = [{type: 'SOLID', color: C.yellow, opacity: 0.3}];
        s38.appendChild(defBadge2);
        txt(s38, "Default", 278, cardY + 24, 10, C.yellow, "Bold");
      }
      
      txt(s38, `•••• •••• •••• ${card.last4}`, 50, cardY + 50, 18, C.white, "Bold");
      txt(s38, `Expires: ${card.expiry}`, 50, cardY + 75, 12, {r: 0.9, g: 0.9, b: 0.9}, "Regular");
      
      const removeCardBtn = figma.createText();
      removeCardBtn.name = `RemoveCard-${card.last4}-CLICK`;
      removeCardBtn.fontName = { family: "Inter", style: "Bold" };
      removeCardBtn.characters = "Remove";
      removeCardBtn.fontSize = 12;
      removeCardBtn.fills = [{type: 'SOLID', color: C.red}];
      removeCardBtn.x = 270;
      removeCardBtn.y = cardY + 75;
      s38.appendChild(removeCardBtn);
      
      cardY += 110;
    }
    
    targetPage.appendChild(s38);
    screens.push(s38);
    x += W + G;
    
    // ==========================================
    // SCREEN 39: OFFERS & REWARDS
    // ==========================================
    const s39 = figma.createFrame();
    s39.name = "39-Offers-Rewards";
    s39.resize(W, H);
    s39.x = x;
    s39.y = y;
    s39.fills = [{type: 'SOLID', color: C.white}];
    
    header(s39, "Offers & Rewards", true, "BackToProfile-CLICK");
    
    txt(s39, "🎁 Your Rewards", 30, 90, 22, C.text, "Bold");
    
    // Points card
    const pointsCard = figma.createRectangle();
    pointsCard.resize(315, 100);
    pointsCard.x = 30;
    pointsCard.y = 140;
    pointsCard.cornerRadius = 16;
    pointsCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.96, g: 0.72, b: 0.26, a: 1}},
        {position: 1, color: {r: 0.91, g: 0.62, b: 0.16, a: 1}}
      ]
    }];
    s39.appendChild(pointsCard);
    
    txt(s39, "Loyalty Points", 50, 160, 16, C.white, "Bold");
    txt(s39, "1,250", 50, 190, 32, C.white, "Bold");
    txt(s39, "= Rs 125 value", 200, 200, 13, C.white, "Regular");
    
    txt(s39, "Available Offers", 30, 270, 18, C.text, "Bold");
    
    const offers = [
      {title: "20% OFF", desc: "On orders above Rs 1,000", code: "SAVE20", color: C.red},
      {title: "Free Delivery", desc: "On your next 3 orders", code: "FREEDEL", color: C.green},
      {title: "Buy 1 Get 1", desc: "Selected restaurants only", code: "BOGO1", color: C.yellow}
    ];
    
    let offerY = 310;
    for (const offer of offers) {
      const offerCard = figma.createRectangle();
      offerCard.name = `Offer-${offer.code}-CLICK`;
      offerCard.resize(315, 90);
      offerCard.x = 30;
      offerCard.y = offerY;
      offerCard.cornerRadius = 16;
      offerCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s39.appendChild(offerCard);
      
      const colorStrip = figma.createRectangle();
      colorStrip.resize(8, 90);
      colorStrip.x = 30;
      colorStrip.y = offerY;
      colorStrip.fills = [{type: 'SOLID', color: offer.color}];
      s39.appendChild(colorStrip);
      
      txt(s39, offer.title, 55, offerY + 20, 18, C.text, "Bold");
      txt(s39, offer.desc, 55, offerY + 45, 13, C.gray, "Regular");
      
      const codeBox = figma.createRectangle();
      codeBox.resize(85, 28);
      codeBox.x = 245;
      codeBox.y = offerY + 30;
      codeBox.cornerRadius = 14;
      codeBox.fills = [{type: 'SOLID', color: C.teal, opacity: 0.2}];
      codeBox.strokes = [{type: 'SOLID', color: C.teal}];
      codeBox.strokeWeight = 1;
      codeBox.dashPattern = [4, 4];
      s39.appendChild(codeBox);
      txt(s39, offer.code, 255, offerY + 36, 11, C.teal, "Bold");
      
      offerY += 100;
    }
    
    targetPage.appendChild(s39);
    screens.push(s39);
    x += W + G;
    
    // ==========================================
    // SCREEN 40: REFERRAL PROGRAM
    // ==========================================
    const s40 = figma.createFrame();
    s40.name = "40-Referral-Program";
    s40.resize(W, H);
    s40.x = x;
    s40.y = y;
    s40.fills = [{type: 'SOLID', color: C.white}];
    
    header(s40, "Refer & Earn", true, "BackToProfile-CLICK");
    
    txt(s40, "👥 Invite Friends", 30, 90, 24, C.text, "Bold");
    txt(s40, "Get Rs 200 for each friend", 30, 125, 15, C.gray, "Regular");
    
    img(s40, 87, 160, 200, 200, "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6");
    
    txt(s40, "Your Referral Code", 30, 390, 16, C.text, "Bold");
    
    const refCodeBox = figma.createRectangle();
    refCodeBox.resize(315, 70);
    refCodeBox.x = 30;
    refCodeBox.y = 420;
    refCodeBox.cornerRadius = 16;
    refCodeBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s40.appendChild(refCodeBox);
    
    txt(s40, "AHMAD2024", 110, 445, 24, C.teal, "Bold");
    
    const copyCodeBtn = figma.createRectangle();
    copyCodeBtn.name = "CopyReferralCode-CLICK";
    copyCodeBtn.resize(80, 35);
    copyCodeBtn.x = 250;
    copyCodeBtn.y = 438;
    copyCodeBtn.cornerRadius = 18;
    copyCodeBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s40.appendChild(copyCodeBtn);
    txt(s40, "Copy", 273, 447, 14, C.white, "Bold");
    
    txt(s40, "How it works:", 30, 520, 16, C.text, "Bold");
    
    const steps = [
      "1. Share your code with friends",
      "2. Friend signs up and places first order",
      "3. You both get Rs 200 credit"
    ];
    
    let stepY2 = 555;
    for (const step of steps) {
      txt(s40, step, 30, stepY2, 14, C.gray, "Regular");
      stepY2 += 30;
    }
    
    txt(s40, "Your Referrals", 30, 670, 16, C.text, "Bold");
    txt(s40, "5 friends joined • Rs 1,000 earned", 30, 700, 13, C.teal, "Bold");
    
    const shareBtn = figma.createRectangle();
    shareBtn.name = "ShareCode-CLICK";
    shareBtn.resize(315, 55);
    shareBtn.x = 30;
    shareBtn.y = 740;
    shareBtn.cornerRadius = 28;
    shareBtn.fills = [{type: 'SOLID', color: C.teal}];
    s40.appendChild(shareBtn);
    txt(s40, "📤 Share Now", 130, 758, 18, C.white, "Bold");
    
    targetPage.appendChild(s40);
    screens.push(s40);
    x += W + G;
    
    figma.notify(`✅ Chunk 4/9 Complete - Screens 31-40 created`);
    // ==========================================
    // SCREEN 41: SETTINGS
    // ==========================================
    const s41 = figma.createFrame();
    s41.name = "41-Settings";
    s41.resize(W, H);
    s41.x = x;
    s41.y = y;
    s41.fills = [{type: 'SOLID', color: C.white}];
    
    header(s41, "Settings", true, "BackToProfile-CLICK");
    
    txt(s41, "⚙️ App Settings", 30, 90, 22, C.text, "Bold");
    
    const settingsGroups = [
      {title: "Account Settings", icon: "👤", nav: "AccountSettings-CLICK"},
      {title: "Notifications", icon: "🔔", nav: "NotificationSettings-CLICK"},
      {title: "Privacy & Security", icon: "🔒", nav: "Privacy-CLICK"},
      {title: "Payment Settings", icon: "💳", nav: "PaymentSettings-CLICK"},
      {title: "Language", icon: "🌍", nav: "Language-CLICK", value: "English"},
      {title: "Dark Mode", icon: "🌙", nav: "DarkMode-TOGGLE", toggle: true},
      {title: "About App", icon: "ℹ️", nav: "About-CLICK"},
      {title: "Terms & Conditions", icon: "📄", nav: "Terms-CLICK"},
      {title: "Privacy Policy", icon: "🛡️", nav: "PrivacyPolicy-CLICK"}
    ];
    
    let settingY = 140;
    for (const setting of settingsGroups) {
      const settingCard = figma.createRectangle();
      settingCard.name = setting.nav;
      settingCard.resize(315, 60);
      settingCard.x = 30;
      settingCard.y = settingY;
      settingCard.cornerRadius = 12;
      settingCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s41.appendChild(settingCard);
      
      txt(s41, setting.icon, 50, settingY + 17, 24, C.text, "Regular");
      txt(s41, setting.title, 90, settingY + 22, 15, C.text, "Regular");
      
      if (setting.value) {
        txt(s41, setting.value, 250, settingY + 22, 13, C.gray, "Regular");
      }
      
      if (setting.toggle) {
        const toggleBg = figma.createRectangle();
        toggleBg.resize(50, 28);
        toggleBg.x = 285;
        toggleBg.y = settingY + 16;
        toggleBg.cornerRadius = 14;
        toggleBg.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
        s41.appendChild(toggleBg);
        
        const toggleCircle = figma.createEllipse();
        toggleCircle.resize(22, 22);
        toggleCircle.x = 290;
        toggleCircle.y = settingY + 19;
        toggleCircle.fills = [{type: 'SOLID', color: C.white}];
        s41.appendChild(toggleCircle);
      } else {
        txt(s41, "→", 315, settingY + 20, 20, C.gray, "Regular");
      }
      
      settingY += 68;
    }
    
    txt(s41, "Version 1.0.0", 155, 760, 12, C.gray, "Regular");
    
    targetPage.appendChild(s41);
    screens.push(s41);
    x += W + G;
    
    // ==========================================
    // SCREEN 42: NOTIFICATION SETTINGS
    // ==========================================
    const s42 = figma.createFrame();
    s42.name = "42-Notification-Settings";
    s42.resize(W, H);
    s42.x = x;
    s42.y = y;
    s42.fills = [{type: 'SOLID', color: C.white}];
    
    header(s42, "Notifications", true, "BackToSettings-CLICK");
    
    txt(s42, "🔔 Manage Notifications", 70, 90, 20, C.text, "Bold");
    
    const notifSettings = [
      {label: "Order Updates", desc: "Status and delivery notifications", enabled: true},
      {label: "Promotional Offers", desc: "Deals and discounts", enabled: true},
      {label: "Restaurant Updates", desc: "New menus and special items", enabled: false},
      {label: "Payment Notifications", desc: "Transaction confirmations", enabled: true},
      {label: "Rider Updates", desc: "Rider location and proximity", enabled: true},
      {label: "Push Notifications", desc: "All app notifications", enabled: true},
      {label: "Email Notifications", desc: "Receive updates via email", enabled: false},
      {label: "SMS Notifications", desc: "Text message alerts", enabled: false}
    ];
    
    let notifY = 150;
    for (const notif of notifSettings) {
      const notifCard = figma.createRectangle();
      notifCard.name = `Notif-${notif.label.replace(/ /g,'')}-TOGGLE`;
      notifCard.resize(315, 80);
      notifCard.x = 30;
      notifCard.y = notifY;
      notifCard.cornerRadius = 12;
      notifCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s42.appendChild(notifCard);
      
      txt(s42, notif.label, 45, notifY + 20, 15, C.text, "Bold");
      txt(s42, notif.desc, 45, notifY + 45, 12, C.gray, "Regular");
      
      const toggleBg2 = figma.createRectangle();
      toggleBg2.resize(50, 28);
      toggleBg2.x = 285;
      toggleBg2.y = notifY + 26;
      toggleBg2.cornerRadius = 14;
      toggleBg2.fills = [{type: 'SOLID', color: notif.enabled ? C.teal : C.gray, opacity: notif.enabled ? 1 : 0.3}];
      s42.appendChild(toggleBg2);
      
      const toggleCircle2 = figma.createEllipse();
      toggleCircle2.resize(22, 22);
      toggleCircle2.x = notif.enabled ? 310 : 290;
      toggleCircle2.y = notifY + 29;
      toggleCircle2.fills = [{type: 'SOLID', color: C.white}];
      s42.appendChild(toggleCircle2);
      
      notifY += 90;
    }
    
    targetPage.appendChild(s42);
    screens.push(s42);
    x += W + G;
    
    // ==========================================
    // SCREEN 43: HELP & SUPPORT
    // ==========================================
    const s43 = figma.createFrame();
    s43.name = "43-Help-Support";
    s43.resize(W, H);
    s43.x = x;
    s43.y = y;
    s43.fills = [{type: 'SOLID', color: C.white}];
    
    header(s43, "Help & Support", true, "BackToProfile-CLICK");
    
    txt(s43, "❓ How can we help?", 30, 90, 22, C.text, "Bold");
    
    const helpSearchBar = figma.createRectangle();
    helpSearchBar.name = "SearchHelp";
    helpSearchBar.resize(315, 50);
    helpSearchBar.x = 30;
    helpSearchBar.y = 140;
    helpSearchBar.cornerRadius = 25;
    helpSearchBar.fills = [{type: 'SOLID', color: C.lightBg}];
    s43.appendChild(helpSearchBar);
    txt(s43, "🔍 Search for help...", 50, 155, 14, C.gray, "Regular");
    
    txt(s43, "Quick Actions", 30, 220, 18, C.text, "Bold");
    
    const quickActions = [
      {icon: "💬", label: "Live Chat", nav: "LiveChat-CLICK"},
      {icon: "📞", label: "Call Us", nav: "CallSupport-CLICK"},
      {icon: "📧", label: "Email", nav: "EmailSupport-CLICK"},
      {icon: "🤖", label: "FAQ Bot", nav: "FAQBot-CLICK"}
    ];
    
    let actionX = 30;
    for (let i = 0; i < quickActions.length; i++) {
      const action = quickActions[i];
      const actionCard = figma.createRectangle();
      actionCard.name = action.nav;
      actionCard.resize(70, 80);
      actionCard.x = actionX;
      actionCard.y = 260;
      actionCard.cornerRadius = 12;
      actionCard.fills = [{type: 'SOLID', color: i === 0 ? C.yellow : C.lightBg}]; // YELLOW for Live Chat
      s43.appendChild(actionCard);
      
      txt(s43, action.icon, actionX + 23, 280, 28, i === 0 ? C.white : C.text, "Regular");
      txt(s43, action.label, actionX + 10, 315, 11, i === 0 ? C.white : C.text, "Semi Bold");
      
      actionX += 78;
    }
    
    txt(s43, "Common Topics", 30, 370, 18, C.text, "Bold");
    
    const faqTopics = [
      {q: "How to track my order?", icon: "📦"},
      {q: "How to cancel an order?", icon: "❌"},
      {q: "Payment issues", icon: "💳"},
      {q: "Refund policy", icon: "💰"},
      {q: "Delivery areas", icon: "📍"},
      {q: "Account settings", icon: "⚙️"}
    ];
    
    let faqY = 410;
    for (const faq of faqTopics) {
      const faqCard = figma.createRectangle();
      faqCard.name = `FAQ-${faq.q.replace(/ /g,'')}-CLICK`;
      faqCard.resize(315, 55);
      faqCard.x = 30;
      faqCard.y = faqY;
      faqCard.cornerRadius = 12;
      faqCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s43.appendChild(faqCard);
      
      txt(s43, faq.icon, 50, faqY + 15, 24, C.text, "Regular");
      txt(s43, faq.q, 90, faqY + 20, 14, C.text, "Regular");
      txt(s43, "→", 315, faqY + 18, 20, C.gray, "Regular");
      
      faqY += 63;
    }
    
    targetPage.appendChild(s43);
    screens.push(s43);
    x += W + G;
    
    // ==========================================
    // SCREEN 44: LIVE CHAT SUPPORT
    // ==========================================
    const s44 = figma.createFrame();
    s44.name = "44-Live-Chat-Support";
    s44.resize(W, H);
    s44.x = x;
    s44.y = y;
    s44.fills = [{type: 'SOLID', color: C.white}];
    
    header(s44, "Live Chat", true, "BackToHelp-CLICK");
    
    txt(s44, "Support Agent", 30, 90, 16, C.text, "Bold");
    txt(s44, "🟢 Online • Avg response: 2 min", 30, 115, 12, C.green, "Regular");
    
    // Chat messages
    const chatMessages = [
      {sender: "agent", text: "Hi! How can I help you today?", time: "2:30 PM"},
      {sender: "user", text: "My order hasn't arrived yet", time: "2:31 PM"},
      {sender: "agent", text: "Let me check that for you. What's your order ID?", time: "2:31 PM"},
      {sender: "user", text: "Order #BK12345", time: "2:32 PM"},
      {sender: "agent", text: "Thanks! I see your order is with the rider. ETA: 5 minutes.", time: "2:33 PM"}
    ];
    
    let chatY = 160;
    for (const msg of chatMessages) {
      const isAgent = msg.sender === "agent";
      const msgWidth = 220;
      const msgX = isAgent ? 30 : W - 30 - msgWidth;
      
      const msgBg = figma.createRectangle();
      msgBg.resize(msgWidth, 60);
      msgBg.x = msgX;
      msgBg.y = chatY;
      msgBg.cornerRadius = 16;
      msgBg.fills = [{type: 'SOLID', color: isAgent ? C.lightBg : C.teal}];
      s44.appendChild(msgBg);
      
      txt(s44, msg.text, msgX + 15, chatY + 12, 13, isAgent ? C.text : C.white, "Regular");
      txt(s44, msg.time, msgX + 15, chatY + 40, 10, isAgent ? C.gray : {r: 0.9, g: 0.9, b: 0.9}, "Regular");
      
      chatY += 75;
    }
    
    // Typing indicator
    const typingBg = figma.createRectangle();
    typingBg.resize(80, 40);
    typingBg.x = 30;
    typingBg.y = chatY + 20;
    typingBg.cornerRadius = 12;
    typingBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s44.appendChild(typingBg);
    txt(s44, "• • •", 55, chatY + 30, 16, C.gray, "Regular");
    txt(s44, "typing...", 30, chatY + 70, 11, C.gray, "Regular");
    
    // Message input
    const msgInput = figma.createRectangle();
    msgInput.name = "MessageInput";
    msgInput.resize(260, 50);
    msgInput.x = 30;
    msgInput.y = 720;
    msgInput.cornerRadius = 25;
    msgInput.fills = [{type: 'SOLID', color: C.lightBg}];
    s44.appendChild(msgInput);
    txt(s44, "Type a message...", 50, 735, 14, C.gray, "Regular");
    
    const sendMsgBtn = figma.createRectangle();
    sendMsgBtn.name = "SendMessage-CLICK";
    sendMsgBtn.resize(50, 50);
    sendMsgBtn.x = 295;
    sendMsgBtn.y = 720;
    sendMsgBtn.cornerRadius = 25;
    sendMsgBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s44.appendChild(sendMsgBtn);
    txt(s44, "➤", 313, 728, 20, C.white, "Bold");
    
    targetPage.appendChild(s44);
    screens.push(s44);
    x += W + G;
    
    // ==========================================
    // SCREEN 45: NOTIFICATIONS CENTER
    // ==========================================
    const s45 = figma.createFrame();
    s45.name = "45-Notifications-Center";
    s45.resize(W, H);
    s45.x = x;
    s45.y = y;
    s45.fills = [{type: 'SOLID', color: C.white}];
    
    header(s45, "Notifications", true, "BackToHome-CLICK");
    
    txt(s45, "🔔 All Notifications", 30, 90, 22, C.text, "Bold");
    
    const clearAllBtn = figma.createText();
    clearAllBtn.name = "ClearAll-CLICK";
    clearAllBtn.fontName = { family: "Inter", style: "Bold" };
    clearAllBtn.characters = "Clear All";
    clearAllBtn.fontSize = 13;
    clearAllBtn.fills = [{type: 'SOLID', color: C.teal}];
    clearAllBtn.x = 275;
    clearAllBtn.y = 95;
    s45.appendChild(clearAllBtn);
    
    const notifications = [
      {title: "Order Delivered", desc: "Your order #BK12345 has been delivered", time: "5 min ago", icon: "✅", read: false},
      {title: "20% OFF Today", desc: "Get discount on orders above Rs 1,000", time: "1 hour ago", icon: "🎁", read: false},
      {title: "Rider Nearby", desc: "Your rider is 2 minutes away", time: "2 hours ago", icon: "🚴", read: true},
      {title: "Order Confirmed", desc: "Restaurant is preparing your order", time: "3 hours ago", icon: "✓", read: true},
      {title: "Payment Successful", desc: "Rs 1,887 paid via wallet", time: "3 hours ago", icon: "💳", read: true}
    ];
    
    let notifY2 = 140;
    for (const notif of notifications) {
      const notifCard = figma.createRectangle();
      notifCard.name = `Notification-${notif.title.replace(/ /g,'')}-CLICK`;
      notifCard.resize(315, 90);
      notifCard.x = 30;
      notifCard.y = notifY2;
      notifCard.cornerRadius = 12;
      notifCard.fills = [{type: 'SOLID', color: notif.read ? C.white : C.lightBg}];
      notifCard.strokes = [{type: 'SOLID', color: C.lightBg}];
      notifCard.strokeWeight = 1;
      s45.appendChild(notifCard);
      
      txt(s45, notif.icon, 45, notifY2 + 25, 28, C.text, "Regular");
      txt(s45, notif.title, 90, notifY2 + 20, 15, C.text, "Bold");
      txt(s45, notif.desc, 90, notifY2 + 43, 12, C.gray, "Regular");
      txt(s45, notif.time, 90, notifY2 + 63, 11, C.gray, "Regular");
      
      if (!notif.read) {
        const unreadDot = figma.createEllipse();
        unreadDot.resize(10, 10);
        unreadDot.x = 320;
        unreadDot.y = notifY2 + 40;
        unreadDot.fills = [{type: 'SOLID', color: C.teal}];
        s45.appendChild(unreadDot);
      }
      
      notifY2 += 100;
    }
    
    targetPage.appendChild(s45);
    screens.push(s45);
    x += W + G;
    
    // ==========================================
    // SCREEN 46: SUBSCRIPTION / MEMBERSHIP
    // ==========================================
    const s46 = figma.createFrame();
    s46.name = "46-Subscription-Membership";
    s46.resize(W, H);
    s46.x = x;
    s46.y = y;
    s46.fills = [{type: 'SOLID', color: C.white}];
    
    header(s46, "Membership", true, "BackToProfile-CLICK");
    
    txt(s46, "👑 BasKhao Premium", 85, 90, 22, C.text, "Bold");
    txt(s46, "Unlock exclusive benefits", 95, 125, 14, C.gray, "Regular");
    
    img(s46, 87, 160, 200, 150, "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a");
    
    txt(s46, "Choose Your Plan", 30, 340, 18, C.text, "Bold");
    
    const plans = [
      {name: "Monthly", price: "Rs 499", duration: "/month", popular: false},
      {name: "Quarterly", price: "Rs 1,299", duration: "/3 months", popular: true, save: "Save 15%"},
      {name: "Yearly", price: "Rs 4,499", duration: "/year", popular: false, save: "Save 25%"}
    ];
    
    let planY = 380;
    for (const plan of plans) {
      const planCard = figma.createRectangle();
      planCard.name = `Plan-${plan.name}-CLICK`;
      planCard.resize(315, 100);
      planCard.x = 30;
      planCard.y = planY;
      planCard.cornerRadius = 16;
      //planCard.fills = [{type: 'SOLID', color: plan.popular ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      //planCard.strokes = [{type: 'SOLID', color: plan.popular ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
      planCard.strokeWeight = plan.popular ? 2 : 0;
      s46.appendChild(planCard);
      
      if (plan.popular) {
        const popularBadge = figma.createRectangle();
        popularBadge.resize(80, 25);
        popularBadge.x = 250;
        popularBadge.y = planY + 10;
        popularBadge.cornerRadius = 12;
        popularBadge.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
        s46.appendChild(popularBadge);
        txt(s46, "⭐ Popular", 260, planY + 15, 11, C.white, "Bold");
      }
      
      txt(s46, plan.name, 50, planY + 25, 18, C.text, "Bold");
      txt(s46, plan.price, 50, planY + 50, 20, C.teal, "Bold");
      txt(s46, plan.duration, 135, planY + 57, 13, C.gray, "Regular");
      
      if (plan.save) {
        const saveBadge = figma.createRectangle();
        saveBadge.resize(70, 22);
        saveBadge.x = 50;
        saveBadge.y = planY + 75;
        saveBadge.cornerRadius = 11;
        saveBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
        s46.appendChild(saveBadge);
        txt(s46, plan.save, 58, planY + 79, 10, C.green, "Bold");
      }
      
      planY += 110;
    }
    
    txt(s46, "✓ Free delivery on all orders", 30, 710, 13, C.gray, "Regular");
    txt(s46, "✓ Priority customer support", 30, 730, 13, C.gray, "Regular");
    txt(s46, "✓ Exclusive deals & discounts", 30, 750, 13, C.gray, "Regular");
    
    targetPage.appendChild(s46);
    screens.push(s46);
    x += W + G;
    
    // ==========================================
    // SCREEN 47: TABLE RESERVATION
    // ==========================================
    const s47 = figma.createFrame();
    s47.name = "47-Table-Reservation";
    s47.resize(W, H);
    s47.x = x;
    s47.y = y;
    s47.fills = [{type: 'SOLID', color: C.white}];
    
    header(s47, "Reserve Table", true, "BackToRestaurant-CLICK");
    
    txt(s47, "🍽️ Table Reservation", 30, 90, 22, C.text, "Bold");
    txt(s47, "The Food Hub", 30, 125, 16, C.gray, "Regular");
    
    txt(s47, "Select Date", 30, 170, 16, C.text, "Bold");
    
    const dates2 = ["Today", "Tomorrow", "Nov 16", "Nov 17", "Nov 18"];
    let dateX2 = 30;
    for (let i = 0; i < dates2.length; i++) {
      const dateBtn = figma.createRectangle();
      dateBtn.name = `ReserveDate-${dates2[i].replace(/ /g,'')}-CLICK`;
      dateBtn.resize(63, 50);
      dateBtn.x = dateX2;
      dateBtn.y = 200;
      dateBtn.cornerRadius = 12;
      dateBtn.fills = [{type: 'SOLID', color: i === 1 ? C.teal : C.lightBg}];
      s47.appendChild(dateBtn);
      
      txt(s47, dates2[i], dateBtn.x + 10, 218, 12, i === 1 ? C.white : C.text, "Semi Bold");
      dateX2 += 68;
    }
    
    txt(s47, "Select Time", 30, 280, 16, C.text, "Bold");
    
    const timeSlots2 = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];
    let timeX = 30;
    for (let i = 0; i < timeSlots2.length; i++) {
      const timeBtn = figma.createRectangle();
      timeBtn.name = `ReserveTime-${timeSlots2[i].replace(/:/g,'').replace(/ /g,'')}-CLICK`;
      timeBtn.resize(70, 45);
      timeBtn.x = timeX;
      timeBtn.y = 310;
      timeBtn.cornerRadius = 22;
      timeBtn.fills = [{type: 'SOLID', color: i === 1 ? C.teal : C.lightBg}];
      s47.appendChild(timeBtn);
      
      txt(s47, timeSlots2[i], timeBtn.x + 10, 323, 13, i === 1 ? C.white : C.text, "Semi Bold");
      timeX += 77;
    }
    
    txt(s47, "Party Size", 30, 385, 16, C.text, "Bold");
    
    const partySizes = ["2", "4", "6", "8+"];
    let sizeX2 = 30;
    for (let i = 0; i < partySizes.length; i++) {
      const sizeBtn = figma.createRectangle();
      sizeBtn.name = `PartySize-${partySizes[i].replace('+','')}-CLICK`;
      sizeBtn.resize(70, 45);
      sizeBtn.x = sizeX2;
      sizeBtn.y = 415;
      sizeBtn.cornerRadius = 22;
      sizeBtn.fills = [{type: 'SOLID', color: i === 1 ? C.teal : C.lightBg}];
      s47.appendChild(sizeBtn);
      
      txt(s47, partySizes[i] + (i === 3 ? "" : " people"), sizeBtn.x + (i === 3 ? 25 : 18), 428, 13, i === 1 ? C.white : C.text, "Semi Bold");
      sizeX2 += 77;
    }
    
    txt(s47, "Special Requests", 30, 490, 14, C.text, "Semi Bold");
    const requestBox = figma.createRectangle();
    requestBox.name = "SpecialRequests";
    requestBox.resize(315, 80);
    requestBox.x = 30;
    requestBox.y = 515;
    requestBox.cornerRadius = 12;
    requestBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s47.appendChild(requestBox);
    txt(s47, "Window seat, birthday celebration...", 45, 530, 13, C.gray, "Regular");
    
    const reserveInfoBox = figma.createRectangle();
    reserveInfoBox.resize(315, 70);
    reserveInfoBox.x = 30;
    reserveInfoBox.y = 615;
    reserveInfoBox.cornerRadius = 12;
    reserveInfoBox.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s47.appendChild(reserveInfoBox);
    txt(s47, "ℹ️ Reservation Info:", 45, 630, 14, C.text, "Bold");
    txt(s47, "Table will be held for 15 minutes", 45, 653, 12, C.gray, "Regular");
    txt(s47, "Free cancellation up to 2 hours before", 45, 670, 12, C.gray, "Regular");
    
    btn(s47, "ConfirmReservation-CLICK", 30, 710, 315, 55, C.yellow, "Confirm Reservation", 18); // YELLOW
    txt(s47, "Confirm Reservation", 90, 728, 18, C.white, "Bold");
    
    targetPage.appendChild(s47);
    screens.push(s47);
    x += W + G;
    
    // ==========================================
    // SCREEN 48: RECEIPT
    // ==========================================
    const s48 = figma.createFrame();
    s48.name = "48-Receipt";
    s48.resize(W, H);
    s48.x = x;
    s48.y = y;
    s48.fills = [{type: 'SOLID', color: C.white}];
    
    header(s48, "Receipt", true, "BackToOrderDetails-CLICK");
    
    const receiptBg = figma.createRectangle();
    receiptBg.resize(315, 650);
    receiptBg.x = 30;
    receiptBg.y = 90;
    receiptBg.cornerRadius = 16;
    receiptBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s48.appendChild(receiptBg);
    
    txt(s48, "BasKhao", 150, 110, 20, C.teal, "Bold");
    txt(s48, "Food Delivery Service", 120, 135, 12, C.gray, "Regular");
    
    const divider4 = figma.createLine();
    divider4.resize(275, 0);
    divider4.x = 50;
    divider4.y = 165;
    divider4.strokes = [{type: 'SOLID', color: C.gray}];
    divider4.strokeWeight = 1;
    divider4.dashPattern = [4, 4];
    s48.appendChild(divider4);
    
    txt(s48, "Order #BK12345", 50, 180, 15, C.text, "Bold");
    txt(s48, "Date: Nov 14, 2025 2:45 PM", 50, 205, 12, C.gray, "Regular");
    txt(s48, "Customer: Ahmad Ali", 50, 225, 12, C.gray, "Regular");
    
    const divider5 = figma.createLine();
    divider5.resize(275, 0);
    divider5.x = 50;
    divider5.y = 250;
    divider5.strokes = [{type: 'SOLID', color: C.gray}];
    divider5.strokeWeight = 1;
    divider5.dashPattern = [4, 4];
    s48.appendChild(divider5);
    
    txt(s48, "Items:", 50, 270, 14, C.text, "Bold");
    txt(s48, "Chicken Tikka Pizza (1x)", 50, 295, 12, C.text, "Regular");
    txt(s48, "Rs 1,049", 270, 295, 12, C.text, "Regular");
    txt(s48, "Beef Burger Meal (2x)", 50, 320, 12, C.text, "Regular");
    txt(s48, "Rs 1,198", 270, 320, 12, C.text, "Regular");
    
    const divider6 = figma.createLine();
    divider6.resize(275, 0);
    divider6.x = 50;
    divider6.y = 345;
    divider6.strokes = [{type: 'SOLID', color: C.gray}];
    divider6.strokeWeight = 1;
    s48.appendChild(divider6);
    
    txt(s48, "Subtotal", 50, 365, 12, C.gray, "Regular");
    txt(s48, "Rs 2,247", 270, 365, 12, C.text, "Regular");
    txt(s48, "Delivery Fee", 50, 390, 12, C.gray, "Regular");
    txt(s48, "Free", 283, 390, 12, C.green, "Bold");
    txt(s48, "Discount (20%)", 50, 415, 12, C.gray, "Regular");
    txt(s48, "-Rs 450", 268, 415, 12, C.green, "Regular");
    txt(s48, "Tax (5%)", 50, 440, 12, C.gray, "Regular");
    txt(s48, "Rs 90", 280, 440, 12, C.text, "Regular");
    txt(s48, "Tip", 50, 465, 12, C.gray, "Regular");
    txt(s48, "Rs 0", 285, 465, 12, C.text, "Regular");
    
    const divider7 = figma.createLine();
    divider7.resize(275, 0);
    divider7.x = 50;
    divider7.y = 490;
    divider7.strokes = [{type: 'SOLID', color: C.text}];
    divider7.strokeWeight = 2;
    s48.appendChild(divider7);
    
    txt(s48, "Total Paid", 50, 510, 16, C.text, "Bold");
    txt(s48, "Rs 1,887", 255, 510, 16, C.teal, "Bold");
    
    const divider8 = figma.createLine();
    divider8.resize(275, 0);
    divider8.x = 50;
    divider8.y = 545;
    divider8.strokes = [{type: 'SOLID', color: C.gray}];
    divider8.strokeWeight = 1;
    divider8.dashPattern = [4, 4];
    s48.appendChild(divider8);
    
    txt(s48, "Payment Method:", 50, 565, 12, C.gray, "Regular");
    txt(s48, "Wallet", 250, 565, 12, C.text, "Bold");
    txt(s48, "Delivered to:", 50, 590, 12, C.gray, "Regular");
    txt(s48, "Home - Gulberg III", 50, 610, 12, C.text, "Regular");
    txt(s48, "Delivery by: Bilal (Rider)", 50, 635, 12, C.gray, "Regular");
    
    const divider9 = figma.createLine();
    divider9.resize(275, 0);
    divider9.x = 50;
    divider9.y = 665;
    divider9.strokes = [{type: 'SOLID', color: C.gray}];
    divider9.strokeWeight = 1;
    divider9.dashPattern = [4, 4];
    s48.appendChild(divider9);
    
    txt(s48, "Thank you for ordering!", 105, 690, 13, C.teal, "Bold");
    txt(s48, "Rate your experience", 115, 710, 12, C.gray, "Regular");
    
    btn(s48, "DownloadReceipt-CLICK", 30, 760, 150, 45, C.teal, "Download", 15);
    txt(s48, "Download", 70, 774, 15, C.white, "Bold");
    
    btn(s48, "ShareReceipt-CLICK", 195, 760, 150, 45, C.lightBg, "Share", 15);
    txt(s48, "Share", 248, 774, 15, C.text, "Bold");
    
    targetPage.appendChild(s48);
    screens.push(s48);
    x += W + G;
    
    // ==========================================
    // SCREEN 49: AGE VERIFICATION
    // ==========================================
    const s49 = figma.createFrame();
    s49.name = "49-Age-Verification";
    s49.resize(W, H);
    s49.x = x;
    s49.y = y;
    s49.fills = [{type: 'SOLID', color: C.white}];
    
    header(s49, "Age Verification", true, "BackToMenu-CLICK");
    
    txt(s49, "🔞 Age Restricted Item", 80, 100, 20, C.text, "Bold");
    txt(s49, "Verification required to proceed", 80, 135, 14, C.gray, "Regular");
    
    img(s49, 112, 180, 150, 150, "https://images.unsplash.com/photo-1527980965255-d3b416303d12");
    
    txt(s49, "You must be 18+ to purchase", 75, 360, 15, C.text, "Bold");
    txt(s49, "this item. Please verify your age.", 80, 385, 14, C.gray, "Regular");
    
    txt(s49, "Date of Birth", 30, 430, 14, C.text, "Semi Bold");
    inputField(s49, 30, 455, 315, 50, "DD / MM / YYYY");
    
    txt(s49, "ID Type", 30, 530, 14, C.text, "Semi Bold");
    const idTypes = ["National ID", "Passport", "Driving License"];
    let idX = 30;
    for (let i = 0; i < idTypes.length; i++) {
      const idBtn = figma.createRectangle();
      idBtn.name = `IDType-${idTypes[i].replace(/ /g,'')}-CLICK`;
      idBtn.resize(95, 45);
      idBtn.x = idX;
      idBtn.y = 555;
      idBtn.cornerRadius = 22;
      idBtn.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s49.appendChild(idBtn);
      
      txt(s49, idTypes[i], idBtn.x + 8, 568, 11, i === 0 ? C.white : C.text, "Semi Bold");
      idX += 105;
    }
    
    txt(s49, "Upload ID Photo", 30, 630, 14, C.text, "Semi Bold");
    const uploadBox = figma.createRectangle();
    uploadBox.name = "UploadID-CLICK";
    uploadBox.resize(315, 80);
    uploadBox.x = 30;
    uploadBox.y = 655;
    uploadBox.cornerRadius = 12;
    uploadBox.fills = [{type: 'SOLID', color: C.lightBg}];
    uploadBox.strokes = [{type: 'SOLID', color: C.gray}];
    uploadBox.strokeWeight = 2;
    uploadBox.dashPattern = [8, 8];
    s49.appendChild(uploadBox);
    txt(s49, "📷", 165, 677, 32, C.gray, "Regular");
    txt(s49, "Click to upload", 135, 715, 13, C.gray, "Regular");
    
    btn(s49, "VerifyAge-CLICK", 30, 755, 315, 55, C.yellow, "Verify & Continue", 18); // YELLOW
    txt(s49, "Verify & Continue", 105, 773, 18, C.white, "Bold");
    
    targetPage.appendChild(s49);
    screens.push(s49);
    x += W + G;
    
    // ==========================================
    // SCREEN 50: GUEST PROFILE
    // ==========================================
    const s50 = figma.createFrame();
    s50.name = "50-Guest-Profile";
    s50.resize(W, H);
    s50.x = x;
    s50.y = y;
    s50.fills = [{type: 'SOLID', color: C.white}];
    
    header(s50, "Guest Profile", false);
    
    txt(s50, "👤 Guest Mode", 30, 90, 24, C.text, "Bold");
    txt(s50, "Limited features available", 30, 125, 14, C.gray, "Regular");
    
    const guestInfoCard = figma.createRectangle();
    guestInfoCard.resize(315, 100);
    guestInfoCard.x = 30;
    guestInfoCard.y = 170;
    guestInfoCard.cornerRadius = 16;
    guestInfoCard.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.8}}];
    s50.appendChild(guestInfoCard);
    
    txt(s50, "⚠️ You're browsing as Guest", 50, 190, 15, C.text, "Bold");
    txt(s50, "Create an account to:", 50, 215, 13, C.gray, "Regular");
    txt(s50, "• Save order history", 50, 235, 12, C.gray, "Regular");
    txt(s50, "• Track orders easily", 50, 253, 12, C.gray, "Regular");
    
    btn(s50, "CreateAccount-CLICK", 30, 300, 315, 55, C.yellow, "Create Account", 18); // YELLOW
    txt(s50, "Create Account", 110, 318, 18, C.white, "Bold");
    
    txt(s50, "Quick Actions", 30, 385, 18, C.text, "Bold");
    
    const guestActions = [
      {icon: "🏠", label: "Browse Restaurants", nav: "BrowseAsGuest-CLICK"},
      {icon: "📦", label: "Track Current Order", nav: "TrackGuest-CLICK"},
      {icon: "❓", label: "Help & Support", nav: "HelpGuest-CLICK"}
    ];
    
    let guestY = 425;
    for (const action of guestActions) {
      const actionCard = figma.createRectangle();
      actionCard.name = action.nav;
      actionCard.resize(315, 60);
      actionCard.x = 30;
      actionCard.y = guestY;
      actionCard.cornerRadius = 12;
      actionCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s50.appendChild(actionCard);
      
      txt(s50, action.icon, 50, guestY + 17, 24, C.text, "Regular");
      txt(s50, action.label, 90, guestY + 22, 15, C.text, "Regular");
      txt(s50, "→", 315, guestY + 20, 20, C.gray, "Regular");
      
      guestY += 68;
    }
    
    targetPage.appendChild(s50);
    screens.push(s50);
    x += W + G;
    
    figma.notify(`✅ Chunk 5/9 Complete - Screens 41-50 created`);
    // ==========================================
    // SCREEN 51: RIDER LOGIN
    // ==========================================
        // ==========================================
    // START RIDER ROW (ROW 2)
    // ==========================================
    x = 0;  // ✅ Reset to left
    y = H + ROW_GAP;  // ✅ Move down to second row
    
    // ==========================================
    // SCREEN 51: RIDER LOGIN
    // ==========================================
    const s51 = figma.createFrame();

    s51.name = "Rider-01-Login";
    s51.resize(W, H);
    s51.x = x;
    s51.y = y;
    s51.fills = [{type: 'SOLID', color: C.white}];
    
    header(s51, "Rider Login", false);
    
    txt(s51, "🚴 Rider Portal", 30, 100, 28, C.text, "Bold");
    txt(s51, "Sign in to start delivering", 30, 140, 16, C.gray, "Regular");
    
    img(s51, 112, 190, 150, 150, "https://images.unsplash.com/photo-1526367790999-0150786686a2");
    
    txt(s51, "Phone Number", 30, 370, 14, C.text, "Semi Bold");
    inputField(s51, 30, 395, 315, 50, "+92 300 1234567");
    
    txt(s51, "Password", 30, 470, 14, C.text, "Semi Bold");
    inputField(s51, 30, 495, 315, 50, "Enter your password");
    
    btn(s51, "RiderLogin-CLICK", 30, 580, 315, 55, C.teal, "Login", 18);
    txt(s51, "Login", 160, 598, 18, C.white, "Bold");
    
    txt(s51, "New rider?", 120, 660, 14, C.gray, "Regular");
    const riderSignupLink = figma.createText();
    riderSignupLink.name = "RiderSignup-CLICK";
    riderSignupLink.fontName = { family: "Inter", style: "Bold" };
    riderSignupLink.characters = "Register Now";
    riderSignupLink.fontSize = 14;
    riderSignupLink.fills = [{type: 'SOLID', color: C.teal}];
    riderSignupLink.x = 180;
    riderSignupLink.y = 685;
    s51.appendChild(riderSignupLink);
    
    targetPage.appendChild(s51);
    screens.push(s51);
    x += W + G;
    
    // ==========================================
    // SCREEN 52: RIDER DASHBOARD
    // ==========================================
    const s52 = figma.createFrame();
    s52.name = "Rider-02-Dashboard";
    s52.resize(W, H);
    s52.x = x;
    s52.y = y;
    s52.fills = [{type: 'SOLID', color: C.white}];
    
    header(s52, "Rider Dashboard", false);
    
    // Status toggle
    const statusCard = figma.createRectangle();
    statusCard.resize(315, 100);
    statusCard.x = 30;
    statusCard.y = 80;
    statusCard.cornerRadius = 16;
    statusCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.2, g: 0.7, b: 0.3, a: 1}},
        {position: 1, color: {r: 0.15, g: 0.5, b: 0.2, a: 1}}
      ]
    }];
    s52.appendChild(statusCard);
    
    txt(s52, "You're Online", 50, 100, 22, C.white, "Bold");
    txt(s52, "Ready to accept orders", 50, 130, 14, C.white, "Regular");
    
    const toggleStatusBtn = figma.createRectangle();
    toggleStatusBtn.name = "ToggleOnlineStatus-CLICK";
    toggleStatusBtn.resize(80, 35);
    toggleStatusBtn.x = 250;
    toggleStatusBtn.y = 125;
    toggleStatusBtn.cornerRadius = 18;
    toggleStatusBtn.fills = [{type: 'SOLID', color: C.white, opacity: 0.3}];
    s52.appendChild(toggleStatusBtn);
    txt(s52, "Go Offline", 260, 134, 12, C.white, "Bold");
    
    // Today's earnings
    txt(s52, "Today's Earnings", 30, 210, 18, C.text, "Bold");
    
    const earningsCards = [
      {label: "Total Earnings", value: "Rs 2,450", icon: "💰"},
      {label: "Deliveries", value: "12", icon: "📦"},
      {label: "Tips", value: "Rs 340", icon: "🎁"}
    ];
    
    let earnX = 30;
    for (const earn of earningsCards) {
      const earnCard = figma.createRectangle();
      earnCard.resize(95, 90);
      earnCard.x = earnX;
      earnCard.y = 250;
      earnCard.cornerRadius = 12;
      earnCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s52.appendChild(earnCard);
      
      txt(s52, earn.icon, earnCard.x + 35, 265, 28, C.text, "Regular");
      txt(s52, earn.value, earnCard.x + 18, 300, 16, C.teal, "Bold");
      txt(s52, earn.label, earnCard.x + 12, 322, 11, C.gray, "Regular");
      
      earnX += 105;
    }
    
    txt(s52, "Available Orders", 30, 370, 18, C.text, "Bold");
    
    const availOrders = [
      {id: "#BK12346", restaurant: "The Food Hub", pickup: "Gulberg III", dropoff: "DHA Phase 5", distance: "3.2 km", fee: "Rs 180"},
      {id: "#BK12347", restaurant: "Quick Bites", pickup: "Model Town", dropoff: "Johar Town", distance: "2.8 km", fee: "Rs 160"}
    ];
    
    let availY = 410;
    for (const order of availOrders) {
      const orderCard = figma.createRectangle();
      orderCard.name = `AcceptOrder-${order.id}-CLICK`;
      orderCard.resize(315, 140);
      orderCard.x = 30;
      orderCard.y = availY;
      orderCard.cornerRadius = 16;
      orderCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s52.appendChild(orderCard);
      
      txt(s52, order.id, 45, availY + 18, 15, C.text, "Bold");
      txt(s52, order.restaurant, 45, availY + 43, 14, C.text, "Regular");
      
      txt(s52, "📍 Pickup:", 45, availY + 65, 12, C.gray, "Regular");
      txt(s52, order.pickup, 110, availY + 65, 12, C.text, "Regular");
      
      txt(s52, "📍 Drop:", 45, availY + 85, 12, C.gray, "Regular");
      txt(s52, order.dropoff, 110, availY + 85, 12, C.text, "Regular");
      
      txt(s52, `🚴 ${order.distance}`, 210, availY + 20, 12, C.teal, "Bold");
      txt(s52, order.fee, 245, availY + 75, 18, C.teal, "Bold");
      
      const acceptBtn = figma.createRectangle();
      acceptBtn.name = `Accept-${order.id}-CLICK`;
      acceptBtn.resize(120, 40);
      acceptBtn.x = 210;
      acceptBtn.y = availY + 95;
      acceptBtn.cornerRadius = 20;
      acceptBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
      s52.appendChild(acceptBtn);
      txt(s52, "Accept Order", 225, availY + 105, 13, C.white, "Bold");
      
      availY += 150;
    }
    
    targetPage.appendChild(s52);
    screens.push(s52);
    x += W + G;
    
    // ==========================================
// SCREEN 53: RIDER ORDER DETAILS
// ==========================================
// ==========================================
// SCREEN 53: RIDER ORDER DETAILS
// ==========================================
const s53 = figma.createFrame();
s53.name = "Rider-03-Order-Details";
s53.resize(W, H);
s53.x = x;
s53.y = y;
s53.fills = [{type: 'SOLID', color: C.white}];

header(s53, "Order Details", true, "BackToRiderDashboard-CLICK");

txt(s53, "Active Delivery", 30, 90, 20, C.text, "Bold");
txt(s53, "Order #BK12346", 230, 93, 14, C.teal, "Bold");

// Map placeholder - REPLACED WITH REAL MAP
await img(s53, 30, 140, 315, 250, "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600");

const navBtn = figma.createRectangle();
navBtn.name = "StartNavigation-CLICK";
navBtn.resize(120, 40);
navBtn.x = 127;
navBtn.y = 340;
navBtn.cornerRadius = 20;
navBtn.fills = [{type: 'SOLID', color: C.teal}];
s53.appendChild(navBtn);
txt(s53, "Start Navigation", 140, 350, 13, C.white, "Bold");

txt(s53, "Delivery Steps", 30, 420, 16, C.text, "Bold");

const deliverySteps = [
  {step: "1. Pickup from Restaurant", location: "The Food Hub, Gulberg III", status: "current"},
  {step: "2. Deliver to Customer", location: "House #123, DHA Phase 5", status: "pending"}
];

let stepY3 = 455;
for (const step of deliverySteps) {
  const stepCard = figma.createRectangle();
  stepCard.resize(315, 80);
  stepCard.x = 30;
  stepCard.y = stepY3;
  stepCard.cornerRadius = 12;
  //stepCard.fills = [{type: 'SOLID', color: step.status === "current" ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
  //stepCard.strokes = [{type: 'SOLID', color: step.status === "current" ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
  stepCard.strokeWeight = step.status === "current" ? 2 : 0;
  s53.appendChild(stepCard);
  
  txt(s53, step.step, 45, stepY3 + 18, 14, C.text, "Bold");
  txt(s53, step.location, 45, stepY3 + 43, 12, C.gray, "Regular");
  
  if (step.status === "current") {
    const arriveBtn = figma.createRectangle();
    arriveBtn.name = "MarkArrived-CLICK";
    arriveBtn.resize(100, 30);
    arriveBtn.x = 230;
    arriveBtn.y = stepY3 + 25;
    arriveBtn.cornerRadius = 15;
    arriveBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s53.appendChild(arriveBtn);
    txt(s53, "I've Arrived", 244, stepY3 + 32, 12, C.white, "Bold");
  }
  
  stepY3 += 90;
}

// Customer contact
const contactCard = figma.createRectangle();
contactCard.resize(315, 70);
contactCard.x = 30;
contactCard.y = 640;
contactCard.cornerRadius = 12;
contactCard.fills = [{type: 'SOLID', color: C.lightBg}];
s53.appendChild(contactCard);

txt(s53, "Customer: Ahmad Ali", 45, 658, 14, C.text, "Bold");
txt(s53, "+92 300 1234567", 45, 683, 12, C.gray, "Regular");

const callCustBtn = figma.createRectangle();
callCustBtn.name = "CallCustomer-CLICK";
callCustBtn.resize(40, 40);
callCustBtn.x = 250;
callCustBtn.y = 655;
callCustBtn.cornerRadius = 20;
callCustBtn.fills = [{type: 'SOLID', color: C.teal}];
s53.appendChild(callCustBtn);
txt(s53, "📞", 260, 663, 20, C.white, "Regular");

const chatCustBtn = figma.createRectangle();
chatCustBtn.name = "ChatCustomer-CLICK";
chatCustBtn.resize(40, 40);
chatCustBtn.x = 300;
chatCustBtn.y = 655;
chatCustBtn.cornerRadius = 20;
chatCustBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
s53.appendChild(chatCustBtn);
txt(s53, "💬", 310, 663, 20, C.white, "Regular");

btn(s53, "CompleteDelivery-CLICK", 30, 730, 315, 55, C.green, "Complete Delivery", 18);
txt(s53, "Complete Delivery", 100, 748, 18, C.white, "Bold");

targetPage.appendChild(s53);
screens.push(s53);
x += W + G;


    
    // ==========================================
    // SCREEN 54: RIDER EARNINGS
    // ==========================================
    const s54 = figma.createFrame();
    s54.name = "Rider-04-Earnings";
    s54.resize(W, H);
    s54.x = x;
    s54.y = y;
    s54.fills = [{type: 'SOLID', color: C.white}];
    
    header(s54, "Earnings", true, "BackToRiderDashboard-CLICK");
    
    txt(s54, "💰 Your Earnings", 30, 90, 22, C.text, "Bold");
    
    // Time filter
    const timeFilters2 = ["Today", "Week", "Month"];
    let tfX2 = 30;
    for (let i = 0; i < timeFilters2.length; i++) {
      const tfBtn = figma.createRectangle();
      tfBtn.name = `EarningsFilter-${timeFilters2[i]}-CLICK`;
      tfBtn.resize(100, 40);
      tfBtn.x = tfX2;
      tfBtn.y = 140;
      tfBtn.cornerRadius = 20;
      tfBtn.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s54.appendChild(tfBtn);
      
      txt(s54, timeFilters2[i], tfBtn.x + 25, 151, 14, i === 0 ? C.white : C.text, "Semi Bold");
      tfX2 += 110;
    }
    
    // Summary card
    const summaryCard = figma.createRectangle();
    summaryCard.resize(315, 140);
    summaryCard.x = 30;
    summaryCard.y = 200;
    summaryCard.cornerRadius = 16;
    summaryCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.24, g: 0.61, b: 0.61, a: 1}},
        {position: 1, color: {r: 0.17, g: 0.37, b: 0.37, a: 1}}
      ]
    }];
    s54.appendChild(summaryCard);
    
    txt(s54, "Total Earnings", 50, 220, 16, C.white, "Bold");
    txt(s54, "Rs 2,450", 50, 255, 36, C.white, "Bold");
    txt(s54, "12 deliveries completed", 50, 300, 13, C.white, "Regular");
    txt(s54, "Tips: Rs 340", 50, 320, 13, C.yellow, "Bold");
    
    txt(s54, "Delivery History", 30, 370, 18, C.text, "Bold");
    
    const deliveries = [
      {id: "#BK12346", time: "2:45 PM", distance: "3.2 km", earning: "Rs 180", tip: "Rs 50"},
      {id: "#BK12345", time: "1:30 PM", distance: "2.8 km", earning: "Rs 160", tip: "Rs 30"},
      {id: "#BK12344", time: "12:15 PM", distance: "4.5 km", earning: "Rs 220", tip: "Rs 0"}
    ];
    
    let delY2 = 410;
    for (const del of deliveries) {
      const delCard = figma.createRectangle();
      delCard.name = `Delivery-${del.id}-CLICK`;
      delCard.resize(315, 80);
      delCard.x = 30;
      delCard.y = delY;
      delCard.cornerRadius = 12;
      delCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s54.appendChild(delCard);
      
      txt(s54, del.id, 45, delY + 18, 15, C.text, "Bold");
      txt(s54, `${del.time} • ${del.distance}`, 45, delY + 43, 12, C.gray, "Regular");
      
      txt(s54, del.earning, 245, delY + 25, 16, C.teal, "Bold");
      if (del.tip !== "Rs 0") {
        txt(s54, `+${del.tip} tip`, 245, delY + 50, 11, C.green, "Bold");
      }
      
      delY += 90;
    }
    
    const requestPayoutBtn = figma.createRectangle();
    requestPayoutBtn.name = "RequestPayout-CLICK";
    requestPayoutBtn.resize(315, 55);
    requestPayoutBtn.x = 30;
    requestPayoutBtn.y = 720;
    requestPayoutBtn.cornerRadius = 28;
    requestPayoutBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s54.appendChild(requestPayoutBtn);
    txt(s54, "Request Payout", 110, 738, 18, C.white, "Bold");
    
    targetPage.appendChild(s54);
    screens.push(s54);
    x += W + G;
    
    // ==========================================
    // SCREEN 55: RIDER CHAT (NEW!)
    // ==========================================
    const s55 = figma.createFrame();
    s55.name = "Rider-05-Chat-Support";
    s55.resize(W, H);
    s55.x = x;
    s55.y = y;
    s55.fills = [{type: 'SOLID', color: C.white}];
    
    header(s55, "Customer Chat", true, "BackToOrderDetails-CLICK");
    
    txt(s55, "Order #BK12346", 30, 90, 16, C.text, "Bold");
    txt(s55, "With: Ahmad Ali", 30, 115, 13, C.gray, "Regular");
    
    // Chat messages
    const riderChatY = 160;
    
    // Customer message
    const custMsgBg2 = figma.createRectangle();
    custMsgBg2.resize(250, 60);
    custMsgBg2.x = 30;
    custMsgBg2.y = riderChatY;
    custMsgBg2.cornerRadius = 16;
    custMsgBg2.fills = [{type: 'SOLID', color: C.lightBg}];
    s55.appendChild(custMsgBg2);
    txt(s55, "Can you please hurry?", 45, riderChatY + 12, 13, C.text, "Regular");
    txt(s55, "I'm waiting at gate 3", 45, riderChatY + 32, 13, C.text, "Regular");
    txt(s55, "2:45 PM", 240, riderChatY + 45, 10, C.gray, "Regular");
    
    // Rider message (right aligned)
    const riderMsgBg2 = figma.createRectangle();
    riderMsgBg2.resize(220, 50);
    riderMsgBg2.x = 125;
    riderMsgBg2.y = riderChatY + 80;
    riderMsgBg2.cornerRadius = 16;
    riderMsgBg2.fills = [{type: 'SOLID', color: C.teal}];
    s55.appendChild(riderMsgBg2);
    txt(s55, "I'm 5 minutes away!", 140, riderChatY + 92, 13, C.white, "Regular");
    txt(s55, "Will call when I arrive", 140, riderChatY + 112, 11, C.white, "Regular");
    txt(s55, "2:47 PM", 295, riderChatY + 115, 10, {r: 0.9, g: 0.9, b: 0.9}, "Regular");
    
    // Another customer message
    const custMsg2Bg2 = figma.createRectangle();
    custMsg2Bg2.resize(180, 40);
    custMsg2Bg2.x = 30;
    custMsg2Bg2.y = riderChatY + 150;
    custMsg2Bg2.cornerRadius = 16;
    custMsg2Bg2.fills = [{type: 'SOLID', color: C.lightBg}];
    s55.appendChild(custMsg2Bg2);
    txt(s55, "Okay, thank you! 👍", 45, riderChatY + 162, 13, C.text, "Regular");
    txt(s55, "2:48 PM", 165, riderChatY + 180, 10, C.gray, "Regular");
    
    // Rider reply
    const riderMsg2Bg = figma.createRectangle();
    riderMsg2Bg.resize(200, 40);
    riderMsg2Bg.x = 145;
    riderMsg2Bg.y = riderChatY + 210;
    riderMsg2Bg.cornerRadius = 16;
    riderMsg2Bg.fills = [{type: 'SOLID', color: C.teal}];
    s55.appendChild(riderMsg2Bg);
    txt(s55, "Almost there! 🚴", 160, riderChatY + 222, 13, C.white, "Regular");
    txt(s55, "2:50 PM", 295, riderChatY + 240, 10, {r: 0.9, g: 0.9, b: 0.9}, "Regular");
    
    // Quick reply buttons
    txt(s55, "Quick Replies", 30, 450, 16, C.text, "Bold");
    
    const riderQuickReplies = ["I'm on my way", "5 min away", "I'm here", "Call you"];
    let qrY2 = 490;
    for (let i = 0; i < riderQuickReplies.length; i++) {
      const qrBtn = figma.createRectangle();
      qrBtn.name = `QuickReply-${riderQuickReplies[i].replace(/ /g,'')}-CLICK`;
      qrBtn.resize(150, 45);
      qrBtn.x = 30 + (i % 2) * 165;
      qrBtn.y = qrY2 + Math.floor(i / 2) * 55;
      qrBtn.cornerRadius = 22;
      qrBtn.fills = [{type: 'SOLID', color: C.lightBg}];
      s55.appendChild(qrBtn);
      
      txt(s55, riderQuickReplies[i], qrBtn.x + 20, qrBtn.y + 15, 13, C.text, "Regular");
    }
    
    // Message input
    const riderMsgInputBg = figma.createRectangle();
    riderMsgInputBg.resize(260, 50);
    riderMsgInputBg.x = 30;
    riderMsgInputBg.y = 720;
    riderMsgInputBg.cornerRadius = 25;
    riderMsgInputBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s55.appendChild(riderMsgInputBg);
    txt(s55, "Type a message...", 50, 735, 14, C.gray, "Regular");
    
    const riderSendBtn = figma.createRectangle();
    riderSendBtn.name = "SendRiderMessage-CLICK";
    riderSendBtn.resize(50, 50);
    riderSendBtn.x = 295;
    riderSendBtn.y = 720;
    riderSendBtn.cornerRadius = 25;
    riderSendBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s55.appendChild(riderSendBtn);
    txt(s55, "➤", 313, 728, 20, C.white, "Bold");
    
    targetPage.appendChild(s55);
    screens.push(s55);
    x += W + G;
    
    // ==========================================
    // SCREEN 56: RIDER PROFILE
    // ==========================================
    const s56 = figma.createFrame();
    s56.name = "Rider-06-Profile";
    s56.resize(W, H);
    s56.x = x;
    s56.y = y;
    s56.fills = [{type: 'SOLID', color: C.white}];
    
    header(s56, "Rider Profile", true, "BackToRiderDashboard-CLICK");
    
    // Profile header
    const riderProfileCard = figma.createRectangle();
    riderProfileCard.resize(315, 120);
    riderProfileCard.x = 30;
    riderProfileCard.y = 80;
    riderProfileCard.cornerRadius = 16;
    riderProfileCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.24, g: 0.61, b: 0.61, a: 1}},
        {position: 1, color: {r: 0.17, g: 0.37, b: 0.37, a: 1}}
      ]
    }];
    s56.appendChild(riderProfileCard);
    
    const riderProfilePic = figma.createEllipse();
    riderProfilePic.resize(70, 70);
    riderProfilePic.x = 50;
    riderProfilePic.y = 105;
    riderProfilePic.fills = [{type: 'SOLID', color: C.white}];
    s56.appendChild(riderProfilePic);
    txt(s56, "🚴", 68, 123, 32, C.teal, "Regular");
    
    txt(s56, "Bilal Ahmed", 140, 110, 20, C.white, "Bold");
    txt(s56, "⭐ 4.8 Rating", 140, 138, 13, C.yellow, "Bold");
    txt(s56, "🏍️ ABC-123", 140, 158, 12, C.white, "Regular");
    
    // Stats
    txt(s56, "Performance Stats", 30, 230, 18, C.text, "Bold");
    
    const riderStats = [
      {label: "Total Deliveries", value: "342", icon: "📦"},
      {label: "On-Time Rate", value: "95%", icon: "⏱️"},
      {label: "Total Earned", value: "Rs 45,230", icon: "💰"}
    ];
    
    let statX2 = 30;
    for (const stat of riderStats) {
      const statCard = figma.createRectangle();
      statCard.resize(95, 90);
      statCard.x = statX2;
      statCard.y = 270;
      statCard.cornerRadius = 12;
      statCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s56.appendChild(statCard);
      
      txt(s56, stat.icon, statCard.x + 35, 285, 28, C.text, "Regular");
      txt(s56, stat.value, statCard.x + 18, 320, 16, C.teal, "Bold");
      txt(s56, stat.label, statCard.x + 8, 342, 10, C.gray, "Regular");
      
      statX2 += 105;
    }
    
    txt(s56, "Vehicle Details", 30, 390, 16, C.text, "Bold");
    
    const vehicleCard = figma.createRectangle();
    vehicleCard.resize(315, 80);
    vehicleCard.x = 30;
    vehicleCard.y = 420;
    vehicleCard.cornerRadius = 12;
    vehicleCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s56.appendChild(vehicleCard);
    
    txt(s56, "🏍️ Motorcycle", 45, 438, 16, C.text, "Bold");
    txt(s56, "Plate: ABC-123", 45, 463, 13, C.gray, "Regular");
    txt(s56, "Model: Honda 125", 45, 483, 13, C.gray, "Regular");
    
    const editVehicleBtn = figma.createText();
    editVehicleBtn.name = "EditVehicle-CLICK";
    editVehicleBtn.fontName = { family: "Inter", style: "Bold" };
    editVehicleBtn.characters = "Edit";
    editVehicleBtn.fontSize = 13;
    editVehicleBtn.fills = [{type: 'SOLID', color: C.teal}];
    editVehicleBtn.x = 295;
    editVehicleBtn.y = 465;
    s56.appendChild(editVehicleBtn);
    
    txt(s56, "Documents", 30, 530, 16, C.text, "Bold");
    
    const documents = ["Driving License", "Vehicle Registration", "CNIC"];
    let docY = 565;
    for (const doc of documents) {
      const docCard = figma.createRectangle();
      docCard.name = `Document-${doc.replace(/ /g,'')}-CLICK`;
      docCard.resize(315, 55);
      docCard.x = 30;
      docCard.y = docY;
      docCard.cornerRadius = 12;
      docCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s56.appendChild(docCard);
      
      txt(s56, "📄", 50, docY + 15, 24, C.text, "Regular");
      txt(s56, doc, 90, docY + 20, 15, C.text, "Regular");
      
      const verifiedBadge = figma.createRectangle();
      verifiedBadge.resize(70, 22);
      verifiedBadge.x = 260;
      verifiedBadge.y = docY + 17;
      verifiedBadge.cornerRadius = 11;
      verifiedBadge.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
      s56.appendChild(verifiedBadge);
      txt(s56, "Verified ✓", 267, docY + 21, 10, C.green, "Bold");
      
      docY += 63;
    }
    
    targetPage.appendChild(s56);
    screens.push(s56);
    x += W + G;
    
    // ==========================================
    // SCREEN 57-60: ADMIN SCREENS (NEW!)
    // ==========================================
    
    // ADMIN SCREEN 1: TRANSACTIONS DASHBOARD
        // ==========================================
    // START ADMIN ROW (ROW 3)
    // ==========================================
    x = 0;  // ✅ Reset to left
    y = (H + ROW_GAP) * 2;  // ✅ Move down to third row
    
    // ==========================================
    // ADMIN SCREEN 1: TRANSACTIONS DASHBOARD
    // ==========================================
    const s57 = figma.createFrame();

    s57.name = "Admin-01-Transactions";
    s57.resize(W, H);
    s57.x = x;
    s57.y = y;
    s57.fills = [{type: 'SOLID', color: C.white}];
    
    header(s57, "Transactions", true, "BackToAdminHome-CLICK");
    
    txt(s57, "💰 All Transactions", 90, 90, 20, C.text, "Bold");
    
    // Stats cards
    const adminStatsCards = [
      {label: "Today's Revenue", value: "$4,582", color: C.teal},
      {label: "Total Orders", value: "347", color: C.yellow},
      {label: "Pending", value: "23", color: C.red}
    ];
    
    let adminStatX = 30;
    for (const stat of adminStatsCards) {
      const statCard = figma.createRectangle();
      statCard.resize(100, 80);
      statCard.x = adminStatX;
      statCard.y = 140;
      statCard.cornerRadius = 16;
      statCard.fills = [{type: 'SOLID', color: stat.color, opacity: 0.15}];
      s57.appendChild(statCard);
      
      txt(s57, stat.value, statCard.x + 20, 158, 20, stat.color, "Bold");
      txt(s57, stat.label, statCard.x + 10, 190, 11, C.text, "Regular");
      
      adminStatX += 110;
    }
    
    txt(s57, "Recent Transactions", 30, 250, 16, C.text, "Bold");
    
    const adminTransactions = [
      {id: "#12345", amount: "$45.97", status: "Completed", time: "2:45 PM"},
      {id: "#12344", amount: "$32.50", status: "Completed", time: "2:30 PM"},
      {id: "#12343", amount: "$58.20", status: "Refunded", time: "2:15 PM"},
      {id: "#12342", amount: "$25.00", status: "Completed", time: "2:00 PM"},
      {id: "#12341", amount: "$67.80", status: "Pending", time: "1:45 PM"}
    ];
    
    let adminTransY = 290;
    for (const trans of adminTransactions) {
      const transCard = figma.createRectangle();
      transCard.name = `AdminTransaction-${trans.id}-CLICK`;
      transCard.resize(315, 70);
      transCard.x = 30;
      transCard.y = adminTransY;
      transCard.cornerRadius = 12;
      transCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s57.appendChild(transCard);
      
      txt(s57, trans.id, 45, adminTransY + 12, 14, C.text, "Bold");
      txt(s57, trans.time, 45, adminTransY + 35, 11, C.gray, "Regular");
      
      txt(s57, trans.amount, 200, adminTransY + 15, 16, C.teal, "Bold");
      
      const statusColor = trans.status === "Completed" ? C.green : 
                          trans.status === "Refunded" ? C.red : C.yellow;
      const adminStatusBadge = figma.createRectangle();
      adminStatusBadge.resize(75, 22);
      adminStatusBadge.x = 200;
      adminStatusBadge.y = adminTransY + 42;
      adminStatusBadge.cornerRadius = 11;
      adminStatusBadge.fills = [{type: 'SOLID', color: statusColor, opacity: 0.2}];
      s57.appendChild(adminStatusBadge);
      txt(s57, trans.status, 210, adminTransY + 46, 10, statusColor, "Bold");
      
      adminTransY += 80;
    }
    
    btn(s57, "ExportTransactions-CLICK", 30, 720, 315, 50, C.yellow, "Export to Excel", 16);
    txt(s57, "Export to Excel", 110, 737, 16, C.white, "Bold");
    
    targetPage.appendChild(s57);
    screens.push(s57);
    x += W + G;
    
    figma.notify(`✅ Chunk 6/9 Complete - Screens 51-57 created (Rider App + Admin Start)`);
    // ==========================================
    // SCREEN 58: ADMIN ANALYTICS DASHBOARD
    // ==========================================
    const s58 = figma.createFrame();
    s58.name = "Admin-02-Analytics";
    s58.resize(W, H);
    s58.x = x;
    s58.y = y;
    s58.fills = [{type: 'SOLID', color: C.white}];
    
    header(s58, "Analytics", true, "BackToAdminHome-CLICK");
    
    txt(s58, "📊 Platform Analytics", 80, 90, 20, C.text, "Bold");
    
    // Time filter
    const adminTimeFilters = ["Today", "Week", "Month", "Year"];
    let adminTfX = 30;
    for (let i = 0; i < adminTimeFilters.length; i++) {
      const tfBtn = figma.createRectangle();
      tfBtn.name = `AdminTimeFilter-${adminTimeFilters[i]}-CLICK`;
      tfBtn.resize(70, 35);
      tfBtn.x = adminTfX;
      tfBtn.y = 140;
      tfBtn.cornerRadius = 18;
      tfBtn.fills = [{type: 'SOLID', color: i === 2 ? C.teal : C.lightBg}];
      s58.appendChild(tfBtn);
      
      txt(s58, adminTimeFilters[i], tfBtn.x + 15, 149, 12, i === 2 ? C.white : C.text, "Semi Bold");
      adminTfX += 80;
    }
    
    // Chart placeholder
    const adminChartBg = figma.createRectangle();
    adminChartBg.resize(315, 180);
    adminChartBg.x = 30;
    adminChartBg.y = 200;
    adminChartBg.cornerRadius = 16;
    adminChartBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s58.appendChild(adminChartBg);
    txt(s58, "📈 Revenue Trend", 115, 280, 16, C.text, "Bold");
    txt(s58, "$45,230 this month", 105, 305, 14, C.teal, "Bold");
    
    // Key metrics
    txt(s58, "Key Metrics", 30, 410, 16, C.text, "Bold");
    
    const adminMetrics = [
      {label: "Total Users", value: "12,458", icon: "👥"},
      {label: "Active Riders", value: "342", icon: "🚴"},
      {label: "Restaurants", value: "856", icon: "🍽️"},
      {label: "Avg Order Value", value: "$32.50", icon: "💵"}
    ];
    
    let adminMetricY = 450;
    for (let i = 0; i < adminMetrics.length; i++) {
      const metric = adminMetrics[i];
      const metricCard = figma.createRectangle();
      metricCard.resize(150, 70);
      metricCard.x = 30 + (i % 2) * 165;
      metricCard.y = adminMetricY + Math.floor(i / 2) * 80;
      metricCard.cornerRadius = 12;
      metricCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s58.appendChild(metricCard);
      
      txt(s58, metric.icon, metricCard.x + 15, metricCard.y + 15, 24, C.text, "Regular");
      txt(s58, metric.value, metricCard.x + 55, metricCard.y + 18, 18, C.teal, "Bold");
      txt(s58, metric.label, metricCard.x + 15, metricCard.y + 48, 11, C.gray, "Regular");
    }
    
    btn(s58, "AdminFullReport-CLICK", 30, 720, 315, 50, C.yellow, "View Full Report", 16);
    txt(s58, "View Full Report", 105, 737, 16, C.white, "Bold");
    
    targetPage.appendChild(s58);
    screens.push(s58);
    x += W + G;
    
    // ==========================================
    // SCREEN 59: ADMIN USER MANAGEMENT
    // ==========================================
    const s59 = figma.createFrame();
    s59.name = "Admin-03-User-Management";
    s59.resize(W, H);
    s59.x = x;
    s59.y = y;
    s59.fills = [{type: 'SOLID', color: C.white}];
    
    header(s59, "User Management", true, "BackToAdminHome-CLICK");
    
    txt(s59, "👥 Manage Users", 95, 90, 20, C.text, "Bold");
    
    // Search bar
    const adminUserSearchBar = figma.createRectangle();
    adminUserSearchBar.name = "AdminSearchUsers";
    adminUserSearchBar.resize(315, 45);
    adminUserSearchBar.x = 30;
    adminUserSearchBar.y = 140;
    adminUserSearchBar.cornerRadius = 22;
    adminUserSearchBar.fills = [{type: 'SOLID', color: C.lightBg}];
    s59.appendChild(adminUserSearchBar);
    txt(s59, "🔍 Search users...", 50, 151, 14, C.gray, "Regular");
    
    // Filter tabs
    const adminUserTabs = ["All (12,458)", "Customers", "Riders", "Restaurants"];
    let adminTabX = 30;
    for (let i = 0; i < adminUserTabs.length; i++) {
      const tabBtn = figma.createRectangle();
      tabBtn.name = `AdminUserTab-${adminUserTabs[i].split(' ')[0]}-CLICK`;
      tabBtn.resize(80, 35);
      tabBtn.x = adminTabX;
      tabBtn.y = 210;
      tabBtn.cornerRadius = 18;
      tabBtn.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s59.appendChild(tabBtn);
      
      const tabText = adminUserTabs[i].length > 10 ? adminUserTabs[i].substring(0, 8) + "..." : adminUserTabs[i];
      txt(s59, tabText, tabBtn.x + 10, 219, 10, i === 0 ? C.white : C.text, "Semi Bold");
      adminTabX += 85;
    }
    
    txt(s59, "Recent Users", 30, 270, 16, C.text, "Bold");
    
    const adminUsers = [
      {name: "Ahmad Ali", type: "Customer", status: "Active", joined: "Nov 14"},
      {name: "Sara Khan", type: "Customer", status: "Active", joined: "Nov 14"},
      {name: "Food Hub", type: "Restaurant", status: "Active", joined: "Nov 13"},
      {name: "Bilal Rider", type: "Rider", status: "Busy", joined: "Nov 12"},
      {name: "Zainab Ahmed", type: "Customer", status: "Suspended", joined: "Nov 10"}
    ];
    
    let adminUserY = 310;
    for (const user of adminUsers) {
      const userCard = figma.createRectangle();
      userCard.name = `AdminUser-${user.name.replace(/ /g,'')}-CLICK`;
      userCard.resize(315, 75);
      userCard.x = 30;
      userCard.y = adminUserY;
      userCard.cornerRadius = 12;
      userCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s59.appendChild(userCard);
      
      // Avatar
      const adminAvatar = figma.createEllipse();
      adminAvatar.resize(45, 45);
      adminAvatar.x = 45;
      adminAvatar.y = adminUserY + 15;
      adminAvatar.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
      s59.appendChild(adminAvatar);
      txt(s59, user.name.charAt(0), 62, adminUserY + 28, 18, C.teal, "Bold");
      
      txt(s59, user.name, 105, adminUserY + 15, 14, C.text, "Bold");
      txt(s59, `${user.type} • ${user.joined}`, 105, adminUserY + 38, 11, C.gray, "Regular");
      
      const adminUserStatusColor = user.status === "Active" ? C.green : 
                          user.status === "Busy" ? C.yellow : C.red;
      const adminUserStatusBadge = figma.createRectangle();
      adminUserStatusBadge.resize(70, 22);
      adminUserStatusBadge.x = 260;
      adminUserStatusBadge.y = adminUserY + 27;
      adminUserStatusBadge.cornerRadius = 11;
      adminUserStatusBadge.fills = [{type: 'SOLID', color: adminUserStatusColor, opacity: 0.2}];
      s59.appendChild(adminUserStatusBadge);
      txt(s59, user.status, 270, adminUserY + 31, 10, adminUserStatusColor, "Bold");
      
      adminUserY += 85;
    }
    
    btn(s59, "AdminExportUserList-CLICK", 30, 720, 150, 50, C.teal, "Export List", 14);
    txt(s59, "Export List", 65, 737, 14, C.white, "Bold");
    
    btn(s59, "AdminAddNewUser-CLICK", 195, 720, 150, 50, C.yellow, "+ Add User", 14);
    txt(s59, "+ Add User", 233, 737, 14, C.white, "Bold");
    
    targetPage.appendChild(s59);
    screens.push(s59);
    x += W + G;
    
    // ==========================================
    // SCREEN 60: PICKUP/TAKEAWAY
    // ==========================================
 // ==========================================
// RETURN TO CUSTOMER ROW (Continue Row 1)
// ==========================================
// Calculate x position after screen 50
x = (50 * (W + G));  // Position after 50 screens
y = 0;  // Back to first row

// ==========================================
// SCREEN 60: PICKUP/TAKEAWAY
// ==========================================
const s60 = figma.createFrame();

    s60.name = "60-Pickup-Takeaway-Order";
    s60.resize(W, H);
    s60.x = x;
    s60.y = y;
    s60.fills = [{type: 'SOLID', color: C.white}];
    
    header(s60, "Pickup Order", true, "BackToRestaurant-CLICK");
    
    txt(s60, "🏪 Self Pickup", 30, 90, 24, C.text, "Bold");
    txt(s60, "The Food Hub", 30, 125, 16, C.gray, "Regular");
    
    const pickupInfoCard = figma.createRectangle();
    pickupInfoCard.resize(315, 100);
    pickupInfoCard.x = 30;
    pickupInfoCard.y = 160;
    pickupInfoCard.cornerRadius = 16;
    pickupInfoCard.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s60.appendChild(pickupInfoCard);
    
    txt(s60, "✓ Save Delivery Fee", 45, 180, 15, C.teal, "Bold");
    txt(s60, "Pick up your order directly from", 45, 205, 13, C.gray, "Regular");
    txt(s60, "the restaurant and save money!", 45, 223, 13, C.gray, "Regular");
    txt(s60, "Ready in: 20 minutes", 45, 243, 13, C.text, "Bold");
    
    txt(s60, "Restaurant Location", 30, 290, 16, C.text, "Bold");
    
    const locationCard = figma.createRectangle();
    locationCard.resize(315, 90);
    locationCard.x = 30;
    locationCard.y = 320;
    locationCard.cornerRadius = 12;
    locationCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s60.appendChild(locationCard);
    
    txt(s60, "📍 The Food Hub", 45, 340, 15, C.text, "Bold");
    txt(s60, "123 Main Boulevard, Gulberg III", 45, 365, 12, C.gray, "Regular");
    txt(s60, "Lahore, Pakistan", 45, 383, 12, C.gray, "Regular");
    
    const getDirectionsBtn = figma.createRectangle();
    getDirectionsBtn.name = "GetDirections-CLICK";
    getDirectionsBtn.resize(100, 35);
    getDirectionsBtn.x = 230;
    getDirectionsBtn.y = 360;
    getDirectionsBtn.cornerRadius = 18;
    getDirectionsBtn.fills = [{type: 'SOLID', color: C.teal}];
    s60.appendChild(getDirectionsBtn);
    txt(s60, "Directions", 248, 370, 12, C.white, "Bold");
    
    txt(s60, "Contact Restaurant", 30, 440, 16, C.text, "Bold");
    
    const contactRestCard = figma.createRectangle();
    contactRestCard.resize(315, 60);
    contactRestCard.x = 30;
    contactRestCard.y = 470;
    contactRestCard.cornerRadius = 12;
    contactRestCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s60.appendChild(contactRestCard);
    
    txt(s60, "📞 +92 42 1234567", 45, 490, 14, C.text, "Bold");
    
    const callRestBtn = figma.createRectangle();
    callRestBtn.name = "CallRestaurant-CLICK";
    callRestBtn.resize(40,40);
    callRestBtn.x = 280;
    callRestBtn.y = 480;
    callRestBtn.cornerRadius = 20;
    callRestBtn.fills = [{type: 'SOLID', color: C.teal}];
    s60.appendChild(callRestBtn);
    txt(s60, "📞", 290, 488, 20, C.white, "Regular");
    
    txt(s60, "Order Summary", 30, 560, 16, C.text, "Bold");
    
    const pickupSummary = figma.createRectangle();
    pickupSummary.resize(315, 100);
    pickupSummary.x = 30;
    pickupSummary.y = 590;
    pickupSummary.cornerRadius = 12;
    pickupSummary.fills = [{type: 'SOLID', color: C.lightBg}];
    s60.appendChild(pickupSummary);
    
    txt(s60, "Item Total", 45, 605, 13, C.gray, "Regular");
    txt(s60, "Rs 2,247", 270, 605, 13, C.text, "Regular");
    txt(s60, "Delivery Fee", 45, 630, 13, C.gray, "Regular");
    txt(s60, "Rs 0", 283, 630, 13, C.green, "Bold");
    txt(s60, "Tax", 45, 655, 13, C.gray, "Regular");
    txt(s60, "Rs 112", 275, 655, 13, C.text, "Regular");
    
    const divider10 = figma.createLine();
    divider10.resize(275, 0);
    divider10.x = 45;
    divider10.y = 675;
    divider10.strokes = [{type: 'SOLID', color: C.gray}];
    divider10.strokeWeight = 1;
    s60.appendChild(divider10);
    
    txt(s60, "Total", 45, 682, 15, C.text, "Bold");
    txt(s60, "Rs 2,359", 255, 682, 16, C.teal, "Bold");
    
    btn(s60, "PlacePickupOrder-CLICK", 30, 720, 315, 55, C.yellow, "Place Pickup Order", 18); // YELLOW
    txt(s60, "Place Pickup Order", 95, 738, 18, C.white, "Bold");
    
    targetPage.appendChild(s60);
    screens.push(s60);
    x += W + G;
    
    // ==========================================
    // SCREEN 61: PROMO CODE LIST
    // ==========================================
    const s61 = figma.createFrame();
    s61.name = "61-Promo-Code-List";
    s61.resize(W, H);
    s61.x = x;
    s61.y = y;
    s61.fills = [{type: 'SOLID', color: C.white}];
    
    header(s61, "Promo Codes", true, "BackToCheckout-CLICK");
    
    txt(s61, "🎟️ Available Codes", 30, 90, 22, C.text, "Bold");
    
    const promoSearchBar = figma.createRectangle();
    promoSearchBar.name = "SearchPromo";
    promoSearchBar.resize(315, 45);
    promoSearchBar.x = 30;
    promoSearchBar.y = 140;
    promoSearchBar.cornerRadius = 22;
    promoSearchBar.fills = [{type: 'SOLID', color: C.lightBg}];
    s61.appendChild(promoSearchBar);
    txt(s61, "🔍 Enter promo code", 50, 151, 14, C.gray, "Regular");
    
    txt(s61, "Your Codes", 30, 210, 16, C.text, "Bold");
    
    const promoCodes = [
      {code: "SAVE20", title: "20% OFF", desc: "On orders above Rs 1,000", expiry: "Valid till Nov 30", color: C.red},
      {code: "FREEDEL", title: "Free Delivery", desc: "On your next 3 orders", expiry: "Valid till Nov 25", color: C.green},
      {code: "BOGO1", title: "Buy 1 Get 1", desc: "Selected restaurants only", expiry: "Valid till Nov 20", color: C.yellow},
      {code: "FIRST100", title: "Rs 100 OFF", desc: "First time user special", expiry: "Valid till Dec 15", color: C.teal}
    ];
    
    let promoY = 250;
    for (const promo of promoCodes) {
      const promoCard = figma.createRectangle();
      promoCard.name = `PromoCode-${promo.code}-CLICK`;
      promoCard.resize(315, 100);
      promoCard.x = 30;
      promoCard.y = promoY;
      promoCard.cornerRadius = 16;
      promoCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s61.appendChild(promoCard);
      
      const colorBar = figma.createRectangle();
      colorBar.resize(8, 100);
      colorBar.x = 30;
      colorBar.y = promoY;
      colorBar.fills = [{type: 'SOLID', color: promo.color}];
      s61.appendChild(colorBar);
      
      txt(s61, promo.title, 55, promoY + 18, 18, C.text, "Bold");
      txt(s61, promo.desc, 55, promoY + 43, 13, C.gray, "Regular");
      txt(s61, promo.expiry, 55, promoY + 65, 11, C.gray, "Regular");
      
      const promoCodeBox = figma.createRectangle();
      promoCodeBox.resize(85, 28);
      promoCodeBox.x = 245;
      promoCodeBox.y = promoY + 36;
      promoCodeBox.cornerRadius = 14;
      promoCodeBox.fills = [{type: 'SOLID', color: promo.color, opacity: 0.2}];
      promoCodeBox.strokes = [{type: 'SOLID', color: promo.color}];
      promoCodeBox.strokeWeight = 1;
      promoCodeBox.dashPattern = [4, 4];
      s61.appendChild(promoCodeBox);
      txt(s61, promo.code, 255, promoY + 42, 11, promo.color, "Bold");
      
      promoY += 110;
    }
    
    targetPage.appendChild(s61);
    screens.push(s61);
    x += W + G;
    
    // ==========================================
    // SCREEN 62: CANCEL ORDER
    // ==========================================
    const s62 = figma.createFrame();
    s62.name = "62-Cancel-Order";
    s62.resize(W, H);
    s62.x = x;
    s62.y = y;
    s62.fills = [{type: 'SOLID', color: C.white}];
    
    header(s62, "Cancel Order", true, "BackToOrderTracking-CLICK");
    
    txt(s62, "❌ Cancel Order?", 30, 100, 24, C.text, "Bold");
    txt(s62, "Order #BK12345", 30, 135, 14, C.gray, "Regular");
    
    const cancelWarning = figma.createRectangle();
    cancelWarning.resize(315, 80);
    cancelWarning.x = 30;
    cancelWarning.y = 170;
    cancelWarning.cornerRadius = 12;
    cancelWarning.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.95}}];
    s62.appendChild(cancelWarning);
    
    txt(s62, "⚠️ Cancellation Policy", 45, 185, 14, C.red, "Bold");
    txt(s62, "• Free cancellation within 5 minutes", 45, 210, 12, C.gray, "Regular");
    txt(s62, "• 50% refund after 5 minutes", 45, 228, 12, C.gray, "Regular");
    
    txt(s62, "Why are you canceling?", 30, 280, 16, C.text, "Bold");
    
    const cancelReasons = [
      "Changed my mind",
      "Ordered by mistake",
      "Taking too long",
      "Restaurant closed",
      "Want to modify order",
      "Other reason"
    ];
    
    let reasonY = 320;
    for (let i = 0; i < cancelReasons.length; i++) {
      const reasonCard = figma.createRectangle();
      reasonCard.name = `CancelReason-${cancelReasons[i].replace(/ /g,'')}-CLICK`;
      reasonCard.resize(315, 50);
      reasonCard.x = 30;
      reasonCard.y = reasonY;
      reasonCard.cornerRadius = 12;
      //reasonCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.91, g: 0.29, b: 0.24, a: 0.1} : C.lightBg}];
      //reasonCard.strokes = [{type: 'SOLID', color: i === 0 ? C.red : {r: 0, g: 0, b: 0, a: 0}}];
      reasonCard.strokeWeight = i === 0 ? 2 : 0;
      s62.appendChild(reasonCard);
      
      const radioCircle = figma.createEllipse();
      radioCircle.resize(20, 20);
      radioCircle.x = 45;
      radioCircle.y = reasonY + 15;
      radioCircle.fills = [{type: 'SOLID', color: i === 0 ? C.red : C.white}];
      radioCircle.strokes = [{type: 'SOLID', color: C.gray}];
      radioCircle.strokeWeight = 2;
      s62.appendChild(radioCircle);
      
      if (i === 0) {
        const selectedDot = figma.createEllipse();
        selectedDot.resize(10, 10);
        selectedDot.x = 50;
        selectedDot.y = reasonY + 20;
        selectedDot.fills = [{type: 'SOLID', color: C.white}];
        s62.appendChild(selectedDot);
      }
      
      txt(s62, cancelReasons[i], 80, reasonY + 18, 14, C.text, "Regular");
      
      reasonY += 58;
    }
    
    btn(s62, "ConfirmCancellation-CLICK", 30, 700, 150, 50, C.red, "Cancel Order", 16);
    txt(s62, "Cancel Order", 55, 717, 16, C.white, "Bold");
    
    btn(s62, "KeepOrder-CLICK", 195, 700, 150, 50, C.lightBg, "Keep Order", 16);
    txt(s62, "Keep Order", 235, 717, 16, C.text, "Bold");
    
    targetPage.appendChild(s62);
    screens.push(s62);
    x += W + G;
    
    // ==========================================
    // SCREEN 63: REFUND REQUEST
    // ==========================================
    const s63 = figma.createFrame();
    s63.name = "63-Refund-Request";
    s63.resize(W, H);
    s63.x = x;
    s63.y = y;
    s63.fills = [{type: 'SOLID', color: C.white}];
    
    header(s63, "Request Refund", true, "BackToOrderDetails-CLICK");
    
    txt(s63, "💰 Refund Request", 30, 90, 22, C.text, "Bold");
    txt(s63, "Order #BK12345", 30, 125, 14, C.gray, "Regular");
    
    txt(s63, "Issue Type", 30, 170, 16, C.text, "Bold");
    
    const issueTypes = [
      {label: "Wrong item delivered", icon: "📦"},
      {label: "Missing items", icon: "❌"},
      {label: "Food quality issue", icon: "🍔"},
      {label: "Order never arrived", icon: "🚫"},
      {label: "Other issue", icon: "❓"}
    ];
    
    let issueY = 210;
    for (let i = 0; i < issueTypes.length; i++) {
      const issueCard = figma.createRectangle();
      issueCard.name = `IssueType-${issueTypes[i].label.replace(/ /g,'')}-CLICK`;
      issueCard.resize(315, 55);
      issueCard.x = 30;
      issueCard.y = issueY;
      issueCard.cornerRadius = 12;
      //issueCard.fills = [{type: 'SOLID', color: i === 0 ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      //issueCard.strokes = [{type: 'SOLID', color: i === 0 ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
      issueCard.strokeWeight = i === 0 ? 2 : 0;
      s63.appendChild(issueCard);
      
      txt(s63, issueTypes[i].icon, 50, issueY + 15, 24, C.text, "Regular");
      txt(s63, issueTypes[i].label, 90, issueY + 20, 14, C.text, "Regular");
      
      issueY += 63;
    }
    
    txt(s63, "Describe Issue", 30, 550, 14, C.text, "Semi Bold");
    const issueDesc = figma.createRectangle();
    issueDesc.name = "IssueDescription";
    issueDesc.resize(315, 80);
    issueDesc.x = 30;
    issueDesc.y = 575;
    issueDesc.cornerRadius = 12;
    issueDesc.fills = [{type: 'SOLID', color: C.lightBg}];
    s63.appendChild(issueDesc);
    txt(s63, "Please describe your issue...", 45, 590, 13, C.gray, "Regular");
    
    txt(s63, "Upload Photos (Optional)", 30, 675, 14, C.text, "Semi Bold");
    const uploadPhotos = figma.createRectangle();
    uploadPhotos.name = "UploadPhotos-CLICK";
    uploadPhotos.resize(315, 60);
    uploadPhotos.x = 30;
    uploadPhotos.y = 700;
    uploadPhotos.cornerRadius = 12;
    uploadPhotos.fills = [{type: 'SOLID', color: C.lightBg}];
    uploadPhotos.strokes = [{type: 'SOLID', color: C.gray}];
    uploadPhotos.strokeWeight = 2;
    uploadPhotos.dashPattern = [8, 8];
    s63.appendChild(uploadPhotos);
    txt(s63, "📷 Add Photos", 130, 720, 14, C.gray, "Regular");
    
    btn(s63, "SubmitRefund-CLICK", 30, 780, 315, 55, C.yellow, "Submit Request", 18); // YELLOW
    txt(s63, "Submit Request", 110, 798, 18, C.white, "Bold");
    
    targetPage.appendChild(s63);
    screens.push(s63);
    x += W + G;
    
    // ==========================================
    // SCREEN 64: REORDER
    // ==========================================
    const s64 = figma.createFrame();
    s64.name = "64-Reorder-Previous";
    s64.resize(W, H);
    s64.x = x;
    s64.y = y;
    s64.fills = [{type: 'SOLID', color: C.white}];
    
    header(s64, "Reorder", true, "BackToOrderHistory-CLICK");
    
    txt(s64, "🔄 Reorder from", 30, 90, 20, C.text, "Bold");
    txt(s64, "Previous Order #BK12345", 30, 120, 14, C.gray, "Regular");
    
    const reorderInfo = figma.createRectangle();
    reorderInfo.resize(315, 70);
    reorderInfo.x = 30;
    reorderInfo.y = 160;
    reorderInfo.cornerRadius = 12;
    reorderInfo.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s64.appendChild(reorderInfo);
    
    txt(s64, "ℹ️ Price Comparison", 45, 175, 14, C.text, "Bold");
    txt(s64, "Previous: Rs 1,887 • Now: Rs 1,950", 45, 198, 12, C.gray, "Regular");
    txt(s64, "Some prices may have changed", 45, 215, 11, C.gray, "Regular");
    
    txt(s64, "Items to Reorder", 30, 260, 16, C.text, "Bold");
    
    const reorderItems = [
      {name: "Chicken Tikka Pizza", oldPrice: "Rs 899", newPrice: "Rs 949", available: true},
      {name: "Beef Burger Meal", oldPrice: "Rs 599", newPrice: "Rs 599", available: true}
    ];
    
    let reorderY = 300;
    for (const item of reorderItems) {
      const itemCard = figma.createRectangle();
      itemCard.resize(315, 85);
      itemCard.x = 30;
      itemCard.y = reorderY;
      itemCard.cornerRadius = 12;
      itemCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s64.appendChild(itemCard);
      
      const checkbox2 = figma.createRectangle();
      checkbox2.name = `ReorderItem-${item.name.replace(/ /g,'')}-TOGGLE`;
      checkbox2.resize(24, 24);
      checkbox2.x = 45;
      checkbox2.y = reorderY + 30;
      checkbox2.cornerRadius = 6;
      checkbox2.fills = [{type: 'SOLID', color: C.teal}];
      s64.appendChild(checkbox2);
      txt(s64, "✓", 50, reorderY + 33, 16, C.white, "Bold");
      
      txt(s64, item.name, 85, reorderY + 20, 14, C.text, "Bold");
      txt(s64, `Was: ${item.oldPrice}`, 85, reorderY + 45, 12, C.gray, "Regular");
      txt(s64, `Now: ${item.newPrice}`, 210, reorderY + 45, 13, C.teal, "Bold");
      
      if (!item.available) {
        const unavailBadge = figma.createRectangle();
        unavailBadge.resize(85, 20);
        unavailBadge.x = 245;
        unavailBadge.y = reorderY + 20;
        unavailBadge.cornerRadius = 10;
        unavailBadge.fills = [{type: 'SOLID', color: C.red, opacity: 0.2}];
        s64.appendChild(unavailBadge);
        txt(s64, "Unavailable", 252, reorderY + 24, 10, C.red, "Bold");
      }
      
      reorderY += 95;
    }
    
    txt(s64, "New Total: Rs 1,950", 30, 510, 18, C.teal, "Bold");
    
    const modifyBtn = figma.createRectangle();
    modifyBtn.name = "ModifyReorder-CLICK";
    modifyBtn.resize(315, 50);
    modifyBtn.x = 30;
    modifyBtn.y = 560;
    modifyBtn.cornerRadius = 25;
    modifyBtn.fills = [{type: 'SOLID', color: C.lightBg}];
    s64.appendChild(modifyBtn);
    txt(s64, "Modify Items Before Adding", 85, 577, 15, C.text, "Regular");
    
    btn(s64, "AddToCart-CLICK", 30, 630, 315, 55, C.yellow, "Add to Cart", 18); // YELLOW
    txt(s64, "Add to Cart", 130, 648, 18, C.white, "Bold");
    
    targetPage.appendChild(s64);
    screens.push(s64);
    x += W + G;
    
    // ==========================================
    // SCREEN 65: DIETARY PREFERENCES FILTER
    // ==========================================
    const s65 = figma.createFrame();
    s65.name = "65-Dietary-Preferences";
    s65.resize(W, H);
    s65.x = x;
    s65.y = y;
    s65.fills = [{type: 'SOLID', color: C.white}];
    
    header(s65, "Dietary Preferences", true, "BackToFilters-CLICK");
    
    txt(s65, "🥗 Your Preferences", 30, 90, 22, C.text, "Bold");
    txt(s65, "Select all that apply", 30, 125, 14, C.gray, "Regular");
    
    const dietaryOptions = [
      {label: "Vegetarian", desc: "No meat or poultry", icon: "🌿", selected: true},
      {label: "Vegan", desc: "No animal products", icon: "🥬", selected: false},
      {label: "Halal", desc: "Islamic dietary laws", icon: "🕌", selected: true},
      {label: "Gluten-Free", desc: "No wheat, barley, rye", icon: "🌾", selected: false},
      {label: "Keto", desc: "Low carb, high fat", icon: "🥑", selected: false},
      {label: "Dairy-Free", desc: "No milk products", icon: "🥛", selected: false},
      {label: "Nut Allergies", desc: "No nuts or peanuts", icon: "🥜", selected: false},
      {label: "Seafood Allergies", desc: "No fish or shellfish", icon: "🐟", selected: false}
    ];
    
    let dietY3 = 170;
    for (const option of dietaryOptions) {
      const optionCard = figma.createRectangle();
      optionCard.name = `DietaryOption-${option.label.replace(/ /g,'')}-TOGGLE`;
      optionCard.resize(315, 75);
      optionCard.x = 30;
      optionCard.y = dietY;
      optionCard.cornerRadius = 12;
      //optionCard.fills = [{type: 'SOLID', color: option.selected ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      //optionCard.strokes = [{type: 'SOLID', color: option.selected ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
      optionCard.strokeWeight = option.selected ? 2 : 0;
      s65.appendChild(optionCard);
      
      txt(s65, option.icon, 50, dietY + 20, 28, C.text, "Regular");
      txt(s65, option.label, 95, dietY + 18, 15, C.text, "Bold");
      txt(s65, option.desc, 95, dietY + 43, 12, C.gray, "Regular");
      
      const toggleBg3 = figma.createRectangle();
      toggleBg3.resize(50, 28);
      toggleBg3.x = 285;
      toggleBg3.y = dietY + 24;
      toggleBg3.cornerRadius = 14;
      toggleBg3.fills = [{type: 'SOLID', color: option.selected ? C.teal : C.gray, opacity: option.selected ? 1 : 0.3}];
      s65.appendChild(toggleBg3);
      
      const toggleCircle3 = figma.createEllipse();
      toggleCircle3.resize(22, 22);
      toggleCircle3.x = option.selected ? 310 : 290;
      toggleCircle3.y = dietY + 27;
      toggleCircle3.fills = [{type: 'SOLID', color: C.white}];
      s65.appendChild(toggleCircle3);
      
      dietY += 83;
    }
    
    btn(s65, "SavePreferences-CLICK", 30, 750, 315, 55, C.yellow, "Save Preferences", 18); // YELLOW
    txt(s65, "Save Preferences", 100, 768, 18, C.white, "Bold");
    
    targetPage.appendChild(s65);
    screens.push(s65);
    x += W + G;
    
    // ==========================================
    // SCREEN 66: LANGUAGE SELECTION
    // ==========================================
    const s66 = figma.createFrame();
    s66.name = "66-Language-Selection";
    s66.resize(W, H);
    s66.x = x;
    s66.y = y;
    s66.fills = [{type: 'SOLID', color: C.white}];
    
    header(s66, "Language", true, "BackToSettings-CLICK");
    
    txt(s66, "🌍 Select Language", 30, 90, 22, C.text, "Bold");
    txt(s66, "Choose your preferred language", 30, 125, 14, C.gray, "Regular");
    
    const languages = [
      {name: "English", native: "English", flag: "🇬🇧", selected: true},
      {name: "Urdu", native: "اردو", flag: "🇵🇰", selected: false},
      {name: "Arabic", native: "العربية", flag: "🇸🇦", selected: false},
      {name: "Chinese", native: "中文", flag: "🇨🇳", selected: false},
      {name: "Spanish", native: "Español", flag: "🇪🇸", selected: false},
      {name: "French", native: "Français", flag: "🇫🇷", selected: false}
    ];
    
    let langY = 180;
    for (const lang of languages) {
      const langCard = figma.createRectangle();
      langCard.name = `Language-${lang.name}-CLICK`;
      langCard.resize(315, 65);
      langCard.x = 30;
      langCard.y = langY;
      langCard.cornerRadius = 12;
      //langCard.fills = [{type: 'SOLID', color: lang.selected ? {r: 0.24, g: 0.61, b: 0.61, a: 0.1} : C.lightBg}];
      //langCard.strokes = [{type: 'SOLID', color: lang.selected ? C.teal : {r: 0, g: 0, b: 0, a: 0}}];
      langCard.strokeWeight = lang.selected ? 2 : 0;
      s66.appendChild(langCard);
      
      txt(s66, lang.flag, 50, langY + 18, 28, C.text, "Regular");
      txt(s66, lang.name, 95, langY + 15, 16, C.text, "Bold");
      txt(s66, lang.native, 95, langY + 38, 13, C.gray, "Regular");
      
      if (lang.selected) {
        const checkmark3 = figma.createEllipse();
        checkmark3.resize(24, 24);
        checkmark3.x = 305;
        checkmark3.y = langY + 20;
        checkmark3.fills = [{type: 'SOLID', color: C.teal}];
        s66.appendChild(checkmark3);
        txt(s66, "✓", 312, langY + 23, 14, C.white, "Bold");
      }
      
      langY += 73;
    }
    
    btn(s66, "SaveLanguage-CLICK", 30, 720, 315, 55, C.yellow, "Save Language", 18); // YELLOW
    txt(s66, "Save Language", 110, 738, 18, C.white, "Bold");
    
    targetPage.appendChild(s66);
    screens.push(s66);
    x += W + G;
    
    // ==========================================
    // SCREEN 67: ABOUT APP
    // ==========================================
    const s67 = figma.createFrame();
    s67.name = "67-About-App";
    s67.resize(W, H);
    s67.x = x;
    s67.y = y;
    s67.fills = [{type: 'SOLID', color: C.white}];
    
    header(s67, "About", true, "BackToSettings-CLICK");
    
    const aboutLogo = figma.createEllipse();
    aboutLogo.resize(120, 120);
    aboutLogo.x = (W - 120) / 2;
    aboutLogo.y = 120;
    aboutLogo.fills = [{type: 'SOLID', color: C.teal}];
    s67.appendChild(aboutLogo);
    txt(s67, "🍽️", 167, 155, 48, C.white, "Regular");
    
    txt(s67, "BasKhao", 145, 270, 28, C.text, "Bold");
    txt(s67, "Food Delivery Made Easy", 110, 305, 14, C.gray, "Regular");
    txt(s67, "Version 1.0.0", 145, 330, 13, C.gray, "Regular");
    
    const aboutInfo = [
      {label: "Developer", value: "BasKhao Inc."},
      {label: "Release Date", value: "November 2025"},
      {label: "Category", value: "Food & Drink"},
      {label: "Size", value: "45 MB"}
    ];
    
    let aboutY = 380;
    for (const info of aboutInfo) {
      txt(s67, info.label, 30, aboutY, 13, C.gray, "Regular");
      txt(s67, info.value, 200, aboutY, 13, C.text, "Bold");
      aboutY += 30;
    }
    
    const aboutActions = [
      {label: "Rate Us on App Store", icon: "⭐"},
      {label: "Share with Friends", icon: "📤"},
      {label: "Privacy Policy", icon: "🛡️"},
      {label: "Terms of Service", icon: "📄"},
      {label: "Licenses", icon: "📜"}
    ];
    
    let actionY = 540;
    for (const action of aboutActions) {
      const actionCard = figma.createRectangle();
      actionCard.name = `About-${action.label.replace(/ /g,'')}-CLICK`;
      actionCard.resize(315, 55);
      actionCard.x = 30;
      actionCard.y = actionY;
      actionCard.cornerRadius = 12;
      actionCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s67.appendChild(actionCard);
      
      txt(s67, action.icon, 50, actionY + 15, 24, C.text, "Regular");
      txt(s67, action.label, 90, actionY + 20, 15, C.text, "Regular");
      txt(s67, "→", 315, actionY + 18, 20, C.gray, "Regular");
      
      actionY += 63;
    }
    
    targetPage.appendChild(s67);
    screens.push(s67);
    x += W + G;
    
    figma.notify(`✅ Chunk 7/9 Complete - Screens 58-67 created`);
    // ==========================================
    // SCREEN 68: WEB HOME (Desktop Version Preview)
    // ==========================================
    const s68 = figma.createFrame();
    s68.name = "68-Web-Home-Preview";
    s68.resize(W, H);
    s68.x = x;
    s68.y = y;
    s68.fills = [{type: 'SOLID', color: C.white}];
    
    header(s68, "Web Version", true, "BackToHome-CLICK");
    
    txt(s68, "💻 Desktop Experience", 80, 90, 20, C.text, "Bold");
    txt(s68, "Access BasKhao on web browser", 75, 125, 14, C.gray, "Regular");
    
    img(s68, 37, 170, 300, 200, "https://images.unsplash.com/photo-1498050108023-c5249f4df085");
    
    txt(s68, "Visit: www.baskhao.com", 95, 390, 16, C.teal, "Bold");
    
    const webFeatures = [
      "✓ Larger screen for easier browsing",
      "✓ Faster checkout process",
      "✓ Manage multiple orders",
      "✓ Better restaurant search",
      "✓ Same account, all devices"
    ];
    
    let webY = 440;
    for (const feature of webFeatures) {
      txt(s68, feature, 30, webY, 14, C.gray, "Regular");
      webY += 35;
    }
    
    const qrCode = figma.createRectangle();
    qrCode.resize(120, 120);
    qrCode.x = (W - 120) / 2;
    qrCode.y = 620;
    qrCode.cornerRadius = 12;
    qrCode.fills = [{type: 'SOLID', color: C.lightBg}];
    s68.appendChild(qrCode);
    txt(s68, "QR", 170, 668, 24, C.gray, "Bold");
    txt(s68, "Scan to visit website", 115, 755, 13, C.gray, "Regular");
    
    targetPage.appendChild(s68);
    screens.push(s68);
    x += W + G;
    
    // ==========================================
    // SCREEN 69: CONTACT RESTAURANT/RIDER
    // ==========================================
    const s69 = figma.createFrame();
    s69.name = "69-Contact-Options";
    s69.resize(W, H);
    s69.x = x;
    s69.y = y;
    s69.fills = [{type: 'SOLID', color: C.white}];
    
    header(s69, "Contact", true, "BackToTracking-CLICK");
    
    txt(s69, "📞 Need Help?", 30, 90, 24, C.text, "Bold");
    txt(s69, "Contact restaurant or rider", 30, 125, 14, C.gray, "Regular");
    
    txt(s69, "Contact Rider", 30, 180, 18, C.text, "Bold");
    
    const riderContactCard = figma.createRectangle();
    riderContactCard.resize(315, 100);
    riderContactCard.x = 30;
    riderContactCard.y = 215;
    riderContactCard.cornerRadius = 16;
    riderContactCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s69.appendChild(riderContactCard);
    
    const riderAvatar2 = figma.createEllipse();
    riderAvatar2.resize(60, 60);
    riderAvatar2.x = 50;
    riderAvatar2.y = 235;
    riderAvatar2.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
    s69.appendChild(riderAvatar2);
    txt(s69, "🚴", 68, 253, 24, C.teal, "Regular");
    
    txt(s69, "Bilal (Rider)", 125, 240, 16, C.text, "Bold");
    txt(s69, "⭐ 4.8 • ABC-123", 125, 263, 12, C.gray, "Regular");
    
    const callRiderBtn2 = figma.createRectangle();
    callRiderBtn2.name = "CallRider2-CLICK";
    callRiderBtn2.resize(40, 40);
    callRiderBtn2.x = 250;
    callRiderBtn2.y = 245;
    callRiderBtn2.cornerRadius = 20;
    callRiderBtn2.fills = [{type: 'SOLID', color: C.teal}];
    s69.appendChild(callRiderBtn2);
    txt(s69, "📞", 260, 253, 20, C.white, "Regular");
    
    const chatRiderBtn2 = figma.createRectangle();
    chatRiderBtn2.name = "ChatRider2-CLICK";
    chatRiderBtn2.resize(40, 40);
    chatRiderBtn2.x = 300;
    chatRiderBtn2.y = 245;
    chatRiderBtn2.cornerRadius = 20;
    chatRiderBtn2.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s69.appendChild(chatRiderBtn2);
    txt(s69, "💬", 310, 253, 20, C.white, "Regular");
    
    txt(s69, "Contact Restaurant", 30, 345, 18, C.text, "Bold");
    
    const restContactCard = figma.createRectangle();
    restContactCard.resize(315, 100);
    restContactCard.x = 30;
    restContactCard.y = 380;
    restContactCard.cornerRadius = 16;
    restContactCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s69.appendChild(restContactCard);
    
    txt(s69, "🍽️", 68, 413, 28, C.text, "Regular");
    txt(s69, "The Food Hub", 125, 405, 16, C.text, "Bold");
    txt(s69, "📍 Gulberg III, Lahore", 125, 428, 12, C.gray, "Regular");
    
    const callRestBtn2 = figma.createRectangle();
    callRestBtn2.name = "CallRestaurant2-CLICK";
    callRestBtn2.resize(40, 40);
    callRestBtn2.x = 250;
    callRestBtn2.y = 410;
    callRestBtn2.cornerRadius = 20;
    callRestBtn2.fills = [{type: 'SOLID', color: C.teal}];
    s69.appendChild(callRestBtn2);
    txt(s69, "📞", 260, 418, 20, C.white, "Regular");
    
    const dirRestBtn = figma.createRectangle();
    dirRestBtn.name = "GetDirectionsToRest-CLICK";
    dirRestBtn.resize(40, 40);
    dirRestBtn.x = 300;
    dirRestBtn.y = 410;
    dirRestBtn.cornerRadius = 20;
    dirRestBtn.fills = [{type: 'SOLID', color: C.yellow}]; // YELLOW
    s69.appendChild(dirRestBtn);
    txt(s69, "🗺️", 310, 418, 20, C.white, "Regular");
    
    txt(s69, "Emergency Contact", 30, 510, 18, C.text, "Bold");
    
    const emergencyCard = figma.createRectangle();
    emergencyCard.resize(315, 80);
    emergencyCard.x = 30;
    emergencyCard.y = 545;
    emergencyCard.cornerRadius = 16;
    emergencyCard.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.95}}];
    s69.appendChild(emergencyCard);
    
    txt(s69, "🚨 BasKhao Support", 50, 565, 16, C.text, "Bold");
    txt(s69, "Available 24/7 for urgent issues", 50, 590, 13, C.gray, "Regular");
    
    const emergencyBtn = figma.createRectangle();
    emergencyBtn.name = "EmergencyCall-CLICK";
    emergencyBtn.resize(100, 35);
    emergencyBtn.x = 230;
    emergencyBtn.y = 570;
    emergencyBtn.cornerRadius = 18;
    emergencyBtn.fills = [{type: 'SOLID', color: C.red}];
    s69.appendChild(emergencyBtn);
    txt(s69, "Call Now", 252, 580, 13, C.white, "Bold");
    
    targetPage.appendChild(s69);
    screens.push(s69);
    x += W + G;
    
    // ==========================================
    // SCREEN 70: TIP SELECTION
    // ==========================================
    const s70 = figma.createFrame();
    s70.name = "70-Tip-Selection";
    s70.resize(W, H);
    s70.x = x;
    s70.y = y;
    s70.fills = [{type: 'SOLID', color: C.white}];
    
    header(s70, "Add Tip", true, "BackToPayment-CLICK");
    
    txt(s70, "💝 Tip Your Rider", 30, 90, 24, C.text, "Bold");
    txt(s70, "Show appreciation for great service", 30, 125, 14, C.gray, "Regular");
    
    img(s70, 112, 170, 150, 150, "https://images.unsplash.com/photo-1526367790999-0150786686a2");
    
    txt(s70, "Delivery by: Bilal", 125, 340, 16, C.text, "Bold");
    txt(s70, "⭐ Rating: 4.8 (200+ deliveries)", 90, 365, 13, C.gray, "Regular");
    
    txt(s70, "Select Tip Amount", 30, 410, 18, C.text, "Bold");
    
    const tipAmounts2 = [
      {amount: "Rs 20", label: "Small"},
      {amount: "Rs 50", label: "Good"},
      {amount: "Rs 100", label: "Great"},
      {amount: "Custom", label: "Your choice"}
    ];
    
    let tipY = 450;
    for (let i = 0; i < tipAmounts2.length; i++) {
      const tipCard = figma.createRectangle();
      tipCard.name = `TipAmount-${tipAmounts2[i].amount.replace(/ /g,'')}-CLICK`;
      tipCard.resize(150, 70);
      tipCard.x = 30 + (i % 2) * 165;
      tipCard.y = tipY + Math.floor(i / 2) * 80;
      tipCard.cornerRadius = 16;
      tipCard.fills = [{type: 'SOLID', color: i === 1 ? C.yellow : C.lightBg}]; // YELLOW for selected
      //tipCard.strokes = [{type: 'SOLID', color: i === 1 ? C.yellow : {r: 0, g: 0, b: 0, a: 0}}];
      tipCard.strokeWeight = i === 1 ? 2 : 0;
      s70.appendChild(tipCard);
      
      txt(s70, tipAmounts2[i].amount, tipCard.x + 35, tipCard.y + 18, 18, i === 1 ? C.white : C.text, "Bold");
      txt(s70, tipAmounts2[i].label, tipCard.x + 40, tipCard.y + 45, 12, i === 1 ? C.white : C.gray, "Regular");
    }
    
    const tipNote = figma.createRectangle();
    tipNote.resize(315, 70);
    tipNote.x = 30;
    tipNote.y = 620;
    tipNote.cornerRadius = 12;
    tipNote.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s70.appendChild(tipNote);
    
    txt(s70, "💡 Did you know?", 45, 635, 14, C.text, "Bold");
    txt(s70, "100% of your tip goes directly to", 45, 658, 12, C.gray, "Regular");
    txt(s70, "the rider. No service fees!", 45, 675, 12, C.gray, "Regular");
    
    btn(s70, "ConfirmTip-CLICK", 30, 720, 315, 55, C.yellow, "Confirm Tip", 18); // YELLOW
    txt(s70, "Confirm Tip", 125, 738, 18, C.white, "Bold");
    
    targetPage.appendChild(s70);
    screens.push(s70);
    x += W + G;
    
    // ==========================================
    // SCREEN 71: ISSUE REPORTED
    // ==========================================
    const s71 = figma.createFrame();
    s71.name = "71-Issue-Reported";
    s71.resize(W, H);
    s71.x = x;
    s71.y = y;
    s71.fills = [{type: 'SOLID', color: C.white}];
    
    const issueSuccessCircle = figma.createEllipse();
    issueSuccessCircle.resize(120, 120);
    issueSuccessCircle.x = (W - 120) / 2;
    issueSuccessCircle.y = 180;
    issueSuccessCircle.fills = [{type: 'SOLID', color: C.teal, opacity: 0.2}];
    s71.appendChild(issueSuccessCircle);
    
    const issueCheckIcon = figma.createEllipse();
    issueCheckIcon.resize(80, 80);
    issueCheckIcon.x = (W - 80) / 2;
    issueCheckIcon.y = 200;
    issueCheckIcon.fills = [{type: 'SOLID', color: C.teal}];
    s71.appendChild(issueCheckIcon);
    txt(s71, "✓", 178, 222, 48, C.white, "Bold");
    
    txt(s71, "Issue Reported", 105, 330, 24, C.text, "Bold");
    txt(s71, "We've received your complaint", 85, 365, 15, C.gray, "Regular");
    
    const ticketBox = figma.createRectangle();
    ticketBox.resize(250, 70);
    ticketBox.x = 62;
    ticketBox.y = 410;
    ticketBox.cornerRadius = 12;
    ticketBox.fills = [{type: 'SOLID', color: C.lightBg}];
    s71.appendChild(ticketBox);
    
    txt(s71, "Ticket ID: #TK45678", 105, 430, 15, C.text, "Bold");
    txt(s71, "Expected resolution: 24-48 hours", 75, 455, 12, C.gray, "Regular");
    
    txt(s71, "What happens next?", 30, 520, 18, C.text, "Bold");
    
    const nextSteps = [
      "• Our team will review your case",
      "• You'll get updates via notifications",
      "• Refund processed if applicable",
      "• Support team may contact you"
    ];
    
    let stepY4 = 560;
    for (const step of nextSteps) {
      txt(s71, step, 30, stepY4, 14, C.gray, "Regular");
      stepY4 += 30;
    }
    
    btn(s71, "BackToHome2-CLICK", 30, 710, 315, 55, C.teal, "Back to Home", 18);
    txt(s71, "Back to Home", 120, 728, 18, C.white, "Bold");
    
    targetPage.appendChild(s71);
    screens.push(s71);
    x += W + G;
    
    // ==========================================
    // SCREEN 72: SPENDING SUMMARY
    // ==========================================
    const s72 = figma.createFrame();
    s72.name = "72-Spending-Summary";
    s72.resize(W, H);
    s72.x = x;
    s72.y = y;
    s72.fills = [{type: 'SOLID', color: C.white}];
    
    header(s72, "Spending Summary", true, "BackToProfile-CLICK");
    
    txt(s72, "💰 Your Spending", 30, 90, 22, C.text, "Bold");
    
    const summaryTimeFilters = ["This Month", "Last Month", "This Year"];
    let summaryTfX = 30;
    for (let i = 0; i < summaryTimeFilters.length; i++) {
      const tfBtn = figma.createRectangle();
      tfBtn.name = `SummaryFilter-${summaryTimeFilters[i].replace(/ /g,'')}-CLICK`;
      tfBtn.resize(100, 35);
      tfBtn.x = summaryTfX;
      tfBtn.y = 140;
      tfBtn.cornerRadius = 18;
      tfBtn.fills = [{type: 'SOLID', color: i === 0 ? C.teal : C.lightBg}];
      s72.appendChild(tfBtn);
      
      txt(s72, summaryTimeFilters[i], tfBtn.x + 10, 149, 12, i === 0 ? C.white : C.text, "Semi Bold");
      summaryTfX += 108;
    }
    
    // Total spending card
    const spendingCard = figma.createRectangle();
    spendingCard.resize(315, 100);
    spendingCard.x = 30;
    spendingCard.y = 200;
    spendingCard.cornerRadius = 16;
    spendingCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.96, g: 0.72, b: 0.26, a: 1}},
        {position: 1, color: {r: 0.91, g: 0.62, b: 0.16, a: 1}}
      ]
    }];
    s72.appendChild(spendingCard);
    
    txt(s72, "Total Spent", 50, 220, 16, C.white, "Bold");
    txt(s72, "Rs 15,450", 50, 255, 32, C.white, "Bold");
    txt(s72, "23 orders • Avg: Rs 672", 50, 290, 13, C.white, "Regular");
    
    txt(s72, "Breakdown by Category", 30, 330, 16, C.text, "Bold");
    
    const spendingCategories = [
      {category: "Fast Food", amount: "Rs 6,200", percent: "40%", color: C.red},
      {category: "Desi Food", amount: "Rs 4,650", percent: "30%", color: C.yellow},
      {category: "Pizza", amount: "Rs 3,100", percent: "20%", color: C.teal},
      {category: "Other", amount: "Rs 1,500", percent: "10%", color: C.gray}
    ];
    
    let catY2 = 370;
    for (const cat of spendingCategories) {
      const catCard = figma.createRectangle();
      catCard.resize(315, 60);
      catCard.x = 30;
      catCard.y = catY2;
      catCard.cornerRadius = 12;
      catCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s72.appendChild(catCard);
      
      const colorDot = figma.createEllipse();
      colorDot.resize(12, 12);
      colorDot.x = 45;
      colorDot.y = catY2 + 24;
      colorDot.fills = [{type: 'SOLID', color: cat.color}];
      s72.appendChild(colorDot);
      
      txt(s72, cat.category, 70, catY2 + 18, 15, C.text, "Bold");
      txt(s72, cat.amount, 220, catY2 + 18, 15, C.teal, "Bold");
      
      const progressBar = figma.createRectangle();
      progressBar.resize(245, 8);
      progressBar.x = 70;
      progressBar.y = catY2 + 42;
      progressBar.cornerRadius = 4;
      progressBar.fills = [{type: 'SOLID', color: C.lightBg}];
      s72.appendChild(progressBar);
      
      const progressFill = figma.createRectangle();
      const fillWidth = 245 * (parseInt(cat.percent) / 100);
      progressFill.resize(fillWidth, 8);
      progressFill.x = 70;
      progressFill.y = catY2 + 42;
      progressFill.cornerRadius = 4;
      progressFill.fills = [{type: 'SOLID', color: cat.color}];
      s72.appendChild(progressFill);
      
      catY2 += 70;
    }
    
    btn(s72, "DownloadReport-CLICK", 30, 720, 315, 50, C.yellow, "Download Report", 16);
    txt(s72, "Download Report", 105, 737, 16, C.white, "Bold");
    
    targetPage.appendChild(s72);
    screens.push(s72);
    x += W + G;
    
    // ==========================================
    // SCREEN 73: SUBSCRIPTION DETAILS
    // ==========================================
    const s73 = figma.createFrame();
    s73.name = "73-Subscription-Details";
    s73.resize(W, H);
    s73.x = x;
    s73.y = y;
    s73.fills = [{type: 'SOLID', color: C.white}];
    
    header(s73, "My Subscription", true, "BackToProfile-CLICK");
    
    txt(s73, "👑 Premium Member", 85, 90, 22, C.text, "Bold");
    
    const subscriptionCard = figma.createRectangle();
    subscriptionCard.resize(315, 140);
    subscriptionCard.x = 30;
    subscriptionCard.y = 140;
    subscriptionCard.cornerRadius = 16;
    subscriptionCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        {position: 0, color: {r: 0.96, g: 0.72, b: 0.26, a: 1}},
        {position: 1, color: {r: 0.91, g: 0.62, b: 0.16, a: 1}}
      ]
    }];
    s73.appendChild(subscriptionCard);
    
    txt(s73, "Monthly Plan", 50, 165, 20, C.white, "Bold");
    txt(s73, "Rs 499 / month", 50, 195, 16, C.white, "Regular");
    txt(s73, "Next billing: Dec 14, 2025", 50, 225, 13, C.white, "Regular");
    txt(s73, "Auto-renewal: ON", 50, 250, 13, C.white, "Bold");
    
    const manageBtn = figma.createRectangle();
    manageBtn.name = "ManageSubscription-CLICK";
    manageBtn.resize(100, 35);
    manageBtn.x = 230;
    manageBtn.y = 230;
    manageBtn.cornerRadius = 18;
    manageBtn.fills = [{type: 'SOLID', color: C.white, opacity: 0.3}];
    s73.appendChild(manageBtn);
    txt(s73, "Manage", 256, 240, 13, C.white, "Bold");
    
    txt(s73, "Your Benefits", 30, 310, 18, C.text, "Bold");
    
    const benefits = [
      {benefit: "Free delivery on all orders", used: "23 times", icon: "🚚"},
      {benefit: "Priority customer support", used: "Always", icon: "⚡"},
      {benefit: "Exclusive discounts", used: "5 times", icon: "🎁"},
      {benefit: "Early access to offers", used: "Available", icon: "⭐"}
    ];
    
    let benefitY = 350;
    for (const benefit of benefits) {
      const benefitCard = figma.createRectangle();
      benefitCard.resize(315, 70);
      benefitCard.x = 30;
      benefitCard.y = benefitY;
      benefitCard.cornerRadius = 12;
      benefitCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s73.appendChild(benefitCard);
      
      txt(s73, benefit.icon, 50, benefitY + 22, 24, C.text, "Regular");
      txt(s73, benefit.benefit, 90, benefitY + 18, 14, C.text, "Bold");
      txt(s73, `Used: ${benefit.used}`, 90, benefitY + 43, 12, C.gray, "Regular");
      
      benefitY += 80;
    }
    
    const cancelSubBtn = figma.createRectangle();
    cancelSubBtn.name = "CancelSubscription-CLICK";
    cancelSubBtn.resize(315, 50);
    cancelSubBtn.x = 30;
    cancelSubBtn.y = 720;
    cancelSubBtn.cornerRadius = 25;
    cancelSubBtn.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.95}}];
    s73.appendChild(cancelSubBtn);
    txt(s73, "Cancel Subscription", 100, 737, 15, C.red, "Bold");
    
    targetPage.appendChild(s73);
    screens.push(s73);
    x += W + G;
    
    // ==========================================
    // SCREEN 74: ORDER INVOICE
    // ==========================================
    const s74 = figma.createFrame();
    s74.name = "74-Order-Invoice";
    s74.resize(W, H);
    s74.x = x;
    s74.y = y;
    s74.fills = [{type: 'SOLID', color: C.white}];
    
    header(s74, "Invoice", true, "BackToOrderDetails-CLICK");
    
    const invoiceBg = figma.createRectangle();
    invoiceBg.resize(315, 700);
    invoiceBg.x = 30;
    invoiceBg.y = 80;
    invoiceBg.cornerRadius = 16;
    invoiceBg.fills = [{type: 'SOLID', color: C.lightBg}];
    s74.appendChild(invoiceBg);
    
    txt(s74, "INVOICE", 145, 100, 20, C.text, "Bold");
    
    const divider11 = figma.createLine();
    divider11.resize(275, 0);
    divider11.x = 50;
    divider11.y = 135;
    divider11.strokes = [{type: 'SOLID', color: C.gray}];
    divider11.strokeWeight = 1;
    s74.appendChild(divider11);
    
    txt(s74, "Order #BK12345", 50, 150, 16, C.text, "Bold");
    txt(s74, "Date: Nov 14, 2025", 50, 175, 12, C.gray, "Regular");
    
    txt(s74, "Bill To:", 50, 205, 14, C.text, "Bold");
    txt(s74, "Ahmad Ali", 50, 225, 13, C.text, "Regular");
    txt(s74, "+92 300 1234567", 50, 243, 12, C.gray, "Regular");
    txt(s74, "123 Main Blvd, Gulberg III", 50, 260, 12, C.gray, "Regular");
    
    txt(s74, "From:", 50, 290, 14, C.text, "Bold");
    txt(s74, "The Food Hub", 50, 310, 13, C.text, "Regular");
    txt(s74, "Gulberg III, Lahore", 50, 328, 12, C.gray, "Regular");
    
    const divider12 = figma.createLine();
    divider12.resize(275, 0);
    divider12.x = 50;
    divider12.y = 355;
    divider12.strokes = [{type: 'SOLID', color: C.gray}];
    divider12.strokeWeight = 1;
    s74.appendChild(divider12);
    
    txt(s74, "Item", 50, 370, 13, C.text, "Bold");
    txt(s74, "Qty", 200, 370, 13, C.text, "Bold");
    txt(s74, "Price", 260, 370, 13, C.text, "Bold");
    
    const divider13 = figma.createLine();
    divider13.resize(275, 0);
    divider13.x = 50;
    divider13.y = 395;
    divider13.strokes = [{type: 'SOLID', color: C.gray}];
    divider13.strokeWeight = 1;
    s74.appendChild(divider13);
    
    txt(s74, "Chicken Tikka Pizza", 50, 410, 12, C.text, "Regular");
    txt(s74, "1", 210, 410, 12, C.text, "Regular");
    txt(s74, "1,049", 260, 410, 12, C.text, "Regular");
    
    txt(s74, "Beef Burger Meal", 50, 435, 12, C.text, "Regular");
    txt(s74, "2", 210, 435, 12, C.text, "Regular");
    txt(s74, "1,198", 260, 435, 12, C.text, "Regular");
    
    const divider14 = figma.createLine();
    divider14.resize(275, 0);
    divider14.x = 50;
    divider14.y = 465;
    divider14.strokes = [{type: 'SOLID', color: C.gray}];
    divider14.strokeWeight = 1;
    s74.appendChild(divider14);
    
    txt(s74, "Subtotal", 50, 480, 12, C.gray, "Regular");
    txt(s74, "2,247", 260, 480, 12, C.text, "Regular");
    txt(s74, "Delivery", 50, 505, 12, C.gray, "Regular");
    txt(s74, "Free", 273, 505, 12, C.green, "Bold");
    txt(s74, "Discount", 50, 530, 12, C.gray, "Regular");
    txt(s74, "-450", 268, 530, 12, C.green, "Regular");
    txt(s74, "Tax (5%)", 50, 555, 12, C.gray, "Regular");
    txt(s74, "90", 275, 555, 12, C.text, "Regular");
    
    const divider15 = figma.createLine();
    divider15.resize(275, 0);
    divider15.x = 50;
    divider15.y = 580;
    divider15.strokes = [{type: 'SOLID', color: C.text}];
    divider15.strokeWeight = 2;
    s74.appendChild(divider15);
    
    txt(s74, "TOTAL", 50, 600, 16, C.text, "Bold");
    txt(s74, "Rs 1,887", 240, 600, 16, C.teal, "Bold");
    
    const divider16 = figma.createLine();
    divider16.resize(275, 0);
    divider16.x = 50;
    divider16.y = 635;
    divider16.strokes = [{type: 'SOLID', color: C.gray}];
    divider16.strokeWeight = 1;
    s74.appendChild(divider16);
    
    txt(s74, "Payment Method: Wallet", 50, 650, 12, C.gray, "Regular");
    txt(s74, "Transaction ID: TX123456789", 50, 670, 11, C.gray, "Regular");
    txt(s74, "Invoice Date: Nov 14, 2025", 50, 690, 11, C.gray, "Regular");
    txt(s74, "Thank you for your order!", 90, 730, 14, C.teal, "Bold");
    
    targetPage.appendChild(s74);
    screens.push(s74);
    x += W + G;
    
    // ==========================================
    // SCREEN 75: TRACKING LINK (Guest)
    // ==========================================
    const s75 = figma.createFrame();
    s75.name = "75-Guest-Tracking-Link";
    s75.resize(W, H);
    s75.x = x;
    s75.y = y;
    s75.fills = [{type: 'SOLID', color: C.white}];
    
    header(s75, "Track Order", false);
    
    txt(s75, "📦 Guest Order Tracking", 70, 90, 20, C.text, "Bold");
    txt(s75, "Order #BK12345", 130, 125, 14, C.gray, "Regular");
    
    const guestTrackInfo = figma.createRectangle();
    guestTrackInfo.resize(315, 80);
    guestTrackInfo.x = 30;
    guestTrackInfo.y = 170;
    guestTrackInfo.cornerRadius = 12;
    guestTrackInfo.fills = [{type: 'SOLID', color: {r: 1, g: 0.95, b: 0.8}}];
    s75.appendChild(guestTrackInfo);
    
    txt(s75, "📧 Tracking via Email/SMS", 50, 185, 14, C.text, "Bold");
    txt(s75, "You received this link to track your", 50, 210, 12, C.gray, "Regular");
    txt(s75, "order without signing in.", 50, 227, 12, C.gray, "Regular");
    
    txt(s75, "Order Status", 30, 280, 18, C.text, "Bold");
    
    const guestProgress = [
      {label: "Order Placed", status: "complete"},
      {label: "Preparing", status: "complete"},
      {label: "Out for Delivery", status: "current"},
      {label: "Delivered", status: "pending"}
    ];
    
    let guestProgY = 320;
    for (let i = 0; i < guestProgress.length; i++) {
      const prog = guestProgress[i];
      const progCircle = figma.createEllipse();
      progCircle.resize(30, 30);
      progCircle.x = 45;
      progCircle.y = guestProgY;
      progCircle.fills = [{type: 'SOLID', color: prog.status === "pending" ? C.lightBg : C.teal}];
      s75.appendChild(progCircle);
      
      if (prog.status === "complete") {
        txt(s75, "✓", 54, guestProgY + 7, 16, C.white, "Bold");
      }
      
      txt(s75, prog.label, 90, guestProgY + 7, 15, prog.status === "pending" ? C.gray : C.text, "Bold");
      
      if (i < guestProgress.length - 1) {
        const line2 = figma.createLine();
        line2.resize(0, 25);
        line2.x = 60;
        line2.y = guestProgY + 30;
        line2.strokes = [{type: 'SOLID', color: i < 2 ? C.teal : C.lightBg}];
        line2.strokeWeight = 3;
        s75.appendChild(line2);
      }
      
      guestProgY += 60;
    }
    
    txt(s75, "Estimated Delivery", 30, 580, 16, C.text, "Bold");
    txt(s75, "⏱️ 15 minutes", 30, 610, 20, C.teal, "Bold");
    
    const createAccountPrompt = figma.createRectangle();
    createAccountPrompt.resize(315, 80);
    createAccountPrompt.x = 30;
    createAccountPrompt.y = 660;
    createAccountPrompt.cornerRadius = 12;
    createAccountPrompt.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
    s75.appendChild(createAccountPrompt);
    
    txt(s75, "💡 Want full features?", 50, 675, 14, C.text, "Bold");
    txt(s75, "Create an account for order history,", 50, 698, 12, C.gray, "Regular");
    txt(s75, "favorites, and exclusive offers!", 50, 715, 12, C.gray, "Regular");
    
    targetPage.appendChild(s75);
    screens.push(s75);
    x += W + G;
    
    // ==========================================
    // SCREEN 76: RESTAURANT RATINGS LIST
    // ==========================================
    const s76 = figma.createFrame();
    s76.name = "76-Restaurant-Ratings";
    s76.resize(W, H);
    s76.x = x;
    s76.y = y;
    s76.fills = [{type: 'SOLID', color: C.white}];
    
    header(s76, "Ratings & Reviews", true, "BackToRestaurant-CLICK");
    
    txt(s76, "⭐ Customer Reviews", 30, 90, 20, C.text, "Bold");
    txt(s76, "The Food Hub", 30, 120, 14, C.gray, "Regular");
    
    // Overall rating
    const overallCard = figma.createRectangle();
    overallCard.resize(315, 90);
    overallCard.x = 30;
    overallCard.y = 160;
    overallCard.cornerRadius = 16;
    overallCard.fills = [{type: 'SOLID', color: C.lightBg}];
    s76.appendChild(overallCard);
    
    txt(s76, "4.5", 70, 185, 36, C.teal, "Bold");
    txt(s76, "out of 5", 70, 225, 12, C.gray, "Regular");
    
    txt(s76, "⭐⭐⭐⭐⭐", 160, 185, 18, C.yellow, "Regular");
    txt(s76, "Based on 200+ reviews", 160, 215, 12, C.gray, "Regular");
    
    txt(s76, "Recent Reviews", 30, 280, 16, C.text, "Bold");
    
    const reviews = [
      {user: "Ahmad Ali", rating: 5, review: "Excellent food quality and fast delivery!", time: "2 days ago"},
      {user: "Sara Khan", rating: 4, review: "Good taste but portion was small.", time: "5 days ago"}
    ];
    
    let reviewY = 320;
    for (const review of reviews) {
      const reviewCard = figma.createRectangle();
      reviewCard.resize(315, 120);
      reviewCard.x = 30;
      reviewCard.y = reviewY;
      reviewCard.cornerRadius = 12;
      reviewCard.fills = [{type: 'SOLID', color: C.lightBg}];
      s76.appendChild(reviewCard);
      
      const reviewAvatar = figma.createEllipse();
      reviewAvatar.resize(45, 45);
      reviewAvatar.x = 45;
      reviewAvatar.y = reviewY + 15;
      reviewAvatar.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
      s76.appendChild(reviewAvatar);
      txt(s76, review.user.charAt(0), 62, reviewY + 28, 18, C.teal, "Bold");
      
      txt(s76, review.user, 105, reviewY + 20, 14, C.text, "Bold");
      
      let starTxt = "";
      for (let i = 0; i < review.rating; i++) starTxt += "⭐";
      txt(s76, starTxt, 105, reviewY + 42, 14, C.yellow, "Regular");
      
      txt(s76, review.review, 45, reviewY + 70, 13, C.text, "Regular");
      txt(s76, review.time, 45, reviewY + 95, 11, C.gray, "Regular");
      
      reviewY += 130;
    }
    
    btn(s76, "SeeAllReviews-CLICK", 30, 720, 315, 50, C.yellow, "See All Reviews", 16);
    txt(s76, "See All Reviews", 105, 737, 16, C.white, "Bold");
    
    targetPage.appendChild(s76);
    screens.push(s76);
    x += W + G;
    
    // ==========================================
    // SCREEN 77: EMPTY STATE - NO ORDERS
    // ==========================================
    const s77 = figma.createFrame();
    s77.name = "77-Empty-State-No-Orders";
    s77.resize(W, H);
    s77.x = x;
    s77.y = y;
    s77.fills = [{type: 'SOLID', color: C.white}];
    
    header(s77, "Order History", true, "BackToProfile-CLICK");
    
    img(s77, 87, 200, 200, 200, "https://images.unsplash.com/photo-1621155346337-1d19476ba981");
    
    txt(s77, "No Orders Yet", 115, 430, 24, C.text, "Bold");
    txt(s77, "Start ordering delicious food", 85, 465, 15, C.gray, "Regular");
    txt(s77, "from your favorite restaurants!", 80, 487, 15, C.gray, "Regular");
    
    btn(s77, "StartOrdering-CLICK", 30, 560, 315, 55, C.yellow, "Browse Restaurants", 18); // YELLOW
    txt(s77, "Browse Restaurants", 95, 578, 18, C.white, "Bold");
    
    targetPage.appendChild(s77);
    screens.push(s77);
    x += W + G;
    
    figma.notify(`✅ Chunk 8/9 Complete - Screens 68-77 created`);
    // ==========================================
    // SCREEN 78: EMPTY STATE - NO FAVORITES
    // ==========================================
    const s78 = figma.createFrame();
    s78.name = "78-Empty-State-No-Favorites";
    s78.resize(W, H);
    s78.x = x;
    s78.y = y;
    s78.fills = [{type: 'SOLID', color: C.white}];
    
    header(s78, "Favorites", true, "BackToProfile-CLICK");
    
    img(s78, 87, 200, 200, 200, "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7");
    
    txt(s78, "No Favorites Yet", 105, 430, 24, C.text, "Bold");
    txt(s78, "Save your favorite restaurants", 80, 465, 15, C.gray, "Regular");
    txt(s78, "and dishes for quick access!", 85, 487, 15, C.gray, "Regular");
    
    btn(s78, "ExploreFavorites-CLICK", 30, 560, 315, 55, C.yellow, "Explore Restaurants", 18); // YELLOW
    txt(s78, "Explore Restaurants", 95, 578, 18, C.white, "Bold");
    
    targetPage.appendChild(s78);
    screens.push(s78);
    x += W + G;
    
    // ==========================================
    // SCREEN 79: LOADING STATE
    // ==========================================
    const s79 = figma.createFrame();
    s79.name = "79-Loading-State";
    s79.resize(W, H);
    s79.x = x;
    s79.y = y;
    s79.fills = [{type: 'SOLID', color: C.white}];
    
    // Loading animation placeholder
    const loadingCircle1 = figma.createEllipse();
    loadingCircle1.resize(60, 60);
    loadingCircle1.x = (W - 60) / 2;
    loadingCircle1.y = 300;
    loadingCircle1.fills = [{type: 'SOLID', color: C.teal, opacity: 0.3}];
    s79.appendChild(loadingCircle1);
    
    const loadingCircle2 = figma.createEllipse();
    loadingCircle2.resize(40, 40);
    loadingCircle2.x = (W - 40) / 2;
    loadingCircle2.y = 310;
    loadingCircle2.fills = [{type: 'SOLID', color: C.teal, opacity: 0.6}];
    s79.appendChild(loadingCircle2);
    
    const loadingCircle3 = figma.createEllipse();
    loadingCircle3.resize(20, 20);
    loadingCircle3.x = (W - 20) / 2;
    loadingCircle3.y = 320;
    loadingCircle3.fills = [{type: 'SOLID', color: C.teal}];
    s79.appendChild(loadingCircle3);
    
    txt(s79, "Loading...", 147, 390, 20, C.text, "Bold");
    txt(s79, "Please wait", 148, 420, 14, C.gray, "Regular");
    
    targetPage.appendChild(s79);
    screens.push(s79);
    x += W + G;
    
    // ==========================================
    // SCREEN 80: ERROR STATE - NO INTERNET
    // ==========================================
    const s80 = figma.createFrame();
    s80.name = "80-Error-No-Internet";
    s80.resize(W, H);
    s80.x = x;
    s80.y = y;
    s80.fills = [{type: 'SOLID', color: C.white}];
    
    img(s80, 87, 200, 200, 200, "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3");
    
    txt(s80, "No Internet Connection", 70, 430, 22, C.text, "Bold");
    txt(s80, "Please check your connection", 80, 465, 15, C.gray, "Regular");
    txt(s80, "and try again", 135, 487, 15, C.gray, "Regular");
    
    btn(s80, "RetryConnection-CLICK", 30, 560, 315, 55, C.teal, "Retry", 18);
    txt(s80, "Retry", 165, 578, 18, C.white, "Bold");
    
    const goOfflineBtn = figma.createRectangle();
    goOfflineBtn.name = "BrowseOffline-CLICK";
    goOfflineBtn.resize(315, 50);
    goOfflineBtn.x = 30;
    goOfflineBtn.y = 630;
    goOfflineBtn.cornerRadius = 25;
    goOfflineBtn.fills = [{type: 'SOLID', color: C.lightBg}];
    s80.appendChild(goOfflineBtn);
    txt(s80, "Browse Offline", 115, 647, 16, C.text, "Regular");
    
    targetPage.appendChild(s80);
    screens.push(s80);
    x += W + G;
    
    // ==========================================
    // SCREEN 81: ERROR STATE - SOMETHING WENT WRONG
    // ==========================================
    const s81 = figma.createFrame();
    s81.name = "81-Error-General";
    s81.resize(W, H);
    s81.x = x;
    s81.y = y;
    s81.fills = [{type: 'SOLID', color: C.white}];
    
    img(s81, 87, 200, 200, 200, "https://images.unsplash.com/photo-1584824486509-112e4181ff6b");
    
    txt(s81, "Oops! Something Went Wrong", 50, 430, 20, C.text, "Bold");
    txt(s81, "We're having technical difficulties", 65, 465, 15, C.gray, "Regular");
    txt(s81, "Please try again later", 100, 487, 15, C.gray, "Regular");
    
    txt(s81, "Error Code: 500", 130, 530, 13, C.gray, "Regular");
    
    btn(s81, "RetryAction-CLICK", 30, 580, 315, 55, C.teal, "Try Again", 18);
    txt(s81, "Try Again", 140, 598, 18, C.white, "Bold");
    
    const contactSupportBtn2 = figma.createRectangle();
    contactSupportBtn2.name = "ContactSupport-CLICK";
    contactSupportBtn2.resize(315, 50);
    contactSupportBtn2.x = 30;
    contactSupportBtn2.y = 650;
    contactSupportBtn2.cornerRadius = 25;
    contactSupportBtn2.fills = [{type: 'SOLID', color: C.lightBg}];
    s81.appendChild(contactSupportBtn2);
    txt(s81, "Contact Support", 110, 667, 16, C.text, "Regular");
    
    targetPage.appendChild(s81);
    screens.push(s81);
    x += W + G;
    
    // ==========================================
    // SCREEN 82: SUCCESS STATE - ORDER PLACED
    // ==========================================
    const s82 = figma.createFrame();
    s82.name = "82-Success-Order-Placed";
    s82.resize(W, H);
    s82.x = x;
    s82.y = y;
    s82.fills = [{type: 'SOLID', color: C.white}];
    
    // Confetti effect (simplified)
    for (let i = 0; i < 20; i++) {
      const confetti = figma.createRectangle();
      confetti.resize(8, 8);
      confetti.x = Math.random() * W;
      confetti.y = Math.random() * 400;
      confetti.cornerRadius = 2;
      const colors = [C.yellow, C.teal, C.red, C.green];
      confetti.fills = [{type: 'SOLID', color: colors[Math.floor(Math.random() * colors.length)]}];
      confetti.rotation = Math.random() * 360;
      s82.appendChild(confetti);
    }
    
    const successCircle2 = figma.createEllipse();
    successCircle2.resize(140, 140);
    successCircle2.x = (W - 140) / 2;
    successCircle2.y = 250;
    successCircle2.fills = [{type: 'SOLID', color: C.green, opacity: 0.2}];
    s82.appendChild(successCircle2);
    
    const successCheckIcon2 = figma.createEllipse();
    successCheckIcon2.resize(100, 100);
    successCheckIcon2.x = (W - 100) / 2;
    successCheckIcon2.y = 270;
    successCheckIcon2.fills = [{type: 'SOLID', color: C.green}];
    s82.appendChild(successCheckIcon2);
    txt(s82, "✓", 175, 297, 60, C.white, "Bold");
    
    txt(s82, "Order Placed Successfully!", 65, 450, 22, C.text, "Bold");
    txt(s82, "Your delicious food is on the way!", 65, 485, 15, C.gray, "Regular");
    
    txt(s82, "Order #BK12345", 130, 530, 16, C.teal, "Bold");
    txt(s82, "Estimated: 25-30 minutes", 105, 555, 14, C.gray, "Regular");
    
    btn(s82, "TrackOrderNow-CLICK", 30, 620, 315, 55, C.yellow, "Track Order", 18); // YELLOW
    txt(s82, "Track Order", 130, 638, 18, C.white, "Bold");
    
    const backHome3 = figma.createRectangle();
    backHome3.name = "BackHome3-CLICK";
    backHome3.resize(315, 50);
    backHome3.x = 30;
    backHome3.y = 690;
    backHome3.cornerRadius = 25;
    backHome3.fills = [{type: 'SOLID', color: C.lightBg}];
    s82.appendChild(backHome3);
    txt(s82, "Continue Shopping", 105, 707, 16, C.text, "Regular");
    
    targetPage.appendChild(s82);
    screens.push(s82);
    x += W + G;
    
    // ==========================================
    // SCREEN 83: ONBOARDING - FINAL SCREEN
    // ==========================================
    const s83 = figma.createFrame();
    s83.name = "83-Onboarding-Final";
    s83.resize(W, H);
    s83.x = x;
    s83.y = y;
    s83.fills = [{type: 'SOLID', color: C.white}];
    
    img(s83, 87, 150, 200, 200, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38");
    
    txt(s83, "Welcome to BasKhao! 🎉", 75, 380, 22, C.text, "Bold");
    txt(s83, "Your food journey starts here", 80, 415, 15, C.gray, "Regular");
    
    const onboardingFeatures = [
      "✓ 1000+ restaurants at your fingertips",
      "✓ Real-time order tracking",
      "✓ Fast & contactless delivery",
      "✓ Exclusive deals & rewards"
    ];
    
    let onboardY = 460;
    for (const feat of onboardingFeatures) {
      txt(s83, feat, 30, onboardY, 14, C.gray, "Regular");
      onboardY += 35;
    }
    
    // Progress dots
    const dot1 = figma.createEllipse();
    dot1.resize(10, 10);
    dot1.x = 150;
    dot1.y = 640;
    dot1.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s83.appendChild(dot1);
    
    const dot2 = figma.createEllipse();
    dot2.resize(10, 10);
    dot2.x = 170;
    dot2.y = 640;
    dot2.fills = [{type: 'SOLID', color: C.gray, opacity: 0.3}];
    s83.appendChild(dot2);
    
    const dot3 = figma.createEllipse();
    dot3.resize(10, 10);
    dot3.x = 190;
    dot3.y = 640;
    dot3.fills = [{type: 'SOLID', color: C.teal}];
    s83.appendChild(dot3);
    
    btn(s83, "GetStarted-CLICK", 30, 690, 315, 55, C.yellow, "Get Started", 18); // YELLOW
    txt(s83, "Get Started", 130, 708, 18, C.white, "Bold");
    
    const skipBtn2 = figma.createText();
    skipBtn2.name = "SkipOnboarding-CLICK";
    skipBtn2.fontName = { family: "Inter", style: "Bold" };
    skipBtn2.characters = "Skip";
    skipBtn2.fontSize = 14;
    skipBtn2.fills = [{type: 'SOLID', color: C.gray}];
    skipBtn2.x = 172;
    skipBtn2.y = 760;
    s83.appendChild(skipBtn2);
    
    targetPage.appendChild(s83);
    screens.push(s83);
    x += W + G;
    
    // ==========================================
    // FINAL: ORGANIZE AND NOTIFY
    // ==========================================
        // ========================================
    // COMPLETE INTENSIVE PROTOTYPING
    // ========================================
        // ========================================
    // COMPLETE INTENSIVE PROTOTYPING - FIXED
    // ========================================
    
    // ========================================
// COMPLETE PROTOTYPING - ALL SCREENS
// ========================================
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
try {
  const startScreen = screens.find(s => s.name === '01-Splash');
  if (startScreen) {
    figma.currentPage.flowStartingPoints = [{ nodeId: startScreen.id, name: 'App Flow' }];
  }
} catch (e) {}

figma.notify('✅ All prototyping complete! 🎉');



        // ========================================
    // AUTO-ADD STATUS BAR & BOTTOM NAV TO ALL SCREENS
    // ========================================
    
    figma.notify('📱 Adding mobile UI elements...');
    
    function addStatusBarToScreen(screen) {
      const existing = screen.findOne(n => n.name === "StatusBar");
      if (existing) return;
      
      const statusBar = figma.createRectangle();
      statusBar.name = "StatusBar";
      statusBar.resize(W, 44);
      statusBar.x = 0;
      statusBar.y = 0;
      statusBar.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
      screen.insertChild(0, statusBar);
      
      const timeText = figma.createText();
      timeText.name = "StatusBarTime";
      timeText.fontName = { family: "Inter", style: "Bold" };
      timeText.characters = "9:41";
      timeText.fontSize = 14;
      timeText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      timeText.x = 20;
      timeText.y = 14;
      screen.appendChild(timeText);
      
      // WIFI ICON - with NAMES
      const wifi1 = figma.createEllipse();
      wifi1.name = "wifi1"; // NAMED!
      wifi1.resize(6, 6);
      wifi1.x = 298;
      wifi1.y = 20;
      wifi1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      screen.appendChild(wifi1);
      
      const wifi2 = figma.createEllipse();
      wifi2.name = "wifi2"; // NAMED!
      wifi2.resize(10, 10);
      wifi2.x = 296;
      wifi2.y = 17;
      wifi2.fills = [];
      wifi2.strokes = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      wifi2.strokeWeight = 1.5;
      wifi2.arcData = {startingAngle: 0.7, endingAngle: 2.4, innerRadius: 0.5};
      screen.appendChild(wifi2);
      
      const wifi3 = figma.createEllipse();
      wifi3.name = "wifi3"; // NAMED!
      wifi3.resize(14, 14);
      wifi3.x = 294;
      wifi3.y = 15;
      wifi3.fills = [];
      wifi3.strokes = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      wifi3.strokeWeight = 1.5;
      wifi3.arcData = {startingAngle: 0.7, endingAngle: 2.4, innerRadius: 0.6};
      screen.appendChild(wifi3);
      
      // SIGNAL BARS - with NAMES
      const bar1 = figma.createRectangle();
      bar1.name = "signalbar1"; // NAMED!
      bar1.x = 318;
      bar1.y = 24;
      bar1.resize(3, 6);
      bar1.cornerRadius = 1;
      bar1.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      screen.appendChild(bar1);
      
      const bar2 = figma.createRectangle();
      bar2.name = "signalbar2"; // NAMED!
      bar2.x = 322;
      bar2.y = 21;
      bar2.resize(3, 9);
      bar2.cornerRadius = 1;
      bar2.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      screen.appendChild(bar2);
      
      const bar3 = figma.createRectangle();
      bar3.name = "signalbar3"; // NAMED!
      bar3.x = 326;
      bar3.y = 18;
      bar3.resize(3, 12);
      bar3.cornerRadius = 1;
      bar3.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      screen.appendChild(bar3);
      
      const bar4 = figma.createRectangle();
      bar4.name = "signalbar4"; // NAMED!
      bar4.x = 330;
      bar4.y = 15;
      bar4.resize(3, 15);
      bar4.cornerRadius = 1;
      bar4.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      screen.appendChild(bar4);
      
      // BATTERY ICON - with NAMES
      const batteryBody = figma.createRectangle();
      batteryBody.name = "batteryBody"; // NAMED!
      batteryBody.x = 343;
      batteryBody.y = 16;
      batteryBody.resize(20, 10);
      batteryBody.cornerRadius = 2;
      batteryBody.fills = [];
      batteryBody.strokes = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      batteryBody.strokeWeight = 1.5;
      screen.appendChild(batteryBody);
      
      const batteryFill = figma.createRectangle();
      batteryFill.name = "batteryFill"; // NAMED!
      batteryFill.x = 345;
      batteryFill.y = 18;
      batteryFill.resize(14, 6);
      batteryFill.cornerRadius = 1;
      batteryFill.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      screen.appendChild(batteryFill);
      
      const batteryTip = figma.createRectangle();
      batteryTip.name = "batteryTip"; // NAMED!
      batteryTip.x = 363;
      batteryTip.y = 19;
      batteryTip.resize(2, 4);
      batteryTip.cornerRadius = 1;
      batteryTip.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
      screen.appendChild(batteryTip);
      
      // SHIFT EXISTING CONTENT - NOW WITH PROPER NAME CHECKS
      for (const child of screen.children) {
        if (child.name !== "StatusBar" && 
            child.name !== "StatusBarTime" && 
            !child.name.includes("wifi") &&
            !child.name.includes("bar") &&
            !child.name.includes("battery")) {
          child.y = child.y + 44;
        }
      }
    }
    
    
    
    
    function addBottomNavToScreen(screen) {
      // Check if bottom nav already exists
      const existing = screen.findOne(n => n.name === "BottomNav");
      if (existing) return;
      
      // STEP 1: Expand the frame height FIRST (from 812 to 862)
      screen.resize(W, H + 50);
      
      // STEP 2: Now add bottom nav at the NEW bottom position
      const navBar = figma.createRectangle();
      navBar.name = "BottomNav";
      navBar.resize(W, 50);
      navBar.x = 0;
      navBar.y = H; // This is now at 812, which is INSIDE the 862px frame
      navBar.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 0.98}}];
      screen.appendChild(navBar);
      
      // Back button
      const backBtn = figma.createText();
      backBtn.name = "NavBack-CLICK";
      backBtn.fontName = { family: "Inter", style: "Regular" };
      backBtn.characters = "◀";
      backBtn.fontSize = 20;
      backBtn.fills = [{type: 'SOLID', color: {r: 0.3, g: 0.3, b: 0.3}}];
      backBtn.x = 40;
      backBtn.y = H + 15;
      screen.appendChild(backBtn);
      
      // Home button
      const homeBtn = figma.createEllipse();
      homeBtn.name = "NavHome-CLICK";
      homeBtn.resize(40, 40);
      homeBtn.x = (W - 40) / 2;
      homeBtn.y = H + 5;
      homeBtn.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];
      screen.appendChild(homeBtn);
      
      const homeIcon = figma.createText();
      homeIcon.fontName = { family: "Inter", style: "Bold" };
      homeIcon.characters = "⌂";
      homeIcon.fontSize = 20;
      homeIcon.fills = [{type: 'SOLID', color: {r: 0.3, g: 0.3, b: 0.3}}];
      homeIcon.x = (W - 40) / 2 + 10;
      homeIcon.y = H + 15;
      screen.appendChild(homeIcon);
      
      // Multitask button
      const multiBtn = figma.createText();
      multiBtn.name = "NavMulti-CLICK";
      multiBtn.fontName = { family: "Inter", style: "Regular" };
      multiBtn.characters = "▢";
      multiBtn.fontSize = 20;
      multiBtn.fills = [{type: 'SOLID', color: {r: 0.3, g: 0.3, b: 0.3}}];
      multiBtn.x = W - 60;
      multiBtn.y = H + 15;
      screen.appendChild(multiBtn);
    }
    
    
    
    
    // Apply to all screens
    for (const screen of screens) {
      addStatusBarToScreen(screen);
      addBottomNavToScreen(screen);
    }

    // ========================================
    // FINALIZE
    // ========================================
        // ========================================
    // FINALIZE
    // ========================================
    
    figma.notify('✅ Finalizing screens...');
    
    figma.currentPage.selection = screens;
    figma.viewport.scrollAndZoomIntoView(screens);
    
    figma.notify('🎉 Complete! ' + screens.length + ' screens created with mobile UI!');
    
    figma.closePlugin('✅ All screens ready!');
  }
};

figma.ui.postMessage({ type: 'ready' });


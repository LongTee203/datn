import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ÄÄƒng kÃ½ | PetCareShop",
  description: "Táº¡o tÃ i khoáº£n PetCareShop vÃ  báº¯t Ä‘áº§u hÃ nh trÃ¬nh chÄƒm sÃ³c thÃº cÆ°ng cá»§a báº¡n.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ color: "#00362a" }}>
      {/* â”€â”€ Back to home link â”€â”€ */}
      <div className="absolute top-6 right-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "#2f6555" }}
        >
          <span className="material-symbols-outlined text-lg">west</span>
          <span>Quay láº¡i trang chá»§</span>
        </Link>
      </div>

      {/* â”€â”€ Main Content â”€â”€ */}
      <main
        className="flex-grow flex items-center justify-center p-6 md:p-12 lg:p-24"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* â”€â”€ Left: Branding & Illustration â”€â”€ */}
          <div className="hidden md:flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">pets</span>
                </div>
                <div className="text-2xl font-black text-primary tracking-tighter">
                  PetCare<span className="text-secondary font-light">Shop</span>
                </div>
              </div>
              <h1
                className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter font-headline"
                style={{ color: "#00362a" }}
              >
                Khá»Ÿi Ä‘áº§u hÃ nh trÃ¬nh <br />
                <span style={{ color: "#29664c" }}>chÄƒm sÃ³c táº­n tÃ¢m.</span>
              </h1>
              <p className="text-lg max-w-md" style={{ color: "#2f6555" }}>
                Tham gia cá»™ng Ä‘á»“ng yÃªu thÃº cÆ°ng Ä‘á»ƒ nháº­n Ä‘Æ°á»£c nhá»¯ng dá»‹ch vá»¥
                chÄƒm sÃ³c há»¯u cÆ¡ vÃ  chuyÃªn nghiá»‡p nháº¥t cho ngÆ°á»i báº¡n bá»‘n chÃ¢n
                cá»§a báº¡n.
              </p>
            </div>

            {/* Hero image with overlap card */}
            <div className="relative pt-12">
              <div
                className="absolute -top-4 -left-4 w-32 h-32 rounded-full opacity-50 blur-3xl"
                style={{ backgroundColor: "#a0f4c8" }}
              />
              <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/5]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvw1Y99xt5GzC-IPCYa1XfWDhul69GDamrT14uy8sD0e9m5xPbSt0d0DbSag9beg2BziZ2Jpn7ICwYnrxo0TXIer2ve7u6u7P3GV0biEbPXbdJPIMI2rdUOPw84ogwGtkBHrjMmgCaFT53DSlXLgvyq1CYjgxNMyOnTS_eM5DMFTYFdAA2diqnGSjkY1mCysGsjkilsLE3Wyq6-I14RszOleoPYv8GYOSyYjP8i3mtgk6NGSwv1EmDjW2nyhonfuh0tX1DZKkDbEng"
                  alt="A friendly golden retriever puppy sitting in a sunlit garden"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlapping stats card */}
              <div
                className="absolute -bottom-6 -right-6 p-6 rounded-lg shadow-xl flex items-center gap-4"
                style={{ backgroundColor: "#b9f9d6" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#29664c", color: "#c8ffe0" }}
                >
                  <span className="material-symbols-outlined">pets</span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#246147" }}>
                    HÆ¡n 5000+
                  </p>
                  <p className="text-xs opacity-80" style={{ color: "#246147" }}>
                    ThÃº cÆ°ng háº¡nh phÃºc
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* â”€â”€ Right: Registration Form â”€â”€ */}
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h2
                className="text-3xl font-bold mb-2 font-headline"
                style={{ color: "#00362a" }}
              >
                ÄÄƒng kÃ½ tÃ i khoáº£n
              </h2>
              <p style={{ color: "#2f6555" }}>
                Vui lÃ²ng Ä‘iá»n thÃ´ng tin Ä‘á»ƒ báº¯t Ä‘áº§u
              </p>
            </div>

            <form className="space-y-5" action="#" method="post">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-name"
                  className="text-sm font-semibold ml-4"
                  style={{ color: "#00362a" }}
                >
                  Há» vÃ  tÃªn
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#4b8170]">
                    person
                  </span>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="Nguyá»…n VÄƒn A"
                    className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-[#4b8170]"
                    style={{ backgroundColor: "#bffee8", color: "#00362a" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-email"
                  className="text-sm font-semibold ml-4"
                  style={{ color: "#00362a" }}
                >
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#4b8170]">
                    mail
                  </span>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="email@example.com"
                    className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-[#4b8170]"
                    style={{ backgroundColor: "#bffee8", color: "#00362a" }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-phone"
                  className="text-sm font-semibold ml-4"
                  style={{ color: "#00362a" }}
                >
                  Sá»‘ Ä‘iá»‡n thoáº¡i
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#4b8170]">
                    call
                  </span>
                  <input
                    id="reg-phone"
                    type="tel"
                    placeholder="0901 234 567"
                    className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-[#4b8170]"
                    style={{ backgroundColor: "#bffee8", color: "#00362a" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-password"
                  className="text-sm font-semibold ml-4"
                  style={{ color: "#00362a" }}
                >
                  Máº­t kháº©u
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#4b8170]">
                    lock
                  </span>
                  <input
                    id="reg-password"
                    type="password"
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    className="w-full pl-14 pr-12 py-4 rounded-full border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    style={{ backgroundColor: "#bffee8", color: "#00362a" }}
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-[#4b8170] cursor-pointer hover:text-primary">
                    visibility_off
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-confirm"
                  className="text-sm font-semibold ml-4"
                  style={{ color: "#00362a" }}
                >
                  XÃ¡c nháº­n máº­t kháº©u
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#4b8170]">
                    lock_reset
                  </span>
                  <input
                    id="reg-confirm"
                    type="password"
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    style={{ backgroundColor: "#bffee8", color: "#00362a" }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg"
                  style={{
                    backgroundColor: "#29664c",
                    color: "#c8ffe0",
                    boxShadow: "0 10px 15px -3px rgba(41,102,76,0.20)",
                  }}
                >
                  ÄÄƒng kÃ½
                </button>
              </div>

              {/* Login link */}
              <div className="text-center pt-6">
                <p style={{ color: "#2f6555" }}>
                  ÄÃ£ cÃ³ tÃ i khoáº£n?{" "}
                  <Link
                    href="/login"
                    className="font-bold hover:underline ml-1"
                    style={{ color: "#29664c" }}
                  >
                    ÄÄƒng nháº­p
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* â”€â”€ Auth Footer â”€â”€ */}
      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-emerald-50">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold text-primary font-headline flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-xl">pets</span>
            PetCare<span className="text-secondary font-light">Shop</span>
          </div>
          <p className="opacity-80 text-sm text-emerald-800">
            Â© 2024 PetCareShop. Nurturing with intention.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-700/70">
          {["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"].map(
            (item) => (
              <a key={item} href="#" className="hover:text-orange-500 transition-colors">
                {item}
              </a>
            )
          )}
        </div>
      </footer>
    </div>
  );
}


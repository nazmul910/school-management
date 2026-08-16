"use client"

import { useEffect, useRef, useState } from "react";
import { LuClock, LuX } from "react-icons/lu";


interface Timings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerData {
  timings: Timings;
  readableDate: string;
  hijriMonth: string;
  hijriYear: string;
}

const PRAYER_KEYS: (keyof Timings)[] = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];

const BANGLA_NAMES: Record<keyof Timings, string> = {
  Fajr: "ফজর",
  Dhuhr: "যোহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "ইশা",
};

function toAmPm(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getCurrentPrayer(timings: Timings): keyof Timings | null {
  const now = nowMinutes();
  let cur: keyof Timings | null = null;
  for (const k of PRAYER_KEYS) {
    const [h, m] = timings[k].split(":").map(Number);
    if (h * 60 + m <= now) cur = k;
  }
  return cur;
}

function getNextPrayer(timings: Timings) {
  const now = nowMinutes();
  for (const k of PRAYER_KEYS) {
    const [h, m] = timings[k].split(":").map(Number);
    if (h * 60 + m > now)
      return { name: BANGLA_NAMES[k], time: toAmPm(timings[k]) };
  }
  return { name: BANGLA_NAMES["Fajr"], time: toAmPm(timings["Fajr"]) };
}

function PrayerWidget() {
  const [data, setData] = useState<PrayerData | null>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // controls animation state
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
    requestAnimationFrame(() => setVisible(true));
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const fetchTimes = async () => {
      setLoading(true);
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${dd}-${mm}-${yyyy}?city=Dhaka&country=Bangladesh&method=2`,
        );
        const json = await res.json();
        const t = json.data.timings;
        const d = json.data.date;
        setData({
          timings: {
            Fajr: t.Fajr,
            Dhuhr: t.Dhuhr,
            Asr: t.Asr,
            Maghrib: t.Maghrib,
            Isha: t.Isha,
          },
          readableDate: d.readable,
          hijriMonth: d.hijri.month.en,
          hijriYear: d.hijri.year,
        });
      } catch {

      } finally {
        setLoading(false);
      }
    };
    fetchTimes();
  }, []);

  const currentPrayer = data ? getCurrentPrayer(data.timings) : null;
  const nextPrayer = data ? getNextPrayer(data.timings) : null;

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 bg-[#ffd54f] hover:bg-primary text-white duration-300 font-semibold text-sm px-5 py-3 rounded-t-xl transition-colors"
      >
        <LuClock size={16} />
        নামাজের সময়
      </button>

      {open && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center px-4 transition-all duration-300 ease-out ${
            visible
              ? "bg-black/50 backdrop-blur-sm opacity-100"
              : "bg-black/0 backdrop-blur-0 opacity-0"
          }`}
        >
          <div
            ref={ref}
            className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out ${
              visible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-primary transition-colors duration-200"
            >
              <LuX size={18} />
            </button>

            {loading ? (
              <div className="p-10 text-center text-sm text-gray-400">
                লোড হচ্ছে...
              </div>
            ) : data ? (
              <>
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-50">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-xl">
                    🕌
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      নামাজের সময়সূচি
                    </p>
                    <p className="text-xs text-gray-400">
                      {data.readableDate} • {data.hijriMonth} {data.hijriYear}{" "}
                      AH
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3">
                  {PRAYER_KEYS.map((key) => {
                    const isActive = key === currentPrayer;
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"
                      >
                        <span
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-amber-500 font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          {BANGLA_NAMES[key]}
                        </span>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            isActive
                              ? "bg-amber-50 text-amber-500"
                              : "bg-slate-50 text-primary"
                          }`}
                        >
                          {toAmPm(data.timings[key])}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {nextPrayer && (
                  <div className="mx-5 mb-5 bg-amber-400 rounded-xl px-4 py-3 flex justify-between items-center">
                    <span className="text-xs text-amber-900 font-semibold">
                      পরবর্তী নামাজ
                    </span>
                    <span className="text-sm text-amber-900 font-bold">
                      {nextPrayer.name} — {nextPrayer.time}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-10 text-center text-sm text-red-400">
                তথ্য লোড করা যায়নি।
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}


export default PrayerWidget;
export type Coord = { r: number; c: number };

export type TourState =
    | "idle"        // هنوز شروع نشده / انتخاب آغاز
    | "computing"   // در حال محاسبه مسیر
    | "ready"       // مسیر آماده است
    | "playing"     // در حال پخش انیمیشن
    | "paused"      // انیمیشن متوقف شده
    | "done"        // پایان پخش
    | "failed";     // مسیر پیدا نشد (بعید در 8×8)

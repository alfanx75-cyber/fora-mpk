import { Aspiration, AspirationCategory, CategoryInfo, StatusInfo } from '../types';

export const MPK_INSTAGRAM_URL = "https://www.instagram.com/mpk_sman1kebumen?stkn=bHZhbGltdjMxYzZh";
export const MPK_INSTAGRAM_HANDLE = "@mpk_sman1kebumen";
export const MPK_EMAIL = "mpksmanegeri1kebumen@gmail.com";

export const CATEGORIES: CategoryInfo[] = [
  { id: 'fasilitas', name: 'Fasilitas', icon: 'fasilitas', bgColor: '#ffd9e1' },
  { id: 'kantin', name: 'Kantin', icon: 'kantin', bgColor: '#ffe340' },
  { id: 'akademik', name: 'Akademik', icon: 'akademik', bgColor: '#dbe1ff' },
  { id: 'event', name: 'Event & Ekskul', icon: 'event', bgColor: '#ffd9e1' },
  { id: 'transportasi', name: 'Transportasi', icon: 'transportasi', bgColor: '#ffb1c6' },
  { id: 'kebersihan', name: 'Kebersihan', icon: 'kebersihan', bgColor: '#21D99A' },
  { id: 'ide_baru', name: 'Ide Baru', icon: 'ide_baru', bgColor: '#ffe340' },
  { id: 'lainnya', name: 'Lainnya', icon: 'lainnya', bgColor: '#dbe1ff' },
];

export const STATUS_MAP: Record<string, StatusInfo> = {
  submitted: {
    id: 'submitted',
    label: 'DIKIRIM',
    number: '01',
    icon: 'forward_to_inbox',
    color: '#ffb1c6',
    badgeBg: 'bg-[#ffd9e1]',
    textColor: 'text-[#111111]',
    description: 'Aspirasi telah masuk ke sistem FORA dan siap diverifikasi oleh Komisi 3 (KOASITER).',
  },
  received: {
    id: 'received',
    label: 'DITERIMA',
    number: '02',
    icon: 'task_alt',
    color: '#316bf3',
    badgeBg: 'bg-[#dbe1ff]',
    textColor: 'text-[#111111]',
    description: 'Terverifikasi valid dan telah dimasukkan dalam agenda pembahasan komisi terkait.',
  },
  discussed: {
    id: 'discussed',
    label: 'DIBAHAS',
    number: '03',
    icon: 'forum',
    color: '#fde029',
    badgeBg: 'bg-[#fde029]',
    textColor: 'text-[#111111]',
    description: 'Sedang dibahas dalam Rapat Dengar Pendapat MPK bersama pengurus dan pihak sekolah.',
  },
  follow_up: {
    id: 'follow_up',
    label: 'DITINDAKLANJUTI',
    number: '04',
    icon: 'trending_up',
    color: '#FF7A30',
    badgeBg: 'bg-[#FF7A30] text-white',
    textColor: 'text-white',
    description: 'Diserahkan sebagai nota dinas dan audiensi resmi kepada pihak sekolah.',
  },
  completed: {
    id: 'completed',
    label: 'SELESAI',
    number: '05',
    icon: 'verified',
    color: '#21D99A',
    badgeBg: 'bg-[#21D99A]',
    textColor: 'text-[#111111]',
    description: 'Aspirasi telah tuntas ditindaklanjuti dan terealisasi menjadi kebijakan atau perbaikan nyata.',
  },
};

// Data aspirasi dimulai dari kosong sesuai pengisian real yang akan datang
export const INITIAL_ASPIRATIONS: Aspiration[] = [];

export const INTI_OFFICERS = {
  ketua: {
    name: 'Aura Pinasti',
    role: 'Ketua MPK',
    class: 'XI G',
    phone: '+62 821-3727-7601',
    whatsapp: '6282137277601',
    badge: 'KETUA MPK',
    badgeBg: '#ffd9e1',
    avatar: 'AP',
    quote: 'Aspirasi, Realisasi, Inovasi: Mengawal hak dan kenyamanan belajar seluruh siswa SMAN 1 Kebumen.',
  },
  wakilKetua: {
    name: 'Nadya Tifani',
    role: 'Wakil Ketua MPK',
    class: 'XI B',
    phone: '+62 813-9377-5392',
    whatsapp: '6281393775392',
    badge: 'WAKIL KETUA',
    badgeBg: '#ffe340',
    avatar: 'NT',
    quote: 'Jembatan independen dan transparan antara siswa dan kebijakan sekolah.',
  },
  sekretaris: [
    'Kayla Nur Hidayati',
    'Najmia Nur Al Fiks',
    'Tata Annisah Utami',
  ],
  bendahara: [
    'Chanifatul Marwah Rachmawati',
    'Dzaky Hisyam A.',
    'Nayla Septiana',
  ],
};

export const MPK_MEMBERS = [
  {
    name: 'Aura Pinasti',
    role: 'Ketua MPK',
    division: 'INTI (BPH)',
    class: 'XI G',
    phone: '+62 821-3727-7601',
    whatsapp: '6282137277601',
    badge: 'KETUA MPK',
    badgeBg: '#ffd9e1',
    quote: 'Aspirasi, Realisasi, Inovasi: Mengawal hak dan kenyamanan belajar seluruh siswa SMAN 1 Kebumen.',
    avatar: 'AP',
  },
  {
    name: 'Nadya Tifani',
    role: 'Wakil Ketua MPK',
    division: 'INTI (BPH)',
    class: 'XI B',
    phone: '+62 813-9377-5392',
    whatsapp: '6281393775392',
    badge: 'WAKIL KETUA',
    badgeBg: '#ffe340',
    quote: 'Jembatan independen dan transparan antara siswa dan kebijakan sekolah.',
    avatar: 'NT',
  },
  {
    name: 'Aditya Wirawan',
    role: 'Ketua Komisi 1 (KONSTRAKUM)',
    division: 'KOMISI 1',
    class: 'XI MIPA 3',
    badge: 'KONSTRAKUM',
    badgeBg: '#dbe1ff',
    quote: 'Menyusun, melaksanakan, dan mengevaluasi program serta kebijakan di MPK secara strategis.',
    avatar: 'AW',
  },
  {
    name: 'Clara Anindya',
    role: 'Ketua Komisi 2 (KONSTADIP)',
    division: 'KOMISI 2',
    class: 'XI IPS 1',
    badge: 'KONSTADIP',
    badgeBg: '#21D99A',
    quote: 'Menjaga tata tertib dan stabilitas agar lingkungan belajar selalu nyaman dan kondusif.',
    avatar: 'CA',
  },
  {
    name: 'Bintang Ramadhan',
    role: 'Ketua Komisi 3 (KOASITER)',
    division: 'KOMISI 3',
    class: 'XI MIPA 2',
    badge: 'KOASITER',
    badgeBg: '#fde029',
    quote: 'Menampung, menyalurkan, serta mengawal setiap suara siswa agar tersampaikan dengan baik.',
    avatar: 'BR',
  },
  {
    name: 'Syifa Azzahra',
    role: 'Ketua Komisi 4 (KOMWASEV)',
    division: 'KOMISI 4',
    class: 'XI IPS 3',
    badge: 'KOMWASEV',
    badgeBg: '#FF7A30',
    quote: 'Mengawasi pelaksanaan kegiatan OSIS, MPK, dan ekskul agar berjalan efektif dan sesuai tujuan.',
    avatar: 'SA',
  },
  {
    name: 'Dimas Prasetya',
    role: 'Ketua Komisi 5 (KOMSIPUSOS)',
    division: 'KOMISI 5',
    class: 'X-2',
    badge: 'KOMSIPUSOS',
    badgeBg: '#ffd9e1',
    quote: 'Mendokumentasikan dan menyebarkan informasi kegiatan MPK dan SMANSA secara terbuka.',
    avatar: 'DP',
  },
];

export const FAQS = [
  {
    q: 'Apakah aspirasi yang saya kirim benar-benar dibaca pihak sekolah?',
    a: 'Ya, setiap aspirasi yang masuk ke FORA otomatis diverifikasi Komisi 3 (KOASITER) MPK dan dibawa ke agenda rapat bersama pihak pimpinan dan komite sekolah. Anda dapat memantau nomor tiket secara real-time.',
  },
  {
    q: 'Apakah opsi kirim anonim aman?',
    a: 'Sangat aman. Jika Anda memilih opsi "Kirim sebagai Anonim", identitas nama dan kelas tidak akan ditampilkan pada daftar publik ataupun pada nota dinas MPK. Kerahasiaan pelapor terjaga.',
  },
  {
    q: 'Berapa lama rata-rata aspirasi mendapatkan tanggapan resmi?',
    a: 'Tanggapan dan verifikasi awal diberikan dalam waktu 1x24 jam hari kerja. Aspirasi yang memerlukan tindak lanjut teknis atau sarana prasarana akan diperbarui berkala statusnya.',
  },
  {
    q: 'Bagaimana cara mendukung aspirasi siswa lain?',
    a: 'Cukup klik tombol "Dukungan" pada kartu aspirasi. Tingkat dukungan membantu MPK menentukan prioritas penyaluran aspirasi ke pihak sekolah.',
  },
];

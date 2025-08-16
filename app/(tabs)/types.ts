export type ScreenType = 'dashboard' | 'predict' | 'imagePreview' | 'result' | 'detailResult' | 'history' | 'about' | 'chatbot';

export type PredictionResult = {
  disease: string;
  accuracy: string;
  symptoms: string;
  treatment: string;
  class_index: number;
};

export type HistoryItem = {
  id: number;
  disease: string;
  date: string;
  accuracy: string;
  image: string;
  symptoms: string;
  treatment: string;
};

export const API_BASE_URL = 'https://rawitsehat-production.up.railway.app/';

export const diseaseInfo = {
  'Leaf Curl': {
    symptoms: `Penyakit keriting daun pada cabai dapat disebabkan oleh banyak faktor seperti kekurangan air, kekurangan nutrisi, kurang perawatan, kondisi benih dan bibit selama pembibitan dan hama. Keriting pada daun cabai bisa disebabkan oleh serangan hama atau disebut organisme pengganggu tanaman (OPT) yang bukanlah virus, jamur ataupun bakteri. Hama penyebab keriting daun tergolong dalam jenis kutu-kutuan, yakni thrips, tungau, dan aphids.`,
    treatment: `Pengobatan Keriting Daun:

Hari Pertama (Kocor 200 liter air):
- Kalsium karbonat tunggal 2 kg

Hari Kedua (Kocor 200 liter air):
- NPK Sprinter atau Yara Faster 2 kg
- Ultradap 1 kg
- Karate Boroni 1 kg
- Premino 500 ml

Hari Ketiga:
- Agrimec 2 sendok
- Avidor 2 sendok
- Perekat 2 sendok
- AgroValcan 30 ml

Hari Keempat (Spray 16 liter air):
- Premino 1 tutup per tangki
- Perekat 2 sendok
- Vitaron 1 tutup
- Morden Foll 2 tutup`
  },
  'Yellowish': {
    symptoms: `Virus gemini ditularkan oleh hama kutu kebul. Gejala serangan virus gemini pada tanaman cabai bisa dilihat dari bagian daunnya. Helai daun mengalami vein clearing dari pucuk, berubah kuning, tulang daun menebal, dan daun menggulung ke atas. Infeksi lanjut membuat daun mengecek dan tanaman kerdil.`,
    treatment: `Pengobatan Virus Gemini:

Hari Pertama (Kocor 200 liter air):
- Kalsium karbonat tunggal 2 kg

Hari Kedua (Kocor 200 liter air):
- NPK Sprinter atau Yara Faster 2 kg
- Ultradap 1 kg
- Karate Boroni 1 kg
- Premino 500 ml

Hari Ketiga (Spray 16 liter air):
- Dhitane 2 sendok
- Avidor 2 sendok
- Perekat 2 sendok
- AgroValcan 50 ml

Hari Keempat (Spray 16 liter air):
- Premino 1 tutup per tangki
- Perekat 2 sendok
- Vitaron 1 tutup
- Morden Foll 2 tutup`
  },
  'Leaf Spot': {
    symptoms: `Penyakit bercak daun cabai distimulir oleh kondisi lembab dan suhu relatif tinggi. Dapat menyerang dari persemaian sampai tanaman berbuah. Serangan jamur berkembang pesat pada musim hujan dengan kelembaban tinggi.`,
    treatment: `Pengobatan Bercak Daun:

Hari Pertama (Kocor 200 liter air):
- Kalsium Karbonat 2 kg
- Asam humat 500 gram

Hari Kedua (Spray 16 liter air):
- Premino 1 tutup per tangki
- Perekat 2 sendok

Hari Ketiga (Spray 16 liter air):
- Fungisida Sagribat 2 sendok
- Perekat 2 sendok

Hari Keempat (Spray 16 liter air):
- Demolish 2,5 sendok
- Vitaron 1 tutup
- Provit hijau 3 sendok
- Perekat 2 sendok`
  },
  'Whitefly': {
    symptoms: `Kutu kebul (Bemisia tabaci) adalah hama utama pada cabai. Serangga kecil putih berkembang di lingkungan panas dan kering. Selain merusak tanaman, kutu kebul juga menularkan virus Gemini.`,
    treatment: `Pengobatan Kutu Kebul:

Hari Pertama (Kocor 200 liter air):
- Kalsium karbonat tunggal 2 kg

Hari Kedua (Kocor 200 liter air):
- NPK Sprinter atau Yara Faster 2 kg
- Ultradap 1 kg
- Karate Boroni 1 kg
- Premino 500 ml

Hari Ketiga (Spray 16 liter air):
- Dhitane 2 sendok
- Avidor 2 sendok
- Perekat 2 sendok
- AgroValcan 50 ml

Hari Keempat (Spray 16 liter air):
- Premino 1 tutup per tangki
- Perekat 2 sendok
- Vitaron 1 tutup
- Morden Foll 2 tutup`
  },
  'Healthy': {
    symptoms: `Daun cabai terlihat sehat dengan warna hijau segar, tanpa adanya bercak, kerusakan, atau kelainan bentuk. Tidak ditemukan gejala penyakit maupun serangan hama pada permukaan maupun bagian bawah daun.`,
    treatment: `Pertahankan perawatan rutin seperti:
- Penyiraman cukup sesuai kebutuhan tanaman
- Pemupukan teratur untuk menjaga kesuburan tanaman
- Pastikan sirkulasi udara di sekitar tanaman tetap baik
Agar daun tetap sehat dan tanaman tumbuh optimal.`
  }
};

export default {};

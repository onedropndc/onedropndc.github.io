/* Geolocation + distance helpers (Haversine).
   Bangladesh district centroids are used as a graceful fallback when a
   donor has not shared precise GPS coordinates. */

export const DISTRICTS = [
  'Dhaka', 'Chattogram', 'Gazipur', 'Narayanganj', 'Khulna', 'Sylhet', 'Rajshahi', 'Barishal',
  'Rangpur', 'Mymensingh', 'Cumilla', 'Cox\u2019s Bazar', 'Bogura', 'Pabna', 'Jashore', 'Dinajpur',
  'Tangail', 'Kishoreganj', 'Faridpur', 'Narsingdi', 'Manikganj', 'Munshiganj', 'Gopalganj',
  'Shariatpur', 'Madaripur', 'Rajbari', 'Narail', 'Jhenaidah', 'Kushtia', 'Chuadanga', 'Meherpur',
  'Magura', 'Bagerhat', 'Satkhira', 'Sirajganj', 'Natore', 'Chapainawabganj', 'Naogaon', 'Joypurhat',
  'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon', 'Habiganj',
  'Moulvibazar', 'Sunamganj', 'Brahmanbaria', 'Chandpur', 'Feni', 'Lakshmipur', 'Noakhali',
  'Bandarban', 'Khagrachari', 'Rangamati', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
  'Netrokona', 'Sherpur', 'Jamalpur'
];

export const DISTRICT_LABELS = Object.fromEntries(DISTRICTS.map((d, i) => [d, ["ঢাকা", "চট্টগ্রাম", "গাজীপুর", "নারায়ণগঞ্জ", "খুলনা", "সিলেট", "রাজশাহী", "বরিশাল", "রংপুর", "ময়মনসিংহ", "কুমিল্লা", "কক্সবাজার", "বগুড়া", "পাবনা", "যশোর", "দিনাজপুর", "টাঙ্গাইল", "কিশোরগঞ্জ", "ফরিদপুর", "নরসিংদী", "মানিকগঞ্জ", "মুন্সিগঞ্জ", "গোপালগঞ্জ", "শরীয়তপুর", "মাদারীপুর", "রাজবাড়ী", "নড়াইল", "ঝিনাইদহ", "কুষ্টিয়া", "চুয়াডাঙ্গা", "মেহেরপুর", "মাগুরা", "বাগেরহাট", "সাতক্ষীরা", "সিরাজগঞ্জ", "নাটোর", "চাঁপাইনবাবগঞ্জ", "নওগাঁ", "জয়পুরহাট", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী", "পঞ্চগড়", "ঠাকুরগাঁও", "হবিগঞ্জ", "মৌলভীবাজার", "সুনামগঞ্জ", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "ফেনী", "লক্ষ্মীপুর", "নোয়াখালী", "বান্দরবান", "খাগড়াছড়ি", "রাঙ্গামাটি", "বরগুনা", "ভোলা", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর", "নেত্রকোণা", "শেরপুর", "জামালপুর"][i]]));

export const DISTRICT_COORDS = {
  'Dhaka': [23.8103, 90.4125], 'Chattogram': [22.3569, 91.7832], 'Gazipur': [23.9999, 90.4203],
  'Narayanganj': [23.6238, 90.5000], 'Khulna': [22.8456, 89.5403], 'Sylhet': [24.8949, 91.8687],
  'Rajshahi': [24.3745, 88.6042], 'Barishal': [22.7010, 90.3535], 'Rangpur': [25.7439, 89.2752],
  'Mymensingh': [24.7471, 90.4203], 'Cumilla': [23.4607, 91.1809], 'Cox\u2019s Bazar': [21.4272, 92.0058],
  'Bogura': [24.8465, 89.3773], 'Pabna': [24.0064, 89.2372], 'Jashore': [23.1697, 89.2137],
  'Dinajpur': [25.6217, 88.6354], 'Tangail': [24.2513, 89.9167], 'Kishoreganj': [24.4449, 90.7766],
  'Faridpur': [23.6070, 89.8429], 'Narsingdi': [23.9322, 90.7150], 'Manikganj': [23.8617, 90.0003],
  'Munshiganj': [23.5422, 90.5305], 'Gopalganj': [23.0052, 89.8266], 'Shariatpur': [23.2423, 90.4308],
  'Madaripur': [23.1641, 90.1897], 'Rajbari': [23.7574, 89.6445], 'Narail': [23.1730, 89.5000],
  'Jhenaidah': [23.5448, 89.1539], 'Kushtia': [23.9013, 89.1205], 'Chuadanga': [23.6402, 88.8587],
  'Meherpur': [23.7623, 88.6722], 'Magura': [23.4873, 89.4199], 'Bagerhat': [22.6516, 89.7859],
  'Satkhira': [22.7085, 89.0705], 'Sirajganj': [24.4533, 89.7006], 'Natore': [24.4206, 89.0000],
  'Chapainawabganj': [24.5962, 88.2776], 'Naogaon': [24.8132, 88.9482], 'Joypurhat': [25.0963, 89.0400],
  'Gaibandha': [25.3288, 89.5280], 'Kurigram': [25.8054, 89.6362], 'Lalmonirhat': [25.9164, 89.4533],
  'Nilphamari': [25.9318, 88.8560], 'Panchagarh': [26.3411, 88.5542], 'Thakurgaon': [26.0337, 88.4617],
  'Habiganj': [24.3745, 91.4155], 'Moulvibazar': [24.4829, 91.7774], 'Sunamganj': [25.0658, 91.3950],
  'Brahmanbaria': [23.9571, 91.1116], 'Chandpur': [23.2333, 90.6667], 'Feni': [23.0159, 91.3976],
  'Lakshmipur': [22.9425, 90.8412], 'Noakhali': [22.8696, 91.0995], 'Bandarban': [22.1953, 92.2184],
  'Khagrachari': [23.1193, 91.9847], 'Rangamati': [22.6394, 92.1729], 'Barguna': [22.1532, 90.1263],
  'Bhola': [22.6850, 90.6300], 'Jhalokati': [22.6413, 90.1976], 'Patuakhali': [22.3596, 90.3290],
  'Pirojpur': [22.5841, 89.9720], 'Netrokona': [24.8706, 90.7279], 'Sherpur': [25.0204, 90.0153],
  'Jamalpur': [24.9375, 89.9378]
};

export function districtCoords(name) {
  return DISTRICT_COORDS[name] || null;
}

/** Haversine distance in km */
export function haversineKm(a, b) {
  if (!a || !b) return null;
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Best-effort coordinates for a donor record */
export function donorCoords(donor) {
  if (donor && donor.lat != null && donor.lng != null && !isNaN(donor.lat) && !isNaN(donor.lng)) {
    return { coords: [donor.lat, donor.lng], precise: donor.locationSource === 'gps' };
  }
  const c = districtCoords(donor && donor.district);
  return c ? { coords: c, precise: false } : null;
}

/** Ask the browser for a position. Resolves null on denial/failure. */
export function getPosition(timeout = 12000) {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) return resolve({ error: 'unsupported' });
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      (err) => resolve({ error: err.code === 1 ? 'denied' : 'unavailable', message: err.message }),
      { enableHighAccuracy: false, timeout, maximumAge: 300000 }
    );
  });
}

export function distanceLabel(km) {
  if (km == null || isNaN(km)) return '';
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  if (km < 10) return `${km.toFixed(1)} km away`;
  return `${Math.round(km)} km away`;
}

/* Local UI translations only. User-generated names, notes, form values and
   contact details are never translated or sent to a translation service. */
import { DISTRICTS, DISTRICT_LABELS } from './geo.js';

const pairs = [
['হোম','Home'],['ডোনার খুঁজুন','Find a donor'],['জরুরি অনুরোধ','Emergency requests'],['রক্তদাতা হোন','Become a donor'],['আমাদের সম্পর্কে','About'],['প্রশ্নোত্তর','FAQ'],['রক্তের অনুরোধ','Request blood'],['খুঁজুন','Find'],['জরুরি','Emergency'],['নিবন্ধন','Register'],['প্রোফাইল','Profile'],
['একসাথে, জীবনের পাশে','Together, for life'],['এক ফোঁটা রক্তে','One drop of blood,'],['বেঁচে উঠুক জীবন।','a chance at life.'],['জরুরি মুহূর্তে সঠিক রক্তদাতা খুঁজুন। অথবা রক্তদাতা হিসেবে যুক্ত হয়ে কারও পাশে দাঁড়ান।','Find a blood donor when it matters. Or join as a donor and be there for someone.'],['Notre Dame College-এর শিক্ষার্থীদের স্বেচ্ছাসেবী উদ্যোগ','A volunteer initiative by Notre Dame College students'],['শুরু করুন এখান থেকে','START HERE'],['রক্তদাতা খুঁজুন','Find a donor'],['রক্তের গ্রুপ ও এলাকা বেছে নিন','Choose a blood group and location'],['রক্তের গ্রুপ','Blood group'],['সব গ্রুপ','All groups'],['জেলা','District'],['সব জেলা','All districts'],['এলাকা / থানা','Area / thana'],['(ঐচ্ছিক)','(optional)'],['এলাকার নাম ডোনারের দেওয়া বানানে লিখুন। না পেলে এলাকা বাদ দিয়ে খুঁজুন।','Use the spelling provided by the donor. If there are no results, search without an area.'],['ডোনার পাননি?','No donor found?'],['জরুরি অনুরোধ করুন →','Post an emergency request →'],['গ্রুপ ও এলাকায় অনুসন্ধান','Search by group and location'],['প্রয়োজনের তথ্য জানান','Share details of the need'],['মানুষের পাশে দাঁড়ান','Stand beside someone in need'],['সরাসরি তথ্য পাওয়া যাচ্ছে না। সংখ্যা ও তালিকা পুরোনো বা অসম্পূর্ণ হতে পারে।','Live data is unavailable. Counts and listings may be outdated or incomplete.'],['রক্তের প্রয়োজনে পাশে দাঁড়ান','Help someone waiting for blood'],['প্রকাশিত অনুরোধ দেখুন। যোগাযোগের আগে হাসপাতালের সঙ্গে তথ্য নিশ্চিত করুন।','Browse published requests. Confirm the details with the hospital before contacting anyone.'],['সব অনুরোধ দেখুন →','View all requests →'],['আমাদের কমিউনিটি','OUR COMMUNITY'],['একসাথে আরও অনেক দূর','Together, we can go further'],['গ্রুপ দিয়ে শুরু করুন','START WITH A BLOOD GROUP'],['কোন গ্রুপের রক্ত প্রয়োজন?','Which blood group is needed?'],['সহজ তিনটি ধাপ','THREE SIMPLE STEPS'],['একটি অনুরোধ থেকে সহযোগিতা','From a request to a helping hand'],['সচেতন থাকুন','STAY INFORMED'],['যোগাযোগের আগে তথ্য নিশ্চিত করুন','Confirm the details before contacting'],['গোপনীয়তা নীতি','privacy policy'],['পড়ুন।','before sharing sensitive information.'],
['These figures move in real time — a new registration, a donor returning from cooling-off, a request marked fulfilled. Behind every number is a person who said, “call me when you need me.”','নতুন নিবন্ধন ও রক্তদাতার বর্তমান অবস্থার সঙ্গে এই সংখ্যাগুলো পরিবর্তিত হয়। প্রতিটি সংখ্যার পেছনে আছেন সাহায্য করতে ইচ্ছুক একজন মানুষ।'],
['Choose a group to open the directory pre-filtered, with a live count of donors currently available.','গ্রুপ বেছে নিয়ে সেই গ্রুপের রক্তদাতাদের তালিকা দেখুন।'],['available','প্রস্তুত'],['Find donors →','ডোনার খুঁজুন →'],['Know before you call','যোগাযোগের আগে জানুন'],['Blood compatibility, in ten seconds','রক্তের গ্রুপের সামঞ্জস্য'],['When an exact match is unavailable, hospitals often accept compatible alternatives. This chart shows who is worth calling first — the final decision always rests with the blood bank.','এই তালিকা রক্তের গ্রুপের প্রাথমিক সামঞ্জস্য বুঝতে সাহায্য করে। রক্ত দেওয়ার চূড়ান্ত সিদ্ধান্ত হাসপাতাল বা ব্লাড ব্যাংকের।'],['Post the need','প্রয়োজন জানান'],['A family member or hospital volunteer posts the patient’s blood group, hospital and the time by which the blood is needed. A moderator reviews the request before it appears on the board.','রোগীর রক্তের গ্রুপ, হাসপাতাল ও প্রয়োজনের সময় দিয়ে অনুরোধ করুন। প্রকাশের আগে মডারেটর তা পর্যালোচনা করবেন।'],['Donors get alerted','সবার কাছে পৌঁছে দিন'],['People browsing the site can see approved requests. Share the request with your community to reach more donors.','অনুমোদিত অনুরোধ সাইটে দেখা যায়। আরও বেশি মানুষের কাছে পৌঁছাতে অনুরোধটি শেয়ার করুন।'],['Confirm and donate','নিশ্চিত করে রক্তদান'],['The requester confirms the requirement with the blood bank, and the donor walks in with an ID. Afterwards the family marks the request fulfilled — which keeps the board honest for the next one.','ব্লাড ব্যাংকের সঙ্গে প্রয়োজন নিশ্চিত করুন। রক্ত পাওয়া গেলে অনুরোধটি পূরণ হয়েছে বলে চিহ্নিত করুন।'],
['One Drop on WhatsApp','WhatsApp-এ One Drop'],['The conversation continues in the community','কমিউনিটিতে যুক্ত থাকুন'],['Not everyone refreshes a website at 2 AM. Our WhatsApp community carries verified emergency requests, donation camps and donor advice to the place people actually look — their phone. Join, mute it if you like, and step in when a request matches your blood group.','আমাদের WhatsApp কমিউনিটিতে জরুরি অনুরোধ, রক্তদান কর্মসূচি ও পরামর্শ শেয়ার করা হয়। ইচ্ছেমতো যুক্ত হতে বা ছেড়ে যেতে পারেন।'],['Verified requests, forwarded minutes after a moderator approves them','পর্যালোচিত জরুরি অনুরোধ'],['Donation camps and drives across Dhaka and beyond','রক্তদান ক্যাম্প ও কার্যক্রমের খবর'],['Ask a question, get an answer from donors who have been there','অভিজ্ঞ রক্তদাতাদের কাছে প্রশ্ন করুন'],['Join the WhatsApp community','WhatsApp কমিউনিটিতে যোগ দিন'],['Copy invite link','লিংক কপি করুন'],['No spam · Leave any time · Read our privacy policy','স্প্যাম নয় · যেকোনো সময় বের হতে পারবেন · গোপনীয়তা নীতি পড়ুন'],['Emergency blood requests · Donation camps · Donor support','জরুরি অনুরোধ · রক্তদান ক্যাম্প · রক্তদাতাদের সহায়তা'],['Join now →','যোগ দিন →'],['Read the policy','নীতি পড়ুন'],['Donation FAQ','সাধারণ প্রশ্ন'],['One donation can save up to three lives','একটি রক্তদান একাধিক মানুষের উপকার করতে পারে'],['One whole-blood donation separates into red cells, plasma and platelets — up to three patients helped by a single ten-minute visit. Your body replaces the fluid within a day; someone else keeps a lifetime.','এক ব্যাগ রক্ত থেকে বিভিন্ন উপাদান তৈরি করে একাধিক রোগীর চিকিৎসায় ব্যবহার করা যেতে পারে।'],['Register as a donor','রক্তদাতা হিসেবে নিবন্ধন করুন'],
['রক্তের গ্রুপ, জেলা ও এলাকা দিয়ে খুঁজুন। ডোনারের সঙ্গে যোগাযোগ করে তথ্য ও প্রাপ্যতা নিশ্চিত করুন।','Search by blood group, district and area. Contact the donor to confirm details and availability.'],['Newest first','নতুন আগে'],['Nearest to me','কাছের ডোনার আগে'],['Blood group','রক্তের গ্রুপ'],['Name (A–Z)','নাম (A–Z)'],['Near me','আমার কাছাকাছি'],['All groups','সব গ্রুপ'],['শুধু প্রস্তুত রক্তদাতা','Available donors only'],['Loading…','লোড হচ্ছে…'],['ফিল্টার মুছুন','Reset filters'],['Show more','আরও দেখুন'],['Distances are approximate: they use the donor’s shared location when available, otherwise the centre of their district. Always confirm the requirement with the hospital blood bank before travelling.','দূরত্ব আনুমানিক। ডোনারের দেওয়া অবস্থান না থাকলে জেলার কেন্দ্র ব্যবহার করা হয়। যাওয়ার আগে ব্লাড ব্যাংকের সঙ্গে প্রয়োজন নিশ্চিত করুন।'],['if you are not on this list yet.','যদি আপনি এখনও তালিকায় না থাকেন।'],['এই ফিল্টারে কোনো রক্তদাতা পাওয়া যায়নি','No donor matches these filters'],['অন্য জেলা বা এলাকা দিয়ে খুঁজুন, অথবা জরুরি অনুরোধ করুন। রক্তদানের যোগ্যতা হাসপাতাল নিশ্চিত করবে।','Try another district or area, or post an emergency request. The hospital will assess donation eligibility.'],['সব ফিল্টার মুছুন','Clear filters'],['জরুরি অনুরোধ করুন','Post an emergency request'],
['Home','হোম'],['Find a donor','রক্তদাতা খুঁজুন'],['Emergency','জরুরি অনুরোধ'],['Emergency blood requests','জরুরি রক্তের অনুরোধ'],['Submit your request for moderator review. Once approved, it appears on the board. Share it with your community to reach more people.','পর্যালোচনার জন্য অনুরোধ জমা দিন। অনুমোদিত হলে বোর্ডে দেখা যাবে। আরও মানুষের কাছে পৌঁছাতে অনুরোধ শেয়ার করুন।'],['Live board','অনুরোধের তালিকা'],['Active requests','চলমান অনুরোধ'],['Post a request','অনুরোধ করুন'],['Fill this in from the hospital if you can — accurate details get donors through the door faster.','হাসপাতালের তথ্য অনুযায়ী ফর্মটি পূরণ করুন। সঠিক তথ্য ডোনার খুঁজতে সাহায্য করে।'],['Patient name & age *','রোগীর নাম ও বয়স *'],['Blood group needed *','প্রয়োজনীয় রক্তের গ্রুপ *'],['Units needed *','কত ব্যাগ প্রয়োজন *'],['Hospital / blood bank *','হাসপাতাল / ব্লাড ব্যাংক *'],['District *','জেলা *'],['Area','এলাকা'],['Attendant name *','যোগাযোগকারীর নাম *'],['Attendant mobile *','যোগাযোগকারীর মোবাইল *'],['Needed by *','কখন প্রয়োজন *'],['Urgency','জরুরিতার মাত্রা'],['Urgent — within 24 hours','জরুরি — ২৪ ঘণ্টার মধ্যে'],['Critical — within hours','অতি জরুরি — কয়েক ঘণ্টার মধ্যে'],['Additional note','অতিরিক্ত তথ্য'],['Post emergency request','জরুরি অনুরোধ জমা দিন'],['False requests waste donors’ time and put real emergencies at risk. Moderators can remove any post.','মিথ্যা অনুরোধ রক্তদাতাদের সময় নষ্ট করে এবং প্রকৃত জরুরি পরিস্থিতিকে ঝুঁকিতে ফেলে।'],['While you wait:','অপেক্ষার সময়:'],['call the hospital blood bank directly, ask relatives for replacement donors, and share this request on WhatsApp groups — most matches happen through a forwarded message.','হাসপাতালের ব্লাড ব্যাংকে যোগাযোগ করুন, আত্মীয়দের জানান এবং অনুরোধটি শেয়ার করুন।'],['সরাসরি তথ্য পাওয়া যাচ্ছে না। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।','Live data is unavailable. Check your connection and try again.'],['পুরোনো তথ্য দেখানো হচ্ছে; বর্তমান অবস্থা যাচাই করুন।','Cached data is shown; verify the current status.'],
['Become a donor','রক্তদাতা হোন'],['Your listing and contact number are accessible to people searching for donors. Please read the privacy policy before registering.','আপনার প্রোফাইল ও যোগাযোগের নম্বর ডোনার খুঁজছেন এমন ব্যক্তিদের কাছে উন্মুক্ত থাকবে। নিবন্ধনের আগে গোপনীয়তা নীতি পড়ুন।'],['0% complete','০% সম্পূর্ণ'],['Full name *','পূর্ণ নাম *'],['Shown publicly. Use the name on your national ID so hospitals can verify you.','নাম সবার কাছে দৃশ্যমান হবে। হাসপাতালের যাচাইয়ের জন্য পরিচয়পত্রের নাম ব্যবহার করুন।'],['Mobile number *','মোবাইল নম্বর *'],['Accessible to people searching for donors; do not use a number you cannot share.','ডোনার খুঁজছেন এমন ব্যক্তিরা নম্বরটি পেতে পারবেন; যে নম্বর শেয়ার করতে চান না, তা দেবেন না।'],['Blood group *','রক্তের গ্রুপ *'],['Not sure? Any diagnostic centre can confirm it for a small fee.','রক্তের গ্রুপ জানা না থাকলে পরীক্ষার মাধ্যমে নিশ্চিত করুন।'],['Used to estimate how far you are from a request.','অনুরোধ থেকে আনুমানিক দূরত্ব বোঝাতে ব্যবহৃত হয়।'],['Area / thana','এলাকা / থানা'],['Optional, but it helps requesters judge travel time.','ঐচ্ছিক, তবে দূরত্ব বুঝতে সাহায্য করে।'],['Age','বয়স'],['Voluntary donors in Bangladesh must be 18–65.','রক্তদানের যোগ্যতা হাসপাতাল বা ব্লাড ব্যাংক নিশ্চিত করবে।'],['Last donation date','সর্বশেষ রক্তদানের তারিখ'],['We pause your listing for 56 days after a whole-blood donation.','সর্বশেষ রক্তদানের তারিখ অনুযায়ী তালিকায় প্রস্তুত অবস্থা নির্ধারণ করা হয়। রক্তদানের যোগ্যতা ব্লাড ব্যাংক নিশ্চিত করবে।'],['Total donations so far','এ পর্যন্ত মোট রক্তদান'],['Shown on your card — it reassures nervous patients’ families.','আপনার ডোনার কার্ডে দেখানো হবে।'],['A note for requesters','যোগাযোগকারীর জন্য বার্তা'],['Optional, max 240 characters. Never write your phone number here.','ঐচ্ছিক; সর্বোচ্চ ২৪০ অক্ষর। এখানে ফোন নম্বর লিখবেন না।'],['Precise location (optional)','সুনির্দিষ্ট অবস্থান (ঐচ্ছিক)'],['Use my current location','আমার বর্তমান অবস্থান ব্যবহার করুন'],['I am available to donate right now','আমি এখন রক্ত দিতে আগ্রহী'],['I confirm the details above are true, I am medically fit to donate, and I consent to my name, blood group and general location and phone number being accessible publicly. If I share GPS coordinates, they are accessible too.','আমি নিশ্চিত করছি উপরোক্ত তথ্য সঠিক এবং আমার নাম, রক্তের গ্রুপ, এলাকা ও ফোন নম্বর প্রকাশ্যে পাওয়া যাবে—এতে আমি সম্মত। GPS অবস্থান দিলে সেটিও পাওয়া যাবে।'],['Privacy policy','গোপনীয়তা নীতি'],['Publish my donor profile','ডোনার প্রোফাইল জমা দিন'],['No password, no email — you can edit or remove this listing any time from this device.','পাসওয়ার্ড বা ইমেইল ছাড়াই এই ডিভাইস থেকে প্রোফাইল সম্পাদনা বা মুছতে পারবেন।'],['Before you register','নিবন্ধনের আগে'],['You must weigh at least 50 kg and be 18–65 years old.','রক্তদানের যোগ্যতা ও প্রয়োজনীয় শর্ত ব্লাড ব্যাংকের সঙ্গে নিশ্চিত করুন।'],['Wait 56 days between whole-blood donations.','পূর্ববর্তী রক্তদানের পর কতদিন অপেক্ষা করতে হবে, ব্লাড ব্যাংকে জেনে নিন।'],['Skip donation if you have a fever, are on antibiotics, or donated blood in the last 8 weeks.','জ্বর, অসুস্থতা বা ওষুধ গ্রহণের বিষয়টি ব্লাড ব্যাংককে জানান।'],['Eat normally and drink plenty of water beforehand.','রক্তদানের আগে স্বাভাবিক খাবার ও পর্যাপ্ত পানি পান করুন।'],['Bring your national ID or birth certificate to the blood bank.','প্রয়োজনীয় পরিচয়পত্র সঙ্গে নিন।'],['Why it matters:','কেন গুরুত্বপূর্ণ:'],['Bangladesh needs roughly 2.4 million units of blood a year, and voluntary donors cover only a part of that.','স্বেচ্ছায় রক্তদান জরুরি চিকিৎসায় গুরুত্বপূর্ণ ভূমিকা রাখে।'],['Your badge preview appears here once you pick a blood group.','রক্তের গ্রুপ বেছে নিলে এখানে প্রিভিউ দেখা যাবে।'],['My profile','আমার প্রোফাইল'],['My donor profile','আমার ডোনার প্রোফাইল'],['Manage your listing, log a donation, or take yourself off the list. Your profile is tied to this device.','প্রোফাইল আপডেট করুন, রক্তদান নথিভুক্ত করুন বা তালিকা থেকে নাম সরান। প্রোফাইলটি এই ডিভাইসের সঙ্গে যুক্ত।'],
['Show contact','যোগাযোগ দেখুন'],['Share','শেয়ার'],['Verified by the team','টিমের যাচাই করা'],['Self-reported · not verified yet','নিজের দেওয়া তথ্য · এখনও যাচাই হয়নি'],['Available now (self-reported)','প্রস্তুত (নিজের দেওয়া তথ্য)'],['Not currently available','এখন প্রস্তুত নন'],['Show 24 more','আরও ২৪ জন'],['No active emergency right now','এখন কোনো প্রকাশিত সক্রিয় অনুরোধ নেই'],['No approved active requests are visible. If blood is needed, submit a request and share it with your community.','এখন কোনো অনুমোদিত সক্রিয় অনুরোধ দেখা যাচ্ছে না। রক্ত প্রয়োজন হলে অনুরোধ জমা দিয়ে শেয়ার করুন।'],['No active emergency requests right now — the network is calm.','এখন কোনো প্রকাশিত সক্রিয় অনুরোধ নেই।'],['Registered donors','নিবন্ধিত রক্তদাতা'],['Available now','প্রস্তুত রক্তদাতা'],['Districts covered','জেলায় সংযোগ'],['Donations logged','নথিভুক্ত রক্তদান'],['Donors by blood group','গ্রুপ অনুযায়ী রক্তদাতা'],['Tap a bar to search that group','গ্রুপে চাপ দিয়ে ডোনার খুঁজুন'],['Select your blood group','রক্তের গ্রুপ নির্বাচন করুন'],['Select blood group','রক্তের গ্রুপ নির্বাচন করুন'],['Select district','জেলা নির্বাচন করুন'],['Select your district','জেলা নির্বাচন করুন'],['Post emergency request','জরুরি অনুরোধ জমা দিন'],['Posting…','জমা হচ্ছে…'],['Saving…','সংরক্ষণ হচ্ছে…'],['অনুরোধটি জমা হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।','Request not submitted. Check your internet connection and try again.'],['প্রোফাইল সংরক্ষণ হয়নি। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।','Profile not saved. Check your connection and try again.'],
['যেমন: Mirpur','e.g. Mirpur'],['নাম বা এলাকা লিখুন (যেমন Mirpur)','Search by name or area (e.g. Mirpur)'],['Skip to main content','মূল বিষয়বস্তুতে যান'],['Open menu','মেনু খুলুন'],['Main navigation','মূল নেভিগেশন'],['Filter donors','ডোনার ফিল্টার'],['Filter by district','জেলা অনুযায়ী ফিল্টার'],['Sort donors','ডোনার সাজান'],['Filter by blood group','রক্তের গ্রুপ অনুযায়ী ফিল্টার'],['Search donors','ডোনার খুঁজুন'],['My donor profile','আমার ডোনার প্রোফাইল'],['Turn on emergency alerts','জরুরি নোটিফিকেশন চালু করুন'],['Post an emergency blood request','জরুরি রক্তের অনুরোধ করুন'],['Loading live requests…','অনুরোধ লোড হচ্ছে…'],['Live data','সরাসরি তথ্য'],['Offline data','অফলাইন তথ্য'],['No donor profile on this device','এই ডিভাইসে কোনো ডোনার প্রোফাইল নেই'],['Profiles are tied to the browser you registered from. If you have lost access to that device, contact the team for help.','প্রোফাইলটি নিবন্ধনের ব্রাউজারের সঙ্গে যুক্ত। ডিভাইস হারালে সহায়তার জন্য টিমের সঙ্গে যোগাযোগ করুন।'],['Contact the team','টিমের সঙ্গে যোগাযোগ'],['people who said yes','সাহায্য করতে আগ্রহী মানুষ'],['self-reported availability','নিজের জানানো অবস্থা'],['across Bangladesh','বাংলাদেশজুড়ে'],['by this community','এই কমিউনিটি থেকে'],['Donors','রক্তদাতা'],['No active emergency requests right now — the network is calm.','এখন কোনো প্রকাশিত সক্রিয় অনুরোধ নেই।'],['e.g. Md. Abdul Malek (58)','যেমন: রোগীর নাম (বয়স)'],['e.g. Dhaka Medical College Hospital','যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল'],['e.g. Shahbagh','যেমন: শাহবাগ'],['Who should donors ask for?','কার সঙ্গে যোগাযোগ করতে হবে?'],['e.g. Tanvir Ahmed','যেমন: তানভীর আহমেদ'],['e.g. Mirpur 10, Dhanmondi','যেমন: মিরপুর ১০, ধানমন্ডি'],['প্রিভিউ মোড: আসল ডেটাবেস সংযুক্ত নয়; এখানে কোনো তথ্য জমা হবে না।','Preview mode: the live database is disconnected; no information will be submitted.'],['সংযোগ নেই — পুরোনো তথ্য দেখানো হতে পারে। অনুরোধ বা প্রোফাইল জমা দিতে ইন্টারনেট প্রয়োজন।','Offline — data may be outdated. An internet connection is required to submit requests or profiles.']
];
pairs.push(
['ডোনার তালিকার তথ্য মানুষের দেওয়া। যোগাযোগের আগে রক্তের প্রয়োজন ও হাসপাতালের তথ্য যাচাই করুন। ফোন নম্বর যোগাযোগের জন্য উন্মুক্ত; সংবেদনশীল তথ্য শেয়ার করার আগে আমাদের','Directory information is self-reported. Confirm the need and hospital details before contacting anyone. Phone numbers are publicly accessible; read our'],
['Patient needs','রোগীর প্রয়োজন'],['Can receive from','রক্ত নিতে পারেন'],['Find matching donors →','মিলে যাওয়া রক্তদাতা খুঁজুন →'],['REQUEST RECEIVED','অনুরোধ জমা হয়েছে'],['Waiting for moderator review','মডারেটরের পর্যালোচনার অপেক্ষায়'],['Your request has been submitted. It appears on the board only after approval. Meanwhile, search matching donors or share the details.','আপনার অনুরোধ জমা হয়েছে। অনুমোদনের পর এটি বোর্ডে দেখা যাবে। এর মধ্যে মিল আছে এমন রক্তদাতা খুঁজতে বা তথ্য শেয়ার করতে পারেন।'],['Share request','অনুরোধ শেয়ার করুন'],['Request submitted for review.','পর্যালোচনার জন্য অনুরোধ জমা হয়েছে।'],
['Bars show donors marked','বারে দেখানো হয়েছে যাঁরা নিজেকে'],['.','।'],
['Need more eyes on this request?','অনুরোধটি আরও বেশি মানুষের কাছে পৌঁছাতে চান?'],['Paste the request link in the One Drop community — every member sees it the moment you press send.','One Drop কমিউনিটিতে অনুরোধের লিংক শেয়ার করুন।'],['Open the community','কমিউনিটিতে যান'],['Most matches start with a forwarded message','শেয়ার করলে আরও বেশি মানুষ জানতে পারেন'],['Join the One Drop community','One Drop কমিউনিটিতে যোগ দিন'],['Emergency requests, camp announcements and donor tips reach your phone first.','জরুরি অনুরোধ, ক্যাম্পের খবর ও ডোনারদের পরামর্শ এক জায়গায়।'],['Join on WhatsApp','WhatsApp-এ যোগ দিন'],['Free · No spam · Leave any time','বিনামূল্যে · স্প্যাম নয় · যেকোনো সময় বের হতে পারবেন'],
['A volunteer-run blood donor network built by students, for everyone who has ever stood helpless in front of a hospital blood bank.','জরুরি প্রয়োজনে রক্তদাতা খুঁজে পেতে শিক্ষার্থীদের স্বেচ্ছাসেবী উদ্যোগ।'],['Install app','অ্যাপ ইনস্টল করুন'],['WhatsApp community','WhatsApp কমিউনিটি'],['Verified requests, straight to your phone','জরুরি অনুরোধের খবর ফোনে পান'],['Explore','দেখুন'],['Emergency requests','জরুরি অনুরোধ'],['Register as donor','রক্তদাতা নিবন্ধন'],['Learn','জানুন'],['FAQ & donation guide','প্রশ্নোত্তর ও রক্তদান নির্দেশিকা'],['Blood compatibility','রক্তের গ্রুপের সামঞ্জস্য'],['About this project','এই উদ্যোগ সম্পর্কে'],['Moderator login','মডারেটর লগইন'],['Trust & safety','আস্থা ও নিরাপত্তা'],['Terms of use','ব্যবহারের শর্ত'],['Developer portfolio ↗','ডেভেলপারের প্রোফাইল ↗'],['Idea & initiative','ভাবনা ও উদ্যোগ'],['Students of Notre Dame College, Batch 27','নটর ডেম কলেজের শিক্ষার্থী, ব্যাচ ২৭'],['Developed by','তৈরি করেছেন'],['Join our WhatsApp community','আমাদের WhatsApp কমিউনিটিতে যোগ দিন'],['Contact the team','টিমের সঙ্গে যোগাযোগ'],
['Patient needs','রোগীর প্রয়োজন'],['Offer to donate','রক্ত দিতে চাই'],['Matching donors','মিলে যাওয়া রক্তদাতা'],['Units needed','প্রয়োজনীয় ব্যাগ'],['Needed by','কখন প্রয়োজন'],['Posted','প্রকাশিত'],['Time','সময়'],['Critical','অতি জরুরি'],['Urgent','জরুরি'],['Fulfilled','পূরণ হয়েছে'],['Cancelled','বাতিল'],['Expired','মেয়াদ শেষ'],['Not recorded','তথ্য নেই'],['Last donation','সর্বশেষ রক্তদান'],['Total donations','মোট রক্তদান'],['Location','অবস্থান'],['Status','অবস্থা'],['Listed','তালিকাভুক্ত'],['Close','বন্ধ করুন'],['Call','কল করুন'],['Contact details','যোগাযোগের তথ্য'],['Phone numbers are accessible in public directory data. Please use this contact only for genuine needs.','ফোন নম্বর পাবলিক ডিরেক্টরির তথ্যে পাওয়া যায়। শুধু প্রকৃত প্রয়োজনে যোগাযোগ করুন।'],
['Please fix the highlighted fields.','চিহ্নিত ঘরগুলো সঠিকভাবে পূরণ করুন।'],['Please accept the consent statement to continue.','এগিয়ে যেতে সম্মতির ঘরে টিক দিন।'],['Please enter your full name','পূর্ণ নাম লিখুন'],['A mobile number is required','মোবাইল নম্বর প্রয়োজন'],['Select your blood group','রক্তের গ্রুপ নির্বাচন করুন'],['Select your district','জেলা নির্বাচন করুন'],['Select a blood group','রক্তের গ্রুপ নির্বাচন করুন'],['Select a district','জেলা নির্বাচন করুন'],['Who needs the blood?','রোগীর নাম লিখুন'],['Which hospital?','হাসপাতালের নাম লিখুন'],['Donors need a name to ask for','যোগাযোগকারীর নাম লিখুন'],['A contact number is required','যোগাযোগের নম্বর প্রয়োজন'],['When is it needed?','কখন প্রয়োজন তা জানান'],['Enter a valid mobile number (11 digits, starts with 01)','সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন, যা 01 দিয়ে শুরু'],['Enter a valid Bangladeshi mobile number, e.g. 01712345678','সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন, যেমন 01712345678'],['Use letters only, at least 3 characters','শুধু অক্ষর দিয়ে অন্তত ৩ অক্ষরের নাম লিখুন'],['Pick a realistic date (not in the future)','সঠিক তারিখ দিন; ভবিষ্যতের তারিখ নয়'],['Choose a time in the future','ভবিষ্যতের সময় নির্বাচন করুন'],['All set — submit when ready','সব প্রস্তুত — চাইলে জমা দিন'],
['Questions donors ask us most','সাধারণ প্রশ্ন ও উত্তর'],['Eligibility','যোগ্যতা'],['Who can donate blood?','কে রক্ত দিতে পারবেন?'],['How often can I donate?','কতদিন পর রক্ত দেওয়া যায়?'],['Before and during donation','রক্তদানের আগে ও সময়ে'],['What should I do before donating?','রক্তদানের আগে কী করব?'],['Does it hurt? Will I feel weak?','ব্যথা হবে কি? দুর্বল লাগবে কি?'],['Is the equipment safe and reused?','ব্যবহৃত সরঞ্জাম কি নিরাপদ?'],['Using One Drop','One Drop ব্যবহার'],['Do I need an account to search for donors?','ডোনার খুঁজতে কি অ্যাকাউন্ট প্রয়োজন?'],['Is my phone number visible to everyone?','আমার ফোন নম্বর কি সবাই দেখতে পারবেন?'],['Your number is masked on the card, but it is accessible in the public directory data. The per-browser reveal limit can be bypassed and is not a security control.','কার্ডে নম্বর আড়াল করা হলেও পাবলিক ডিরেক্টরির তথ্যে তা পাওয়া যায়। ব্রাউজারভিত্তিক সীমা এড়ানো সম্ভব; এটি নিরাপত্তা ব্যবস্থা নয়।'],['How do I stop appearing in search results?','সার্চের তালিকা থেকে কীভাবে সরে যাব?'],['Why does “Nearest to me” sometimes look wrong?','কাছাকাছি ডোনারের দূরত্ব ভুল দেখাতে পারে কেন?'],['Does One Drop work without internet?','ইন্টারনেট ছাড়া One Drop কাজ করে?'],['Yes, within limits. Once installed as an app, the interface and the most recent data keep working without a connection. Requests cannot be submitted offline; reconnect and submit again.','সীমিতভাবে। ইনস্টল করা থাকলে পুরোনো তথ্য দেখা যেতে পারে। অফলাইনে অনুরোধ জমা হয় না; সংযোগ এলে আবার জমা দিন।'],['Is there a WhatsApp group or community?','WhatsApp কমিউনিটি আছে কি?'],['Is this free? Who pays for it?','এটি কি বিনামূল্যে?'],['Medical disclaimer:','চিকিৎসাসংক্রান্ত সতর্কতা:'],['One Drop is an information and coordination tool. It does not provide medical advice, does not screen donors and does not replace a hospital blood bank. Always follow the instructions of the treating doctor and the blood bank staff.','One Drop তথ্য ও যোগাযোগের মাধ্যম; এটি চিকিৎসা পরামর্শ বা ব্লাড ব্যাংকের বিকল্প নয়। চিকিৎসক ও ব্লাড ব্যাংকের নির্দেশনা অনুসরণ করুন।'],['Quick checklist for donors','রক্তদাতার জন্য সংক্ষিপ্ত তালিকা'],['Still need blood urgently?','এখনও জরুরি রক্ত প্রয়োজন?'],
['Privacy & terms','গোপনীয়তা ও শর্তাবলি'],['Privacy policy, terms and contact','গোপনীয়তা নীতি, শর্ত ও যোগাযোগ'],['Plain language, no legal fog. Last updated: September 2026.','সহজ ভাষায় তথ্য। সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬।'],['1. What we store','১. যেসব তথ্য সংরক্ষণ করি'],['2. What is public','২. যেসব তথ্য প্রকাশ্য'],['3. Your location','৩. আপনার অবস্থান'],['4. How to change or delete your data','৪. তথ্য পরিবর্তন বা মুছে ফেলা'],['5. Security','৫. নিরাপত্তা'],['6. Moderation','৬. তদারকি'],['7. Children','৭. শিশুদের তথ্য'],['8. Terms of use','৮. ব্যবহারের শর্ত'],['9. Changes to this policy','৯. নীতির পরিবর্তন'],['10. Contact the team','১০. টিমের সঙ্গে যোগাযোগ'],['Your name *','আপনার নাম *'],['Mobile or email *','মোবাইল বা ইমেইল *'],['Subject *','বিষয় *'],['Message *','বার্তা *'],['Send message','বার্তা পাঠান'],['Credits','কৃতিত্ব'],['Data at a glance','তথ্য এক নজরে'],['Public:','প্রকাশ্য:'],['Publicly accessible:','প্রকাশ্যে পাওয়া যায়:'],['Public data:','প্রকাশ্য তথ্য:'],['Emergency first','জরুরি প্রয়োজনে আগে'],['Your mobile number, optional GPS coordinates and other donor record fields are accessible in the public directory data.','আপনার মোবাইল নম্বর, ঐচ্ছিক GPS অবস্থান ও ডোনার রেকর্ডের অন্যান্য তথ্য পাবলিক ডিরেক্টরিতে পাওয়া যায়।'],['The interface masks the number until a visitor taps “Show contact”, but this is not a security control. The per-browser limit can be bypassed.','কার্ডে নম্বর আড়াল থাকলেও এটি নিরাপত্তা ব্যবস্থা নয়। ব্রাউজারভিত্তিক সীমা এড়ানো সম্ভব।']
);
pairs.push(
['About','আমাদের সম্পর্কে'],['Built by students. Measured in minutes. Open to everyone in Bangladesh.','শিক্ষার্থীদের উদ্যোগ। জরুরি সময়ে পাশে। বাংলাদেশের সবার জন্য উন্মুক্ত।'],['One Drop is planned, written and maintained by students of Notre Dame College, Dhaka — Batch 27. Free forever, volunteer-run, and designed for the moments when a hospital says “we need blood now.”','One Drop নটর ডেম কলেজ, ঢাকার ব্যাচ ২৭-এর শিক্ষার্থীদের স্বেচ্ছাসেবী উদ্যোগ। জরুরি রক্তের প্রয়োজনে সহায়তার জন্য বিনামূল্যে তৈরি এই প্ল্যাটফর্ম।'],['Why we built it','কেন এই উদ্যোগ'],['Started from a phone call that came too late','প্রয়োজনের সময় দ্রুত যোগাযোগের জন্য'],['“who near me can donate today?”','“আজ আমার কাছাকাছি কে রক্ত দিতে পারবেন?”'],['Ground rules we follow:','আমাদের মূলনীতি:'],['What One Drop does','One Drop যা করে'],['A searchable donor directory with blood-group, district and distance filters','গ্রুপ, জেলা ও দূরত্ব দিয়ে রক্তদাতা খোঁজার ব্যবস্থা'],['A live emergency board with countdown timers','জরুরি অনুরোধের তালিকা ও সময় গণনা'],['Browser alerts when a new urgent request is posted','সাইট খোলা থাকাকালে ব্রাউজার সতর্কবার্তা'],['Masked phone numbers with rate-limited reveal','কার্ডে নম্বর আড়াল করা হয়; তবে ডিরেক্টরির তথ্যে তা প্রকাশ্য'],['A 56-day cooling-off tracker so donors are not over-asked','সর্বশেষ রক্তদানের তারিখের ভিত্তিতে তালিকা ফিল্টার'],['An installable offline-capable app (PWA)','ইনস্টলযোগ্য ওয়েব অ্যাপ; অফলাইনে সীমিতভাবে পুরোনো তথ্য দেখা যায়'],['What it does not do','One Drop যা করে না'],['Store, screen or supply blood','রক্ত সংগ্রহ, পরীক্ষা বা সরবরাহ'],['Replace a hospital blood bank or a doctor’s decision','হাসপাতালের ব্লাড ব্যাংক বা চিকিৎসকের সিদ্ধান্তের বিকল্প'],['Charge donors or patients anything, ever','রক্তদাতা বা রোগীর কাছ থেকে ফি গ্রহণ'],['Field notes','প্রয়োগের উদাহরণ'],['What this looks like under pressure','জরুরি পরিস্থিতিতে ব্যবহার'],['Reference','তথ্যসূত্র'],['Red-cell compatibility chart','লোহিত রক্তকণিকার সামঞ্জস্য তালিকা'],['Use this to decide which donors are worth calling first. Final decisions always belong to the treating doctor and the blood bank.','প্রাথমিকভাবে ডোনার খুঁজতে এই তালিকা দেখুন। চূড়ান্ত সিদ্ধান্ত চিকিৎসক ও ব্লাড ব্যাংকের।'],['✓ = compatible for red-cell transfusion','✓ = লোহিত রক্তকণিকা পরিসঞ্চালনে সামঞ্জস্যপূর্ণ'],['The people behind One Drop','One Drop-এর পেছনের মানুষ'],['Idea & initiative','ভাবনা ও উদ্যোগ'],['Conceived & developed by','পরিকল্পনা ও নির্মাণ'],['Volunteer moderators','স্বেচ্ছাসেবী মডারেটর'],['Technology','প্রযুক্তি'],['Want to help?','সাহায্য করতে চান?'],['contact form','যোগাযোগ ফর্ম'],
['Clear answers without medical jargon. If anything remains unclear, write to us through the','সহজ ভাষায় উত্তর। আরও কিছু জানতে চাইলে আমাদের'],['— a person, not a bot, reads every message.','মাধ্যমে যোগাযোগ করুন।'],['When should I','কখন আমার'],['not','উচিত নয়'],['donate?','রক্ত দেওয়া?'],['In general: a healthy person aged 18–65, weighing at least 50 kg, with a haemoglobin level of 12.5 g/dL or above. You will not be left to guess — the blood bank checks your blood pressure, temperature and haemoglobin on site before anything is collected.','রক্তদানের বয়স, ওজন, হিমোগ্লোবিন ও অন্যান্য যোগ্যতা প্রযোজ্য নীতিমালা অনুযায়ী ব্লাড ব্যাংক পরীক্ষা করে নিশ্চিত করবে।'],['Postpone if you have a fever or active infection, are on antibiotics, had a tattoo or piercing in the past six months, had recent surgery, are pregnant or breastfeeding, or donated whole blood within the last eight weeks. Always answer the screening questions truthfully — the medical staff make the final call, and honesty protects the patient.','জ্বর, সংক্রমণ, ওষুধ গ্রহণ, সাম্প্রতিক অস্ত্রোপচার, ট্যাটু, গর্ভাবস্থা, স্তন্যদান বা সাম্প্রতিক রক্তদানের তথ্য ব্লাড ব্যাংককে জানান। চিকিৎসাকর্মীরা চূড়ান্ত সিদ্ধান্ত নেবেন।'],['One Drop currently uses a 56-day display filter. This is not a medical eligibility decision and does not automatically change a donor’s availability. Confirm the appropriate interval with the blood bank or clinician.','One Drop বর্তমানে ৫৬ দিনের একটি তালিকা ফিল্টার ব্যবহার করে। এটি চিকিৎসাগত যোগ্যতা নির্ধারণ করে না বা স্বয়ংক্রিয়ভাবে প্রাপ্যতা বদলায় না। উপযুক্ত বিরতি ব্লাড ব্যাংক বা চিকিৎসকের কাছে নিশ্চিত করুন।'],['Eat a normal meal (never donate on an empty stomach), drink extra water, and sleep properly the night before. Skip heavy exercise that morning and carry your national ID or birth certificate. Ten minutes of preparation makes the donation visibly easier.','স্বাভাবিক খাবার খান, পর্যাপ্ত পানি পান করুন এবং আগের রাতে ঘুমান। রক্তব্যাংকের নির্দেশনা ও প্রয়োজনীয় পরিচয়পত্র সঙ্গে রাখুন।'],['The needle prick lasts a few seconds; the collection itself takes about 8–10 minutes. Some donors feel light-headed briefly — resting for ten minutes with the juice they provide is usually all it takes. Your body replaces the lost plasma within 24 hours.','সুঁই ফোটানোর সময় অল্প ব্যথা লাগতে পারে। কারও মাথা ঘোরাতে পারে; কোনো অস্বস্তি হলে সঙ্গে সঙ্গে চিকিৎসাকর্মীকে জানান।'],['Yes — completely safe. Every donation uses a brand-new, sterile, single-use kit, opened in front of you and discarded afterwards. You cannot catch an infection by donating blood.','রক্তদানের সরঞ্জাম জীবাণুমুক্ত ও একবার ব্যবহারযোগ্য কি না, দায়িত্বপ্রাপ্ত কর্মীর কাছে নিশ্চিত করুন।'],['No. The directory, the emergency board and the compatibility tools are open to everyone, with no sign-up. Only people who want to be','না। ডোনার তালিকা, জরুরি বোর্ড ও সামঞ্জস্যের তথ্য দেখতে অ্যাকাউন্ট প্রয়োজন নেই। শুধু ডোনার হিসেবে'],['listed','তালিকাভুক্ত'],['as donors register — and even that requires no email and no password.','হতে নিবন্ধন করতে হবে।'],['Open','খুলে'],['on the device you registered from and tap','নিবন্ধনের ডিভাইসে খুলে'],['Remove my listing','তালিকা থেকে সরান'],['— it takes effect immediately. If you only need a break, use','চাপুন। সাময়িক বিরতি নিতে'],['Mark as busy','এখন প্রস্তুত নই'],['instead: you disappear from searches without losing your record.','ব্যবহার করতে পারেন।'],['When a donor allowed location access, distance uses their shared coordinates. When they did not, we fall back to the centre of their district — an estimate, and labelled as such. The card always shows the district so you can judge for yourself.','ডোনার অবস্থান দিলে সেটি দিয়ে দূরত্ব অনুমান করা হয়; না দিলে জেলার কেন্দ্র ব্যবহার করা হয়। দূরত্ব আনুমানিক, তাই যোগাযোগ করে নিশ্চিত করুন।'],['Post on the emergency board and share the link — most matches happen because someone forwarded it.','জরুরি বোর্ডে অনুরোধ জমা দিন এবং তথ্য শেয়ার করুন।'],['Post a request','অনুরোধ করুন'],['Ate a meal in the last 4 hours','রক্তদানের আগে খাবার খান'],['Drank 2–3 glasses of water','পর্যাপ্ত পানি পান করুন'],['Slept at least 6 hours','পর্যাপ্ত ঘুমান'],['No fever, no antibiotics','জ্বর বা ওষুধের তথ্য জানান'],['At least 56 days since the last donation','রক্তদানের বিরতি ব্লাড ব্যাংকে নিশ্চিত করুন'],['National ID with you','পরিচয়পত্র সঙ্গে নিন'],
['When you register as a donor we store: your name, mobile number, blood group, district, optional area, optional age and note, optional last-donation date, and — only if you tap “Use my current location” — your GPS coordinates. When you post an emergency request we store the patient’s name, blood group, units, hospital, district, attendant name and number, deadline and note.','ডোনার নিবন্ধনে নাম, মোবাইল নম্বর, রক্তের গ্রুপ, জেলা, ঐচ্ছিক এলাকা, বয়স, নোট, সর্বশেষ রক্তদানের তারিখ এবং সম্মতি দিলে GPS অবস্থান সংরক্ষণ করা হয়। অনুরোধে রোগীর নাম, গ্রুপ, ব্যাগের সংখ্যা, হাসপাতাল, জেলা, যোগাযোগকারীর নাম ও নম্বর, সময় এবং নোট সংরক্ষিত হয়।'],['Visible to any visitor: your name, blood group, district/area, availability status, donation count, age and note.','যেকোনো দর্শক নাম, রক্তের গ্রুপ, জেলা/এলাকা, প্রাপ্যতা, রক্তদানের সংখ্যা, বয়স ও নোট দেখতে পারেন।'],['If you do not want your name searchable by search engines, use a first name plus initial when registering, and keep the note field free of personal details.','সার্চ ইঞ্জিনে পূর্ণ নাম না দেখাতে চাইলে নামের অংশ ব্যবহার করুন এবং নোটে ব্যক্তিগত তথ্য দেবেন না।'],['Location is optional and used only to sort donors by distance. Even when shared, the public interface shows only an approximate distance in kilometres, but coordinates are accessible in the directory data. Without GPS we fall back to the centre of your district, which is a rough estimate.','অবস্থান দেওয়া ঐচ্ছিক। স্ক্রিনে আনুমানিক দূরত্ব দেখানো হলেও GPS স্থানাঙ্ক ডিরেক্টরির তথ্যে পাওয়া যায়। GPS না দিলে জেলার কেন্দ্র থেকে দূরত্ব অনুমান করা হয়।'],['Donation must always be voluntary and unpaid. Never ask for or accept payment.','রক্তদান স্বেচ্ছায় ও বিনামূল্যে হতে হবে। অর্থ দাবি বা গ্রহণ করবেন না।'],['Do not post false, duplicate or commercial emergency requests.','মিথ্যা, একাধিক বা বাণিজ্যিক অনুরোধ দেবেন না।'],['Do not use the directory for marketing, spam or harassment.','তালিকা বিপণন, স্প্যাম বা হয়রানির জন্য ব্যবহার করবেন না।'],['In a life-threatening emergency, call the hospital blood bank and emergency services first.','জীবন-সংকটাপন্ন জরুরি অবস্থায় প্রথমেই হাসপাতালের ব্লাড ব্যাংক ও জরুরি সেবায় ফোন করুন।'],['Found a wrong listing, a fake request, or have a suggestion? Write to us — moderators check this inbox from the admin panel.','ভুল তথ্য, ভুয়া অনুরোধ বা কোনো পরামর্শ থাকলে আমাদের লিখুন।'],['For a life-threatening situation call the hospital directly. Bangladesh national emergency:','জীবন-সংকটাপন্ন পরিস্থিতিতে সরাসরি হাসপাতালে ফোন করুন। জাতীয় জরুরি সেবা:']
);
pairs.push(
['A community built to help people connect','জরুরি মুহূর্তে যোগাযোগের সেতুবন্ধন'],['One Drop helps people search a voluntary donor directory and share blood requests. It is maintained by students and volunteers.','One Drop-এর মাধ্যমে স্বেচ্ছায় রক্তদাতার তালিকায় খোঁজা ও রক্তের অনুরোধ শেয়ার করা যায়। শিক্ষার্থী ও স্বেচ্ছাসেবীরা উদ্যোগটি পরিচালনা করেন।'],['We are not a blood bank. We do not collect, screen, store or transport blood. Contact details in the directory are publicly accessible; please read the privacy policy before registering.','আমরা ব্লাড ব্যাংক নই। আমরা রক্ত সংগ্রহ, পরীক্ষা, সংরক্ষণ বা পরিবহন করি না। ডিরেক্টরির যোগাযোগের তথ্য প্রকাশ্যে পাওয়া যায়; নিবন্ধনের আগে গোপনীয়তা নীতি পড়ুন।'],['Browser alerts may appear while the site is open','সাইট খোলা থাকলে ব্রাউজার সতর্কবার্তা দেখাতে পারে'],['Contact numbers are accessible in the public directory data','যোগাযোগের নম্বর ডিরেক্টরির তথ্যে প্রকাশ্যে পাওয়া যায়'],['A display filter based on the last donation date','সর্বশেষ রক্তদানের তারিখের ভিত্তিতে তালিকা ফিল্টার'],['every listing is voluntary, unpaid and non-commercial. Selling blood is illegal in Bangladesh and against everything this project stands for. Moderators remove any listing that looks fake, paid or misleading.','প্রতিটি তালিকাভুক্তি স্বেচ্ছায়, অবৈতনিক ও অ-বাণিজ্যিক। ভুয়া বা বিভ্রান্তিকর তথ্য মডারেটররা সরাতে পারেন।'],['Students of Notre Dame College, Dhaka — Batch 27. Research, planning, writing, and day-to-day community moderation.','নটর ডেম কলেজ, ঢাকা — ব্যাচ ২৭-এর শিক্ষার্থীরা। গবেষণা, পরিকল্পনা ও কমিউনিটি পরিচালনা।'],['Foysal Mahmud — cyber-security specialist and ethical hacker; conceived One Drop and leads its product design, engineering, Firebase architecture, security and deployment.','ফয়সাল মাহমুদ — ওয়ান ড্রপের পরিকল্পনা, ডিজাইন, নির্মাণ ও প্রযুক্তিগত পরিচালনা।'],['Full profile — foysalcyber.github.io ↗','সম্পূর্ণ প্রোফাইল — foysalcyber.github.io ↗'],['Urgent? Contact the developer directly ↗','ডেভেলপারের সঙ্গে যোগাযোগ ↗'],['Classmates who verify listings by phone, review reports, and keep the emergency board accurate and honest.','স্বেচ্ছাসেবীরা তথ্য যাচাই ও অনুরোধ পর্যালোচনা করেন।'],['Deliberately simple: hand-written HTML/CSS/JS, Firebase Authentication and Firestore, and a service worker for offline use. No trackers, no advertising, no data sold — ever.','HTML, CSS, JavaScript, Firebase Authentication ও Firestore দিয়ে তৈরি। অফলাইনে সীমিত ব্যবহারের জন্য service worker আছে।'],['A directory is only as strong as the donors inside it. Share this site with your class, your hall, your mosque and temple committees, your neighbourhood group — or','সাইটটি আপনার পরিচিতদের সঙ্গে শেয়ার করুন অথবা'],['join the One Drop WhatsApp community','One Drop WhatsApp কমিউনিটিতে যোগ দিন'],['and forward the requests that match your friends’ blood groups. Corrections and suggestions are always welcome through the','। সংশোধন বা পরামর্শ জানাতে ব্যবহার করুন'],
['Yes. The','হ্যাঁ।'],['One Drop community on WhatsApp','One Drop WhatsApp কমিউনিটিতে'],['is where verified emergency requests get forwarded, donation camps are announced, and donors ask each other quick questions between requests. Joining is entirely optional — everything on this website works without it — and you can leave the community whenever you like.','জরুরি অনুরোধ ও রক্তদান ক্যাম্পের তথ্য শেয়ার করা হয়। যোগ দেওয়া ঐচ্ছিক; যেকোনো সময় ছেড়ে যেতে পারবেন।'],['Join the One Drop WhatsApp community ↗','One Drop WhatsApp কমিউনিটিতে যোগ দিন ↗'],['Completely free — no ads, no sponsors, no fees hidden anywhere. It runs on free student infrastructure and is maintained in the spare time of the Batch 27 volunteers.','সাইট ব্যবহার বিনামূল্যে। ব্যাচ ২৭-এর স্বেচ্ছাসেবীরা এটি পরিচালনা করেন।'],['Urgent: reach the developer','জরুরি প্রয়োজনে ডেভেলপারের সঙ্গে যোগাযোগ'],['If the team inbox is not enough, contact Foysal Mahmud — conception, development and security of this platform — through his portfolio:','প্রয়োজনে ফয়সাল মাহমুদের পোর্টফোলিওর মাধ্যমে যোগাযোগ করুন:'],
['Contact forms may collect the email address or phone number you provide. Staff authentication uses email and password. Please avoid sharing medical records or identity numbers in free-text fields.','যোগাযোগ ফর্মে আপনার দেওয়া ইমেইল বা ফোন নম্বর সংরক্ষিত হতে পারে। স্টাফ অ্যাকাউন্টে ইমেইল ও পাসওয়ার্ড ব্যবহার হয়। উন্মুক্ত লেখার ঘরে চিকিৎসা বা পরিচয়পত্রের নম্বর দেবেন না।'],['on the device you registered from. You can edit every field, pause your listing, log a donation, or delete the listing permanently. Deletion takes effect immediately. If you have lost access to that device, contact us and a moderator will remove it manually.','নিবন্ধনের ডিভাইসে খুলুন। প্রোফাইল সম্পাদনা, সাময়িক বন্ধ, রক্তদান নথিভুক্ত বা মুছে ফেলতে পারেন। ডিভাইস হারালে টিমের সঙ্গে যোগাযোগ করুন।'],['Data is stored in Google Cloud Firestore with security rules that allow anyone to read the directory but only the owner of a record to update or delete it. Records are created through an anonymous Firebase session, so an attacker cannot silently edit someone else’s listing. The full rule set is published in the repository and can be copied from the moderator dashboard.','তথ্য Google Cloud Firestore-এ রাখা হয়। ডিরেক্টরি প্রকাশ্যে পড়া যায়; পরিবর্তন ও মুছে ফেলা authentication ও প্রযোজ্য security rules-এর ওপর নির্ভর করে। Rules রিপোজিটরিতে আছে এবং সেগুলো production-এ প্রকাশ ও যাচাই করা প্রয়োজন।'],['Volunteer moderators from Batch 27 may verify, suspend or delete listings and emergency requests that are false, commercial, duplicate or abusive. Paid blood dealing is illegal in Bangladesh; any such listing is removed without notice.','স্বেচ্ছাসেবী মডারেটররা ভুয়া, পুনরাবৃত্ত, বাণিজ্যিক বা আপত্তিকর তথ্য যাচাই বা সরাতে পারেন।'],['One Drop is intended for donors aged 18 and over. We do not knowingly collect data from anyone younger.','One Drop প্রাপ্তবয়স্ক রক্তদাতাদের জন্য। আমরা জেনে বুঝে অপ্রাপ্তবয়স্কদের তথ্য সংগ্রহ করি না।'],['You confirm that the information you submit is true and that you are medically fit to donate.','আপনি নিশ্চিত করবেন যে দেওয়া তথ্য সঠিক। রক্তদানের যোগ্যতা ব্লাড ব্যাংক যাচাই করবে।'],['One Drop is provided “as is”. We are a student coordination tool, not a medical service, and we are not liable for the outcome of any transfusion or for a donor’s failure to respond.','One Drop একটি সমন্বয়কারী প্ল্যাটফর্ম, চিকিৎসাসেবা নয়। রক্ত পরিসঞ্চালনের সিদ্ধান্ত চিকিৎসক ও ব্লাড ব্যাংকের।'],['If we change what we store, we will update this page and note the date at the top. Continued use after a change means you accept the updated policy.','তথ্য সংরক্ষণের নীতি পরিবর্তিত হলে এই পৃষ্ঠা ও হালনাগাদের তারিখ পরিবর্তন করা হবে।'],['Idea & initiative:','ভাবনা ও উদ্যোগ:'],['Students of Notre Dame College, Dhaka — Batch 27.','নটর ডেম কলেজ, ঢাকা — ব্যাচ ২৭-এর শিক্ষার্থীরা।'],['Developed by:','তৈরি করেছেন:'],['name, blood group, district, availability','নাম, রক্তের গ্রুপ, জেলা, প্রাপ্যতা'],['mobile number and optional GPS coordinates','মোবাইল নম্বর ও ঐচ্ছিক GPS স্থানাঙ্ক'],['optional coordinates and session identifiers in directory records','ডিরেক্টরি রেকর্ডের ঐচ্ছিক স্থানাঙ্ক ও session identifier']
);
pairs.push(['Data is stored in Google Cloud Firestore. Directory data is public; updates and deletion depend on authentication and the security rules actually deployed. The proposed rules are in the repository and must be reviewed and tested before publishing.','তথ্য Google Cloud Firestore-এ রাখা হয়। ডিরেক্টরির তথ্য প্রকাশ্য; পরিবর্তন ও মুছে ফেলা চালু authentication ও security rules-এর ওপর নির্ভর করে। প্রস্তাবিত rules প্রকাশের আগে পর্যালোচনা ও পরীক্ষা করা প্রয়োজন।']);
pairs.push(['The blood bank or clinician makes the final eligibility decision.','রক্তদানের যোগ্যতা হাসপাতাল বা ব্লাড ব্যাংক নিশ্চিত করবে।'],['The directory uses a 56-day display filter after whole-blood donation. Ask the blood bank about eligibility.','সর্বশেষ রক্তদানের পর ডিরেক্টরিতে ৫৬ দিনের ফিল্টার ব্যবহার করা হয়। রক্তদানের যোগ্যতা ব্লাড ব্যাংক নিশ্চিত করবে।'],['Confirm age, weight and other eligibility requirements with the blood bank.','বয়স, ওজনসহ রক্তদানের যোগ্যতার শর্ত ব্লাড ব্যাংকে নিশ্চিত করুন।'],['Ask the blood bank how long to wait between donations.','রক্তদানের পর কতদিন অপেক্ষা করতে হবে, ব্লাড ব্যাংকে জেনে নিন।'],['Tell the blood bank about fever, illness, medicines and recent donations.','জ্বর, অসুস্থতা, ওষুধ ও সাম্প্রতিক রক্তদানের কথা ব্লাড ব্যাংককে জানান।']);
pairs.push(['Message not sent. Check your connection and try again.','বার্তা পাঠানো হয়নি। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।'],['Message sent. A moderator will get back to you.','বার্তা পাঠানো হয়েছে। মডারেটর যোগাযোগ করবেন।'],['Sending…','পাঠানো হচ্ছে…'],['Please fill in every field.','সব ঘর পূরণ করুন।'],['Select your blood group','রক্তের গ্রুপ নির্বাচন করুন'],['Contact details','যোগাযোগের তথ্য'],['Please introduce yourself, mention you found this number on One Drop, and confirm the requirement with the hospital blood bank before travelling.','পরিচয় দিন, One Drop থেকে নম্বর পেয়েছেন বলুন এবং যাওয়ার আগে হাসপাতালের সঙ্গে তথ্য নিশ্চিত করুন।'],['Cancel','বাতিল'],['Confirm','নিশ্চিত করুন'],['Show attendant contact','যোগাযোগকারীর নম্বর দেখুন'],['Show contact','যোগাযোগ দেখুন'],['Share this request','অনুরোধ শেয়ার করুন'],['More options','আরও উপায়'],['Save share poster (PNG)','শেয়ার পোস্টার সংরক্ষণ (PNG)'],['Copy link','লিংক কপি করুন'],['Request sent for review','অনুরোধ পর্যালোচনার জন্য পাঠানো হয়েছে'],['Use my current location','আমার বর্তমান অবস্থান ব্যবহার করুন']);
pairs.push(
['Find the right donor','সঠিক রক্তদাতা খুঁজুন'],['Choose a blood group and district. Results update automatically.','রক্তের গ্রুপ ও জেলা বেছে নিন। তালিকা নিজে থেকেই বদলাবে।'],['Clear filters','ফিল্টার মুছুন'],['All','সব'],['Sort by','সাজান'],['Search by name or area','নাম বা এলাকা দিয়ে খুঁজুন'],['Use the spelling the donor entered. Try leaving it blank if you find no results.','ডোনারের দেওয়া বানান ব্যবহার করুন। ডোনার না পেলে ঘরটি খালি রেখে খুঁজুন।'],['Matching donors','মিলে যাওয়া রক্তদাতা'],['Need help finding a donor? →','ডোনার খুঁজে পাচ্ছেন না? →'],
['Tell us the essential details. We will send your request for review; meanwhile you can search and share it.','প্রয়োজনীয় তথ্য দিন। অনুরোধটি পর্যালোচনার জন্য যাবে; এর মধ্যে ডোনার খুঁজতে ও তথ্য শেয়ার করতে পারবেন।'],['See active requests','চলমান অনুরোধ দেখুন'],['START HERE','এখান থেকে শুরু করুন'],['Request blood','রক্তের অনুরোধ করুন'],['Fill in the six essential details below.','নিচের ৬টি প্রয়োজনীয় তথ্য দিন।'],['Fill in the details','তথ্য দিন'],['We review','আমরা যাচাই করব'],['Search and share','খুঁজুন ও শেয়ার করুন'],['Contact mobile number *','যোগাযোগের মোবাইল নম্বর *'],['Donors will use this number to contact you.','রক্তদাতারা এই নম্বরে যোগাযোগ করবেন।'],['Your hospital details and contact number will be publicly accessible. Please share only information you have permission to publish.','হাসপাতালের তথ্য ও যোগাযোগের নম্বর প্রকাশ্যে পাওয়া যাবে। প্রকাশের অনুমতি আছে এমন তথ্যই দিন।'],['Submit request for review','অনুরোধ জমা দিন'],['After review, approved requests appear on the board. Review time may vary.','পর্যালোচনায় অনুমোদিত হলে অনুরোধ বোর্ডে দেখা যাবে। পর্যালোচনায় সময় লাগতে পারে।'],['Contact the hospital to confirm the need before donating.','রক্তদানের আগে হাসপাতালের সঙ্গে প্রয়োজন নিশ্চিত করুন।'],['Enter the number of units','কত ব্যাগ প্রয়োজন লিখুন'],['Enter a whole number from 1 to 10','১ থেকে ১০-এর মধ্যে পূর্ণ সংখ্যা লিখুন']
);
pairs.push(['Live donor data unavailable','সরাসরি ডোনারের তথ্য পাওয়া যাচ্ছে না'],['Live donor data is unavailable','সরাসরি ডোনারের তথ্য পাওয়া যাচ্ছে না'],['Check your connection and try again. There may still be donors available.','সংযোগ পরীক্ষা করে আবার চেষ্টা করুন। রক্তদাতা থাকতে পারেন, তবে এখন তথ্য পাওয়া যাচ্ছে না।'],['Try again','আবার চেষ্টা করুন']);
pairs.push(['Your donor profile','আপনার রক্তদাতা প্রোফাইল'],['Essential details','প্রয়োজনীয় তথ্য'],['Fields marked * are required.','* চিহ্নিত তথ্যগুলো প্রয়োজন।'],['Additional details','অতিরিক্ত তথ্য'],['Share only what you are comfortable making public.','প্রকাশ্যে দিতে স্বাচ্ছন্দ্যবোধ করেন এমন তথ্যই দিন।'],['Live donor data is unavailable. Statistics will appear when a connection is available.','সরাসরি ডোনারের তথ্য পাওয়া যাচ্ছে না। সংযোগ পাওয়া গেলে পরিসংখ্যান দেখা যাবে।'],['Share the request','অনুরোধ শেয়ার করুন'],['Join the optional WhatsApp community to share blood requests and connect with other volunteers. Confirm all urgent details with the hospital before responding.','রক্তের অনুরোধ শেয়ার করতে ও স্বেচ্ছাসেবীদের সঙ্গে যুক্ত হতে চাইলে WhatsApp কমিউনিটিতে যোগ দিন। সাড়া দেওয়ার আগে হাসপাতালের সঙ্গে জরুরি তথ্য নিশ্চিত করুন।'],['Share requests with the community','কমিউনিটিতে অনুরোধ শেয়ার করুন'],['Connect with other volunteers','অন্য স্বেচ্ছাসেবীদের সঙ্গে যুক্ত হন'],['Participation is optional','যোগ দেওয়া সম্পূর্ণ ঐচ্ছিক'],['Leave any time · Read our privacy policy','যেকোনো সময় ছেড়ে যেতে পারবেন · গোপনীয়তা নীতি পড়ুন']);
pairs.push(['FAQ topics','প্রশ্নের বিষয়'],['Privacy topics','গোপনীয়তার বিষয়']);
pairs.push(['Your donation can help patients','আপনার রক্তদান রোগীর পাশে দাঁড়ায়'],['Blood donations can support patients in different ways. The blood bank will confirm whether you can donate safely.','রক্তদান নানা উপায়ে রোগীদের সাহায্য করে। নিরাপদে রক্ত দিতে পারবেন কি না, তা ব্লাড ব্যাংক নিশ্চিত করবে।'],['Remember:','মনে রাখুন:'],['The blood bank or clinician makes the final decision about your eligibility.','রক্তদানের যোগ্যতার চূড়ান্ত সিদ্ধান্ত ব্লাড ব্যাংক বা চিকিৎসক দেবেন।'],['Scroll sideways to see all blood groups.','সব রক্তের গ্রুপ দেখতে পাশাপাশি স্ক্রল করুন।']);
pairs.push(['Profile submitted for review','প্রোফাইল পর্যালোচনার জন্য জমা হয়েছে'],['. Your profile has been saved. Contact details are publicly accessible.','. আপনার প্রোফাইল সংরক্ষিত হয়েছে। যোগাযোগের তথ্য প্রকাশ্যে পাওয়া যাবে।']);
pairs.push(['Thank you,','ধন্যবাদ,'],['Profile updated','প্রোফাইল হালনাগাদ হয়েছে']);
pairs.push(['Join the optional community to share requests and connect with volunteers.','অনুরোধ শেয়ার করতে ও স্বেচ্ছাসেবীদের সঙ্গে যুক্ত হতে চাইলে কমিউনিটিতে যোগ দিন।'],['Participation is optional · Leave any time','যোগ দেওয়া ঐচ্ছিক · যেকোনো সময় ছেড়ে যেতে পারবেন'],['Connect with volunteers and share requests in the optional community.','ঐচ্ছিক কমিউনিটিতে স্বেচ্ছাসেবীদের সঙ্গে যুক্ত হোন ও অনুরোধ শেয়ার করুন।'],['Join the community if you wish','ইচ্ছা হলে কমিউনিটিতে যোগ দিন'],['Your profile is saved. Joining the WhatsApp community is optional.','আপনার প্রোফাইল সংরক্ষিত হয়েছে। WhatsApp কমিউনিটিতে যোগ দেওয়া ঐচ্ছিক।'],['Share a request link in the community to reach more people.','আরও মানুষের কাছে পৌঁছাতে কমিউনিটিতে অনুরোধের লিংক শেয়ার করুন।'],['Confirm details with the hospital','হাসপাতালের সঙ্গে তথ্য নিশ্চিত করুন']);
pairs.push(['পুরোনো তথ্য দেখানো হচ্ছে। বর্তমানে জরুরি অনুরোধ আছে কি না নিশ্চিত করা যাচ্ছে না।','Showing cached data. We cannot confirm whether there are active requests right now.'],['No approved active requests are currently shown.','এই মুহূর্তে অনুমোদিত কোনো চলমান অনুরোধ দেখানো হচ্ছে না।']);
pairs.push(['The shared request cannot be confirmed while live data is unavailable.','সরাসরি তথ্য না পাওয়ায় শেয়ার করা অনুরোধটি নিশ্চিত করা যাচ্ছে না।'],['This request is not currently visible. It may be awaiting review, expired or removed.','এই অনুরোধটি এখন দেখা যাচ্ছে না। এটি পর্যালোচনাধীন, মেয়াদোত্তীর্ণ বা সরানো হয়ে থাকতে পারে।'],['Your request has been submitted for review. The shared link will show it on the board only after approval; meanwhile, search for donors or share the details directly.','আপনার অনুরোধ পর্যালোচনার জন্য জমা হয়েছে। অনুমোদনের পর শেয়ার করা লিংকে সেটি বোর্ডে দেখা যাবে; এর মধ্যে ডোনার খুঁজুন বা সরাসরি তথ্য শেয়ার করুন।'],['Availability (self-reported)','প্রাপ্যতা (নিজের দেওয়া তথ্য)'],['Marked available','প্রস্তুত হিসেবে চিহ্নিত'],['Marked unavailable','প্রস্তুত নন হিসেবে চিহ্নিত'],['Display filter until','তালিকার ফিল্টার শেষ'],['No date recorded','কোনো তারিখ দেওয়া নেই'],['Display filter','তালিকার ফিল্টার'],['This records today and marks your profile unavailable. The 56-day display filter is not a medical eligibility decision; ask the blood bank. You can update your availability later.','এতে আজকের রক্তদান নথিভুক্ত হবে এবং আপনাকে অনুপলব্ধ হিসেবে চিহ্নিত করা হবে। ৫৬ দিনের তালিকা-ফিল্টার চিকিৎসাগত যোগ্যতার সিদ্ধান্ত নয়; ব্লাড ব্যাংকে নিশ্চিত করুন। পরে প্রাপ্যতা পরিবর্তন করতে পারবেন।']);
pairs.push(['Blood needed','রক্ত প্রয়োজন'],['Posted by','জমা দিয়েছেন'],['a volunteer','একজন স্বেচ্ছাসেবী']);
pairs.push(['While this page is open, you may receive alerts for new approved requests.','পেজটি খোলা থাকলে নতুন অনুমোদিত অনুরোধের সতর্কবার্তা পেতে পারেন।'],['Alerts may appear while the site is open; delivery is not guaranteed.','সাইট খোলা থাকলে সতর্কবার্তা দেখা যেতে পারে; পৌঁছানো নিশ্চিত নয়।']);
pairs.push(['Update failed. Check access and connection.','আপডেট হয়নি। অনুমতি ও সংযোগ পরীক্ষা করুন।'],['Deletion failed. Check access and connection.','মুছে ফেলা যায়নি। অনুমতি ও সংযোগ পরীক্ষা করুন।'],['Announcement not published. Check access and connection.','ঘোষণা প্রকাশ হয়নি। অনুমতি ও সংযোগ পরীক্ষা করুন।']);
pairs.push(
['Donor card','ডোনার কার্ড'],['MADE FOR DONORS','রক্তদাতাদের জন্য'],['Create your donor card','নিজের ডোনার কার্ড তৈরি করুন'],['Enter your details, review the preview and download a shareable PNG. Creating a card does not register you as a donor.','তথ্য দিন, প্রিভিউ দেখে শেয়ারযোগ্য PNG ডাউনলোড করুন। কার্ড তৈরি করলে স্বয়ংক্রিয়ভাবে ডোনার নিবন্ধন হয় না।'],['STEP 01','ধাপ ০১'],['Your details','আপনার তথ্য'],['Only name, blood group and district are required.','শুধু নাম, রক্তের গ্রুপ ও জেলা প্রয়োজন।'],['Use my profile details','আমার প্রোফাইলের তথ্য আনুন'],['Optional: load a profile saved on this device, or enter details manually. Importing replaces the current fields.','ইচ্ছা হলে এই ডিভাইসের প্রোফাইল থেকে তথ্য আনুন, অথবা নিজে লিখুন। প্রোফাইল থেকে আনলে বর্তমান ঘরের তথ্য বদলে যাবে।'],['Enter your name','আপনার নাম লিখুন'],['e.g. Mirpur','যেমন: মিরপুর'],['Mobile number','মোবাইল নম্বর'],['Your number stays off the image unless you choose to include it.','আপনি না চাইলে কার্ডে মোবাইল নম্বর থাকবে না।'],['Include my mobile number on the card','কার্ডে আমার মোবাইল নম্বর যুক্ত করুন'],['Before you share','শেয়ার করার আগে'],['Anyone who receives the image can see everything on it. The card is created on this device; it is not an official ID or proof of verification.','যিনি ছবিটি পাবেন, তিনি এতে থাকা সব তথ্য দেখতে পারবেন। কার্ডটি এই ডিভাইসে তৈরি হয়; এটি আনুষ্ঠানিক পরিচয়পত্র বা যাচাইয়ের প্রমাণ নয়।'],['Complete the required details to download.','ডাউনলোড করতে প্রয়োজনীয় তথ্য পূরণ করুন।'],['Download donor card (PNG)','ডোনার কার্ড ডাউনলোড করুন (PNG)'],['STEP 02','ধাপ ০২'],['Live preview','লাইভ প্রিভিউ'],['Check your details before downloading.','ডাউনলোডের আগে তথ্যগুলো দেখে নিন।'],['Donor card preview','ডোনার কার্ডের প্রিভিউ'],['Made locally in your browser. Your card is not uploaded or saved by this tool.','কার্ডটি আপনার ব্রাউজারেই তৈরি হয়। এই টুল কার্ড আপলোড বা সংরক্ষণ করে না।'],['Some long details were shortened. Check the image before sharing.','কিছু দীর্ঘ তথ্য সংক্ষিপ্ত করা হয়েছে। শেয়ারের আগে ছবিটি যাচাই করুন।'],['Create donor card','ডোনার কার্ড তৈরি করুন'],['Create donor card →','ডোনার কার্ড তৈরি করুন →'],['Create card','কার্ড তৈরি করুন'],['Create request card','অনুরোধের কার্ড তৈরি করুন'],['Emergency request card','জরুরি অনুরোধের কার্ড'],['Review the card before sharing. The contact number will be visible in the image.','শেয়ারের আগে কার্ডটি দেখে নিন। ছবিতে যোগাযোগের নম্বর দৃশ্যমান থাকবে।'],['Emergency request card preview','জরুরি অনুরোধের কার্ডের প্রিভিউ'],['Download PNG','PNG ডাউনলোড করুন'],['Card preview could not be created. Please try again.','কার্ডের প্রিভিউ তৈরি হয়নি। আবার চেষ্টা করুন।'],['Download failed. Please try again.','ডাউনলোড হয়নি। আবার চেষ্টা করুন।']
);
pairs.push(['Needed by (BD time)','প্রয়োজনের সময় (বাংলাদেশ)']);
pairs.push(['Voluntary blood donation','স্বেচ্ছায় রক্তদান'],['Here for each other','পাশে আছি, একসাথে']);
// Refined public-facing copy takes priority over older synonym mappings.
pairs.unshift(...[
  [
    "জরুরি রক্তের প্রয়োজনে রক্তদাতা খুঁজুন। স্বেচ্ছায় রক্তদাতা হিসেবেও যুক্ত হতে পারেন।",
    "Find a donor when blood is needed, or join the community as a voluntary donor."
  ],
  [
    "Share the essential details. Your request goes to a moderator for review before appearing on the board.",
    "প্রয়োজনীয় তথ্য দিয়ে অনুরোধ জমা দিন। বোর্ডে প্রকাশের আগে এটি মডারেটরের পর্যালোচনায় যাবে।"
  ],
  [
    "While you wait for review, search for donors and share the details. Approved requests appear on the board.",
    "পর্যালোচনার অপেক্ষায় রক্তদাতা খুঁজুন ও প্রয়োজনের তথ্য শেয়ার করুন। অনুমোদিত অনুরোধ বোর্ডে দেখা যাবে।"
  ],
  [
    "Confirm the need with the hospital and availability with the donor. When the need is met, mark the request fulfilled.",
    "হাসপাতালের সঙ্গে প্রয়োজন এবং রক্তদাতার সঙ্গে প্রাপ্যতা নিশ্চিত করুন। প্রয়োজন পূরণ হলে অনুরোধটি পূরণ হয়েছে বলে চিহ্নিত করুন।"
  ],
  [
    "Choose a blood group to browse matching donor profiles.",
    "রক্তের গ্রুপ বেছে নিয়ে মিল আছে এমন রক্তদাতাদের তালিকা দেখুন।"
  ],
  [
    "A guide to blood group compatibility",
    "রক্তের গ্রুপের সামঞ্জস্য সম্পর্কে জানুন"
  ],
  [
    "This guide shows basic red-cell compatibility. The treating clinician and blood bank make the final decision.",
    "এটি লোহিত রক্তকণিকার প্রাথমিক সামঞ্জস্যের নির্দেশিকা। চূড়ান্ত সিদ্ধান্ত চিকিৎসক ও ব্লাড ব্যাংকের।"
  ],
  [
    "These figures reflect registrations and self-reported availability. They may be outdated if the connection is unavailable.",
    "নিবন্ধন ও স্বঘোষিত প্রাপ্যতার ভিত্তিতে এই তথ্য দেখানো হয়। সংযোগ না থাকলে তথ্য পুরোনো হতে পারে।"
  ],
  [
    "প্রকাশিত অনুরোধ দেখুন। সাড়া দেওয়ার আগে হাসপাতালের সঙ্গে প্রয়োজন নিশ্চিত করুন।",
    "Browse published requests. Confirm the need with the hospital before responding."
  ],
  [
    "ডোনার তালিকার তথ্য স্বেচ্ছায় দেওয়া। যোগাযোগের আগে প্রাপ্যতা ও হাসপাতালের তথ্য নিশ্চিত করুন। ফোন নম্বর প্রকাশ্যে পাওয়া যায়; ব্যক্তিগত তথ্য দেওয়ার আগে আমাদের",
    "Donor profiles are self-reported. Confirm availability and hospital details before making arrangements. Phone numbers are publicly accessible; before sharing personal information, read our"
  ],
  [
    "A student-led volunteer community helping people connect when blood is needed.",
    "রক্তের প্রয়োজনে মানুষের সঙ্গে মানুষের যোগাযোগ গড়ে তুলতে শিক্ষার্থীদের স্বেচ্ছাসেবী উদ্যোগ।"
  ],
  [
    "This is a basic red-cell compatibility guide. The blood bank and treating clinician make the final decision.",
    "এটি লোহিত রক্তকণিকার প্রাথমিক সামঞ্জস্যের নির্দেশিকা। চূড়ান্ত সিদ্ধান্ত ব্লাড ব্যাংক ও চিকিৎসকের।"
  ],
  [
    "Find a donor who may be able to help",
    "সহযোগিতা করতে পারেন এমন রক্তদাতা খুঁজুন"
  ],
  [
    "Await review",
    "পর্যালোচনার অপেক্ষা"
  ],
  [
    "Request information, including the contact number, may be publicly accessible even while awaiting review. Share only details you have permission to publish.",
    "যোগাযোগের নম্বরসহ অনুরোধের তথ্য পর্যালোচনার অপেক্ষায় থাকলেও প্রকাশ্যে পাওয়া যেতে পারে। প্রকাশের অনুমতি আছে এমন তথ্যই দিন।"
  ],
  [
    "contact the hospital blood bank, ask people you know for help, and share the necessary details. In a life-threatening emergency, call the hospital or 999.",
    "হাসপাতালের ব্লাড ব্যাংকে যোগাযোগ করুন, পরিচিতদের সাহায্য চান এবং প্রয়োজনীয় তথ্য শেয়ার করুন। জীবন-সংকটাপন্ন পরিস্থিতিতে হাসপাতাল বা ৯৯৯-এ ফোন করুন।"
  ],
  [
    "Your name will be public. Bring identification if the hospital asks for it.",
    "আপনার নাম প্রকাশ্যে থাকবে। হাসপাতাল চাইলে পরিচয়পত্র সঙ্গে রাখুন।"
  ],
  [
    "This number is publicly accessible. Only enter a number you agree to share.",
    "এই নম্বর প্রকাশ্যে পাওয়া যাবে। শুধু শেয়ার করতে সম্মত এমন নম্বর দিন।"
  ],
  [
    "If you are unsure, confirm your blood group through a test.",
    "রক্তের গ্রুপ জানা না থাকলে পরীক্ষার মাধ্যমে নিশ্চিত করুন।"
  ],
  [
    "Used to help people find donors in this district.",
    "এই জেলায় রক্তদাতা খুঁজতে তথ্যটি ব্যবহার হয়।"
  ],
  [
    "Optional; helps people understand your general area.",
    "ঐচ্ছিক; আপনার সাধারণ এলাকা বুঝতে সাহায্য করে।"
  ],
  [
    "This number appears on your public donor listing.",
    "এই সংখ্যা আপনার প্রকাশ্য ডোনার তালিকায় দেখা যাবে।"
  ],
  [
    "I confirm that these details are accurate and consent to my name, blood group, area and phone number being publicly accessible. GPS coordinates will also be accessible if I choose to share them.",
    "আমি নিশ্চিত করছি তথ্যগুলো সঠিক এবং আমার নাম, রক্তের গ্রুপ, এলাকা ও ফোন নম্বর প্রকাশ্যে পাওয়া যাবে—এতে আমি সম্মত। GPS অবস্থান দিলে সেটিও পাওয়া যাবে।"
  ],
  [
    "No email or password is required. Keep access to this browser to edit or remove your listing; changes require a connection.",
    "ইমেইল বা পাসওয়ার্ড প্রয়োজন নেই। প্রোফাইল সম্পাদনা বা সরাতে এই ব্রাউজারের প্রবেশাধিকার রাখুন; পরিবর্তনের জন্য সংযোগ প্রয়োজন।"
  ],
  [
    "Built by students, for a community that cares.",
    "শিক্ষার্থীদের উদ্যোগ, মানুষের পাশে থাকার জন্য।"
  ],
  [
    "One Drop is a volunteer initiative by Notre Dame College, Dhaka, Batch 27 students. It helps people find donors and share blood requests.",
    "One Drop নটর ডেম কলেজ, ঢাকা—ব্যাচ ২৭-এর শিক্ষার্থীদের স্বেচ্ছাসেবী উদ্যোগ। এখানে রক্তদাতা খোঁজা ও রক্তের অনুরোধ শেয়ার করা যায়।"
  ],
  [
    "Our principles:",
    "আমাদের মূলনীতি:"
  ],
  [
    "Donation should be voluntary and unpaid. Moderators may review or remove misleading, commercial or inappropriate listings.",
    "রক্তদান হবে স্বেচ্ছায় ও বিনামূল্যে। বিভ্রান্তিকর, বাণিজ্যিক বা অনুপযুক্ত তথ্য মডারেটর পর্যালোচনা বা সরাতে পারেন।"
  ],
  [
    "An installable app with limited offline access to cached information",
    "ইনস্টলযোগ্য অ্যাপ; অফলাইনে সংরক্ষিত পুরোনো তথ্য সীমিতভাবে দেখা যেতে পারে"
  ],
  [
    "Charge a fee for using the site",
    "সাইট ব্যবহারের জন্য ফি নেয়"
  ],
  [
    "This is a basic red-cell compatibility guide. Confirm the appropriate blood type with the treating clinician and blood bank.",
    "এটি লোহিত রক্তকণিকার প্রাথমিক সামঞ্জস্যের নির্দেশিকা। উপযুক্ত রক্তের গ্রুপ চিকিৎসক ও ব্লাড ব্যাংকের সঙ্গে নিশ্চিত করুন।"
  ],
  [
    "Students of Notre Dame College, Dhaka — Batch 27. The idea and initiative behind One Drop.",
    "নটর ডেম কলেজ, ঢাকা—ব্যাচ ২৭-এর শিক্ষার্থীদের ভাবনা ও উদ্যোগ।"
  ],
  [
    "Foysal Mahmud — planning, design and development of One Drop.",
    "ফয়সাল মাহমুদ—One Drop-এর পরিকল্পনা, ডিজাইন ও নির্মাণ।"
  ],
  [
    "Contact the developer ↗",
    "ডেভেলপারের সঙ্গে যোগাযোগ ↗"
  ],
  [
    "Volunteer moderators can review listings, reports and emergency requests.",
    "স্বেচ্ছাসেবী মডারেটররা তালিকা, অভিযোগ ও জরুরি অনুরোধ পর্যালোচনা করতে পারেন।"
  ],
  [
    "Built with HTML, CSS, JavaScript, Firebase Authentication and Firestore, with limited offline access.",
    "HTML, CSS, JavaScript, Firebase Authentication ও Firestore দিয়ে তৈরি; সীমিত অফলাইন সুবিধা রয়েছে।"
  ],
  [
    "Share One Drop with people you know, or",
    "পরিচিতদের সঙ্গে One Drop শেয়ার করুন অথবা"
  ],
  [
    "join the WhatsApp community",
    "WhatsApp কমিউনিটিতে যোগ দিন"
  ],
  [
    ". For corrections or suggestions, use the",
    "। সংশোধন বা পরামর্শ জানাতে ব্যবহার করুন"
  ],
  [
    "contact form",
    "যোগাযোগ ফর্ম"
  ],
  [
    "Questions about blood donation and One Drop",
    "রক্তদান ও One Drop সম্পর্কে সাধারণ প্রশ্ন"
  ],
  [
    "Find clear answers below. For questions about the site, use our",
    "নিচে সহজ ভাষায় উত্তর দেওয়া হলো। সাইট বিষয়ে প্রশ্ন থাকলে ব্যবহার করুন আমাদের"
  ],
  [
    "The blood bank checks age, weight, haemoglobin and other requirements under applicable guidance. Ask the blood bank if you are unsure.",
    "প্রযোজ্য নীতিমালা অনুযায়ী ব্লাড ব্যাংক বয়স, ওজন, হিমোগ্লোবিনসহ অন্যান্য যোগ্যতা যাচাই করে। কোনো প্রশ্ন থাকলে তাদের জিজ্ঞেস করুন।"
  ],
  [
    "When should I speak to the blood bank before donating?",
    "রক্তদানের আগে কখন ব্লাড ব্যাংকের সঙ্গে কথা বলব?"
  ],
  [
    "Tell the blood bank about illness, infection, medicines, recent surgery, tattoos, pregnancy, breastfeeding or recent donations. The medical team will advise you.",
    "অসুস্থতা, সংক্রমণ, ওষুধ, সাম্প্রতিক অস্ত্রোপচার, ট্যাটু, গর্ভাবস্থা, স্তন্যদান বা সাম্প্রতিক রক্তদানের কথা ব্লাড ব্যাংককে জানান। চিকিৎসাকর্মীরা পরামর্শ দেবেন।"
  ],
  [
    "Eat a normal meal, drink enough water and rest beforehand. Follow the blood bank’s instructions and bring any identification they request.",
    "আগে স্বাভাবিক খাবার খান, পর্যাপ্ত পানি পান করুন ও বিশ্রাম নিন। ব্লাড ব্যাংকের নির্দেশনা অনুসরণ করুন এবং প্রয়োজনীয় পরিচয়পত্র নিন।"
  ],
  [
    "You may feel a brief needle prick or light-headedness. Tell the medical staff immediately if you feel unwell; they can help you.",
    "সুঁই ফোটানোর সময় অল্প ব্যথা বা মাথা ঘোরা অনুভব হতে পারে। অস্বস্তি হলে সঙ্গে সঙ্গে চিকিৎসাকর্মীকে জানান; তাঁরা সহায়তা করবেন।"
  ],
  [
    "What should I know about the equipment?",
    "সরঞ্জাম সম্পর্কে কী জানা প্রয়োজন?"
  ],
  [
    "Ask the staff to confirm that sterile, single-use equipment is used. Discuss any safety concerns with them before donating.",
    "জীবাণুমুক্ত ও একবার ব্যবহারযোগ্য সরঞ্জাম ব্যবহার হচ্ছে কি না, কর্মীদের কাছে নিশ্চিত করুন। নিরাপত্তা নিয়ে প্রশ্ন থাকলে রক্তদানের আগে তাঁদের জানান।"
  ],
  [
    "No. You can browse donors, requests and compatibility information without registering. To be listed as a donor, submit a profile; no email or password is required.",
    "না। নিবন্ধন ছাড়াই ডোনার তালিকা, অনুরোধ ও সামঞ্জস্যের তথ্য দেখতে পারেন। রক্তদাতার তালিকায় থাকতে প্রোফাইল জমা দিন; ইমেইল বা পাসওয়ার্ড প্রয়োজন নেই।"
  ],
  [
    "On the browser you registered with, open",
    "নিবন্ধনের ব্রাউজারে খুলুন"
  ],
  [
    ". Choose “Remove my listing” to delete it, or “Mark as busy” for a temporary break. A connection is needed to save the change.",
    "। মুছতে “তালিকা থেকে সরান” চাপুন, অথবা বিরতির জন্য “এখন প্রস্তুত নই” বেছে নিন। পরিবর্তন সংরক্ষণে সংযোগ প্রয়োজন।"
  ],
  [
    "Some previously cached pages and information may be available offline, but they may be outdated. New requests and profile changes need a connection.",
    "আগে সংরক্ষিত কিছু পৃষ্ঠা ও তথ্য অফলাইনে দেখা যেতে পারে, তবে তথ্য পুরোনো হতে পারে। নতুন অনুরোধ ও প্রোফাইল পরিবর্তনে সংযোগ প্রয়োজন।"
  ],
  [
    "Yes. You can join the One Drop WhatsApp community to connect with volunteers and share requests. Joining is optional, and you can leave at any time. Confirm urgent details with the hospital.",
    "হ্যাঁ। স্বেচ্ছাসেবীদের সঙ্গে যুক্ত হতে ও অনুরোধ শেয়ার করতে One Drop WhatsApp কমিউনিটিতে যোগ দিতে পারেন। যোগ দেওয়া ঐচ্ছিক; যেকোনো সময় বের হতে পারবেন। জরুরি তথ্য হাসপাতালের সঙ্গে নিশ্চিত করুন।"
  ],
  [
    "Using One Drop is free. It is a student-led volunteer initiative.",
    "One Drop ব্যবহার বিনামূল্যে। এটি শিক্ষার্থীদের স্বেচ্ছাসেবী উদ্যোগ।"
  ],
  [
    "Eat a normal meal beforehand",
    "রক্তদানের আগে স্বাভাবিক খাবার খান"
  ],
  [
    "Drink enough water",
    "পর্যাপ্ত পানি পান করুন"
  ],
  [
    "Get enough rest",
    "পর্যাপ্ত বিশ্রাম নিন"
  ],
  [
    "Tell staff about illness and medicines",
    "অসুস্থতা ও ওষুধের তথ্য জানান"
  ],
  [
    "Ask the blood bank about donation intervals",
    "রক্তদানের বিরতি ব্লাড ব্যাংকে নিশ্চিত করুন"
  ],
  [
    "Bring any identification requested",
    "প্রয়োজনীয় পরিচয়পত্র সঙ্গে নিন"
  ],
  [
    "Questions about the website?",
    "সাইট বিষয়ে যোগাযোগ"
  ],
  [
    "For website questions, you can also contact Foysal Mahmud through his portfolio:",
    "সাইট বিষয়ে প্রয়োজনে ফয়সাল মাহমুদের পোর্টফোলিওর মাধ্যমে যোগাযোগ করুন:"
  ],
  [
    "Contact the hospital blood bank first. You can also submit a request and share the details while it awaits review.",
    "আগে হাসপাতালের ব্লাড ব্যাংকে যোগাযোগ করুন। চাইলে অনুরোধ জমা দিয়ে পর্যালোচনার অপেক্ষায় তথ্য শেয়ার করতে পারেন।"
  ],
  [
    "Please review how your information is used. Last updated: 2 November 2026.",
    "আপনার তথ্য কীভাবে ব্যবহৃত হয়, তা জেনে নিন। সর্বশেষ হালনাগাদ: ২ নভেম্বর ২০২৬।"
  ],
  [
    "Donor profiles include your name, phone, blood group, district, availability and any optional details you provide, including GPS if you choose to share it. New emergency requests include blood group, units, hospital, district, contact number and needed-by time. Older records may contain additional details.",
    "ডোনার প্রোফাইলে নাম, ফোন, রক্তের গ্রুপ, জেলা, প্রাপ্যতা ও আপনার দেওয়া ঐচ্ছিক তথ্য থাকে; চাইলে GPS অবস্থানও যুক্ত হয়। নতুন জরুরি অনুরোধে রক্তের গ্রুপ, ব্যাগের সংখ্যা, হাসপাতাল, জেলা, যোগাযোগের নম্বর ও প্রয়োজনের সময় থাকে। পুরোনো রেকর্ডে অতিরিক্ত তথ্য থাকতে পারে।"
  ],
  [
    "Only submit information you are comfortable sharing publicly. Avoid medical records, identity numbers and other sensitive details in free-text fields.",
    "প্রকাশ্যে দিতে স্বাচ্ছন্দ্যবোধ করেন এমন তথ্যই জমা দিন। উন্মুক্ত লেখার ঘরে চিকিৎসার নথি, পরিচয়পত্রের নম্বর বা অন্য সংবেদনশীল তথ্য দেবেন না।"
  ],
  [
    "Precise location is optional. The interface may show approximate distance, but shared GPS coordinates are accessible in directory data. Without GPS, the district centre is used as a rough estimate.",
    "সুনির্দিষ্ট অবস্থান দেওয়া ঐচ্ছিক। পৃষ্ঠায় আনুমানিক দূরত্ব দেখানো হলেও দেওয়া GPS স্থানাঙ্ক ডিরেক্টরির তথ্যে পাওয়া যায়। GPS না দিলে জেলার কেন্দ্র থেকে মোটামুটি দূরত্ব অনুমান করা হয়।"
  ],
  [
    "On the browser used to register, open",
    "নিবন্ধনের ব্রাউজারে খুলুন"
  ],
  [
    ". You can edit, pause or remove the listing when connected. If you lose access, contact the team for assistance; recovery is not guaranteed.",
    "। সংযোগ থাকলে প্রোফাইল সম্পাদনা, সাময়িক বন্ধ বা সরাতে পারবেন। প্রবেশাধিকার হারালে সহায়তার জন্য টিমের সঙ্গে যোগাযোগ করুন; পুনরুদ্ধার নিশ্চিত নয়।"
  ],
  [
    "Volunteer moderators may review and remove misleading, duplicate, commercial or abusive listings and requests. Review does not guarantee that every detail has been independently verified.",
    "স্বেচ্ছাসেবী মডারেটররা বিভ্রান্তিকর, পুনরাবৃত্ত, বাণিজ্যিক বা আপত্তিকর তালিকা ও অনুরোধ পর্যালোচনা করে সরাতে পারেন। পর্যালোচনা মানেই প্রতিটি তথ্য স্বাধীনভাবে যাচাই হয়েছে—এমন নিশ্চয়তা নয়।"
  ],
  [
    "Provide accurate information. The blood bank or clinician determines medical eligibility.",
    "সঠিক তথ্য দিন। রক্তদানের চিকিৎসাগত যোগ্যতা ব্লাড ব্যাংক বা চিকিৎসক নির্ধারণ করবেন।"
  ],
  [
    "One Drop helps people connect; it is not a medical service. The clinician and blood bank make transfusion decisions.",
    "One Drop যোগাযোগের মাধ্যম, চিকিৎসাসেবা নয়। রক্ত পরিসঞ্চালনের সিদ্ধান্ত চিকিৎসক ও ব্লাড ব্যাংকের।"
  ],
  [
    "If this policy changes, this page and its update date will be revised.",
    "নীতিতে পরিবর্তন হলে এই পৃষ্ঠা ও হালনাগাদের তারিখ সংশোধন করা হবে।"
  ],
  [
    "Found incorrect information or have a suggestion? Send the team a message. Please do not include sensitive medical or identity details.",
    "ভুল তথ্য পেয়েছেন বা কোনো পরামর্শ আছে? টিমকে বার্তা পাঠান। সংবেদনশীল চিকিৎসা বা পরিচয়পত্রের তথ্য দেবেন না।"
  ],
  [
    "Message sent. The team can review it.",
    "বার্তা পাঠানো হয়েছে। টিম এটি পর্যালোচনা করতে পারবে।"
  ],
  [
    "Emergency request data, including the contact number, may also be publicly accessible while a request is awaiting review. Do not submit someone else’s information without permission.",
    "জরুরি অনুরোধের যোগাযোগের নম্বরসহ তথ্য পর্যালোচনার অপেক্ষায় থাকলেও প্রকাশ্যে পাওয়া যেতে পারে। অনুমতি ছাড়া অন্যের তথ্য জমা দেবেন না।"
  ],
  [
    "Donor details, phone and optional GPS coordinates are publicly accessible.",
    "ডোনারের তথ্য, ফোন ও ঐচ্ছিক GPS স্থানাঙ্ক প্রকাশ্যে পাওয়া যায়।"
  ],
  [
    "Request details may be accessible even before approval.",
    "অনুমোদনের আগেও অনুরোধের তথ্য পাওয়া যেতে পারে।"
  ],
  [
    "UI masking does not make public records private.",
    "পৃষ্ঠায় আড়াল করলেই প্রকাশ্য রেকর্ড ব্যক্তিগত হয়ে যায় না।"
  ],
  [
    "You appear to be offline",
    "আপনি সম্ভবত অফলাইনে আছেন"
  ],
  [
    "Some saved pages may still be available, but information may be outdated. Reconnect to see current data or submit a request.",
    "আগে সংরক্ষিত কিছু পৃষ্ঠা দেখা যেতে পারে, তবে তথ্য পুরোনো হতে পারে। বর্তমান তথ্য দেখতে বা অনুরোধ জমা দিতে আবার সংযুক্ত হোন।"
  ],
  [
    "Open home",
    "হোমপেজ খুলুন"
  ],
  [
    "For a life-threatening emergency, call",
    "জীবন-সংকটাপন্ন জরুরি অবস্থায় ফোন করুন"
  ],
  [
    "or the hospital blood bank directly.",
    "অথবা সরাসরি হাসপাতালের ব্লাড ব্যাংকে।"
  ]
]);
pairs.unshift(
  [': open it in the browser used to register. Choose “Remove my listing” to delete it. “Mark as busy” changes your availability but does not make your record private. Changes need a connection.', ': নিবন্ধনের ব্রাউজারে এটি খুলুন। মুছতে “তালিকা থেকে সরান” চাপুন। “এখন প্রস্তুত নই” বেছে নিলে প্রাপ্যতা বদলাবে, কিন্তু রেকর্ড গোপন হবে না। পরিবর্তন সংরক্ষণে সংযোগ প্রয়োজন।'],
  [': open it in the browser used to register. When connected, you can edit, mark yourself unavailable or remove the listing. Marking yourself unavailable does not make your record private. If you lose access, contact the team; recovery is not guaranteed.', ': নিবন্ধনের ব্রাউজারে এটি খুলুন। সংযোগ থাকলে তথ্য সম্পাদনা, নিজেকে অনুপলব্ধ চিহ্নিত বা তালিকা থেকে সরাতে পারবেন। অনুপলব্ধ চিহ্নিত করলেও রেকর্ড গোপন হয় না। প্রবেশাধিকার হারালে টিমের সঙ্গে যোগাযোগ করুন; পুনরুদ্ধার নিশ্চিত নয়।'],
  ['Not listed yet?', 'এখনও তালিকায় নেই?'],
  ['This optional field accepts ages 18–65. The blood bank or clinician decides eligibility.', 'ঐচ্ছিক এই ঘরে ১৮–৬৫ বছর বয়স লেখা যায়। যোগ্যতা ব্লাড ব্যাংক বা চিকিৎসক নির্ধারণ করবেন।'],
  ['e.g. Available after 6 PM on weekdays.', 'যেমন: কর্মদিবসে সন্ধ্যা ৬টার পর যোগাযোগ করুন।'],
  ['e.g. Wrong blood group in a listing', 'যেমন: তালিকায় রক্তের গ্রুপ ভুল আছে']
);
pairs.unshift(
 ['Moderator access and security','মডারেটরের প্রবেশাধিকার ও নিরাপত্তা'],
 ['Ask the project owner to arrange a moderator account. Access depends on the authentication settings and Firestore rules actually deployed.','মডারেটর অ্যাকাউন্টের জন্য প্রকল্পের দায়িত্বশীল ব্যক্তির সঙ্গে যোগাযোগ করুন। প্রবেশাধিকার কার্যকর authentication সেটিংস ও Firestore rules-এর ওপর নির্ভর করে।'],
 ['The proposed repository rules can treat any password-provider account as staff. Do not enable public email/password sign-up or publish rules without an owner-approved role design and staging tests. The dashboard alone is not an access-control system.','রিপোজিটরির প্রস্তাবিত নিয়মে যেকোনো password-provider অ্যাকাউন্ট staff হিসেবে গণ্য হতে পারে। দায়িত্বশীল ব্যক্তির অনুমোদিত role নকশা ও staging পরীক্ষা ছাড়া সবার জন্য email/password নিবন্ধন চালু বা rules প্রকাশ করবেন না। শুধু ড্যাশবোর্ড প্রবেশাধিকার নিয়ন্ত্রণ করে না।']
);
pairs.unshift(
 ['Update your donor profile','আপনার ডোনার প্রোফাইল সম্পাদনা করুন'],
 ['Save changes','পরিবর্তন সংরক্ষণ করুন'],
 ['Copy my donor link','আমার ডোনার লিংক কপি করুন'],
 ['Reviewed by the team','টিমের পর্যালোচিত'],
 ['Awaiting review','পর্যালোচনার অপেক্ষায়'],
 ['Self-reported · awaiting review','নিজের দেওয়া তথ্য · পর্যালোচনার অপেক্ষায়'],
 ['This information is self-reported. Review does not determine medical eligibility. Confirm availability and donation requirements with the donor and blood bank.','তথ্যগুলো নিজে দেওয়া। পর্যালোচনায় চিকিৎসাগত যোগ্যতা নির্ধারণ হয় না। প্রাপ্যতা ও রক্তদানের শর্ত রক্তদাতা ও ব্লাড ব্যাংকের সঙ্গে নিশ্চিত করুন।'],
 ['Enter an age from 18 to 65 for this optional field.','ঐচ্ছিক এই ঘরে ১৮ থেকে ৬৫-এর মধ্যে বয়স লিখুন।'],
 ['You can update the information in your profile. Changes need a successful connection to save.','প্রোফাইলের তথ্য পরিবর্তন করতে পারেন। পরিবর্তন সংরক্ষণে সফল সংযোগ প্রয়োজন।']
);
pairs.unshift(['Your name, contact number and other profile details are publicly accessible. Please read the privacy policy before registering.','আপনার নাম, যোগাযোগের নম্বর ও প্রোফাইলের অন্যান্য তথ্য প্রকাশ্যে পাওয়া যাবে। নিবন্ধনের আগে গোপনীয়তা নীতি পড়ুন।']);
// Plain, task-oriented wording takes priority.
pairs.unshift(...[
  [
    "Find a blood donor.",
    "রক্তদাতা খুঁজুন।"
  ],
  [
    "Become a donor.",
    "রক্তদাতা হোন।"
  ],
  [
    "রক্তের প্রয়োজন হলে গ্রুপ ও জেলা দিয়ে খুঁজুন। চাইলে রক্তদাতা হিসেবেও নাম লেখাতে পারেন।",
    "If you need blood, search by group and district. You can also register as a voluntary donor."
  ],
  [
    "Want to become a donor?",
    "রক্তদাতা হতে চান?"
  ],
  [
    "Sign up as a donor",
    "নিবন্ধন করুন"
  ],
  [
    "An initiative by Notre Dame College students",
    "নটর ডেম কলেজের শিক্ষার্থীদের উদ্যোগ"
  ],
  [
    "এলাকা দিয়ে খুঁজলে ডোনারের দেওয়া বানান ব্যবহার করুন। না পেলে ঘরটি খালি রাখুন।",
    "For area searches, use the spelling in the donor profile. If there are no results, leave it blank."
  ],
  [
    "All donors",
    "সব রক্তদাতা"
  ],
  [
    "রক্ত দেওয়ার আগে হাসপাতালের সঙ্গে প্রয়োজন নিশ্চিত করুন।",
    "Confirm the need with the hospital before donating."
  ],
  [
    "How to request blood",
    "রক্তের অনুরোধ যেভাবে করবেন"
  ],
  [
    "Donor statistics",
    "রক্তদাতার পরিসংখ্যান"
  ],
  [
    "WhatsApp community",
    "WhatsApp কমিউনিটি"
  ],
  [
    "Join the WhatsApp community to share requests and connect with volunteers. Confirm the need with the hospital before responding.",
    "অনুরোধ শেয়ার করতে ও স্বেচ্ছাসেবীদের সঙ্গে যোগাযোগ রাখতে WhatsApp কমিউনিটিতে যোগ দিতে পারেন। সাড়া দেওয়ার আগে হাসপাতালের সঙ্গে প্রয়োজন নিশ্চিত করুন।"
  ],
  [
    "Before you donate",
    "রক্তদানের আগে"
  ],
  [
    "The blood bank can tell you whether you are eligible to donate.",
    "আপনি রক্ত দিতে পারবেন কি না, ব্লাড ব্যাংক তা নিশ্চিত করবে।"
  ],
  [
    "Read donation FAQs",
    "রক্তদান সম্পর্কে জানুন"
  ],
  [
    "About One Drop",
    "One Drop সম্পর্কে"
  ],
  [
    "Connecting people who need blood with voluntary donors",
    "রক্তের প্রয়োজনে যোগাযোগের একটি মাধ্যম"
  ],
  [
    "Find answers to common questions below. For questions about the site, use our",
    "সাধারণ প্রশ্নের উত্তর নিচে পাবেন। সাইট সম্পর্কে জানতে চাইলে ব্যবহার করুন আমাদের"
  ]
]);
pairs.unshift(['Counts use self-reported availability and the 56-day display filter.','সংখ্যাগুলো রক্তদাতার দেওয়া প্রাপ্যতা ও ৫৬ দিনের তালিকা-ফিল্টারের ভিত্তিতে দেখানো হয়।']);
pairs.unshift(['সাইট সম্পর্কে প্রশ্ন থাকলে যোগাযোগ করুন।','Contact us with questions about the site.'],['Let us know if something needs correcting.','কোনো ভুল থাকলে আমাদের জানান।']);
pairs.unshift(['ডোনাররা নিজেরাই তথ্য দিয়েছেন। যোগাযোগের আগে প্রাপ্যতা ও হাসপাতালের তথ্য নিশ্চিত করুন। ফোন নম্বর প্রকাশ্যে পাওয়া যায়।','Donor information is self-reported. Confirm availability and hospital details. Phone numbers are publicly accessible.'],['গোপনীয়তা নীতি পড়ুন।','Read our privacy policy.']);
// Moderator navigation; user-submitted text stays unaltered.
pairs.unshift(...[
  [
    "Moderator",
    "মডারেটর"
  ],
  [
    "Moderator dashboard",
    "মডারেটর প্যানেল"
  ],
  [
    "Sign in with the moderator account to verify donors, manage emergency requests and publish announcements.",
    "ডোনারের তথ্য পর্যালোচনা, জরুরি অনুরোধ পরিচালনা ও ঘোষণা প্রকাশের জন্য মডারেটর অ্যাকাউন্টে লগইন করুন।"
  ],
  [
    "Moderator sign in",
    "মডারেটর লগইন"
  ],
  [
    "Use the moderator email & password that was created in the Firebase console (Authentication → Users → Add user).",
    "মডারেটর অ্যাকাউন্টের ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন।"
  ],
  [
    "Email",
    "ইমেইল"
  ],
  [
    "Password",
    "পাসওয়ার্ড"
  ],
  [
    "Sign in",
    "লগইন করুন"
  ],
  [
    "Signing in…",
    "লগইন হচ্ছে…"
  ],
  [
    "Sign out",
    "লগআউট"
  ],
  [
    "Signed in as",
    "লগইন করা আছে"
  ],
  [
    "Owner — full control",
    "মালিক"
  ],
  [
    "Moderator — limited powers",
    "মডারেটর"
  ],
  [
    "Overview",
    "সংক্ষিপ্ত তথ্য"
  ],
  [
    "Donors",
    "রক্তদাতা"
  ],
  [
    "Requests",
    "অনুরোধ"
  ],
  [
    "Announcements",
    "ঘোষণা"
  ],
  [
    "Messages",
    "বার্তা"
  ],
  [
    "Publish an announcement",
    "ঘোষণা প্রকাশ করুন"
  ],
  [
    "Shown at the top of the home page for every visitor until you hide it.",
    "আড়াল না করা পর্যন্ত ঘোষণাটি হোমপেজে দেখা যাবে।"
  ],
  [
    "Title",
    "শিরোনাম"
  ],
  [
    "Message",
    "বার্তা"
  ],
  [
    "Style",
    "ধরন"
  ],
  [
    "Information (blue)",
    "তথ্য (নীল)"
  ],
  [
    "Alert (red)",
    "সতর্কতা (লাল)"
  ],
  [
    "Publish",
    "প্রকাশ করুন"
  ],
  [
    "Wrong email or password.",
    "ইমেইল বা পাসওয়ার্ড সঠিক নয়।"
  ],
  [
    "Enter the moderator email and password.",
    "মডারেটরের ইমেইল ও পাসওয়ার্ড লিখুন।"
  ],
  [
    "Network problem while signing in. Check your connection.",
    "লগইন করা যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করুন।"
  ],
  [
    "Too many attempts. Wait a few minutes and try again.",
    "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।"
  ],
  [
    "Firebase could not be reached from this device — check your connection and reload.",
    "সংযোগ পাওয়া যাচ্ছে না। ইন্টারনেট পরীক্ষা করে আবার চেষ্টা করুন।"
  ],
  [
    "Donor directory",
    "রক্তদাতার তালিকা"
  ],
  [
    "Review donor details carefully before changing the status. Do not request identity-document photos through this site.",
    "স্ট্যাটাস বদলানোর আগে ডোনারের তথ্য সতর্কভাবে দেখুন। এই সাইটের মাধ্যমে পরিচয়পত্রের ছবি চাইবেন না।"
  ],
  [
    "Refresh",
    "রিফ্রেশ"
  ],
  [
    "Export CSV",
    "CSV ডাউনলোড"
  ],
  [
    "Any status",
    "সব স্ট্যাটাস"
  ],
  [
    "Pending review",
    "পর্যালোচনার অপেক্ষায়"
  ],
  [
    "Verified",
    "পর্যালোচিত"
  ],
  [
    "Suspended",
    "স্থগিত"
  ],
  [
    "Available only",
    "শুধু প্রস্তুত"
  ],
  [
    "Tools",
    "টুলস"
  ],
  [
    "Refresh data",
    "তথ্য রিফ্রেশ করুন"
  ],
  [
    "Clear local cache",
    "ডিভাইসের ক্যাশ মুছুন"
  ],
  [
    "Export donors (CSV)",
    "রক্তদাতার তালিকা (CSV)"
  ],
  [
    "Export requests (CSV)",
    "অনুরোধের তালিকা (CSV)"
  ],
  [
    "Review",
    "পর্যালোচনা"
  ],
  [
    "Actions",
    "করণীয়"
  ],
  [
    "Verify",
    "পর্যালোচিত করুন"
  ],
  [
    "Unverify",
    "পর্যালোচনা বাতিল"
  ],
  [
    "Delete",
    "মুছুন"
  ],
  [
    "Edit",
    "সম্পাদনা"
  ],
  [
    "Contact",
    "যোগাযোগ"
  ],
  [
    "Group",
    "গ্রুপ"
  ],
  [
    "Location",
    "অবস্থান"
  ],
  [
    "Status",
    "অবস্থা"
  ],
  [
    "Unread messages",
    "অপঠিত বার্তা"
  ],
  [
    "Visits",
    "ভিজিট"
  ],
  [
    "Registrations",
    "নিবন্ধন"
  ],
  [
    "Requests posted",
    "জমা দেওয়া অনুরোধ"
  ],
  [
    "Connection",
    "সংযোগ"
  ],
  [
    "Active requests",
    "চলমান অনুরোধ"
  ],
  [
    "all time",
    "মোট"
  ],
  [
    "all read",
    "সব পড়া হয়েছে"
  ],
  [
    "all clear",
    "কোনোটি নেই"
  ]
]);
pairs.unshift(...[["Moderator access and security", "মডারেটর প্রবেশাধিকার ও নিরাপত্তা"], ["Ask the project owner to arrange a moderator account. Access depends on the authentication settings and Firestore rules actually deployed.", "মডারেটর অ্যাকাউন্টের জন্য প্রকল্প পরিচালকের সঙ্গে যোগাযোগ করুন। প্রবেশাধিকার চালু authentication ও Firestore rules-এর ওপর নির্ভর করে।"], ["The proposed repository rules can treat any password-provider account as staff. Do not enable public email/password sign-up or publish rules without an owner-approved role design and staging tests. The dashboard alone is not an access-control system.", "প্রস্তাবিত rules যেকোনো পাসওয়ার্ড অ্যাকাউন্টকে স্টাফ হিসেবে বিবেচনা করতে পারে। দায়িত্বভিত্তিক অনুমোদন এবং পরীক্ষার আগে সবার জন্য ইমেইল-পাসওয়ার্ড নিবন্ধন চালু বা rules প্রকাশ করবেন না। শুধু ড্যাশবোর্ড প্রবেশাধিকার নিয়ন্ত্রণের ব্যবস্থা নয়।"], ["e.g. Blood donation camp on Friday", "যেমন: শুক্রবার রক্তদান ক্যাম্প"], ["Short and actionable works best.", "ঘোষণার বিস্তারিত লিখুন।"]]);
pairs.unshift(['Not a substitute for hospital blood banks. Always verify through the hospital.','এটি হাসপাতালের ব্লাড ব্যাংকের বিকল্প নয়। তথ্য হাসপাতালের সঙ্গে নিশ্চিত করুন।'],['A student-led volunteer community helping people connect when blood is needed.','রক্তদাতা ও যাঁদের রক্ত প্রয়োজন, তাঁদের যোগাযোগের জন্য শিক্ষার্থীদের স্বেচ্ছাসেবী উদ্যোগ।']);
// The mapping is bidirectional; the first entry wins when synonyms collide.
const bnToEn = new Map(), enToBn = new Map();
for (const [a,b] of pairs) {
  const aBn = /[\u0980-\u09ff]/.test(a);
  const bn = aBn ? a : b, en = aBn ? b : a;
  if (!bnToEn.has(bn)) bnToEn.set(bn,en);
  if (!enToBn.has(en)) enToBn.set(en,bn);
}
for (const d of DISTRICTS) { bnToEn.set(DISTRICT_LABELS[d], d); enToBn.set(d, DISTRICT_LABELS[d]); }
const ignoredAttrs = 'script,style,code,pre,.dc-name,.dc-note,.dc-place,.req-note,[data-no-translate],#adminRoot';
const originals = new WeakMap();
const attrOriginals = new WeakMap();
const ignored = 'script,style,code,pre,textarea,.dc-name,.dc-note,.dc-place,.req-note,[data-no-translate],#adminRoot';
let fallbackLanguage = 'bn';
export function language() { try { return sessionStorage.getItem('onedrop:language') === 'en' ? 'en' : 'bn'; } catch { return fallbackLanguage; } }
function normal(s) { return s.trim().replace(/\s+/g,' '); }
function translated(s,lang,element) {
  const val = normal(s); const map = lang === 'bn' ? enToBn : bnToEn;
  let out = map.get(val);
  if (!out && lang === 'bn') {
    let m = val.match(/^Age (\d+(?:\.\d+)?)$/); if(m) out = `বয়স ${m[1]}`;
    m = val.match(/^(\d+) donations?$/); if(m) out = `${m[1]} বার রক্তদান`;
    m = val.match(/^([\d.]+) (km|m) away$/); if(m) out = `প্রায় ${m[1]} ${m[2]==='km'?'কিমি':'মিটার'} দূরে`;
    if (element?.classList.contains('dc-fact')) {
      const ago=val.startsWith('Listed ') ? val.slice(7) : val.split(' · Listed ')[1];
      if (ago) out = `তালিকাভুক্ত: ${ago.replace('just now','এইমাত্র').replace(/(\d+) min ago/,'$1 মিনিট আগে').replace(/(\d+) hrs? ago/,'$1 ঘণ্টা আগে').replace(/(\d+) days? ago/,'$1 দিন আগে').replace(/(\d+) months? ago/,'$1 মাস আগে').replace(/(\d+) yr ago/,'$1 বছর আগে')}`;
    }
    m = val.match(/^Display filter until (\d{4}-\d{2}-\d{2})$/); if(m) out = `তালিকার ফিল্টার শেষ ${m[1]}`;
    if (val === 'just now') out = 'এইমাত্র';
    m = val.match(/^(\d+) (min|hr|hrs|day|days|month|months|yr) ago$/); if(m) out = `${m[1]} ${{min:'মিনিট',hr:'ঘণ্টা',hrs:'ঘণ্টা',day:'দিন',days:'দিন',month:'মাস',months:'মাস',yr:'বছর'}[m[2]]} আগে`;
    m = val.match(/^(\d+) available$/); if(m) out = `${m[1]} জন প্রস্তুত`;
    m = val.match(/^(Live data|Offline data) · (\d+)$/); if(m) out = `${m[1]==='Live data'?'সরাসরি তথ্য':'অফলাইন তথ্য'} · ${m[2]}`;
    m = val.match(/^Find (.+) donors →$/); if(m) out = `${m[1]} ডোনার খুঁজুন →`;
    if (val.includes('In an emergency, doctors decide what is safe')) out = 'এটি শুধু প্রাথমিক তথ্য। নিরাপদ রক্তদানের চূড়ান্ত সিদ্ধান্ত চিকিৎসক ও ব্লাড ব্যাংকের।';
    m = val.match(/^(\d+) donors? found$/); if(m) out = `${m[1]} জন রক্তদাতা পাওয়া গেছে`;
    m = val.match(/^Show (\d+) more$/); if(m) out = `আরও ${m[1]} জন দেখুন`;
    m = val.match(/^(\d+)% complete$/); if(m) out = `${m[1]}% সম্পূর্ণ`;
  }
  if (!out && lang === 'en') {
    let m = val.match(/^(\d+) জন রক্তদাতা পাওয়া গেছে$/); if(m) out = `${m[1]} donors found`;
    m = val.match(/^আরও (\d+) জন দেখুন$/); if(m) out = `Show ${m[1]} more`;
  }
  if (!out) return s;
  return (s.match(/^\s*/)?.[0] || '') + out + (s.match(/\s*$/)?.[0] || '');
}
function render(root=document.body) {
  const lang=language(); document.documentElement.lang=lang;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const el=node.parentElement; if (!el || el.closest(ignored)) continue;
    if (!originals.has(node)) originals.set(node,node.nodeValue);
    const next=translated(originals.get(node),lang,el); if(node.nodeValue!==next) node.nodeValue=next;
  }
  if (root.querySelectorAll) for(const el of root.querySelectorAll('[placeholder],[aria-label],[title]')) {
    if(el.closest(ignoredAttrs)) continue;
    let data=attrOriginals.get(el); if(!data){data={};attrOriginals.set(el,data);}
    for(const a of ['placeholder','aria-label','title']) if(el.hasAttribute(a)) {
      if(!(a in data)) data[a]=el.getAttribute(a);
      const next=translated(data[a],lang); if(el.getAttribute(a)!==next) el.setAttribute(a,next);
    }
  }
  document.querySelectorAll('[data-language-switch]').forEach(el=>{const label=lang==='bn'?'EN':'বাংলা';if(el.textContent!==label) el.textContent=label;el.setAttribute('aria-label',lang==='bn'?'Switch to English':'বাংলায় দেখুন');el.title=lang==='bn'?'Switch to English':'বাংলায় দেখুন';});
}
let timer;
export function initLanguage() {
  document.addEventListener('click', e=>{
    if (!e.target.closest('[data-language-switch]')) return;
    fallbackLanguage = language() === 'bn' ? 'en' : 'bn';
    try { sessionStorage.setItem('onedrop:language', fallbackLanguage); } catch {}
    render();
  });
  render();
  new MutationObserver(()=>{if (!timer) timer=setTimeout(()=>{timer=null;render();},40);}).observe(document.body,{childList:true,subtree:true});
}

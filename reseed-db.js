import { writeFileSync } from "fs";

const db = {
  "users": [
    {
      "username": "Katie",
      "password": "password",
      "id": "4"
    },
    {
      "username": "Penelope",
      "password": "puppy",
      "id": "7"
    },
    {
      "username": "Jess",
      "password": "Strawberry",
      "id": "8"
    },
    {
      "username": "Lindsay",
      "password": "Blueberry",
      "id": "9"
    }
  ],
  "pets": [
    {
      "userId": "4",
      "name": "Indy",
      "species": "cat",
      "breed": "Domestic Shorthair",
      "image": "/assets/cat-images/brown-cat.png",
      "dob": "2024-01-23T05:00:00.000Z",
      "id": "4"
    },
    {
      "userId": "4",
      "name": "Teddy",
      "species": "cat",
      "breed": "Domestic Longhair",
      "image": "/assets/cat-images/gray-cat.png",
      "dob": "2012-01-24T05:00:00.000Z",
      "id": "5"
    },
    {
      "userId": "7",
      "name": "Bluey",
      "species": "dog",
      "breed": "Blue Heeler",
      "image": "/assets/dog-images/red-dog.png",
      "dob": "2015-12-01T05:00:00.000Z",
      "id": "7"
    },
    {
      "userId": "7",
      "name": "Coco",
      "species": "dog",
      "breed": "Poodle",
      "image": "/assets/dog-images/blonde-dog.png",
      "dob": "2018-07-07T05:00:00.000Z",
      "id": "9"
    },
    {
      "userId": "7",
      "name": "Watermelon",
      "species": "dog",
      "breed": "Rottweiler",
      "image": "/assets/dog-images/black-dog.png",
      "dob": "2022-12-01T05:00:00.000Z",
      "id": "10"
    },
    {
      "userId": "7",
      "name": "Sparkles",
      "species": "dog",
      "breed": "Great Dane",
      "image": "/assets/dog-images/brown-dog.png",
      "dob": "1989-04-11T05:00:00.000Z",
      "id": "11"
    },
    {
      "userId": "7",
      "name": "Fluffy Ball",
      "species": "cat",
      "breed": "Domestic Longhair",
      "image": "/assets/cat-images/gray-cat.png",
      "dob": "2022-05-19T05:00:00.000Z",
      "id": "12"
    },
    {
      "userId": "7",
      "name": "Beary Blue",
      "species": "cat",
      "breed": "Domestic Longhair",
      "image": "/assets/cat-images/orange-cat.png",
      "dob": "2023-12-23T05:00:00.000Z",
      "id": "13"
    },
    {
      "userId": "8",
      "name": "Taco",
      "species": "dog",
      "breed": "Siberian Husky",
      "image": "/assets/dog-images/white-dog.png",
      "dob": "2020-07-23T05:00:00.000Z",
      "id": "14"
    },
    {
      "userId": "8",
      "name": "Biscuit",
      "species": "dog",
      "breed": "Australian Shepherd",
      "image": "/assets/dog-images/blonde-dog.png",
      "dob": "2022-01-23T05:00:00.000Z",
      "id": "15"
    },
    {
      "userId": "9",
      "name": "Dutton",
      "species": "dog",
      "breed": "Mixed / Other",
      "image": "/assets/dog-images/black-dog.png",
      "dob": "2022-07-23T05:00:00.000Z",
      "id": "16"
    }
  ],
  "diets": [
    {
      "petId": "5",
      "name": "Purina ProPlan",
      "amount": "1/4 can",
      "frequency": "twice daily",
      "id": "7"
    },
    {
      "petId": "4",
      "name": "Purina ProPlan",
      "amount": "1/4 cup",
      "frequency": "twice daily",
      "id": "8"
    },
    {
      "name": "Proplan",
      "petId": "4",
      "amount": "1/4 can",
      "frequency": "twice daily",
      "id": "9"
    },
    {
      "petId": "5",
      "name": "Purina ProPlan",
      "amount": "1/4 cup",
      "frequency": "twice daily",
      "id": "10"
    },
    {
      "name": "Eukanuba large breed",
      "petId": "14",
      "amount": "3/4 cup",
      "frequency": "twice daily",
      "id": "11"
    },
    {
      "name": "Eukanuba large breed",
      "petId": "15",
      "amount": "1/2 cup",
      "frequency": "twice daily",
      "id": "12"
    },
    {
      "name": "Purina dog chow",
      "petId": "16",
      "amount": "3/4 cup",
      "frequency": "twice daily",
      "id": "13"
    },
    {
      "name": "Purina dog chow canned",
      "petId": "16",
      "amount": "1/4 can",
      "frequency": "once daily",
      "id": "14"
    },
    {
      "name": "Blue Buffalo",
      "petId": "7",
      "amount": "1/2 cup",
      "frequency": "three times daily",
      "id": "15"
    },
    {
      "name": "Blue Buffalo",
      "petId": "9",
      "amount": "2/3 cup",
      "frequency": "twice daily",
      "id": "16"
    },
    {
      "name": "Blue Buffalo",
      "petId": "10",
      "amount": "1 cup",
      "frequency": "three times daily",
      "id": "17"
    },
    {
      "name": "Blue Buffalo",
      "petId": "11",
      "amount": "3 cups",
      "frequency": "3 times daily",
      "id": "18"
    },
    {
      "name": "Purina One indoor",
      "petId": "12",
      "amount": "1/2 cup",
      "frequency": "once dail",
      "id": "19"
    },
    {
      "name": "Purina One canned",
      "petId": "12",
      "amount": "1/2 can",
      "frequency": "once daily",
      "id": "20"
    },
    {
      "name": "Purina One canned",
      "petId": "13",
      "amount": "1/2 can ",
      "frequency": "once daily",
      "id": "21"
    },
    {
      "name": "Purina Ome",
      "petId": "13",
      "amount": "1/2 cup",
      "frequency": "once daily",
      "id": "22"
    }
  ],
  "medications": [
    {
      "petId": "4",
      "name": "Paraxotine 10mg",
      "amount": "1/2 tablet",
      "frequency": "once daily",
      "note": "for anxiety",
      "id": "3"
    },
    {
      "petId": "4",
      "name": "Glucosamine",
      "amount": "500mg",
      "frequency": "once daily",
      "note": "for joints",
      "id": "5"
    },
    {
      "petId": "5",
      "name": "Revolution plus",
      "amount": "11.1-22lbs",
      "frequency": "once monthly",
      "note": "fleas, ticks, heartworm prevention",
      "id": "6"
    },
    {
      "petId": "14",
      "name": "Benadryl 25mg",
      "amount": "2 tabs",
      "frequency": "every 12 hours",
      "note": "allergies",
      "id": "7"
    },
    {
      "petId": "14",
      "name": "Simparica Trio",
      "amount": "44-88lbs",
      "frequency": "once monthly",
      "note": "heartworm, flea, tick prevention",
      "id": "8"
    },
    {
      "petId": "15",
      "name": "Simparica Trio",
      "amount": "44-88lbs",
      "frequency": "once monthly",
      "note": "heartworm, flea, tick prevention",
      "id": "9"
    },
    {
      "petId": "16",
      "name": "Heartgard plus",
      "amount": "1 chew",
      "frequency": "once monthly",
      "note": "heartworm prevention",
      "id": "10"
    },
    {
      "petId": "16",
      "name": "K9 Advantix II",
      "amount": ">55 lbs",
      "frequency": "once monthly",
      "note": "flea/tick prevention",
      "id": "11"
    },
    {
      "petId": "7",
      "name": "Previcox 57mg",
      "amount": "1/2 tablet",
      "frequency": "once daily",
      "note": "arthritis",
      "id": "12"
    },
    {
      "petId": "7",
      "name": "Heartgard plus 26-50lbs",
      "amount": "1 chew",
      "frequency": "every 30 days",
      "note": "heartworm prevention",
      "id": "13"
    },
    {
      "petId": "9",
      "name": "Glucosamine",
      "amount": "500mg",
      "frequency": "once daily",
      "note": "joint supplement",
      "id": "14"
    },
    {
      "petId": "9",
      "name": "Heartgard plus 0-25lbs",
      "amount": "1 chew",
      "frequency": "once monthly",
      "note": "heartworm prevention",
      "id": "15"
    },
    {
      "petId": "10",
      "name": "Heartgard plus 51-100lbs",
      "amount": "1 chew",
      "frequency": "one monthly",
      "note": "heartworm prevention",
      "id": "16"
    },
    {
      "petId": "10",
      "name": "Trazodone 100mg",
      "amount": "2-3 tablets",
      "frequency": "2 hours before vet appointment",
      "note": "anxiety",
      "id": "17"
    },
    {
      "petId": "11",
      "name": "Previcox 227mg",
      "amount": "2 tabs",
      "frequency": "once daily",
      "note": "arthritis",
      "id": "18"
    },
    {
      "petId": "11",
      "name": "Glucosamine 500mg",
      "amount": "4 capsules",
      "frequency": "2 times daily",
      "id": "19"
    },
    {
      "petId": "12",
      "name": "Revolution plus",
      "amount": "1 tube",
      "frequency": "once monthly",
      "note": "heartworm, flea, tick prevention",
      "id": "20"
    },
    {
      "petId": "5",
      "name": "Glucosamine",
      "amount": "1/2 tablet",
      "frequency": "once daily",
      "note": "heartworm prevention",
      "id": "21"
    }
  ],
  "hospitals": [
    {
      "id": "1",
      "name": "Family Pet Practice",
      "phone": "248-681-6200",
      "address": "4260 Elizabeth Lake Rd, Waterford Twp, MI 48329",
      "image": "/assets/hospital-images/family-pet-practice.jpg",
      "website": "https://www.familypetpractice.com"
    },
    {
      "id": "2",
      "name": "Exclusively Cats Veterinary Hospital",
      "phone": "248-666-5287",
      "address": "6650 Highland Rd #116, Waterford Twp, MI 43327",
      "image": "/assets/hospital-images/e-cats.jpg",
      "website": "https://www.ecats.vet"
    },
    {
      "id": "3",
      "name": "Banfield Pet Hospital",
      "phone": "248-674-3101",
      "address": "4525 Highland Rd, Waterford Twp, MI 48328",
      "image": "/assets/hospital-images/banfield.jpg",
      "website": "https://banfield.com"
    },
    {
      "id": "4",
      "name": "Union Lake Veterinary Hospital",
      "phone": "248-363-1508",
      "address": "6545 Cooley Lake Rd, Waterford Twp, MI 48327",
      "image": "/assets/hospital-images/union-lake.jpg",
      "website": "https://unionlakeveterinaryhospital.com"
    },
    {
      "id": "5",
      "name": "Pet Authority Animal Hospital",
      "phone": "248-673-1288",
      "address": "4588 W Walton Blvd, Waterford Twp, MI 48329",
      "image": "/assets/hospital-images/pet-authority.jpg",
      "website": "https://petsloved.com"
    },
    {
      "id": "6",
      "name": "Oakland Veterinary Referral Services",
      "phone": "248-334-6877",
      "address": "1400 S Telegraph Rd, Bloomfield Twp, MI 48302",
      "image": "/assets/hospital-images/ovrs.jpg",
      "website": "https://ovrs.com"
    },
    {
      "id": "7",
      "name": "Blue Pearl Pet Hospital",
      "phone": "248-371-3713",
      "address": "3412 Walton Blvd, Auburn Hills, MI 48326",
      "image": "/assets/hospital-images/blue-pearl.jpg",
      "website": "https://bluepearlvet.com/hospital/auburn-hills-mi/"
    },
    {
      "id": "8",
      "name": "Veterinary Vision of Rochester",
      "phone": "248-402-9844",
      "address": "278 E Auburn Rd, Rochester Hills, MI 48307",
      "image": "/assets/hospital-images/vet-vision.jpg",
      "website": "https://vet-vision.com"
    },
    {
      "id": "9",
      "name": "Veterinary Cardiology Consultants",
      "phone": "248-946-4322",
      "address": "24360 Novi Rd Suite B, Novi, MI 48375",
      "image": "/assets/hospital-images/cardiology-consultants.png",
      "website": "https://vetcardiologyconsultants.com"
    },
    {
      "id": "10",
      "name": "Michigan State University Veterinary Medical Center",
      "phone": "517-353-5420",
      "address": "736 Wilson Rd, East Lansing, MI 48824",
      "image": "/assets/hospital-images/msu.jpg",
      "website": "https://cvm.msu.edu/hospital/small-animal"
    }
  ],
  "hospital-notes": [
    {
      "userId": "4",
      "hospitalId": "4",
      "note": "for emergencies",
      "id": "3"
    },
    {
      "userId": "4",
      "hospitalId": "3",
      "note": "Go here for vaccines",
      "id": "4"
    },
    {
      "userId": "4",
      "hospitalId": "6",
      "note": "Indy- behaviorist",
      "id": "6"
    },
    {
      "userId": "8",
      "hospitalId": "8",
      "note": "Biscuit ophthalmologist  ",
      "id": "8"
    },
    {
      "userId": "9",
      "hospitalId": "5",
      "note": "Preventive care",
      "id": "9"
    },
    {
      "userId": "7",
      "hospitalId": "2",
      "note": "Vaccines- cats",
      "id": "10"
    },
    {
      "userId": "7",
      "hospitalId": "3",
      "note": "Vaccines- dogs",
      "id": "11"
    }
  ],
  "hospital-favorites": [
    {
      "userId": "8",
      "hospitalId": "8",
      "id": "5"
    },
    {
      "userId": "8",
      "hospitalId": "4",
      "id": "6"
    },
    {
      "userId": "9",
      "hospitalId": "5",
      "id": "7"
    },
    {
      "userId": "7",
      "hospitalId": "3",
      "id": "8"
    },
    {
      "userId": "7",
      "hospitalId": "2",
      "id": "9"
    },
    {
      "userId": "4",
      "hospitalId": "6",
      "id": "11"
    },
    {
      "id": "8088",
      "userId": "4",
      "hospitalId": "5"
    }
  ]
}

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });

import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    bookedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;

// import mongoose from 'mongoose';

// const listingSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String, // e.g., "Paris, France"
//       required: true,
//     },
//     pricePerNight: {
//       type: Number,
//       required: true,
//     },
//     amenities: {
//       type: [String], // e.g., ["WiFi", "Pool"]
//     },
//     rating: {
//       type: Number,
//       default: 0,
//     },
//     isAvailable: {
//       type: Boolean,
//       default: true,
//     },
//     type: {
//       type: String,
//       enum: ['Hotel', 'Hostel', 'Resort', 'Vacation Rental', 'Attraction'],
//       required: true,
//     },
//     images: {
//       type: [String], // Array of image URLs
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Listing = mongoose.model('Listing', listingSchema);

// export default Listing;

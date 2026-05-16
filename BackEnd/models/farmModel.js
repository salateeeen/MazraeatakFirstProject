const mongoose = require("mongoose");
const schemaOptions = require("../utils/schemaOptions");

const slotPrice = {
  type: Number,
  required: true,
  min: 0,
};

const farmSchema = new mongoose.Schema(
  {
    farmName: {
      type: String,
      required: [true, "Farm name is required"],
      trim: true,
    },

    farmOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Farm must belong to an owner"],
    },

    facilities: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "facility",
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
      set: val => Math.round(val * 10) / 10
    },

    ratingsQuantity: {
      type: Number,
      default: 0
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
      required: [true, "City is required"],
    },

    basePrice: Number,


    pricing: {
      weekday: {
        morning: slotPrice,
        evening: slotPrice,
        fullDay: slotPrice,
      },
      weekend: {
        morning: slotPrice,
        evening: slotPrice,
        fullDay: slotPrice,
      },
    },
    
    timeSlots: {
      morning: {
        from: Number,
        to: Number,
      },
      evening: {
        from: Number,
        to: Number,
      },
      fullDay: {
        from: Number,
        to: Number,
      },
    },
   
    maximumGuests: {
      type: Number,
      required: [true, "maximum guests is required"],
      min: [1, "maximum guests must be at least 1"],
    },

    area: {
      type: Number,
      required: [true, "Area is required"],
      min: [1, "Area must be at least 1 sqm"],
    },
    
    description: {
      type: String,
      required: [true, "Farm description is required"],
      trim: true,
      maxlength: [1000, "Description can't be longer than 1000 characters"],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: [true, "Please provide farm location"],
        validate: {
          validator: (v) => v.length === 2,
          message: "Coordinates must be [lng, lat]",
        },
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },

    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    
    images: {
      type: [String],
      default: [],
    }
  },

  schemaOptions
);


farmSchema.pre("save", function (next) {
  if (this.pricing.weekday.fullDay) {
    this.basePrice = this.pricing.weekday.fullDay;
  }
  next();
});

farmSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("farm", farmSchema);

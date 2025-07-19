const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  
  partNumber: {
    type: String,
    required: [true, "Part number is required"],
    trim: true,
    uppercase: true,
    minLength: [3, "Part number must be at least 3 characters"],
    maxLength: [50, "Part number cannot exceed 50 characters"],
  },
  
  description: {
    type: String,
    required: [true, "Part description is required"],
    trim: true,
    minLength: [3, "Description must be at least 3 characters"],
    maxLength: [500, "Description cannot exceed 500 characters"],
  },
  
  // Three alternate part numbers with same description
  alternatePartNumbers: {
    alternate1: {
      type: String,
      trim: true,
      uppercase: true,
      maxLength: [50, "Alternate part number 1 cannot exceed 50 characters"],
    },
    alternate2: {
      type: String,
      trim: true,
      uppercase: true,
      maxLength: [50, "Alternate part number 2 cannot exceed 50 characters"],
    },
    alternate3: {
      type: String,
      trim: true,
      uppercase: true,
      maxLength: [50, "Alternate part number 3 cannot exceed 50 characters"],
    }
  },
  
  // Serial Number for individual tracking
  serialNumber: {
    type: String,
    required: [true, "Serial number is required"],
    unique: true,
    trim: true,
    uppercase: true,
    minLength: [3, "Serial number must be at least 3 characters"],
    maxLength: [50, "Serial number cannot exceed 50 characters"],
  },
  
  // Current Stock Information
  totalQuantity: {
    type: Number,
    required: [true, "Total quantity is required"],
    min: [0, "Total quantity cannot be negative"],
    validate: {
      validator: function(v) {
        return Number.isInteger(v);
      },
      message: "Total quantity must be a whole number"
    }
  },
  
  // Location Information
  location: {
    locationText: {
      type: String,
      required: [true, "Location text is required"],
      trim: true,
      minLength: [2, "Location text must be at least 2 characters"],
      maxLength: [100, "Location text cannot exceed 100 characters"],
    }
  },
  
  // Status
  status: {
    type: String,
    enum: {
      values: ["Working", "Not Working", "Discontinued", "Damaged", "Under Repair"],
      message: "Invalid inventory status"
    },
    default: "Working"
  },
  
  // Category
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: ["Electronic", "Mechanical", "Consumable", "Accessory", "Tool", "Spare Part", "Other"],
      message: "Invalid category"
    },
    default: "Other"
  },
  
  // Condition
  condition: {
    type: String,
    enum: {
      values: ["New", "Good", "Fair", "Poor", "Damaged", "Refurbished"],
      message: "Invalid condition"
    },
    default: "New"
  },
  
  // Warranty Information
  warranty: {
    warrantyPeriod: {
      type: Number, // in months
      min: [0, "Warranty period cannot be negative"],
      default: 0,
    },
    warrantyStartDate: {
      type: Date,
    },
    warrantyEndDate: {
      type: Date,
    }
  },
  
  // Remarks
  remarks: [{
    comment: {
      type: String,
      required: [true, "Remark comment is required"],
      trim: false,
      maxLength: [300, "Remark cannot exceed 300 characters"],
    },
    addedBy: {
      type: String,
      required: [true, "Added by is required"],
      trim: true,
    },
    addedDate: {
      type: Date,
      default: Date.now,
    },
    remarkType: {
      type: String,
      enum: {
        values: ["General", "Stock Update", "Quality Issue", "Maintenance", "Allocation", "Return"],
        message: "Invalid remark type"
      },
      default: "General"
    }
  }],
  
  // Logging Information
  logging: {
    createdBy: {
      type: String,
      required: [true, "Created by is required"],
      trim: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    lastModifiedBy: {
      type: String,
      required: [true, "Last modified by is required"],
      trim: true,
    },
    lastModifiedDate: {
      type: Date,
      default: Date.now,
    },
  },
  
  // PO Numbers
  poNumber: [{
    type: String,
    trim: true,
    maxLength: [50, "PO number cannot exceed 50 characters"],
  }],
  
  // DC Numbers
  dcNumber: [{
    type: String,
    trim: true,
    maxLength: [50, "DC number cannot exceed 50 characters"],
  }]
});

// Static method to find items by DC number
inventorySchema.statics.findByDcNumber = function(dcNumber) {
  return this.find({
    'dcNumber': dcNumber.toUpperCase()
  });
};

// Static method to find items by PO number
inventorySchema.statics.findByPoNumber = function(poNumber) {
  return this.find({
    'poNumber': poNumber.toUpperCase()
  });
};

module.exports = mongoose.model("Inventory", inventorySchema);
const mongoose = require("mongoose");

// Schema for individual part items
const partItemSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: [true, "Serial number is required"],
    min: [1, "Serial number must be positive"],
  },
  materialDescription: {
    type: String,
    required: [false, "Material description is required"],
    trim: true,
    minLength: [3, "Material description must be at least 3 characters"],
    maxLength: [500, "Material description cannot exceed 500 characters"],
  },
  partNumber: {
    type: String,
    required: [false, "Part number is required"],
    trim: true,
    uppercase: true,
    minLength: [3, "Part number must be at least 3 characters"],
    maxLength: [50, "Part number cannot exceed 50 characters"],
  },
  quantity: {
    type: Number,
    required: [false, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
    validate: {
      validator: function(v) {
        return Number.isInteger(v);
      },
      message: "Quantity must be a whole number"
    }
  },
  remarks: {
    type: String,
    trim:false,
    maxLength: [300, "Remarks cannot exceed 300 characters"],
    default: "",
  }
});

// Main Part Request Schema
const partRequestSchema = new mongoose.Schema({
  // Form Header Information
  date: {
    type: Date,
    required: [false, "Request date is required"],
    default: Date.now,
  },
  
  engineerName: {
    type: String,
    required: [false, "Engineer name is required"],
    trim: true,
    minLength: [2, "Engineer name must be at least 2 characters"],
    maxLength: [100, "Engineer name cannot exceed 100 characters"],
  },
  
  estimatedDateOfReturn: {
    type: Date,
    required: [false, "Estimated date of return is required"],
    validate: {
      validator: function(v) {
        return v >= new Date();
      },
      message: "Estimated return date must be in the future"
    }
  },
  
  // Customer Information
  customerName: {
    type: String,
    required: [false, "Customer name is required"],
    trim: true,
    minLength: [2, "Customer name must be at least 2 characters"],
    maxLength: [150, "Customer name cannot exceed 150 characters"],
  },
  
  customerContactDetails: {
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^\+?[\d\s\-\(\)]{10,15}$/.test(v);
        },
        message: "Please enter a valid phone number"
      }
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /\S+@\S+\.\S+/.test(v);
        },
        message: "Please enter a valid email address"
      }
    },
    address: {
      type: String,
      trim: true,
      maxLength: [300, "Address cannot exceed 300 characters"],
    }
  },
  
  // Instrument Information
  instrumentModel: {
    type: String,
    required: [false, "Instrument model is required"],
    trim: true,
    minLength: [2, "Instrument model must be at least 2 characters"],
    maxLength: [100, "Instrument model cannot exceed 100 characters"],
  },
  
  instrumentSerialNumber: {
    type: String,
    required: [false, "Instrument serial number is required"],
    trim: true,
    uppercase: true,
    minLength: [3, "Serial number must be at least 3 characters"],
    maxLength: [50, "Serial number cannot exceed 50 characters"],
  },
  
  // Request Category
  category: {
    type: String,
    required: [false, "Category is required"],
    enum: {
      values: ["Warranty", "AMC", "CMC", "ZefEdge", "Office Consumption", "T&M", "Part Repair"],
      message: "Category must be one of: Warranty, AMC, CMC, ZefEdge, Office Consumption, T&M, Part Repair"
    }
  },
  
  // Request Purpose
  purpose: {
    type: String,
    required: [false, "Purpose is required"],
    enum: {
      values: ["Troubleshooting", "Loan", "Sale", "Warranty Replacement", "Refurbint", "Refurbext"],
      message: "Purpose must be one of: Troubleshooting, Loan, Sale, Warranty Replacement, Refurbint, Refurbext"
    }
  },
  
  // Request Basis
  basis: {
    type: String,
    required: [false, "Basis is required"],
    enum: {
      values: ["Returnable", "Non-returnable"],
      message: "Basis must be either Returnable or Non-returnable"
    }
  },
  
  // Parts Requested (Array of part items)
  partsRequested: {
    type: [partItemSchema],
    required: [false, "At least one part must be requested"],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: "At least one part item is required"
    }
  },
  
  // Request Status
  status: {
    type: String,
    enum: {
      values: ["Pending", "Approved", "Partially Approved", "Rejected", "Dispatched", "Delivered", "Returned"],
      message: "Invalid status value"
    },
    default: "Pending"
  },
  
  // Approval Workflow
  preparedBy: {
    serviceEngineer: {
      name: {
        type: String,
        required: [false, "Service engineer name is required"],
        trim: true,
      },
  
      date: {
        type: Date,
        default: Date.now,
      }
    }
  },
  
 
  approvedBy: {
    nationalManager: {
      name: {
        type: String,
        trim: true,
      },
    
      date: {
        type: Date,
      }
    }
  },
  
  
  totalItems: {
    type: Number,
    default: function() {
      return this.partsRequested ? this.partsRequested.length : 0;
    }
  },
  
  priority: {
    type: String,
    enum: {
      values: ["Low", "Medium", "High", "Critical"],
      message: "Priority must be Low, Medium, High, or Critical"
    },
    default: "Medium"
  },
  
  notes: {
    type: String,
    trim: true,
    maxLength: [1000, "Notes cannot exceed 1000 characters"],
  },
  
  // Dispatch Information (when parts are sent)
  dispatchDetails: {
    dispatchDate: Date,
    courierService: String,
    trackingNumber: String,
    dispatchedBy: String,
    estimatedDelivery: Date,
  },
  
  // Return Information (for returnable items)
  returnDetails: {
    actualReturnDate: Date,
    returnCondition: {
      type: String,
      enum: ["Good", "Damaged", "Partially Working", "Not Working"],
    },
    returnNotes: String,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Indexes for better query performance
partRequestSchema.index({ date: -1 });
partRequestSchema.index({ engineerName: 1 });
partRequestSchema.index({ customerName: 1 });
partRequestSchema.index({ status: 1 });
partRequestSchema.index({ instrumentSerialNumber: 1 });
partRequestSchema.index({ category: 1, purpose: 1 });

// Virtual field to calculate total quantity
partRequestSchema.virtual('totalQuantity').get(function() {
  return this.partsRequested.reduce((total, part) => total + part.quantity, 0);
});

// Pre-save middleware to update totalItems
partRequestSchema.pre('save', function(next) {
  if (this.partsRequested) {
    this.totalItems = this.partsRequested.length;
  }
  next();
});

// Instance method to check if request is overdue
partRequestSchema.methods.isOverdue = function() {
  if (this.status === 'Delivered' || this.status === 'Returned') {
    return false;
  }
  return new Date() > this.estimatedDateOfReturn;
};


// Static method to find requests by status
partRequestSchema.statics.findByStatus = function(status) {
  return this.find({ status: status });
};

// Static method to find overdue requests
partRequestSchema.statics.findOverdue = function() {
  return this.find({
    status: { $nin: ['Delivered', 'Returned'] },
    estimatedDateOfReturn: { $lt: new Date() }
  });
};

module.exports = mongoose.model("PartRequest", partRequestSchema);


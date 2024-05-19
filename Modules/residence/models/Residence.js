const mongoose = require('mongoose');
const { 
  neighborhoodConverter, centralAirConverter
  } = require("../../../Helpers/converter.js");

const residenceSchema = new mongoose.Schema({
    ownerId     : { type: mongoose.Schema.Types.ObjectId,  ref: 'Users' },
    isSold      : { type: Boolean, default: false },
    isCompleted : { type: Boolean, default: false },
    status      : {type : String, default: "pending", enum :["pending", "approved", "rejected"]},
  
    title       : { type: String },
    type        : { type: String,  enum: ['rent', 'sale'] },
    category    : { type: String,  enum: ['apartment', 'house', 'hotel', 'villa', 'cottage'],},
    paymentPeriod:{ type: String,  enum:['monthly', 'yearly'] },
    
    hasGarage     :{ type: Boolean, default: false},
    hasFireplace  :{ type: Boolean, default: false},
    hasBasement   :{ type: Boolean, default: false},

    images:[{
        url: { type: String},
        public_id: { type: String}
    }],
    reviews   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    likedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'  }],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates : {
          type: [Number],
          default: [ -93.63323867085344, 42.03320661739305] //[long, lat]
      },
      city: {
            type: String, defualt: 'Ames'
          },
      state: {
            type: String, defualt: 'Iowa'
            },
      country: {
            type: String, defualt: 'United States'
          },
      fullAddress: {
            type: String, defualt: 'Ames, Iowa, United States'
          },
    },  

    // ML Model Features
    neighborhood: { type: String},
    alley      : {type:String, default:'NA', enum:['Grvl','Pave', 'NA']}, 
    poolArea   :{ type: Number, default: 0},
    roofStyle  :{ type: String, enum: ['Flat', 'Gable', 'Gambrel', 'Hip', 'Mansard', 'Shed'] },
    roofMatl   :{ type: String, enum: ['ClyTile', 'CompShg', 'Membran', 'Metal', 'Roll', 'Tar&Grv', 'WdShake', 'WdShngl'] },
    houseStyle :{ type: String, enum: ['1Story', '1.5Fin', '1.5Unf', '2Story', '2.5Fin', '2.5Unf', 'SFoyer', 'SLvl']},
    
    garageCars  :{ type: Number, default: 0},
    garageFinish:{ type: String, default: 'NA' }, 
    garageType  :{ type: String, default: 'NA'},  
    garageQual  :{ type: String, default: 'NA'},

    fireplaces   :{ type: Number , default:0},
    fireplaceQu  :{ type: String, default: 'NA' }, 
    
    bsmtExposure :{type: String,  enum: ['Gd','Av','Mn','No'], default: "No"},
    bsmtFinType1 :{type: String,  enum: ['GLQ','ALQ','BLQ','Rec','LwQ','Unf']}, 
    bsmtCond      :{type: String,  enum: ['Ex', 'Gd', 'TA', 'Fa', 'Po', 'NO'], default: "NO"},
    bsmtQual     :{type:String,   enum: ['Ex', 'Gd', 'TA', 'Fa', 'Po', 'NO'], default: "NO"},
    bsmtUnfSF    :{type: Number,  default: 0},

    bedroomAbvGr :{ type: Number },
    totRmsAbvGrd :{ type: Number }, //total rooms without bathrooms
    KitchenAbvGr :{ type: Number },
    kitchenQual  :{ type: String }, 
    
    street     :{ type: String, enum: ['Pave', 'Grvl']},
    foundation :{ type: String, enum:['BrkTil','CBlock','PConc','Slab', 'Stone', 'Wood']},
    bldgType   :{ type: String, enum: ['1Fam', '2FmCon', 'Duplx', 'TwnhsE', 'TwnhsI'] }, //Type of dwelling
    
    centralAir :{ type: String, enum:['N','Y']},
    heating    :{ type: String, enum:['Floor','GasA','GasW','Grav','OthW','Wall'] },
    heatingQc  :{type: String,  enum:['Ex','Gd','TA','Fa','Po']},   
    electrical :{ type: String, enum:['SBrkr','FuseA','FuseF','FuseP','Mix']  },
    
    saleCondition:{ type: String,  enum: ['Normal', 'Abnorml', 'AdjLand', 'Alloca', 'Family', 'Partial']  },
    saleType     :{ type: String,  enum:['WD','CWD','VWD','New','COD','Con','ConLw','ConLI','ConLD','Oth']},
    moSold       :{ type: Number },
    salePrice    :{ type: Number },
    mszoning     :{ type: String, enum:["A", "C", 'FV', 'I', 'RH','RL', 'RP', 'RM']},
    
    utilities  :{ type: String,   enum: ['AllPub', 'NoSewr', 'NoSeWa', 'ELO']},
    lotShape   :{ type: String,   enum: ['Reg', 'IR1', 'IR2', 'IR3']},
    lotConfig  :{ type: String,   enum: ['Inside', 'Corner', 'CulDSac', 'FR2', 'FR3']},
    landContour:{ type: String,   enum: ['Lvl', 'Bnk', 'HLS', 'Low']},
    landSlope  :{ type: String,   enum: ['Gtl', 'Mod', 'Sev']},
    condition1 :{ type: String,   enum: ['Artery', 'Feedr', 'Norm', 'RRNn', 'RRAn', 'PosN', 'PosA', 'RRNe', 'RRAe']},
    condition2 :{ type: String,   enum: ['Artery', 'Feedr', 'Norm', 'RRNn', 'RRAn', 'PosN', 'PosA', 'RRNe', 'RRAe']},
    pavedDrive :{ type: String,   enum: ['Y','P','N'] }, 
    exterCond  :{ type: String,   enum: ['Ex', 'Gd', 'TA', 'Fa', 'Po']},
    exterQual  :{ type: String,   enum: ['Ex','Gd','TA','Fa','Po']},
    exterior1st:{ type: String},
    exterior2nd:{ type: String,   enum: ['AsbShng', 'AsphShn', 'BrkComm', 'BrkFace', 'CBlock', 'CemntBd', 'HdBoard', 'ImStucc', 'MetalSd', 'Other', 'Plywood', 'PreCast', 'Stone', 'Stucco', 'VinylSd', 'Wd Sdng', 'WdShing']}, 
    
    masVnrType :{ type: String,   enum: ['BrkCmn', 'BrkFace', 'CBlock', 'None', 'Stone'], default: "None"}, 
    masVnrArea     :{ type: Number, default: 0},
    
    overallQual    :{ type: Number}, 
    overallCond    :{ type: Number},
    msSubClass     :{ type: Number, default: 0 }, 
    totalporchsf   :{ type: Number, default: 0 },
    lotFrontage    :{ type: Number, default: 0},
    lotArea        :{ type: Number, default: 0},
    lowQualFinSF   :{ type: Number, default: 0},
    miscVal        :{ type: Number, default: 0},
    
    totalsf        : { type: Number, default: 0 },
    totalarea      :{ type: Number, default: 0 },
    totalbaths     :{ type: Number, default: 0 },

    houseage       :{ type: Number, default: 0},
    houseremodelage:{ type: Number, default: 0},
},{
  timestamps: true,
  toJSON: { 
      transform: function (doc, ret, options) {
        const userId     = options.userId ? options.userId.toString() : null; // current user id to check if the user liked the residence or not
        const likedUsers = ret.likedUsers ? ret.likedUsers.map(id => id.toString()) : [];
        console.log(ret._id, likedUsers.includes(userId));
        return {
              _id          : ret._id,
              isLiked      : likedUsers.includes(userId),
              isCompleted  : ret.isCompleted,
              isSold       : ret.isSold,

              title        : ret.title,
              category     : ret.category,
              type         : ret.type,
              status       : ret.status,
              
              salePrice    : ret.salePrice,
              paymentPeriod: ret.paymentPeriod,
              
              bedroomAbvGr : ret.bedroomAbvGr,
              totalbaths   : ret.totalbaths,
              totRmsAbvGrd : ret.totRmsAbvGrd,
              KitchenAbvGr : ret.KitchenAbvGr,
              totalporchsf : ret.totalporchsf,
              totalarea    : ret.totalarea,

              hasGarage    : ret.hasGarage,
              hasFireplace : ret.hasFireplace,
              hasBasement  : ret.hasBasement,
              centralAir   : centralAirConverter(ret.centralAir),
              
              neighborhood : neighborhoodConverter(ret.neighborhood),
              location     : ret.location,
              images       : ret.images,
              reviews      : ret.reviews,
              ownerId      : ret.ownerId,
              createdAt    : ret.createdAt, 
              updatedAt    : ret.updatedAt  
            };
      }
  }
}
);

residenceSchema.index({ 'location': '2dsphere'   }); // calculate geometries on an earth-like sphere.

module.exports = mongoose.model('Residence', residenceSchema);
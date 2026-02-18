import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema(
  {
    coveredArea: {
      value: {
        type: Number,
        required: true,
        default: 46000,
      },
      label: {
        type: String,
        required: true,
        default: 'sqm Covered Area',
      },
    },
    clients: {
      value: {
        type: Number,
        required: true,
        default: 650,
      },
      label: {
        type: String,
        required: true,
        default: 'Clients',
      },
    },
    exhibitionStands: {
      value: {
        type: Number,
        required: true,
        default: 2700,
      },
      label: {
        type: String,
        required: true,
        default: 'Exhibition Stands',
      },
    },
    avenues: {
      value: {
        type: Number,
        required: true,
        default: 95,
      },
      label: {
        type: String,
        required: true,
        default: 'Avenues',
      },
    },
  },
  {
    timestamps: true,
  }
);

const Stats = mongoose.model('Stats', statsSchema);

export default Stats;

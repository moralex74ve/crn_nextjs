import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const OvejaSchema = new Schema({
  nombre: { type: String},
  apellido: { type: String },
  cedula:{ type: String },
  nacio: { type: String },
  mail: { type: String },
  direccion: { type: String },
  tel1: { type: String },
  tel2: { type: String },
  status:{ type: Boolean },
  listado:{ type: Boolean },
  nota:{ type: String}
});
//module.exports = mongoose.model('ovejas', OvejasSchema);
export default mongoose.models.Ovejas || mongoose.model("Ovejas", OvejaSchema);
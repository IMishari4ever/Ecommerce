import mongoose from "mongoose";

const dbConnect = async () => {
 try {
  const connected = mongoose.connect("mongodb+srv://mishari:123@cluster0.rv5mp.mongodb.net/testss", { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(`Database connected ${(await connected).connection.host}`);
 } catch (error) {
  console.log(`Error: ${error.message}`);
  process.exit(1);
 }
}

export default dbConnect;
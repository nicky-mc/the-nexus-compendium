import { db } from "@/utils/dbconnection";
import { getAuth } from "@clerk/nextjs"; // Clerk middleware for authentication

export default getAuth(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { userId } = req.auth; // Clerk user ID for the authenticated user
        if (!userId) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        // Your code here to handle the POST request
        // For example, you can insert data into the database
        const { data } = req.body;
        await db.collection('yourCollection').insertOne({ userId, data });

        return res.status(200).json({ message: "Data inserted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    // Handle other HTTP methods if needed
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});
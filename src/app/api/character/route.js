import { db } from "@/utils/dbconnection";
import { getAuth } from "@clerk/nextjs"; // Clerk middleware for authentication

export default getAuth(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { userId } = req.auth; // Clerk user ID for the authenticated user
        if (!userId) {
          // Handle the case where userId is not present
        }
        // Your code here
      } catch (error) {
        // Handle the error
      }
      break;
    // Other cases
  }
});